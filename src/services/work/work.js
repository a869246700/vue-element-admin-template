import request from '@/utils/request'

/**
 * 资质进展列表获取
 * @param {*} params
 */
export async function list(params) {
  return request(`/api/work/list`, { method: 'POST', body: params })
}

/**
 * 技能域列表获取
 * @param {*} params
 */
export async function workSkillsList(params) {
  return request(`/api/work/skills/list`, { method: 'POST', body: params })
}

/**
 * 专业域列表获取
 * @param {*} params
 */
export async function workSpecialtyList(params) {
  return request(`/api/work/specialty/list`, { method: 'POST', body: params })
}

/**
 * 获取输出类型列表
 * @param {*} params
 */
export async function workTypeList(params) {
  return request(`/api/work/type/list`, { method: 'GET', body: params })
}

/**
 * 获取输出类型列表
 * @param {*} params
 */
export async function immDeps(params) {
  return request(`/api/work/imm/deps`, { method: 'GET', body: params })
}


