<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import resize from '@/components/Charts/mixins/resize'

export default {
  mixins: [resize],
  props: {
    title: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    optionRate: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    optionRate: {
      deep: true,
      handler(val) {
        this.initChart()
      }
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    // 初始化 chart
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.optionRate)
    },
    // 设置 chart 的配置项
    setOptions(options) {
      // 设置配置
      this.chart.setOption(options)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
