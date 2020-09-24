<template>
  <el-row>
    <el-col
      :xs="{span: 24}"
      :sm="{span: 8}"
      :md="{span: 8}"
      :lg="{span: 8}"
      :xl="{span: 8}"
      style="border: 1px solid #ccc; margin-top: 10px;"
    >
      <div>
        <div v-loading="summaryStageStaLoading" class="header">
          <el-row>
            <el-col :span="8">
              <div class="title">投入人数</div>
              <div class="content">
                <span>{{ summaryInvestmentSta.num || 0 }}</span>
                <span class="suffix">{{ '/' + (summaryInvestmentSta.all_num || 0) }}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="title">填写率</div>
              <div class="content">
                <span>{{ summaryInvestmentSta.rate || 0 }}</span>
                <span class="suffix">{{ '%' }}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="title">总计资源</div>
              <div class="content">
                <span>{{ summaryInvestmentSta.work_time || 0 }}</span>
                <span class="suffix">{{ '/' + (summaryInvestmentSta.all_time || 0) }}</span>
              </div>
            </el-col>
          </el-row>
        </div>

        <chart
          ref="echartsSummaryStaRef"
          v-loading="echartsSummaryStaLoading"
          :option-rate="echartsSummaryStaOptions"
          style="padding: 24px;"
        />
      </div>
    </el-col>

    <el-col
      :xs="{span: 24}"
      :sm="{span: 16}"
      :md="{span: 16}"
      :lg="{span: 16}"
      :xl="{span: 16}"
      style="padding: 0px; margin-top: 10px;"
    >
      <div style="border: 1px solid #ccc; padding: 48px 24px;">
        <chart
          ref="echartsSummaryStageStaRef"
          v-loading="echartsSummaryStageStaLoading"
          :option-rate="echartsSummaryStageStaOptions"
        />
      </div>
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
      summaryInvestmentSta: {},
      summaryStageStaLoading: false,
      echartsSummaryStaLoading: false,
      echartsSummaryStageStaLoading: false,
      echartsSummaryStaOptions: undefined,
      echartsSummaryStageStaOptions: undefined
    }
  },
  methods: {
    callSta(type, startDate, endDate) {
      this.queryBySummaryInvestmentSta(type, startDate, endDate)
      this.summaryStageStaEcharts(type, startDate, endDate)
    },
    async queryBySummaryInvestmentSta(type, startDate, endDate) {
      this.summaryStageStaLoading = true
      this.echartsSummaryStaLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryBySummaryInvestmentSta', {
        params: {
          type,
          startDate,
          endDate
        }
      })
      this.summaryInvestmentSta = res
      this.echartsSummaryStaOptions = {
        title: {
          text: '资源占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          show: false,
          data: ['资源投入', '未投差值']
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {
                value: res.work_time,
                name: '资源投入',
                itemStyle: { normal: { color: this.ecahrtsColor[0] }}
              },
              {
                value: res.all_time - res.work_time,
                name: '未投差值',
                itemStyle: { normal: { color: this.ecahrtsColor[1] }}
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
        this.summaryStageStaLoading = false
        this.echartsSummaryStaLoading = false
      })
    },
    async summaryStageStaEcharts(type, startDate, endDate) {
      this.echartsSummaryStageStaLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryBySumaryDeptMonthSta', {
        params: {
          type,
          startDate,
          endDate
        }
      })
      this.echartsSummaryStageStaOptions = {
        title: {
          text: '资源投入'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: res.dept
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
        this.echartsSummaryStageStaLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 24px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;

  .title {
    margin-bottom: 4px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }

  .content {
    color: rgba(0, 0, 0, 0.85);
    font-size: 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';

    .suffix {
      margin-left: 4px;
      font-size: 16px;
    }
  }
}
</style>
