/* eslint-disable import/prefer-default-export */
import request from '@/utils/request'

export async function doProjectDataList(params) {
    return request(`/api/projectData/list`, { method: 'POST', body: params })
}

export async function doResourceProject(params) {
    return request(`/api/resource/projectResourceInfo/list`, { method: 'POST', body: params })
}

export async function doResourceSpecialityDivide(params) {
    return request(`/api/resource/resourceSpecialityDivide/list`, { method: 'POST', body: params })
}

export async function doEngineering(params) {
    return request(`/api/engineering/list`, { method: 'POST', body: params })
}

export async function doEngineeringRealm(params) {
    return request(`/api/engineering/listRealm`, { method: 'POST', body: params })
}

export async function doTeamBuilding(params) {
    return request(`/api/engineering/listTeamBuilding`, { method: 'POST', body: params })
}

export async function doProjectNeed(params) {
    return request(`/api/engineering/listProjectNeedData`, { method: 'POST', body: params })
}

export async function doTwoRealmPerson(params) {
    return request(`/api/engineering/listTwoRealmPerson`, { method: 'POST', body: params })
}

export async function doProjectMonth(params) {
    return request(`/api/engineering/listProjectMonth`, { method: 'POST', body: params })
}

export async function doTeamBuildingGap(params) {
    return request(`/api/engineering/listTwoRealmProjectSummary`, { method: 'POST', body: params })
}

export async function doProjectStageDate(params) {
    return request(`/api/projectStageDate/list`, { method: 'POST', body: params })
}

export async function doEngineeringRealmDept(params) {
    return request(`/api/engineering/listRealmDept`, { method: 'POST', body: params })
}

export async function doEngineeringRealmOne(params) {
    return request(`/api/engineering/listRealmOne`, { method: 'POST', body: params })
}

export async function doEngineeringRealmTwo(params) {
    return request(`/api/engineering/listRealmTwo`, { method: 'POST', body: params })
}

export async function doSummaryWaste(params) {
    return request(`/api/resource/summaryWaste/list`, { method: 'POST', body: params })
}

export async function doEngineeringDeptOmit(params) {
    return request(`/api/engineering/listDeptOmitBug2019`, { method: 'POST', body: params })
}

export async function doEngineeringRealmOmit(params) {
    return request(`/api/engineering/listRealmOmitBug`, { method: 'POST', body: params })
}

export async function doEngineeringProjectOmit(params) {
    return request(`/api/engineering/listProjectOmitBug`, { method: 'POST', body: params })
}

export async function doEngineeringProjectOmitInfo(params) {
    return request(`/api/engineering/listProjectOmitBugInfo`, { method: 'POST', body: params })
}

export async function doStageProjectCaf(params) {
    return request(`/api/cafUserInfo/listStageProjectCaf`, { method: 'POST', body: params })
}

export async function doStageProjectBug(params) {
    return request(`/api/cafUserInfo/listStageProjectBug`, { method: 'POST', body: params })
}

export async function doStageProjectTotal(params) {
    return request(`/api/cafUserInfo/listStageProjectTotal`, { method: 'POST', body: params })
}

export async function doStageProjectBugAndSummary(params) {
    return request(`/api/resource/projectBugSummary/list`, { method: 'POST', body: params })
}

export async function doStageProjectBugAndSummarySum(params) {
    return request(`/api/resource/projectBugSummarySum/list`, { method: 'POST', body: params })
}

export async function doStageProjectBugAndSummaryDeptSum(params) {
    return request(`/api/resource/projectBugSummaryDeptSum/list`, { method: 'POST', body: params })
}

export async function doStageProjectWorkPackage(params) {
    return request(`/api/resource/projectStageWorkPackage/list`, { method: 'POST', body: params })
}

export async function doStageProjectBugInfo(params) {
    return request(`/api/resource/projectStageBugInfo/list`, { method: 'POST', body: params })
}

export async function doRealmProjectWorkPackageList(params) {
    return request(`/api/realmProjectWorkPackage/list`, { method: 'POST', body: params })
}

export async function doSummaryProjectTypeTimeList(params) {
    return request(`/api/resource/summaryProjectTypeTime/list`, { method: 'POST', body: params })
}

export async function doSummaryDeptTypeTimeList(params) {
    return request(`/api/resource/summaryDeptTypeTime/list`, { method: 'POST', body: params })
}

export async function doDataExportInfo(params) {
    return request(`/api/dataExportInfo/list`, { method: 'POST', body: params })
}

export async function doProjectReviewStatistics(params) {
    return request(`/api/projectData/listProjectReviewStatistics`, { method: 'POST', body: params })
}

export async function doBugChokeList(params) {
    return request(`/api/testManage/bugChokeList`, { method: 'POST', body: params })
}

export async function doCaseImplementList(params) {
    return request(`/api/testManage/caseImplementList`, { method: 'POST', body: params })
}