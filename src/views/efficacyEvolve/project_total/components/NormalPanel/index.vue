<template>
  <el-row :gutter="10">
    <el-col v-for="(item, index) in 4" :key="index" :span="24" style="margin: 10px 0;">
      <normal-panel-item />
    </el-col>
  </el-row>
</template>

<script>
import NormalPanelItem from './NormalPanelItem'

export default {
  components: { NormalPanelItem }
}
</script>
