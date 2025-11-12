import request from '@/utils/request'

const homeApi = {
  getPopulation: '/data/world-population'
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
    }).then((res: any) => {
      // Handle MockJS response format
      if (Object.prototype.hasOwnProperty.call(res, 'status')) {
        if (res.status === 0) {
          return Promise.resolve(res.data)
        }
        return Promise.reject(res)
      }
      // Standard format
      return res
    })
  }
}
export default Service
