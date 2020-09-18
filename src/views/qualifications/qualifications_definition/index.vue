<template>
  <el-card id="qualifications-definition">
    <card title="资质规则" style="margin: 30px;">
      <el-collapse v-model="active" accordion>
        <el-collapse-item title="资质晋升规则" name="1">
          <rule-table />
        </el-collapse-item>
        <el-collapse-item title="新员工资质认定" name="2">
          <new-person-table />
        </el-collapse-item>
        <el-collapse-item title="专业/技能域认定标准与能力要求" name="3">
          <major-skills-table />
        </el-collapse-item>
        <el-collapse-item title="专业域定义" name="4">
          <major-info-table />
        </el-collapse-item>
        <el-collapse-item title="技能域定义" name="5">
          <skills-info-table />
        </el-collapse-item>
      </el-collapse>
    </card>
  </el-card>
</template>

<script>
import Card from '@/components/Card'

import RuleTable from './components/RuleTable'
import NewPersonTable from './components/NewPersonTable'
import SkillsInfoTable from './components/SkillsInfoTable'
import MajorSkillsTable from './components/MajorSkillsTable'
import MajorInfoTable from './components/MajorInfoTable'

export default {
  name: 'QualificationsDefinition',
  components: {
    Card,
    RuleTable,
    NewPersonTable,
    MajorInfoTable,
    MajorSkillsTable,
    SkillsInfoTable
  },
  data() {
    return {
      active: 1
    }
  }
}
</script>

<style lang="scss" scoped>
#qualifications-definition {
  margin: 20px;
}
</style>
