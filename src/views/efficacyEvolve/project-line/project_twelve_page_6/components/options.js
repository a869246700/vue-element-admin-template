export const tableTitleList = [
  {
    prop: 'id',
    label: 'ID',
    minWidth: 60
  },
  {
    prop: 'project',
    label: '项目',
    minWidth: 100
  },
  {
    prop: 'task_name',
    label: '任务名称',
    minWidth: 120
  },
  {
    prop: 'duty_name',
    label: '负责人',
    minWidth: 100
  },
  {
    prop: 'target',
    label: '目标',
    minWidth: 140
  },
  {
    prop: 'newest_progress',
    label: '当前进展',
    minWidth: 140
  },
  {
    prop: 'risk',
    label: '风险&问题',
    minWidth: 140
  },
  {
    prop: 'countermeasure',
    label: '对策',
    minWidth: 100
  },
  {
    prop: 'plan_finish_date',
    label: '预计达成时间',
    minWidth: 160
  },
  {
    prop: 'cause',
    label: '偏差原因',
    minWidth: 140
  }
]

// form 表单的 rule 校验项
export const rules = {
  project: [{ required: true, message: '请选择项目', trigger: 'change' }],
  taskName: [{ required: true, message: '请填写任务名称', trigger: 'blur' }],
  planFinishDate: [{ required: true, message: '请选择预计达成时间', trigger: 'change' }],
  cause: [{ required: true, message: '请填写偏差原因', trigger: 'blur' }],
  dutyName: [{ required: true, message: '请填写负责人', trigger: 'blur' }],
  target: [{ required: true, message: '请填写目标', trigger: 'blur' }],
  risk: [{ required: true, message: '请填写风险&问题', trigger: 'blur' }],
  countermeasure: [{ required: true, message: '请填写对策', trigger: 'blur' }],
  newestProgress: [{ required: true, message: '请填写对当前进展', trigger: 'blur' }]
}

export const wbsTableOptions = [
  {
    prop: 'plan_start_date',
    label: '计划开始时间',
    minWidth: '140'
  },
  {
    prop: 'plan_end_date',
    label: '计划结束时间',
    minWidth: '140'
  },
  {
    prop: 'priority',
    label: '优先级',
    minWidth: '80'
  },
  {
    prop: 'progress',
    label: '进度',
    minWidth: '80'
  },
  {
    prop: 'deviation',
    label: '偏差',
    minWidth: '80'
  },
  {
    prop: 'remark',
    label: '备注',
    minWidth: '160'
  }
]
