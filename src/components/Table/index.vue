<template>
  <div class="table-contaner">
    <el-table
      :data="showTableData"
      highlight-current-row
      border
      :header-cell-style="{background: '#f6f6f6'}"
      :max-height="maxHeight"
      style="width: 100%"
    >
      <column v-for="item in options" :key="item.key" :col="item" />
    </el-table>

    <div v-if="isShowPagination" class="pagination">
      <pagination
        :total="total"
        :page="pageInfo.page"
        :limit="pageInfo.limit"
        :auto-scroll="false"
        @pagination="handlePaginationChange"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import Column from './Column'

export default {
  components: {
    Pagination,
    Column
  },
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    maxHeight: {
      type: Number,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      pageInfo: {
        page: 1,
        limit: 10
      }
    }
  },
  computed: {
    // 表单列表总数
    total() {
      return this.tableData.length
    },
    // 是否显示表单
    isShowPagination() {
      return this.tableData.length > 10
    },
    // 显示的表单列表数据
    showTableData() {
      return this.tableData.slice((this.pageInfo.page - 1) * this.pageInfo.limit, this.pageInfo.page * this.pageInfo.limit)
    }
  },
  methods: {
    // 分段器修改配置
    handlePaginationChange(e) {
      this.pageInfo.page = e.page
      this.pageInfo.limit = e.limit
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  .pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
