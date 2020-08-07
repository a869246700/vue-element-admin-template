<template>
  <div class="cost">
    <!-- 项目成本卡片 -->
    <card title="项目成本">
      <template #buttons>
        <el-button type="primary">导出资源投入明细</el-button>
        <el-button type="primary">阶段调偏</el-button>
      </template>

      <template #content>
        <el-table
          :data="tableData"
          style="width: 100%"
          row-key="id"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="type" label="类型" width="380" fixed :render-header="renderHeader" />
          <el-table-column label="代码量">
            <el-table-column prop="add" label="新增" width="121" />
            <el-table-column prop="transplant" label="移植" width="121">
              <template #header>
                <span style="margin-right: 5px">移植</span>
                <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  content="组件代码量, 目前代码量写死"
                >
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column prop="total" width="121">
              <template #header>
                <span style="margin-right: 5px">总计</span>
                <el-popover
                  placement="top-start"
                  width="250"
                  trigger="hover"
                  content="总计 = 新增 + 移植 * 0.3"
                >
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="总计">
            <el-table-column prop="target" label="目标" width="152">
              <template #header>
                <span style="margin-right: 5px">目标</span>
                <el-popover
                  placement="top-start"
                  width="250"
                  trigger="hover"
                  content="总计 = 新增 + 移植 * 0.3"
                >
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="actual" label="实际" width="152" />
            <el-table-column prop="need" label="还需" width="152" />
            <el-table-column prop="expected" label="预期" width="152" />
            <el-table-column prop="deviation" label="偏差" width="152" />
          </el-table-column>
        </el-table>

        <el-popover
          placement="top-start"
          title="标题"
          width="200"
          trigger="hover"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        >
          <i slot="reference" class="el-icon-question" />
        </el-popover>
        <!-- 表格二 -->
        <!-- <el-table
          :data="tableData"
          style="width: 100%; margin-top: 10px;"
          row-key="id"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="type" label="类型" width="380" fixed />
          <el-table-column label="代码量">
            <el-table-column prop="add" label="新增" width="121" />
            <el-table-column prop="transplant" label="移植" width="121" />
            <el-table-column prop="total" label="总计" width="121" />
          </el-table-column>
          <el-table-column label="总计">
            <el-table-column prop="target" label="目标" width="152" />
            <el-table-column prop="actual" label="实际" width="152" />
            <el-table-column prop="need" label="还需" width="152" />
            <el-table-column prop="expected" label="预期" width="152" />
            <el-table-column prop="deviation" label="偏差" width="152" />
          </el-table-column>
          <el-table-column label="需求">
            <el-table-column prop="target" label="目标" width="152" />
            <el-table-column prop="actual" label="实际" width="152" />
            <el-table-column prop="need" label="还需" width="152" />
            <el-table-column prop="expected" label="预期" width="152" />
            <el-table-column prop="deviation" label="偏差" width="152" />
          </el-table-column>
          <el-table-column label="设计">
            <el-table-column prop="target" label="目标" width="152" />
            <el-table-column prop="actual" label="实际" width="152" />
            <el-table-column prop="need" label="还需" width="152" />
            <el-table-column prop="expected" label="预期" width="152" />
            <el-table-column prop="deviation" label="偏差" width="152" />
          </el-table-column>
          <el-table-column label="准入">
            <el-table-column prop="target" label="目标" width="152" />
            <el-table-column prop="actual" label="实际" width="152" />
            <el-table-column prop="need" label="还需" width="152" />
            <el-table-column prop="expected" label="预期" width="152" />
            <el-table-column prop="deviation" label="偏差" width="152" />
          </el-table-column>
          <el-table-column label="首轮">
            <el-table-column prop="target" label="目标" width="152" />
            <el-table-column prop="actual" label="实际" width="152" />
            <el-table-column prop="need" label="还需" width="152" />
            <el-table-column prop="expected" label="预期" width="152" />
            <el-table-column prop="deviation" label="偏差" width="152" />
          </el-table-column>
          <el-table-column label="次轮">
            <el-table-column prop="target" label="目标" width="152" />
            <el-table-column prop="actual" label="实际" width="152" />
            <el-table-column prop="need" label="还需" width="152" />
            <el-table-column prop="expected" label="预期" width="152" />
            <el-table-column prop="deviation" label="偏差" width="152" />
          </el-table-column>
          <el-table-column label="回归">
            <el-table-column prop="target" label="目标" width="152" />
            <el-table-column prop="actual" label="实际" width="152" />
            <el-table-column prop="need" label="还需" width="152" />
            <el-table-column prop="expected" label="预期" width="152" />
            <el-table-column prop="deviation" label="偏差" width="152" />
          </el-table-column>
          <el-table-column label="试点">
            <el-table-column prop="target" label="目标" width="152" />
            <el-table-column prop="actual" label="实际" width="152" />
            <el-table-column prop="need" label="还需" width="152" />
            <el-table-column prop="expected" label="预期" width="152" />
            <el-table-column prop="deviation" label="偏差" width="152" />
          </el-table-column>
        </el-table>-->
      </template>
    </card>

    <!-- 工序成本卡片 -->
    <card title="工序成本">
      <template #buttons>
        <el-button type="primary">导出工序成本统计</el-button>
      </template>
    </card>
  </div>
</template>

<script>
import Card from '@/components/Card/index'

export default {
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
      ]
    }
  },
  methods: {
    renderHeader(h, { column }) {
      return h('div', [
        h('span', column.label),
        h('i', {
          class: 'el-icon-question',
          style: 'color: #686869; margin-left: 5px; font-size: 18px;'
        })
      ])
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
