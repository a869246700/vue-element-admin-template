<template>
  <div class="apply-list">
    <!-- 操作栏 -->
    <div class="operation-bar">
      申请状态：
      <el-select
        v-model="selectVal"
        size="small"
        placeholder="请输入角色名称"
        style="width: 100px; margin-left: 10px;"
      >
        <el-option
          v-for="(item, index) in selectOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" size="small" style="margin-left: 15px;" @click="handleQueryClick">查询</el-button>
      <el-button size="small" @click="handleResetClick">重置</el-button>
    </div>

    <!-- 表格 -->
    <el-table
      v-loading="tableLoading"
      :data="list"
      style="width: 100%;margin: 20px 0;"
      highlight-current-row
    >
      <el-table-column
        v-for="(item, index) in tableOptions"
        :key="index"
        :label="item.label"
        :min-width="item.minWidth"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span v-if="item.prop === 'status'">{{ row[item.prop] | statusFilter }}</span>
          <div v-else-if="item.prop === 'action'">
            <div v-if="row.status === 0">
              <el-popconfirm
                placement="top"
                title="您确定要再次申请该角色权限?"
                @onConfirm="handleAgainApplyClick(row)"
              >
                <el-button slot="reference" type="primary" size="small">再次申请</el-button>
              </el-popconfirm>
            </div>

            <div v-if="row.status === 0">
              <el-popconfirm
                placement="top"
                title="您确定还是没有该角色权限?"
                @onConfirm="handleAgainApplyClick(row)"
              >
                <el-button slot="reference" type="info" size="small" style="margin-right: 10px;">打回</el-button>
              </el-popconfirm>

              <el-popconfirm placement="top" title="您确定已有该角色权限了?" @onConfirm="handleConfirmClick(row)">
                <el-button slot="reference" type="success" size="small">确认</el-button>
              </el-popconfirm>
            </div>
          </div>
          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from '@/services/request'
import { doListRoleApply } from '@/services/manage/manage'

export default {
  filters: {
    statusFilter(status) {
      switch (status) {
        case 0:
          return '已拒绝'
        case 1:
          return '待审批'
        case 2:
          return '待确认'
        case 3:
          return '已确认'
      }
    }
  },
  data() {
    return {
      selectVal: -1,
      selectOptions: [
        {
          label: '全部',
          value: -1
        },
        {
          label: '已拒绝',
          value: 0
        },
        {
          label: '待审批',
          value: 1
        },
        {
          label: '待确认',
          value: 2
        },
        {
          label: '已确认',
          value: 3
        }
      ],
      tableOptions: [
        {
          label: '申请标题',
          prop: 'title',
          minWidth: 200
        },
        {
          label: '申请内容',
          prop: 'msg',
          minWidth: 400
        },
        {
          label: '申请状态',
          prop: 'status',
          minWidth: 120
        },
        {
          label: '申请时间',
          prop: 'apply_time',
          minWidth: 160
        },
        {
          label: '操作',
          prop: 'action',
          minWidth: 160
        }
      ],
      tableLoading: false,
      list: undefined,
      pageInfo: {
        orderBy: null,
        pageNum: 1,
        pageSize: 1000
      },
      total: 0
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loadRoleApplyList()
    },
    // 再次申请
    async handleAgainApplyClick(row) {
      const values = {
        roleId: row.role_id,
        personId: row.person_id,
        person: row.person,
        title: row.title,
        msg: row.msg
      }

      const { data: res } = await request('api/authority/role/againApply', {
        method: 'POST',
        data: values
      })

      if (res && res !== undefined) {
        this.$message.success('申请成功')
        this.$emit('update')
      }
    },
    // 确认申请角色成功
    async handleConfirmClick(row) {
      const values = {
        roleId: row.role_id,
        personId: row.person_id,
        person: row.person,
        title: row.title,
        msg: row.msg
      }

      const { data: res } = await request('api/authority/role/confirmApply', {
        method: 'POST',
        data: values
      })

      if (res && res !== undefined) {
        this.$message.success('确认成功')
        this.$emit('update')
      }
    },
    // 点击查询
    handleQueryClick() {
      this.pageInfo.pageNum = 1
      const params = {
        conditions: {
          role: undefined,
          status: '' + this.selectVal,
          updatedAt: undefined
        },
        ...this.pageInfo
      }
      this.queryRoleApplyList(params)
    },
    // 点击重置
    handleResetClick() {
      // 重置roleName
      this.roleName = ''
      // 设置页码为1
      this.pageInfo.pageNum = 1
      const params = {
        conditions: {
          role: undefined,
          status: '-1',
          updatedAt: undefined
        },
        ...this.pageInfo
      }
      this.queryRoleApplyList(params)
    },
    // 获取初始数据
    async loadRoleApplyList() {
      this.tableLoading = true
      const { data: res } = await doListRoleApply(this.pageInfo)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    // 获取数据
    async queryRoleApplyList(params) {
      this.tableLoading = true
      const { data: res } = await doListRoleApply(params)
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
