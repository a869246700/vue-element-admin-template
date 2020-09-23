<template>
  <el-card id="business-promise-cash">
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

        <template v-if="item.children">
          <el-table-column
            v-for="child in item.children"
            :key="child.dataIndex"
            :label="child.title"
            :prop="child.key"
            :min-width="child.width"
          />
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
  name: 'BusinessPromiseCash',
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
          title: '项目',
          dataIndex: 'project',
          key: 'project',
          fixed: 'left',
          width: 120
        },
        {
          title: '关联平台版本',
          dataIndex: 'version',
          key: 'version',
          width: 120
        },
        {
          title: '关联产品',
          dataIndex: 'product',
          key: 'product',
          width: 80
        },
        {
          title: '事业部归属',
          dataIndex: 'business_dep',
          key: 'business_dep',
          width: 100
        },
        {
          title: '兑现情况',
          dataIndex: 'situation',
          key: 'situation',
          width: 100
        },
        {
          title: '是否平台原因导致',
          dataIndex: 'is_platform_cause',
          key: 'is_platform_cause',
          width: 150
        },
        {
          title: '简要原因',
          dataIndex: 'brief_cause',
          key: 'brief_cause',
          width: 120,
          sot: true
        },
        {
          title: '变更记录',
          dataIndex: 'change',
          key: 'change',
          width: 250
        },
        {
          title: '试点发布',
          dataIndex: 'pilot_date',
          key: 'pilot_date',
          children: [
            {
              title: '承诺时间',
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
          title: '备注',
          dataIndex: 'remarks',
          key: 'remarks',
          width: 150,
          sot: true
        },
        {
          title: 'TR5',
          dataIndex: 'trs',
          key: 'trs',
          width: 150
        },
        {
          title: 'ADCP',
          dataIndex: 'adcp',
          key: 'adcp',
          width: 100
        },
        {
          title: '进展摘要',
          dataIndex: 'evolve',
          key: 'evolve',
          width: 150,
          sot: true
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right'
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
      this.queryByPlatformPromiseInfoList()
    },
    handlePageUpdate(e) {
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit
    },
    handleEditClick(row) {
      this.$refs.editDialogRef.setTemp(row)
    },
    async queryByPlatformPromiseInfoList() {
      this.tableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/findByPlatformPromiseInfoList')
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
#business-promise-cash {
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
