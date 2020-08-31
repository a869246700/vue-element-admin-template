import axios from 'axios'
import NProgress from 'nprogress'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: 'http://172.30.61.89:9528/v1', // 设置请求的基本路径
  withCredentials: true // 允许携带 cookie
})

// request interceptor
service.interceptors.request.use(
  config => {
    NProgress.start()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    NProgress.done()
    return response
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
