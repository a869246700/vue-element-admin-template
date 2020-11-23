<template>
  <!-- 资质审查 -->
  <div class="qualification-review">
    <!-- 报备 -->
    <card title="报备" class="card">
      <template #buttons>
        <el-button
          :loading="butLoading"
          type="primary"
          size="small"
          @click="qualificationsRemarksExport"
        >导出报备设备</el-button>
        <el-button
          :loading="butLoading"
          type="primary"
          size="small"
          @click="qualificationsRemarksTemplateExport"
        >下载导入模板</el-button>

        <el-upload
          action="/api/projectEvolveSta/qualificationsRemarksImport"
          :on-success="onRemarksSuccess"
          :file-list="uploadFileList"
          :show-file-list="false"
          class="inlineBlock"
          style="margin-left: 10px;"
        >
          <el-button size="small" icon="el-icon-upload2">导入报备数据</el-button>
        </el-upload>
      </template>

      <!-- 操作栏 -->
      <el-form ref="formRef" :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item label="部门" prop="dept">
          <el-input
            v-model.trim="listQuery.dept"
            size="small"
            placeholder="请输入部门"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="专业组" prop="groupName">
          <el-input
            v-model.trim="listQuery.groupName"
            size="small"
            placeholder="请输入专业组"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="人员姓名" prop="userName">
          <el-input
            v-model.trim="listQuery.userName"
            size="small"
            placeholder="请输入人员姓名"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQueryClick">查询</el-button>
          <el-button @click="handleResetClick">重置</el-button>
        </el-form-item>
      </el-form>

      <filter-table
        key="report"
        v-loading="reportLoading"
        is-pagination
        is-filter
        is-export-excel
        :table-data="reportList"
        :options="reportOptions"
        :max-height="488"
      />
    </card>

    <!-- 在线审查 -->
    <card title="在线审查" class="card">
      <template #buttons>
        <el-button
          :loading="butLoading"
          type="primary"
          size="small"
          @click="qualificationsOnlineExport"
        >导出审查数据</el-button>
        <el-button
          :loading="butLoading"
          type="primary"
          size="small"
          @click="qualificationsOnlineTemplateExport"
        >下载导入模板</el-button>

        <el-upload
          action="/api/projectEvolveSta/onlineQualificationsImport"
          :on-success="onOnlineSuccess"
          :file-list="uploadFileList"
          :show-file-list="false"
          class="inlineBlock"
          style="margin-left: 10px;"
        >
          <el-button size="small" icon="el-icon-upload2">导入人员数据</el-button>
        </el-upload>
      </template>

      <my-table key="review" v-loading="reviewLoading" :table-data="reviewList" :options="reviewOptions" :max-height="488" />
    </card>

    <!-- 事件汇总 -->
    <card title="事件汇总" class="card">
      <simple-table v-loading="summaryLoading" :table-data="summaryList" :options="summaryOptions" :max-height="488" />
    </card>
  </div>
</template>

<script>
import SimpleTable from '@/components/Table/SimpleTable'
import FilterTable from '@/components/Table/FilterTable'
import MyTable from '@/components/Table'
import Card from '@/components/Card'

import request from '@/services/request'
import DownFiles from '@/vendor/ExportExcel'

