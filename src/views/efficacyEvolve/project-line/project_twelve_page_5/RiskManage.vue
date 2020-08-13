<template>
  <!-- 问题&风险 -->
  <div class="issue-risk">
    <!-- 通知栏 -->
    <div class="notify-bar">
      <div>
        <el-tag type="info">项目风险项共计 10项, 其中HIGH 6项, MIDDLE 3项, LOW 1项</el-tag>
      </div>
      <div>
        <el-tag type="danger" class="high">其中HIGH 风险中, 已闭环50%(3项), 还有3项未闭环</el-tag>
      </div>
      <div>
        <el-tag type="warning" class="medium">MEDIUM 风险中, 已闭环66%(2项), 还有1项未闭环, 需相关责任人继续推进</el-tag>
      </div>
    </div>

    <!-- 表格-阶段值切换栏 -->
    <div class="stage-change">
      <el-radio-group v-model="currentStage" @change="handleStageChange">
        <el-radio-button v-for="(item, index) in stageList" :key="index" :label="item.stage" />
      </el-radio-group>
    </div>

    <!-- 中间的表格区域 -->
    <div class="table">
      <risk-table />
    </div>

    <!-- charts区域 -->
    <div class="charts">
      <risk-chart />
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
      stageList: [{ stage: '阶段一' }, { stage: '阶段二' }] // 阶段列表
    }
  },
  methods: {
    // 处理阶段值的改变
    handleStageChange(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.notify-bar {
  div {
    margin-bottom: 10px;
  }

  span {
    font-size: 16px;
    font-weight: bold;
  }
}

.table {
  margin: 10px 0;
}

.charts {
  padding-top: 30px;
  border-top: 1px solid #ccc;
}
</style>
