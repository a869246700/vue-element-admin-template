<template>
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
            :data="reviewTableData"
            border
            style="width: 100%"
            fit
            :header-cell-style="{'background-color': '#FAFAFA' }"
            highlight-current-row
          >
            <el-table-column prop="name" label="项目名" fixed min-width="89" show-overflow-tooltip />
            <el-table-column
              prop="work_package"
              label="工作包"
              fixed
              min-width="186"
              show-overflow-tooltip
            />
            <el-table-column
              v-for="(item, index) in reviewTableTitleList"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="software_opinion_count"
              label="软件意见数量"
              min-width="130"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="quality_opinion_count"
              label="质量意见个数"
              min-width="210"
              align="center"
              show-overflow-tooltip
            >
              <el-table-column
                prop="need"
                label="需求"
                :min-width="70"
                align="center"
                show-overflow-tooltip
              />
              <el-table-column
                prop="desgin"
                label="需求"
                :min-width="70"
                align="center"
                show-overflow-tooltip
              />
              <el-table-column
                prop="total"
                label="需求"
                :min-width="70"
                align="center"
                show-overflow-tooltip
              />
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
</template>

<script>
import Card from '@/components/Card/index'
import Chart from '@/components/MyChart/Chart'
// import request from '@/services/request'

// 导入 select 和 table 的配置项
import {
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
      key: 1,
      reviewStage: '主干',
      reviewStageTypeList: [{ stage: '主干' }, { stage: '组件' }, { stage: '主干+组件' }],
      reviewTableStage: '工作包', //
      reviewTableStageTypeList: [{ stage: '工作包' }, { stage: 'PTGTTM' }],
      reviewSelectVal: reviewCardSelectDefaultList,
      reviewSelectOptions: reviewCardSelectList,
      reviewTableTitleList: reviewCardTableTitleList.filter(
        (i) => reviewCardSelectDefaultList.indexOf(i.label) >= 0
      ),
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
      reviewTableData: [
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
      ]
    }
  },
  watch: {
    // 设计卡片 select 的选中项改变
    reviewSelectVal(valArr) {
      this.reviewTableTitleList = reviewCardTableTitleList.filter(
        (i) => valArr.indexOf(i.label) >= 0
      )
      this.key = this.key + 1
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 20px;
}

.charts {
  margin-top: 20px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
}

// review 评审
.review-charts-radio {
  margin-bottom: 20px;
}
</style>
