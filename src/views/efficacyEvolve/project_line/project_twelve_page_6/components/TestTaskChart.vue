<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
import request from '@/services/request'

export default {
  mixins: [resize],
  props: {
    project: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    optionRate: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null,
      xData: undefined,
      legend: undefined,
      totalList: [],
      completedList: [],
      noCompletedList: []
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    init() {
      this.getEchartsData(this.project)
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        backgroundColor: '#344b58',
        title: {
          text: '任务统计图',
          x: 'center',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#000'
          }
        },
        legend: {
          x: 'center',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: ['未完成任务数', '完成任务数', '总任务数']
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 2
            },
            data: this.xData
          }
        ],
        yAxis: [
          {
            name: '任务数',
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            splitArea: {
              show: false
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 30,
            start: 10,
            end: 80,
            handleIcon:
              'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: '#d3dee5'
            },
            textStyle: {
              color: '#fff'
            },
            borderColor: '#90979c'
          },
          {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35
          }
        ],
        series: [
          {
            name: '未完成任务数',
            type: 'bar',
            stack: 'total',
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: 'rgba(255,144,128,1)',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'insideTop',
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: this.noCompletedList
          },

          {
            name: '完成任务数',
            type: 'bar',
            stack: 'total',
            itemStyle: {
              normal: {
                color: 'rgba(0,191,183,1)',
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: 'top',
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: this.completedList
          },

          {
            name: '总任务数',
            type: 'line',
            stack: 'total',
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: 'rgba(252,230,48,1)',
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: 'top',
                  distance: 5,
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: this.totalList
          }
        ]
      })
    },
    async getEchartsData(project) {
      const { data: res } = await request('/api/zcodergoo/echarts/taskPerformance', {
        method: 'POST',
        data: {
          project
        }
      })
      this.xData = res.xCoordinate
      this.totalList = res.total
      this.completedList = res.completed

      for (let i = 0; i < res.total.length; i++) {
        this.noCompletedList.push(res.total[i] - res.completed[i])
      }

      this.initChart()
    }
  }
}
</script>
