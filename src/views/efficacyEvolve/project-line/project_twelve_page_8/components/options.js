export const statisticsTableList = [
  {
    prop: 'technical_issues',
    label: '技术课题',
    minWidth: 120
  },
  {
    prop: 'technical_issues_code',
    label: '代码量',
    minWidth: 100
  },
  {
    prop: 'acceptance_method',
    label: '验收方式',
    minWidth: 140
  },
  {
    prop: 'work_package_defect_total',
    label: '工作包缺陷',
    minWidth: 140
  },
  {
    prop: 'technical_issues_omission',
    label: '课题遗漏',
    minWidth: 120
  },
  {
    prop: 'defect_rate',
    label: '缺陷率',
    minWidth: 100
  },
  {
    prop: 'no_unkonwn_defect',
    label: '未知缺陷',
    minWidth: 100
  },
  {
    prop: 'functional_class',
    label: '功能类',
    minWidth: 100
  },
  {
    prop: 'performance_class',
    label: '性能类',
    minWidth: 100
  },
  {
    prop: 'no_functional_class',
    label: '非功能类',
    minWidth: 100
  }
]

export const detailTableList = [
  {
    prop: 'project_name',
    label: '项目名称',
    minWidth: 120
  },
  {
    prop: 'technical_issues',
    label: '技术课题',
    minWidth: 120
  },
  {
    prop: 'acceptance_method',
    label: '验收方式',
    minWidth: 140
  },
  {
    prop: 'work_package',
    label: '工作包',
    minWidth: 100
  },
  {
    prop: 'code_count',
    label: '代码量',
    minWidth: 100
  },
  {
    prop: 'dev_principal',
    label: '开发负责人',
    minWidth: 120
  },
  {
    prop: 'test_principal',
    label: '测试负责人',
    minWidth: 120
  },
  {
    prop: 'bugid',
    label: 'bugid',
    minWidth: 100
  },
  {
    prop: 'bug_desc',
    label: 'bug描述',
    minWidth: 120
  },
  {
    prop: 'omission_type',
    label: '遗漏类型归属',
    minWidth: 140
  },
  {
    prop: 'omission_reason',
    label: '遗漏原因',
    minWidth: 120
  },
  {
    prop: 'improve_solution',
    label: '改进对策',
    minWidth: 120
  }
]

export const rules = {
  project_name: [{ required: true, message: '请填写项目名称', trigger: 'blur' }],
  bugid: [{ required: true, message: '请填写bugid', trigger: 'blur' }],
  omission_type: [{ required: true, message: '请填写遗漏类型归属', trigger: 'blur' }],
  omission_reason: [{ required: true, message: '请填写遗漏原因', trigger: 'blur' }],
  improve_solution: [{ required: true, message: '请填写改进对策', trigger: 'blur' }]
}
