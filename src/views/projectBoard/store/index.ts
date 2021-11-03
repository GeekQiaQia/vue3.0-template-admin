import request from '@/utils/request';
import _ from 'lodash'
import { reactive } from 'vue';

// 任务数据类型
export interface TaskListData {
  taskId: number,
  taskName: string,
  developTime: string,
  developMember: string,
  taskStatus: string
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
  const store = reactive<{
    data: Array<ProjectData>
    target: ProjectData
  }>({
    data: [],
    target: {} as ProjectData
  })

  // 初始化函数
  function getProjectInfo() {
    request({
      url: '/api/project/list',
      method: 'get',
      json: true,
    }).then((res) => {
      if (res.status === 0) {
        store.data = res.data
        store.target = res.data[0] // 默认选中的项目
      }
    })
  }

  // 数据初始化
  getProjectInfo()

  // 更新指定数据
  function updatedProjectInfo(projectId: string, $taskId: number, newTask: TaskListData) {
    const targetProjectIndex = _.findIndex(store.data, ['projectId', projectId])
    const targetList = store.data[targetProjectIndex].taskList
    
    const newList = _.map(targetList, (task: TaskListData, index: number) => {
      if (task.taskId === $taskId) {
        return newTask
      }
  
      return task
    })

    store.data[targetProjectIndex].taskList = newList
  }

  // 新增指定项目的任务
  function addProjectTask(projectId: string, task: TaskListData) {
    const targetProjectIndex = _.findIndex(store.data, ['projectId', projectId])
    const targetList = store.data[targetProjectIndex].taskList

    store.data[targetProjectIndex].taskList = _.concat(targetList, task, [])
  }

  // 删除某个任务
  function deleteTask(projectId: string, $taskId: number) {
    const targetProjectIndex = _.findIndex(store.data, ['projectId', projectId])
    const targetList = store.data[targetProjectIndex].taskList

    const newList = _.map(targetList, (task: TaskListData, index: number) => {
      if (task.taskId !== $taskId) {
        return task
      }
    }).filter(_ => _)

    store.data[targetProjectIndex].taskList = newList as Array<TaskListData>
  }

  // 修改任务的可编辑状态
  function modifyTaskEdit(projectId: string, $taskId: number, edit: boolean = false) {
    const targetProjectIndex = _.findIndex(store.data, ['projectId', projectId])
    const targetList = store.data[targetProjectIndex].taskList

    const newList = _.map(targetList, (task: TaskListData, index: number) => {
      if (task.taskId === $taskId) {
        return {
          ...task,
          edit,
        }
      }
  
      return task
    })

    store.data[targetProjectIndex].taskList = newList
  }

  // 获取具体项目的任务列表
  function getProjectDetail(projectId: string) {
    return _.find(store.data, (item) => item.projectId === projectId)
  }

  return {
    store,
    updatedProjectInfo,
    addProjectTask,
    deleteTask,
    getProjectDetail,
    modifyTaskEdit
  }
}