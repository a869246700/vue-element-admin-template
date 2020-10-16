<template>
  <el-card class="bug-growth">
    <div class="title">BUG增长趋势图</div>

    <el-radio-group v-model="active" size="medium" @change="handleDatetypeChange">
      <el-radio-button label="day">日</el-radio-button>
      <el-radio-button label="month">月</el-radio-button>
    </el-radio-group>

    <el-row :gutter="20">
      <el-col :span="18">
        <chart ref="chartRef" :option-rate="currentOptions" height="400px" />
      </el-col>
      <el-col :span="6" class="text-analyze">文字分析</el-col>
    </el-row>
  </el-card>
</template>

<script>
import echarts from 'echarts'
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
      this.options = {
        day: {
          title: {
            top: 20,
            text: 'BUG增长情况',
            textStyle: {
              fontWeight: '700',
              fontSize: 16,
              color: '#000'
            },
            left: '1%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#57617B'
              }
            }
          },
          grid: {
            top: 80,
            left: 50,
            right: 50,
            bottom: 0,
            containLabel: true
          },
          axisPointer: {
            link: { xAxisIndex: 'all' }
          },
          dataZoom: [
            {
              type: 'inside',
              bottom: 10,
              start: 0,
              end: 100
            }
          ],
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: '#57617B'
                }
              },
              data: [
                '2020-08-01',
                '2020-08-02',
                '2020-08-03',
                '2020-08-04',
                '2020-08-05',
                '2020-08-06',
                '2020-08-07',
                '2020-08-08',
                '2020-08-09',
                '2020-08-10',
                '2020-08-11',
                '2020-08-12'
              ]
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'BUG数',
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#57617B'
                }
              },
              axisLabel: {
                margin: 10,
                textStyle: {
                  fontSize: 14
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#57617B'
                }
              }
            }
          ],
          series: [
            {
              name: '项目BUG',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: 'rgba(219, 50, 51, 0.3)'
                      },
                      {
                        offset: 0.8,
                        color: 'rgba(219, 50, 51, 0)'
                      }
                    ],
                    false
                  ),
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowBlur: 10
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(219,50,51)',
                  borderColor: 'rgba(219,50,51,0.2)',
                  borderWidth: 12
                }
              },
              data: [0, 18, 25, 45, 67, 85, 123, 78, 51, 20, 8, 0]
            }
          ]
        },
        month: {
          title: {
            top: 20,
            text: 'BUG增长情况',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 16,
              color: '#000'
            },
            left: '1%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#57617B'
              }
            }
          },
          grid: {
            top: 100,
            left: 80,
            right: 80,
            bottom: '2%',
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
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: '#57617B'
                }
              },
              data: [
                '2018-08',
                '2018-09',
                '2018-10',
                '2018-11',
                '2018-12',
                '2019-01',
                '2019-02',
                '2019-03'
              ]
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'BUG数',
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#57617B'
                }
              },
              axisLabel: {
                margin: 10,
                textStyle: {
                  fontSize: 14
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#57617B'
                }
              }
            }
          ],
          series: [
            {
              name: '项目BUG',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: 'rgba(219, 50, 51, 0.3)'
                      },
                      {
                        offset: 0.8,
                        color: 'rgba(219, 50, 51, 0)'
                      }
                    ],
                    false
                  ),
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowBlur: 10
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(219,50,51)',
                  borderColor: 'rgba(219,50,51,0.2)',
                  borderWidth: 12
                }
              },
              data: [0, 18, 45, 101, 65, 34, 22, 0]
            }
          ]
        }
      }

      this.currentOptions = this.options[this.active]
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

.text-analyze {
  padding-top: 50px;
}
</style>
