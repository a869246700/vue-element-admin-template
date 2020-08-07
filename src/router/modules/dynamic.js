import Layout from '@/layout'
import request from '@/utils/request'

async function getRouters() {
  return await request({
    url: '/routers',
    method: 'get'
  })
}

// 1. 发送网络请求，获取服务器返回的需要配置的路由信息
const routers = getRouters()

// 2. 创建路由对象
const dynamicRouter = {
  path: '/dynamic',
  component: () => Layout,
  meta: { title: 'dynamic', icon: 'user', noCache: true },
  redirect: '/dynamic/first',
  children: [
    {
      path: 'first',
      component: Layout
    },
    {
      path: 'second',
      component: Layout
    },
    {
      path: 'third',
      component: Layout
    }
  ]
}

// 3. 返回路由
export default dynamicRouter