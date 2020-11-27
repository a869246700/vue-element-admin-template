<template>
  <el-card class="bug-week-trend">
    <div class="title">BUG增长趋势图</div>

    <chart ref="chartRef" :option-rate="currentOptions" />
  </el-card>
</template>

<script>
import Chart from '@/components/MyChart/Chart'

import mockDate from './demo'

export default {
  components: {
    Chart
  },
  data() {
    return {
      active: 'day',
      currentOptions: {},
      options: {},
      legend: ['新增', '解决', '关闭', '未决', '已决', '累计']
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getChartDate()
    },
    chartResize() {
      this.$refs.chartRef.resize()
    },
    handleDatetypeChange(e) {
      this.$nextTick(() => {
        this.currentOptions = this.options[this.active]
      })
    },
    // 获取chart的数据
    async getChartDate(project) {
      const newBugNums = [] // 新增bug数量列表
      const resolvedBugNums = [] // 解决bug数量列表
      const closeBugNums = [] // 关闭bug数量列表
      const dates = [] // 横坐标数据列表
      const totalBugNums = [] // 累计bug数量列表
      const unresolvedBugNums = [] // 未决bug数量列表
      const completedBugNums = [] // 已决bug数量列表

      // 真正的网络请求
      // const { data: res } = await request('/api/...', {
      //   method: 'POST',
      //   params: {
      //     project
      //   }
      // })
      // console.log(res)

      // demoDate为模拟数据，真实网络请求则直接修改为res即可
      const res = await this.mockDate()
      res.map((item) => {
        resolvedBugNums.push(item.resolvedBugNums)
        totalBugNums.push(item.totalBugNums)
        unresolvedBugNums.push(item.unresolvedBugNums)
        closeBugNums.push(item.closeBugNums)
        completedBugNums.push(item.totalBugNums - item.unresolvedBugNums)

        const date = new Date(item.date)
        dates.push(
          `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}第${item.week}周`
        )
      })

      this.currentOptions = {
        title: {
          text: 'BUG按周趋势图',
          top: 20,
          textStyle: {
            fontWeight: '700',
            fontSize: 16,
            color: '#000'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 40,
          data: this.legend
        },
        grid: {
          top: 80,
          left: 50,
          right: 50,
          bottom: 0,
          containLabel: true
        },
        dataZoom: [
          {
            type: 'inside',
            bottom: 10,
            start: 0,
            end: 100
          }
        ],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: dates
        },
        yAxis: {
          type: 'value',
          name: 'BUG数',
          nameTextStyle: {
            color: '#000'
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        series: [
          {
            name: '新增',
            type: 'line',
            stack: '总量',
            data: newBugNums
          },
          {
            name: '解决',
            type: 'line',
            stack: '总量',
            data: resolvedBugNums
          },
          {
            name: '关闭',
            type: 'line',
            stack: '总量',
            data: closeBugNums
          },
          {
            name: '未决',
            type: 'line',
            stack: '总量',
            data: unresolvedBugNums
          },
          {
            name: '已决',
            type: 'line',
            stack: '总量',
            data: completedBugNums
          },
          {
            name: '累计',
            type: 'line',
            stack: '总量',
            data: totalBugNums
          }
        ]
      }
    },
    mockDate() {
      return new Promise((resolve, reject) => {
        resolve(mockDate)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  padding-bottom: 10px;
  margin-bottom: 10px;
  color: #666;
  border-bottom: 1px solid #ccc;
}
</style>
