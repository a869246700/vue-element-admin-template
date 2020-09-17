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
        <span>id：</span>
        <el-input
          v-model.trim="listQuery.id"
          placeholder="请输入id"
          size="small"
          class="operation-input"
        />
      </el-col>

      <el-col :span="6">
        <span>项目名称：</span>
        <el-input
          v-model.trim="listQuery.project"
          placeholder="请输入项目名称"
          size="small"
          class="operation-input"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 10px;">
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
        <span>CAF文件名：</span>
        <el-input
          v-model.trim="listQuery.fileName"
          placeholder="请输入CAF文件名"
          size="small"
          class="operation-input"
        />
      </el-col>

      <el-col :span="6">
        <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
        <el-button size="small" style="margin-right: 10px;" @click="handleResetClick">重置</el-button>
        <el-button
          :loading="butLoading"
          size="small"
          icon="el-icon-download"
          type="primary"
          @click="handleExportClick"
        >导出数据</el-button>
      </el-col>
    </el-row>

    <div class="upload-desc">如遇下表也没有的作品数据，请点击上方导出，导出适用查询！如果导出也没有找到数据，应该是作品被覆盖，请找一下是否有同项目同文件名作品！</div>

    <el-table
      v-loading="tableLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px;"
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :min-width="item.minWidth"
      >
        <template slot-scope="{row}">
          <div style="white-space: normal;">
            {{ row[item.prop] }}
          </div>
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
import { doQualificationsTpFailCause } from '@/services/qualifications/qualifications'
import DownFiles from '@/vendor/ExportExcel'

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
        userName: '',
        realmName: '',
        isReach: ''
      },
      businessDisabled: false,
      deptDisabled: false,
      fileList: [],
      butLoading: false,
      tableOptions: [
        {
          label: 'id',
          prop: 'cr_id',
          minWidth: '70'
        },
        {
          label: '项目名称',
          prop: 'project_name',
          minWidth: '80'
        },
        {
          label: '事业部',
          prop: 'business_dep',
          minWidth: '100'
        },
        {
          label: '部门',
          prop: 'department',
          minWidth: '90'
        },
        {
          label: '人员',
          prop: 'user_name',
          minWidth: '50'
        },
        {
          label: 'CAF文件名',
          prop: 'ci_name',
          minWidth: '90'
        },
        {
          label: '提交时间',
          prop: 'submit_date',
          minWidth: '80'
        },
        {
          label: '代码量',
          prop: 'totalCodesSum',
          minWidth: '60'
        },
        {
          label: '用例数',
          prop: 'actCaseNums',
          minWidth: '60'
        },
        {
          label: '原因',
          prop: 'z_type',
          minWidth: '100'
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
      ],
      reach: [
        {
          label: '全部',
          key: 'all',
          value: ''
        },
        {
          label: '通过',
          key: 'true',
          value: '1'
        },
        {
          label: '未通过',
          key: 'false',
          value: '0'
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
    handleExportClick() {
      const url = '/api/export/userTpInfo'
      const options = this.pageInfo
      const fileName = '人员TP作品明细列表.xls'
      DownFiles(url, options, fileName, this)
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
        userName: '',
        realmName: '',
        isReach: ''
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
    async handleDeleteClick(row) {
      const values = {
        id: row.id
      }

      const { data: res } = await request('/api/userQualificationsRealmReach/delete', {
        method: 'DELETE',
        data: values
      })
      if (res) {
        this.$message.success('删除成功')
        this.loadList()
      } else {
        this.$message.error('删除失败')
      }
    },
    async handleReachClick(row, isReach) {
      const values = {
        id: row.id,
        isReach
      }

      const { data: res } = await request('/api/userQualificationsRealmReach/update', {
        method: 'POST',
        data: values
      })

      if (res) {
        this.$message.success('修改成功')
        this.loadList()
      } else {
        this.$message.error('修改失败')
      }
    },
    async queryList() {
      this.tableLoading = true
      const params = {
        conditions: this.listQuery,
        ...this.pageInfo
      }
      const { data: res } = await doQualificationsTpFailCause(params)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    async loadList() {
      this.tableLoading = true
      const { data: res } = await doQualificationsTpFailCause(this.pageInfo)
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
