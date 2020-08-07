<template>
  <div class="app-container">
    <div class="title">
      这是标题
    </div>
    <el-row style="background:#f1f1f1;padding:16px 16px 0;margin-bottom:32px;">
      <el-col :xs="24" :sm="24" :lg="12">
        <goo-chart :chart-data="gooChartData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GooChart from './components/GooChart'

export default {
  components: {
    GooChart
  },
  data() {
    return {
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
  }
}
</script>

<style lang="sass" scoped>

</style>
