// 用例卡片的 select 的列表
export const caseCardSelectList = [
  '用例总数',
  '已执行',
  '执行率',
  '未执行',
  'SKIP',
  'PASS数',
  'PASS率',
  'FAIL数',
  'FAIL率',
  '未分析',
  '今日执行总数',
  '今日PASS总数',
  '计划明日执行个数',
  '还需执行天数',
  '执行分析'
]

// 用例卡片的 select 的默认选中列表
export const caseCardSelectDefaultList = [
  '用例总数',
  '已执行',
  '执行率',
  '未执行',
  'SKIP',
  'PASS数',
  'PASS率',
  'FAIL数',
  'FAIL率',
  '未分析',
  '今日执行总数',
  '今日PASS总数'
]

// 用例卡片的 table 的标题列表
export const caseCardTableTitleList = [
  {
    prop: 'all_num',
    label: '用例总数',
    minWidth: 89
  },
  {
    prop: 'exe_num',
    label: '已执行',
    minWidth: 75
  },
  {
    prop: 'exe_rate',
    label: '执行率',
    minWidth: 78
  },
  {
    prop: 'no_num',
    label: '未执行',
    minWidth: 75
  },
  {
    prop: 'skip_num',
    label: 'SKIP',
    minWidth: 70
  },
  {
    prop: 'pass_num',
    label: 'PASS数',
    minWidth: 89
  },
  {
    prop: 'pass_rate',
    label: 'PASS率',
    minWidth: 89
  },
  {
    prop: 'fail_num',
    label: 'FAIL数',
    minWidth: 80
  },
  {
    prop: 'fail_rate',
    label: 'FAIL率',
    minWidth: 78
  },
  {
    prop: 'no_analyse_num',
    label: '未分析',
    minWidth: 75
  },
  {
    prop: 'day_all_num',
    label: '今日执行总数',
    minWidth: 117
  },
  {
    prop: 'day_pass_num',
    label: '今日PASS总数',
    minWidth: 132
  },
  {
    prop: 'tomorrow_num',
    label: '计划明日执行个数',
    minWidth: 145
  },
  {
    prop: 'exe_day_num',
    label: '还需执行天数',
    minWidth: 117
  },
  {
    prop: 'analyse',
    label: '执行分析',
    minWidth: 200
  }
]

// 设计卡片的 select 的列表
export const desginCardSelectList = [
  '总计TP个数',
  '已完成TP个数',
  '计划周期内完成的TP个数',
  '周期超期的TP个数',
  '资源超期的TP个数',
  '预计完成用例个数',
  '已完成用例个数'
]

// 设计卡片的 select 的默认选中列表
export const desginCardSelectDefaultList = [
  '总计TP个数',
  '已完成TP个数',
  '计划周期内完成的TP个数',
  '周期超期的TP个数',
  '资源超期的TP个数',
  '预计完成用例个数',
  '已完成用例个数'
]

// 设计卡片的 table 的标题列表
export const desginCardTableTitleList = [
  {
    prop: 'ttpcount',
    label: '总计TP个数',
    width: '125'
  },
  {
    prop: 'atpcount',
    label: '已完成TP个数',
    width: '139'
  },
  {
    prop: 'btpcount',
    label: '计划周期内完成的TP个数',
    width: '209'
  },
  {
    prop: 'ctpcount',
    label: '周期超期的TP个数',
    width: '167'
  },
  {
    prop: 'dtpcount',
    label: '资源超期的TP个数',
    width: '167'
  },
  {
    prop: 'etpcount',
    label: '预计完成用例个数',
    width: '165'
  },
  {
    prop: 'ftpcount',
    label: '已完成用例个数',
    width: '151'
  }
]

export const reviewCardSelectList = [
  'PTGTTM',
  '代码量',
  '缺陷个数',
  '缺陷率',
  '需求缺陷',
  '设计缺陷',
  '可测试意见个数',
  '设计与需求不一致个数',
  '需求与原始需求不一致个数'
]

export const reviewCardSelectDefaultList = [
  'PTGTTM',
  '代码量',
  '缺陷个数',
  '缺陷率',
  '需求缺陷',
  '设计缺陷'
]

export const reviewCardTableTitleList = [
  {
    prop: 'ptgtmm',
    label: 'PTGTTM',
    minWidth: '100'
  },
  {
    prop: 'code_count',
    label: '代码量',
    minWidth: '80'
  },
  {
    prop: 'defect_count',
    label: '缺陷个数',
    minWidth: '90'
  },
  {
    prop: 'defect_rate',
    label: '缺陷率',
    minWidth: '80'
  },
  {
    prop: 'demand_defect',
    label: '需求缺陷',
    minWidth: '90'
  },
  {
    prop: 'desgin_defect',
    label: '设计缺陷',
    minWidth: '90'
  },
  {
    prop: 'testable_opinion_count',
    label: '可测试意见个数',
    minWidth: '131'
  },
  {
    prop: 'no-desgin_demand_count',
    label: '设计与需求不一致个数',
    minWidth: '173'
  },
  {
    prop: 'no_demand_original_count',
    label: '需求与原始需求不一致个数',
    minWidth: '201'
  }
]
