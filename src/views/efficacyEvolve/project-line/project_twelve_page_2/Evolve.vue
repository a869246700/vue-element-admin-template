<template>
  <div class="evolve">
    <!-- 甘特图 -->
    <div class="evolve-gantt">
      <div class="brief">
        <div class="tag">
          <el-tag>项目计划：当前项目阶段 XXX</el-tag>
        </div>
        <div class="tag">
          <el-tag type="success">全部计划与工作：共X条，已完成X条</el-tag>
        </div>
      </div>
      <evolve-gantt v-if="evolveGanttVisible" class="gantt" />
    </div>

    <!-- 执行卡片 -->
    <evolve-implement-card
      v-if="evolveImplementCardVisible"
      :project="project"
      :current-stage.sync="currentStage"
      :implement-stage.sync="implementStage"
      :current-stage-type-list="currentStageTypeList"
      :implement-stage-type-list="implementStageTypeList"
      @system-click="handleCaseSystemClick"
    />

    <!-- SPEC卡片 -->
    <evolve-spec-card
      v-if="evolveSepcCardVisible"
      :project="project"
      :current-stage.sync="specCurrentStage"
      :implement-stage.sync="implementSpecStage"
      :current-stage-type-list="currentStageTypeList"
      :implement-stage-type-list="implementStageTypeList"
      @system-click="handleSpecSystemClick"
    />

    <!-- 设计卡片 -->
    <evolve-desgin-card v-if="evolveDesginCardVisible" :project="project" />

    <!-- 评审卡片 -->
    <evolve-review-card v-if="evolveReviewCardVisible" :project="project" />

    <!-- system dialog -->
    <el-dialog title="合计芯片用例执行统计" :visible.sync="isSystemDialogVisible" width="70%" lock-scroll>
      <evolve-case-implement
        ref="systemDialogRef"
        :project="project"
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
import EvolveImplementCard from './components/EvolveImplementCard'
import EvolveSpecCard from './components/EvolveSpecCard'
import EvolveDesginCard from './components/EvolveDesginCard'
import EvolveReviewCard from './components/EvolveReviewCard'
import EvolveCaseImplement from './components/EvolveCaseImplement'

import request from '@/services/request'

export default {
  components: {
    EvolveGantt,
    EvolveImplementCard,
    EvolveSpecCard,
    EvolveDesginCard,
    EvolveReviewCard,
    EvolveCaseImplement
  },
  data() {
    return {
      evolveGanttVisible: true, // 控制甘特图的显示与隐藏
      evolveImplementCardVisible: true, // 控制执行卡片的显示与隐藏
      evolveSepcCardVisible: true, // 控制 SPEC 卡片的显示与隐藏
      evolveDesginCardVisible: true, // 控制设计卡片的显示与隐藏
      evolveReviewCardVisible: true, // 控制评审卡片的显示与隐藏
      currentStage: '阶段一',
      specCurrentStage: '阶段一',
      currentStageTypeList: [{ stage: '阶段一' }, { stage: '阶段二' }],
      implementStage: '次轮',
      implementSpecStage: '次轮',
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
  created() {
    this.queryProjectMilepostList(this.project)
    this.queryImplementStageType()
  },
  methods: {
    handleSystemTypeChange(product_name, stage, type, isSpec) {
      this.isSystemDialogVisible = true

      this.$nextTick(() => {
        this.$refs.systemDialogRef.tableLoading = true
        this.$refs.systemDialogRef.product_name = product_name
        this.$refs.systemDialogRef.isSpec = isSpec
      })

      this.queryImplementNumSystem(this.project, stage, product_name, type, 0)

      this.$nextTick(() => {
        this.$refs.systemDialogRef.tableLoading = false
      })
    },
    // 用例产品点击
    handleCaseSystemClick(product_name) {
      this.isSystemDialogVisible = true
      this.$nextTick(() => {
        this.$refs.systemDialogRef.tableLoading = true
        this.$refs.systemDialogRef.product_name = product_name
        this.$refs.systemDialogRef.isSpec = 0
      })
      // 查询域信息
      this.queryImplementNumSystem(this.project, this.implementStage, product_name, '手工', 0)
      this.$nextTick(() => {
        this.$refs.systemDialogRef.tableLoading = false
      })
    },
    // Spec产品点击
    handleSpecSystemClick(product_name) {
      this.isSystemDialogVisible = true
      this.$nextTick(() => {
        this.$refs.systemDialogRef.tableLoading = true
        this.$refs.systemDialogRef.product_name = product_name
        this.$refs.systemDialogRef.isSpec = 1
      })
      // 查询域信息
      this.queryImplementNumSystem(this.project, this.implementStage, product_name, '手工', 1)
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
    async queryImplementNumSystem(project, stage, product, type, isSpec) {
      const { data: res } = await request('/api/projectEvolveSta/queryByImplementNumSystem', {
        method: 'GET',
        params: {
          project,
          stage,
          product,
          type,
          isSpec
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

    // 进展-设计-TP用例总计
    async evolveTpCaseTotal(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByTpCaseTotal', {
        method: 'GET',
        params: { project }
      })
      console.log(res)
    },

    // 进展-设计-专业分组TP用例统计
    evolveTpCaseProfessionalDivide() {},

    // 进展-评审-评审总计
    evolveReviewTotal() {},

    // 进展-评审-工作包维度统计
    evolveReviewWorkPackage() {},

    // 进展-评审-PTGTTM维度统计
    evolveReviewPerson() {}
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
