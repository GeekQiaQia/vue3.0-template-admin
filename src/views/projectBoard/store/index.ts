import request from '@/utils/request';
import { ref, Ref } from 'vue'

// 任务数据类型
interface TaskListData {
  taskName: string,
  developTime: string,
  developMember: string,
  taskStatus: number
}

// 项目数据类型
interface ProjectData{
  projectName: string
  principal: string
  timeConsuming: string
  status: string
  taskList: Array<TaskListData>
}

export default () => {
  let data: Ref<Array<ProjectData>> = ref([])

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

  return {
    data,
    getProjectInfo
  }
}