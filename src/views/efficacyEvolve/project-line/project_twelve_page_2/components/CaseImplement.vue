<template>
  <!-- 用例执行统计卡片 -->
  <div>
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
            <el-radio-button label="手工" />
            <el-radio-button label="自动化" />
            <el-radio-button label="全部" />
          </el-radio-group>
        </el-col>
      </el-row>

      <el-table
        v-loading="tableLoading"
        :data="implementNumSystemList"
        border
        style="width: 100%;"
        :header-cell-style="{'background-color': '#FAFAFA' }"
        fit
        highlight-current-row
      >
        <el-table-column
          v-for="(item, index) in tableOptions"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span
              v-if="item.prop === 'product_name'"
              class="title"
              @click="handleItemClick(row)"
            >{{ row.product_name }}</span>
            <span v-else>{{ row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      :title="`${temp.product_name}芯片${temp.system}用例执行统计`"
      :visible.sync="innerDialogVisible"
      append-to-body
      lock-scroll
    >
      <el-radio-group v-model="innerImplementStage" size="small" @change="handleInnerTypeChange">
        <el-radio-button key="9" label="汇总" />
        <el-radio-button
          v-for="(item, index) in implementStageTypeList"
          :key="index"
          :label="item.stage"
        />
      </el-radio-group>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: String,
      default: ''
    },
    implementStage: {
      type: String,
      default: ''
    },
    implementStageTypeList: {
      type: Array,
      default: () => []
    },
    implementNumSystemList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      product_name: undefined,
      implementType: '手工', // 测试类型
      iStage: this.implementStage, // 阶段类型
      tableData: this.implementNumSystemList, // 外部表格数据
      tableLoading: false, // 外部表格加载状态
      innerDialogVisible: false, // 控制内部对话框的显示与隐藏
      temp: {},
      // ----------内部----------
      innerImplementStage: this.iStage
    }
  },
  computed: {
    iStageComputed() {
      return this.implementStage
    },
    list() {
      return this.implementNumSystemList
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
    }
  },
  watch: {
    iStageComputed(newV, oldV) {
      this.iStage = newV
    },
    list(newV, oldV) {
      this.tableData = newV
    }
  },
  methods: {
    handleTypeChange() {
      this.$emit('change', this.product_name, this.iStage, this.implementType)
    },
    handleItemClick(row) {
      this.temp = row
      this.innerDialogVisible = true
      this.innerImplementStage = this.implementStage
    },
    // -----------内部---------
    handleInnerTypeChange() {
      console.log(this.innerImplementStage)
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
