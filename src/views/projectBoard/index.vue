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
                <template v-for="(item, index) of generate(target.taskList)" :key="index">
                  <el-tag
                    class="board__detail-tag"
                    :type="item.type"
                  >{{ item.text }}: {{ item.count }}</el-tag>
                </template>
              </el-col>
            </el-row>
          </div>

          <el-divider />

          <div class="board__detail-search">
            <el-form :inline="true" :model="formInline">
              <el-form-item label="开发人">
                <el-input v-model="formInline.developMember" placeholder="请输入开发人"></el-input>
              </el-form-item>
              <el-form-item label="任务状态">
                <el-select v-model="formInline.taskStatus" placeholder="选择任务状态">
                  <el-option label="准备阶段" :value="1"></el-option>
                  <el-option label="开发中" :value="2"></el-option>
                  <el-option label="开发完成" :value="3"></el-option>
                  <el-option label="测试阶段" :value="4"></el-option>
                  <el-option label="待发布" :value="5"></el-option>
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
              @modifyProjectEdit="modifyProjectEdit"
            />
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import _ from 'lodash'
import { ref, Ref, computed, watch, reactive } from 'vue';
import ProjectStore, { ProjectData, TaskListData } from './store/index'
import TaskTable from './task-table.vue'

const formInline = reactive({
  taskStatus: '',
  developMember: ''
})

const STATUS_MAP = new Map([
  ['1', {
    text: '准备阶段',
    type: 'info',
  }],
  ['2', {
    text: '开发中',
    type: '',
  }],
  ['3', {
    text: '开发完成',
    type: 'success',
  }],
  ['4', {
    text: '测试阶段',
    type: 'danger',
  }],
  ['5', {
    text: '待发布',
    type: 'warning',
  }]
])

// 具体的项目
const target: Ref<ProjectData> = ref({} as ProjectData)

const {
  data,
  getProjectInfo,
  updatedProjectInfo,
} = ProjectStore()

// 数据初始化
getProjectInfo()

// 表格的数据
const tableData: any = computed(() => target.value.taskList)

// 点击具体项目
function onClickProject(project: ProjectData) {
  target.value = project
}

// 聚合项目中的任务状态数量
function generate(taskList: Array<TaskListData>) {
  const data = _.countBy(taskList, (item) => item.taskStatus)

  return _.map(Object.entries(data), ([key, value]) => {
    const result = STATUS_MAP.get(key)

    return {
      ...result,
      count: value,
    }
  })
}

// 搜索
function onSearch() {
  // eslint-disable-next-line no-console
  console.log('search!')
}

// 修改项目任务的编辑状态
// 编辑的状态很hack， 这个属性需要结合后台的业务进行理解
function modifyProjectEdit($index: number, edit: boolean) {
  const list = _.get(target, 'value.taskList') || []

  target.value.taskList =  _.map(list, (task: TaskListData, index: number) => {
    if ($index === index) {
      return {
        ...task,
        edit,
      }
    }

    return task
  })
}

// 更新项目的具体任务详情
function updateTask($index: number, task: TaskListData) {
  const projectId = target.value.projectId

  updatedProjectInfo(projectId, $index, task)
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
    }

    &-search {
      margin-top: 60px;
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
