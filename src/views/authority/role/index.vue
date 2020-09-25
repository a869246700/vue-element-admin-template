<template>
  <el-card id="authority-role">
    <el-row :gutter="10">
      <el-col :span="6">
        <span>id：</span>
        <el-input
          v-model.trim="role"
          placeholder="请输入角色名称"
          size="small"
          style="width: 100%; max-width: 200px;"
        />
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
        <el-button size="small" style="margin-right: 10px;" @click="handleResetClick">重置</el-button>
        <el-button
          type="primary"
          size="small"
          style="margin-right: 10px;"
          @click="handleCreateClick"
        >新增</el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="tableLoading"
      :data="list"
      highlight-current-row
      style="width: 100%; margin-top: 20px;"
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
              <el-button v-if="row.def_falg === 0" slot="reference" type="danger" size="small">删除</el-button>
            </el-popconfirm>
          </div>

          <div
            v-else-if="item.dataIndex === 'role_num'"
          >{{ row[item.dataIndex] === undefined || row[item.dataIndex].length === 0 ? 0 : row[item.dataIndex] }}</div>

          <div v-else>{{ row[item.dataIndex] }}</div>
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

    <add-dialog ref="addDialogRef" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import AddDialog from './components/AddDialog'

import request from '@/services/request'
import { doListRole } from '@/services/authority/role'

export default {
  name: 'AuthorityRole',
  components: {
    Pagination,
    AddDialog
  },
  data() {
    return {
      role: '',
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
          title: '角色名称',
          dataIndex: 'role_cn',
          key: 'role_cn',
          width: 120
        },
        {
          title: '角色英文名称',
          dataIndex: 'role_en',
          key: 'role_en',
          width: 120
        },
        {
          title: '角色人数',
          dataIndex: 'role_num',
          key: 'role_num',
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
      const { data: res } = await request('api/authority/role/updateByDelete', {
        method: 'DELETE',
        params: {
          id: row.id
        }
      })

      if (res && res !== undefined) {
        this.$message.success('删除成功')
      }
    },
    handleQueryClick() {
      this.pageInfo.orderBy = null
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = 10

      this.queryList()
    },
    handleResetClick() {
      this.role = undefined
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
          role: this.role
        },
        ...this.pageInfo
      }
      const { data: res } = await doListRole(params)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    async loadingList() {
      this.tableLoading = true
      const { data: res } = await doListRole(this.pageInfo)
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
#authority-role {
  margin: 20px;

  .el-col {
    display: flex;
    align-items: center;
  }
}
</style>
