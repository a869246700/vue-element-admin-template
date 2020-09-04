<template>
  <el-card>
    <div slot="header" :class="title !== '' ? 'header' : 'header-no-title'">
      <span :style="{'font-size': titleSize + 'px'}">{{ title }}</span>
      <div class="buttons">
        <slot name="buttons" />
      </div>
    </div>
    <div class="content">
      <div class="body">
        <slot name="content" />
        <slot />
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
    },
    titleSize: {
      type: Number,
      default: 18
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
