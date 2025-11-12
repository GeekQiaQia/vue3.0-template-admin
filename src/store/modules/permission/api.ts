import request from '@/utils/request'

const permissionApi = {
  queryAuthedPermission: '/auth/permission/routes',
  queryPermissions: '/auth/permission/permissions'
}

class Service {
  /**
   * @description POST 查询授权菜单权限
   */
  static postAuthPermission(data: any) {
    return request({
      url: permissionApi.queryAuthedPermission,
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

  /**
   * @description POST 查询授权菜单权限
   */
  static postPermissions(data: any) {
    return request({
      url: permissionApi.queryPermissions,
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
