import request from '@/utils/request'

const loginApi = {
  userLogin: '/auth/user/login',
  userRegister: '/auth/user/register',
  sendCaptcha: '/auth/email/sendCaptcha',
  forgetPassword: '/auth/email/forgot-password',
  resetPassword: '/auth/user/reset-password',
  permissionRoutes: '/auth/permission/routes',
  userInfo: '/auth/user/userInfo'
}

class Service {
  /**
   * @description POST 用户登录接口
   */
  static postLogin(data: any) {
    return request({
      url: loginApi.userLogin,
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
   * @descript POST  用户注册
   */
  static postRegister(data: any) {
    return request({
      url: loginApi.userRegister,
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
   * @description   POST 发送验证码 /auth/email/sendCaptcha
   */
  static postCaptcha(data: any) {
    return request({
      url: loginApi.sendCaptcha,
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
   * @description POST 忘记密码
   */
  static postForgetPassword(data: any) {
    return request({
      url: loginApi.forgetPassword,
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
   * @description POST 重置密码
   */
  static postResetPassword(data: any) {
    return request({
      url: loginApi.resetPassword,
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
   * @description POST 查询授权路由
   */
  static postPermissionRoutes(data: any) {
    return request({
      url: loginApi.permissionRoutes,
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
   * @description POST 获取用户信息
   */
  static postUserInfo(data: any) {
    return request({
      url: loginApi.userInfo,
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
