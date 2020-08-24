<template>
  <card title="执行" class="implement card">
    <!-- 卡片主体 -->
    <template #content>
      <!-- 用例卡片 -->
      <card title="用例" class="case card">
        <template #buttons>
          <el-button type="primary" size="small">Bug阻塞</el-button>
          <el-button type="primary" size="small">导出用例统计</el-button>
          <el-button type="primary" size="small">导出用例执行明细</el-button>
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
                  <chart :chart-data="chartData" title="用例执行情况" />
                </el-col>
                <el-col
                  :xs="{span: 24}"
                  :sm="{span: 24}"
                  :md="{span: 12}"
                  :lg="{span: 12}"
                  :xl="{span: 12}"
                  style="padding-right:8px;margin-bottom:30px;"
                >
                  <chart :chart-data="chartData" title="芯片平台FAIL情况" />
                </el-col>
              </el-row>
            </div>

            <!-- 表格一区域 -->
            <card class="case-first card">
              <template #buttons>
                <el-button type="primary" size="small">添加用例执行分析</el-button>
              </template>

              <template #content>
                <!-- select -->
                <div class="filter-container">
                  <el-select v-model="caseCheckboxVal" multiple collapse-tags placeholder="请选择">
                    <el-option
                      v-for="(item, index) in caseSelectOptions"
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
                      v-for="(item, index) in caseTableTitleList"
                      :key="index"
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
              <template #buttons>
                <el-button type="primary" size="small">添加用例执行分析</el-button>
              </template>

              <template #content>
                <div class="filter-container">
                  <el-select v-model="caseCheckboxVal2" multiple collapse-tags placeholder="请选择">
                    <el-option
                      v-for="(item, index) in caseSelectOptions"
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
                      prop="name"
                      label="芯片平台 "
                      min-width="120px"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      v-for="(item, index) in caseTableTitleList2"
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
    </template>
  </card>
</template>

<script>
import Card from '@/components/Card/index'
import Chart from '@/components/MyChart/Chart'

import { caseCardSelectList, caseCardSelectDefaultList, caseCardTableTitleList } from './options'
import request from '@/services/request'

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
      chartData: {
        data: [
          { value: 10, name: 'rose1' },
          { value: 50, name: 'rose2' },
          { value: 15, name: 'rose3' },
          { value: 25, name: 'rose4' },
          { value: 20, name: 'rose5' },
          { value: 35, name: 'rose6' },
          { value: 30, name: 'rose7' },
          { value: 40, name: 'rose8' }
        ]
      },
      caseSelectOptions: caseCardSelectList, // select 的选项列表
      caseCheckboxVal: caseCardSelectDefaultList, // select 的选中项列表
      caseTableTitleList: caseCardTableTitleList.filter(
        (i) => caseCardSelectDefaultList.indexOf(i.label) >= 0
      ), // 用例卡片表格1的配置项
      caseCheckboxVal2: caseCardSelectDefaultList, // select 的选中项列表
      caseTableTitleList2: caseCardTableTitleList.filter(
        (i) => caseCardSelectDefaultList.indexOf(i.label) >= 0
      ),
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
      typeTableLoading: false // 控制类型表格的加载
    }
  },
  computed: {
    productTableOptions() {
      return [
        {
          prop: 'name',
          label: '芯片平台',
          minWidth: 115,
          fixed: 'left',
          sot: true
        },
        {
          prop: 'case_total',
          label: '用例总数',
          minWidth: 89
        },
        {
          prop: 'executed',
          label: '已执行',
          minWidth: 75
        },
        {
          prop: 'execute_rate',
          label: '执行率',
          minWidth: 78
        },
        {
          prop: 'no_execute',
          label: '未执行',
          minWidth: 75
        },
        {
          prop: 'skip',
          label: 'SKIP',
          minWidth: 70
        },
        {
          prop: 'pass_count',
          label: 'PASS数',
          minWidth: 89
        },
        {
          prop: 'pass_rate',
          label: 'PASS率',
          minWidth: 89
        },
        {
          prop: 'fail_count',
          label: 'FAIL数',
          minWidth: 80
        },
        {
          prop: 'fail_rate',
          label: 'FAIL率',
          minWidth: 78
        },
        {
          prop: 'no_analyze',
          label: '未分析',
          minWidth: 75
        },
        {
          prop: 'td_execute_total',
          label: '今日执行总数',
          minWidth: 117
        },
        {
          prop: 'td_pass_total',
          label: '今日PASS总数',
          minWidth: 132
        },
        {
          prop: 'plan_tm_execute_count',
          label: '计划明日执行个数',
          minWidth: 145
        },
        {
          prop: 'need_execute_day',
          label: '还需执行天数',
          minWidth: 117
        },
        {
          prop: 'carry_analyze',
          label: '执行分析',
          minWidth: 200
        }
      ]
    },
    implementStageComputed() {
      return this.implementStage
    }
  },
  watch: {
    // 用例卡片 select1 的选中项改变
    caseCheckboxVal(valArr) {
      this.caseTableTitleList = caseCardTableTitleList.filter((i) => valArr.indexOf(i.label) >= 0)
      this.key = this.key + 1
    },
    caseCheckboxVal2(valArr) {
      this.caseTableTitleList2 = caseCardTableTitleList.filter((i) => valArr.indexOf(i.label) >= 0)
      this.key = this.key + 1
    },
    implementStageComputed(newV, oldV) {
      this.iStage = newV
    }
  },
  mounted() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      // 获取类型数据统计
      this.queryImplementNumType(this.project, this.iStage, this.cStage)
      // 获取产品数据统计
      this.queryImplementNumProduct(this.project, this.iStage, this.cStage)
    },
    // radio 切换
    handleImplementStageChange() {
      this.getDataList()
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
          isSpec: 0
        }
      })

      this.implementNumTypeList = res
      this.typeTableLoading = false
    },
    // 用例执行-产品统计
    async queryImplementNumProduct(project, stage, projectStage) {
      this.productTableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByImplementNumProduct', {
        method: 'GET',
        params: {
          project,
          stage,
          projectStage,
          isSpec: 0
        }
      })

      this.implementNumProductList = res.list
      this.productTableLoading = false
      console.log(res)
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
