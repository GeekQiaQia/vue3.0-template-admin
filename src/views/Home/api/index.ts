import request from '@/utils/request'

const homeApi = {
  getPopulation: '/api/data/world-population'
}

class Service {
  /**
   * @description POST 获取词云数据
   */
  static getWorldPopulation() {
    return request({
      url: homeApi.getPopulation,
      method: 'get',
      json: true
    }).then((res) => {
      if (res.status === 0) {
        return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }
}
export default Service
