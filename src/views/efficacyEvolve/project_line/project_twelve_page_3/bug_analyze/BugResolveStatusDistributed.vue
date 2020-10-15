<template>
  <el-card class="bug-resolve-status-distributed">
    <div class="title">BUG解决状态分布情况</div>

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
      const { seriesData, legendData } = this.genData()
      this.currentOptions = {
        title: {
          text: 'BUG解决状态分布情况',
          top: 10,
          textStyle: {
            fontWeight: '700',
            fontSize: 16,
            color: '#000'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/>BUG解决状态 : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: 20,
          top: 50,
          bottom: 20,
          data: legendData
        },
        series: [
          {
            name: '姓名',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            data: seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },
    genData() {
      const seriesData = []
      const legends = [
        'CLOSED-ByDevelopment',
        'CLOSED-ByTest',
        'DENIAL-ByDevelopment',
        'DENIAL-ByTest',
        'DELAY',
        'DENIAL-ByPSD',
        'GIVEUP',
        'NEW'
      ]
      for (let i = 0; i < 8; i++) {
        seriesData.push({
          name: legends[i],
          value: Math.round(Math.random() * 100000)
        })
      }
      return {
        seriesData: seriesData,
        legendData: legends
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
