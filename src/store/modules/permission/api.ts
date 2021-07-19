import request from '@/utils/request';


class Service{
  /**
   * @description POST 保存授权菜单权限
  */
  static postAuthPermission(data: any) {
    return request({
      url: '/api/auth/permission/routes',
      method: 'POST',
      json: true,
      data
    }).then((res) => {
      if (res.status === 0) {
      return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

/**
   * @description POST 保存授权菜单权限
  */
 static postPermissions(data: any) {
  return request({
    url: '/api/auth/permission/permissions',
    method: 'POST',
    json: true,
    data
  }).then((res) => {
    if (res.status === 0) {
    return Promise.resolve(res)
    }
    return Promise.reject(res)
  })
}

}
export default Service


