<template>
  <div class="app-container">
    {{ msg }}
    <router-view />
  </div>
</template>

<script>

export default {
  data() {
    return {
      msg: ''
    }
  },
  mounted() {
    this.msg = this.$route.meta.title
  }
}
</script>

<style lang="scss" scoped>
</style>
