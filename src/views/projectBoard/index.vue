<template>
  <div class="board">
    <div class="board__info">
      <el-divider content-position="left">项目看板</el-divider>
      <span>项目看板主要应用场景：项目的任务管理，任务进度管理等。</span>
    </div>

    <div class="board__project">
      <div class="board__project-title">项目概览</div>

      <div class="board__project-list">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="board__project-item"
          :class="{ 'board__project-item--active': target.projectId === item.projectId }"
          @click="onClickProject(item)"
        >
          <el-card>
            <el-row>
              <el-col :span="5">
                <el-avatar
                  class="board__project-avatar"
                  :size="90"
                >{{ item.projectName.substr(0, 1) }}</el-avatar>
              </el-col>

              <el-col :span="18" style="margin-left: 6px; color: #7a848d">
                <p>项目名称：{{ item.projectName }}</p>
                <p>总负责人：{{ item.principal }}</p>
                <p>开发耗时：{{ item.timeConsuming }}</p>
                <p>项目状态: {{ item.status }}</p>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </div>
    </div>

    <div class="board__detail">
      <div class="board__detail-title">项目详情</div>

      <el-card class="board__detail-wrap">
        <div v-if="!target.projectId" class="board__detail-empty">请选择项目，查看项目详情！！！</div>

        <div class="board__detail-content" v-else>
          <div class="board__detail-head">
            <el-row>
              <el-col :span="5">
                <span class="board__detail-name">项目名称</span>：{{ target.projectName }}
              </el-col>

              <el-col :span="5">
                <span class="board__detail-name">负责人</span>：{{ target.principal }}
              </el-col>

              <el-col :span="5">
                <span class="board__detail-name">开发工时</span>：{{ target.timeConsuming }}
              </el-col>

              <el-col :span="5">
                <span class="board__detail-name">项目状态</span>：{{ target.status }}
              </el-col>
            </el-row>

            <el-row class="board__detail-task">
              <el-col :span="5">
                <span class="board__detail-name">任务总数</span>：{{ target.taskList.length }}
              </el-col>

              <el-col :span="18">
                <span class="board__detail-name">任务进度</span>：
                <template v-for="(item, index) of taskStatusList" :key="index">
                  <el-tag
                    class="board__detail-tag"
                    :type="item.type"
                  >{{ item.text }}: {{ item.count }}</el-tag>
                </template>
              </el-col>
            </el-row>
          </div>

          <el-tabs
            v-model="mode"
            type="card"
            @tab-click="handleClick">
            <el-tab-pane label="表格模式" name="table">
              <div class="board__detail-search">
                <el-form :inline="true" :model="formInline">
                  <el-form-item label="开发人">
                    <el-select
                      clearable
                      v-model="formInline.developMember"
                      placeholder="选择任务开发者">
                      <el-option
                        v-for="(member, index) of developMember"
                        :key="index"
                        :label="member"
                        :value="member" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="任务状态">
                    <el-select
                      clearable
                      v-model="formInline.taskStatus"
                      placeholder="选择任务状态">
                      <el-option label="准备阶段" value="preparation"></el-option>
                      <el-option label="开发中" value="development"></el-option>
                      <el-option label="开发完成" value="completed"></el-option>
                      <el-option label="测试阶段" value="test"></el-option>
                      <el-option label="待发布" value="released"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                  </el-form-item>
                </el-form>
              </div>

              <div class="board__detail-table">
                <task-table
                  :data="tableData"
                  :status="STATUS_MAP"
                  @updateTask="updateTask"
                  @modifyTaskEdit="handleModifyTaskEdit"
                  @addProjectTask="handleAddProjectTask"
                  @deleteProjectTask="handleDeleteTask"
                />
              </div>
            </el-tab-pane>

            <el-tab-pane label="列表模式" name="column">列表</el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import _ from 'lodash'
import { ref, Ref, toRefs, computed, watch, reactive } from 'vue';
import ProjectStore, { ProjectData, TaskListData } from './store/index'
import TaskTable from './task-table.vue'

const formInline = reactive({
  taskStatus: null,
  developMember: ''
})

const STATUS_MAP = new Map([
  ['preparation', {
    text: '准备阶段',
    type: 'info',
  }],
  ['development', {
    text: '开发中',
    type: '',
  }],
  ['completed', {
    text: '开发完成',
    type: 'success',
  }],
  ['test', {
    text: '测试阶段',
    type: 'danger',
  }],
  ['released', {
    text: '待发布',
    type: 'warning',
  }]
])

// 表格的数据
const tableData: Ref<Array<TaskListData>> = ref([])

