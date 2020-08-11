<template>
  <div class="cost">
    <!-- 项目成本卡片 -->
    <card title="项目成本" style="margin-bottom: 10px">
      <template #buttons>
        <el-button type="primary">导出资源投入明细</el-button>
        <el-button type="primary">阶段调偏</el-button>
      </template>

      <template #content>
        <el-table
          v-loading="listLoading"
          :data="tableData"
          style="width: 100%"
          row-key="id"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          fit
          border
        >
          <el-table-column prop="type" label="类型" min-width="220" fixed show-overflow-tooltip />
          <el-table-column label="代码量" align="center">
            <el-table-column prop="add" label="新增" min-width="121" />
            <el-table-column prop="transplant" label="移植" min-width="121">
              <template #header>
                <span style="margin-right: 5px">移植</span>
                <el-popover
                  placement="top-start"
                  width="220"
                  trigger="hover"
                  content="组件代码量, 目前代码量写死"
                >
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column prop="total" min-width="121">
              <template #header>
                <span style="margin-right: 5px">总计</span>
                <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  content="总计 = 新增 + 移植 * 0.3"
                >
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column label="总计" align="center">
            <el-table-column prop="target" label="目标" min-width="141">
              <template #header>
                <span style="margin-right: 5px">目标</span>
                <el-popover placement="top-start" width="800" trigger="hover">
                  <div v-html="targetPopoverContent" />
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column prop="actual" label="实际" min-width="141">
              <template #header>
                <span style="margin-right: 5px">实际</span>
                <el-popover placement="top-start" width="400" trigger="hover">
                  <div v-html="actualPopoverContent" />
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>

              <template slot-scope="{row}">
                <span :class="calcRenderData(row.actual, row.actual)">{{ row.actual }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="need" label="还需" min-width="141">
              <template #header>
                <span style="margin-right: 5px">还需</span>
                <el-popover placement="top-start" width="800" trigger="hover">
                  <div v-html="needPopoverContent" />
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column prop="expected" label="预期" min-width="141">
              <template #header>
                <span style="margin-right: 5px">预期</span>
                <el-popover placement="top-start" width="400" trigger="hover">
                  <div v-html="expectedPopoverContent" />
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>

              <template slot-scope="{row}">
                <span :class="calcRenderData(row.actual, row.expected)">{{ row.expected }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="deviation" label="偏差" min-width="141">
              <template #header>
                <span style="margin-right: 5px">偏差</span>
                <el-popover
                  placement="top-start"
                  width="170"
                  trigger="hover"
                  content="偏差 = 预期 - 目标"
                >
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>

        <!-- 表格二 -->
        <el-table
          v-loading="listLoading"
          border
          fit
          highlight-current-row
          :data="tableData"
          style="width: 100%; margin-top: 10px;"
          row-key="id"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="type" label="类型" min-width="220" fixed show-overflow-tooltip />
          <el-table-column label="代码量" align="center">
            <el-table-column prop="add" label="新增" min-width="94" />
            <el-table-column prop="transplant" label="移植" min-width="94" />
            <el-table-column prop="total" label="总计" min-width="94" />
          </el-table-column>

          <el-table-column label="总计" align="center">
            <el-table-column prop="target" min-width="141">
              <template #header>
                <span style="margin-right: 5px">目标</span>
                <el-popover placement="top-start" width="800" trigger="hover">
                  <div v-html="stageTargetPopoverContent" />
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column prop="actual" label="实际" min-width="94">
              <template slot-scope="{row}">
                <span :class="calcRenderData(row.actual, row.actual)">{{ row.actual }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="need" label="还需" min-width="94" />

            <el-table-column prop="expected" label="预期" min-width="94">
              <template slot-scope="{row}">
                <span :class="calcRenderData(row.expected, row.expected)">{{ row.expected }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="deviation" label="偏差" min-width="94" />
          </el-table-column>

          <el-table-column label="需求" align="center">
            <el-table-column prop="target" label="目标" min-width="141" />

            <el-table-column prop="actual" label="实际" min-width="94">
              <template slot-scope="{row}">
                <span :class="calcRenderData(row.actual, row.actual)">{{ row.actual }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="need" label="还需" min-width="94" />
            <el-table-column prop="expected" label="预期" min-width="94">
              <template slot-scope="{row}">
                <span :class="calcRenderData(row.expected, row.expected)">{{ row.expected }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="deviation" label="偏差" min-width="94" />
          </el-table-column>

          <el-table-column label="设计" align="center">
            <el-table-column prop="target" label="目标" min-width="141" />

            <el-table-column prop="actual" label="实际" min-width="94">
              <template slot-scope="{row}">
                <span :class="calcRenderData(row.actual, row.actual)">{{ row.actual }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="need" label="还需" min-width="94" />

            <el-table-column prop="expected" label="预期" min-width="94">
              <template slot-scope="{row}">
                <span :class="calcRenderData(row.expected, row.expected)">{{ row.expected }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="deviation" label="偏差" min-width="94" />
          </el-table-column>

          <el-table-column label="准入" align="center">
            <el-table-column prop="target" label="目标" min-width="141" />

            <el-table-column prop="actual" label="实际" min-width="94">
              <template slot-scope="{row}">
                <span :class="calcRenderData(row.actual, row.actual)">{{ row.actual }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="need" label="还需" min-width="94" />

            <el-table-column prop="expected" label="预期" min-width="94">
              <template slot-scope="{row}">
                <span :class="calcRenderData(row.expected, row.expected)">{{ row.expected }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="deviation" label="偏差" min-width="94" />
          </el-table-column>

          <el-table-column label="首轮" align="center">
            <el-table-column prop="target" label="目标" min-width="141" />

            <el-table-column prop="actual" label="实际" min-width="94">
              <template slot-scope="{row}">
                <span :class="calcRenderData(row.actual, row.actual)">{{ row.actual }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="need" label="还需" min-width="94" />

            <el-table-column prop="expected" label="预期" min-width="94">
              <template slot-scope="{row}">
                <span :class="calcRenderData(row.expected, row.expected)">{{ row.expected }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="deviation" label="偏差" min-width="94" />
          </el-table-column>

          <el-table-column label="次轮" align="center">
            <el-table-column prop="target" label="目标" min-width="141" />

            <el-table-column prop="actual" label="实际" min-width="94">
              <template slot-scope="{row}">
                <span :class="calcRenderData(row.actual, row.actual)">{{ row.actual }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="need" label="还需" min-width="94" />

            <el-table-column prop="expected" label="预期" min-width="94">
              <template slot-scope="{row}">
                <span :class="calcRenderData(row.expected, row.expected)">{{ row.expected }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="deviation" label="偏差" min-width="94" />
          </el-table-column>

          <el-table-column label="回归" align="center">
            <el-table-column prop="target" label="目标" min-width="141" />

            <el-table-column prop="actual" label="实际" min-width="94">
              <template slot-scope="{row}">
                <span :class="calcRenderData(row.actual, row.actual)">{{ row.actual }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="need" label="还需" min-width="94" />

            <el-table-column prop="expected" label="预期" min-width="94">
              <template slot-scope="{row}">
                <span :class="calcRenderData(row.expected, row.expected)">{{ row.expected }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="deviation" label="偏差" min-width="94" />
          </el-table-column>

          <el-table-column label="试点" align="center">
            <el-table-column prop="target" label="目标" min-width="141" />

            <el-table-column prop="actual" label="实际" min-width="94">
              <template slot-scope="{row}">
                <span :class="calcRenderData(row.actual, row.actual)">{{ row.actual }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="need" label="还需" min-width="94" />

            <el-table-column prop="expected" label="预期" min-width="94">
              <template slot-scope="{row}">
                <span :class="calcRenderData(row.expected, row.expected)">{{ row.expected }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="deviation" label="偏差" min-width="94" />
          </el-table-column>
        </el-table>
      </template>
    </card>

    <!-- 工序成本卡片 -->
    <card title="工序成本" class="card">
      <template #buttons>
        <el-button type="primary">导出工序成本统计</el-button>
      </template>

      <template #content>
        <el-table
          border
          fit
          highlight-current-row
          :data="tableData"
          style="width: 100%; margin-top: 10px;"
          row-key="id"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="type" min-width="220" fixed show-overflow-tooltip>
            <template #header>
              <span style="margin-right: 5px">工序</span>
              <el-popover
                placement="top-start"
                width="325"
                trigger="hover"
                content="根据资源任务名称三级标签获取工序进行统计"
              >
                <i slot="reference" class="el-icon-question" />
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column label="12.5PL1" align="center">
            <el-table-column prop="add" label="代码量" min-width="164" />

            <el-table-column prop="add" label="目标系数" min-width="164">
              <template #header>
                <span style="margin-right: 5px">目标系数</span>
                <el-popover placement="top-start" width="200" trigger="hover" content="根据基线算出，目前写死">
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column prop="add" label="目标资源" min-width="164">
              <template #header>
                <span style="margin-right: 5px">目标资源</span>
                <el-popover placement="top-start" width="200" trigger="hover" content="根据基线算出，目前写死">
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column prop="add" label="代码效率" min-width="164">
              <template #header>
                <span style="margin-right: 5px">代码效率</span>
                <el-popover
                  placement="top-start"
                  width="230"
                  trigger="hover"
                  content="代码效率 = 目标资源 / 代码量"
                >
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column prop="add" label="工序效率" min-width="164">
              <template #header>
                <span style="margin-right: 5px">工序效率</span>
                <el-popover
                  placement="top-start"
                  width="240"
                  trigger="hover"
                  content="工序效率 = 目标资源 / 目标数量"
                >
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column prop="add" label="实际数量" min-width="164">
              <template #header>
                <span style="margin-right: 5px">工序效率</span>
                <el-popover
                  placement="top-start"
                  width="665"
                  trigger="hover"
                  content="根据实际所得，目前只有5个工序有统计（需求分析、用例设计、bug处理、手工执行、自动化执行）"
                >
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column prop="add" label="实际工序效率" min-width="164">
              <template #header>
                <span style="margin-right: 5px">实际工序效率</span>
                <el-popover
                  placement="top-start"
                  width="500"
                  trigger="hover"
                  content="实际工序效率 = 实际资源 / 实际数量，如果实际数量为0，则除以目标数量"
                >
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column prop="add" label="实际资源" min-width="164px">
              <template #header>
                <span style="margin-right: 5px; min-width: 164px;">实际资源</span>
                <el-popover
                  placement="top-start"
                  width="480"
                  trigger="hover"
                  content="根据实际人员填写统计，因为四舍五入，可能和域维度成本有细微误差"
                >
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>

              <!-- 主体内容 -->
              <template slot-scope="{row}">
                <span :class="calcRenderData(row.add, row.add)">{{ row.add }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="add" label="实际代码效率" min-width="164">
              <template #header>
                <span style="margin-right: 5px">实际代码效率</span>
                <el-popover
                  placement="top-start"
                  width="260"
                  trigger="hover"
                  content="实际代码效率 = 实际资源 / 代码量"
                >
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column prop="add" label="偏差资源" min-width="164">
              <template #header>
                <span style="margin-right: 5px">偏差资源</span>
                <el-popover
                  placement="top-start"
                  width="240"
                  trigger="hover"
                  content="偏差资源 = 实际资源 - 目标资源"
                >
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column prop="add" label="预期总资源" min-width="164">
              <template #header>
                <span style="margin-right: 5px">预期总资源</span>
                <el-popover
                  placement="top-start"
                  width="490"
                  trigger="hover"
                  content="如果实际资源大于目标资源，则实际资源为预期总资源，反之为目标资源"
                >
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column label="12.X基线" align="center">
            <el-table-column prop="add" label="代码量" min-width="164" />
            <el-table-column prop="add" label="资源投入" min-width="164" />
            <el-table-column prop="add" label="产出个数" min-width="164" />
            <el-table-column prop="add" label="工序效率" min-width="478" />
          </el-table-column>
        </el-table>
      </template>
    </card>
  </div>
</template>

<script>
import Card from '@/components/Card/index'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    Card
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          type: '合计',
          add: 314.1,
          transplant: 153.7,
          total: 360.2,
          target: '4455.4 / 2227.7',
          actual: 3376,
          need: 1357.5,
          expected: 4733.4,
          deviation: 278
        },
        {
          id: 2,
          type: '主干',
          add: 314.1,
          transplant: 153.7,
          total: 360.2,
          target: '4455.4 / 2227.7',
          actual: 3376,
          need: 1357.5,
          expected: 4733.4,
          deviation: 278,
          children: [
            {
              id: 21,
              type: '主干-业务域',
              add: 314.1,
              transplant: 153.7,
              total: 360.2,
              target: '4455.4 / 2227.7',
              actual: 3376,
              need: 1357.5,
              expected: 4733.4,
              deviation: 278,
              children: [
                {
                  id: 221,
                  type: '业务域-OM域',
                  add: 314.1,
                  transplant: 153.7,
                  total: 360.2,
                  target: '4455.4 / 2227.7',
                  actual: 3376,
                  need: 1357.5,
                  expected: 4733.4,
                  deviation: 278
                },
                {
                  id: 222,
                  type: '业务域-二层域',
                  add: 314.1,
                  transplant: 153.7,
                  total: 360.2,
                  target: '4455.4 / 2227.7',
                  actual: 3376,
                  need: 1357.5,
                  expected: 4733.4,
                  deviation: 278
                },
                {
                  id: 223,
                  type: '业务域-系统品质域',
                  add: 314.1,
                  transplant: 153.7,
                  total: 360.2,
                  target: '4455.4 / 2227.7',
                  actual: 3376,
                  need: 1357.5,
                  expected: 4733.4,
                  deviation: 278
                },
                {
                  id: 224,
                  type: '业务域-架构业务域',
                  add: 314.1,
                  transplant: 153.7,
                  total: 360.2,
                  target: '4455.4 / 2227.7',
                  actual: 3376,
                  need: 1357.5,
                  expected: 4733.4,
                  deviation: 278
                },
                {
                  id: 225,
                  type: '业务域-DC域',
                  add: 314.1,
                  transplant: 153.7,
                  total: 360.2,
                  target: '4455.4 / 2227.7',
                  actual: 3376,
                  need: 1357.5,
                  expected: 4733.4,
                  deviation: 278
                },
                {
                  id: 226,
                  type: '业务域-三层域',
                  add: 314.1,
                  transplant: 153.7,
                  total: 360.2,
                  target: '4455.4 / 2227.7',
                  actual: 3376,
                  need: 1357.5,
                  expected: 4733.4,
                  deviation: 278
                },
                {
                  id: 227,
                  type: '业务域-MPLS域',
                  add: 314.1,
                  transplant: 153.7,
                  total: 360.2,
                  target: '4455.4 / 2227.7',
                  actual: 3376,
                  need: 1357.5,
                  expected: 4733.4,
                  deviation: 278
                },
                {
                  id: 228,
                  type: '业务域-架构框架域',
                  add: 314.1,
                  transplant: 153.7,
                  total: 360.2,
                  target: '4455.4 / 2227.7',
                  actual: 3376,
                  need: 1357.5,
                  expected: 4733.4,
                  deviation: 278
                },
                {
                  id: 229,
                  type: '业务域-应用域',
                  add: 314.1,
                  transplant: 153.7,
                  total: 360.2,
                  target: '4455.4 / 2227.7',
                  actual: 3376,
                  need: 1357.5,
                  expected: 4733.4,
                  deviation: 278
                },
                {
                  id: 2221,
                  type: '业务域-安全认证域',
                  add: 314.1,
                  transplant: 153.7,
                  total: 360.2,
                  target: '4455.4 / 2227.7',
                  actual: 3376,
                  need: 1357.5,
                  expected: 4733.4,
                  deviation: 278
                },
                {
                  id: 2222,
                  type: '业务域-系统测试域',
                  add: 314.1,
                  transplant: 153.7,
                  total: 360.2,
                  target: '4455.4 / 2227.7',
                  actual: 3376,
                  need: 1357.5,
                  expected: 4733.4,
                  deviation: 278
                },
                {
                  id: 2223,
                  type: '业务域-VPN域',
                  add: 314.1,
                  transplant: 153.7,
                  total: 360.2,
                  target: '4455.4 / 2227.7',
                  actual: 3376,
                  need: 1357.5,
                  expected: 4733.4,
                  deviation: 278
                }
              ]
            },
            {
              id: 22,
              type: '主干-其他',
              add: 314.1,
              transplant: 153.7,
              total: 360.2,
              target: '4455.4 / 2227.7',
              actual: 3376,
              need: 1357.5,
              expected: 4733.4,
              deviation: 278
            }
          ]
        },
        {
          id: 3,
          type: '项目组件',
          add: 314.1,
          transplant: 153.7,
          total: 360.2,
          target: '4455.4 / 2227.7',
          actual: 3376,
          need: 1357.5,
          expected: 4733.4,
          deviation: 278
        },
        {
          id: 4,
          type: '技术项目',
          add: 314.1,
          transplant: 153.7,
          total: 360.2,
          target: '4455.4 / 2227.7',
          actual: 3376,
          need: 1357.5,
          expected: 4733.4,
          deviation: 278
        },
        {
          id: 5,
          type: '项目管理',
          add: 314.1,
          transplant: 153.7,
          total: 360.2,
          target: '4455.4 / 2227.7',
          actual: 3376,
          need: 1357.5,
          expected: 4733.4,
          deviation: 278
        },
        {
          id: 6,
          type: '自动化',
          add: 314.1,
          transplant: 153.7,
          total: 360.2,
          target: '4455.4 / 2227.7',
          actual: 3376,
          need: 1357.5,
          expected: 4733.4,
          deviation: 278
        },
        {
          id: 7,
          type: '专业改进',
          add: 314.1,
          transplant: 153.7,
          total: 360.2,
          target: '4455.4 / 2227.7',
          actual: 3376,
          need: 1357.5,
          expected: 4733.4,
          deviation: 278
        },
        {
          id: 8,
          type: '验收测试',
          add: 314.1,
          transplant: 153.7,
          total: 360.2,
          target: '4455.4 / 2227.7',
          actual: 3376,
          need: 1357.5,
          expected: 4733.4,
          deviation: 278
        }
      ],
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
                <li>首轮测试系数=0.165；次轮测试系数=0.155；回归系数=0.15；试点系数=0.011</li>
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
                <li>首轮测试系数=0.165；次轮测试系数=0.155；回归系数=0.15；试点系数=0.011</li>
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
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const timer = setTimeout(() => {
        this.listLoading = false
        clearTimeout(timer)
      }, 3000)
    },
    renderHeader(h, { column }) {
      return h('div', [
        h('span', column.label),
        h('i', {
          class: 'el-icon-question',
          style: 'color: #686869; margin-left: 5px; font-size: 18px;'
        })
      ])
    },
    // 合并列的方法
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return [1, 2]
      } else if (columnIndex === 1) {
        return [0, 0]
      }
    },
    // 计算渲染数据的类
    calcRenderData(text, record) {
      // value 是确定值， record 是记录值，确定所在的范围
      const totalTarget =
        record.target_summary === undefined ? 0 : Math.round(record.target_summary * 10) / 10
      const totalTargetHalf =
        record.target_summary === undefined ? 0 : Math.round(record.target_summary * 0.5 * 10) / 10
      const value = text === undefined ? 0 : Math.round(text * 10) / 10

      if (value <= totalTargetHalf) {
        return 'normal'
      } else if (totalTargetHalf < value && value <= totalTarget) {
        return 'warning'
      } else {
        return 'error'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.warning {
  color: orange;
  font-weight: bold;
  text-decoration: underline;
}

.error {
  color: red;
  font-weight: bold;
  text-decoration: underline;
}

.normal {
  text-decoration: underline;
}
</style>
