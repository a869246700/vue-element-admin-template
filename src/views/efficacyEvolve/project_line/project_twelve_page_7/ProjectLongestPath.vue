<template>
  <div class="chart-container">
    <chart height="500px" width="100%" />
  </div>
</template>

<script>
import Chart from './components/Chart'

export default {
  components: {
    Chart
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
