/* eslint-disable import/prefer-default-export */
import request from '@/utils/request'

export async function doTreeList(params) {
    return request(`/api/testActionInspectTree/list`, { method: 'POST', body: params })
}

export async function doInfoList(params) {
    return request(`/api/testActionInspectInfo/list`, { method: 'POST', body: params })
}

export async function doMethodInfoList(params) {
    return request(`/api/testProjectMethodInfo/list`, { method: 'POST', body: params })
}

