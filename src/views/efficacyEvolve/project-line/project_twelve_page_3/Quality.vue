<template>
  <div class="quality">
    <card title="执行">
      <!-- 按钮 -->
      <template #buttons>
        <el-button type="primary">BUG解决</el-button>
      </template>

      <!-- 主体区域 -->
      <template #content>
        <!-- 第一个表格区域 -->
        <div class="first-table">
          <div class="container">
            <!-- radio切换 -->
            <el-radio-group v-model="implementStageFirst" size="small">
              <el-radio-button
                v-for="(item, index) in implementStageTypeListFirst"
                :key="index"
                :label="item.stage"
              />
            </el-radio-group>

            <!-- select -->
            <el-select v-model="executionSelectVal" multiple collapse-tags placeholder="请选择">
              <el-option
                v-for="(item, index) in exectionSelectOptions"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>

          <!-- 表格 -->
          <el-table
            :data="tableData"
            style="width: 100%; margin-bottom: 30px;"
            border
            :header-cell-style="{'background-color': '#FAFAFA', 'text-align': 'center' }"
            row-key="id"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            fit
          >
            <el-table-column prop="t1" label="类型" fixed width="100" />
            <el-table-column prop="t2" label="代码量" fixed min-width="89" align="center" />
            <el-table-column
              v-for="(item, index) in desginTableTitleList"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              align="center"
            />
          </el-table>
        </div>

        <!-- 第二个表格区域 -->
        <div class="second-table">
          <div class="container">
            <!-- radio切换 -->
            <el-radio-group v-model="implementStageSecond" size="small">
              <el-radio-button
                v-for="(item, index) in implementStageTypeListSecond"
                :key="index"
                :label="item.stage"
              />
            </el-radio-group>

            <!-- select -->
            <el-select v-model="executionSelectVal2" multiple collapse-tags placeholder="请选择">
              <el-option
                v-for="(item, index) in exectionSelectOptions2"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>

          <!-- 表格 -->
          <el-table
            :data="tableData"
            style="width: 100%; margin-bottom: 10px; margin-top: 10px;"
            border
            :header-cell-style="{'background-color': '#FAFAFA', 'text-align': 'center' }"
            row-key="id"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          >
            <el-table-column prop="t1" label="类型" fixed width="100" />
            <el-table-column prop="t2" label="代码量" fixed min-width="89" align="center" />
            <el-table-column
              v-for="(item, index) in desginTableTitleList2"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              align="center"
            />
          </el-table>
        </div>
      </template>
    </card>
  </div>
</template>

<script>
import Card from '@/components/Card/index'

// 导入配置项
import {
  executionCardSelectList,
  executionCardSelectDefaultList,
  executionCardTableTitleList
} from './options'

