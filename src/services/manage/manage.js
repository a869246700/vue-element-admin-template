
import request from '@/utils/request'

export async function demo() {
  return null
}

export async function doListRole(params) {
  return request(`/api/authority/role/listRouter`, { method: 'POST', body: params })
}

export async function doListRoleApply(params) {
  return request(`/api/authority/role/applyList`, { method: 'POST', body: params })
}

export async function doListSendMessage(params) {
  return request(`/api/message/sendMessage/list`, { method: 'POST', body: params })
}

export async function doListReceiverMessage(params) {
  return request(`/api/message/receiverMessage/list`, { method: 'POST', body: params })
}

export async function doListSystemNotice(params) {
  return request(`/api/systemNotice/list`, { method: 'POST', body: params })
}

export async function doListSystemFeedback(params) {
  return request(`/api/systemFeedbackInfo/list`, { method: 'POST', body: params })
}

export async function doListSystemQuestion(params) {
  return request(`/api/systemAutoProjectQuestion/list`, { method: 'POST', body: params })
}

export async function doListSystemQuestionType(params) {
  return request(`/api/systemAutoProjectQuestion/pageTypelist`, { method: 'POST', body: params })
}