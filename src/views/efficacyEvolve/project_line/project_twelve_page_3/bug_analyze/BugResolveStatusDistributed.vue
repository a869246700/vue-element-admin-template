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
  props: {
    project: {
      type: String,
      default: ''
    }
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
      this.getChartDate(this.project)
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
      const legendData = []
      const seriesData = []
      // 真实网络请求
      // const { data: res } = await request('', {
      //   params: {
      //     project
      //   }
      // })
      // console.log(res)

      // 模拟数据请求
      const res = await this.genData()
      res.map((item) => {
        legendData.push(item.name)
        seriesData.push(item)
      })
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
      const data = [
        {
          name: 'CLOSED-ByDevelopment',
          value: 3438
        },
        {
          name: 'CLOSED-ByTest',
          value: 1055
        },
        {
          name: 'DENIAL-ByDevelopment',
          value: 599
        },
        {
          name: 'DENIAL-ByTest',
          value: 184
        },
        {
          name: 'DELAY',
          value: 53
        },
        {
          name: 'DENIAL-ByPSD',
          value: 8
        },
        {
          name: 'GIVEUP',
          value: 8
        },
        {
          name: 'NEW',
          value: 5
        },
        {
          name: 'RESOLVED',
          value: 1
        },
        {
          name: 'ASSIGNED',
          value: 1
        }
      ]
      return new Promise((resolve, reject) => {
        resolve(data)
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
