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
            <el-radio-group v-model="implementStage" size="small">
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

                <!-- 表格 -->
                <div class="table">
                  <el-table
                    :data="caseTableData"
                    border
                    style="width: 100%"
                    :header-cell-style="{'background-color': '#FAFAFA' }"
                    fit
                    highlight-current-row
                  >
                    <el-table-column prop="name" label="芯片平台 " width="115px" show-overflow-tooltip>
                      <template slot-scope="{ row }">
                        <span style="color: #1890ff;">{{ row.name }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-for="(item, index) in caseTableTitleList"
                      :key="index"
                      :label="item.label"
                      prop="case_total"
                      align="center"
                      :min-width="item.minWidth ? item.minWidth : 100"
                      show-overflow-tooltip
                    />
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
                    :data="caseTableData2"
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
                      prop="case_total"
                      align="center"
                      :min-width="item.minWidth ? item.minWidth + 'px' : '100px'"
                      show-overflow-tooltip
                    />
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
  data() {
    return {
      key: 1,
      implementStage: '准入',
      implementStageTypeList: [{ stage: '准入' }],
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
      ), // 用例卡片表格2的配置项
      caseTableData: [
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
      ],
      caseTableData2: [
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
      ]
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
    }
  },
  created() {
    this.queryImplementStageType()
  },
  methods: {
    // 用例执行-阶段类型
    async queryImplementStageType() {
      const { data: res } = await request(`/api/projectEvolveSta/queryByImplementStageType`, {
        method: 'GET'
      })
      this.implementStageTypeList = res
    },

    // 用例执行-阶段类型
    async queryImplementNumType(project, stage) {
      const { data: res } = await request(
        `/api/projectEvolveSta/queryByImplementNumType?project=` + project + '&stage=' + stage,
        { method: 'GET' }
      )
      console.log(res)
    },

    // 用例执行-产品统计
    async queryImplementNumProduct(project, stage) {
      const {
        data: res
      } = await request(
        `/api/projectEvolveSta/queryByImplementNumProduct?project=` + project + '&stage=' + stage,
        { method: 'GET' }
      )
      console.log(res)
    },

    // 用例执行-域统计
    async queryImplementNumSystem(project, stage, product) {},

    // 执行-SPEC统计
    async queryExeSpecSta(project) {}
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
</style>
