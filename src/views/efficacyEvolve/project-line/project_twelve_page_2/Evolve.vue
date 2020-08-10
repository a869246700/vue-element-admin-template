<template>
  <div class="evolve">
    <!-- 执行卡片 -->
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
                    <chart :chart-data="gooChartData" title="用例执行情况" />
                  </el-col>
                  <el-col
                    :xs="{span: 24}"
                    :sm="{span: 24}"
                    :md="{span: 12}"
                    :lg="{span: 12}"
                    :xl="{span: 12}"
                    style="padding-right:8px;margin-bottom:30px;"
                  >
                    <chart :chart-data="gooChartData" title="芯片平台FAIL情况" />
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
                      <el-table-column prop="name" label="芯片平台 " width="115px">
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
                      <el-table-column prop="name" label="芯片平台 " min-width="120px" />
                      <el-table-column
                        v-for="(item, index) in caseTableTitleList2"
                        :key="index"
                        :label="item.label"
                        prop="case_total"
                        align="center"
                        :min-width="item.minWidth ? item.minWidth + 'px' : '100px'"
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

    <!-- 设计卡片 -->
    <card title="设计" class="desgin card">
      <template #buttons>
        <el-button type="primary" size="small">导出TP明细</el-button>
      </template>

      <template #content>
        <div class="notice-board">
          <el-row :gutter="24">
            <el-col
              v-for="(item, index) in desginNoticeList"
              :key="index"
              :span="24 / desginNoticeList.length"
            >
              <el-alert :title="item.content" :type="item.status" :closable="false" />
            </el-col>
          </el-row>
        </div>

        <div class="desgin-table">
          <div class="filter-container">
            <!-- select -->
            <el-select v-model="desginSelectVal" multiple collapse-tags placeholder="请选择">
              <el-option
                v-for="(item, index) in desginSelectOptions"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>

          <!-- 表格 -->
          <el-table
            :data="desginTableData"
            border
            style="width: 100%"
            fit
            :header-cell-style="{'background-color': '#FAFAFA' }"
            highlight-current-row
          >
            <el-table-column prop="area" label="域" min-width="103" />
            <el-table-column
              v-for="(item, index) in desginTableTitleList"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width"
              align="center"
            />
          </el-table>
          <!-- 分段器 -->
          <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="20" />
          </div>
        </div>
      </template>
    </card>

    <!-- 评审卡片 -->
    <card title="评审" class="review card">
      <template #buttons>
        <el-button type="primary" size="small">导出评审明细</el-button>
      </template>

      <template #content>
        <!-- 评审数据可视化区域 -->
        <div class="review-charts">
          <!-- radio选项 -->
          <el-radio-group v-model="reviewStage" size="small" class="review-charts-radio">
            <el-radio-button
              v-for="(item, index) in reviewStageTypeList"
              :key="index"
              :label="item.stage"
            />
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
              <chart :chart-data="gooChartData" title="用例执行情况" />
            </el-col>
            <el-col
              :xs="{span: 24}"
              :sm="{span: 24}"
              :md="{span: 12}"
              :lg="{span: 12}"
              :xl="{span: 12}"
              style="padding-right:8px;margin-bottom:30px;"
            >
              <chart :chart-data="gooChartData" title="芯片平台FAIL情况" />
            </el-col>
          </el-row>
        </div>

        <!-- 评审数据表格区域 -->
        <div class="review-table">
          <!-- radio选项切换 -->
          <el-radio-group v-model="reviewTableStage" size="small" class="review-charts-radio">
            <el-radio-button
              v-for="(item, index) in reviewTableStageTypeList"
              :key="index"
              :label="item.stage"
            />
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
              :data="caseTableData"
              border
              style="width: 100%"
              fit
              :header-cell-style="{'background-color': '#FAFAFA' }"
              highlight-current-row
            >
              <el-table-column prop="name" label="项目名" fixed min-width="89" />
              <el-table-column prop="work_package" label="工作包" fixed min-width="186" />
              <el-table-column
                v-for="(item, index) in reviewTableTitleList"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :min-width="item.minWidth"
                align="center"
              />
              <el-table-column prop="software_opinion_count" label="软件意见数量" min-width="130" align="center" />
              <el-table-column
                prop="quality_opinion_count"
                label="质量意见个数"
                min-width="210"
                align="center"
              >
                <el-table-column prop="need" label="需求" :min-width="70" align="center" />
                <el-table-column prop="desgin" label="需求" :min-width="70" align="center" />
                <el-table-column prop="total" label="需求" :min-width="70" align="center" />
              </el-table-column>
            </el-table>

            <!-- 分页器 -->
            <div class="pagination">
              <el-pagination background layout="prev, pager, next" :total="80" />
            </div>
          </div>
        </div>
      </template>
    </card>
  </div>
</template>

<script>
import Card from '@/components/Card/index'
import Chart from '@/components/MyChart/Chart'

import request from '@/services/request'

