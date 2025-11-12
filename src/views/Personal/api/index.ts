import request from '@/utils/request'

const personalApi = {
  basicInfo: '/setting/basicInfo',
  personalTags: '/personal/tags'
}

class Service {
  /**
   * @description POST 设置基本信息
   */
  static postSetBasicInfo(data: any) {
    return request({
      url: personalApi.basicInfo,
      method: 'post',
      json: true,
      data
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

  /**
   * @description Get 获取tags
   */
  static getPersonTags() {
    return request({
      url: personalApi.personalTags,
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
