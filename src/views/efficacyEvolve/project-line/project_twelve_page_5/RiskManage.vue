<template>
  <!-- 问题&风险 -->
  <div class="issue-risk">
    <!-- charts区域 -->
    <risk-chart style="margin: 20px 0" />
    <!-- 阶段值切换栏 -->
    <div class="stage-change">
      <el-radio-group v-model="currentStage" @change="handleStageChange">
        <el-radio-button v-for="(item, index) in stageList" :key="index" :label="item.stage" />
      </el-radio-group>
    </div>

    <div class="table">
      <risk-table />
    </div>
  </div>
</template>

<script>
import RiskTable from './components/RiskTable'
import RiskChart from './components/RiskChart'

export default {
  components: {
    RiskChart,
    RiskTable
  },
  data() {
    return {
      currentStage: '阶段一', // 当前选中阶段值
      stageList: [{ stage: '阶段一' }, { stage: '阶段二' }], // 阶段列表
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
      }
    }
  },
  methods: {
    // 点击新增数据
    handleAddDataClick() {
      this.$message({
        message: '新增数据',
        type: 'success'
      })
    },
    // 点击导出数据
    handleExportDataClick() {
      this.$message({
        message: '导出数据',
        type: 'success'
      })
    },
    // 处理阶段值的改变
    handleStageChange(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  margin: 20px 0;
}
</style>
