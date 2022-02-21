<!--
 * @Author: GeekQiaQia
 * @Date: 2022-02-17 11:46:16
 * @LastEditTime: 2022-02-21 17:52:13
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /test-vue3/src/views/Calendar/index.vue
-->
<template>
  <div class="calendar-info">
    <el-row style="margin: 15px">
      <el-col :span="24" class="page-title-box">
        <h4 class="page-title">Calendar</h4>
        <div class="page-title-right">
          <div style="margin-right: 10px"><el-date-picker v-model="pickDate" type="date" placeholder="选择日期"> </el-date-picker></div>
          <el-button :icon="Refresh" circle type="primary" style="maring-left: 10px"></el-button>
          <el-button :icon="Search" circle type="primary"></el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-row>
            <el-col :span="6">
              <el-button :icon="CirclePlus" type="primary" style="width: 258.25px; height: 42px" @click="handleCreateEvent"> 创建新的事件</el-button>
              <div>
                <br />
                <p class="text-muted text-left">Drag and drop your event or click in the calendar</p>
              </div>
              <div ref="containerRef">
                <div v-for="item in taskList" :key="item.id" class="external-events" :class="[item.classNames]"><i class="list-circle"></i>{{ item.title }}</div>
              </div>
              <div style="text-align: left"><el-checkbox v-model="checked" label="remove after drop" size="large"></el-checkbox></div>
              <div style="text-align: left"><el-checkbox v-model="togglechecked" label="weekends toggle" size="large" @change="handleWeekendsToggle"></el-checkbox></div>
            </el-col>
            <el-col :span="18">
              <FullCalendar class="demo-app-calendar" :options="calendarOptions">
                <template #eventContent="arg">
                  <b>{{ arg.timeText }}</b>
                  <i>{{ arg.event.title }}</i>
                </template>
              </FullCalendar>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="dialogFormVisible" title="添加事项" width="450px">
      <el-form ref="ruleFormRef" :model="form" :rules="rules">
        <el-form-item label="请输入事项" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off" style="width: 189.5px"></el-input>
        </el-form-item>
        <el-form-item label="选择事项颜色" :label-width="formLabelWidth" prop="className">
          <el-select v-model="form.className" placeholder="Please select category color">
            <el-option label="Success" value="bg-success"></el-option>
            <el-option label="Danger" value="bg-danger"></el-option>
            <el-option label="Info" value="bg-info"></el-option>
            <el-option label="Warning" value="bg-warning"></el-option>
            <el-option label="Dark" value="bg-dark"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">关闭</el-button>
          <el-button type="primary" @click="handleSaveCategory(ruleFormRef)">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { Refresh, Search, CirclePlus } from '@element-plus/icons-vue'
import '@fullcalendar/core/vdom' // solve problem with Vite
import FullCalendar, { CalendarOptions, EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import { ElMessageBox, ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { INITIAL_EVENTS, createEventId } from './event-utils'

type FormInstance = InstanceType<typeof ElForm>
type task = {
  title: string
  classNames: string
  id: string
}
interface ITaskList {
  [index: number]: task
}
// eslint-disable-next-line no-unused-vars
let currentEvents: EventApi[]

const containerRef = ref()
// const calendarRef = ref()
const pickDate = ref('')
const checked = ref(false)
const togglechecked = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = ref(120)
const ruleFormRef = ref<FormInstance>()
const form = reactive({
  title: '',
  className: 'bg-success'
})
const rules = reactive({
  title: [
    {
      required: true,
      message: 'Please input event title',
      trigger: 'blur'
    }
  ],
  className: [
    {
      required: true,
      message: 'Please select category color',
      trigger: 'blur'
    }
  ]
})
const taskList = reactive<ITaskList>([
  { title: 'meet manger', classNames: 'bg-danger', id: createEventId() },
  { title: 'interview for front-end', classNames: 'bg-success', id: createEventId() },
  { title: 'studying', classNames: 'bg-info', id: createEventId() },
  { title: 'dead line ', classNames: 'bg-warning', id: createEventId() },
  { title: 'go to sleep', classNames: 'bg-dark', id: createEventId() }
])

/**
 * @description 选中某天处理事件
 */
const handleDateSelect = (selectInfo: DateSelectArg) => {
  // eslint-disable-next-line no-alert
  const title = prompt('请输入任务标题')
  const calendarApi = selectInfo.view.calendar

  calendarApi.unselect() // clear date selection

  if (title) {
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    })
  }
}
/**
 * @description 创建事件框
 *
 */
