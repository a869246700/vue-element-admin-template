<template>
  <!-- 技术项目 -->
  <div class="technology-project">
    <!-- 通知栏 -->
    <div class="notify-bar">
      <div>
        <el-tag type="info">技术课题共计 X 项，代码量共 X kloc，其中测试验证结项 X 项，评审结项 X 项</el-tag>
      </div>
      <div>
        <el-tag type="danger" class="high">其中有 X 项课题，遗漏率 > 0.5个/K，遗漏TOP有：课题1，课题2，课题3</el-tag>
      </div>
      <div>
        <el-tag type="success" class="medium">有 X 项课题发现有非未知缺陷，其中TOP有：课题1，课题2，课题3</el-tag>
      </div>
    </div>

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
.notify-bar {
  div {
    margin-bottom: 10px;
  }

  span {
    font-size: 16px;
    font-weight: bold;
  }
}

.card {
  margin-top: 30px;
}
</style>
