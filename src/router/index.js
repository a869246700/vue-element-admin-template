import Vue from 'vue'
import Router from 'vue-router'
import zn from '@/locales/zh-CN'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 重构代码
// 项目运营
import efficacyEvolveRouter from './modules/efficacyEvolve'
// 资质信息
import qualificationsRouter from './modules/qualifications'
// 产出排行榜
import rankingListRouter from './modules/ranking_list'
// 历史菜单
import beforeMenuRouter from './modules/beforeMenu'
// 管理中心
import manageRouter from './modules/manage'
// 权限控制
import authorityRouter from './modules/authority'
// 异常处理
import execptionRouter from './modules/exception'

// 录取权限路由列表
import { listRouter } from '@/services/user'
import {
  getValue
} from '@/utils/auth'

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
    meta: { title: 'app.login.login', noCache: true },
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
    meta: { title: 'menu.exception.not-find' },
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    meta: { title: '401' },
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
        redirect: '/main/main',
        hidden: true,
        component: () => import('@/views/efficacyEvolve/index'),
        children: [
          {
            path: 'main',
            name: 'main',
            meta: { title: 'menu.main.main', icon: 'dashboard', affix: true },
            component: () => import('@/views/mygoo/demo2')
          }
        ]
      }
    ]
  }
]

export const asyncRoutes = [
  efficacyEvolveRouter,
  qualificationsRouter,
  rankingListRouter,
  beforeMenuRouter,
  manageRouter,
  authorityRouter,
  execptionRouter,
  { path: '*', redirect: '/404', hidden: true }
]

// 初始化路由
export async function initRouterList() {
  const user = getValue('user')
  if (!user) {
    return false
  }
  const { data: res } = await listRouter()

  res.map(item => {
    const temp = item.path.split('/')
    item.path = temp[temp.length - 1]
    return item
  })

  formatter(asyncRoutes, null, res)
  console.log('初始化完毕')
  return true
}

// 将路由转换成菜单
function formatter(data, parentName, validRouter) {
  return data.map(item => {
    // 全部设置为隐藏 hidden
    item.hidden = true

    // 如果父路由是工作线的话
    if (parentName === 'menu.efficacyEvolve.project_line.project_twelve_four' || parentName === 'project_twelve_five') {
      item.hidden = false
      return item
    }

    if (validRouter) {
      const valid = validRouter.findIndex(ele => item.name === ele.path)
      // 如果无法查询到
      if (valid !== -1) {
        item.hidden = false
      }
    }

    if (!item.name || !item.path) {
      return null
    }

    if (item.name === '11x_project_test' || item.name === '12x_project_test' || item.name === '12x_project_test_data') {
      item.hidden = false
    }

    // 拼接出匹配字符串
    let locale = 'menu'
    if (parentName) {
      locale = `${parentName}.${item.name}`
    } else {
      locale = `menu.${item.name}`
    }

    item.meta.title = locale

    if (item.name === 'project_twelve_four' || item.name === 'project_twelve_five') {
      item.meta.title = zn[item.meta.title]
    }

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
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
