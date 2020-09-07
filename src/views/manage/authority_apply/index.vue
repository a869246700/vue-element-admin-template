<template>
  <div id="authority-apply">
    <el-card>
      <el-tabs type="border-card">
        <el-tab-pane label="角色权限申请">
          <role-apply ref="roleApplyRef" @update="handleApplyAuthoritySuccess" />
        </el-tab-pane>
        <el-tab-pane label="申请列表">
          <apply-list ref="applyListRef" @update="handleApplyAuthoritySuccess" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import RoleApply from './components/RoleApply'
import ApplyList from './components/ApplyList'

export default {
  name: 'AuthorityApply',
  components: {
    RoleApply,
    ApplyList
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
#authority-apply {
  font-size: 14px;

  .el-card {
    margin: 20px;
  }
}
</style>