const mode: Ref<string> = ref('table')

const {
  store,
  updatedProjectInfo,
  addProjectTask,
  deleteTask,
  modifyTaskEdit
} = ProjectStore()

const {
  data, // 所有项目的数据
  target // 选中的目标项目
} = toRefs(store)

watch(() => target.value, (newValue) => {
  tableData.value = newValue.taskList
}, { deep: true })

const taskStatusList = computed(() => {
  // 聚合项目中的任务状态数量
  const data = _.countBy(target.value.taskList, (item) => item.taskStatus)

  return _.map(Object.entries(data), ([key, value]) => {
    const result = STATUS_MAP.get(key)

    return {
      ...result,
      count: value,
    }
  })
})

// 任务所有的开发者
const developMember = computed(() => {
  const result = _.map(target.value.taskList, (task) => {
    return task.developMember
  })
  .filter(_ => _)

  return _.uniq(result)
})

// 点击具体项目
function onClickProject(project: ProjectData) {
  target.value = project
}

// 搜索
function onSearch() {
  // eslint-disable-next-line no-console
  console.log('search!', formInline)

  const taskStatus = formInline.taskStatus
  const developMember = formInline.developMember

  if (taskStatus && developMember) {
    const result = _.map(target.value.taskList, (task) => {
      if (task.developMember === developMember && task.taskStatus === taskStatus) {
        return task
      }
    })
    .filter(_ => _)

    tableData.value = result as Array<TaskListData>

    return
  }

  if (taskStatus) {
    const result = _.map(target.value.taskList, (task) => {
      if (task.taskStatus === taskStatus) {
        return task
      }
    })
    .filter(_ => _)

    tableData.value = result as Array<TaskListData>

    return
  }

  if (developMember) {
    const result = _.map(target.value.taskList, (task) => {
      if (task.developMember === developMember) {
        return task
      }
    })
    .filter(_ => _)

    tableData.value = result as Array<TaskListData>

    return
  }

  // 空状态筛选，返回全部数据
  tableData.value = target.value.taskList
}

// 修改项目任务的编辑状态 编辑的状态很hack， 这个属性需要结合后台的业务进行理解
function handleModifyTaskEdit($taskId: number, edit: boolean) {
  const projectId = target.value.projectId

  modifyTaskEdit(projectId, $taskId, edit)
}

// 更新项目的具体任务详情
function updateTask($taskId: number, task: TaskListData) {
  const projectId = target.value.projectId

  updatedProjectInfo(projectId, $taskId, task)
}

// 新增任务
function handleAddProjectTask() {
  const projectId = target.value.projectId

  const task = {
    taskName: '',
    developTime: '',
    developMember: '',
    taskStatus: 'preparation',
    edit: true,
    taskId: Date.now(),
  }

  addProjectTask(projectId, task)
}

// 删除任务
function handleDeleteTask($taskId: number) {
  const projectId = target.value.projectId

  deleteTask(projectId, $taskId)
}

// 模式切换点击
function handleClick(tab: any) {
  switch (tab.paneName) {
    case 'table':
      // newpage logType:10042
      console.log('表格形式')

      break
    case '列表形式':
      console.log('列表形式')

      break
    default:
      break
  }
}

</script>

<style lang="stylus" scoped>
.board {
  padding: 0 20px;

  &__info {
    text-align: left;

    > span {
      font-size: 12px;
      margin-bottom: 20px;
      display: inline-block;
    }
  }

  &__project {
    text-align: left;

    &-title {
      font-size: 18px;
      font-weight: bold;
    }

    &-list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 16px;
    }

    &-item {
      width: 50%;
      width: calc(50% - 100px);
      margin-bottom: 30px;
      margin-left: 50px;
      cursor: pointer;
      border: 1px solid transparent;
      max-width: 700px;
      min-width: 500px;

      &--active {
        border-color: #2799c1;
        border-radius: 4px;
      }
    }

    &-avatar {
      font-size: 20px;
      background: #7d9fe3;
      font-weight: bold;
    }
  }

  &__detail {
    text-align: left;

    &-head {
      color: #706e6e;
      margin-bottom: 30px;
    }

    &-search {
      margin-top: 30px;
      text-align: left;
    }

    &-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    &-empty {
      color: #d3d0d0;
      line-height: 200px;
      text-align: center;
    }

    &-wrap {
      min-height: 200px;
    }

    &-name {
      font-weight: bold;
    }

    &-tag {
      margin-left: 16px;
    }

    &-task {
      margin-top: 30px;
    }
  }
}

</style>
