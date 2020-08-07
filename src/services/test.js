import request from '@/services/request'

export async function queryData() {
  return request('/api/x6/home/multidata')
}
