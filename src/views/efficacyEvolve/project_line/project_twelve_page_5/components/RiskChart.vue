<template>
  <el-row :gutter="32">
    <el-col
      :xs="{span: 24}"
      :sm="{span: 24}"
      :md="{span: 12}"
      :lg="{span: 12}"
      :xl="{span: 12}"
      style="padding-right:8px;margin-bottom:30px;"
    >
      <chart ref="firstChartRef" v-loading="isChartLoading" :chart-data="mockData" title="风险类别" />
    </el-col>
    <el-col
      :xs="{span: 24}"
      :sm="{span: 24}"
      :md="{span: 12}"
      :lg="{span: 12}"
      :xl="{span: 12}"
      style="padding-right:8px;margin-bottom:30px;"
    >
      <chart ref="secondChartRef" v-loading="isChartLoading" :chart-data="mockData2" title="风险影响" />
    </el-col>
  </el-row>
</template>

<script>
import Chart from '@/components/MyChart/Chart2'

export default {
  components: {
    Chart
  },
  props: {
    riskTypeData: {
      type: Object,
      default: () => {}
    },
    riskInfluenceData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      mockData: {
        data: [
          { value: 10, name: '管理风险' },
          { value: 5, name: '技术风险' },
          { value: 15, name: '资源风险' },
          { value: 25, name: '需求风险' }
        ],
        titleList: ['管理风险', '技术风险', '资源风险', '需求风险']
      },
      mockData2: {
        data: [
          { value: 500, name: '影响1' },
          { value: 100, name: '影响2' },
          { value: 150, name: '影响3' },
          { value: 250, name: '影响4' },
          { value: 200, name: '影响5' },
          { value: 350, name: '影响6' }
        ],
        titleList: ['影响1', '影响2', '影响3', '影响4', '影响5', '影响6']
      },
      isChartLoading: false
    }
  },
  mounted() {
    this.isChartLoading = true
    setTimeout(() => {
      this.isChartLoading = false
    }, 3000)
  },
  methods: {
    chartResize() {
      this.$nextTick(() => {
        // console.log('图表调整')
        this.$refs.firstChartRef.resize()
        this.$refs.secondChartRef.resize()
      })
    }
  }
}
</script>
