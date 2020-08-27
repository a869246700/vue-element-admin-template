import axios from 'axios'
import NProgress from 'nprogress'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: 'http://172.30.61.89:9528/v1', // 设置请求的基本路径
  // timeout: 10000, // 请求超时
  withCredentials: true // 允许携带 cookie
})

service.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'

// request interceptor
service.interceptors.request.use(
  config => {
    NProgress.start()

    if (config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete') {
      if (!(config.data instanceof FormData)) {
        config.headers = {
          Accept: 'application/json',
          ...config.headers
        }
        config.data = JSON.stringify(config.data)
        console.log(config)
      } else {
        config.headers = {
          Accept: 'application/json',
          ...config.headers
        }
      }
    }
    return config
  },
  error => {
    console.log(error) // for debug
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
