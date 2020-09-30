export const tableTitleList = [
  {
    prop: 'stage',
    label: '阶段',
    minWidth: 80
  },
  {
    prop: 'creation_time',
    label: '创建时间',
    minWidth: 160
  },
  {
    prop: 'risk_item',
    label: '风险项',
    minWidth: 120
  },
  {
    prop: 'risk_desc',
    label: '风险描述',
    minWidth: 160
  },
  {
    prop: 'influence',
    label: '影响',
    minWidth: 80
  },
  {
    prop: 'source',
    label: '来源',
    minWidth: 80
  },
  {
    prop: 'type',
    label: '类别',
    minWidth: 80
  },
  {
    prop: 'occurrence_stage',
    label: '发生阶段',
    minWidth: 160
  },
  {
    prop: 'risk_probability',
    label: '风险概率',
    minWidth: 90
  },
  {
    prop: 'risk_level',
    label: '风险等级',
    minWidth: 90
  },
  {
    prop: 'principal',
    label: '责任人',
    minWidth: 120
  },
  {
    prop: 'risk_status',
    label: '风险状态',
    minWidth: 120
  },
  {
    prop: 'current_progress',
    label: '当前进展',
    minWidth: 120
  },
  {
    prop: 'hope_resolution_time',
    label: '希望解决时间',
    minWidth: 160
  },
  {
    prop: 'last_update_time',
    label: '最后更新时间',
    minWidth: 160
  }
]

// form 表单的 rule 校验项
export const rules = {
  project_type: [{ required: true, message: '请填写主干/组件', trigger: 'blur' }],
  project_stage: [{ required: true, message: '请填写阶段', trigger: 'blur' }],
  createTime: [{ required: true, message: '请填写创建时间', trigger: 'change' }],
  risk: [{ required: true, message: '请填写风险项', trigger: 'blur' }],
  risk_describe: [{ required: true, message: '请填写风险描述', trigger: 'blur' }],
  influence: [{ required: true, message: '请填写影响', trigger: 'blur' }],
  source: [{ required: true, message: '请选择来源', trigger: 'change' }],
  type: [{ required: true, message: '请选择类型', trigger: 'change' }],
  stage: [{ required: true, message: '请选择发生阶段', trigger: 'change' }],
  probability: [{ required: true, message: '请选择风险概率', trigger: 'change' }],
  effect: [{ required: true, message: '请选择风险等级', trigger: 'change' }],
  duty_name: [{ required: true, message: '请填写负责人', trigger: 'blur' }],
  state: [{ required: true, message: '请填写风险状态', trigger: 'blur' }],
  newest_progress: [{ required: true, message: '请填写当前进展', trigger: 'blur' }]
}

