<template>
  <div class="evolve">
    <!-- 甘特图 -->
    <div v-if="false" class="evolve-gantt">
      <div class="brief">
        <div class="tag">
          <el-tag>项目计划：当前项目阶段 XXX</el-tag>
        </div>
        <div class="tag">
          <el-tag type="success">全部计划与工作：共X条，已完成X条</el-tag>
        </div>
      </div>
      <evolve-gantt v-if="isGanttVisible" class="gantt" />
    </div>

    <!-- 执行卡片 -->
    <implement-card
      v-if="isImplementCardVisible"
      :project="project"
      :current-stage.sync="currentStage"
      :implement-stage.sync="implementStage"
      :current-stage-type-list="currentStageTypeList"
      :implement-stage-type-list="implementStageTypeList"
      @system-click="handleSystemClick"
    />

    <!-- 设计卡片 -->
    <desgin-card v-if="isDesginCardVisible" />

    <!-- 评审卡片 -->
    <review-card v-if="isReviewCardVisible" />

    <!-- system dialog -->
    <el-dialog title="合计芯片用例执行统计" :visible.sync="isSystemDialogVisible" width="70%" lock-scroll>
      <case-implement
        ref="systemDialogRef"
        :implement-stage="implementStage"
        :implement-stage-type-list="implementStageTypeList"
        :implement-num-system-list="implementNumSystemList"
        @change="handleSystemTypeChange"
      />
    </el-dialog>
  </div>
</template>

<script>
import EvolveGantt from './components/EvolveGantt'
import ImplementCard from './components/ImplementCard'
import DesginCard from './components/DesginCard'
import ReviewCard from './components/ReviewCard'
import CaseImplement from './components/CaseImplement'

import request from '@/services/request'

export default {
  components: {
    EvolveGantt,
    ImplementCard,
    DesginCard,
    ReviewCard,
    CaseImplement
  },
  data() {
    return {
      isGanttVisible: true, // 控制甘特图的显示与隐藏
      isImplementCardVisible: true, // 控制执行卡片的显示与隐藏
      isDesginCardVisible: true, // 控制设计卡片的显示与隐藏
      isReviewCardVisible: true, // 控制评审卡片的显示与隐藏
      currentStage: '阶段一',
      currentStageTypeList: [{ stage: '阶段一' }, { stage: '阶段二' }],
      implementStage: '次轮',
      implementStageTypeList: [{ stage: '准入' }],
      isSystemDialogVisible: false, // 控制 system 对话框显示与隐藏
      implementNumSystemList: undefined
    }
  },
  computed: {
    project() {
      return this.$t(this.$route.matched[2].meta.title)
    }
  },
  mounted() {
    this.queryProjectMilepostList(this.project)
    this.queryImplementStageType()
  },
  methods: {
    // 用例产品点击
    handleSystemClick(product_name) {
      this.isSystemDialogVisible = true
      this.$nextTick(() => {
        this.$refs.systemDialogRef.tableLoading = true
        this.$refs.systemDialogRef.product_name = product_name
      })
      // 查询域信息
      this.queryImplementNumSystem(this.project, this.implementStage, product_name, '手工')
      this.$nextTick(() => {
        this.$refs.systemDialogRef.tableLoading = false
      })
    },
    // 修改 system 对话框 type
    handleSystemTypeChange(product_name, stage, type) {
      this.$refs.systemDialogRef.tableLoading = true
      console.log(this.$refs.systemDialogRef.product_name)
      // 查询域信息
      this.queryImplementNumSystem(this.project, stage, product_name, type)
      this.$nextTick(() => {
        this.$refs.systemDialogRef.tableLoading = false
      })
    },
    // 项目阶段类型
    async queryProjectMilepostList(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByProjectMilepostList', {
        method: 'GET',
        params: { project, isNow: true }
      })
      this.implementStage = res[0] === undefined ? '次轮' : res[0].stage
    },
    // 用例执行-阶段类型 列表
    async queryImplementStageType() {
      const { data: res } = await request(`/api/projectEvolveSta/queryByImplementStageType`, {
        method: 'GET'
      })
      this.implementStageTypeList = res
    },
    // 用例执行-域统计
    async queryImplementNumSystem(project, stage, product, type) {
      const { data: res } = await request('/api/projectEvolveSta/queryByImplementNumSystem', {
        method: 'GET',
        params: {
          project,
          stage,
          product,
          type,
          isSpec: 0
        }
      })
      this.implementNumSystemList = res
    },
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
.evolve-gantt {
  margin-bottom: 20px;

  .brief {
    margin-bottom: 10px;

    .el-tag {
      margin-bottom: 5px;
      font-size: 16px;
    }
  }
}
</style>
