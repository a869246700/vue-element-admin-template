<template>
  <el-card id="platform-project-total">
    <el-row :gutter="24">
      <el-col :span="15">
        <p>总计</p>
      </el-col>
      <el-col :span="9">
        <p>问题</p>
      </el-col>
    </el-row>

    <el-table
      v-loading="tableLoading"
      :data="showList"
      highlight-current-row
      border
      style="width: 100%; margin-top: 10px;"
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.dataIndex"
        :label="item.title"
        :prop="item.key"
        :min-width="item.width"
        :fixed="item.fixed"
        :align="item.children ? 'center' : ''"
        :show-overflow-tooltip="item.sot"
      >
        <template v-if="item.children">
          <el-table-column
            v-for="child in item.children"
            :key="child.dataIndex"
            :label="child.title"
            :prop="child.key"
            :min-width="child.width"
          />
        </template>

        <template slot-scope="{row}">
          <div v-if="item.key === 'action'">
            <el-button type="primary" size="small" @click="handleEditClick(row)">修改</el-button>
          </div>
          <div
            v-if="item.sot"
            style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap;"
          >{{ row[item.key] }}</div>
          <div v-else>{{ row[item.key] }}</div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <pagination
        :total="total"
        :page="pageInfo.pageNum"
        :limit="pageInfo.pageSize"
        :auto-scroll="false"
        @pagination="handlePageUpdate"
      />
    </div>

    <edit-dialog ref="editDialogRef" @reload="init" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import EditDialog from './components/EditDialog'

import request from '@/services/request'

export default {
  name: 'PlatformProjectTotal',
  components: { Pagination, EditDialog },
  data() {
    return {
      tableLoading: false,
      list: [],
      total: 0,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      tableOptions: [
        {
          title: '平台项目',
          dataIndex: 'project',
          key: 'project',
          fixed: 'left',
          width: 200
        },
        {
          title: '重要关联',
          dataIndex: 'relevance',
          key: 'relevance',
          width: 100
        },
        {
          title: '客户&产品',
          dataIndex: 'customer',
          key: 'customer',
          width: 150,
          sot: true
        },
        {
          title: '事业部',
          dataIndex: 'business_dep',
          key: 'business_dep',
          width: 100
        },
        {
          title: '变更记录',
          dataIndex: 'change',
          key: 'change',
          width: 100
        },
        {
          title: '试点兑现',
          dataIndex: 'pilot_cash',
          key: 'pilot_cash',
          width: 100
        },
        {
          title: '简要原因',
          dataIndex: 'cause',
          key: 'cause',
          width: 150,
          sot: true
        },
        {
          title: '当前进展',
          dataIndex: 'now_evolve',
          key: 'now_evolve',
          width: 150,
          sot: true
        },
        {
          title: '转内测时间',
          dataIndex: 'test_date',
          key: 'test_date',
          width: 100,
          children: [
            {
              title: '计划时间',
              dataIndex: 'test_plan_date',
              key: 'test_plan_date',
              width: 100
            },
            {
              title: '实际时间',
              dataIndex: 'test_actual_date',
              key: 'test_actual_date',
              width: 100
            }
          ]
        },
        {
          title: '试点发布',
          dataIndex: 'pilot_date',
          key: 'pilot_date',
          children: [
            {
              title: '计划时间',
              dataIndex: 'pilot_plan_date',
              key: 'pilot_plan_date',
              width: 100
            },
            {
              title: '实际时间',
              dataIndex: 'pilot_actual_date',
              key: 'pilot_actual_date',
              width: 100
            }
          ]
        },
        {
          title: '内测偏差率(%)',
          dataIndex: 'deviation',
          key: 'deviation',
          width: 130
        },
        {
          title: '代码量(k)',
          dataIndex: 'code',
          key: 'code',
          width: 100
        },
        {
          title: '项目效率(D/k)',
          dataIndex: 'efficiency',
          key: 'efficiency',
          width: 100,
          children: [
            {
              title: '整个项目',
              dataIndex: 'efficiency_project',
              key: 'efficiency_project',
              width: 100
            },
            {
              title: '本月投入',
              dataIndex: 'efficiency_month',
              key: 'efficiency_month',
              width: 100
            }
          ]
        },
        {
          title: '自动化率(%)',
          dataIndex: 'auto_rate',
          key: 'auto_rate',
          width: 100
        },
        {
          title: '回归周期(D)',
          dataIndex: 'regression_period',
          key: 'regression_period',
          width: 100
        },
        {
          title: '覆盖率(%)',
          dataIndex: 'cover_rate',
          key: 'cover_rate',
          width: 100
        },
        {
          title: '内部质量(个/k)',
          dataIndex: 'quality',
          key: 'quality',
          width: 100,
          children: [
            {
              title: '全周期',
              dataIndex: 'quality_total',
              key: 'quality_total',
              width: 100
            },
            {
              title: '准入+内测',
              dataIndex: 'quality_admittance_test',
              key: 'quality_admittance_test',
              width: 100
            },
            {
              title: '内测',
              dataIndex: 'quality_test',
              key: 'quality_test',
              width: 100
            },
            {
              title: '遗留占比(%)',
              dataIndex: 'quality_ratio',
              key: 'quality_ratio',
              width: 100
            }
          ]
        },
        {
          title: '遗漏缺陷率(个/k)',
          dataIndex: 'business',
          key: 'business',
          width: 100,
          children: [
            {
              title: '遗漏事业部',
              dataIndex: 'business_omit',
              key: 'business_omit',
              width: 100
            },
            {
              title: '内测遗留',
              dataIndex: 'test_omit',
              key: 'test_omit',
              width: 100
            }
          ]
        },
        {
          title: '外部故障率',
          dataIndex: 'fault_rate',
          key: 'fault_rate',
          width: 100
        },
        {
          title: 'PM',
          dataIndex: 'pm',
          key: 'pm',
          width: 100
        },
        {
          title: 'PTM',
          dataIndex: 'ptm',
          key: 'ptm',
          width: 100
        },
        {
          title: '备注',
          dataIndex: 'remarks',
          key: 'remarks',
          width: 100
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          render: (text, record) => {
            return (
              <div>
                <a
                  style={{ whiteSpace: 'nowrap' }}
                  onClick={() => this.handleModalEditVisible(true, record)}
                >
                  修改
                </a>
              </div>
            )
          }
        }
      ]
    }
  },
  computed: {
    showList() {
      const page = this.pageInfo.pageNum
      const limit = this.pageInfo.pageSize
      return this.list.slice((page - 1) * limit, page * limit)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.queryByPlatformEvolveInfoList()
    },
    handlePageUpdate(e) {
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit
    },
    handleEditClick(row) {
      this.$refs.editDialogRef.setTemp(row)
    },
    async queryByPlatformEvolveInfoList() {
      this.tableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/findByPlatformEvolveInfoList')
      this.list = res
      this.total = res.length || 0

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#platform-project-total {
  margin: 20px;

  .el-row {
    border: 1px solid #ddd;
    padding: 24px;
    box-sizing: content-box;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}
</style>
