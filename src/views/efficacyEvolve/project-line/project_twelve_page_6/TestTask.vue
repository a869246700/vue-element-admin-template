<template>
  <div class="test-task">
    <!-- WBS区域 -->
    <div class="wbs">
      <test-task-wbs />
    </div>

    <div class="task-chart">
      <h3>任务统计</h3>
      <test-task-chart height="500px" width="100%" class="gantt" />
    </div>
  </div>
</template>

<script>
import TestTaskChart from './components/TestTaskChart'
import TestTaskWbs from './components/TestTaskWbs'
export default {
  components: {
    TestTaskChart,
    TestTaskWbs
  }
}
</script>

<style lang="scss" scoped>
</style>
