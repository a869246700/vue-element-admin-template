<template>
  <el-card class="bug-week-trend">
    <div class="title">BUG增长趋势图</div>

    <chart ref="chartRef" :option-rate="currentOptions" />
  </el-card>
</template>

<script>
import Chart from '@/components/MyChart/Chart'

export default {
  components: {
    Chart
  },
  data() {
    return {
      active: 'day',
      currentOptions: {},
      options: {}
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
    getChartDate() {
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
          data: ['新增', '解决', '关闭', '未决', '已决', '累计']
        },
        grid: {
          top: 80,
          left: 80,
          right: 80,
          bottom: 50,
          containLabel: true
        },
        dataZoom: [
          {
            type: 'inside',
            bottom: 10,
            start: 0,
            end: 100
          },
          {
            show: true,
            type: 'slider',
            top: '90%',
            start: 50,
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
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '解决',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '关闭',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '未决',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '已决',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          },
          {
            name: '累计',
            type: 'line',
            stack: '总量',
            data: [1000, 1200, 1250, 1100, 2000, 3000, 4000]
          }
        ]
      }
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
