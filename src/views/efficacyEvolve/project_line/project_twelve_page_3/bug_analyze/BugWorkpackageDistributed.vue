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
      const dataAxis = [
        '其他(RGOS软件)',
        '易用性',
        '安全性',
        '接口设计(详细设计)',
        '数据类型使用不当',
        '未遵守显示的接口约定',
        '产品特性定义',
        '异常处理问题',
        '解决方案',
        '其他(RGOS软件)',
        '易用性',
        '安全性',
        '接口设计(详细设计)',
        '数据类型使用不当',
        '未遵守显示的接口约定',
        '产品特性定义',
        '异常处理问题',
        '解决方案',
        '其他(RGOS软件)',
        '易用性',
        '安全性',
        '接口设计(详细设计)',
        '数据类型使用不当',
        '未遵守显示的接口约定',
        '产品特性定义',
        '异常处理问题',
        '解决方案'
      ]

      this.currentOptions = {
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
          top: 80,
          left: 80,
          right: 80,
          bottom: 50,
          containLabel: true
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            textStyle: {
              color: '#000'
            }
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
            data: [
              410,
              100,
              50,
              50,
              30,
              20,
              10,
              8,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              0
            ]
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