export default {
  components: {
    Card
  },
  data() {
    return {
      implementStageFirst: '整体',
      implementStageTypeListFirst: [{ stage: '整体' }, { stage: '主干' }, { stage: '组件' }],
      implementStageSecond: '阶段一',
      implementStageTypeListSecond: [{ stage: '阶段一' }, { stage: '阶段二' }],
      tableData: [
        {
          id: 1,
          t1: '合计',
          t2: 332.66,
          t3: 264,
          t4: 0.82,
          t5: 173,
          t6: 0.54,
          t7: 91,
          t8: 0.28,
          t9: 0,
          t10: 0,
          t11: 0,
          t12: 0,
          t13: 321,
          t14: 16,
          t15: 0.05,
          t16: 0,
          t17: 0
        },
        {
          id: 2,
          t1: '数据面',
          t2: 332.66,
          t3: 264,
          t4: 0.82,
          t5: 173,
          t6: 0.54,
          t7: 91,
          t8: 0.28,
          t9: 0,
          t10: 0,
          t11: 0,
          t12: 0,
          t13: 321,
          t14: 16,
          t15: 0.05,
          t16: 0,
          t17: 0,
          children: [
            {
              id: 21,
              t1: '数据面-非遗留且无归属',
              t2: 332.66,
              t3: 264,
              t4: 0.82,
              t5: 173,
              t6: 0.54,
              t7: 91,
              t8: 0.28,
              t9: 0,
              t10: 0,
              t11: 0,
              t12: 0,
              t13: 321,
              t14: 16,
              t15: 0.05,
              t16: 0,
              t17: 0
            },
            {
              id: 22,
              t1: '数据面-工作包',
              t2: 332.66,
              t3: 264,
              t4: 0.82,
              t5: 173,
              t6: 0.54,
              t7: 91,
              t8: 0.28,
              t9: 0,
              t10: 0,
              t11: 0,
              t12: 0,
              t13: 321,
              t14: 16,
              t15: 0.05,
              t16: 0,
              t17: 0
            },
            {
              id: 23,
              t1: '数据面-遗留',
              t2: 332.66,
              t3: 264,
              t4: 0.82,
              t5: 173,
              t6: 0.54,
              t7: 91,
              t8: 0.28,
              t9: 0,
              t10: 0,
              t11: 0,
              t12: 0,
              t13: 321,
              t14: 16,
              t15: 0.05,
              t16: 0,
              t17: 0
            }
          ]
        },
        {
          id: 3,
          t1: '控制面',
          t2: 332.66,
          t3: 264,
          t4: 0.82,
          t5: 173,
          t6: 0.54,
          t7: 91,
          t8: 0.28,
          t9: 0,
          t10: 0,
          t11: 0,
          t12: 0,
          t13: 321,
          t14: 16,
          t15: 0.05,
          t16: 0,
          t17: 0,
          children: [
            {
              id: 31,
              t1: '控制面-非遗留且无归属',
              t2: 332.66,
              t3: 264,
              t4: 0.82,
              t5: 173,
              t6: 0.54,
              t7: 91,
              t8: 0.28,
              t9: 0,
              t10: 0,
              t11: 0,
              t12: 0,
              t13: 321,
              t14: 16,
              t15: 0.05,
              t16: 0,
              t17: 0
            },
            {
              id: 32,
              t1: '控制面-工作包',
              t2: 332.66,
              t3: 264,
              t4: 0.82,
              t5: 173,
              t6: 0.54,
              t7: 91,
              t8: 0.28,
              t9: 0,
              t10: 0,
              t11: 0,
              t12: 0,
              t13: 321,
              t14: 16,
              t15: 0.05,
              t16: 0,
              t17: 0
            },
            {
              id: 33,
              t1: '控制面-遗留',
              t2: 332.66,
              t3: 264,
              t4: 0.82,
              t5: 173,
              t6: 0.54,
              t7: 91,
              t8: 0.28,
              t9: 0,
              t10: 0,
              t11: 0,
              t12: 0,
              t13: 321,
              t14: 16,
              t15: 0.05,
              t16: 0,
              t17: 0
            }
          ]
        },
        {
          id: 4,
          t1: '其他',
          t2: 332.66,
          t3: 264,
          t4: 0.82,
          t5: 173,
          t6: 0.54,
          t7: 91,
          t8: 0.28,
          t9: 0,
          t10: 0,
          t11: 0,
          t12: 0,
          t13: 321,
          t14: 16,
          t15: 0.05,
          t16: 0,
          t17: 0,
          children: [
            {
              id: 41,
              t1: '其他-测试名下提交',
              t2: 332.66,
              t3: 264,
              t4: 0.82,
              t5: 173,
              t6: 0.54,
              t7: 91,
              t8: 0.28,
              t9: 0,
              t10: 0,
              t11: 0,
              t12: 0,
              t13: 321,
              t14: 16,
              t15: 0.05,
              t16: 0,
              t17: 0
            },
            {
              id: 42,
              t1: '其他-工作包删除',
              t2: 332.66,
              t3: 264,
              t4: 0.82,
              t5: 173,
              t6: 0.54,
              t7: 91,
              t8: 0.28,
              t9: 0,
              t10: 0,
              t11: 0,
              t12: 0,
              t13: 321,
              t14: 16,
              t15: 0.05,
              t16: 0,
              t17: 0
            },
            {
              id: 43,
              t1: '其他-工作包为空',
              t2: 332.66,
              t3: 264,
              t4: 0.82,
              t5: 173,
              t6: 0.54,
              t7: 91,
              t8: 0.28,
              t9: 0,
              t10: 0,
              t11: 0,
              t12: 0,
              t13: 321,
              t14: 16,
              t15: 0.05,
              t16: 0,
              t17: 0
            }
          ]
        }
      ],
      key: 1,
      executionSelectVal: executionCardSelectDefaultList, // 表格一的 select 选中列表
      exectionSelectOptions: executionCardSelectList, // 表格一的 select 列表
      desginTableTitleList: executionCardTableTitleList, // 表格一的显示列表
      executionSelectVal2: executionCardSelectDefaultList,
      exectionSelectOptions2: executionCardSelectList, // 表格二的 select 列表
      desginTableTitleList2: executionCardTableTitleList // 表格二的显示列表
    }
  },
  watch: {
    executionSelectVal(valArr) {
      this.desginTableTitleList = executionCardTableTitleList.filter(
        (i) => valArr.indexOf(i.label) >= 0
      )
      this.key = this.key + 1
    },
    executionSelectVal2(valArr) {
      this.desginTableTitleList2 = executionCardTableTitleList.filter(
        (i) => valArr.indexOf(i.label) >= 0
      )
      this.key = this.key + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
