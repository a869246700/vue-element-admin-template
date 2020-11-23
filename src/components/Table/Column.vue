<template>
  <el-table-column
    :prop="col.prop || col.dataIndex"
    :label="col.label || col.title"
    :fixed="col.fixed"
    :min-width="col.width"
    :align="col.children ? 'center' : ''"
    :sortable="col.sortable"
    :sort-method="col.sorter"
    :show-overflow-tooltip="col.sot"
  >
    <template slot-scope="{row}">
      <span v-if="col.render" v-html="col.render(row[col.prop], row)" />
      <span v-else>{{ row[col.prop] }}</span>
    </template>
    <template v-if="col.children && col.children.length">
      <column v-for="item in col.children" :key="item.key" :col="item" />
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'Column',
  props: {
    col: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
