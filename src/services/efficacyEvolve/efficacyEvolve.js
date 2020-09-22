import request from '@/services/request'

export async function doProjectEvolveSta(params) {
  return request(`/api/projectEvolveSta/listProjectEvolveSta`, { method: 'POST', data: params })
}

export async function doRealmEvolveSta(params) {
  return request(`/api/projectEvolveSta/listRealmEvolveSta`, { method: 'POST', data: params })
}

export async function doBugChokeList(params) {
  return request(`/api/testManage/bugChokeList`, { method: 'POST', data: params })
}

export async function doCaseImplementList(params) {
  return request(`/api/testManage/caseImplementList`, { method: 'POST', data: params })
}

export async function doProjectQualityDefect(params) {
  return request(`/api/projectEvolveSta/listProjectMainQualityDefect`, { method: 'POST', data: params })
}
