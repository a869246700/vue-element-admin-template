<template>
  <div class="test-task">
    <el-tabs v-model="active" type="card" @tab-click="handleTabClick">
      <el-tab-pane label="WBS" name="1">
        <test-task-wbs />
      </el-tab-pane>

      <el-tab-pane label="任务执行情况" name="2">
        <test-task-chart ref="taskChartRef" height="500px" width="100%" />
      </el-tab-pane>

      <el-tab-pane label="专项任务" name="3">
        <special-task :project="project" />
      </el-tab-pane>

      <el-tab-pane label="STP" name="4">
        <el-card>STP</el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TestTaskChart from './components/TestTaskChart'
import TestTaskWbs from './components/TestTaskWbs'
import SpecialTask from './components/SpecialTask'

export default {
  components: {
    TestTaskChart,
    TestTaskWbs,
    SpecialTask
  },
  data() {
    return {
      active: '1',
      project: undefined
    }
  },
  created() {
    this.project = this.$t(this.$route.matched[2].meta.title)
  },
  methods: {
    // 处理 tab 切换
    handleTabClick() {
      console.log(this.active)
      if (this.active === '2') {
        this.$nextTick(() => {
          this.$refs.taskChartRef.resize()
        })
      }
    }
  }
}
</script>
