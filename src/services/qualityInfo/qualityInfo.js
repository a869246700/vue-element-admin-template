/* eslint-disable import/prefer-default-export */
import request from '@/utils/request'

export async function doQualityInfoList(params) {
    return request(`/api/qualityInfo/list`, { method: 'POST', body: params })
}

export async function doQualityCarList(params) {
    return request(`/api/qualityCarWordInfo/list`, { method: 'POST', body: params })
}
