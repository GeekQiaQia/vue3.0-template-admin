<template>
  <div>
    <el-calendar>
      <template #dateCell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''" @dblclick="handleDoubleClick(data.day)" @click="handleFocusCurrent(data.day)">
          {{ data.day.split('-')[2] }} {{ data.isSelected ? '✔️' : '' }}
        </p>
        <ul>
          <p v-for="[key, value] of record.entries()" :key="key">
            <template v-if="key === data.day">
              <li v-for="(tasks, index) in value" :key="tasks">
                <span style="height: auto; line-height: 0px" class="el-tag el-tag--light" data-v-53b8cb1a=""
                  >{{ tasks.task }}<i class="el-tag__close el-icon-close" @click="handleListItem(index, value)"></i
                ></span>
              </li>
            </template>
          </p>
        </ul>
      </template>
    </el-calendar>
    <el-dialog v-model="dialogFormVisible" title="请输入列表任务">
      <el-form :model="listForm">
        <el-form-item label="当前任务">
          <el-input v-model="listForm.task" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddNewTask">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, ref, toRefs, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

declare type indexType = string | number | symbol

export default defineComponent({
  setup() {
    // record.set();
    const recordData = reactive({
      record: new Map()
    })
    const computedData = computed(() => recordData.record.entries())
    const selectedDay = ref()
    const dialogFormVisible = ref(false)
    const listForm = reactive({
      task: ''
    })
    const currentEdit = ref()

    /**
     * @description 删除当前列表任务
     */
    const handleListItem = (index: indexType, list: any[]) => {
      // 删除当前item ;
      const listIndex = index as number
      list.splice(listIndex, 1)

      ElMessage({
        type: 'success',
        message: '删除成功!'
      })
    }
    const handleAddNewTask = () => {
      // 存储当前日期的事件；
      if (recordData.record.get(selectedDay.value)) {
        recordData.record.get(selectedDay.value as string).push([{ task: listForm.task }])
      } else {
        // fixbug proxy 代理对象的索引
        recordData.record.set(selectedDay.value, [{ task: listForm.task }])
      }
      dialogFormVisible.value = false
    }
    // 聚焦的时候，
    const handleFocusCurrent = (day: any) => {
      selectedDay.value = day
      currentEdit.value = recordData.record.get(selectedDay.value)
    }
    const handleBlurCurrent = () => {
      recordData.record.set(selectedDay.value, currentEdit.value)
      // 更新到后台接口
    }

    const handleInputEnter = () => {}
    const handleDoubleClick = (day: any) => {
      selectedDay.value = day

      dialogFormVisible.value = true
      listForm.task = ''
    }
    const filterData = computed(() => recordData.record.get(selectedDay.value))

    const filter = (day: any) => {
      if (recordData.record.has(day)) {
        return recordData.record.get(day)
      }
      return false
    }

    onMounted(() => {})
    return {
      handleListItem,
      handleAddNewTask,
      handleDoubleClick,
      handleBlurCurrent,
      handleFocusCurrent,
      handleInputEnter,
      filterData,
      dialogFormVisible,
      computedData,
      filter,
      listForm,

      ...toRefs(recordData)
    }
  }
})
</script>
<style lang="stylus" scoped></style>
