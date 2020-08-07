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

              <card class="case-first card">
                <template #buttons>
                  <el-button type="primary" size="small">添加用例执行分析</el-button>
                </template>

                <template #content>
                  <!-- 表格 -->
                  <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    :header-cell-style="{'background-color': '#FAFAFA', 'text-align': 'center' }"
                    :cell-style="cellStyle"
                  >
                    <el-table-column prop="date" label="芯片平台" width="103" fixed />
                    <el-table-column prop="name" label="用例总数" width="89" />
                    <el-table-column prop="address" label="已执行" width="75" />
                    <el-table-column prop="address" label="执行率" width="78" />
                    <el-table-column prop="address" label="未执行" min-width="75" />
                    <el-table-column prop="address" label="SKIP" min-width="62" />
                    <el-table-column prop="address" label="PASS数" min-width="80" />
                    <el-table-column prop="address" label="PASS率" min-width="80" />
                    <el-table-column prop="address" label="FAIL数" min-width="75" />
                    <el-table-column prop="address" label="FAIL率" min-width="78" />
                    <el-table-column prop="address" label="未分析" min-width="75" />
                    <el-table-column prop="address" label="今日执行总数" min-width="117" />
                    <el-table-column prop="address" label="今日PASS总数" min-width="122" />
                    <el-table-column prop="address" label="计划明日执行个数" min-width="145" />
                    <el-table-column prop="address" label="还需执行天数" min-width="117" />
                    <el-table-column prop="address" label="执行分析" min-width="540" />>
                  </el-table>
                </template>
              </card>

              <card class="case-second card">
                <template #buttons>
                  <el-button type="primary" size="small">添加用例执行分析</el-button>
                </template>

                <template #content>
                  <!-- 表格 -->
                  <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    :header-cell-style="{'background-color': '#FAFAFA', 'text-align': 'center' }"
                    :cell-style="cellStyle"
                  >
                    <el-table-column prop="date" label="芯片平台" width="103" />
                    <el-table-column prop="name" label="用例总数" width="89" />
                    <el-table-column prop="address" label="已执行" width="75" />
                    <el-table-column prop="address" label="执行率" width="78" />
                    <el-table-column prop="address" label="未执行" min-width="75" />
                    <el-table-column prop="address" label="SKIP" min-width="62" />
                    <el-table-column prop="address" label="PASS数" min-width="80" />
                    <el-table-column prop="address" label="PASS率" min-width="80" />
                    <el-table-column prop="address" label="FAIL数" min-width="75" />
                    <el-table-column prop="address" label="FAIL率" min-width="78" />
                    <el-table-column prop="address" label="未分析" min-width="75" />
                    <el-table-column prop="address" label="今日执行总数" min-width="117" />
                    <el-table-column prop="address" label="今日PASS总数" min-width="122" />
                    <el-table-column prop="address" label="计划明日执行个数" min-width="145" />
                    <el-table-column prop="address" label="还需执行天数" min-width="117" />
                    <el-table-column prop="address" label="执行分析" min-width="540" />>
                  </el-table>
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
              <el-alert :title="item" type="error" :closable="false" />
            </el-col>
          </el-row>
        </div>

        <div class="desgin-table">
          <el-table
            :data="desginTableList"
            border
            style="width: 100%"
            :header-cell-style="{'background-color': '#FAFAFA', 'text-align': 'center' }"
          >
            <el-table-column
              v-for="(item, index) in desginTableHeader"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
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
            <el-table
              :data="tableData"
              style="width: 100%"
              :header-cell-style="{'background-color': '#FAFAFA', 'text-align': 'center' }"
            >
              <el-table-column prop="name" label="项目名称" width="80" fixed />
              <el-table-column prop="name" label="工作包" width="200" fixed />
              <el-table-column prop="name" label="PTGTTM" width="80" />
              <el-table-column prop="name" label="代码量" width="80" />
              <el-table-column prop="name" label="缺陷个数" width="80" />
              <el-table-column prop="name" label="缺陷率" width="80" />
              <el-table-column prop="name" label="需求缺陷" width="80" />
              <el-table-column prop="name" label="设计缺陷" width="80" />
              <el-table-column prop="name" label="软件意见个数" width="150" />
              <el-table-column label="质量意见个数" width="210">
                <el-table-column prop="name" label="姓名" width="70" />
                <el-table-column prop="name" label="姓名" width="70" />
                <el-table-column prop="name" label="姓名" width="70" />
              </el-table-column>
              <el-table-column prop="name" label="可测试意见个数" width="230" />
              <el-table-column prop="name" label="设计与需求不一致个数" width="260" />
              <el-table-column prop="name" label="需求与原始需求不一致个数" width="280" />
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
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '福州市'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '福州市'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '福州市'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '福州市'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '福州市'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '福州市'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '福州市'
        }
      ],
      desginNoticeList: ['总计TP 44 个', '已完成TP 31 个', '计划用例 1379 个', '实际用例 835 个'],
      desginTableHeader: [
        {
          prop: 'area',
          label: '域',
          width: '80'
        },
        {
          prop: 'ttpcount',
          label: '总计TP个数',
          width: '150'
        },
        {
          prop: 'atpcount',
          label: '已完成TP个数',
          width: '170'
        },
        {
          prop: 'btpcount',
          label: '计划周期内完成的TP个数',
          width: '250'
        },
        {
          prop: 'ctpcount',
          label: '周期超期的TP个数',
          width: '200'
        },
        {
          prop: 'dtpcount',
          label: '资源超期的TP个数',
          width: '200'
        },
        {
          prop: 'etpcount',
          label: '预计完成用例个数',
          width: '200'
        },
        {
          prop: 'ftpcount',
          label: '已完成用例个数',
          width: '200'
        }
      ],
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
      ]
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
