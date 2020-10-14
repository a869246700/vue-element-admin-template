<template>
  <el-card class="my-card">
    <el-tabs v-model="active">
      <el-tab-pane label="总分说明" name="1">
        <span slot="label" style="padding: 0 10px">总分说明</span>
        <integral-rules-score />
      </el-tab-pane>

      <el-tab-pane label="基准值说明" name="2">
        <span slot="label" style="padding: 0 10px">基准值说明</span>
        <integral-rules-base />
      </el-tab-pane>

      <el-tab-pane label="特批结果说明" name="3">
        <span slot="label" style="padding: 0 10px">特批结果说明</span>
        <integral-rules-permit />
      </el-tab-pane>

      <el-tab-pane label="入围维护积分规则" name="4">
        <span slot="label" style="padding: 0 10px">入围维护积分规则</span>
        <integral-rules-maintenance />
      </el-tab-pane>

      <el-tab-pane label="项目积分规则" name="5">
        <span slot="label" style="padding: 0 10px">项目积分规则</span>
        <integral-rules-project />
        <integral-rules-project-other style="margin-top: 20px;" />
      </el-tab-pane>

      <el-tab-pane label="管理者积分规则" name="6">
        <span slot="label" style="padding: 0 10px">管理者积分规则</span>
        <integral-rules-managers />
      </el-tab-pane>

      <el-tab-pane label="项目管理积分规则" name="7">
        <span slot="label" style="padding: 0 10px">项目管理积分规则</span>
        <integral-rules-project-management />
        <integral-rules-project-management-pTM style="margin-top: 20px;" />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import IntegralRulesScore from './components/IntegralRulesScore'
import IntegralRulesBase from './components/IntegralRulesBase'
import IntegralRulesPermit from './components/IntegralRulesPermit'
import IntegralRulesMaintenance from './components/IntegralRulesMaintenance'
import IntegralRulesProject from './components/IntegralRulesProject'
import IntegralRulesProjectOther from './components/IntegralRulesProjectOther'
import IntegralRulesManagers from './components/IntegralRulesManagers'
import IntegralRulesProjectManagement from './components/IntegralRulesProjectManagement'
import IntegralRulesProjectManagementPTM from './components/IntegralRulesProjectManagementPTM'

export default {
  components: {
    IntegralRulesScore,
    IntegralRulesBase,
    IntegralRulesPermit,
    IntegralRulesMaintenance,
    IntegralRulesProject,
    IntegralRulesProjectOther,
    IntegralRulesProjectManagement,
    IntegralRulesProjectManagementPTM,
    IntegralRulesManagers
  },
  data() {
    return {
      active: '1'
    }
  }
}
</script>
