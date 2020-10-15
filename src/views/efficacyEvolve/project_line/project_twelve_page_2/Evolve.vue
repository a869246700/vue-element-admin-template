<template>
  <div class="evolve">
    <el-radio-group v-model="active" style="margin-bottom: 20px">
      <el-radio-button v-for="(item, index) in tabs" :key="index" :label="item.value">{{
        item.label
      }}</el-radio-button>
    </el-radio-group>

    <transition name="component-fade" mode="out-in">
      <implement-card
        v-if="active === '0'"
        ref="implementRef"
        :project="project"
        :current-stage="currentStage"
        :implement-stage="implementStage"
        :current-stage-type-list="currentStageTypeList"
        :implement-stage-type-list="implementStageTypeList"
        @system-click="handleCaseSystemClick"
        @type-click="handleCaseTypeClick"
      />

      <spec-card
        v-else-if="active === '1'"
        ref="specRef"
        :project="project"
        :current-stage="specCurrentStage"
        :implement-stage="implementSpecStage"
        :current-stage-type-list="currentStageTypeList"
        :implement-stage-type-list="implementStageTypeList"
        @system-click="handleSpecSystemClick"
        @type-click="handleSpecTypeClick"
      />

      <evolve-gantt v-else-if="active === '2'" ref="ganttRef" />

      <desgin-card v-else-if="active === '3'" ref="desginRef" :project="project" />

      <review-card v-else-if="active === '4'" ref="reviewRef" :project="project" />
    </transition>

    <!-- system dialog -->
    <case-implement ref="systemDialogRef" :implement-stage-type-list="implementStageTypeList" />

    <implement-type-system ref="typeSystemDialogRef" :project="project" />
  </div>
</template>

<script>
import ImplementCard from './ImplementCard/ImplementCard'
import SpecCard from './SpecCard/SpecCard'
import EvolveGantt from './EvolveGantt/EvolveGantt'
import DesginCard from './DesginCard/DesginCard'
import ReviewCard from './ReviewCard/ReviewCard'
import CaseImplement from './CaseImplement/CaseImplement'
import ImplementTypeSystem from './ImplementTypeSystem/ImplementTypeSystem'

import request from '@/services/request'

export default {
  components: {
    EvolveGantt,
    ImplementCard,
    SpecCard,
    DesginCard,
    ReviewCard,
    CaseImplement,
    ImplementTypeSystem
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
    chartResize() {
      switch (this.active) {
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
    },
    handleCaseTypeClick(type, stage, projectStage) {
      // 首轮  阶段一 isSpec type
      this.$refs.typeSystemDialogRef.typeClick(stage, projectStage, 0, type)
    },
    handleSpecTypeClick(type, stage, projectStage) {
      this.$refs.typeSystemDialogRef.typeClick(stage, projectStage, 1, type)
    },
    // 用例产品点击
    handleCaseSystemClick(product_name, iStage) {
      this.$refs.systemDialogRef.systemClick(this.project, iStage, product_name, '手工', 0)
    },
    // Spec产品点击
    handleSpecSystemClick(product_name, iStage) {
      this.$refs.systemDialogRef.systemClick(this.project, iStage, product_name, '手工', 1)
    },
    // 项目阶段类型
    async queryProjectMilepostList(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByProjectMilepostList', {
        method: 'GET',
        params: { project, isNow: true }
      })
      this.implementStage = res[0] === undefined ? '次轮' : res[0].stage
      this.implementSpecStage = this.implementStage
    },
    // 用例执行-阶段类型 列表
    async queryImplementStageType() {
      const { data: res } = await request(`/api/projectEvolveSta/queryByImplementStageType`, {
        method: 'GET'
      })
      this.implementStageTypeList = res
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
