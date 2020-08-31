<template>
  <el-dialog title="BUG阻塞" :visible.sync="dialogVisible" width="70%">
    <card v-loading="tableLoading" class="bug-choke-card">
      <template #buttons>
        <el-button
          :loading="butLoading"
          type="primary"
          @click="handleExportChokeCaseClick"
        >导出阻塞用例列表</el-button>
      </template>

      <template #content>
        <el-table
          :data="tableData"
          show-header
          border
          :default-sort="{ prop: 'num', order: 'descending' }"
          style="width: 100%;"
        >
          <el-table-column
            v-for="item in tableOptions"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.minWidth"
            :show-overflow-tooltip="item.sot"
            :sortable="item.prop === 'num'"
          />
        </el-table>

        <pagination
          v-if="total >= limit"
          :total="total"
          :page="currentPage"
          :limit="limit"
          :auto-scroll="false"
          @pagination="handlePageUpdate"
        />
      </template>
    </card>
  </el-dialog>
</template>

<script>
import Card from '@/components/Card/index'
import Pagination from '@/components/Pagination/index'
import DownFiles from '@/vendor/ExportExcel'

export default {
  components: { Card, Pagination },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    pageSize: {
      type: Number,
      default: 10
    },
    project: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentPage: 1, // 当前页码
      limit: this.pageSize, // 每页数量
      dialogVisible: false, // 控制对话框的显示与隐藏
      tableLoading: false, // 表单加载中
      downloadLoading: false, // 是否在下载中
      butLoading: false
    }
  },
  computed: {
    total() {
      return this.list.length
    },
    tableData() {
      const currentPage = this.currentPage
      const limit = this.limit
      return this.list.slice((currentPage - 1) * limit, currentPage * limit)
    },
    tableOptions() {
      return [
        {
          prop: 'bugid',
          label: 'bugid',
          minWidth: 80
        },
        {
          prop: 'submiter',
          label: '提交者',
          minWidth: 80
        },
        {
          prop: 'charge',
          label: '开发',
          minWidth: 80
        },
        {
          prop: 'summary',
          label: 'BUG描述',
          minWidth: 500,
          sot: true
        },
        {
          prop: 'state',
          label: '当前状态',
          minWidth: 190
        },
        {
          prop: 'resolved_date',
          label: 'CBD时间',
          minWidth: 152
        },
        {
          prop: 'target_date',
          label: '希望解决时间',
          minWidth: 105
        },
        {
          prop: 'choke_state',
          label: '问题解决',
          minWidth: 115
        },
        {
          prop: 'system',
          label: '影响子系统',
          minWidth: 140
        },
        {
          prop: 'num',
          label: '影响用例数量',
          minWidth: 136
        }
      ]
    }
  },
  methods: {
    handlePageUpdate(e) {
      this.currentPage = e.page
      this.limit = e.limit
    },
    async handleExportChokeCaseClick() {
      const url = '/api/export/projectBugChoke'
      const fileName = this.project + '阻塞用例列表.xls'

      DownFiles(url, { conditions: { project: this.project }}, fileName, this)
    }
  }
}
</script>

<style scoped>
.bug-choke-card >>> .el-card_body {
  padding: 0px !important;
}
</style>
