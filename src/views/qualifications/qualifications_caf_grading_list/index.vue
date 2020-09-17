<template>
  <el-card id="qualifications-tp-fail-cause">
    <el-row :gutter="20">
      <el-col :span="6">
        <span style="word-space: nowrap;">事业部：</span>
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
        <span>人员姓名：</span>
        <el-input
          v-model.trim="listQuery.userName"
          placeholder="请输入人员姓名"
          size="small"
          class="operation-input"
        />
      </el-col>

      <el-col :span="6">
        <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
        <el-button size="small" style="margin-right: 10px;" @click="handleResetClick">重置</el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="tableLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px;"
      :header-cell-style="{ background: '#f6f6f6' }"
      fit
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :min-width="item.minWidth"
        :show-overflow-tooltip="item.prop !== 'action'"
        :fixed="item.fixed"
      >
        <template slot-scope="{row}">
          <div v-if="item.prop === 'action' && row.state === '被覆盖'">
            <el-button type="success" size="small" @click="handleShowDataClick(row)">查看</el-button>
          </div>
          <div v-else-if="item.prop === 'action' && row.state !== '被覆盖'">
            <el-button type="primary" size="small" @click="handleEditClick(row)">修改</el-button>
            <el-button type="success" size="small" @click="handleShowDataClick(row)">查看</el-button>
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

    <edit-dialog ref="editDialogRef" @reload="loadList" />
    <detail-dialog ref="detailDialogRef" @reload="loadList" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import EditDialog from './components/EditDialog'
import DetailDialog from './components/DetailDialog'

import request from '@/services/request'
import { doQualificationsCafGradingList } from '@/services/qualifications/qualifications'

export default {
  name: 'QualificationsCafGradingList',
  components: {
    Pagination,
    EditDialog,
    DetailDialog
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
        dept: undefined,
        userName: undefined
      },
      businessDisabled: false,
      deptDisabled: false,
      fileList: [],
      butLoading: false,
      tableOptions: [
        {
          label: 'id',
          prop: 'cr_id',
          minWidth: '120'
        },
        {
          label: '项目名称',
          prop: 'project_name',
          minWidth: '120'
        },
        {
          label: '事业部',
          prop: 'business_dep',
          minWidth: '220'
        },
        {
          label: '专业组',
          prop: 'group_name',
          minWidth: '160'
        },
        {
          label: '部门',
          prop: 'department',
          minWidth: '220'
        },
        {
          label: '人员姓名',
          prop: 'user_name',
          minWidth: '90'
        },
        {
          label: 'CAF文件名',
          prop: 'ci_name',
          minWidth: '280'
        },
        {
          label: '提交时间',
          prop: 'time',
          minWidth: '160'
        },
        {
          label: '状态',
          prop: 'state',
          minWidth: '100'
        },
        {
          label: '等级',
          prop: 'level',
          minWidth: '100'
        },
        {
          label: '类型',
          prop: 'type',
          minWidth: '100'
        },
        {
          label: '操作',
          prop: 'action',
          minWidth: '145',
          fixed: 'right'
        }
      ],
      formOptions: [
        {
          label: '部门',
          prop: 'dept',
          ph: '请输入部门名称'
        },
        {
          label: 'id',
          prop: 'id',
          ph: '请输入id'
        },
        {
          label: '项目名称',
          prop: 'project',
          ph: '请输入项目名称'
        },
        {
          label: 'CAF文件名',
          prop: 'fileName',
          ph: '请输入CAF文件名'
        },
        {
          label: '人员姓名',
          prop: 'userName',
          ph: '请输入人员姓名'
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
    handleEditClick(row) {
      this.$refs.editDialogRef.dialogVisible = true
      this.$refs.editDialogRef.setTemp(row)
    },
    handleShowDataClick(row) {
      this.$refs.detailDialogRef.dialogVisible = true
      this.$refs.detailDialogRef.loadList(row.id)
    },
    handleQueryClick() {
      this.resetPageInfo()
      this.queryList()
    },
    handleResetClick() {
      this.resetPageInfo()
      this.listQuery = {
        business: '',
        dept: undefined,
        userName: undefined
      }
      this.loadList()
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
      const { data: res } = await doQualificationsCafGradingList(params)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    async loadList() {
      this.tableLoading = true
      const { data: res } = await doQualificationsCafGradingList(this.pageInfo)
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
#qualifications-tp-fail-cause {
  margin: 20px;

  .upload-desc {
    margin-top: 10px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
  }

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
