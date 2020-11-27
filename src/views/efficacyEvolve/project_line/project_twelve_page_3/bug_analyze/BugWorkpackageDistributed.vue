<template>
  <el-card class="bug-week-trend">
    <div class="title">BUG工作包分布情况</div>

    <chart ref="chartRef" :option-rate="optionMap.first" />
    <chart ref="chartRef" :option-rate="optionMap.second" />
  </el-card>
</template>

<script>
import Chart from '@/components/MyChart/Chart'

import mockDate from './demo2'

export default {
  components: {
    Chart
  },
  data() {
    return {
      optionMap: {
        first: undefined,
        second: undefined
      }
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
    // 获取chart的数据
    async getChartDate() {
      const dataAxis = []
      const firstSeriesData = []
      const secondSeriesDate = []

      const res = await this.mockDate()
      res.map((item) => {
        dataAxis.push(item.name)
        firstSeriesData.push(item.value)
        secondSeriesDate.push(item)
      })

      this.optionMap.second = {
        title: {
          text: 'BUG工作包分布情况',
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
          formatter: '{b} <br/>BUG工作包分布 : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: 20,
          top: 50,
          bottom: 20,
          data: dataAxis
        },
        series: [
          {
            name: '姓名',
            type: 'pie',
            radius: '55%',
            center: ['70%', '50%'],
            avoidLabelOverlap: false,
            data: secondSeriesDate,
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

      this.optionMap.first = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          text: 'BUG工作包分布情况',
          top: 20,
          textStyle: {
            fontWeight: '700',
            fontSize: 16,
            color: '#000'
          },
          left: '1%'
        },
        grid: {
          id: 'first',
          top: 80,
          left: 50,
          right: 50,
          bottom: 50,
          show: false,
          containLabel: true
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            textStyle: {
              color: '#000'
            },
            interval: '5'
          },
          axisTick: {
            show: false
          },
          z: 10
        },
        yAxis: {
          name: 'BUG数',
          nameTextStyle: {
            color: '#000'
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            name: 'BUG类型',
            type: 'bar',
            barWidth: '100%',
            itemStyle: {
              color: '#B42E2E'
            },
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            data: firstSeriesData
          }
        ]
      }
    },
    // 模拟数据
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

.operation-bar {
  display: flex;
  justify-content: flex-end;
}
</style>
