<template>
  <card title="进度问题">
    <template #buttons>
      <el-button type="primary" size="small" @click="handleDealQuestionClick">处理问题</el-button>
      <el-button type="primary" size="small" @click="handleAddQuestionClick">添加问题</el-button>
      <el-popover placement="left" trigger="hover" width="800" style="margin-left: 10px">
        <card title="系统自动识别规则">
          <template #buttons>
            <el-button type="primary" style="small" @click="handleAddRuleClick">添加规则</el-button>
          </template>
          <my-table :table-data="ruleTableList" :options="ruleTableOptions" />
        </card>
        <el-button
          slot="reference"
          icon="el-icon-bell"
          circle
          size="small"
          style="font-size: 16px"
        />
      </el-popover>
    </template>

    <el-row :gutter="20">
      <el-col :span="2">
        <p>数量</p>
        <p>发现问题</p>
        <p>闭环问题</p>
      </el-col>
      <el-col :span="2">
        <p>个数</p>
        <p>
          <span style="color: red">
            {{
              systemQuestionTotal === undefined || !systemQuestionTotal
                ? 0
                : systemQuestionTotal.all_num
            }}
          </span>
        </p>
        <p>
          <span style="color: red">
            {{
              systemQuestionTotal === undefined || !systemQuestionTotal
                ? 0
                : systemQuestionTotal.yes_loop_num
            }}
          </span>
        </p>
      </el-col>
      <el-col :span="20">
        <my-table :loading="questionTableLoading" :table-data="questionTableList" :options="questionTableOptions" />
      </el-col>
    </el-row>

    <type-dialog ref="typeDialogRef" />
    <question-dialog ref="questionDialogRef" />
  </card>
</template>

<script>
import request from '@/services/request'

import Card from '@/components/Card'
import MyTable from '@/components/Table'
import TypeDialog from '@/views/manage/system_question/components/TypeDialog'
import QuestionDialog from '@/views/manage/system_question/components/QuestionDialog'

export default {
  name: 'CommunicationManage',
  components: {
    Card,
    MyTable,
    TypeDialog,
    QuestionDialog
  },
  props: {
    project: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      systemQuestionTotal: undefined,
      questionTableOptions: [
        {
          label: '来源',
          prop: 'source',
          key: 'source',
          width: 70
        },
        {
          label: '问题',
          prop: 'question',
          key: 'question',
          width: 100
        },
        {
          label: '责任人',
          prop: 'user_name',
          key: 'user_name',
          width: 80
        },
        {
          label: '管理者',
          prop: 'manage_name',
          key: 'manage_name',
          width: 80
        },
        {
          label: '发现时间',
          prop: 'createTime',
          key: 'createTime',
          width: 160
        },
        {
          label: '是否闭环',
          prop: 'is_loop',
          key: 'is_loop',
          width: 80,
          render: (text, record) => {
            if (text === 1) {
              return <div>是</div>
            }
            return <div>否</div>
          }
        },
        {
          label: '闭环时间',
          prop: 'loopTime',
          key: 'loopTime',
          width: 160
        },
        {
          label: '是否跟催',
          prop: 'is_urge',
          key: 'is_urge',
          width: 80,
          render: (text, record) => {
            if (text === 1) {
              return <div>是</div>
            }
            return <div>否</div>
          }
        },
        {
          label: '问题类型',
          prop: 'question_type',
          key: 'question_type',
          width: 100
        },
        {
          label: '问题现象',
          prop: 'phenomenon',
          key: 'phenomenon',
          width: 120
        },
        {
          label: '问题根因',
          prop: 'question_cause',
          key: 'question_cause',
          width: 120
        },
        {
          label: '根因补充结果',
          prop: 'cause_replenish',
          key: 'cause_replenish',
          width: 120
        },
        {
          label: '考核时间',
          prop: 'examineTime',
          key: 'examineTime',
          width: 160
        },
        {
          label: '是否忽略',
          prop: 'is_ignore',
          key: 'is_ignore',
          width: 80,
          render: (text, record) => {
            if (text === 1) {
              return <div>是</div>
            }
            return <div>否</div>
          }
        },
        {
          label: '事件积分',
          prop: 'event_integral',
          key: 'event_integral',
          width: 80
        },
        {
          label: '修复积分',
          prop: 'repair_integral',
          key: 'repair_integral',
          width: 80
        }
      ],
      questionTableList: [],
      questionTableLoading: false,
      // 规则相关部分
      ruleTableList: [],
      ruleTableOptions: [
        {
          label: '问题',
          prop: 'question',
          width: '160'
        },
        {
          label: '判断依据',
          prop: 'according',
          width: '120'
        },
        {
          label: '根因',
          prop: 'cause',
          width: '120'
        },
        {
          label: '根因补充说明',
          prop: 'cause_replenish',
          width: '120'
        },
        {
          label: '问题其他补充',
          prop: 'other_replenish',
          width: '120'
        },
        {
          label: '支撑人员',
          prop: 'user_name',
          width: '80'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getSystemQuerstionTypeList()
      this.getSystemQuestionTotal(this.project)
      this.getSystemQuestionList(this.project)
    },
    // 点击处理问题
    handleDealQuestionClick() {
      this.$router.push('/manage/system_question')
    },
    // 点击添加问题
    handleAddQuestionClick() {
      this.$refs.questionDialogRef.dialogVisible = true
      this.$refs.questionDialogRef.resetTemp()
    },
    // 显示添加规则对话框
    handleAddRuleClick() {
      this.$refs.typeDialogRef.dialogVisible = true
      this.$refs.typeDialogRef.resetTemp()
    },
    // 获取规则列表
    async getSystemQuerstionTypeList() {
      const { data: res } = await request('/api/systemAutoProjectQuestion/typeList')
      this.ruleTableList = res
    },
    // 获取系统问题总数
    async getSystemQuestionTotal(project) {
      const { data: res } = await request('/api/systemAutoProjectQuestion/findByQuestionTotal', {
        params: {
          project
        }
      })
      this.systemQuestionTotal = res
    },
    // 获取系统问题列表
    async getSystemQuestionList(project) {
      this.questionTableLoading = true
      const { data: res } = await request('/api/systemAutoProjectQuestion/projectList', {
        params: {
          project
        }
      })
      this.questionTableList = res

      this.$nextTick(() => {
        this.questionTableLoading = false
      })
    }
  }
}
</script>
