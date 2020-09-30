<template>
  <div class="implement-card">
    <card title="SPEC核验" class="case card">
      <template #buttons>
        <el-button
          :loading="butLoading"
          type="primary"
          icon="el-icon-download"
          size="small"
          @click="handleSpecStaClick"
        >导出SPEC统计</el-button>
        <el-button
          :loading="butLoading"
          type="primary"
          icon="el-icon-download"
          size="small"
          @click="handleSpecDetClick"
        >导出SPEC明细</el-button>
      </template>
      <!-- 用例卡片 -->
      <template #content>
        <div class="content">
          <el-radio-group
            v-model="cStage"
            size="small"
            style="margin-right: 10px;"
            @change="handleImplementStageChange"
          >
            <el-radio-button
              v-for="(item, index) in currentStageTypeList"
              :key="index"
              :label="item.stage"
            />
          </el-radio-group>

          <el-radio-group v-model="iStage" size="small" @change="handleImplementStageChange">
            <el-radio-button key="9" label="汇总" />
            <el-radio-button
              v-for="(item, index) in implementStageTypeList"
              :key="index"
              :label="item.stage"
            />
          </el-radio-group>

          <!-- 图标展示区域 -->
          <div class="charts">
            <el-row :gutter="32">
              <el-col
                :xs="{span: 24}"
                :sm="{span: 24}"
                :md="{span: 12}"
                :lg="{span: 12}"
                :xl="{span: 12}"
                style="padding-right:8px;margin-bottom:30px;"
              >
                <chart
                  ref="caseChartRef"
                  v-loading="caseImplementChartLoading"
                  :option-rate="caseImplementChartOptions"
                />
              </el-col>
              <el-col
                :xs="{span: 24}"
                :sm="{span: 24}"
                :md="{span: 12}"
                :lg="{span: 12}"
                :xl="{span: 12}"
                style="padding-right:8px;margin-bottom:30px;"
              >
                <chart
                  ref="chipChartRef"
                  v-loading="chipPlatFormChartLoading"
                  :option-rate="chipPlatFormChartOptions"
                />
              </el-col>
            </el-row>
          </div>

          <!-- 表格一区域 -->
          <card class="case-first card">
            <template #content>
              <!-- select -->
              <div class="filter-container">
                <el-select v-model="firstSelectVal" multiple collapse-tags placeholder="请选择">
                  <el-option
                    v-for="(item, index) in firstSelectOptions"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </div>

              <!-- 产品表格 -->
              <div class="table">
                <el-table
                  v-loading="productTableLoading"
                  :data="implementNumProductList"
                  border
                  style="width: 100%"
                  :header-cell-style="{'background-color': '#FAFAFA' }"
                  highlight-current-row
                >
                  <el-table-column
                    v-for="item in firstTableOptions"
                    :key="item.key"
                    :prop="item.dataIndex"
                    :label="item.title"
                    :min-width="item.width"
                    :fixed="item.fixed"
                  >
                    <template slot-scope="{row}">
                      <span
                        v-if="item.dataIndex === 'product_name'"
                        class="title"
                        @click="handleSystemClick(row)"
                      >{{ row.product_name }}</span>

                      <span
                        v-else-if="item.dataIndex === 'exe_day_num' && row.product_name === '合计' && row.exe_day_num === undefined"
                      >{{ Math.ceil(row.tomorrow_num === 0 ? 0 : (row.no_num / row.tomorrow_num)) }}</span>

                      <span v-else>{{ row[item.dataIndex] }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </card>

          <!-- 表格二区域 -->
          <card class="case-second card">
            <template #content>
              <div class="filter-container">
                <el-select v-model="secondSelectVal" multiple collapse-tags placeholder="请选择">
                  <el-option
                    v-for="(item, index) in secondSelectOptions"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </div>

              <!-- 表格 -->
              <div class="table">
                <el-table
                  v-loading="productTableLoading"
                  :data="implementNumTypeList"
                  border
                  style="width: 100%"
                  :header-cell-style="{'background-color': '#FAFAFA' }"
                  highlight-current-row
                >
                  <el-table-column
                    v-for="item in secondTableOptions"
                    :key="item.key"
                    :prop="item.dataIndex"
                    :label="item.title"
                    :min-width="item.width"
                    :fixed="item.fixed"
                  >
                    <template slot-scope="{row}">
                      <span
                        v-if="item.dataIndex === 'type'"
                        class="title"
                        @click="handleTypeClick(row)"
                      >{{ row.type + row.type_new }}</span>

                      <span
                        v-else-if="item.dataIndex === 'exe_day_num' && row.type === '合计' && row.exe_day_num === undefined"
                      >{{ Math.ceil(row.tomorrow_num === 0 ? 0 : (row.no_num / row.tomorrow_num)) }}</span>

                      <span v-else>{{ row[item.dataIndex] }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </card>
        </div>
      </template>
    </card>
  </div>
</template>

<script>
import Card from '@/components/Card/index'
import Chart from '@/components/MyChart/Chart'

import request from '@/services/request'
import DownFiles from '@/vendor/ExportExcel'

const firstTableOptions = [
  {
    title: '芯片平台',
    dataIndex: 'product_name',
    key: 'product_name',
    width: 120,
    fixed: 'left'
  },
  {
    title: '用例总数',
    dataIndex: 'all_num',
    key: 'all_num',
    width: 90
  },
  {
    title: '已执行',
    dataIndex: 'exe_num',
    key: 'exe_num',
    width: 80
  },
  {
    title: '执行率',
    dataIndex: 'exe_rate',
    key: 'exe_rate',
    width: 80
  },
  {
    title: '未执行',
    dataIndex: 'no_num',
    key: 'no_num',
    width: 80
  },
  {
    title: 'SKIP',
    dataIndex: 'skip_num',
    key: 'skip_num',
    width: 80
  },
  {
    title: 'PASS数',
    dataIndex: 'pass_num',
    key: 'pass_num',
    width: 90
  },
  {
    title: 'PASS率',
    dataIndex: 'pass_rate',
    key: 'pass_rate',
    width: 90
  },
  {
    title: 'FAIL数',
    dataIndex: 'fail_num',
    key: 'fail_num',
    width: 90
  },
  {
    title: 'FAIL率',
    dataIndex: 'fail_rate',
    key: 'fail_rate',
    width: 80
  },
  {
    title: '未分析',
    dataIndex: 'no_analyse_num',
    key: 'no_analyse_num',
    width: 80
  },
  {
    title: '今日执行总数',
    dataIndex: 'day_all_num',
    key: 'day_all_num',
    width: 120
  },
  {
    title: '今日PASS总数',
    dataIndex: 'day_pass_num',
    key: 'day_pass_num',
    width: 135
  },
  {
    title: '计划明日执行个数',
    dataIndex: 'tomorrow_num',
    key: 'tomorrow_num',
    width: 145
  },
  {
    title: '还需执行天数',
    dataIndex: 'exe_day_num',
    key: 'exe_day_num',
    width: 120
  },
  {
    title: '执行分析',
    dataIndex: 'analyse',
    key: 'analyse',
    width: 450
  }
]

const secondTableOptions = [
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 120
  },
  {
    title: '用例总数',
    dataIndex: 'all_num',
    key: 'all_num',
    width: 90
  },
  {
    title: '已执行',
    dataIndex: 'exe_num',
    key: 'exe_num',
    width: 80
  },
  {
    title: '执行率',
    dataIndex: 'exe_rate',
    key: 'exe_rate',
    width: 80
  },
  {
    title: '未执行',
    dataIndex: 'no_num',
    key: 'no_num',
    width: 80
  },
  {
    title: 'SKIP',
    dataIndex: 'skip_num',
    key: 'skip_num',
    width: 80
  },
  {
    title: 'PASS数',
    dataIndex: 'pass_num',
    key: 'pass_num',
    width: 90
  },
  {
    title: 'PASS率',
    dataIndex: 'pass_rate',
    key: 'pass_rate',
    width: 90
  },
  {
    title: 'FAIL数',
    dataIndex: 'fail_num',
    key: 'fail_num',
    width: 90
  },
  {
    title: 'FAIL率',
    dataIndex: 'fail_rate',
    key: 'fail_rate',
    width: 80
  },
  {
    title: '未分析',
    dataIndex: 'no_analyse_num',
    key: 'no_analyse_num',
    width: 80
  },
  {
    title: '今日执行总数',
    dataIndex: 'day_all_num',
    key: 'day_all_num',
    width: 120
  },
  {
    title: '今日PASS总数',
    dataIndex: 'day_pass_num',
    key: 'day_pass_num',
    width: 135
  },
  {
    title: '计划明日执行个数',
    dataIndex: 'tomorrow_num',
    key: 'tomorrow_num',
    width: 145
  },
  {
    title: '还需执行天数',
    dataIndex: 'exe_day_num',
    key: 'exe_day_num',
    width: 120
  },
  {
    title: '执行分析',
    dataIndex: 'analyse',
    key: 'analyse',
    width: 450
  }
]

export default {
  components: {
    Card,
    Chart
  },
  props: {
    project: {
      type: String,
      default: ''
    },
    currentStage: {
      type: String,
      default: '阶段一'
    },
    currentStageTypeList: {
      type: Array,
      default: () => []
    },
    implementStage: {
      type: String,
      default: ''
    },
    implementStageTypeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      cStage: this.currentStage,
      iStage: this.implementStage,
      firstSelectOptions: [
        '芯片平台',
        '用例总数',
        '已执行',
        '执行率',
        '未执行',
        'SKIP',
        'PASS数',
        'PASS率',
        'FAIL数',
        'FAIL率',
        '未分析',
        '今日执行总数',
        '今日PASS总数',
        '计划明日执行个数',
        '还需执行天数',
        '执行分析'
      ],
      firstSelectVal: [
        '芯片平台',
        '用例总数',
        '已执行',
        '执行率',
        '未执行',
        'SKIP',
        'PASS数',
        'PASS率',
        'FAIL数',
        'FAIL率',
        '未分析',
        '今日执行总数',
        '今日PASS总数',
        '计划明日执行个数',
        '还需执行天数',
        '执行分析'
      ],
      secondSelectOptions: [
        '类型',
        '用例总数',
        '已执行',
        '执行率',
        '未执行',
        'SKIP',
        'PASS数',
        'PASS率',
        'FAIL数',
        'FAIL率',
        '未分析',
        '今日执行总数',
        '今日PASS总数',
        '计划明日执行个数',
        '还需执行天数',
        '执行分析'
      ],
      secondSelectVal: [
        '类型',
        '用例总数',
        '已执行',
        '执行率',
        '未执行',
        'SKIP',
        'PASS数',
        'PASS率',
        'FAIL数',
        'FAIL率',
        '未分析',
        '今日执行总数',
        '今日PASS总数',
        '计划明日执行个数',
        '还需执行天数',
        '执行分析'
      ],
      implementNumProductList: [], // 产品统计
      productTableLoading: false, // 控制产品表格的加载
      implementNumTypeList: [], // 类型统计
      typeTableLoading: false, // 控制类型表格的加载
      bugChoke: [], // BUG阻塞的数据
      caseImplementChartLoading: false,
      caseImplementChartOptions: undefined, // 用例执行图标配置项
      chipPlatFormChartLoading: false,
      chipPlatFormChartOptions: undefined, // 芯片平台图表配置项
      butLoading: false
    }
  },
  computed: {
    implementStageComputed() {
      return this.implementStage
    },
    firstTableOptions() {
      return firstTableOptions.filter((item) => this.firstSelectVal.indexOf(item.title) >= 0)
    },
    secondTableOptions() {
      return secondTableOptions.filter((item) => this.secondSelectVal.indexOf(item.title) >= 0)
    }
  },
  watch: {
    implementStageComputed(newV, oldV) {
      this.iStage = newV
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 图表的 resize
    chartResize() {
      this.$nextTick(() => {
        this.$refs.caseChartRef.resize()
        this.$refs.chipChartRef.resize()
      })
    },
    // 点击导出SPEC统计
    handleSpecStaClick() {
      const url = '/api/export/implementCaseNumSta'
      const obj = {
        conditions: {
          project: this.project,
          stage: this.iStage,
          isSpec: 1
        }
      }
      const fileName = this.project + this.cStage + this.iStage + '阶段SPEC核验统计.xls'
      DownFiles(url, obj, fileName, this)
    },
    // 点击导出SPEC明细
    handleSpecDetClick() {
      const url = '/api/export/projectTaskCaseInfo'
      const obj = {
        conditions: {
          project: this.project,
          stage: this.iStage,
          isSpec: 1
        }
      }
      const fileName = this.project + this.cStage + this.iStage + '阶段SPEC核验明细列表.xls'
      DownFiles(url, obj, fileName, this)
    },
    // 获取数据列表
    init() {
      this.caseStaEcharts(this.project, this.iStage, this.cStage)
      // 获取类型数据统计
      this.queryImplementNumType(this.project, this.iStage, this.cStage)
      // 获取产品数据统计
      this.queryImplementNumProduct(this.project, this.iStage, this.cStage)
    },
    // radio 切换
    handleImplementStageChange() {
      this.init()
    },
    // 点击产品
    handleSystemClick(row) {
      this.$emit('system-click', row.product_name, this.iStage)
    },
    handleTypeClick(row) {
      this.$emit('type-click', row.type + row.type_new, this.iStage, this.cStage)
    },
    // 用例执行-阶段类型 数据
    async queryImplementNumType(project, stage, projectStage) {
      this.typeTableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByImplementNumType', {
        method: 'GET',
        params: {
          project,
          stage,
          projectStage,
          isSpec: 1
        }
      })

      this.implementNumTypeList = res
      this.typeTableLoading = false
    },
    // 用例执行-产品统计
    async queryImplementNumProduct(project, stage, projectStage) {
      this.productTableLoading = true
      this.chipPlatFormChartLoading = true

      const { data: res } = await request('/api/projectEvolveSta/queryByImplementNumProduct', {
        method: 'GET',
        params: {
          project,
          stage,
          projectStage,
          isSpec: 1
        }
      })

      this.implementNumProductList = res.list
      // 图表配置项
      const optionRate = {
        title: {
          text: '芯片平台FAIL情况',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          // eslint-disable-next-line func-names
          formatter(data) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < res.list.length; i++) {
              if (data.name === res.list[i].product_name) {
                let val = data.name + ':<br />'
                val +=
                  '用例FAIL ' +
                  (res.list[i].fail_all_num - res.list[i].skip_num) +
                  ' 个，FAIL率 ' +
                  Math.round(
                    ((res.list[i].fail_all_num - res.list[i].skip_num) / res.list[i].exe_num) * 100
                  ) +
                  ' %<br />'
                val +=
                  '其中 ' +
                  Math.round((res.list[i].fail_num / res.list[i].exe_num) * 100) +
                  '% (' +
                  res.list[i].fail_num +
                  ') 受BUG FAIL影响<br />'
                val +=
                  '其中 ' +
                  Math.round(
                    ((res.list[i].environment_num + res.list[i].script_num) / res.list[i].exe_num) *
                      100
                  ) +
                  '% (' +
                  (res.list[i].environment_num + res.list[i].script_num) +
                  ') 受自动化脚本/环境影响<br />'
                val +=
                  '其中 ' +
                  Math.round((res.list[i].no_analyse_num / res.list[i].exe_num) * 100) +
                  '% (' +
                  res.list[i].no_analyse_num +
                  ') 还待分析<br />'
                return val
              }
            }
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          show: false,
          data: res.xCoordinate
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: res.echartsData,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{b} : {c} ({d}%)'
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      }
      this.chipPlatFormChartOptions = optionRate

      this.$nextTick(() => {
        this.productTableLoading = false
        this.chipPlatFormChartLoading = true
      })
    },
    // 获取用例执行情况图标配置项
    async caseStaEcharts(project, stage, projectStage) {
      this.caseImplementChartLoading = true

      const { data: res } = await request('/api/projectEvolveSta/queryByImplementNumTotal', {
        method: 'GET',
        params: {
          project,
          stage,
          projectStage,
          isSpec: 1
        }
      })

      const ecahrtsColor = [
        '#59c4e6',
        '#b6a2de',
        '#93b7e3',
        '#a5e7f0',
        '#516b91',
        '#f7c5a0',
        '#fc97af',
        '#87f7cf',
        '#f7f494',
        '#72ccff'
      ]
      const option = {
        title: {
          text: '用例执行情况',
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
          data: ['未执行', 'FAIL', 'SKIP', 'PASS']
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {
                value:
                  res === undefined || res[0] === undefined ? 0 : res[0].all_num - res[0].exe_num,
                name: '未执行',
                itemStyle: { normal: { color: ecahrtsColor[0] }}
              },
              {
                value:
                  res === undefined || res[0] === undefined
                    ? 0
                    : res[0].fail_all_num - res[0].skip_num,
                name: 'FAIL',
                itemStyle: { normal: { color: ecahrtsColor[1] }}
              },
              {
                value: res === undefined || res[0] === undefined ? 0 : res[0].skip_num,
                name: 'SKIP',
                itemStyle: { normal: { color: ecahrtsColor[2] }}
              },
              {
                value: res === undefined || res[0] === undefined ? 0 : res[0].pass_num,
                name: 'PASS',
                itemStyle: { normal: { color: ecahrtsColor[3] }}
              }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{b} : {c} ({d}%)'
                },
                labelLine: { show: true }
              }
            }
          }
        ],
        noDataLoadingOption: {
          text: '暂无数据',
          effect: 'bubble',
          effectOption: {
            effect: {
              n: 0
            }
          }
        }
      }
      this.caseImplementChartOptions = option

      this.$nextTick(() => {
        this.caseImplementChartLoading = false
      })
    },
    // 进展-执行-用例-BUG阻塞
    async queryByBugChoke(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByBugChoke', {
        method: 'GET',
        params: {
          project
        }
      })
      this.bugChoke = res
    }
  }
}
</script>

<style lang="scss" scoped>
.charts {
  margin-top: 20px;
}

.card {
  margin-bottom: 20px;
}

.title {
  color: #1890ff;
  cursor: pointer;
}
</style>
