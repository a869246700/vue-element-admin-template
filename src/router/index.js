import Vue from 'vue'
import Router from 'vue-router'
import zn from '@/locales/zh-CN'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 重构代码
// 项目运营
import efficacyEvolveRouter from './modules2/efficacyEvolve'
// 资质信息
import qualificationsRouter from './modules2/qualifications'
// 产出排行榜
import rankingListRouter from './modules2/ranking_list'
// 历史菜单
import beforeMenuRouter from './modules2/beforeMenu'
// 管理中心
import manageRouter from './modules2/manage'
// 权限控制
import authorityRouter from './modules2/authority'
// 异常处理
import execptionRouter from './modules2/exception'

// 录取权限路由列表
import { listRouter } from '@/services/user'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/main/main',
    hidden: true,
    children: [
      {
        path: 'main',
        name: 'main',
        hidden: true,
        component: () => import('@/views/efficacyEvolve/index'),
        children: [
          {
            path: 'main',
            name: 'main',
            meta: { title: '首页', icon: 'dashboard', affix: true },
            component: () => import('@/views/dashboard/index')
          }
        ]
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  efficacyEvolveRouter,
  qualificationsRouter,
  rankingListRouter,
  beforeMenuRouter,
  manageRouter,
  authorityRouter,
  execptionRouter
]

export const asyncRoutes = []

initRouterList()
// 初始化路由
export async function initRouterList() {
  const { data: res } = await listRouter()

  res.map(item => {
    const temp = item.path.split('/')
    item.path = temp[temp.length - 1]
    return item
  })

  formatter(asyncRoutes)
  formatter(constantRoutes, null, res)
}

// 将路由转换成菜单
function formatter(data, parentName, validRouter) {
  return data.map(item => {
    const valid = validRouter.findIndex(ele => item.name === ele.path)
    // 如果无法查询到
    if (valid === -1) {
      item.hidden = true
    }

    if (!item.name || !item.path) {
      return null
    }

    // 拼接出匹配字符串
    let locale = 'menu'
    if (parentName) {
      locale = `${parentName}.${item.name}`
    } else {
      locale = `menu.${item.name}`
    }

    item.meta.title = zn[locale]

    const result = {
      ...item,
      locale
    }

    // 如果有子路由，执行递归
    if (item.children) {
      const children = formatter(item.children, locale, validRouter)
      result.children = children
    }
    return result
  }).filter(item => item)
}

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