export default {
  components: {
    MyTable,
    FilterTable,
    SimpleTable,
    Card
  },
  props: {
    project: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      butLoading: false,
      listQuery: {
        groupName: '',
        userName: '',
        dept: ''
      },
      reportLoading: false,
      reportList: [],
      reportOptions: [
        {
          label: '人员姓名',
          prop: 'user_name',
          key: 'user_name',
          width: 50
        },
        {
          label: '部门',
          prop: 'department',
          key: 'department',
          width: 50
        },
        {
          label: '专业组',
          prop: 'group_name',
          key: 'group_name',
          width: 50
        },
        {
          label: '评审-需求类',
          prop: 'demand',
          key: 'demand',
          width: 50,
          render: (text, record) => {
            if (text === undefined || text === '') {
              return '-'
            }
            return text
          }
        },
        {
          label: '评审-设计类',
          prop: 'design',
          key: 'design',
          width: 50,
          render: (text, record) => {
            if (text === undefined || text === '') {
              return '-'
            }
            return text
          }
        },
        {
          label: 'STP设计',
          prop: 'stp',
          key: 'stp',
          width: 50,
          render: (text, record) => {
            if (text === undefined || text === '') {
              return '-'
            }
            return text
          }
        },
        {
          label: 'TP设计',
          prop: 'tp',
          key: 'tp',
          width: 50,
          render: (text, record) => {
            if (text === undefined || text === '') {
              return '-'
            }
            return text
          }
        },
        {
          label: '手工执行',
          prop: 'exe',
          key: 'exe',
          width: 50,
          render: (text, record) => {
            if (text === undefined || text === '') {
              return '-'
            }
            return text
          }
        }
      ],
      uploadFileList: [],
      reviewLoading: false,
      reviewList: [],
      reviewOptions: [
        {
          title: '人员姓名',
          prop: 'user_name',
          key: 'user_name',
          width: 50,
          render: (text, record) => {
            if (record.demend_qualified === '未匹配到人员') {
              return `<div style='color: #f00'>${text}</div>`
            }
            return text
          }
        },
        {
          title: '部门',
          prop: 'department',
          key: 'department',
          width: 50
        },
        {
          title: '专业组',
          prop: 'group_name',
          key: 'group_name',
          width: 50
        },
        {
          title: '当前资质',
          prop: 'qualifications',
          key: 'qualifications',
          width: 50
        },
        {
          title: '不满足项',
          prop: 'type',
          key: 'type',
          width: 50
        },
        {
          title: '是否报备',
          prop: 'remarks',
          key: 'remarks',
          width: 50
        }
      ],
      summaryLoading: false,
      summaryList: [],
      summaryOptions: [
        {
          label: '人员姓名',
          prop: 'user_name',
          key: 'user_name',
          width: 50
        },
        {
          label: '部门',
          prop: 'department',
          key: 'department',
          width: 50
        },
        {
          label: '专业组',
          prop: 'group_name',
          key: 'group_name',
          width: 50
        },
        {
          label: '当前资质',
          prop: 'qualifications',
          key: 'qualifications',
          width: 50
        },
        {
          label: '不满足项',
          prop: 'type',
          key: 'type',
          width: 50
        },
        {
          label: '是否报备',
          prop: 'is_remarks',
          key: 'is_remarks',
          width: 50
        },
        {
          label: '考核人',
          prop: 'assess_name',
          key: 'assess_name',
          width: 50
        },
        {
          label: '是否生成事件',
          prop: 'tp',
          key: 'tp',
          width: 50
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getReportList(this.project, this.listQuery)
      this.getOnlineReviewList(this.project)
      this.getEventSummaryList(this.project)
    },
    // 上传报备设备表格数据
    onRemarksSuccess(res) {
      if (res.error !== undefined) {
        this.$message.error('导入失败!' + res.error)
      } else {
        this.$message.success('导入成功!')
        const listQuery = {
          groupName: '',
          userName: '',
          dept: ''
        }
        this.getReportList(this.project, listQuery)
        this.getEventSummaryList(this.project)
      }
    },
    onOnlineSuccess(res) {
      if (res.error !== undefined) {
        this.$message.error('导入失败!' + res.error)
      } else {
        this.$message.success('导入成功!')
        this.getOnlineReviewList(this.project)
      }
    },
    // 导出设备
    handleQueryClick() {
      this.getReportList(this.project, this.listQuery)
    },
    handleResetClick() {
      this.$refs.formRef.resetFields()
    },
    // 导出报备设备
    qualificationsRemarksExport() {
      const url = '/api/export/qualificationsRemarks'
      const options = {
        conditions: {
          project: this.project
        }
      }
      const fileName = this.project + '资质报备列表.xls'
      DownFiles(url, options, fileName, this)
    },
    // 下载报备设备导入模板
    qualificationsRemarksTemplateExport() {
      const url = '/api/export/qualificationsRemarksTemplate'
      const options = {
        conditions: {
          project: this.project
        }
      }
      const fileName = this.project + '导入资质报备模版列表.xls'
      DownFiles(url, options, fileName, this)
    },
    // 导出审查数据
    qualificationsOnlineExport() {
      const url = '/api/export/onlineExamineData'
      const options = {
        conditions: {
          project: this.project
        }
      }
      const fileName = this.project + '资质在线审查列表.xls'
      DownFiles(url, options, fileName, this)
    },
    // 下载审查数据导入模板
    qualificationsOnlineTemplateExport() {
      const url = '/api/export/onlineExamineData'
      const options = {
        conditions: {
          project: this.project
        }
      }
      const fileName = this.project + '导入资质在线审查模版列表.xls'
      DownFiles(url, options, fileName, this)
    },
    async getReportList(project, listQuery) {
      this.reportLoading = true
      const { data: res } = await request('/api/projectEvolveSta/querByQualificationsRemarksList', {
        method: 'GET',
        params: {
          listQuery,
          project
        }
      })
      this.reportList = res
      this.$nextTick(() => {
        this.reportLoading = false
      })
    },
    // 获取在线审查数据
    async getOnlineReviewList(project) {
      this.reviewLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByOnlineQualifications', {
        params: {
          project
        }
      })
      this.reviewList = res

      this.$nextTick(() => {
        this.reviewLoading = false
      })
    },
    // 获取事件汇总数据
    async getEventSummaryList(project) {
      this.summaryLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByQualificationsEventList', {
        params: {
          project
        }
      })
      this.summaryList = res

      this.$nextTick(() => {
        this.key++
        this.summaryLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.qualification-review ::v-deep .el-form-item {
  margin-left: 20px;

  &:nth-child(1) {
    margin-left: 0;
  }
}

.qualification-review {
  .card {
    margin-top: 10px;

    &:nth-child(1) {
      margin-top: 0;
    }
  }
}
</style>
