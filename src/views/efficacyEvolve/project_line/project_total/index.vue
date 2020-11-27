<template>
  <el-card class="project-total-container">
    <data-panle :data="projectTotal" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart ref="chartRef" :chart-data="lineChartData" />
    </el-row>
  </el-card>
</template>

<script>
import DataPanle from './components/DataPanel'
import LineChart from './components/LineChart'

// import request from '@/services/request'

export default {
  components: { LineChart, DataPanle },
  data() {
    return {
      project: '',
      lineChartData: {
        actualList: [],
        expectedList: [],
        dateList: []
      },
      projectTotal: {
        progress_title: '总用例执行情况',
        progress_exac: 88,
        progress_pass: 95,
        quality_title: '',
        quality_target: 2.3,
        quality_current: 1.96,
        quality_omiss_rate: 0.05,
        cost_title: '', //
        cost_target: 500, // 目标值
        cost_current: 60, // 当前成本使用率
        cost_efficiency: 85, // 测试效率
        risk_title: '', // 标题
        risk_total: 10, // 总数
        risk_isClosed: 5, // 已闭环
        risk_isNotClosed: 5 // 未闭环
      },
      dailyDefectList: []
    }
  },
  created() {
    console.log('创建')
    this.project = this.$t(this.$route.matched[2].meta.title)
    this.init()
  },
  destroyed() {
    console.log('销毁')
  },
  methods: {
    // 初始化数据
    init() {
      this.getProjectTotal(this.project)
      this.getDailyDefectList(this.project)
    },
    // 调用适应echart的大小
    chartResize() {
      this.$refs.chartRef.resize()
    },
    // 获取项目总述信息
    async getProjectTotal(project) {
      // const { data: res } = await request('', {
      //   method: 'GET',
      //   params: {
      //     project
      //   }
      // })
      // console.log(res)
      // this.projectTotal = res
    },
    // 获取项目每日缺陷提交信息列表
    async getDailyDefectList(project) {
      // const { data: res } = await request('', {
      //   method: 'GET',
      //   params: {
      //     project
      //   }
      // })
      // console.log(res)
      // [{ date, expected, actual }]
      // this.dailyDefectList = res

      // const expectedList = []
      // const actualList = []
      // const dateList = []
      // res.map(item => {
      //   expectedList.push(item.expected)
      //   actualList.push(item.actual)
      //   dateList.push(item.date)
      // })

      // this.lineChartData = {
      //   expectedList,
      //   actualList,
      //   dateList
      // }
      this.lineChartData.dateList = ['周一', '周二', '周三', '周四', '周五', '周六', '周天']
      this.lineChartData.expectedList = [100, 120, 161, 134, 105, 160, 165]
      this.lineChartData.actualList = [120, 82, 91, 154, 162, 140, 145]
    }
  }
}
</script>
