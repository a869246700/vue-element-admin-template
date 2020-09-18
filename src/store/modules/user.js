import {
  logout
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  setValue,
  removeValue,
  getValue
} from '@/utils/auth'
import router, {
  resetRouter
} from '@/router'

import {
  loginSystem
} from '@/services/user'
import {
  initRouterList
} from '@/router'

const state = {
  currentUser: JSON.parse(window.localStorage.getItem('currentUser')) || {},
  token: getToken(),
  name: getValue('name') || '',
  avatar: getValue('avatar') || '',
  introduction: '',
  authority: '',
  roles: []
}

const mutations = {
  SET_CURRENTUSER: (state, currentUser) => {
    state.currentUser = currentUser
    window.localStorage.setItem('currentUser', JSON.stringify(currentUser))
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
    setValue('name', name)
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
    setValue('avatar', avatar)
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_AUTHORITY: (state, authority) => {
    state.authority = authority
  }
}

const actions = {
  // 用户登录
  async login({
    commit
  }, userInfo) {
    const {
      username
    } = userInfo

    // 获取用户信息
    const {
      data: res
    } = await loginSystem(username)

    // 验证路由
    await initRouterList()

    setToken(res.userEn)
    commit('SET_CURRENTUSER', res)
    commit('SET_TOKEN', res.userEn)
    commit('SET_NAME', res.userCn)
    commit('SET_AUTHORITY', res.authority)
    commit('SET_AVATAR', `http://oa.ruijie.com.cn/ImgUser/${res.userEn}.jpg`)
    commit('SET_INTRODUCTION', `hello coderGoo`)
  },

  // 设置角色 role
  async setRoles({
    commit
  }) {
    const roles = ['admin']
    if (!roles || roles.length <= 0) {
      return new Error('getInfo: roles must be a non-null array!')
    }
    commit('SET_ROLES', roles)
    return {
      roles
    }
  },

  // 用户注销
  logout({
    commit,
    state,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])

        removeValue('name')
        removeValue('avatar')
        removeValue('user')
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, {
          root: true
        })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 移除 token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])

      removeValue('name')
      removeValue('avatar')
      removeToken()
      resolve()
    })
  },

  // 动态修改权限
  async changeRoles({
    commit,
    dispatch
  }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const {
      roles
    } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {
      root: true
    })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, {
      root: true
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
