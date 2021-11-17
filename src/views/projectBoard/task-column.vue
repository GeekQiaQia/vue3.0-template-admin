<template>
  <div class="task-column">
    <el-card
      v-for="status of statusMap"
      class="task-column__item">
      <div class="task-column__head">
        <div class="task-column__num">
          <div class="task-column__num-count">
            <!-- 需要动态的得到个数 -->
            <!-- {{ dynamicTask[status[0]].length || 0 }} -->
          </div>
        </div>

        <div class="task-column__type">
          {{ status[1]?.text || '未定义' }}
        </div>

        <div class="task-column__add">
          +
        </div>
      </div>

      <div
        v-for="item in staticTask[status[0]]">
        <div
          :data-taskStatus="status[0]"
          :data-taskId="item.taskId"
          :id="item.taskId">
          <div class="task-column__content">
            <p>{{ item.taskName }}</p>

            <div class="task-column__content-detail">
              <span>负责人：{{ item.developMember || '-' }}</span>
              <span class="task-column__content-time">工时：{{ item.developTime || '-' }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import _ from 'lodash'
import Sortable from 'sortablejs'
import { ref, Ref, onMounted, onUnmounted, computed } from 'vue'
import { ProjectData } from './store/index'

const props = defineProps<{
  target: ProjectData
  statusMap: Map<string, { text: string, type: string }>
}>()

const emit = defineEmits(['moveTask'])

// 聚合项目中的任务状态
// 这部分不能直接根据taskList进行计算，不然页面里会同时出现两个元素
// 一个是拖拽生成的元素，一个是新数据的元素
const staticTask = _.groupBy(_.cloneDeep(props.target.taskList), (item) => item.taskStatus)

// 根据响应式，用来计算任务的数量
const dynamicTask = computed(() => {
  return _.groupBy(props.target.taskList, (item) => item.taskStatus)
})

const sortTableInstance: Ref<Array<Sortable>> = ref([])

onMounted(() => {
  const taskList = props.target.taskList

  for (let i = 0; i < taskList.length; i ++) {
    const dom = document.getElementById(`${taskList[i].taskId}`)!

    const instance = new Sortable(dom, {
      group: "task",
      animation: 150,
      onAdd: (event) => {
        const from = event.from.dataset.taskstatus
        const to = event.to.dataset.taskstatus
        const taskId = Number(event.from.dataset.taskid)

        emit('moveTask', from, to, taskId)
      }
    })

    sortTableInstance.value.push(instance)
  }
})

onUnmounted(() => {
  _.forEach(sortTableInstance.value, instance => {
    instance.destroy()
  })
})

</script>

<style lang="stylus" scoped>
.task-column {
  display: flex;
  overflow-y: scroll;

  :deep(.el-card__body) {
    padding: 0 6px;
  }

  > div {
    width: 270px;
    border: 1px solid #dddada;
    margin: 0 10px;
    height: 100vh;
    min-height: 600px;
    min-width: 220px;
  }

  &__head {
    display: flex;
    height: 60px;
    line-height: 60px;
  }

  &__num {
    width: 40px;
    padding: 15px 0;

    &-count {
      border: 1px solid #ebe5e5;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      color: #878383;
      font-weight: bolder;
    }
  }

  &__type {
    flex-grow: 1;
    color: #605e5e;
    font-size: 14px;
  }

  &__add {
    width: 20px;
    font-size: 24px;
    color: #aaa;
    cursor: pointer;
  }

  &__content {
    margin-bottom: 6px;
    border-radius: 6px;
    border: 1px solid #eee;
    padding: 10px 6px;
    color: #706e6e;

    &-detail {
      font-size: 12px;
      margin-top: 16px;
      text-align: right;
    }

    &-time {
      margin-left: 16px;
    }
  }
}
</style>
