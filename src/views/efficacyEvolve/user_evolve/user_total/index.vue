<template>
  <el-card id="user-total">
    <el-tabs v-model="activeName" style="margin-top:15px;">
      <el-tab-pane
        v-for="item in tabMapOptions"
        :key="item.key"
        :label="item.label"
        lazy
        :name="item.key"
        :disabled="item.disabled"
      >
        <el-popover
          v-if="item.disabled"
          slot="label"
          placement="top-start"
          trigger="hover"
          content="该模块尚未开发(开放)"
        >
          <span slot="reference" class="disabled" style="padding: 0 15px;">{{ item.label }}</span>
        </el-popover>

        <span
          v-else
          slot="label"
          :class="activeName === item.key ? 'active' : ''"
          style="padding: 0 15px;"
        >{{ item.label }}</span>
        <tab-component :is="item.name" />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import UserTotalQualified from './components/UserTotalQualified'

export default {
  components: {
    UserTotalQualified
  },
  data() {
    return {
      name: '12.5PL1',
      activeName: '1',
      tabMapOptions: [{ label: '总述', key: '1', name: 'UserTotalQualified', disabled: false }]
    }
  }
}
</script>

<style lang="scss" scoped>
#user-total {
  margin: 20px;

  .active {
    color: #1895ff;
  }

  .disabled {
    cursor: not-allowed;
    color: #bbb;
  }
}
</style>
