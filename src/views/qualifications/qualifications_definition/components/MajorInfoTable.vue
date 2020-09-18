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

import { doQualificationsRuleMajorInfo } from '@/services/qualifications/qualifications'

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
          title: '事业部',
          dataIndex: 'business_dep',
          key: 'business_dep',
          width: '70'
        },
        {
          title: '域名',
          dataIndex: 'realm_name',
          key: 'realm_name',
          width: '60'
        },
        {
          title: '域主',
          dataIndex: 'realm_person',
          key: 'realm_person',
          width: '40'
        },
        {
          title: '域范围',
          dataIndex: 'realm_scope',
          key: 'realm_scope',
          width: '250'
        },
        {
          title: '开发专业组',
          dataIndex: 'group_name',
          key: 'group_name',
          width: '70'
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
      const { data: res } = await doQualificationsRuleMajorInfo(this.pageInfo)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>