const handleCreateEvent = () => {
  dialogFormVisible.value = true
}
/**
 * @description 保存事项
 *
 */
const handleSaveCategory = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  // eslint-disable-next-line consistent-return
  formEl.validate((valid) => {
    if (valid) {
      taskList.push({ id: createEventId(), title: form.title, classNames: form.className })
      dialogFormVisible.value = false
    } else {
      console.log('error submit!')
      return false
    }
  })
}

/**
 * @description 选中当前任务事件
 */
const handleEventClick = (clickInfo: EventClickArg) => {
  ElMessageBox.confirm('确定删除当前任务吗？', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      clickInfo.event.remove()

      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除'
      })
    })
}
/**
 * @description 选中当前事件
 */
const handleEvents = (events: EventApi[]) => {
  currentEvents = events
}

const calendarOptions = reactive({
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin // needed for dateClick
  ],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  droppable: true,
  drop(info: DropArg) {
    if (checked.value) {
      // if so, remove the element from the "Draggable Events" list
      // eslint-disable-next-line no-unused-expressions
      info.draggedEl.parentNode.removeChild(info.draggedEl)
    }
  },
  initialView: 'dayGridMonth',
  initialEvents: INITIAL_EVENTS, // 可选项，可以从远程接口返回初始化数据
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents
  /* 可以通过触发以下事件来更新远程数据库
        eventAdd:
        eventChange:
        eventRemove:
        */
} as CalendarOptions)
// eslint-disable-next-line no-new

const handleWeekendsToggle = () => {
  calendarOptions.weekends = !calendarOptions.weekends // update a property
}

onMounted(() => {
  // eslint-disable-next-line no-new
  new Draggable(containerRef.value, {
    itemSelector: '.external-events',
    eventData(eventEl) {
      const className = eventEl.className.split(' ')[1]
      return {
        title: eventEl.innerText,
        classNames: [className]
      }
    }
  })
})
</script>

<style lang="stylus" scoped>


.calendar-info{
    color black
    padding 0px 20px
    background-color #fafbfe

.page-title-box{
    box-sizing border-box
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    color #6c757d
    .page-title{
      font-size  18px
      margin  0
      line-height  85px
      overflow  hidden
      white-space: nowrap
      text-overflow  ellipsis
      color  inherit
      font-weight 700
    }
    .page-title-right{
      display flex
      flex-direction row
      justify-content space-around
      align-items center
    }
  }
 .text-muted{
        color #98a6ad
    }
  .text-left{
        text-align left
      }

}
  :deep(.fc .fc-daygrid-day.fc-day-today){
      background #f3f6f8
    }
  :deep(.fc .fc-button-primary){
      background-color #409effab
      border-color transparent
  }
  :deep(.fc .fc-button-primary:not(:disabled).fc-button-active){
       background-color #409eff
      border-color transparent
  }
  :deep(.fc .fc-daygrid-day-number){
    float right
    height 20px
    width 20px
    text-align center
    line-height 20px
    background-color #f1f3fa
    border-radius 50%
    margin 5px
    font-size 11px
    display: inline-table;
  }
  :deep(.bg-success){
    background-color #0acf97!important
  }
  :deep(.bg-info) {
    background-color: #39afd1!important;
  }
  :deep(.bg-danger) {
    background-color: #fa5c7c!important;
  }
  :deep(.bg-dark) {
    background-color: #313a46!important;
  }
  :deep(.bg-warning) {
    background-color: #ffbc00!important;
  }
  :deep(.external-events){
    cursor move
    margin 10px 0
    padding 8px 10px
    color #fff
    text-align left
    width 258.25px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    .list-circle{
        width 14px
        height 14px
        border-radius 50%
        background-color white
        display inline-block
        margin-right 10px
    }
  }
</style>
