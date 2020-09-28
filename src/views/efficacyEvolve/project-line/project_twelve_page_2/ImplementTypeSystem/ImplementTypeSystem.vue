<template>
  <el-dialog title="用例执行统计" :visible.sync="dialogVisible" width="70%" lock-scroll>
    <el-table
      v-loading="tableLoading"
      :data="showData"
      border
      style="width: 100%;"
      :header-cell-style="{'background-color': '#FAFAFA' }"
      highlight-current-row
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.pkeyrop"
        :prop="item.dataIndex"
        :label="item.title"
        :min-width="item.width"
        show-overflow-tooltip
      />
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
  props: {
    project: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      tableLoading: false,
      list: [],
      total: 0,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      tableOptions: [
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          width: 100
        },
        {
          title: '归属测试域',
          dataIndex: 'system',
          key: 'system',
          width: 100
        },
        {
          title: '用例总数',
          dataIndex: 'all_num',
          key: 'all_num',
          width: 80
        },
        {
          title: '已执行',
          dataIndex: 'exe_num',
          key: 'exe_num',
          width: 65
        },
        {
          title: '执行率',
          dataIndex: 'exe_rate',
          key: 'exe_rate',
          width: 75
        },
        {
          title: '未执行',
          dataIndex: 'no_num',
          key: 'no_num',
          width: 65
        },
        {
          title: 'SKIP',
          dataIndex: 'skip_num',
          key: 'skip_num',
          width: 65
        },
        {
          title: 'PASS数',
          dataIndex: 'pass_num',
          key: 'pass_num',
          width: 75
        },
        {
          title: 'PASS率',
          dataIndex: 'pass_rate',
          key: 'pass_rate',
          width: 75
        },
        {
          title: 'FAIL率',
          dataIndex: 'fail_rate',
          key: 'fail_rate',
          width: 75
        },
        {
          title: '未分析',
          dataIndex: 'no_analyse_num',
          key: 'no_analyse_num',
          width: 65
        },
        {
          title: '今日执行总数',
          dataIndex: 'day_all_num',
          key: 'day_all_num',
          width: 105
        },
        {
          title: '今日PASS总数',
          dataIndex: 'day_pass_num',
          key: 'day_pass_num',
          width: 115
        },
        {
          title: '计划明日执行个数',
          dataIndex: 'tomorrow_num',
          key: 'tomorrow_num',
          width: 135
        },
        {
          title: '还需执行天数',
          dataIndex: 'exe_day_num',
          key: 'exe_day_num',
          width: 115
        }
      ]
    }
  },
  computed: {
    showData() {
      const page = this.pageInfo.pageNum
      const limit = this.pageInfo.pageSize
      return this.list.slice((page - 1) * limit, page * limit)
    }
  },
  methods: {
    resetPageInfo() {
      this.pageInfo = {
        pageNum: 1,
        pageSize: 10
      }
    },
    typeClick(stage, projectStage, isSpec, type) {
      this.dialogVisible = true
      this.resetPageInfo()
      this.queryImplementNumTypeSystem(this.project, stage, projectStage, isSpec, type)
    },
    handlePageUpdate(e) {
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit
    },
    async queryImplementNumTypeSystem(project, stage, projectStage, isSpec, type) {
      this.tableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByImplementNumTypeSystem', {
        params: {
          project,
          stage,
          projectStage,
          isSpec,
          type
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

<style lang="scss" scoped>
.title {
  color: #1895ff;
  cursor: pointer;
}
</style>
