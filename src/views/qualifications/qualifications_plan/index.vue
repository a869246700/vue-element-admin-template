<template>
  <el-card id="qualifications_plan">
    <el-row :gutter="20">
      <el-col :span="6">
        <span>事业部：</span>
        <el-select
          v-model="listQuery.business"
          :disabled="businessDisabled"
          size="small"
          class="operation-input"
        >
          <el-option
            v-for="option in business"
            :key="option.key"
            :value="option.value"
            :label="option.label"
          >
            <div class="flex">
              <span
                class="dot"
                :style="{ background: option.key !== 'all' ? '#52c41a' : '#1895ff' }"
              />
              <span>{{ option.label }}</span>
            </div>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span>部门：</span>
        <el-input
          v-model.trim="listQuery.dept"
          :disabled="deptDisabled"
          placeholder="请输入部门"
          size="small"
          class="operation-input"
        />
      </el-col>
      <el-col :span="6">
        <span>人员名称：</span>
        <el-input
          v-model.trim="listQuery.userName"
          placeholder="请输入人员名称"
          size="small"
          class="operation-input"
        />
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
        <el-button size="small" @click="handleResetClick">重置</el-button>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="handleCreateClick">新建</el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="tableLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px;"
      :header-cell-style="{ background: '#f6f6f6'}"
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :min-width="item.minWidth"
        :show-overflow-tooltip="item.prop !== 'action'"
      >
        <template slot-scope="{row}">
          <div v-if="item.prop === 'action'">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              style="margin-right: 10px;"
              @click="handleEditClick(row)"
            />

            <el-popconfirm title="您确定删除该计划?" @onConfirm="handleDeleteClick(row)">
              <el-button slot="reference" type="danger" size="small" icon="el-icon-delete" />
            </el-popconfirm>
          </div>
          <div v-else>{{ row[item.prop] }}</div>
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

    <Dialog ref="dialogRef" @reload="loadList" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import Dialog from './components/Dialog'

import request from '@/services/request'
import { doQualificationsRealmPlan } from '@/services/qualifications/qualifications'

export default {
  components: {
    Pagination,
    Dialog
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
          label: '人员姓名',
          prop: 'user_name',
          minWidth: '80'
        },
        {
          label: '事业部',
          prop: 'business_dep',
          minWidth: '120'
        },
        {
          label: '部门',
          prop: 'department',
          minWidth: '110'
        },
        {
          label: '专业组',
          prop: 'group_name',
          minWidth: '110'
        },
        {
          label: '域类型',
          prop: 'realm',
          minWidth: '80'
        },
        {
          label: '域名',
          prop: 'realm_type',
          minWidth: '80'
        },
        {
          label: '当前等级',
          prop: 'now_num',
          minWidth: '80'
        },
        {
          label: '计划等级',
          prop: 'plan_num',
          minWidth: '80'
        },
        {
          label: '计划年份',
          prop: 'year',
          minWidth: '80'
        },
        {
          label: '操作',
          prop: 'action',
          minWidth: '85'
        }
      ],
      business: [
        {
          label: '全部',
          value: '',
          key: 'all'
        },
        {
          label: 'SMB产品事业部',
          value: 'SMB产品事业部',
          key: 'smb'
        },
        {
          label: '路由器产品事业部',
          value: '路由器产品事业部',
          key: 'lu'
        },
        {
          label: '数据中心交换产品事业部',
          value: '数据中心交换产品事业部',
          key: 'wu'
        },
        {
          label: '研究院',
          value: '研究院',
          key: 'yan'
        },
        {
          label: '园区与城域网交换产品事业部',
          value: '园区与城域网交换产品事业部',
          key: 'yuan'
        },
        {
          label: '北京研发中心',
          value: '北京研发中心',
          key: 'bj'
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
      const { data: res } = await doQualificationsRealmPlan(this.pageInfo)
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
      const { data: res } = await doQualificationsRealmPlan(params)
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
#qualifications_plan {
  margin: 20px;

  .el-col {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    span {
      font-size: 14px;
    }

    .operation-input {
      flex: 1;
      margin-right: 20px;
    }
  }
}

.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 6px;
  border-radius: 50%;
}
</style>
