<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'EfficacyEvolve', // 需要与路由的name相同
  created() {
    const route = this.$route.matched.find(item => item.name === this.$options.name)
    this.$store.dispatch('tagsView/addCachedView', route)
  }
}
</script>
