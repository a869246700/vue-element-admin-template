<template>
  <el-card id="project-select">
    <el-row :gutter="24">
      <el-col :span="15">
        <p>总计</p>
      </el-col>
      <el-col :span="9">
        <p>问题</p>
      </el-col>
    </el-row>

    <el-table
      ref="taleRef"
      v-loading="tableLoading"
      :data="showList"
      highlight-current-row
      border
      :header-cell-style="{ background: '#F5F7FA' }"
      style="width: 100%; margin-top: 10px;"
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.dataIndex"
        :label="item.title"
        :prop="item.key"
        :min-width="item.width"
        :fixed="item.fixed"
        :show-overflow-tooltip="item.sot"
      >
        <template slot-scope="{row}">
          <div v-if="item.key === 'action'">
            <el-button type="primary" size="small" @click="handleEditClick(row)">修改</el-button>
          </div>
          <div
            v-if="item.sot"
            style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap;"
          >{{ row[item.key] }}</div>
          <div v-else>{{ row[item.key] }}</div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <pagination
        :total="total"
        :page="pageInfo.pageNum"
        :limit="pageInfo.pageSize"
        :auto-scroll="false"
        @pagination="handlePageUpdate"
      />
    </div>

    <edit-dialog ref="editDialogRef" @reload="init" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import EditDialog from './components/EditDialog'

import request from '@/services/request'

export default {
  name: 'ProjectSelect',
  components: { Pagination, EditDialog },
  data() {
    return {
      tableLoading: false,
      list: [],
      total: 0,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      tableOptions: [
        {
          title: '客户',
          dataIndex: 'customer',
          key: 'customer',
          fixed: 'left',
          width: 180
        },
        {
          title: '项目',
          dataIndex: 'project',
          key: 'project',
          fixed: 'left',
          width: 120,
          sot: true
        },
        {
          title: '事业部归属',
          dataIndex: 'business_dep',
          key: 'business_dep',
          width: 100
        },
        {
          title: '入围开始时间(计划)',
          dataIndex: 'plan_start_date',
          key: 'plan_start_date',
          width: 150,
          sot: true
        },
        {
          title: '入围完成时间(计划)',
          dataIndex: 'plan_end_date',
          key: 'plan_end_date',
          width: 150
        },
        {
          title: '是否通过',
          dataIndex: 'is_pass',
          key: 'is_pass',
          width: 80
        },
        {
          title: '是否平台原因导致',
          dataIndex: 'is_platform_cause',
          key: 'is_platform_cause',
          width: 150
        },
        {
          title: '入围开始时间(实际)',
          dataIndex: 'actual_start_date',
          key: 'actual_start_date',
          width: 150
        },
        {
          title: '入围完成时间(实际)',
          dataIndex: 'actual_end_date',
          key: 'actual_end_date',
          width: 150
        },
        {
          title: '技术分排名',
          dataIndex: 'ranking',
          key: 'ranking',
          width: 100
        },

        {
          title: '金额（亿)',
          dataIndex: 'money',
          key: 'money',
          width: 90
        },
        {
          title: 'Fail原因',
          dataIndex: 'fail_cause',
          key: 'fail_cause',
          width: 150,
          sot: true
        },
        {
          title: 'Fail项',
          dataIndex: 'fail_term',
          key: 'fail_term',
          width: 150,
          sot: true
        },
        {
          title: '问题内部闭环',
          dataIndex: 'question_loop',
          key: 'question_loop',
          width: 150,
          sot: true
        },
        {
          title: '备注',
          dataIndex: 'remarks',
          key: 'remarks',
          width: 150,
          sot: true
        },
        {
          title: '新增时间',
          dataIndex: 'add_date',
          key: 'add_date',
          width: 140
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right'
        }
      ]
    }
  },
  computed: {
    showList() {
      const page = this.pageInfo.pageNum
      const limit = this.pageInfo.pageSize
      return this.list.slice((page - 1) * limit, page * limit)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.queryByPlatformPromiseInfoList()
    },
    handlePageUpdate(e) {
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit
    },
    handleEditClick(row) {
      this.$refs.editDialogRef.setTemp(row)
    },
    async queryByPlatformPromiseInfoList() {
      this.tableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/findByPlatformSelectInfoList')
      this.list = res
      this.total = res.length || 0

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#project-select {
  margin: 20px;

  .el-row {
    border: 1px solid #ddd;
    padding: 24px;
    box-sizing: content-box;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}
</style>
