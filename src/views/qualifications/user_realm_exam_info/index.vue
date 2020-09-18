<template>
  <el-card id="user-realm-exam-info">
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
      </el-col>
    </el-row>

    <el-table
      v-loading="tableLoading"
      :data="list"
      border
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
        :align="item.align"
      >
        <template slot-scope="{row}">
          <div style="white-space: normal;">{{ row[item.dataIndex] }}</div>
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
import { doQualificationsRealmExamInfo } from '@/services/qualifications/qualifications'

export default {
  name: 'UserRealmExamInfo',
  components: { Pagination },
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
      ],
      tableOptions: [
        {
          title: '事业部',
          dataIndex: 'business_dep',
          key: 'business_dep',
          width: 100
        },
        {
          title: '部门',
          dataIndex: 'department',
          key: 'department',
          width: 100
        },
        {
          title: '专业组',
          dataIndex: 'group_name',
          key: 'group_name',
          width: 100
        },
        {
          title: '人员姓名',
          dataIndex: 'user_name',
          key: 'user_name',
          width: 80
        },
        {
          title: '域名',
          dataIndex: 'realm',
          key: 'realm',
          width: 80
        },
        {
          title: '域等级',
          dataIndex: 'realm_level',
          key: 'realm_level',
          width: 60
        },
        {
          title: '是否通过',
          dataIndex: 'is_pass',
          key: 'is_pass',
          width: 80
        },
        {
          title: '原因',
          dataIndex: 'question',
          key: 'question',
          width: 200
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
      this.queryIsShow()
    },
    handleResetClick() {
      this.resetPageInfo()
      this.listQuery = {
        business: '',
        dept: '',
        userName: ''
      }
      this.init()
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
    async queryList() {
      this.tableLoading = true
      const params = {
        conditions: this.listQuery,
        ...this.pageInfo
      }
      const { data: res } = await doQualificationsRealmExamInfo(params)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    async loadList() {
      this.tableLoading = true
      const { data: res } = await doQualificationsRealmExamInfo(this.pageInfo)
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
#user-realm-exam-info {
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
