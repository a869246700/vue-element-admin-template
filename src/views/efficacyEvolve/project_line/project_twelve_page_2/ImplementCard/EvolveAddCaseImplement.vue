<template>
  <el-dialog
    title="用例执行分析"
    :visible.sync="dialogVisible"
    width="80%"
    :before-close="handleDialogClose"
  >
    <el-table v-loading="tableLoading" :data="list" show-header border style="width: 100%;">
      <el-table-column
        v-for="item in tableOptions"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
      >
        <template slot-scope="{row}">
          <el-input
            v-if="item.prop === 'analyse'"
            v-model="row.analyse"
            placeholder="请输入执行分析!"
            type="textarea"
          />

          <span
            v-else-if="item.prop === 'exe_day_num' && row.product_name === '合计'"
          >{{ Math.ceil(row.tomorrow_num===0?0:(row.no_num / row.tomorrow_num)) }}</span>

          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import request from '@/services/request'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: false,
      tableLoading: false
    }
  },
  computed: {
    tableOptions() {
      return [
        {
          prop: 'product_name',
          label: '芯片平台',
          minWidth: 120
        },
        {
          prop: 'all_num',
          label: '用例总数',
          minWidth: 89
        },
        {
          prop: 'exe_num',
          label: '已执行',
          minWidth: 78
        },
        {
          prop: 'exe_rate',
          label: '执行率',
          minWidth: 78
        },
        {
          prop: 'no_num',
          label: '未执行',
          minWidth: 78
        },
        {
          prop: 'skip_num',
          label: 'SKIP',
          minWidth: 70
        },
        {
          prop: 'pass_rate',
          label: 'PASS率',
          minWidth: 89
        },
        {
          prop: 'fail_rate',
          label: 'FAIL率',
          minWidth: 89
        },
        {
          prop: 'no_analyse_num',
          label: '未分析',
          minWidth: 78
        },
        {
          prop: 'day_all_num',
          label: '今日执行总数',
          minWidth: 120
        },
        {
          prop: 'day_pass_num',
          label: '今日PASS总数',
          minWidth: 132
        },
        {
          prop: 'tomorrow_num',
          label: '计划明日执行个数',
          minWidth: 145
        },
        {
          prop: 'exe_day_num',
          label: '还需执行天数',
          minWidth: 117
        },
        {
          prop: 'analyse',
          label: '执行分析',
          minWidth: 160
        }
      ]
    }
  },
  methods: {
    handleDialogClose() {
      this.list.forEach((item) => {
        item.is_spec = 0
        let url = ''
        if (!item.id) {
          url = '/api/projectEvolveSta/implementAnalyse/add'
        } else {
          url = '/api/projectEvolveSta/implementAnalyse/update'
        }
        request(url, {
          method: 'post',
          data: item
        })
      })

      this.$nextTick(() => {
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
