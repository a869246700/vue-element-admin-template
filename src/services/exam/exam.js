import request from '@/utils/request'

export async function demo() {
  return null
}

export async function doList(params) {
  return request(`/api/exam/list`, { method: 'POST', body: params })
}

export async function updateExam(params) {
  return request(`/api/exam/update`, { method: 'POST', body: params })
}
