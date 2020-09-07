<template>
  <div id="message-list">
    <el-card>
      <el-tabs v-model="active" type="border-card">
        <el-tab-pane label="收件箱">
          <inbox />
        </el-tab-pane>
        <el-tab-pane label="发件箱">
          <outbox />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Outbox from './components/Outbox'
import Inbox from './components/Inbox'

export default {
  name: 'MessageList',
  components: {
    Outbox,
    Inbox
  },
  data() {
    return {
      active: '0'
    }
  },
  methods: {
    // 申请角色权限成功的回调函数
    handleApplyAuthoritySuccess() {
      this.$refs.roleApplyRef.init()
      this.$refs.applyListRef.init()
    }
  }
}
</script>

<style lang="scss" scoped>
#message-list {
  font-size: 14px;

  .el-card {
    margin: 20px;
  }
}
</style>
