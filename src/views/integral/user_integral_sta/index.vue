<template>
  <el-card id="user-integral-sta" class="my-card">
    <el-tabs v-model="active">
      <el-tab-pane
        v-for="item in tabs"
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
          <span slot="reference" class="disabled" style="padding: 0 10px">{{ item.label }}</span>
        </el-popover>

        <span v-else slot="label" style="padding: 0 10px">{{ item.label }}</span>
        <tab-component :is="item.name" :ref="item.name + 'Ref'" />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import Current from './current'
import History from './history'
import Compared from './compared'

export default {
  name: 'UserIntegralSta',
  components: { Current, History, Compared },
  data() {
    return {
      active: '1',
      tabs: [
        { label: '当前', key: '1', name: 'Current', disabled: false },
        { label: '历史', key: '2', name: 'History', disabled: false },
        { label: '对比', key: '3', name: 'Compared', disabled: false }
      ]
    }
  },
  methods: {}
}
</script>
