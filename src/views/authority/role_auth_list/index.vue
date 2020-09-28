<template>
  <el-card id="authority-role-auth-list">
    <el-table
      v-loading="tableLoading"
      :data="list"
      highlight-current-row
      row-key="id"
      style="width: 100%; margin-top: 20px;"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :header-cell-style="{ background: '#f6f6f6' }"
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.key"
        :label="item.title"
        :prop="item.dataIndex"
        :min-width="item.width"
      >
        <template slot-scope="{row}">
          <div v-if="item.dataIndex === 'action'">
            <el-popconfirm
              title="您确定要拒绝改申请?"
              style="margin-right: 8px;"
              @onConfirm="handleRefuseClick(row)"
            >
              <el-button v-if="row.parent_id !== 0" slot="reference" type="danger" size="small">拒绝</el-button>
            </el-popconfirm>
            <el-popconfirm title="您确定要同意改申请" @onConfirm="handleAgreeClick(row)">
              <el-button v-if="row.parent_id !== 0" slot="reference" type="primary" size="small">同意</el-button>
            </el-popconfirm>
          </div>

          <div
            v-else-if="item.dataIndex === 'msg'"
            style="white-space: normal;"
          >{{ row[item.dataIndex] }}</div>

          <span v-else>{{ row[item.dataIndex] }}</span>
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
import { doListRoleAuth } from '@/services/authority/role'

export default {
  name: 'AuthorityRole',
  components: { Pagination },
  data() {
    return {
      pageInfo: {
        orderBy: null,
        pageNum: 1,
        pageSize: 10
      },
      list: [],
      total: 0,
      tableLoading: false,
      tableOptions: [
        {
          title: '申请人',
          dataIndex: 'person',
          key: 'person',
          width: 80
        },
        {
          title: '申请标题',
          dataIndex: 'title',
          key: 'title',
          width: 100
        },
        {
          title: '申请内容',
          dataIndex: 'msg',
          key: 'msg',
          width: 150
        },
        {
          title: '申请时间',
          dataIndex: 'apply_time',
          key: 'apply_time',
          width: 120
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          width: 80
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loadingList()
    },
    // 点击新建
    handleCreateClick() {
      this.$refs.addDialogRef.dialogVisible = true
      this.$refs.addDialogRef.resetTemp()
    },
    // 点击拒绝
    async handleRefuseClick(row) {
      const values = {
        roleId: row.role_id,
        personId: row.person_id,
        person: row.person
      }

      const { data: res } = await request('/api/authority/role/refuseApply', {
        method: 'POST',
        data: values
      })

      if (res) {
        this.$message.success('拒绝成功')
        this.init()
      }
    },
    // 点击同意
    async handleAgreeClick(row) {
      const values = {
        roleId: row.role_id,
        personId: row.person_id,
        person: row.person
      }

      const { data: res } = await request('/api/authority/roleMan/add', {
        method: 'POST',
        data: values
      })

      if (res && res !== undefined) {
        this.$message.success('权限开通成功')
        this.init()
      }
    },
    handleQueryClick() {
      this.pageInfo.orderBy = null
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = 10

      this.queryList()
    },
    handleResetClick() {
      this.listQuery = {
        role: undefined,
        code: undefined,
        name: undefined
      }
      this.pageInfo.orderBy = null
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = 10

      this.loadingList()
    },
    handlePageUpdate(e) {
      this.pageInfo.pageSize = e.limit
      this.pageInfo.pageNum = e.page
      this.queryList()
    },
    async queryList() {
      this.tableLoading = true
      const params = {
        conditions: {
          ...this.listQuery
        },
        ...this.pageInfo
      }
      const { data: res } = await doListRoleAuth(params)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    async loadingList() {
      this.tableLoading = true
      const { data: res } = await doListRoleAuth(this.pageInfo)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#authority-role-auth-list {
  margin: 20px;
}
</style>
