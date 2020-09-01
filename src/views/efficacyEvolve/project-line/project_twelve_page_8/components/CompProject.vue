<template>
  <div>组件项目 {{ project }}</div>
</template>

<script>
export default {
  props: {
    project: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
