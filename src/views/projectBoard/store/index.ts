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

  function updatedProjectInfo(projectId: string, taskListIndex: number, task: TaskListData) {
    const targetProjectIndex = _.findIndex(data.value, ['projectId', projectId])
    const targetTaskList = data.value[targetProjectIndex].taskList

    data.value[targetProjectIndex].taskList = _.map(targetTaskList, (item: TaskListData, index: number) => {
      return index === taskListIndex ? task : item
    })
  }

  return {
    data,
    getProjectInfo,
    updatedProjectInfo
  }
}