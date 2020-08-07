/* eslint-disable import/prefer-default-export */
import request from '@/utils/request'

export async function doCaseInfoList(params) {
  return request(`/api/caseInfoData/listCaseInfoData`, { method: 'POST', body: params })
}

