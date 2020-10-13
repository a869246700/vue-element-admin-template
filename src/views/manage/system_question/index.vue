<template>
  <el-card id="system-question">
    <el-tabs :value="active">
      <el-tab-pane>
        <span slot="label" style="padding: 0 15px">进度反馈</span>
        <charge-implement />
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" style="padding: 0 15px">反馈列表</span>
        <!-- <charge-feedback /> -->
        <div>反馈列表</div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" style="padding: 0 15px">问题列表</span>
        <question-list />
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" style="padding: 0 15px">类型列表</span>
        <type-list />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import ChargeImplement from './components/ChargeImplement'
// import ChargeFeedback from './components/ChargeFeedback'
import QuestionList from './components/QuestionList'
import TypeList from './components/TypeList'

export default {
  name: 'SystemQuestion',
  components: { ChargeImplement, QuestionList, TypeList },
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
