<template>
  <div class="integral-manage">
    <!-- 积分管理 -->
    <!-- 操作栏 -->
    <el-form ref="formRef" :inline="true" :model="listQuery" class="demo-form-inline">
      <el-form-item label="日期" prop="date">
        <el-date-picker
          v-model="listQuery.date"
          :picker-options="pickerOptions"
          type="date"
          size="small"
          value-format="yyyy-MM-dd"
          placeholder="请选择日期"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="人员" prop="userName">
        <el-input
          v-model.trim="listQuery.userName"
          size="small"
          placeholder="请输入人员姓名"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
        <el-button @click="handleResetClick">重置</el-button>
      </el-form-item>
    </el-form>

    <my-table v-loading="tableLoading" :table-data="list" :options="options" />
  </div>
</template>

<script>
import MyTable from '@/components/Table'

import request from '@/services/request'
import { parseTime } from '@/utils'

export default {
  components: {
    MyTable
  },
  inject: ['project'],
  data() {
    return {
      list: [],
      options: [
        {
          title: '日期',
          prop: 'date',
          key: 'date',
          width: 100,
          fixed: 'left'
        },
        {
          title: '员工编号',
          prop: 'user_code',
          key: 'user_code',
          width: 110,
          fixed: 'left'
        },
        {
          title: '员工姓名',
          prop: 'user_name',
          key: 'user_name',
          width: 110,
          fixed: 'left'
        },
        {
          title: '部门',
          prop: 'department',
          key: 'department',
          width: 120
        },
        {
          title: '专业组',
          prop: 'group_name',
          key: 'group_name',
          width: 110
        },
        {
          title: '总分',
          prop: 'total_score',
          key: 'total_score',
          width: 80,
          sortable: true,
          sorter: (a, b) => a.total_score - b.total_score
        },
        {
          title: '需入库脚本总数',
          prop: 'script_all_num',
          key: 'script_all_num',
          width: 120
        },
        {
          title: '已入库脚本数',
          prop: 'script_success_num',
          key: 'script_success_num',
          width: 110
        },
        {
          title: '入库脚本分数',
          prop: 'script_score',
          key: 'script_score',
          width: 110
        },
        {
          title: '工作包质量分数',
          prop: 'legacy_score',
          key: 'legacy_score',
          width: 130
        },
        {
          title: '严重bug数',
          prop: 'serious_num',
          key: 'serious_num',
          width: 90
        },
        {
          title: 'bug总数',
          prop: 'bug_all_num',
          key: 'bug_all_num',
          width: 80,
          render: (text, record) => {
            return record.serious_num + record.other_num
          }
        },
        {
          title: '严重bug占比分数',
          prop: 'bug_serious_score',
          key: 'bug_serious_score',
          width: 140
        },
        {
          title: '自动化反馈个数',
          prop: 'auto_feedback_num',
          key: 'auto_feedback_num',
          width: 130
        },
        {
          title: '自动化反馈分数',
          prop: 'auto_feedback_score',
          key: 'auto_feedback_score',
          width: 130
        },
        {
          title: '手工反馈分数',
          prop: 'hand_feedback_score',
          key: 'hand_feedback_score',
          width: 120
        },
        {
          title: '用例需执行总数',
          prop: 'exe_all_num',
          key: 'exe_all_num',
          width: 130
        },
        {
          title: '用例已执行个数',
          prop: 'exe_num',
          key: 'exe_num',
          width: 130
        },
        {
          title: '完成执行分数',
          prop: 'exe_score',
          key: 'exe_score',
          width: 120
        },
        {
          title: '阶段用例需执行总数',
          prop: 'stage_exe_all_num',
          key: 'stage_exe_all_num',
          width: 150
        },
        {
          title: '阶段用例已执行个数',
          prop: 'stage_exe_num',
          key: 'stage_exe_num',
          width: 150
        },
        {
          title: '阶段完成执行分数',
          prop: 'stage_exe_score',
          key: 'stage_exe_score',
          width: 140
        },
        {
          title: '评审个数',
          prop: 'review_num',
          key: 'review_num',
          width: 80
        },
        {
          title: '评审分数',
          prop: 'review_score',
          key: 'review_score',
          width: 80
        }
      ],
      pickerOptions: {
        disabledDate: (time) => time > +new Date() || time < +new Date('2020-11-03')
      },
      tableLoading: false,
      listQuery: {
        userName: '',
        date: ''
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.listQuery.date = parseTime(new Date(), '{y}-{m}-{d}')
      this.getList()
    },
    handleQueryClick() {
      this.getList()
    },
    handleResetClick() {
      this.$refs.formRef.resetFields()
    },
    async getList() {
      this.tableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByProjectIntegralSta', {
        method: 'GET',
        params: {
          project: this.project,
          ...this.listQuery
        }
      })
      this.list = res

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.integral-manage {
  margin: 10px;
}

.integral-manage ::v-deep .el-form-item {

  &:nth-child(1) {
    margin-left: 0px;
  }

  margin-left: 20px;
}
</style>
