<template>
  <el-card id="qualifications-caf-list">
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

    <div>
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
            <div
              v-if="item.prop === 'business_dep' || item.prop === 'department' || item.prop === 'group_name' || item.prop ==='user_name'"
            >{{ row[item.prop] }}</div>
            <div
              v-else
            >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</div>
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
    </div>

    <div>
      <el-table
        v-loading="infoTableLoading"
        :data="infoList"
        border
        highlight-current-row
        style="width: 100%; margin-top: 20px;"
        :header-cell-style="{ background: '#f6f6f6'}"
      >
        <el-table-column
          v-for="item in infoTableOptions"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :min-width="item.minWidth"
        >
          <template slot-scope="{row}">
            <div
              v-if="item.prop !== 'totalCodesSum'"
              style="white-space: normal;"
            >{{ row[item.prop] }}</div>
            <div
              v-else
              style="white-space: normal;"
            >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</div>
          </template>
        </el-table-column>
      </el-table>

      <div v-if="infoTotal >= infoPageInfo.pageSize" class="pagination">
        <pagination
          :total="infoTotal"
          :page="infoPageInfo.pageNum"
          :limit="infoPageInfo.pageSize"
          :auto-scroll="false"
          @pagination="handleInfoPageUpdate"
        />
      </div>
    </div>
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination/index'

import request from '@/services/request'
import {
  doQualificationsCafStatistics,
  doQualificationsCafInfo
} from '@/services/qualifications/qualifications'

export default {
  name: 'QualificationsCafList',
  components: { Pagination },
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        orderBy: null
      },
      infoPageInfo: {
        pageNum: 1,
        pageSize: 10,
        orderBy: null
      },
      list: [],
      infoList: [],
      total: 0,
      infoTotal: 0,
      tableLoading: false,
      infoTableLoading: false,
      listQuery: {
        business: '',
        dept: '',
        userName: ''
      },
      businessDisabled: false,
      deptDisabled: false,
      tableOptions: [
        {
          label: '事业部',
          prop: 'business_dep',
          minWidth: '120'
        },
        {
          label: '部门',
          prop: 'department',
          minWidth: '160'
        },
        {
          label: '专业组',
          prop: 'group_name',
          minWidth: '140'
        },
        {
          label: '人员姓名',
          prop: 'user_name',
          minWidth: '80'
        },
        {
          label: 'TP一级个数',
          prop: 'one_level',
          minWidth: '80'
        },
        {
          label: 'TP二级个数',
          prop: 'two_level',
          minWidth: '80'
        },
        {
          label: 'STP一级个数',
          prop: 'stp_one_level',
          minWidth: '80'
        },
        {
          label: 'STP二级个数',
          prop: 'stp_two_level',
          minWidth: '80'
        }
      ],
      infoTableOptions: [
        {
          label: '事业部',
          prop: 'business_dep',
          minWidth: '120'
        },
        {
          label: '部门',
          prop: 'department',
          minWidth: '160'
        },
        {
          label: '专业组',
          prop: 'group_name',
          minWidth: '140'
        },
        {
          label: '人员姓名',
          prop: 'user_name',
          minWidth: '80'
        },
        {
          label: 'caf表单号',
          prop: 'cr_id',
          minWidth: '100'
        },
        {
          label: '项目名称',
          prop: 'project_name',
          minWidth: '100'
        },
        {
          label: '文件名称',
          prop: 'ci_name',
          minWidth: '100'
        },
        {
          label: '提交时间',
          prop: 'apply_time',
          minWidth: '100'
        },
        {
          label: '总计代码量',
          prop: 'totalCodesSum',
          minWidth: '80'
        },
        {
          label: '用例数',
          prop: 'actCaseNums',
          minWidth: '60'
        },
        {
          label: '代码量等级',
          prop: 'level',
          minWidth: '80'
        },
        {
          label: '用例数等级',
          prop: 'case_level',
          minWidth: '80'
        },
        {
          label: '最终等级',
          prop: 'z_level',
          minWidth: '80'
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
      this.queryIsShow()
      this.loadList()
      this.loadInfoList()
    },
    handleQueryClick() {
      this.resetPageInfo()
      this.queryList()
      this.queryInfoList()
    },
    handleResetClick() {
      this.resetPageInfo()
      this.listQuery = {
        business: '',
        dept: '',
        userName: ''
      }
      this.loadList()
      this.loadInfoList()
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

      this.infoPageInfo = {
        pageNum: 1,
        pageSize: 10,
        orderBy: null
      }
    },
    handlePageUpdate(e) {
      // 1. 修改分段器配置
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit

      this.queryList()
    },
    handleInfoPageUpdate(e) {
      this.infoPageInfo.pageNum = e.page
      this.infoPageInfo.pageSize = e.limit

      this.queryInfoList()
    },
    async loadList() {
      this.tableLoading = true
      this.resetPageInfo()
      const { data: res } = await doQualificationsCafStatistics(this.pageInfo)
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
      const { data: res } = await doQualificationsCafStatistics(params)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    async loadInfoList() {
      this.infoTableLoading = true
      const { data: res } = await doQualificationsCafInfo(this.infoPageInfo)
      this.infoList = res.list
      this.infoTotal = res.total

      this.$nextTick(() => {
        this.infoTableLoading = false
      })
    },
    async queryInfoList() {
      this.infoTableLoading = true
      const params = {
        conditions: this.listQuery,
        ...this.infoPageInfo
      }
      const { data: res } = await doQualificationsCafInfo(params)
      this.infoList = res.list
      this.infoTotal = res.total

      this.$nextTick(() => {
        this.infoTableLoading = false
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
#qualifications-caf-list {
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
