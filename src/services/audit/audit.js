import request from '@/utils/request'

export async function demo() {
  return null
}

export async function auditList(params) {
  return request(`/api/audit/list`, { method: 'POST', body: params })
}
