/* eslint-disable prefer-destructuring */
/* eslint-disable no-const-assign */
import request from '@/utils/request'

export async function demo() {
  return null
}

export async function messageList(params) {
  let timeStamp = -1
  if (params.timeStamp) timeStamp = params.timeStamp
  return request(`/api/message/noread/list?timeStamp=` + timeStamp, { method: 'GET' })
}
export async function clearNotices(params) {
  let timeStamp = -1
  if (params.timeStamp) timeStamp = params.timeStamp
  return request(`/api/message/clearNotices?timeStamp=` + timeStamp + `&type=` + params.type, { method: 'POST' })
}



