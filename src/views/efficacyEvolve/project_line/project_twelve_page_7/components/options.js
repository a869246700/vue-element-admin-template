export const tableTitleList = [
  {
    prop: 'id',
    label: 'ID',
    minWidth: 60
  },
  {
    prop: 'project_name',
    label: '项目',
    minWidth: 100
  },
  {
    prop: 'task_name',
    label: '任务名称',
    minWidth: 120
  },
  {
    prop: 'principal',
    label: '负责人',
    minWidth: 100
  },
  {
    prop: 'target',
    label: '目标',
    minWidth: 140
  },
  {
    prop: 'current_procress',
    label: '当前进展',
    minWidth: 140
  },
  {
    prop: 'risk_issue',
    label: '风险&问题',
    minWidth: 140
  },
  {
    prop: 'solution',
    label: '对策',
    minWidth: 100
  },
  {
    prop: 'forecast_completion_time',
    label: '预计达成时间',
    minWidth: 160
  },
  {
    prop: 'deviation_reason',
    label: '偏差原因',
    minWidth: 140
  }
]

// form 表单的 rule 校验项
export const rules = {
  project_name: [{ required: true, message: '请选择项目', trigger: 'change' }],
  task_name: [{ required: true, message: '请填写任务名称', trigger: 'blur' }],
  forecast_completion_time: [{ required: true, message: '请选择预计达成时间', trigger: 'change' }],
  deviation_reason: [{ required: true, message: '请填写偏差原因', trigger: 'blur' }],
  principal: [{ required: true, message: '请填写负责人', trigger: 'blur' }],
  target: [{ required: true, message: '请填写目标', trigger: 'blur' }],
  risk_issue: [{ required: true, message: '请填写风险&问题', trigger: 'blur' }],
  solution: [{ required: true, message: '请填写对策', trigger: 'blur' }],
  current_procress: [{ required: true, message: '请填写对当前进展', trigger: 'blur' }]
}
