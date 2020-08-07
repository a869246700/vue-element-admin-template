/* eslint-disable import/prefer-default-export */
import request from '@/utils/request'

export async function doQualificationsInfo(params) {
  return request(`/api/userQualifications/listQualificationsInfo`, { method: 'POST', body: params })
}

export async function doQualificationsTotal(params) {
  return request(`/api/userQualifications/listQualificationsTotal`, { method: 'POST', body: params })
}

export async function doQualificationsPlan(params) {
  return request(`/api/userQualifications/listQualificationsPlan`, { method: 'POST', body: params })
}

export async function doQualificationsPerson(params) {
  return request(`/api/userQualifications/listQualificationsPerson`, { method: 'POST', body: params })
}

export async function doQualificationsCafStatistics(params) {
  return request(`/api/userQualifications/listUserTPAndSTPStatistics`, { method: 'POST', body: params })
}

export async function doQualificationsCafInfo(params) {
  return request(`/api/userQualifications/listUserTPAndSTPInfo`, { method: 'POST', body: params })
}

export async function doQualificationsBugInfo(params) {
  return request(`/api/userQualifications/listBugInfo`, { method: 'POST', body: params })
}

export async function doQualificationsCafPlan(params) {
  return request(`/api/userQualifications/listCafPlanIsReach`, { method: 'POST', body: params })
}

export async function doQualificationsRule(params) {
  return request(`/api/userQualifications/listUserQualificationsRule`, { method: 'POST', body: params })
}

export async function doQualificationsRuleMajorSkills(params) {
  return request(`/api/userQualifications/listUserQualificationsRuleMajorSkills`, { method: 'POST', body: params })
}

export async function doQualificationsRuleNewPerson(params) {
  return request(`/api/userQualifications/listUserQualificationsRuleNewPerson`, { method: 'POST', body: params })
}

export async function doQualificationsRuleMajorInfo(params) {
  return request(`/api/userQualifications/listUserQualificationsRuleMajorInfo`, { method: 'POST', body: params })
}

export async function doQualificationsRuleSkillsInfo(params) {
  return request(`/api/userQualifications/listUserQualificationsRuleSkillsInfo`, { method: 'POST', body: params })
}

export async function doQualificationsRealmPlan(params) {
  return request(`/api/userQualificationsPlan/list`, { method: 'POST', body: params })
}

export async function doQualificationsTpFailCause(params) {
  return request(`/api/userQualifications/listUserTPFailCause`, { method: 'POST', body: params })
}

export async function doQualificationsRealmReach(params) {
  return request(`/api/userQualificationsRealmReach/list`, { method: 'POST', body: params })
}

export async function doQualificationsRuleMajorDefine(params) {
  return request(`/api/userQualificationsRuleMajorDefine/list`, { method: 'POST', body: params })
}

export async function doQualificationsProduceStatisticsScore(params) {
  return request(`/api/userQualifications/listUserQualificationsProduceStatisticsScore`, { method: 'POST', body: params })
}

export async function doListDesignRankingDateStatistics(params) {
  return request(`/api/userQualifications/listDesignRankingDateStatistics`, { method: 'POST', body: params })
}

export async function doListTesRankingDateStatistics(params) {
  return request(`/api/userQualifications/listTesRankingDateStatistics`, { method: 'POST', body: params })
}

export async function doQualificationsCafGradingList(params) {
  return request(`/api/cafUserInfo/listCafGradingInfo`, { method: 'POST', body: params })
}

export async function doQualificationsRealmExamInfo(params) {
  return request(`/api/userQualifications/listUserRealmExamInfo`, { method: 'POST', body: params })
}
