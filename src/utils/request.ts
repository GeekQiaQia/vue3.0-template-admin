import Axios, { Method, ResponseType, AxiosResponse, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { config } from '@/config/env'
import logger from './logger'

interface IAxiosData {
  url: string
  method?: Method
  headers?: any
  json: boolean
  contentType?: string
  data?: any
  params?: any
  timeout?: number
  responseType?: ResponseType
}

// 创建 axios 实例
const axios = Axios.create({
  baseURL: config.apiBaseUrl,
  timeout: config.timeout,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
axios.interceptors.request.use(
  (requestConfig: AxiosRequestConfig) => {
    const modifiedConfig = { ...requestConfig }
    if (sessionStorage.getItem('accessToken') && modifiedConfig.headers) {
      modifiedConfig.headers.Authorization = `Bearer ${sessionStorage.getItem('accessToken')}`
    }
    return modifiedConfig
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
axios.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err) => {
    if (err.response && err.response.data) {
      const code = err.response.status
      const msg = err.response.data.message
      ElMessage.error(`Code: ${code}, Message: ${msg}`)
      logger.error('API Error:', { code, message: msg, err })
    } else {
      ElMessage.error(`${err}`)
      logger.error('Request Error:', err)
    }
    return Promise.reject(err)
  }
)

/**
 * 通用请求方法
 * @param arr 请求配置对象
 * @returns Promise
 */
export default function request<T = any>(arr: IAxiosData): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    let contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
    if (arr.contentType) {
      contentType = arr.contentType
    } else if (arr.json) {
      contentType = 'application/json; charset=UTF-8'
    }

    axios({
      timeout: arr.timeout ?? config.timeout,
      url: arr.url,
      method: arr.method || 'POST',
      headers: {
        'content-type': contentType
      },
      params: arr.params || '',
      data: arr.data || '',
      responseType: arr.responseType || 'json'
    })
      .then((response: AxiosResponse<any>) => {
        const responseStatus = `${response.status}`
        
        // 状态码2开头的处理逻辑
        if (responseStatus.charAt(0) === '2') {
          if (response.data.code === '1' || response.data.code === 'err_9999') {
            ElMessage.error(response.data.message)
            reject(response.data)
            return
          }
          resolve(response.data)
        } else {
          ElMessage.error(response.data.message)
          reject(response.data)
        }
      })
      .catch((err) => {
        ElMessage.error(err.message)
        logger.error('Request failed:', err)
        reject(err)
      })
  })
}
