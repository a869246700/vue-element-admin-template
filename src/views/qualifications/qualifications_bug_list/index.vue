<template>
  <el-card id="qualifications-bug-list">
    <el-row :gutter="20">
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
        <span>严重程度：</span>
        <el-select
          v-model="listQuery.severity"
          size="small"
          placeholder="请输入严重程度"
          class="operation-input"
        >
          <el-option
            v-for="option in severitySelectOptions"
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
        <span>优先级：</span>
        <el-select
          v-model="listQuery.priority"
          size="small"
          placeholder="请输入优先级"
          class="operation-input"
        >
          <el-option
            v-for="option in prioritySelectOptions"
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
        <span>创建人：</span>
        <el-input
          v-model.trim="listQuery.person"
          placeholder="请输入创建人"
          size="small"
          class="operation-input"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
        <el-button size="small" style="margin-right: 10px;" @click="handleResetClick">重置</el-button>
      </el-col>
    </el-row>

    <div class="upload-desc">
      <el-upload
        class="upload-demo"
        action="http://172.30.61.89:882/api/userQualifications/bug/import"
        :with-credentials="true"
        multiple
        :file-list="fileList"
        :on-error="handleErrorUpload"
      >
        <el-button size="small" type="primary" icon="el-icon-upload2">点击上传</el-button>
      </el-upload>

      <div style="margin-top: 20px">导入数据请按照下表列顺序创建表格，目前仅支持xlsx和xls格式导入！</div>
    </div>

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
import { doQualificationsBugInfo } from '@/services/qualifications/qualifications'
import DownFiles from '@/vendor/ExportExcel'

export default {
  name: 'QualificationsTpFailCause',
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
      uploadLoading: false,
      tableLoading: false,
      listQuery: {
        id: null,
        severity: '',
        priority: '',
        person: null
      },
      fileList: [],
      butLoading: false,
      tableOptions: [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          width: 50
        },
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
          width: 200
        },
        {
          title: '项目名称',
          dataIndex: 'project',
          key: 'project',
          width: 100
        },
        {
          title: '发现版本',
          dataIndex: 'version',
          key: 'version',
          width: 80
        },
        {
          title: '严重程度',
          dataIndex: 'severity',
          key: 'severity',
          width: 80
        },
        {
          title: '优先级',
          dataIndex: 'priority',
          key: 'priority',
          width: 60
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          width: 70
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          key: 'create_time',
          width: 120
        },
        {
          title: '创建人',
          dataIndex: 'person',
          key: 'person',
          width: 70
        },
        {
          title: '解决方法',
          dataIndex: 'resolvent',
          key: 'resolvent',
          width: 70
        }
      ],
      prioritySelectOptions: [
        {
          label: '全部',
          key: 'all',
          value: ''
        },
        {
          label: '低',
          key: '1',
          value: '低'
        },
        {
          label: '中',
          key: '2',
          value: '中'
        },
        {
          label: '高',
          key: '3',
          value: '高'
        }
      ],
      severitySelectOptions: [
        {
          label: '全部',
          key: 'all',
          value: ''
        },
        {
          label: '提示',
          key: '1',
          value: '提示'
        },
        {
          label: '一般',
          key: '2',
          value: '一般'
        },
        {
          label: '严重',
          key: '3',
          value: '严重'
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
    handleErrorUpload(error, file, fileList) {
      try {
        this.fileList.push(file)
      } catch (err) {
        console.log(error)
      }
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
    handleSuccessUpload(res, file, fileList) {
      if (res.error !== undefined) {
        this.$message.error('导入失败!' + res.error)
        fileList.response = '导入失败!' + res.error
        fileList.status = 'error'
        this.fileList = fileList
        this.uploadLoading = false
      }
    },
    handleBeforeUpload() {
      this.uploadLoading = true
    },
    handleResetClick() {
      this.resetPageInfo()
      this.listQuery = {
        id: null,
        severity: '',
        priority: '',
        person: null
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
      const { data: res } = await doQualificationsBugInfo(params)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    async loadList() {
      this.tableLoading = true
      const { data: res } = await doQualificationsBugInfo(this.pageInfo)
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
#qualifications-bug-list {
  margin: 20px;

  .upload-desc {
    margin-top: 20px;
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
