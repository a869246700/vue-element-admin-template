<template>
  <el-card>
    <div slot="header" :class="title !== '' ? 'header' : 'header-no-title'">
      <span>{{ title }}</span>
      <div class="buttons">
        <slot name="buttons" />
      </div>
    </div>
    <div class="content">
      <div class="body">
        <slot name="content" />
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-no-title {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
