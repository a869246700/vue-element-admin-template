<template>
  <div class="table-contaner">
    <el-table
      :data="list"
      highlight-current-row
      border
      :header-cell-style="{background: '#f6f6f6'}"
      :max-height="maxHeight"
      style="width: 100%"
    >
      <column v-for="item in options" :key="item.key" :col="item" />
    </el-table>
  </div>
</template>

<script>
import Column from './Column'

export default {
  components: {
    Column
  },
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    maxHeight: {
      type: Number,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    tableDataComputed() {
      return this.tableData
    }
  },
  watch: {
    tableDataComputed(newV, oldV) {
      this.list = newV
    }
  }
}
</script>
