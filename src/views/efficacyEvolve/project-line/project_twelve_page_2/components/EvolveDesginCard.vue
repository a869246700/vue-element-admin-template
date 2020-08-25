<template>
  <card title="设计" class="desgin card">
    <template #buttons>
      <el-button type="primary" size="small">导出TP明细</el-button>
    </template>

    <template #content>
      <div class="notice-board">
        <el-row :gutter="24">
          <el-col :span="6">
            <el-alert
              :title="`总计TP${tpCaseTotal === undefined ? 0 : tpCaseTotal.total_num}个`"
              type="success"
              :closable="false"
            />
          </el-col>
          <el-col :span="6">
            <el-alert
              :title="`计划用例${tpCaseTotal === undefined ? 0 : tpCaseTotal.planCaseNum}个`"
              type="warning"
              :closable="false"
            />
          </el-col>
          <el-col :span="6">
            <el-alert
              :title="`已完成TP${tpCaseTotal === undefined ? 0 : tpCaseTotal.finish_num}个`"
              type="error"
              :closable="false"
            />
          </el-col>
          <el-col :span="6">
            <el-alert
              :title="`实际用例${tpCaseTotal === undefined ? 0 : tpCaseTotal.actCaseNums}个`"
              type="info"
              :closable="false"
            />
          </el-col>
        </el-row>
      </div>

      <div class="desgin-table">
        <div class="filter-container">
          <!-- select -->
          <el-select v-model="desginSelectVal" multiple collapse-tags placeholder="请选择">
            <el-option
              v-for="(item, index) in desginSelectOptions"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>

        <!-- 表格 -->
        <el-table
          :data="list"
          border
          style="width: 100%"
          fit
          :header-cell-style="{'background-color': '#FAFAFA' }"
          highlight-current-row
        >
          <el-table-column
            v-for="(item, index) in tableOptions"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.minWidth"
            show-overflow-tooltip
            align="center"
          />
        </el-table>

        <!-- 分段器 -->
        <div class="pagination">
          <pagination
            v-if="total >= limit"
            :total="total"
            :page="currentPage"
            :limit="limit"
            :auto-scroll="false"
            @pagination="handlePageUpdate"
          />
        </div>
      </div>
    </template>
  </card>
</template>

<script>
import Card from '@/components/Card/index'
import Pagination from '@/components/Pagination/index'

import request from '@/services/request'

export default {
  components: {
    Card,
    Pagination
  },
  props: {
    project: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      key: 1,
      tpCaseTotal: undefined, // 数据
      desginSelectVal: [
        '总计TP个数',
        '已完成TP个数',
        '计划周期内完成的TP个数',
        '周期超期的TP个数',
        '资源超期的TP个数',
        '预计完成用例个数',
        '已完成用例个数'
      ], // select 已选中的列表
      desginSelectOptions: [
        '总计TP个数',
        '已完成TP个数',
        '计划周期内完成的TP个数',
        '周期超期的TP个数',
        '资源超期的TP个数',
        '预计完成用例个数',
        '已完成用例个数'
      ], // select 选择列表
      desginTableData: [],
      currentPage: 1, // 当前页码
      limit: 10, // 每页数量
      total: 0 // 总数
    }
  },
  computed: {
    list() {
      return this.desginTableData.slice(
        (this.desginTableCurrentPage - 1) * 10,
        this.desginTableCurrentPage * 10
      )
    },
    tableOptions() {
      const options = [
        {
          prop: 'professional_divide',
          label: '域',
          minWidth: 103
        },
        {
          prop: 'total_num',
          label: '总计TP个数',
          minWidth: 125
        },
        {
          prop: 'finish_num',
          label: '已完成TP个数',
          minWidth: 139
        },
        {
          prop: 'ok_num',
          label: '计划周期内完成的TP个数',
          minWidth: 209
        },
        {
          prop: 'cq_time_num',
          label: '周期超期的TP个数',
          minWidth: 167
        },
        {
          prop: 'cq_resource_num',
          label: '资源超期的TP个数',
          minWidth: 167
        },
        {
          prop: 'planCaseNum',
          label: '预计完成用例个数',
          minWidth: 167
        },
        {
          prop: 'actCaseNums',
          label: '已完成用例个数',
          minWidth: 151
        }
      ]

      return options.filter(
        (item) => this.desginSelectVal.indexOf(item.label) >= 0 || item.label === '域'
      )
    }
  },
  created() {
    this.evolveTpCaseTotal(this.project)
  },
  methods: {
    handlePageUpdate(e) {
      this.currentPage = e.page
      this.limit = e.limit
    },
    async evolveTpCaseTotal(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByTpCaseTotal', {
        method: 'GET',
        params: { project }
      })

      this.tpCaseTotal = !res ? undefined : res
      // console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 20px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
}

// desgin 设计
.desgin-table {
  margin-top: 20px;
}
</style>
