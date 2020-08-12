<template>
  <!-- 技术项目 -->
  <div class="technology-project">
    <!-- 课题分析统计卡片 -->
    <card title="课题分析统计" class="card">
      <template #content>
        <div class="statistics-table">
          <statistics-table />
        </div>
      </template>
    </card>

    <!-- 课题分析明细 -->
    <card title="课题分析明细" class="card">
      <template #content>
        <div class="detail-table">
          <detail-table />
        </div>
      </template>
    </card>
  </div>
</template>

<script>
import Card from '@/components/Card/index'
import StatisticsTable from './components/StatisticsTable'
import DetailTable from './components/DetailTable'

export default {
  components: {
    Card,
    StatisticsTable,
    DetailTable
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin-top: 20px;
}
</style>
