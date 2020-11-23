<template>
  <div class="badge">
    <div class="dot" :class="type" />
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.badge {
  display: flex;
  align-items: center;

  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }

  .title {
    margin-left: 10px;
  }

  .primary {
    background-color: #409EFF;
  }

  .success {
    background-color: #67C23A;
  }

  .warning {
    background-color: #E6A23C;
  }

  .info {
    background-color: #909399;
  }

  .danger {
    background-color: #F56C6C;
  }
}
</style>
