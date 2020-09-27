<template>
  <el-card id="authority-role-name">
    <el-row :gutter="20">
      <el-col :span="6">
        <span>角色名称：</span>
        <el-input
          v-model.trim="listQuery.role"
          placeholder="请输入角色名称"
          size="small"
          style="width: 80%; max-width: 200px;"
        />
      </el-col>
      <el-col :span="6">
        <span>人员工号：</span>
        <el-input
          v-model.trim="listQuery.code"
          placeholder="请输入人员工号"
          size="small"
          style="width: 80%; max-width: 200px;"
        />
      </el-col>
      <el-col :span="6">
        <span>人员姓名：</span>
        <el-input
          v-model.trim="listQuery.name"
          placeholder="请输入人员姓名"
          size="small"
          style="width: 80%; max-width: 200px;"
        />
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
        <el-button size="small" @click="handleResetClick">重置</el-button>
        <el-button type="primary" size="small" @click="handleCreateClick">新增</el-button>
      </el-col>
    </el-row>

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
            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="handleDeteleClick(row)">
              <el-button v-if="row.parent_id !== 0" slot="reference" type="danger" size="small">删除</el-button>
            </el-popconfirm>
          </div>

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

    <add-dialog ref="addDialogRef" @reload="init" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import AddDialog from './components/AddDialog'

import request from '@/services/request'
import { doListRoleMan } from '@/services/authority/role'

export default {
  name: 'AuthorityRoleName',
  components: { Pagination, AddDialog },
  data() {
    return {
      role: '',
      listQuery: {
        role: undefined,
        code: undefined,
        name: undefined
      },
      pageInfo: {
        orderBy: null,
        pageNum: 1,
        pageSize: 20
      },
      list: [],
      total: 0,
      tableLoading: false,
      tableOptions: [
        {
          title: '人员工号',
          dataIndex: 'person_id',
          key: 'person_id',
          width: 80
        },
        {
          title: '人员姓名',
          dataIndex: 'person_name',
          key: 'person_name',
          width: 80
        },
        {
          title: '角色名称',
          dataIndex: 'role_cn',
          key: 'role_cn',
          width: 80
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          width: 60
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
    // 点击删除
    async handleDeteleClick(row) {
      const { data: res } = await request('/api/authority/roleMan/delete', {
        method: 'DELETE',
        params: {
          id: row.id
        }
      })

      if (res && res !== undefined) {
        this.$message.success('删除成功')
        this.init()
      }
    },
    handleQueryClick() {
      this.pageInfo.orderBy = null
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = 20

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
      this.pageInfo.pageSize = 20

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
      const { data: res } = await doListRoleMan(params)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    async loadingList() {
      this.tableLoading = true
      const { data: res } = await doListRoleMan(this.pageInfo)
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
#authority-role-name {
  margin: 20px;

  .el-row {
    .el-col {
      display: flex;
      align-items: center;

      > span {
        font-size: 14px;
        white-space: nowrap;
      }
    }
  }
}
</style>
