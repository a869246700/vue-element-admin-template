<template>
  <el-row :gutter="10">
    <el-col v-for="(item, index) in 4" :key="index" :span="12" style="margin: 10px 0;">
      <simple-panel-item />
    </el-col>
  </el-row>
</template>

<script>
import SimplePanelItem from './SimplePanelItem'

export default {
  components: { SimplePanelItem }
}
</script>
