<template>
  <div class="cost">
    <!-- 项目成本卡片 -->
    <card title="项目成本" style="margin-bottom: 10px">
      <template #buttons>
        <el-button type="primary">导出资源投入明细</el-button>
        <el-button type="primary" @click="handleStageAdjustClick">阶段调偏</el-button>
      </template>

      <template #content>
        <el-table
          v-if="false"
          v-loading="isFirstTableLoading"
          :data="projectTotalRealmCost"
          style="width: 100%"
          row-key="name"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          fit
          border
        >
          <el-table-column
            v-for="(item, index) in firstTableOptions"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            :min-width="item.minWidth"
            :fixed="item.fixed"
            :show-overflow-tooltip="item.sot"
            :align="item.children ? 'center' : ''"
          >
            <div v-if="item.children">
              <el-table-column
                v-for="(childItem, childIndex) in item.children"
                :key="childIndex"
                :prop="childItem.prop"
                :min-width="childItem.minWidth"
              >
                <template #header>
                  <span style="margin-right: 5px">{{ childItem.label }}</span>
                  <el-popover
                    v-if="childItem.content"
                    placement="top-start"
                    :width="childItem.contentWidth"
                    trigger="hover"
                  >
                    <div v-html="childItem.content" />
                    <i slot="reference" class="el-icon-question" />
                  </el-popover>
                </template>

                <template slot-scope="{row}">
                  <span
                    v-if="childItem.prop==='total_target'"
                  >{{ row[childItem.prop] | targetFilter }}</span>

                  <span
                    v-else-if="childItem.prop === 'total_actual'"
                    :class="calcRenderData(row.total_actual, row.total_target, 1)"
                    @click="handleActualTotalClick(row)"
                  >{{ row.total_actual | roundFilter }}</span>

                  <span
                    v-else-if="childItem.prop === 'total_estimate' "
                    :class="calcRenderData(row.total_estimate, row.total_target, 2)"
                  >{{ row.total_estimate | roundFilter }}</span>

                  <span v-else>{{ row[childItem.prop] | roundFilter }}</span>
                </template>
              </el-table-column>
            </div>
          </el-table-column>
        </el-table>

        <el-table
          v-loading="isSecondTableLoading"
          :data="projectRealmCost"
          style="width: 100%; margin-top: 10px;"
          row-key="name"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          :fit="false"
          border
        >
          <el-table-column prop="name" label="类型" width="220" fixed show-overflow-tooltip />
          <el-table-column prop="code_total" label="代码量" fixed>
            <el-table-column prop="code" label="新增" width="121" />
            <el-table-column prop="transplant_code" label="移植" width="121" />
            <el-table-column prop="total_code" label="总计" width="121" />
          </el-table-column>

          <el-table-column prop="total" label="总计">
            <el-table-column prop="realm_target" label="目标" width="121">
              <template #header>
                <span style="margin-right: 5px">目标</span>
                <el-popover
                  placement="top-start"
                  :width="800"
                  trigger="hover"
                >
                  <div v-html="stageTargetPopoverContent" />
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="total_actual" label="实际" width="121" />
            <el-table-column prop="total_need" label="还需" width="121" />
            <el-table-column prop="total_estimate" label="预期" width="121" />
            <el-table-column prop="total_deviation" label="偏差" width="121" />
          </el-table-column>
        </el-table>

        <el-table
          v-loading="isSecondTableLoading"
          :data="projectRealmCost"
          style="width: 100%; margin-top: 10px;"
          row-key="name"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          fit
          border
        >
          <el-table-column
            v-for="(item, index) in secondTableOptions"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            :min-width="item.minWidth"
            :fixed="item.fixed"
            :show-overflow-tooltip="item.sot"
            :align="item.children ? 'center' : ''"
          >
            <el-table-column
              v-for="(childItem, childIndex) in item.children"
              :key="childIndex"
              :prop="childItem.prop"
              :min-width="childItem.minWidth"
            >
              <template #header>
                <span style="margin-right: 5px">{{ childItem.label }}</span>
                <el-popover
                  v-if="childItem.content"
                  placement="top-start"
                  :width="childItem.contentWidth"
                  trigger="hover"
                >
                  <div v-html="childItem.content" />
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>

              <template slot-scope="{row}">
                <!-- 总计还需 -->
                <span
                  v-if="childItem.prop === 'total_need'"
                >{{ (Math.round((row.demand_need+row.design_need+row.admittance_need+row.test_first_need+row.test_second_need+row.regression_need+row.on_trial_need) * 10) / 10) }}</span>
                <!-- 总计预期 -->
                <span
                  v-else-if="childItem.prop === 'total_estimate'"
                >{{ (Math.round((row.demand_estimate+row.design_estimate+row.admittance_estimate+row.test_first_estimate+row.test_second_estimate+row.regression_estimate+row.on_trial_estimate) * 10) / 10) }}</span>
                <!-- 总计偏差 -->
                <span
                  v-else-if="childItem.prop === 'total_deviation'"
                >{{ (Math.round((row.demand_deviation+row.design_deviation+row.admittance_deviation+row.test_first_deviation+row.test_second_deviation+row.regression_deviation+row.on_trial_deviation) * 10) / 10) }}</span>

                <span
                  v-else-if="childItem.prop.includes('_target')"
                  style="word-spacing: 5px;"
                >{{ row[childItem.prop] | targetFilter }}</span>

                <span
                  v-else-if="childItem.prop.indexOf('_actual') >= 0"
                  :class="actualColor(row[childItem.prop], row)"
                  @click="handleActualTotalClick(row)"
                >{{ row[childItem.prop] | roundFilter }}</span>

                <span
                  v-else-if="childItem.prop.indexOf('_estimate') >= 0"
                  :class="actualColor(row[childItem.prop], row)"
                >{{ row[childItem.prop] | roundFilter }}</span>

                <span v-else>{{ row[childItem.prop] | roundFilter }}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </template>
    </card>

    <!-- 工序成本卡片 -->
    <card v-if="false" title="工序成本" class="card">
      <template #buttons>
        <el-button type="primary">导出工序成本统计</el-button>
      </template>
      <template #content>
        <div class="select-bar">
          <el-select v-model="selectVal" multiple collapse-tags placeholder="请选择">
            <el-option
              v-for="(item, index) in selectOptions"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>

        <el-table
          v-loading="isThirdTableLoading"
          :data="projectProcessEfficiency"
          height="500"
          style="width: 100%"
          row-key="process_name"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          fit
          border
        >
          <el-table-column
            v-for="item in thirdTableOptions"
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
            :min-width="item.minWidth"
            :fixed="item.fixed"
            :show-overflow-tooltip="item.sot"
            :align="item.children ? 'center' : ''"
          >
            <div v-if="item.children">
              <el-table-column
                v-for="childItem in item.children"
                :key="childItem.prop"
                :prop="childItem.prop"
                :min-width="childItem.minWidth"
              >
                <template #header>
                  <span style="margin-right: 5px">{{ childItem.label }}</span>
                  <el-popover
                    v-if="childItem.content"
                    placement="top-start"
                    :width="childItem.contentWidth"
                    trigger="hover"
                  >
                    <div v-html="childItem.content" />
                    <i slot="reference" class="el-icon-question" />
                  </el-popover>
                </template>

                <template slot-scope="{row}">
                  <span
                    :class="childItem.prop === 'total_time' ? calcRenderData(row[childItem.prop]) : ''"
                  >{{ row[childItem.prop] | roundFilter }}</span>
                </template>
              </el-table-column>
            </div>
          </el-table-column>
        </el-table>
      </template>
    </card>

    <!-- 对话框 -->
    <cost-dialog ref="dialogRef" :table-data="dialogTableData" />

    <!-- 资源调偏 -->
    <cost-source-adjust ref="costSourceAdjustRef" :list="fourTableData" />
  </div>
