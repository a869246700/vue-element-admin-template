<template>
  <el-dialog title="查看文档定级日志" :visible.sync="dialogVisible" width="50%">
    <el-table
      v-loading="tableLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px;"
      :header-cell-style="{ background: '#f6f6f6' }"
      fit
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :min-width="item.minWidth"
        :show-overflow-tooltip="item.prop !== 'action'"
        :fixed="item.fixed"
      >
        <template slot-scope="{row}">
          <div style="white-space: normal;">{{ row[item.prop] }}</div>
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
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination/index'

import request from '@/services/request'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      dialogVisible: false,
      pageInfo: {
        orderBy: null,
        pageNum: 1,
        pageSize: 10
      },
      tableLoading: false,
      list: [],
      total: 0,
      tableOptions: [
        {
          label: '操作人员',
          prop: 'operate_name',
          minWidth: '60'
        },
        {
          label: '操作时间',
          prop: 'operate_time',
          minWidth: '100'
        },
        {
          label: '操作内容',
          prop: 'operate_content',
          minWidth: '140'
        },
        {
          label: '操作原因',
          prop: 'operate_cause',
          minWidth: '150'
        }
      ]
    }
  },
  methods: {
    async loadList(id) {
      this.tableLoading = true
      const { data: res } = await request('/api/cafUserInfo/queryByLog', {
        params: {
          id
        }
      })
      this.list = res
      this.total = res.length

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style>
</style>
