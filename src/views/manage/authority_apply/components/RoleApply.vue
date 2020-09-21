<template>
  <div class="role-apply">
    <div class="operation-bar">
      角色名称：
      <el-input
        v-model.trim="roleName"
        size="small"
        placeholder="请输入角色名称"
        style="width: 150px; margin-left: 10px;"
      />
      <el-button type="primary" size="small" style="margin-left: 15px;" @click="handleQueryClick">查询</el-button>
      <el-button size="small" @click="handleResetClick">重置</el-button>
    </div>

    <el-table
      v-loading="tableLoading"
      :data="list"
      highlight-current-row
      row-id="id"
      :header-cell-style="{ background: '#f6f6f6' }"
      style="margin: 20px 0;"
    >
      <el-table-column type="expand">
        <template slot-scope="{ row }">
          <el-tag
            v-for="item in row.children"
            :key="item.id"
            size="medium"
            effect="plain"
            style="margin: 0 10px 10px 0; font-size: 14px;"
          >{{ item.title }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="角色名称" min-width="180" />
      <el-table-column label="操作" width="150">
        <template slot-scope="{ row }">
          <el-popconfirm
            icon="el-icon-warning"
            placement="top"
            :title="row.person_id === 0 ? '您确定要申请该角色权限?' : '您确定要清除该角色权限?'"
            @onConfirm="row.person_id === 0 ? handleApplyClick(row) : handleDelClick(row)"
          >
            <el-button
              slot="reference"
              :type="row.person_id === 0 ? 'primary' : 'danger'"
              size="small"
            >{{ row.person_id === 0 ? '申请' : '清除' }}</el-button>
          </el-popconfirm>
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
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import request from '@/services/request'
import { doListRole } from '@/services/manage/manage'
import { mapGetters } from 'vuex'

export default {
  components: { Pagination },
  data() {
    return {
      roleName: undefined,
      list: undefined,
      pageInfo: {
        orderBy: null,
        pageNum: 1,
        pageSize: 10
      },
      tableLoading: false,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loadRoleAuthorityList()
    },
    // 修改页码
    handlePageUpdate(e) {
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit
      const params = {
        conditions: {
          role: this.roleName,
          status: '-1',
          updatedAt: undefined
        },
        ...this.pageInfo
      }
      // 查询
      this.queryRoleAuthorityList(params)
    },
    // 点击申请
    async handleApplyClick(row) {
      const values = {
        roleId: row.id,
        personId: this.currentUser.employeeId,
        person: this.currentUser.userCn,
        title: '权限申请',
        msg: '【' + this.currentUser.userCn + '】申请【' + row.title + '】角色权限'
      }

      const { data: res } = await request('api/authority/role/apply', {
        method: 'POST',
        data: values
      })
      if (res && res !== undefined) {
        this.$message.success('申请成功')
        this.$emit('update')
      }
    },
    async handleDelClick(row) {
      const { data: res } = await request('api/authority/roleMan/delete', {
        method: 'DELETE',
        params: {
          id: row.role_man_id
        }
      })

      if (res && res !== undefined) {
        this.$message.success('清除成功')
        this.$emit('update')
      }
    },
    // 点击查询
    handleQueryClick() {
      // 设置页码为1
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = 20
      const params = {
        conditions: {
          role: this.roleName,
          status: '-1',
          updatedAt: undefined
        },
        ...this.pageInfo
      }
      this.queryRoleAuthorityList(params)
    },
    // 点击重置
    handleResetClick() {
      // 重置roleName
      this.roleName = ''
      // 设置页码为1
      this.pageInfo.pageNum = 1
      const params = {
        conditions: {
          role: this.roleName,
          status: '-1',
          updatedAt: undefined
        },
        ...this.pageInfo
      }
      this.queryRoleAuthorityList(params)
    },
    // 获取角色申请列表
    async loadRoleAuthorityList() {
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = 10
      this.tableLoading = true

      const { data: res } = await doListRole(this.pageInfo)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    // 点击查询
    async queryRoleAuthorityList(params) {
      this.tableLoading = true
      const { data: res } = await doListRole(params)
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
.operation-bar {
  display: flex;
  align-items: center;
}
</style>
