import request from '@/utils/request'

export async function demo() {
  return null
}

/**
 * 获取资质进展报表信息
 * @param {*} params
 */
export async function listInterfaceManDTO(params) {
  return request(`/api/work/listInterfaceManDTO`, { method: 'POST', body: params })
}