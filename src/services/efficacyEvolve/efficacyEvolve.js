/* eslint-disable import/prefer-default-export */
import request from '@/utils/request'

export async function doProjectEvolveSta(params) {
  return request(`/api/projectEvolveSta/listProjectEvolveSta`, { method: 'POST', body: params })
}

export async function doRealmEvolveSta(params) {
  return request(`/api/projectEvolveSta/listRealmEvolveSta`, { method: 'POST', body: params })
}

export async function doBugChokeList(params) {
  return request(`/api/testManage/bugChokeList`, { method: 'POST', body: params })
}

export async function doCaseImplementList(params) {
  return request(`/api/testManage/caseImplementList`, { method: 'POST', body: params })
}

export async function doProjectQualityDefect(params) {
  return request(`/api/projectEvolveSta/listProjectMainQualityDefect`, { method: 'POST', body: params })
}