// 导入 select 和 table 的配置项
import {
  caseCardSelectList,
  caseCardSelectDefaultList,
  caseCardTableTitleList,
  desginCardSelectList,
  desginCardSelectDefaultList,
  desginCardTableTitleList,
  reviewCardSelectList,
  reviewCardSelectDefaultList,
  reviewCardTableTitleList
} from './options'
export default {
  components: {
    Card,
    Chart
  },
  data() {
    return {
      implementStage: '准入',
      implementStageTypeList: [{ stage: '准入' }],
      reviewStage: '主干',
      reviewStageTypeList: [{ stage: '主干' }, { stage: '组件' }, { stage: '主干+组件' }],
      reviewTableStage: '工作包',
      reviewTableStageTypeList: [{ stage: '工作包' }, { stage: 'PTGTTM' }],
      gooChartData: {
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
      reviewTableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ],
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
      ],
      key: 1,
      desginNoticeList: [
        {
          content: '总计TP 44 个',
          status: 'info'
        },
        {
          content: '已完成TP 31 个',
          status: 'success'
        },
        {
          content: '计划用例 1379 个',
          status: 'warning'
        },
        {
          content: '实际用例 835 个',
          status: 'error'
        }
      ],
      desginSelectVal: desginCardSelectDefaultList, // select 选中项列表
      desginSelectOptions: desginCardSelectList, // select 的选项配置
      desginTableTitleList: desginCardTableTitleList.filter(
        (i) => desginCardSelectDefaultList.indexOf(i.label) >= 0
      ),
      desginTableData: [
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        }
      ],
      desginTableCurrentPage: 1, // 当前页码
      reviewSelectVal: reviewCardSelectDefaultList,
      reviewSelectOptions: reviewCardSelectList,
      reviewTableTitleList: reviewCardTableTitleList.filter(
        (i) => reviewCardSelectDefaultList.indexOf(i.label) >= 0
      )
    }
  },
  computed: {
    desginTableList() {
      return this.desginTableData.slice(
        (this.desginTableCurrentPage - 1) * 10,
        this.desginTableCurrentPage * 10
      )
    }
  },
  watch: {
    // 用例卡片 select1 的选中项改变
    caseCheckboxVal(valArr) {
      this.caseTableTitleList = caseCardTableTitleList.filter((i) => valArr.indexOf(i.label) >= 0)
      this.key = this.key + 1
    },
    // 用例卡片 select2 的选中项改变
    caseCheckboxVal2(valArr) {
      this.caseTableTitleList2 = caseCardTableTitleList.filter((i) => valArr.indexOf(i.label) >= 0)
      this.key = this.key + 1
    },
    // 设计卡片 select 的选中项改变
    desginSelectVal(valArr) {
      this.desginTableTitleList = desginCardTableTitleList.filter(
        (i) => valArr.indexOf(i.label) >= 0
      )
      this.key = this.key + 1
    },
    reviewSelectVal(valArr) {
      this.reviewTableTitleList = reviewCardTableTitleList.filter(
        (i) => valArr.indexOf(i.label) >= 0
      )
      this.key = this.key + 1
    }
  },
  created() {
    this.queryImplementStageType()
  },
  methods: {
    // 修改表单第一列颜色
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'color: #1890ff'
      } else {
        return ''
      }
    },
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
    async queryExeSpecSta(project) {},

    // 进展-SPEC产品统计列表
    async queryExeSpecProductSta(project) {},

    // 进展-性能SPEC产品统计列表
    async queryNatureSpecTotal(project) {},

    // 进展-执行-控制面执行数据
    queryByCaseImplement() {},

    // 进展-执行-数据面执行数据
    queryByDataCaseImplement() {},

    // 进展-执行-数据面SPEC明细数据
    specProductStaInfoList() {},

    // 进展-执行-数据面SPEC明细数据清空
    specProductStaInfoListIsNull() {},

    // 进展-执行-数据面性能SPEC明细数据
    specNatureProductStaInfoList() {},

    // 进展-执行-数据面SPEC明细数据清空
    specNatureProductStaInfoListIsNull() {},

    // 进展-设计-TP用例总计
    evolveTpCaseTotal() {},

    // 进展-设计-专业分组TP用例统计
    evolveTpCaseProfessionalDivide() {},

    // 进展-评审-评审总计
    evolveReviewTotal() {},

    // 进展-评审-工作包维度统计
    evolveReviewWorkPackage() {},

    // 进展-评审-PTGTTM维度统计
    evolveReviewPerson() {},

    // 进展-执行-用例-BUG阻塞
    queryByBugChoke() {}
  }
}
</script>

<style lang="scss" scoped>
.evolve {
  .charts {
    margin-top: 20px;
  }

  .card {
    margin-bottom: 10px;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    padding: 20px;
  }

  // desgin 设计
  .desgin-table {
    margin-top: 20px;
  }

  // review 评审
  .review-charts-radio {
    margin-bottom: 20px;
  }
}
</style>
