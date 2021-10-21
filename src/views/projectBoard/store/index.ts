import request from '@/utils/request';
import _ from 'lodash'
import { ref, Ref } from 'vue'

// 任务数据类型
export interface TaskListData {
  taskName: string,
  developTime: string,
  developMember: string,
  taskStatus: number
}

// 项目数据类型
export interface ProjectData {
  projectId: string,
  projectName: string
  principal: string
  timeConsuming: string
  status: string
  taskList: Array<TaskListData>
}

export default () => {
  const data: Ref<Array<ProjectData>> = ref([])

  // 初始化函数
  function getProjectInfo() {
    return request({
      url: '/api/project/list',
      method: 'get',
      json: true,
    }).then((res) => {
      if (res.status === 0) {
        data.value = res.data
      }
    })
  }

  // 更新指定数据
  function updatedProjectInfo(projectId: string, taskListIndex: number, task: TaskListData) {
    const targetProjectIndex = _.findIndex(data.value, ['projectId', projectId])

    data.value[targetProjectIndex].taskList.splice(taskListIndex, 1, task)
  }

  // 新增指定项目的任务
  function addProjectTask(projectId: string, task: TaskListData) {
    const targetProjectIndex = _.findIndex(data.value, ['projectId', projectId])

    data.value[targetProjectIndex].taskList.push(task)
  }

  // 删除某个任务
  function deleteTask(projectId: string, taskListIndex: number) {
    const targetProjectIndex = _.findIndex(data.value, ['projectId', projectId])

    data.value[targetProjectIndex].taskList.splice(taskListIndex, 1)
  }

  // 修改任务的可编辑状态
  function modifyTaskEdit(projectId: string, taskListIndex: number, edit: boolean = false) {
    const targetProjectIndex = _.findIndex(data.value, ['projectId', projectId])
    const targetTaskList = data.value[targetProjectIndex].taskList

    data.value[targetProjectIndex].taskList =  _.map(targetTaskList, (task: TaskListData, index: number) => {
      if (taskListIndex === index) {
        return {
          ...task,
          edit,
        }
      }
  
      return task
    })
  }

  // 获取具体项目的任务列表
  function getProjectDetail(projectId: string) {
    return _.find(data.value, (item) => item.projectId === projectId)
  }

  return {
    data,
    getProjectInfo,
    updatedProjectInfo,
    addProjectTask,
    deleteTask,
    getProjectDetail,
    modifyTaskEdit
  }
}