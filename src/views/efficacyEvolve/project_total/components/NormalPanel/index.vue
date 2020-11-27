<template>
  <el-row :gutter="10">
    <el-col v-for="(item, index) in list" :key="index" :span="24" style="margin: 10px 0;">
      <normal-panel-item :project="item.project" :duty-info="item.dutyInfo" :project-stage-list="item.projectStageList" />
    </el-col>
  </el-row>
</template>

<script>
import NormalPanelItem from './NormalPanelItem'

export default {
  components: { NormalPanelItem },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>
