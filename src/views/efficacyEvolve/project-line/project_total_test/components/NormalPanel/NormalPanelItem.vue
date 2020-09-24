<template>
  <el-card>
    <top />
    <bottom />
  </el-card>
</template>

<script>
import Top from './components/Top'
import Bottom from './components/Bottom'

export default {
  components: {
    Top,
    Bottom
  }
}
</script>
