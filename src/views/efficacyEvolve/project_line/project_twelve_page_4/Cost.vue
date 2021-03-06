<template>
  <div class="cost">
    <el-radio-group v-model="active" style="margin-bottom: 20px;">
      <el-radio-button
        v-for="(item, index) in tabs"
        :key="index"
        :label="item.value"
      >{{ item.label }}</el-radio-button>
    </el-radio-group>

    <transition name="component-fade" mode="out-in">
      <div v-if="active === '0'">
        <cost-chart ref="costChartRef" :project="project" />
      </div>

      <div v-if="active === '1'">
        <!-- 项目成本卡片 -->
        <card title="项目成本" style="margin-bottom: 10px">
          <template #buttons>
            <el-button
              :loading="butLoading"
              type="primary"
              icon="el-icon-download"
              size="small"
              @click="handleResourceInvClick"
            >导出资源投入明细</el-button>
            <el-button type="primary" size="small" @click="handleStageAdjustClick">阶段调偏</el-button>
          </template>

          <template #content>
            <!-- 总计 -->
            <el-table
              v-loading="isFirstTableLoading"
              :data="projectTotalRealmCost"
              style="width: 100%"
              row-key="name"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              fit
              border
            >
              <el-table-column
                v-for="item in firstTableOptions"
                :key="item.prop"
                :label="item.label"
                :prop="item.prop"
                :min-width="item.minWidth"
                :fixed="item.fixed"
                :show-overflow-tooltip="item.sot"
                :align="item.children ? 'center' : ''"
              >
                <template v-if="item.prop === 'name'" slot-scope="{row}">
                  <span v-if="row.is_finish === 1">
                    {{ row[item.prop] }}
                    <i class="el-icon-circle-check" style="color: #7bed9f; font-size: 16px;" />
                  </span>
                  <span v-else>{{ row[item.prop] }}</span>
                </template>

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
                      v-if="childItem.prop==='total_target'"
                    >{{ row[childItem.prop] | targetFilter }}</span>

                    <span
                      v-else-if="childItem.prop === 'total_actual'"
                      :class="calcRenderColor(row.total_actual, row, 1)"
                      @click="handleActualTotalClick(row, item.label)"
                    >{{ row.total_actual | roundFilter }}</span>

                    <span
                      v-else-if="childItem.prop === 'total_estimate' "
                      :class="actualColor(row.total_estimate, row, 2)"
                    >{{ row.total_estimate | roundFilter }}</span>

                    <span v-else>{{ row[childItem.prop] | roundFilter }}</span>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>

            <!-- 域 -->
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
                v-for="item in secondTableOptions"
                :key="item.prop"
                :label="item.label"
                :prop="item.prop"
                :min-width="item.minWidth"
                :fixed="item.fixed"
                :show-overflow-tooltip="item.sot"
                :align="item.children ? 'center' : ''"
              >
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
                    <!-- 总计还需 -->
                    <span
                      v-if="childItem.prop === 'total_need'"
                    >{{ (Math.round((row.demand_need+row.design_need+row.admittance_need+row.test_first_need+row.test_second_need+row.regression_need+row.on_trial_need) * 10) / 10) }}</span>
                    <!-- 总计预期 -->
                    <span
                      v-else-if="childItem.prop === 'total_estimate'"
                      :class="actualColor((Math.round((row.demand_estimate+row.design_estimate+row.admittance_estimate+row.test_first_estimate+row.test_second_estimate+row.regression_estimate+row.on_trial_estimate) * 10) / 10), row, item.prop, 2)"
                    >{{ (Math.round((row.demand_estimate+row.design_estimate+row.admittance_estimate+row.test_first_estimate+row.test_second_estimate+row.regression_estimate+row.on_trial_estimate) * 10) / 10) }}</span>
                    <!-- 总计偏差 -->
                    <span
                      v-else-if="childItem.prop === 'total_deviation'"
                    >{{ (Math.round((row.demand_deviation+row.design_deviation+row.admittance_deviation+row.test_first_deviation+row.test_second_deviation+row.regression_deviation+row.on_trial_deviation) * 10) / 10) }}</span>

                    <!-- 目标 -->
                    <span
                      v-else-if="childItem.prop.includes('_target')"
                      style="word-spacing: 5px;"
                    >{{ row[childItem.prop] | targetFilter }}</span>

                    <!-- 实际 -->
                    <span
                      v-else-if="childItem.prop.indexOf('_actual') >= 0"
                      :class="actualColor(row[childItem.prop], row, item.prop, 1)"
                      @click="handleActualTotalClick(row, item.label)"
                    >{{ row[childItem.prop] | roundFilter }}</span>

                    <!-- 预期 -->
                    <span
                      v-else-if="item.prop !== 'regression' && item.prop !== 'on_trial' && item.prop !== 'total' && childItem.prop.indexOf('_estimate') >= 0"
                      :class="actualColor(row[childItem.prop], row, item.prop, 2)"
                    >{{ row[childItem.prop] | roundFilter }}</span>

                    <span v-else>{{ row[childItem.prop] | roundFilter }}</span>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </template>
        </card>

        <!-- 工序成本卡片 -->
        <card title="工序成本" class="card">
          <template #buttons>
            <el-button :loading="butLoading" type="primary" @click="handleProcessCostClick">导出工序成本统计</el-button>
          </template>
          <template #content>
            <div class="tree-bar">
              <el-popover placement="left" trigger="click">
                <el-tree
                  ref="treeRef"
                  :data="treeData"
                  show-checkbox
                  node-key="id"
                  :default-checked-keys="treeDefaultCheckVal"
                  accordion
                  :props="treeProps"
                  @check="handleTreeChange"
                />
                <el-button
                  slot="reference"
                  size="mini"
                  style="font-size: 20px;"
                  icon="el-icon-set-up"
                  circle
                />
              </el-popover>
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
              <template v-for="item in thirdTableOptions">
                <el-table-column
                  v-if="!item.hide"
                  :key="item.prop"
                  :label="item.label"
                  :prop="item.prop"
                  :min-width="item.minWidth"
                  :fixed="item.fixed"
                  :show-overflow-tooltip="item.sot"
                  :align="item.children ? 'center' : ''"
                >
                  <template v-for="childItem in item.children">
                    <el-table-column
                      v-if="!childItem.hide"
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
                          v-if="childItem.prop === 'total_time'"
                          :class="calcRenderColor2(row.total_time, row, 1)"
                          @click="handleActualTotalClick(row, '')"
                        >{{ row[childItem.prop] | roundFilter }}</span>

                        <span
                          v-else
                        >{{ row[childItem.prop] === undefined ? 0 : Math.round(row[childItem.prop] * 10) / 10 }}</span>
                      </template>
                    </el-table-column>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </template>
        </card>
      </div>
    </transition>

    <!-- 对话框 -->
    <cost-dialog ref="dialogRef" :project="project" :table-data="dialogTableData" />

    <!-- 资源调偏 -->
    <cost-source-adjust ref="costSourceAdjustRef" :list="fourTableData" />
  </div>
