import router from './router'
import NProgress from 'nprogress' // progress bar
import {
  Message
} from 'element-ui'
import store from '@/store'
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken,
  getValue
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import {
  initRouterList
} from '@/router'
import i18n from '@/utils/i18n'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

// 路由跳转白名单
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

let flag = false
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // 获取 user
  const user = getValue('user')

  if (!flag && user) {
    flag = await initRouterList()
  }

  // 设置站点title
  document.title = getPageTitle(i18n.t(to.meta.title))

  // 获取 token
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 已经登录，则直接跳转至 /
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取角色
          const {
            roles
          } = await store.dispatch('user/setRoles')

          // 根据角色获取不同的路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 添加不同角色的路由
          router.addRoutes(accessRoutes)
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 无 token
    // 判断，跳转地址是否在白名单上
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 跳转至登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
