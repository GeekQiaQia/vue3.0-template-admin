import request from '@/utils/request';


class Service{
  /**
   * @description POST 用户登录接口
  */
  static postLogin(data: any) {
    return request({
      url: '/api/auth/user/login',
      method: 'POST',
      json: true,
      data
    }).then((res) => {
      if (res.status === 200) {
      return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

  /**
   * @descript POST  用户注册
  */
      static postRegister(data: any) {
        return request({
          url: '/api/auth/user/register',
          method: 'POST',
          json: true,
          data
        }).then((res) => {
          if (res.status === 200) {
            return Promise.resolve(res)
          }
          return Promise.reject(res)
        })
      }


}
export default Service


