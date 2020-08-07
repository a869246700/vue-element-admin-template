import request from '@/utils/request'

/**
 * 资质进展列表获取
 * @param {*} params
 */
export async function router() {
  return request(`/api/router`, { method: 'GET' })
}

/**
 * 技能域列表获取
 */
export async function demo() {
  return null
}



