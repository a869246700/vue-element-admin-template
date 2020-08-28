export const statisticsTableList = [
  {
    prop: 'topic_name',
    label: '技术课题',
    minWidth: 180
  },
  {
    prop: 'code',
    label: '代码量',
    minWidth: 80
  },
  {
    prop: 'check_mode',
    label: '验收方式',
    minWidth: 130
  },
  {
    prop: 'all_num',
    label: '工作包缺陷',
    minWidth: 100
  },
  {
    prop: 'type_all_num',
    label: '课题遗漏',
    minWidth: 80
  },
  {
    prop: 'type_all_rate',
    label: '缺陷率',
    minWidth: 80
  },
  {
    prop: 'unknown_defect',
    label: '未知缺陷',
    minWidth: 80
  },
  {
    prop: 'function_type',
    label: '功能类',
    minWidth: 80
  },
  {
    prop: 'performance_type',
    label: '性能类',
    minWidth: 80
  },
  {
    prop: 'no_function_type',
    label: '非功能类',
    minWidth: 80
  }
]

export const detailTableList = [
  {
    prop: 'project',
    label: '项目名称',
    minWidth: 120,
    search: true
  },
  {
    prop: 'topic',
    label: '技术课题',
    minWidth: 120,
    search: true
  },
  {
    prop: 'check_mode',
    label: '验收方式',
    minWidth: 140,
    search: true
  },
  {
    prop: 'work_package',
    label: '工作包',
    minWidth: 100,
    search: true
  },
  {
    prop: 'code',
    label: '代码量',
    minWidth: 100
  },
  {
    prop: 'deve_name',
    label: '开发负责人',
    minWidth: 120,
    search: true
  },
  {
    prop: 'test_name',
    label: '测试负责人',
    minWidth: 120,
    search: true
  },
  {
    prop: 'bugid',
    label: 'bugid',
    minWidth: 100,
    search: true
  },
  {
    prop: 'summary',
    label: 'bug描述',
    minWidth: 120,
    search: true
  },
  {
    prop: 'omit_type',
    label: '遗漏类型归属',
    minWidth: 140,
    search: true
  },
  {
    prop: 'omit_cause',
    label: '遗漏原因',
    minWidth: 120,
    search: true
  },
  {
    prop: 'improve',
    label: '改进对策',
    minWidth: 120,
    search: true
  }
]

export const tableOptions = [
  {
    prop: 'topic_name',
    label: '技术课题',
    minWidth: 100
  },
  {
    prop: 'topic_code',
    label: '技术课题代码量',
    minWidth: 115
  },
  {
    prop: 'check_mode',
    label: '验收方式',
    minWidth: 90,
    search: true
  },
  {
    prop: 'work_package',
    label: '工作包',
    minWidth: 140,
    search: true
  },
  {
    prop: 'code',
    label: '代码量',
    minWidth: 60
  },
  {
    prop: 'workPacketManager',
    label: '开发负责人',
    minWidth: 100,
    search: true
  },
  {
    prop: 'ptgttm',
    label: '测试负责人',
    minWidth: 100,
    search: true
  },
  {
    prop: 'all_num',
    label: '工作包缺陷总数',
    minWidth: 115
  },
  {
    prop: 'type_all_num',
    label: '技术课题遗漏个数',
    minWidth: 128
  },
  {
    prop: 'type_all_rate',
    label: '缺陷率',
    minWidth: 65
  },
  {
    prop: 'function_type',
    label: '功能类',
    minWidth: 65
  },
  {
    prop: 'performance_type',
    label: '性能类',
    minWidth: 65
  },
  {
    prop: 'no_function_type',
    label: '非功能类',
    minWidth: 80
  }
]

export const rules = {
  project_name: [{ required: true, message: '请填写项目名称', trigger: 'blur' }],
  bugid: [{ required: true, message: '请填写bugid', trigger: 'blur' }],
  omission_type: [{ required: true, message: '请填写遗漏类型归属', trigger: 'blur' }],
  omission_reason: [{ required: true, message: '请填写遗漏原因', trigger: 'blur' }],
  improve_solution: [{ required: true, message: '请填写改进对策', trigger: 'blur' }]
}
