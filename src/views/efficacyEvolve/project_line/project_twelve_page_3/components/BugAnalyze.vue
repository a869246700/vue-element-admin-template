<template>
  <div class="bug-analyze">
    <bug-growth ref="bugGrowthRef" />
    <bug-week-trend ref="bugWeekTrendRef" style="margin-top: 10px;" />
    <!-- BUG解决状态分布情况 -->
    <bug-resolve-status-distributed ref="bugResolveStatusDistributedRef" style="margin-top: 10px;" />
    <bug-workpackage-distributed ref="bugWorkpackageDistributedRef" style="margin-top: 10px;" />
  </div>
</template>

<script>
import BugGrowth from '../bug_analyze/BugGrowth'
import BugWeekTrend from '../bug_analyze/BugWeekTrend'
import BugResolveStatusDistributed from '../bug_analyze/BugResolveStatusDistributed'
import BugWorkpackageDistributed from '../bug_analyze/BugWorkpackageDistributed'

export default {
  components: {
    BugGrowth,
    BugWeekTrend,
    BugResolveStatusDistributed,
    BugWorkpackageDistributed
  },
  methods: {
    chartResize() {
      this.$refs.bugGrowthRef.chartResize && this.$refs.bugGrowthRef.chartResize()
      this.$refs.bugWeekTrendRef.chartResize && this.$refs.bugWeekTrendRef.chartResize()
      this.$refs.bugResolveStatusDistributedRef.chartResize && this.$refs.bugResolveStatusDistributedRef.chartResize()
      this.$refs.bugWorkpackageDistributedRef.chartResize && this.$refs.bugWorkpackageDistributedRef.chartResize()
    }
  }
}
</script>

<style lang="scss" scoped>
.success {
  color: red;
}

.error {
  color: green;
}
</style>
