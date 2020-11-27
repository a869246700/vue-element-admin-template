<template>
  <el-row :gutter="10">
    <el-col v-for="(item, index) in list" :key="index" :span="12" style="margin: 10px 0;">
      <simple-panel-item
        :project="item.project"
        :duty-info="item.dutyInfo"
        :project-stage-list="item.projectStageList"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </el-col>
  </el-row>
</template>

<script>
import SimplePanelItem from './SimplePanelItem'

export default {
  components: { SimplePanelItem },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleEdit(item) {
      this.$emit('edit', item)
    },
    handleDelete(item) {
      this.$emit('delete', item)
    }
  }
}
</script>
