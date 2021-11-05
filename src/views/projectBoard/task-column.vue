<template>
  <div class="task-column">
    <el-card
      v-for="status in taskStatus"
      class="task-column__item">
      <div class="task-column__head">
        <div class="task-column__num">
          <div class="task-column__num-count">
            {{ task[status].length || 0 }}
          </div>
        </div>

        <div class="task-column__type">
          {{ statusMap.get(status)?.text || '未定义' }}
        </div>

        <div class="task-column__add">
          +
        </div>
      </div>

      <div
        v-for="item in task[status]"
        :id="status"
        :data-taskStatus="status"
        :data-taskId="item.taskId">
        <div class="task-column__content">
          <p>{{ item.taskName }}</p>

          <div class="task-column__content-detail">
            <span>负责人：{{ item.developMember || '-' }}</span>
            <span class="task-column__content-time">工时：{{ item.developTime || '-' }}</span>
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

const task = computed(() => {
  // 聚合项目中的任务状态数量
  return _.groupBy(props.target.taskList, (item) => item.taskStatus)
})

const taskStatus = computed(() => {
  return Object.keys(task.value)
})

const sortTableInstance: Ref<Array<Sortable>> = ref([])

onMounted(() => {
  for (let i = 0; i < taskStatus.value.length; i ++) {
    const dom = document.getElementById(taskStatus.value[i])!

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
