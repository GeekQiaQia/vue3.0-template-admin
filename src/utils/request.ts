import Axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = 'http://.....'
const axios = Axios.create({
  baseURL,
  timeout: 20000
})
//
axios.interceptors.request.use(
  (res) => {
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)
//
axios.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    if (err.response && err.response.data) {
      const code = err.response.status
      const msg = err.response.data.message
      ElMessage.error(`Code: ${code}, Message: ${msg}`)
      console.error(`[Axios err]`, err.response)
    } else {
      ElMessage.error(`${err}`)
    }
    return Promise.reject(err)
  }
)
