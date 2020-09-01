<template>
  <card title="文档评审" class="review card">
    <template #buttons>
      <el-button
        :loading="butLoading"
        type="primary"
        icon="el-icon-download"
        size="small"
        @click="handleExportExcelClick"
      >导出评审明细</el-button>
    </template>

    <template #content>
      <!-- 评审数据可视化区域 -->
      <div class="review-charts">
        <!-- radio选项 -->
        <el-radio-group
          v-model="reviewStage"
          size="small"
          class="review-charts-radio"
          @change="handleReviewStageChange"
        >
          <el-radio-button label="主干" />
          <el-radio-button label="组件项目" :disabled="project === '12.4PL1'">组件</el-radio-button>
          <el-radio-button label="主干组件" :disabled="project === '12.4PL1'">主干+组件</el-radio-button>
        </el-radio-group>

        <!-- 数据可视化 -->
        <el-row :gutter="32" class="charts">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 12}"
            style="padding-right:8px;margin-bottom:30px;"
          >
            <chart ref="totalChartRef" v-loading="reviewTotalChartLoading" :option-rate="reviewTotalChartOptions" />
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
              ref="documentChartRef"
              v-loading="reviewDocumentChartLoading"
              :option-rate="reviewDocumentChartOptions"
            />
          </el-col>
        </el-row>
      </div>

      <!-- 评审数据表格区域 -->
      <div class="review-table">
        <!-- radio选项切换 -->
        <el-radio-group v-model="reviewTableStage" size="small" class="review-charts-radio">
          <el-radio-button :label="false">工作包</el-radio-button>
          <el-radio-button :label="true">PTGTTM</el-radio-button>
        </el-radio-group>

        <div class="review-table-content">
          <div class="filter-container">
            <!-- select -->
            <el-select v-model="reviewSelectVal" multiple collapse-tags placeholder="请选择">
              <el-option
                v-for="(item, index) in reviewSelectOptions"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>

          <!-- 表格 -->
          <el-table
            v-loading="loading"
            :data="list"
            :header-cell-style="{'background-color': '#FAFAFA' }"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column
              v-for="item in constantTableOptions"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              show-overflow-tooltip
              :align="item.align"
            />

            <el-table-column
              v-for="item in asyncTableOptions"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              show-overflow-tooltip
              align="center"
            >
              <div v-if="item.children">
                <el-table-column
                  v-for="child in item.children"
                  :key="child.prop"
                  :prop="child.prop"
                  :label="child.label"
                  :min-width="child.minWidth"
                  show-overflow-tooltip
                  align="center"
                />
              </div>
            </el-table-column>
          </el-table>

          <!-- 分页器 -->
          <div class="pagination">
            <pagination
              v-if="total >= limit"
              :total="total"
              :page="currentPage"
              :limit="limit"
              :auto-scroll="false"
              @pagination="handlePageUpdate"
            />
          </div>
        </div>
      </div>
    </template>
  </card>
</template>

<script>
import Card from '@/components/Card/index'
import Chart from '@/components/MyChart/Chart'
import Pagination from '@/components/Pagination/index'

import request from '@/services/request'
import DownFiles from '@/vendor/ExportExcel'

