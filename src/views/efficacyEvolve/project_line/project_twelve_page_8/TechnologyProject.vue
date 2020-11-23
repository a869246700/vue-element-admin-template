<template>
  <!-- 技术项目 -->
  <div class="technology-project">
    <el-tabs v-model="active" type="card">
      <el-tab-pane label="PO项目" name="1">
        <po-project :project="project" />
      </el-tab-pane>

      <el-tab-pane label="组件项目" name="2">
        <comp-project :project="project" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PoProject from './PoProject/PoProject'
import CompProject from './CompProject/CompProject'

export default {
  components: {
    PoProject,
    CompProject
  },
  data() {
    return {
      project: undefined, // 项目线名称
      active: '1'
    }
  },
  created() {
    // 获取项目名
    this.project = this.$t(this.$route.matched[2].meta.title)
  }
}
</script>
