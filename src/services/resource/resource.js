/* eslint-disable import/prefer-default-export */
import request from '@/utils/request'

export async function doIntoList(params) {
    return request(`/api/resource/into/list`, { method: 'POST', body: params })
}

export async function doListEffectiveResourcesByDep(params) {
    return request(`/api/resource/effective/dep/list`, { method: 'POST', body: params })
}


export async function doListEffectiveResourcesByPerson(params) {
    return request(`/api/resource/effective/person/list`, { method: 'POST', body: params })
}

export async function doEfficiencyDepList(params) {
    return request(`/api/resource/efficiency/dep/list`, { method: 'POST', body: params })
}

export async function doEfficiencyPersonList(params) {
    return request(`/api/resource/efficiency/person/list`, { method: 'POST', body: params })
}
export async function docodecoveragetrace(params) {
    return request(`/api/resource/codecoveragetrace`, { method: 'POST', body: params })
}

export async function doEfficiencyProjectList(params) {
    return request(`/api/resource/efficiency/project/list`, { method: 'POST', body: params })
}

export async function doResourcelevelDepList(params) {
    return request(`/api/resource/resourcelevel/dep/list`, { method: 'POST', body: params })
}

export async function doResourcelevelPersonList(params) {
    return request(`/api/resource/resourcelevel/person/list`, { method: 'POST', body: params })
}

export async function doProjectStagePersonList(params) {
    return request(`/api/resource/projectStage/person/list`, { method: 'POST', body: params })
}

export async function doResourceTestDevelop(params) {
    return request(`/api/resource/resourceTestDevelop/list`, { method: 'POST', body: params })
}

export async function doSummaryBusinessRank(params) {
    return request(`/api/resource/summaryBusinessRank/list`, { method: 'POST', body: params })
}

export async function doSummaryDeptRank(params) {
    return request(`/api/resource/summaryDeptRank/list`, { method: 'POST', body: params })
}

export async function doSummaryGroupRank(params) {
    return request(`/api/resource/summaryGroupRank/list`, { method: 'POST', body: params })
}

export async function doSummaryPersonRank(params) {
    return request(`/api/resource/summaryPersonRank/list`, { method: 'POST', body: params })
}

export async function doSummaryProfessionalDividePerson(params) {
    return request(`/api/resource/professionalDividePerson/list`, { method: 'POST', body: params })
}

export async function doSummaryProfessionalDividePersonStatistics(params) {
    return request(`/api/resource/professionalDividePersonStatistics/list`, { method: 'POST', body: params })
}

export async function doSummaryProfessionalDivide(params) {
    return request(`/api/resource/professionalDivide/list`, { method: 'POST', body: params })
}

export async function doSummaryDeptRankTop(params) {
    return request(`/api/resource/summaryDeptRankTop/list`, { method: 'POST', body: params })
}

export async function doSummaryGroupRankTop(params) {
    return request(`/api/resource/summaryGroupRankTop/list`, { method: 'POST', body: params })
}

export async function doSummaryPersonRankTop(params) {
    return request(`/api/resource/summaryPersonRankTop/list`, { method: 'POST', body: params })
}

export async function doPersonCafTypeNum(params) {
    return request(`/api/cafUserInfo/listPersonCafTypeNum`, { method: 'POST', body: params })
}

export async function doHighPersonSummary(params) {
    return request(`/api/resource/summaryHighPersonWeek/list`, { method: 'POST', body: params })
}

export async function doHighPersonSummaryContrast(params) {
    return request(`/api/resource/summaryHighPersonWeekContrast/list`, { method: 'POST', body: params })
}

export async function doHighDeptSummaryContrast(params) {
    return request(`/api/resource/summaryHighDeptWeekContrast/list`, { method: 'POST', body: params })
}

export async function doSummaryAbnormalWeek(params) {
    return request(`/api/resource/summaryAbnormalWeek/list`, { method: 'POST', body: params })
}