</template>

<script>
import Card from '@/components/Card/index'
import request from '@/services/request'
import CostDialog from './components/CostDialog'
import CostSourceAdjust from './components/CostSourceAdjust'

import { deepClone } from '@/utils'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    targetFilter(target) {
      return `${Math.round(target * 10) / 10} / ${Math.round((target / 2) * 10) / 10}`
    },
    roundFilter(value) {
      return Math.round(value * 10) / 10
    },
    // 实际
    actualFilter(text, record) {}
  },
  components: {
    Card,
    CostDialog,
    CostSourceAdjust
  },
  data() {
    return {
      key: 0,
      project: undefined, // 当前的项目名
      tableData: [],
      // 目标悬浮窗显示
      targetPopoverContent: `<div>
          <p>目标 / 腾讯SR-TE目标</p>
          <p>注：总计代码量=新增代码量+移植代码量*0.3</p>
          <ol type="1" start="1">
            <li>主干</li>
            <ul type="disc">
              <li>目标=各域总计代码量*系数*比例</li>
              <li>系数=(合计的总计代码量*(主干系数(10)-PTTL管理系数(0.8))-测试改进规划资源-技术项目规划资源)/合计的总计代码量</li>
              <li>比例：业务域（除系统测试域）是0.875；系统测试域是0.125</li>
            </ul>
            <li>组件项目</li>
            <ul type="disc">
              <li>目标=各组件代码量*系数</li>
              <li>系数=(组件的总计代码量*7-【测试效能工具-组件测试工具（FOR 5PL1 IDC）】目标(153))/组件的总计代码量</li>
            </ul>
            <li>项目管理</li>
            <ul type="disc">
              <li>测试管理目标=合计的新增代码量*1</li>
              <li>技术与质量目标=合计的新增代码量*0.7</li>
              <li>PTTL管理目标=合计的新增代码量*0.8（该目标从主干划分）</li>
            </ul>
            <li>技术项目、自动化、专业改进</li>
            <ul type="disc">
              <li>目标=各专业组固定目标</li>
              <li>其中【专业改进-测试效能工具-组件测试工具（FOR 5PL1 IDC）】目标从组件项目划分</li>
            </ul>
            <li>验收测试</li>
            <ul type="disc">
              <li>目标=合计的新增代码量*0.2</li>
            </ul>
          </ol>
        </div>`,
      // 阶段目标
      stageTargetPopoverContent: `<div>
          <p>目标 / 腾讯SR-TE目标</p>
          <p>注：总计代码量=新增代码量+移植代码量*0.3</p>
          <ol type="1" start="1">
            <li>主干</li>
            <ul type="disc">
              <li>总计目标=各域总计代码量*系数*比例</li>
              <ul type="circle">
                <li>系数=(合计的总计代码量*(主干系数(10)-PTTL管理系数(0.8))-测试改进规划资源-技术项目规划资源)/合计的总计代码量</li>
                <li>比例：业务域（除系统测试域）是0.875；系统测试域是0.125</li>
              </ul>
              <li>阶段目标=总计目标*各阶段系数</li>
              <ul type="circle">
                <li>需求系数=0.034；设计系数=0.289；准入系数=0.196</li>
                <li>首轮测试系数=0.165；次轮测试系数=0.140；回归系数=0.15；试点系数=0.011</li>
              </ul>
            </ul>
            <li>项目管理</li>
            <ul type="disc">
              <li>测试管理目标=合计的新增代码量*1</li>
              <li>技术与质量目标=合计的新增代码量*0.7</li>
              <li>PTTL管理目标=合计的新增代码量*0.8（该目标从主干划分）</li>
              <li>阶段目标=总计目标/全阶段天数*各阶段天数</li>
            </ul>
            <li>自动化</li>
            <ul type="disc">
              <li>阶段目标=总计目标*各阶段系数（阶段目标同主干）</li>
              <ul type="circle">
                <li>需求系数=0.034；设计系数=0.289；准入系数=0.196</li>
                <li>首轮测试系数=0.165；次轮测试系数=0.140；回归系数=0.15；试点系数=0.011</li>
              </ul>
            </ul>
          </ol>
        </div>`,
      // 实际悬浮显示值
      actualPopoverContent: `<div>
          <ol type="1" start="1">
            <li>根据人员资源统计填写归属实际资源</li>
            <li>鼠标移入显示效率值</li>
            <ul type="disc">
              <li>项目效率=实际资源投入/项目合计代码量</li>
              <li>效率=实际资源投入/新增代码量</li>
            </ul>
            <li>字体颜色</li>
            <ul type="disc">
              <li>黑色：未超过目标*系数</li>
              <li>橙色：超过目标*系数</li>
              <li>红色：超过目标</li>
              <li>系数：主干、项目管理、自动化是0.5；其余0.9</li>
            </ul>
            <li>因为四舍五入的关系，可能与工序表存在细微误差</li>
          </ol>
        </div>`,
      // 还需
      needPopoverContent: `<div>
          <ol type="1" start="1">
            <li>阶段还需</li>
            <ul type="disc">
              <li>已过阶段还需=0</li>
              <li>当前阶段还需：主干、项目管理、自动化实际投入/系数*(1-系数)；其他为目标-实际，实际超过目标，还需为0</li>
              <ul type="circle">
                <li>0.0 &lt; 阶段已过天数/阶段总天数 &lt;=0.5 系数=0.3</li>
                <li>0.5 &lt; 阶段已过天数/阶段总天数 &lt;= 0.6 系数=0.44</li>
                <li>0.6 &lt; 阶段已过天数/阶段总天数 &lt;= 0.7 系数=0.58</li>
                <li>0.7 &lt; 阶段已过天数/阶段总天数 &lt;= 0.8 系数=0.72</li>
                <li>0.8 &lt; 阶段已过天数/阶段总天数 &lt;= 0.9 系数=0.86</li>
                <li>0.9 &lt; 阶段已过天数/阶段总天数 &lt;= 1.0 系数=1</li>
              </ul>
              <li>未到阶段还需=目标</li>
            </ul>
            <li>合计还需=主干、项目管理、自动化各阶段加和；其他为目标-实际，实际超过目标，还需为0</li>
          </ol>
        </div>`,
      // 预期
      expectedPopoverContent: ` <div>
          <ol type="1" start="1">
            <li>预期=实际+还需</li>
            <li>字体颜色</li>
            <ul type="disc">
              <li>黑色：未超过目标*系数</li>
              <li>橙色：超过目标*系数</li>
              <li>红色：超过目标</li>
              <li>系数：主干、项目管理、自动化是0.5；其余0.9</li>
            </ul>
          </ol>
        </div>`,
      listLoading: true,
      // 表格一
      projectTotalRealmCost: [],
      isFirstTableLoading: false,
      // 表格二
      projectRealmCost: [],
      isSecondTableLoading: false,
      // 表格三
      projectProcessEfficiency: [],
      isThirdTableLoading: false,
      // 对话框
      dialogTableData: [], // 对话框表格数据
      // 表格四
      fourTableData: [],
      selectOptions: ['工序', '12.5PL1', '12.X基线'],
      selectVal: ['工序', '12.5PL1', '12.X基线']
    }
  },
  computed: {
    firstTableOptions() {
      return [
        {
          prop: 'name',
          label: '类型',
          minWidth: '220',
          fixed: 'left',
          sot: true
        },
        {
          label: '代码量',
          children: [
            {
              prop: 'total_code',
              label: '总计',
              minWidth: '121',
              content: '总计 = 新增 + 移植 * 0.3',
              contentWidth: 200
            },
            {
              prop: 'code',
              label: '新增',
              minWidth: '121'
            },
            {
              prop: 'transplant_code',
              label: '移植',
              minWidth: '121',
              content: '组件代码量, 目前代码量写死',
              contentWidth: 220
            }
          ]
        },
        {
          label: '总计',
          children: [
            {
              prop: 'total_deviation',
              label: '偏差',
              minWidth: '141',
              content: '偏差 = 预期 - 目标',
              contentWidth: 170
            },
            {
              prop: 'total_target',
              label: '目标',
              minWidth: '141',
              content: this.targetPopoverContent,
              contentWidth: 800
            },
            {
              prop: 'total_actual',
              label: '实际',
              minWidth: '141',
              content: this.actualPopoverContent,
              contentWidth: 400
            },
            {
              prop: 'total_need',
              label: '还需',
              minWidth: '141',
              content: this.needPopoverContent,
              contentWidth: 800
            },
            {
              prop: 'total_estimate',
              label: '预期',
              minWidth: '141',
              content: this.expectedPopoverContent,
              contentWidth: 400
            }
          ]
        }
      ]
    },
    secondTableOptions() {
      return [
        {
          prop: 'name',
          label: '类型',
          minWidth: '220',
          fixed: 'left',
          sot: true
        },
        {
          label: '代码量',
          prop: 'code_total',
          children: [
            {
              prop: 'code',
              label: '新增',
              minWidth: '121'
            },
            {
              prop: 'transplant_code',
              label: '移植',
              minWidth: '121'
            },
            {
              prop: 'total_code',
              label: '总计',
              minWidth: '121'
            }
          ]
        },
        {
          label: '总计',
          prop: 'total',
          children: [
            {
              prop: 'realm_target',
              label: '目标',
              minWidth: '141',
              content: this.stageTargetPopoverContent,
              contentWidth: 800
            },
            {
              prop: 'total_actual',
              label: '实际',
              minWidth: '141'
            },
            {
              prop: 'total_need',
              label: '还需',
              minWidth: '141'
            },
            {
              prop: 'total_estimate',
              label: '预期',
              minWidth: '141'
            },
            {
              prop: 'total_deviation',
              label: '偏差',
              minWidth: '141'
            }
          ]
        },
        {
          label: '需求',
          prop: 'demand',
          children: [
            {
              prop: 'demand_target',
              label: '目标',
              minWidth: '141'
            },
            {
              prop: 'demand_actual',
              label: '实际',
              minWidth: '141'
            },
            {
              prop: 'demand_need',
              label: '还需',
              minWidth: '141'
            },
            {
              prop: 'demand_estimate',
              label: '预期',
              minWidth: '141'
            },
            {
              prop: 'demand_deviation',
              label: '偏差',
              minWidth: '141'
            }
          ]
        },
        {
          label: '设计',
          prop: 'design',
          children: [
            {
              prop: 'design_target',
              label: '目标',
              minWidth: '141'
            },
            {
              prop: 'design_actual',
              label: '实际',
              minWidth: '141'
            },
            {
              prop: 'design_need',
              label: '还需',
              minWidth: '141'
            },
            {
              prop: 'design_estimate',
              label: '预期',
              minWidth: '141'
            },
            {
              prop: 'design_deviation',
              label: '偏差',
              minWidth: '141'
            }
          ]
        },
        {
          label: '准入',
          prop: 'admittance',
          children: [
            {
              prop: 'admittance_target',
              label: '目标',
              minWidth: '141'
            },
            {
              prop: 'admittance_actual',
              label: '实际',
              minWidth: '141'
            },
            {
              prop: 'admittance_need',
              label: '还需',
              minWidth: '141'
            },
            {
              prop: 'admittance_estimate',
              label: '预期',
              minWidth: '141'
            },
            {
              prop: 'admittance_deviation',
              label: '偏差',
              minWidth: '141'
            }
          ]
        },
        {
          label: '次轮',
          prop: 'second',
          children: [
            {
              prop: 'test_second_target',
              label: '目标',
              minWidth: '141'
            },
            {
              prop: 'test_second_actual',
              label: '实际',
              minWidth: '141'
            },
            {
              prop: 'test_second_need',
              label: '还需',
              minWidth: '141'
            },
            {
              prop: 'test_second_estimate',
              label: '预期',
              minWidth: '141'
            },
            {
              prop: 'test_second_deviation',
              label: '偏差',
              minWidth: '141'
            }
          ]
        },
        {
          label: '回归',
          prop: 'regression',
          children: [
            {
              prop: 'regression_target',
              label: '目标',
              minWidth: '141'
            },
            {
              prop: 'regression_actual',
              label: '实际',
              minWidth: '141'
            },
            {
              prop: 'regression_need',
              label: '还需',
              minWidth: '141'
            },
            {
              prop: 'regression_estimate',
              label: '预期',
              minWidth: '141'
            },
            {
              prop: 'regression_deviation',
              label: '偏差',
              minWidth: '141'
            }
          ]
        },
        {
          label: '试点',
          prop: 'on_trial',
          children: [
            {
              prop: 'on_trial_target',
              label: '目标',
              minWidth: '141'
            },
            {
              prop: 'on_trial_actual',
              label: '实际',
              minWidth: '141'
            },
            {
              prop: 'on_trial_need',
              label: '还需',
              minWidth: '141'
            },
            {
              prop: 'on_trial_estimate',
              label: '预期',
              minWidth: '141'
            },
            {
              prop: 'on_trial_deviation',
              label: '偏差',
              minWidth: '141'
            }
          ]
        }
      ]
    },
    thirdTableOptions() {
      const options = [
        {
          prop: 'process_name',
          label: '工序',
          minWidth: '220',
          fixed: 'left',
          sot: true,
          hide: false
        },
        {
          prop: 'project',
          label: '12.5PL1',
          hide: false,
          children: [
            {
              prop: 'expect_all_summary',
              label: '预期总资源',
              minWidth: '164',
              content: '如果实际资源大于目标资源，则实际资源为预期总资源，反之为目标资源',
              contentWidth: 480
            },
            {
              prop: 'code',
              label: '代码量',
              minWidth: '121'
            },
            {
              prop: 'target_coefficient',
              label: '目标系数',
              minWidth: '121',
              content: '根据基线算出，目前写死',
              contentWidth: 185
            },
            {
              prop: 'target_summary',
              label: '目标资源',
              minWidth: '121',
              content: '组件代码量, 目前代码量写死',
              contentWidth: 210
            },
            {
              prop: 'code_rate',
              label: '代码效率',
              minWidth: '164',
              content: '代码效率 = 目标资源 / 代码量',
              contentWidth: 210
            },
            {
              prop: 'target_num',
              label: '目标数量',
              minWidth: '164',
              content: '根据单位，K的使用代码量；其他根据基线算出，目前写死',
              contentWidth: 390
            },
            {
              prop: 'process_eff',
              label: '工序效率',
              minWidth: '164',
              content: '工序效率 = 目标资源 / 目标数量',
              contentWidth: 230
            },
            {
              prop: 'num',
              label: '实际数量',
              minWidth: '164',
              content:
                '根据实际所得，目前只有5个工序有统计（需求分析、用例设计、bug处理、手工执行、自动化执行）',
              contentWidth: 655
            },
            {
              prop: 'actual_process_rate',
              label: '实际工序效率',
              minWidth: '164',
              content: '实际工序效率=实际资源/实际数量，如果实际数量为0，则除以目标数量',
              contentWidth: 470
            },
            {
              prop: 'total_time',
              label: '实际资源',
              minWidth: '164',
              content: '根据实际人员填写统计，因为四舍五入，可能和域维度成本有细微误差',
              contentWidth: 470
            },
            {
              prop: 'actual_code_rate',
              label: '实际代码效率',
              minWidth: '164',
              content: '实际代码效率 = 实际资源 / 代码量',
              contentWidth: 240
            },
            {
              prop: 'need_summary',
              label: '偏差资源',
              minWidth: '164',
              content: '偏差资源 = 实际资源 - 目标资源',
              contentWidth: 233
            }
          ]
        },
        {
          prop: 'base',
          label: '12.X基线',
          children: [
            {
              prop: 'process_rate',
              label: '工序效率',
              minWidth: '141'
            },
            {
              prop: 'four_pl1_code',
              label: '代码量',
              minWidth: '141'
            },
            {
              prop: 'four_pl1_summary',
              label: '资源投入',
              minWidth: '141'
            },
            {
              prop: 'code_eff',
              label: '代码效率',
              minWidth: '141'
            },
            {
              prop: 'four_pl1_num',
              label: '产出个数',
              minWidth: '141'
            }
          ]
        }
      ]
      return options.filter((item) => this.selectVal.indexOf(item.label) >= 0)
    }
  },
  created() {
    this.project = this.$t(this.$route.matched[2].meta.title) // 获取项目名称
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.getProjectTotalRealmCost(this.project)
      this.getProjectRealmCost(this.project)
      this.getProjectProcessEfficiency(this.project)
      this.getRealmAdjustList(this.project)
    },
    // 计算渲染数据的类, flag 控制是否有下划线
    calcRenderData(value, target, flag = 1) {
      value = value === undefined ? 0 : Math.round(value * 10) / 10
      target = target === undefined ? 0 : Math.round(target * 10) / 10
      const half = target === undefined ? 0 : Math.round(target * 0.5 * 10) / 10

      if (half <= value && value < target) {
        return flag === 1 ? 'normal warning' : 'warning'
      } else if (value >= target) {
        return flag === 1 ? 'normal error' : 'error'
      }
      return flag === 1 ? 'normal' : ''
    },
    actualColor(text, record) {
      const totalTarget = Math.round(record.demand_target * 10) / 10
      let totalTargetHalf = Math.round(record.demand_target * 0.5 * 10) / 10
      if (
        record.type === '组件项目' ||
        record.type === '技术项目' ||
        record.type === '专业改进' ||
        record.type === '验收测试' ||
        record.type === '其他'
      ) {
        totalTargetHalf = Math.round(record.demand_target * 0.9 * 10) / 10
      }

      if (text <= totalTargetHalf) {
        return 'normal'
      }
      if (totalTargetHalf < text && text <= totalTarget) {
        return 'warning normal'
      }
      if (totalTarget < text) {
        console.log(1)
        return 'error normal'
      }
    },
    // 点击实际列表项
    handleActualTotalClick(row) {
      this.$refs.dialogRef.isDialogVisible = true // 显示对话框
      this.getProjectDetailSummary(this.project, row.type, row.area, row.realm, '', '')
    },
    // 点击资源调偏
    handleStageAdjustClick() {
      // 深拷贝一份传递
      this.$refs.costSourceAdjustRef.tableData = deepClone(this.fourTableData)
      // 显示窗口
      this.$refs.costSourceAdjustRef.isDialogVisible = true
    },
    // 成本-项目成本-总计
    async getProjectTotalRealmCost(project) {
      this.isFirstTableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByProjectTotalRealmCost', {
        method: 'GET',
        params: {
          project
        }
      })

      this.projectTotalRealmCost = res
      this.$nextTick(() => {
        this.isFirstTableLoading = false
      })
    },
    // 成本-项目成本-域统计
    async getProjectRealmCost(project) {
      this.isSecondTableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByProjectRealmCost', {
        method: 'GET',
        params: {
          project
        }
      })

      this.projectRealmCost = res
      this.$nextTick(() => {
        this.isSecondTableLoading = false
      })
    },
    // 成本-项目成本-资源明细
    async getProjectDetailSummary(project, type, area, realm, stage, process) {
      this.$refs.dialogRef.isLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByProjectDetailSummary', {
        method: 'GET',
        params: {
          project,
          type,
          area,
          realm,
          stage,
          process
        }
      })
      this.dialogTableData = res
      this.$nextTick(() => {
        this.$refs.dialogRef.isLoading = false
      })
    },
    // 成本-工序成本
    async getProjectProcessEfficiency(project) {
      this.isThirdTableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByProcessEfficiency', {
        method: 'GET',
        params: {
          project
        }
      })

      this.projectProcessEfficiency = res
      this.isThirdTableLoading = false
    },
    // 成本-项目成本-项目阶段资源调偏列表
    async getRealmAdjustList(project) {
      this.isFourTableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/findByUserProjectRealmStageList', {
        method: 'GET',
        params: {
          project
        }
      })

      this.fourTableData = res
      this.$nextTick(() => {
        this.isFourTableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.select-bar {
  margin-bottom: 20px;
}

.warning {
  color: orange;
  font-weight: bold;
}

.error {
  color: red;
  font-weight: bold;
}

.normal {
  text-decoration: underline;
  cursor: pointer;
}
</style>
