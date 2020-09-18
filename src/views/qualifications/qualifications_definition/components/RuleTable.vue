<template>
  <div>
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
        <template #header>
          <div style="white-space: normal;">{{ item.title }}</div>
        </template>
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
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'

import { doQualificationsRule } from '@/services/qualifications/qualifications'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      tableLoading: false,
      list: [],
      total: 0,
      tableOptions: [
        {
          title: '当前资质',
          dataIndex: 'qualifications',
          key: 'qualifications'
        },
        {
          title: '资质计划',
          dataIndex: 'qualifications_plan',
          key: 'qualifications_plan'
        },
        {
          title: '目标资质',
          dataIndex: 'target_qualifications',
          key: 'target_qualifications'
        },
        {
          title: '专业域/技能域',
          dataIndex: 'realm_explain',
          key: 'realm_explain'
        },
        {
          title: '项目产出',
          dataIndex: 'project_produce',
          key: 'project_produce'
        },
        {
          title: '有效期(月)',
          dataIndex: 'term_validity',
          key: 'term_validity'
        }
      ],
      pageInfo: {
        orderBy: null,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loadList()
    },
    handlePageUpdate(e) {
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit
      this.loadList()
    },
    async loadList() {
      this.tableLoading = true
      const { data: res } = await doQualificationsRule(this.pageInfo)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>
