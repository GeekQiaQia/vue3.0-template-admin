<template>
  <div class="task-column">
    <el-card class="task-column__item">
      <div class="task-column__head">
        <div class="task-column__num">
          <div class="task-column__num-count">3</div>
        </div>

        <div class="task-column__type">
          准备阶段
        </div>

        <div class="task-column__add">
          +
        </div>
      </div>

      <div ref="column" data-item="ready">
        <template v-for="item in dataList">
          <el-input
            class="task-column__content"
            v-model="item.task"
            readonly
            placeholder="请输入内容"></el-input>
        </template>
      </div>
    </el-card>

    <el-card class="task-column__item">
      <div class="task-column__head">
        <div class="task-column__num">
          <div class="task-column__num-count">3</div>
        </div>

        <div class="task-column__type">
          开发中
        </div>

        <div class="task-column__add">
          +
        </div>
      </div>

      <div ref="column1" data-item="develop">
        <template v-for="item in dataList">
          <el-input
            class="task-column__content"
            v-model="item.task"
            readonly
            placeholder="请输入内容"></el-input>
        </template>
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
}>()

const emit = defineEmits()

const task = computed(() => {
  // 聚合项目中的任务状态数量
  return _.groupBy(props.target.taskList, (item) => item.taskStatus)
})

const taskStatus = computed(() => {
  return Object.keys(task.value)
})

const column: Ref<HTMLDivElement> = ref({} as HTMLDivElement)
const column1: Ref<HTMLDivElement> = ref({} as HTMLDivElement)
let listSortable: Sortable
let listSortable1: Sortable

const dataList = ref([
  { id: '1', task: 'task1：可拖拽组件开发' },
  { id: '2', task: 'task2：监控页面开发' },
  { id: '3', task: 'task3：低代码平台开发' }
])

onMounted(() => {
  listSortable = new Sortable(column.value, {
    group: "name",
    animation: 150,
    onAdd: (event) => {
      console.log(event.from.dataset.item)
      console.log(event.to.dataset.item)
    }
  })

  listSortable1 = new Sortable(column1.value, {
    group: "name",
    animation: 150,
    onAdd: (event) => {
      console.log(event.from.dataset.item)
      console.log(event.to.dataset.item)
    }
  })
})

onUnmounted(() => {
  listSortable.destroy()
})

</script>

<style lang="stylus" scoped>
.task-column {
  display: flex;

  :deep(.el-card__body) {
    padding: 0 6px;
  }

  > div {
    width: 260px;
    border: 1px solid #dddada;
    margin: 0 10px;
    height: 100vh;
    min-height: 600px;
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
  }
}
</style>
