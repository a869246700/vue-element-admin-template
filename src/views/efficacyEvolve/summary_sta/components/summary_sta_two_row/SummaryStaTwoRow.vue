<template>
  <el-row>
    <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 8}" :xl="{span: 8}">
      <chart
        ref="echartsProjectBigTypeSummaryRef"
        v-loading="echartsProjectBigTypeSummaryLoading"
        :option-rate="echartsProjectBigTypeSummaryOptions"
      />
    </el-col>
    <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 8}" :xl="{span: 8}">
      <chart
        ref="echartsProjectSmallTypeSummaryRef"
        v-loading="echartsProjectSmallTypeSummaryLoading"
        :option-rate="echartsProjectSmallTypeSummaryOptions"
      />
    </el-col>
    <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 8}" :xl="{span: 8}">
      <chart
        ref="echartsProjectInfoSummaryRef"
        v-loading="echartsProjectInfoSummaryLoading"
        :option-rate="chartsProjectInfoSummaryOptions"
      />
    </el-col>
  </el-row>
</template>

<script>
import Chart from '@/components/MyChart/Chart'

import request from '@/services/request'

export default {
  components: { Chart },
  props: {
    ecahrtsColor: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      echartsProjectBigTypeSummaryLoading: false,
      echartsProjectSmallTypeSummaryLoading: false,
      echartsProjectInfoSummaryLoading: false,
      echartsProjectBigTypeSummaryOptions: undefined,
      echartsProjectSmallTypeSummaryOptions: undefined,
      chartsProjectInfoSummaryOptions: undefined
    }
  },
  methods: {
    callSta(type, startDate, endDate) {
      this.projectBigTypeSummaryEcharts(type, startDate, endDate)
      this.projectSmallTypeSummaryEcharts(type, startDate, endDate)
      this.projectInfoSummaryEcharts(type, startDate, endDate)
    },
    async projectBigTypeSummaryEcharts(type, startDate, endDate) {
      this.echartsProjectBigTypeSummaryLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryBySummaryTypeSta', {
        params: {
          type,
          startDate,
          endDate
        }
      })
      this.echartsProjectBigTypeSummaryOptions = {
        title: {
          text: '项目资源占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          data: ['平台项目', '专业项目', '非项目', '未投入'],
          show: false
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {
                value: res.pi_project,
                name: '平台项目',
                itemStyle: { normal: { color: this.ecahrtsColor[0] }}
              },
              {
                value: res.major_project,
                name: '专业项目',
                itemStyle: { normal: { color: this.ecahrtsColor[1] }}
              },
              {
                value: res.not_project,
                name: '非项目',
                itemStyle: { normal: { color: this.ecahrtsColor[2] }}
              },
              {
                value: res.no_project,
                name: '未投入',
                itemStyle: { normal: { color: this.ecahrtsColor[3] }}
              }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{b} : {d}%'
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      }

      this.$nextTick(() => {
        this.echartsProjectBigTypeSummaryLoading = false
      })
    },
    async projectSmallTypeSummaryEcharts(type, startDate, endDate) {
      this.echartsProjectSmallTypeSummaryLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryBySummaryProjectTypeSta', {
        params: {
          type,
          startDate,
          endDate
        }
      })
      this.echartsProjectSmallTypeSummaryOptions = {
        title: {
          text: '关键项目资源占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          data: ['12.5PL', '12.4PL', '12.x', '11.x和10.x', '其它'],
          show: false
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {
                value: res.five_project,
                name: '12.5PL',
                itemStyle: { normal: { color: this.ecahrtsColor[0] }}
              },
              {
                value: res.four_project,
                name: '12.4PL',
                itemStyle: { normal: { color: this.ecahrtsColor[1] }}
              },
              {
                value: res.twelve_project,
                name: '12.x',
                itemStyle: { normal: { color: this.ecahrtsColor[2] }}
              },
              {
                value: res.eleven_ten_project,
                name: '11.x和10.x',
                itemStyle: { normal: { color: this.ecahrtsColor[3] }}
              },
              {
                value: res.other_project,
                name: '其它',
                itemStyle: { normal: { color: this.ecahrtsColor[4] }}
              }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{b} : {d}%'
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      }

      this.$nextTick(() => {
        this.echartsProjectSmallTypeSummaryLoading = false
      })
    },
    async projectInfoSummaryEcharts(type, startDate, endDate) {
      this.echartsProjectInfoSummaryLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryBySummaryCruxProjectSta', {
        params: {
          type,
          startDate,
          endDate
        }
      })
      this.chartsProjectInfoSummaryOptions = {
        title: {
          text: '关键项目资源投入'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: res.project
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: res.xCoordinate
        },
        yAxis: {
          type: 'value'
        },
        series: res.echartsData
      }

      this.$nextTick(() => {
        this.echartsProjectInfoSummaryLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  .el-col {
    padding: 24px;
    margin-top: 10px;
    border: 1px solid #ccc;
  }
}
</style>
