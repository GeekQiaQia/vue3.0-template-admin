import request from '@/utils/request';


class Service{
  /**
   * @description POST 获取词云数据
  */
  static getWorldPopulation() {
    return request({
      url: '/api/data/world-population',
      method: 'get',
      json: true,
    }).then((res) => {
      if (res.status === 0) {
      return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

}
export default Service


