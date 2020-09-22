<template>
  <div class="evolve">
    <el-radio-group v-model="active" style="margin-bottom: 20px;">
      <el-radio-button
        v-for="(item, index) in tabs"
        :key="index"
        :label="item.value"
      >{{ item.label }}</el-radio-button>
    </el-radio-group>

    <transition name="component-fade" mode="out-in">
      <evolve-implement-card
        v-if="active === '0'"
        ref="implementRef"
        :project="project"
        :current-stage.sync="currentStage"
        :implement-stage.sync="implementStage"
        :current-stage-type-list="currentStageTypeList"
        :implement-stage-type-list="implementStageTypeList"
        @system-click="handleCaseSystemClick"
      />

      <evolve-spec-card
        v-else-if="active === '1'"
        ref="specRef"
        :project="project"
        :current-stage.sync="specCurrentStage"
        :implement-stage.sync="implementSpecStage"
        :current-stage-type-list="currentStageTypeList"
        :implement-stage-type-list="implementStageTypeList"
        @system-click="handleSpecSystemClick"
      />

      <evolve-gantt v-else-if="active === '2'" ref="ganttRef" />

      <evolve-desgin-card v-else-if="active === '3'" ref="desginRef" :project="project" />

      <evolve-review-card v-else-if="active === '4'" ref="reviewRef" :project="project" />
    </transition>

    <!-- system dialog -->
    <evolve-case-implement
      ref="systemDialogRef"
      :project="project"
      :implement-stage="implementStage"
      :implement-stage-type-list="implementStageTypeList"
      :implement-num-system-list="implementNumSystemList"
      @change="handleSystemTypeChange"
    />
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
      active: '0',
      tabs: [
        {
          label: '用例执行',
          value: '0'
        },
        {
          label: 'SPEC核验',
          value: '1'
        },
        {
          label: '甘特图',
          value: '2'
        },
        {
          label: '用例&脚本',
          value: '3'
        },
        {
          label: '文档评审',
          value: '4'
        }
      ],
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
      implementNumSystemList: undefined,
      butLoading: false
    }
  },
  computed: {
    project() {
      return this.$t(this.$route.matched[2].meta.title)
    }
  },
  watch: {
    active(newV, oldV) {
      const timer = setTimeout(() => {
        switch (newV) {
          case '0':
            this.$refs.implementRef.chartResize()
            break
          case '1':
            this.$refs.specRef.chartResize()
            break
          case '4':
            this.$refs.reviewRef.chartResize()
            break
        }
        clearTimeout(timer)
      }, 300)
    }
  },
  created() {
    this.queryProjectMilepostList(this.project)
    this.queryImplementStageType()
  },
  methods: {
    handleSystemTypeChange(product_name, stage, type, isSpec) {
      // this.$refs.systemDialogRef.outerDialogVisible = true
      this.$refs.systemDialogRef.tableLoading = true
      this.$refs.systemDialogRef.product_name = product_name
      this.$refs.systemDialogRef.isSpec = isSpec

      this.queryImplementNumSystem(this.project, stage, product_name, type, 0)
      this.$refs.systemDialogRef.tableLoading = false
    },
    // 用例产品点击
    handleCaseSystemClick(product_name) {
      this.$refs.systemDialogRef.outerDialogVisible = true
      this.$refs.systemDialogRef.tableLoading = true
      this.$refs.systemDialogRef.product_name = product_name
      this.$refs.systemDialogRef.isSpec = 0

      // 查询域信息
      this.queryImplementNumSystem(this.project, this.implementStage, product_name, '手工', 0)
      this.$nextTick(() => {
        this.$refs.systemDialogRef.tableLoading = false
      })
    },
    // Spec产品点击
    handleSpecSystemClick(product_name) {
      this.$refs.systemDialogRef.outerDialogVisible = true
      this.$refs.systemDialogRef.tableLoading = true
      this.$refs.systemDialogRef.product_name = product_name
      this.$refs.systemDialogRef.isSpec = 1

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
    // 进展-设计-TP用例总计
    async evolveTpCaseTotal(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByTpCaseTotal', {
        method: 'GET',
        params: { project }
      })
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.2s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
