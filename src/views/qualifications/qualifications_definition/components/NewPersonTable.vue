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

import { doQualificationsRuleNewPerson } from '@/services/qualifications/qualifications'

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
          title: '资质',
          dataIndex: 'qualifications',
          key: 'qualifications',
          width: '50'
        },
        {
          title: '校招新员工认定要求（一年内达成）',
          dataIndex: 'school_requirement',
          key: 'school_requirement',
          width: '100'
        },
        {
          title: '校招新员工认定要求（半年内达成）',
          dataIndex: 'school_requirement_hyear',
          key: 'school_requirement_hyear',
          width: '100'
        },
        {
          title: '社招新员工认定要求（转正期内）',
          dataIndex: 'society_requirement',
          key: 'society_requirement',
          width: '100'
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
      const { data: res } = await doQualificationsRuleNewPerson(this.pageInfo)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>
