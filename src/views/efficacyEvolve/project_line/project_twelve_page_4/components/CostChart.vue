<template>
  <div class="cost-chart">
    <summary-sta style="margin: 0px; margin-bottom: 10px;" />

    <card title="成本统计图">
      <div>
        <chart
          ref="echartsTypeCostSummaryStaRef"
          v-loading="echartsTypeCostSummaryStaLoading"
          :option-rate="echartsTypeCostSummaryStaOptions"
        />
      </div>

      <div style="margin-top: 20px">
        <chart
          ref="echartsRealmCostSummaryStaRef"
          v-loading="echartsRealmCostSummaryStaLoading"
          :option-rate="echartsRealmCostSummaryStaOptions"
        />
      </div>
    </card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import Chart from '@/components/MyChart/Chart'
import SummarySta from '@/views/efficacyEvolve/summary_sta'

import request from '@/services/request'
export default {
  components: { Card, Chart, SummarySta },
  props: {
    project: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      echartsTypeCostSummaryStaLoading: false,
      echartsRealmCostSummaryStaLoading: false,
      echartsTypeCostSummaryStaOptions: undefined,
      echartsRealmCostSummaryStaOptions: undefined
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getEchartsTypeCostSummarySta(this.project)
      this.getEchartsRealmCostSummarySta(this.project)
    },
    // 调整chart
    chartResize() {
      this.$nextTick(() => {
        // console.log('调整chart')
        this.$refs.echartsTypeCostSummaryStaRef.resize()
        this.$refs.echartsRealmCostSummaryStaRef.resize()
      })
    },
    async getEchartsTypeCostSummarySta(project) {
      this.echartsTypeCostSummaryStaLoading = true
      const { data: res } = await request('/api/projectEvolveSta/echarts/costTypeWeekSummarySta', {
        method: 'POST',
        data: {
          project
        }
      })
      this.echartsTypeCostSummaryStaOptions = {
        backgroundColor: '#fff',
        title: {
          text: '大类资源统计',
          top: 10,
          left: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        legend: {
          data: res.legend,
          top: 10,
          selected: {
            合计: false
          }
        },
        toolbox: {
          show: true
        },
        calculable: true,
        grid: [
          {
            left: '4%',
            right: '4%',
            bottom: 80
          }
        ],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: res.xCoordinate
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            start: 50,
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
        series: res.echartsData
      }

      this.$nextTick(() => {
        this.echartsTypeCostSummaryStaLoading = false
      })
    },
    async getEchartsRealmCostSummarySta(project) {
      this.echartsRealmCostSummaryStaLoading = true
      const { data: res } = await request('/api/projectEvolveSta/echarts/costRealmWeekSummarySta', {
        method: 'POST',
        data: {
          project
        }
      })
      this.echartsRealmCostSummaryStaOptions = {
        backgroundColor: '#fff',
        title: {
          text: '业务域资源统计',
          top: 10,
          left: 10
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: res.legend,
          top: 10,
          selected: {
            合计: false
          }
        },
        toolbox: {
          show: true
        },
        calculable: true,
        grid: [
          {
            left: '4%',
            right: '4%',
            bottom: 80
          }
        ],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: res.xCoordinate
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            start: 50,
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
        series: res.echartsData
      }

      this.$nextTick(() => {
        this.echartsRealmCostSummaryStaLoading = false
      })
    }
  }
}
</script>
