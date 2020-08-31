<template>
  <el-dialog title="资源调偏" :visible.sync="isDialogVisible" width="100%">
    <!-- 表格 -->
    <el-table
      v-loading="isTableLoading"
      :data="tableData"
      fit
      highlight-current-row
      border
      style="width: 100%"
      class="cost-dialog-table"
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
        :show-overflow-tooltip="item.sot"
      >
        <template slot-scope="{row}">
          <el-input-number
            v-if="item.prop !== 'type'&& item.prop !== 'area' && item.prop !== 'realm'"
            v-model.trim="row[item.prop]"
            controls-position="right"
            size="mini"
            @focus="handleNumberInputFocus(item.prop, row[item.prop], row)"
            @blur.prevent="handleNumberInputBlur(item.prop, row[item.prop], row)"
            @change="updateData(item.prop, row[item.prop], row)"
          />

          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="operation-bar">
      <el-button size="small" @click="isDialogVisible=false">取消</el-button>
      <el-button type="primary" size="small" @click="isDialogVisible=false">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import request from '@/services/post'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isTableLoading: false,
      isDialogVisible: false,
      tableData: [],
      adjustData: undefined // 调整的数据
    }
  },
  computed: {
    tableOptions() {
      return [
        {
          prop: 'type',
          label: '大类',
          minWidth: 100
        },
        {
          prop: 'area',
          label: '类型',
          minWidth: 110
        },
        {
          prop: 'realm',
          label: '域',
          minWidth: 320,
          sot: true
        },
        {
          prop: 'demand_add_time',
          label: '需求阶段调偏',
          minWidth: 140
        },
        {
          prop: 'design_add_time',
          label: '设计阶段调偏',
          minWidth: 140
        },
        {
          prop: 'admittance_add_time',
          label: '准入阶段调偏',
          minWidth: 140
        },
        {
          prop: 'test_first_add_time',
          label: '首轮阶段调偏',
          minWidth: 140
        },
        {
          prop: 'test_second_add_time',
          label: '次轮阶段调偏',
          minWidth: 140
        },
        {
          prop: 'regression_add_time',
          label: '回归阶段调偏',
          minWidth: 140
        },
        {
          prop: 'on_trial_add_time',
          label: '试点阶段调偏',
          minWidth: 140
        }
      ]
    }
  },
  methods: {
    // 输入框获得焦点
    handleNumberInputFocus(type, value, row) {
      const adjustData = {
        area: type,
        demandAddTime: value,
        id: row.id
      }
      this.adjustData = adjustData
    },
    // 输入框失去焦点
    handleNumberInputBlur(type, value, row) {
      if (this.adjustData.area === type && this.adjustData.id === row.id) {
        if (this.adjustData.demandAddTime !== value) {
          // 发送网路请求
          this.updateData(type, value, row)
        }
      }
    },
    // 真正的修改数据
    updateData(type, value, row) {
      request('/api/projectEvolveSta/updateAdjustData', {
        method: 'POST',
        data: {
          area: type,
          demandAddTime: value,
          id: row.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.operation-bar {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
