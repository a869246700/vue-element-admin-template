import request from '../request'

export async function doCaseInfoList(params) {
  return request(`/api/caseInfoData/listCaseInfoData`, { method: 'POST', data: params })
}

