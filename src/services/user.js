import request from '@/services/request'

export async function query() {
  return request('/api/users')
}

export async function queryCurrent() {
  return request('/api/user')
}

// 登录账号
export async function loginSystem(username) {
  // 执行单点登录
  return request('/api/user/login/en/' + username)
}

// 注销账号
export async function logoutSystem() {
  request('https://sso.ruijie.net:8443/cas/logout')
  return request('/api/user/logout', { method: 'GET' })
}
// 权限获取
export async function authority() {
  return request('/api/user/authority')
}

export async function listRouter() {
  return request('/api/router/list')
}
