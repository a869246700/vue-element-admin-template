import axios from 'axios'
import NProgress from 'nprogress'
import { Message } from 'element-ui'

const instance = axios.create({
  baseURL: 'http://172.30.61.89:882',
  withCredentials: true // 允许携带 cookie
})

instance.interceptors.request.use(
  config => {
    NProgress.start()
    if (config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete') {
      if (!(config.data instanceof FormData)) {
        config.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          ...config.headers
        }
        config.data = JSON.stringify(config.data)
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
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
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

export default instance

// export default function POST(url, data, options = {}) {
//   return axios.post(BASEURL + url, JSON.stringify(data), {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json; charset=utf-8'
//     },
//     ...options
//   })
// }
