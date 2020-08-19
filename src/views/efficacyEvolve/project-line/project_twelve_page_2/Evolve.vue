<template>
  <div class="evolve">
    <!-- 甘特图 -->
    <h2>甘特图区域</h2>
    <evolve-gantt v-if="isGanttVisible" class="gantt" />

    <h2>任务统计</h2>
    <evolve-chart height="500px" width="100%" class="gantt" />

    <!-- 执行卡片 -->
    <implement-card v-if="isImplementCardVisible" />

    <!-- 设计卡片 -->
    <desgin-card v-if="isDesginCardVisible" />

    <!-- 评审卡片 -->
    <review-card v-if="isReviewCardVisible" />
  </div>
</template>

<script>
import EvolveGantt from './components/EvolveGantt'
import EvolveChart from './components/EvolveChart'
import ImplementCard from './components/ImplementCard'
import DesginCard from './components/DesginCard'
import ReviewCard from './components/ReviewCard'

export default {
  components: {
    EvolveGantt,
    EvolveChart,
    ImplementCard,
    DesginCard,
    ReviewCard
  },
  data() {
    return {
      isGanttVisible: true, // 控制甘特图的显示与隐藏
      isImplementCardVisible: true, // 控制执行卡片的显示与隐藏
      isDesginCardVisible: true, // 控制设计卡片的显示与隐藏
      isReviewCardVisible: true // 控制评审卡片的显示与隐藏
    }
  },
  methods: {
    // 执行-SPEC统计
    async queryExeSpecSta(project) {},

    // 进展-SPEC产品统计列表
    async queryExeSpecProductSta(project) {},

    // 进展-性能SPEC产品统计列表
    async queryNatureSpecTotal(project) {},

    // 进展-执行-控制面执行数据
    queryByCaseImplement() {},

    // 进展-执行-数据面执行数据
    queryByDataCaseImplement() {},

    // 进展-执行-数据面SPEC明细数据
    specProductStaInfoList() {},

    // 进展-执行-数据面SPEC明细数据清空
    specProductStaInfoListIsNull() {},

    // 进展-执行-数据面性能SPEC明细数据
    specNatureProductStaInfoList() {},

    // 进展-执行-数据面SPEC明细数据清空
    specNatureProductStaInfoListIsNull() {},

    // 进展-设计-TP用例总计
    evolveTpCaseTotal() {},

    // 进展-设计-专业分组TP用例统计
    evolveTpCaseProfessionalDivide() {},

    // 进展-评审-评审总计
    evolveReviewTotal() {},

    // 进展-评审-工作包维度统计
    evolveReviewWorkPackage() {},

    // 进展-评审-PTGTTM维度统计
    evolveReviewPerson() {},

    // 进展-执行-用例-BUG阻塞
    queryByBugChoke() {}
  }
}
</script>

<style lang="scss" scoped>
.gantt {
  margin-bottom: 20px;
}
</style>
