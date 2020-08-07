import request from '@/utils/request'

export async function demo() {
  return null
}

export async function doRoleMan(params) {
  return request(`/api/authority/roleMans`, { method: 'POST', body: params })
}

export async function doRoles(params) {
  return request(`/api/authority/roles`, { method: 'POST', body: params })
}

export async function doListRole(params) {
  return request(`/api/authority/role/list`, { method: 'POST', body: params })
}

export async function doListRouter(params) {
  return request(`/api/router/listRouter`, { method: 'POST', body: params })
}

export async function doRouterSelect(params) {
  return request(`/api/router/listSelect`, { method: 'GET', body: params })
}

export async function doListRoleMan(params) {
  return request(`/api/authority/roleMan/list`, { method: 'POST', body: params })
}

export async function doListRoleAuth(params) {
  return request(`/api/authority/role/applyAuthList`, { method: 'POST', body: params })
}
