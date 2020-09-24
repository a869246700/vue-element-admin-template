<template>
  <el-card id="summary-sta">
    <div class="operation-bar">
      <el-radio-group v-model="dateType">
        <el-radio-button
          v-for="item in dateTypeList"
          :key="item.prop"
          :label="item.prop"
          :disabled="item.disabled"
        >{{ item.label }}</el-radio-button>
      </el-radio-group>

      <el-date-picker
        v-model="date"
        :type="dateType"
        :format="dateType === 'week' ? 'yyyy-WW周' : ''"
        placeholder="选择周"
        :picker-options="pickerOptions"
        style="width: 160px; margin-left: 10px;"
        @change="handleDateChange"
      />

      <summary-sta-one-row ref="oneRowRef" :ecahrts-color="ecahrtsColor" style="margin-top: 10px;" />
      <summary-sta-two-row ref="twoRowRef" />
    </div>
  </el-card>
</template>

<script>
import SummaryStaOneRow from './components/summary_sta_one_row/SummaryStaOneRow'
import SummaryStaTwoRow from './components/summary_sta_two_row/SummaryStaTwoRow'

import request from '@/services/request'

export default {
  name: 'SummarySta',
  components: {
    SummaryStaOneRow,
    SummaryStaTwoRow
  },
  data() {
    return {
      date: new Date(),
      dateType: 'month',
      dateTypeList: [
        {
          label: '月',
          prop: 'month',
          disabled: false
        },
        {
          label: '周',
          prop: 'week',
          disabled: true
        }
      ],
      pickerOptions: {
        disabledDate: (time) =>
          time.getTime() < +new Date('2019-01-01') || time.getTime() > Date.now() - 8.64e7
      },
      ecahrtsColor: ['#59c4e6', '#b6a2de', '#93b7e3', '#a5e7f0', '#516b91']
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.queryByEchartsColor()
      this.$refs.oneRowRef.callSta('月', this.date.getFullYear(), this.date.getMonth() + 1)
      this.$refs.twoRowRef.callSta('月', this.date.getFullYear(), this.date.getMonth() + 1)
    },
    handleDateChange() {
      // 1. 判断当前日期的类型
      if (this.dateType === 'month') {
        // 当前是月份,执行查询
        this.$refs.oneRowRef.callSta('月', this.date.getFullYear(), this.date.getMonth() + 1)
        this.$refs.twoRowRef.callSta('月', this.date.getFullYear(), this.date.getMonth() + 1)
      } else if (this.dateType === 'week') {
        // 当前是周,暂时未开发
        // this.$refs.oneRowRef.callSta('周', this.date.getFullYear(), this.getWeek(this.date))
        this.$notify.error('暂时未开放周查询')
      }
    },
    getWeek(now) {
      const nowDate = new Date(now)
      const beginDate = new Date(nowDate.getFullYear(), 0, 1)
      return Math.ceil(
        (parseInt((nowDate - beginDate) / (24 * 60 * 60 * 1000)) + 1 + beginDate.getDay()) / 7
      )
    },
    async queryByEchartsColor() {
      const { data: res } = await request('/api/projectEvolveSta/queryByEchartsColor')
      this.ecahrtsColor = res
    }
  }
}
</script>

<style lang="scss" scoped>
#summary-sta {
  margin: 20px;
}
</style>
