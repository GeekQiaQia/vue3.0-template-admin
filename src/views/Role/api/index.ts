import request from '@/utils/request'

const roleApi = {
  queryAuthedPermission: '/auth/permission/routes'
}

class Service {
  /**
   * @description POST 保存授权菜单权限
   */
  static postAuthPermission(data: any) {
    return request({
      url: roleApi.queryAuthedPermission,
      method: 'POST',
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
}
export default Service