</template>

<script>
import Card from '@/components/Card/index'
import CostDialog from './components/CostDialog'
import CostSourceAdjust from './components/CostSourceAdjust'
import CostChart from './components/CostChart'

import { deepClone } from '@/utils'
import request from '@/services/request'
import DownFiles from '@/vendor/ExportExcel'

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
    CostSourceAdjust,
    CostChart
  },
  data() {
    return {
      key: 0,
      active: '0',
      tabs: [
        {
          label: '成本统计图',
          value: '0'
        },
        {
          label: '项目成本',
          value: '1'
        },
        {
          label: '占位2',
          value: '2'
        },
        {
          label: '占位3',
          value: '3'
        },
        {
          label: '占位4',
          value: '4'
        }
      ],
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
      butLoading: false,
      treeCheckedVal: [1, 2, 3],
      treeDefaultCheckVal: [1, 2, 3],
      treeData: [
        {
          id: 1,
          label: '工序'
        },
        {
          id: 2,
          label: '12.5PL1',
          children: [
            {
              id: 21,
              label: '代码量'
            },
            {
              id: 22,
              label: '目标系数'
            },
            {
              id: 23,
              label: '目标资源'
            },
            {
              id: 24,
              label: '代码效率'
            },
            {
              id: 25,
              label: '目标数量'
            },
            {
              id: 26,
              label: '工序效率'
            },
            {
              id: 27,
              label: '实际数量'
            },
            {
              id: 28,
              label: '实际工序效率'
            },
            {
              id: 29,
              label: '实际资源'
            },
            {
              id: 210,
              label: '实际代码效率'
            },
            {
              id: 211,
              label: '偏差资源'
            },
            {
              id: 212,
              label: '预期总资源'
            }
          ]
        },
        {
          id: 3,
          label: '12.X基线',
          children: [
            {
              id: 31,
              label: '代码量'
            },
            {
              id: 32,
              label: '资源投入'
            },
            {
              id: 33,
              label: '代码效率'
            },
            {
              id: 34,
              label: '产出个数'
            },
            {
              id: 35,
              label: '工序效率'
            }
          ]
        }
      ],
      treeProps: {
        label: 'label',
        children: 'children'
      }
    }
  },
  computed: {
    firstTableOptions() {
      return [
        {
          prop: 'name',
          label: '类型',
          minWidth: '380',
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
          id: 1,
          prop: 'process_name',
          label: '工序',
          minWidth: '220',
          fixed: 'left',
          sot: true
        },
        {
          id: 2,
          prop: 'project',
          label: '12.5PL1',
          children: [
            {
              id: 21,
              prop: 'code',
              label: '代码量',
              minWidth: '121'
            },
            {
              id: 22,
              prop: 'target_coefficient',
              label: '目标系数',
              minWidth: '121',
              content: '根据基线算出，目前写死',
              contentWidth: 185
            },
            {
              id: 23,
              prop: 'target_summary',
              label: '目标资源',
              minWidth: '121',
              content: '组件代码量, 目前代码量写死',
              contentWidth: 210
            },
            {
              id: 24,
              prop: 'code_rate',
              label: '代码效率',
              minWidth: '164',
              content: '代码效率 = 目标资源 / 代码量',
              contentWidth: 210
            },
            {
              id: 25,
              prop: 'target_num',
              label: '目标数量',
              minWidth: '164',
              content: '根据单位，K的使用代码量；其他根据基线算出，目前写死',
              contentWidth: 390
            },
            {
              id: 26,
              prop: 'process_eff',
              label: '工序效率',
              minWidth: '164',
              content: '工序效率 = 目标资源 / 目标数量',
              contentWidth: 230
            },
            {
              id: 27,
              prop: 'num',
              label: '实际数量',
              minWidth: '164',
              content:
                '根据实际所得，目前只有5个工序有统计（需求分析、用例设计、bug处理、手工执行、自动化执行）',
              contentWidth: 655
            },
            {
              id: 28,
              prop: 'actual_process_rate',
              label: '实际工序效率',
              minWidth: '164',
              content: '实际工序效率=实际资源/实际数量，如果实际数量为0，则除以目标数量',
              contentWidth: 470
            },
            {
              id: 29,
              prop: 'total_time',
              label: '实际资源',
              minWidth: '164',
              content: '根据实际人员填写统计，因为四舍五入，可能和域维度成本有细微误差',
              contentWidth: 470
            },
            {
              id: 210,
              prop: 'actual_code_rate',
              label: '实际代码效率',
              minWidth: '164',
              content: '实际代码效率 = 实际资源 / 代码量',
              contentWidth: 240
            },
            {
              id: 211,
              prop: 'need_summary',
              label: '偏差资源',
              minWidth: '164',
              content: '偏差资源 = 实际资源 - 目标资源',
              contentWidth: 233
            },
            {
              id: 212,
              prop: 'expect_all_summary',
              label: '预期总资源',
              minWidth: '164',
              content: '如果实际资源大于目标资源，则实际资源为预期总资源，反之为目标资源',
              contentWidth: 480
            }
          ]
        },
        {
          id: 3,
          prop: 'base',
          label: '12.X基线',
          children: [
            {
              id: 31,
              prop: 'four_pl1_code',
              label: '代码量',
              minWidth: '141'
            },
            {
              id: 32,
              prop: 'four_pl1_summary',
              label: '资源投入',
              minWidth: '141'
            },
            {
              id: 33,
              prop: 'code_eff',
              label: '代码效率',
              minWidth: '141'
            },
            {
              id: 34,
              prop: 'four_pl1_num',
              label: '产出个数',
              minWidth: '141'
            },
            {
              id: 35,
              prop: 'process_rate',
              label: '工序效率',
              minWidth: '141'
            }
          ]
        }
      ]
      const checkedList = this.treeCheckedVal

      const list = options.filter((ele) => {
        ele.hide = true
        if (checkedList.includes(ele.id)) {
          ele.hide = false
        } else {
          // 如果有子孩子
          if (ele.children) {
            let hideFlag = true // 判断父节点是否被隐藏
            ele.children.map((e) => {
              e.hide = true
              // 如果子节点存在 check 状态
              if (checkedList.includes(e.id)) {
                e.hide = false
                hideFlag = false // 父节点则不被隐藏
              }
              ele.hide = hideFlag
              return e
            })
          }
        }
        return ele
      })

      return list
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
    chartResize() {
      switch (this.active) {
        case '0':
          this.$refs.costChartRef.chartResize()
          break
      }
    },
    // tree 选择项修改
    handleTreeChange(node, nodes) {
      this.treeCheckedVal = nodes.checkedKeys
    },
    // 导出资源投入明细
    handleResourceInvClick() {
      const url = '/api/export/projectCostPerson'
      const obj = {
        conditions: {
          project: this.project
        }
      }
      const fileName = '资源投入明细.xls'
      DownFiles(url, obj, fileName, this)
    },
    // 导出工序成本明细
    handleProcessCostClick() {
      const url = '/api/export/stageProcessCost'
      const obj = {
        conditions: {
          project: this.project
        }
      }
      const fileName = '资源投入工序明细.xls'
      DownFiles(url, obj, fileName, this)
    },
    calcRenderColor(text, record, flag) {
      const totalTarget = Math.round(record.total_target * 10) / 10
      let totalTargetHalf = Math.round(record.total_target * 0.5 * 10) / 10
      if (
        record.type === '组件项目' ||
        record.type === '技术项目' ||
        record.type === '专业改进' ||
        record.type === '验收测试' ||
        record.type === '其他'
      ) {
        totalTargetHalf = Math.round(record.total_target * 0.9 * 10) / 10
      }

      if (text <= totalTargetHalf) {
        return flag === 1 ? 'normal' : ''
      }
      if (totalTargetHalf < text && text <= totalTarget) {
        return flag === 1 ? 'warning normal' : 'warning'
      }
      if (totalTarget < text) {
        return flag === 1 ? 'error normal' : 'error'
      }
    },
    actualColor(text, record, parentProp, flag) {
      let totalTarget = Math.round(record[parentProp + '_target'] * 10) / 10
      let totalTargetHalf = Math.round(record[parentProp + '_target'] * 0.5 * 10) / 10

      if (parentProp === 'total') {
        totalTarget = Math.round(record.realm_target * 10) / 10
        totalTargetHalf = Math.round(record.realm_target * 0.5 * 10) / 10
      }

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
        return flag === 1 ? 'normal' : ''
      }
      if (totalTargetHalf < text && text <= totalTarget) {
        return flag === 1 ? 'warning normal' : 'warning'
      }
      if (totalTarget < text) {
        return flag === 1 ? 'error normal' : 'error'
      }
    },
    // 处理工序卡片中实际资源颜色方法
    calcRenderColor2(text, record, flag) {
      const totalTarget =
        record.target_summary === undefined ? 0 : Math.round(record.target_summary * 10) / 10
      const totalTargetHalf =
        record.target_summary === undefined ? 0 : Math.round(record.target_summary * 0.5 * 10) / 10
      const value = text === undefined ? 0 : Math.round(text * 10) / 10

      if (value <= totalTargetHalf) {
        return flag === 1 ? 'normal' : ''
      }
      if (totalTargetHalf < value && value <= totalTarget) {
        return flag === 1 ? 'warning normal' : 'warning'
      }
      if (totalTarget < value) {
        return flag === 1 ? 'error normal' : 'error'
      }
    },
    // 点击实际列表项
    handleActualTotalClick(row, stage) {
      if (stage === '总计' || stage === undefined) {
        stage = ''
      }
      this.$refs.dialogRef.isDialogVisible = true // 显示对话框
      this.$refs.dialogRef.temp = row
      this.getProjectDetailSummary(
        this.project,
        !row.type ? '' : row.type,
        !row.area ? '' : row.area,
        !row.realm ? '' : row.realm,
        stage,
        !row.process_name ? '' : row.process_name
      )
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
.tree-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.warning {
  color: #ff8000 !important;
  font-weight: bold;
}

.error {
  color: #ff0000 !important;
  font-weight: bold;
}

.normal {
  color: #000;
  text-decoration: underline;
  cursor: pointer;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.2s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
