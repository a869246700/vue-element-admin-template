<template>
  <el-card id="system-question">
    <el-tabs :value="active">
      <el-tab-pane label="问题列表">
        <question-list />
      </el-tab-pane>
      <el-tab-pane label="类型列表">
        <type-list />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import QuestionList from './components/QuestionList'
import TypeList from './components/TypeList'

export default {
  name: 'SystemQuestion',
  components: { QuestionList, TypeList },
  data() {
    return {
      active: '0'
    }
  }
}
</script>

<style lang="scss" scoped>
#system-question {
  margin: 20px;
  font-size: 14px;
}
</style>
