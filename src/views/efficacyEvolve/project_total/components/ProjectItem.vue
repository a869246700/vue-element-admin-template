<template>
  <el-card class="project-item">
    <top />
    <bottom />
  </el-card>
</template>

<script>
import Top from './Top'
import Bottom from './Bottom'

export default {
  components: {
    Top,
    Bottom
  }
}
</script>
