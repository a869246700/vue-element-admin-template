<template>
  <div class="integral-assessment">
    <el-tabs v-model="active" tab-position="left">
      <el-tab-pane label="积分管理" name="integralManage" lazy>
        <integral-manage :project="project" />
      </el-tab-pane>

      <el-tab-pane label="资质审查" name="qualificationReview" lazy>
        <qualification-review :project="project" />
      </el-tab-pane>

      <el-tab-pane label="需求变更" name="demandChange" lazy>
        <demand-change :project="project" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import IntegralManage from './IntegralManage/IntegralManage'
import QualificationReview from './QualificationReview/QualificationReview'
import DemandChange from './DemandChange/DemandChange'

export default {
  components: {
    IntegralManage,
    QualificationReview,
    DemandChange
  },
  data() {
    return {
      project: '',
      active: 'integralManage'
    }
  },
  created() {
    this.project = this.$t(this.$route.matched[2].meta.title)
  }
}
</script>
