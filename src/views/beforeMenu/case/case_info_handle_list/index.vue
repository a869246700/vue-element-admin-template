<template>
  <el-card id="case-info-handle-list" class="my-card">
    <el-row :gutter="20">
      <el-col :span="6">
        <span class="form-title">案件编号：</span>
        <el-input
          v-model.trim="listQuery.id"
          :disabled="deptDisabled"
          placeholder="请输入案件编号"
          size="small"
          class="operation-input"
        />
      </el-col>
      <el-col :span="6">
        <span class="form-title">案件内容：</span>
        <el-input
          v-model.trim="listQuery.caseContent"
          :disabled="deptDisabled"
          placeholder="请输入案件内容"
          size="small"
          class="operation-input"
        />
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
        <el-button size="small" @click="handleResetClick">重置</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleCreateClick"
        >新建</el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="tableLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px"
      :header-cell-style="{ background: '#f6f6f6' }"
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.key"
        :label="item.title"
        :prop="item.dataIndex"
        :min-width="item.width"
        :show-overflow-tooltip="item.sot"
      >
        <template slot-scope="{ row }">
          <div v-if="item.key === 'action'">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              style="margin-right: 10px"
              @click="handleEditClick(row)"
            />

            <el-popconfirm title="您确定删除该计划?" @onConfirm="handleDeleteClick(row)">
              <el-button slot="reference" type="danger" size="small" icon="el-icon-delete" />
            </el-popconfirm>
          </div>
          <div v-else :class="item.sot ? 'text-out-hiiden' : ''">{{ row[item.dataIndex] }}</div>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="total >= pageInfo.pageSize" class="pagination">
      <pagination
        :total="total"
        :page="pageInfo.pageNum"
        :limit="pageInfo.pageSize"
        :auto-scroll="false"
        @pagination="handlePageUpdate"
      />
    </div>
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination/index'

import request from '@/services/request'
import { doCaseInfoList } from '@/services/case/case'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        orderBy: null
      },
      list: [],
      total: 0,
      tableLoading: false,
      listQuery: {
        business: '',
        dept: '',
        userName: ''
      },
      businessDisabled: false,
      deptDisabled: false,
      tableOptions: [
        {
          title: '案例编号',
          dataIndex: 'id',
          key: 'id',
          width: 80
        },
        {
          title: '收集时间',
          dataIndex: 'time',
          key: 'time',
          width: 160
        },
        {
          title: '案例内容',
          dataIndex: 'case_content',
          key: 'case_content',
          width: 150,
          sot: true
        },
        {
          title: '责任人',
          dataIndex: 'duty_name',
          key: 'duty_name',
          width: 100
        },
        {
          title: '当事人描述',
          dataIndex: 'event_describe',
          key: 'event_describe',
          width: 150,
          sot: true
        },
        {
          title: '项目分析',
          dataIndex: 'project_analyse',
          key: 'project_analyse',
          width: 150,
          sot: true
        },
        {
          title: '流程分析',
          dataIndex: 'flow_analyse',
          key: 'flow_analyse',
          width: 150,
          sot: true
        },
        {
          title: '项目改进',
          dataIndex: 'project_improve',
          key: 'project_improve',
          width: 150,
          sot: true
        },
        {
          title: '流程改进',
          dataIndex: 'flow_improve',
          key: 'flow_improve',
          width: 150,
          sot: true
        },
        {
          title: '个人改进',
          dataIndex: 'improve',
          key: 'improve',
          width: 150,
          sot: true
        },
        {
          title: '案例状态',
          dataIndex: 'state',
          key: 'state',
          width: 120
        },
        {
          title: '操作',
          key: 'action',
          width: 120
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loadList()
      this.queryIsShow()
    },
    handleQueryClick() {
      this.resetPageInfo()
      this.queryList()
    },
    handleResetClick() {
      this.resetPageInfo()
      this.listQuery = {
        business: '',
        dept: '',
        userName: ''
      }
      this.loadList()
    },
    handleCreateClick() {
      this.$refs.dialogRef.create()
    },
    resetPageInfo() {
      this.pageInfo = {
        orderBy: null,
        pageSize: 10,
        pageNum: 1
      }
    },
    handlePageUpdate(e) {
      // 1. 修改分段器配置
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit

      this.queryList()
    },
    handleEditClick(row) {
      this.$refs.dialogRef.edit(row)
    },
    async handleDeleteClick(row) {
      const values = {
        userName: row.user_name,
        realm: row.realm,
        realmType: row.realm_type
      }

      const { data: res } = await request('/api/userQualificationsPlan/delete', {
        method: 'DELETE',
        data: values
      })
      if (res) {
        this.$message.success('删除成功')
        this.loadList()
      }
    },
    async loadList() {
      this.tableLoading = true
      this.resetPageInfo()
      const { data: res } = await doCaseInfoList(this.pageInfo)
      console.log(res)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    async queryList() {
      this.tableLoading = true
      const params = {
        conditions: this.listQuery,
        ...this.pageInfo
      }
      const { data: res } = await doCaseInfoList(params)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    async queryIsShow() {
      const { data: res } = await request('/api/userQualificationsAuthority/infoQueryIsShow', {
        method: 'POST'
      })
      this.businessDisabled = res.business
      this.deptDisabled = res.dept
    }
  }
}
</script>

<style lang="scss" scoped>
#case-info-handle-list {
  height: 100%;

  .form-title {
    font-size: 14px;
  }

  .operation-input {
    max-width: 150px;
    width: 100%;
  }

  .text-out-hiiden {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
</style>