export default {
  components: {
    Card,
    Chart,
    Pagination
  },
  props: {
    project: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      key: 1,
      reviewStage: '主干',
      reviewTableStage: false,
      reviewSelectVal: [
        '代码量',
        '缺陷个数',
        '缺陷率',
        '需求缺陷',
        '设计缺陷',
        '软件意见个数',
        '质量意见个数'
      ],
      reviewSelectOptions: [
        '代码量',
        '缺陷个数',
        '缺陷率',
        '需求缺陷',
        '设计缺陷',
        '软件意见个数',
        '质量意见个数',
        '可测试意见个数',
        '设计与需求不一致个数',
        '需求与原始需求不一致个数'
      ],
      evolveReviewWorkPackageLoading: false,
      evolveReviewWorkPackageData: [],
      evolveReviewPersonLoading: false,
      evolveReviewPersonData: [],
      reviewTotalChartLoading: false,
      reviewTotalChartOptions: undefined, // 评审总数图表配置
      reviewDocumentChartLoading: false,
      reviewDocumentChartOptions: undefined, // 评审文档统计图表配置
      currentPage: 1,
      limit: 10,
      butLoading: false
    }
  },
  computed: {
    constantTableOptions() {
      const options = [
        {
          prop: 'project',
          label: '项目名称',
          minWidth: 89
        },
        {
          prop: 'work_package',
          label: '工作包',
          minWidth: 186,
          hide: this.reviewTableStage
        },
        {
          prop: 'ptgttm',
          label: 'PTGTTM',
          minWidth: 100
        }
      ]
      return options.filter((item) => !item.hide)
    },
    asyncTableOptions() {
      const options = [
        {
          prop: 'code',
          label: '代码量',
          minWidth: 80
        },
        {
          prop: 'total_num',
          label: '缺陷个数',
          minWidth: 90
        },
        {
          prop: 'total_rate',
          label: '缺陷率',
          minWidth: 89
        },
        {
          prop: 'demend_num',
          label: '需求缺陷',
          minWidth: 90
        },
        {
          prop: 'design_num',
          label: '设计缺陷',
          minWidth: 90
        },
        {
          prop: 'software_num',
          label: '软件意见个数',
          minWidth: 115
        },
        {
          prop: 'quality_num',
          label: '质量意见个数',
          align: 'center',
          children: [
            {
              prop: 'quality_demand_num',
              label: '需求',
              minWidth: 75
            },
            {
              prop: 'quality_design_num',
              label: '设计',
              minWidth: 75
            },
            {
              prop: 'quality_num',
              label: '合计',
              minWidth: 75
            }
          ]
        },
        {
          prop: 'test_num',
          label: '可测试意见个数',
          minWidth: 131
        },
        {
          prop: 'design_no_num',
          label: '设计与需求不一致个数',
          minWidth: 173
        },
        {
          prop: 'demend_no_num',
          label: '需求与原始需求不一致个数',
          minWidth: 201
        }
      ]
      return options.filter((item) => this.reviewSelectVal.indexOf(item.label) >= 0)
    },
    list() {
      const currentPage = this.currentPage
      const limit = this.limit
      return !this.reviewTableStage
        ? this.evolveReviewWorkPackageData.slice((currentPage - 1) * limit, currentPage * limit)
        : this.evolveReviewPersonData.slice((currentPage - 1) * limit, currentPage * limit)
    },
    total() {
      return !this.reviewTableStage
        ? this.evolveReviewWorkPackageData.length
        : this.evolveReviewPersonData.length
    },
    loading() {
      return !this.reviewTableStage
        ? this.evolveReviewWorkPackageLoading
        : this.evolveReviewPersonLoading
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化组件
    init() {
      this.evolveReviewWorkPackage(this.project, this.reviewStage)
      this.evolveReviewPerson(this.project, this.reviewStage)
      this.reviewStaEcharts(this.project, this.reviewStage)
      this.reviewFileStaEcharts(this.project, this.reviewStage)
    },
    // chart resize()
    chartResize() {
      this.$nextTick(() => {
        this.$refs.totalChartRef.resize()
        this.$refs.documentChartRef.resize()
      })
    },
    // 导出 execl 文件
    handleExportExcelClick() {
      const url = '/api/export/projectReviewInfo'
      const reviewTypeData = this.reviewStage.replace('+', '')
      const obj = { conditions: { project: this.project, reviewTypeData }}
      console.log(obj)
      const fileName = this.project + '-评审明细.xls'
      DownFiles(url, obj, fileName, this)
    },
    // 分页器变化
    handlePageUpdate(e) {
      this.currentPage = e.page
      this.limit = e.limit
    },
    // 主干 / 组件 切换
    handleReviewStageChange(e) {
      this.init()
      this.reviewStage = e
    },
    // 进展-评审-工作包维度统计
    async evolveReviewWorkPackage(project, type) {
      this.evolveReviewWorkPackageLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByProjectReviewWorkPackage', {
        method: 'GET',
        params: { project, type }
      })
      this.evolveReviewWorkPackageData = res

      this.$nextTick(() => {
        this.evolveReviewWorkPackageLoading = false
      })
    },
    // 进展-评审-PTGTTM维度统计
    async evolveReviewPerson(project, type) {
      this.evolveReviewPersonLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByProjectReviewPerson', {
        method: 'GET',
        params: { project, type }
      })
      this.evolveReviewPersonData = res

      this.$nextTick(() => {
        this.evolveReviewPersonLoading = false
      })
    },
    async reviewStaEcharts(project, type) {
      this.reviewTotalChartLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByProjectReviewTotal', {
        method: 'GET',
        params: { project, type }
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
          text:
            '评审总数' +
            (res === undefined ? 0 : Math.round(res.total_num)) +
            ',缺陷' +
            (res === undefined ? 0 : Math.round(res.total_rate * 100) / 100),
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          // eslint-disable-next-line func-names
          formatter(params) {
            return (
              params.name +
              ':' +
              params.value +
              ' (' +
              Math.round((params.value * 100) / (res === undefined ? 0 : res.code)) / 100 +
              ')'
            )
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          show: false,
          data: ['需求', '设计']
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {
                value: res === undefined ? 0 : res.demend_num,
                name: '需求',
                itemStyle: { normal: { color: ecahrtsColor[0] }}
              },
              {
                value: res === undefined ? 0 : res.design_num,
                name: '设计',
                itemStyle: { normal: { color: ecahrtsColor[1] }}
              }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  // eslint-disable-next-line func-names
                  formatter(params) {
                    return (
                      params.name +
                      ':' +
                      params.value +
                      ' (' +
                      Math.round((params.value * 100) / (res === undefined ? 0 : res.code)) / 100 +
                      ')'
                    )
                  }
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
      this.reviewTotalChartOptions = option

      this.$nextTick(() => {
        this.reviewTotalChartLoading = false
      })
    },
    async reviewFileStaEcharts(project, type) {
      this.reviewDocumentChartLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByProjectReviewFileSta', {
        method: 'GET',
        params: { project, type }
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
          text: '评审文档统计',
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
          data: ['未入库未评审', '未入库有评审', '已入库未评审', '已入库有评审']
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {
                value: Math.round(res.not_store_not_review),
                name: '未入库未评审',
                itemStyle: { normal: { color: ecahrtsColor[0] }}
              },
              {
                value: Math.round(res.not_store_review),
                name: '未入库有评审',
                itemStyle: { normal: { color: ecahrtsColor[1] }}
              },
              {
                value: Math.round(res.store_not_review),
                name: '已入库未评审',
                itemStyle: { normal: { color: ecahrtsColor[2] }}
              },
              {
                value: Math.round(res.store_review),
                name: '已入库有评审',
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
        ]
      }
      this.reviewDocumentChartOptions = option

      this.$nextTick(() => {
        this.reviewDocumentChartLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 20px;
}

.charts {
  margin-top: 20px;
}

// review 评审
.review-charts-radio {
  margin-bottom: 20px;
}
</style>
