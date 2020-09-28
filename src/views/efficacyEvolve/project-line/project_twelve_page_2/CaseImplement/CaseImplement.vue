<template>
  <!-- 用例执行统计卡片 -->
  <el-dialog
    :title="product_name + '芯片用例执行统计'"
    :visible.sync="outerDialogVisible"
    width="70%"
    lock-scroll
  >
    <el-card>
      <el-row :gutter="20" style="margin-bottom: 20px;">
        <!--  -->
        <el-col
          :xs="{span: 24}"
          :sm="{span: 24}"
          :md="{span: 15}"
          :lg="{span: 15}"
          :xl="{span: 15}"
        >
          <el-radio-group v-model="iStage" size="small" @change="handleTypeChange">
            <el-radio-button key="9" label="汇总" />
            <el-radio-button
              v-for="(item, index) in implementStageTypeList"
              :key="index"
              :label="item.stage"
            />
          </el-radio-group>
        </el-col>

        <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 9}" :lg="{span: 9}" :xl="{span: 9}">
          <el-radio-group v-model="implementType" size="small" @change="handleTypeChange">
            <el-radio-button label="手工">手工</el-radio-button>
            <el-radio-button label="自动化">自动化</el-radio-button>
            <el-radio-button label>全部</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>

      <el-table
        v-loading="outerTableLoading"
        :data="outerData"
        border
        style="width: 100%;"
        :header-cell-style="{'background-color': '#FAFAFA' }"
        highlight-current-row
      >
        <el-table-column
          v-for="item in tableOptions"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span
              v-if="item.prop === 'system'"
              class="title"
              @click="handleItemClick(row)"
            >{{ row.system }}</span>
            <span v-else>{{ row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div v-if="outerTotal >= outerPageInfo.pageSize" class="pagination">
        <pagination
          :total="outerTotal"
          :page="outerPageInfo.pageNum"
          :limit="outerPageInfo.pageSize"
          :auto-scroll="false"
          @pagination="handleOuterPageUpdate"
        />
      </div>
    </el-card>

    <el-dialog
      :title="`${innerProductName}芯片${innerCurrentSystem}用例执行统计`"
      :visible.sync="innerDialogVisible"
      append-to-body
      lock-scroll
      width="70%"
    >
      <el-radio-group v-model="innerImplementStage" size="small" @change="handleInnerTypeChange">
        <el-radio-button key="9" label="汇总" />
        <el-radio-button
          v-for="(item, index) in implementStageTypeList"
          :key="index"
          :label="item.stage"
        />
      </el-radio-group>

      <el-table
        v-loading="innerTableLoading"
        :data="innerData"
        border
        style="width: 100%; margin-top: 20px;"
        :header-cell-style="{'background-color': '#FAFAFA' }"
        fit
        highlight-current-row
      >
        <el-table-column
          v-for="item in innerTableOptions"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          show-overflow-tooltip
        />
      </el-table>

      <div v-if="innerTotal >= innerPageInfo.pageSize" class="pagination">
        <pagination
          :total="innerTotal"
          :page="innerPageInfo.pageNum"
          :limit="innerPageInfo.pageSize"
          :auto-scroll="false"
          @pagination="handleInnerPageUpdate"
        />
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination/index'

import request from '@/services/request'

export default {
  components: {
    Pagination
  },
  props: {
    implementStageTypeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      product_name: undefined,
      implementType: '手工', // 测试类型
      iStage: '', // 阶段类型
      outerTableData: [], // 外部表格数据
      outerTableLoading: false, // 外部表格加载状态
      isSpec: 0, // 是否是 spec 的点击事件
      outerDialogVisible: false, // 控制外部对话框的显示与隐藏
      outerPageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      outerTotal: 0,
      innerPageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      innerTotal: 0,
      // ----------内部----------
      innerDialogVisible: false, // 控制内部对话框的显示与隐藏
      innerTableLoading: false,
      innerImplementStage: undefined, // 内部表格当前 stage
      innerTableData: [], // 内部表格数据
      innerProductName: undefined,
      innerCurrentSystem: undefined
    }
  },
  computed: {
    iStageComputed() {
      return this.implementStage
    },
    outerData() {
      const page = this.outerPageInfo.pageNum
      const limit = this.outerPageInfo.pageSize
      return this.outerTableData.slice((page - 1) * limit, page * limit)
    },
    innerData() {
      const page = this.innerPageInfo.pageNum
      const limit = this.innerPageInfo.pageSize

      return this.innerTableData.slice((page - 1) * limit, page * limit)
    },
    // 表单配置项
    tableOptions() {
      return [
        {
          prop: 'product_name',
          label: '芯片平台',
          minWidth: 120,
          fixed: 'left'
        },
        {
          prop: 'system',
          label: '归属测试域',
          minWidth: 120
        },
        {
          prop: 'charge',
          label: '负责人',
          minWidth: 78
        },
        {
          prop: 'type',
          label: '任务类型',
          minWidth: 78
        },
        {
          prop: 'all_num',
          label: '用例总数',
          minWidth: 78
        },
        {
          prop: 'exe_num',
          label: '已执行',
          minWidth: 78
        },
        {
          prop: 'exe_rate',
          label: '执行率',
          minWidth: 70
        },
        {
          prop: 'skip_num',
          label: 'SKIP',
          minWidth: 70
        },
        {
          prop: 'pass_num',
          label: 'PASS数',
          minWidth: 73
        },
        {
          prop: 'pass_rate',
          label: 'PASS率',
          minWidth: 73
        },
        {
          prop: 'fail_rate',
          label: 'FAIL率',
          minWidth: 73
        },
        {
          prop: 'day_all_num',
          label: '今日执行总数',
          minWidth: 105
        },
        {
          prop: 'day_pass_num',
          label: '今日PASS总数',
          minWidth: 116
        },
        {
          prop: 'tomorrow_num',
          label: '计划明日执行个数',
          minWidth: 137
        },
        {
          prop: 'exe_day_num',
          label: '还需执行天数',
          minWidth: 105
        }
      ]
    },
    // 内部表单配置项
    innerTableOptions() {
      return [
        {
          prop: 'product_name',
          label: '芯片平台',
          minWidth: 120
        },
        {
          prop: 'system',
          label: '归属测试域',
          minWidth: 120
        },
        {
          prop: 'type',
          label: '用例属性',
          minWidth: 120
        },
        {
          prop: 'all_num',
          label: '用例总数',
          minWidth: 78
        },
        {
          prop: 'exe_num',
          label: '已执行',
          minWidth: 78
        },
        {
          prop: 'exe_rate',
          label: '执行率',
          minWidth: 73
        },
        {
          prop: 'skip_num',
          label: 'SKIP',
          minWidth: 73
        },
        {
          prop: 'pass_num',
          label: 'PASS数',
          minWidth: 73
        },
        {
          prop: 'pass_rate',
          label: 'PASS率',
          minWidth: 73
        },
        {
          prop: 'fail_rate',
          label: 'FAIL率',
          minWidth: 73
        },
        {
          prop: 'day_all_num',
          label: '今日执行总数',
          minWidth: 105
        },
        {
          prop: 'day_pass_num',
          label: '今日PASS总数',
          minWidth: 116
        },
        {
          prop: 'tomorrow_num',
          label: '计划明日执行个数',
          minWidth: 137
        },
        {
          prop: 'exe_day_num',
          label: '还需执行天数',
          minWidth: 105
        }
      ]
    }
  },
  watch: {
    iStageComputed(newV, oldV) {
      this.iStage = newV
      this.handleTypeChange()
    }
  },
  methods: {
    resetOuterPageInfo() {
      this.outerPageInfo = {
        pageNum: 1,
        pageSize: 10
      }
    },
    resetInnerPageInfo() {
      this.innerPageInfo = {
        pageNum: 1,
        pageSize: 10
      }
    },
    // 产品点击
    systemClick(project, stage, product, type, isSpec) {
      this.outerDialogVisible = true
      // 1. 重置页面
      this.resetOuterPageInfo()
      // 2. 数据赋值
      this.project = project
      this.iStage = stage
      this.product_name = product
      this.implementType = type
      this.isSpec = isSpec

      this.queryImplementNumSystem(
        this.project,
        this.iStage,
        this.product_name,
        this.implementType,
        this.isSpec
      )
    },
    // 外部分页器修改数据
    handleOuterPageUpdate(e) {
      this.outerPageInfo.pageNum = e.page
      this.outerPageInfo.pageSize = e.limit
    },
    // 内部分页器修改数据
    handleInnerPageUpdate(e) {
      this.innerPageInfo.pageNum = e.page
      this.innerPageInfo.pageSize = e.limit
    },
    // 类型切换
    handleTypeChange() {
      this.resetOuterPageInfo()
      this.queryImplementNumSystem(
        this.project,
        this.iStage,
        this.product_name,
        this.implementType,
        this.isSpec
      )
    },
    // 域点击
    handleItemClick(row) {
      this.innerDialogVisible = true
      this.resetInnerPageInfo()
      this.innerImplementStage = this.iStageComputed
      this.innerProductName = row.product_name
      this.innerCurrentSystem = row.system

      this.handleInnerTypeChange()
    },
    // 内部点击
    handleInnerTypeChange() {
      this.resetInnerPageInfo()
      this.queryImplementNumType(
        this.project,
        this.innerImplementStage,
        this.innerProductName,
        this.innerCurrentSystem
      )
    },
    // 域统计
    async queryImplementNumSystem(project, stage, product, type, isSpec) {
      this.outerTableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByImplementNumSystem', {
        method: 'GET',
        params: {
          project,
          stage,
          product,
          type,
          isSpec
        }
      })
      this.outerTableData = res
      this.outerTotal = res.length

      this.$nextTick(() => {
        this.outerTableLoading = false
      })
    },
    // 用例执行-类型统计
    async queryImplementNumType(project, stage, product, system) {
      this.innerTableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByImplementNumInfo', {
        method: 'GET',
        params: {
          project,
          stage,
          product,
          system,
          isSpec: this.isSpec
        }
      })
      this.innerTableData = res
      this.innerTotal = res.length

      this.$nextTick(() => {
        this.innerTableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  color: #1895ff;
  cursor: pointer;
}
</style>
