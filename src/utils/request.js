import axios from 'axios'
import NProgress from 'nprogress'
import {
  Notification
} from 'element-ui'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

const instance = axios.create({
  baseURL: 'http://172.30.61.89:9528',
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
    const errorText = codeMessage[error.response.status] || error.response.statusText
    Notification.error({
      message: errorText,
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default instance
