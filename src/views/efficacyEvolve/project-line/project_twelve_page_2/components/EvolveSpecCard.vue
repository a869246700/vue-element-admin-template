<template>
  <div class="implement-card">
    <card title="SPEC核验" class="case card">
      <template #buttons>
        <el-button
          :loading="butLoading"
          type="primary"
          size="small"
          @click="handleSpecStaClick"
        >导出SPEC统计</el-button>
        <el-button
          :loading="butLoading"
          type="primary"
          size="small"
          @click="handleSpecDetClick"
        >导出SPEC明细</el-button>
      </template>
      <!-- 用例卡片 -->
      <template #content>
        <div class="content">
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
                <el-select v-model="FirstSelectVal" multiple collapse-tags placeholder="请选择">
                  <el-option
                    v-for="(item, index) in selectOptions"
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
                  fit
                  highlight-current-row
                >
                  <el-table-column
                    prop="product_name"
                    label="芯片平台 "
                    width="115px"
                    show-overflow-tooltip
                  >
                    <template slot-scope="{ row }">
                      <span class="title" @click="handleSystemClick(row)">{{ row.product_name }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-for="item in firstTableOptions"
                    :key="item.prop"
                    :label="item.label"
                    :prop="item.prop"
                    :min-width="item.minWidth ? item.minWidth : 100"
                    show-overflow-tooltip
                  >
                    <template slot-scope="{ row }">
                      <span
                        v-if="row.product_name === '合计' && item.prop === 'exe_day_num'"
                      >{{ Math.ceil(row.tomorrow_num === 0 ? 0 : (row.no_num / row.tomorrow_num)) }}</span>
                      <span v-else>{{ row[item.prop] }}</span>
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
                    v-for="(item, index) in selectOptions"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </div>

              <!-- 表格 -->
              <div class="table">
                <el-table
                  :data="implementNumTypeList"
                  border
                  style="width: 100%"
                  :header-cell-style="{'background-color': '#FAFAFA' }"
                  highlight-current-row
                >
                  <el-table-column
                    prop="type"
                    label="芯片平台 "
                    min-width="120px"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    v-for="(item, index) in secondTableOptions"
                    :key="index"
                    :label="item.label"
                    :prop="item.prop"
                    align="center"
                    :min-width="item.minWidth ? item.minWidth + 'px' : '100px'"
                    show-overflow-tooltip
                  >
                    <template slot-scope="{row}">
                      <span>{{ row[item.prop] }}</span>
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
      key: 1,
      cStage: this.currentStage,
      iStage: this.implementStage,
      selectOptions: [
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
        '今日PASS总数'
      ],
      FirstSelectVal: [
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
        '今日PASS总数'
      ],
      secondSelectVal: [
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
        '今日PASS总数'
      ],
      implementNumProductList: [
        {
          name: '合计',
          case_total: 323
        },
        {
          name: '通用',
          case_total: 323
        },
        {
          name: 'N18K-X-CB',
          case_total: 323
        },
        {
          name: 's57h',
          case_total: 323
        },
        {
          name: 'S57X',
          case_total: 323
        },
        {
          name: 'S6120',
          case_total: 323
        },
        {
          name: 'S6910-3C',
          case_total: 323
        },
        {
          name: 'S7810C',
          case_total: 323
        },
        {
          name: 'S7810C',
          case_total: 323
        }
      ], // 产品统计
      productTableLoading: false, // 控制产品表格的加载
      implementNumTypeList: [
        {
          name: '合计',
          case_total: 323
        },
        {
          name: '新增手工',
          case_total: 323
        },
        {
          name: '新增自动化',
          case_total: 323
        },
        {
          name: '存量手工',
          case_total: 323
        },
        {
          name: '存量自动化',
          case_total: 323
        }
      ], // 类型统计
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
    productTableOptions() {
      return [
        {
          prop: 'all_num',
          label: '用例总数',
          minWidth: 89
        },
        {
          prop: 'exe_num',
          label: '已执行',
          minWidth: 75
        },
        {
          prop: 'exe_rate',
          label: '执行率',
          minWidth: 78
        },
        {
          prop: 'no_num',
          label: '未执行',
          minWidth: 75
        },
        {
          prop: 'skip_num',
          label: 'SKIP',
          minWidth: 70
        },
        {
          prop: 'pass_num',
          label: 'PASS数',
          minWidth: 89
        },
        {
          prop: 'pass_rate',
          label: 'PASS率',
          minWidth: 89
        },
        {
          prop: 'fail_num',
          label: 'FAIL数',
          minWidth: 80
        },
        {
          prop: 'fail_rate',
          label: 'FAIL率',
          minWidth: 78
        },
        {
          prop: 'no_analyse_num',
          label: '未分析',
          minWidth: 75
        },
        {
          prop: 'day_all_num',
          label: '今日执行总数',
          minWidth: 117
        },
        {
          prop: 'day_pass_num',
          label: '今日PASS总数',
          minWidth: 132
        },
        {
          prop: 'tomorrow_num',
          label: '计划明日执行个数',
          minWidth: 145
        },
        {
          prop: 'exe_day_num',
          label: '还需执行天数',
          minWidth: 117
        },
        {
          prop: 'analyse',
          label: '执行分析',
          minWidth: 200
        }
      ]
    },
    firstTableOptions() {
      return this.productTableOptions.filter((item) => this.FirstSelectVal.indexOf(item.label) >= 0)
    },
    secondTableOptions() {
      return this.productTableOptions.filter(
        (item) => this.secondSelectVal.indexOf(item.label) >= 0
      )
    },
    implementStageComputed() {
      return this.implementStage
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
      this.$emit('system-click', row.product_name)
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
