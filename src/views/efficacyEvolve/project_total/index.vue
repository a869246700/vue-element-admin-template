<template>
  <card id="project-total" title="在行项目信息看板">
    <template #buttons>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAddClick">新增</el-button>
    </template>
    <project-item />
  </card>
</template>

<script>
import Card from '@/components/Card'
import ProjectItem from './components/ProjectItem'

export default {
  name: 'ProjectTotal',
  components: {
    ProjectItem,
    Card
  },
  methods: {
    handleAddClick() {
      this.$router.push('/efficacyEvolve/project_line/add_project')
    }
  }
}
</script>

<style lang="scss" scoped>
#project-total {
  font-size: 14px;
  margin: 20px;
}
</style>
