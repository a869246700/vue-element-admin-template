<template>
  <div class="filter-table">
    <div v-if="isExportExcel || isFilter" class="operation-bar">
      <div class="left">
        <slot name="left" />
        <div class="export-excel">
          <el-button v-if="isExportExcel" :loading="exportLoading" type="primary" size="small" @click="exportCheckedData">导出选中数据</el-button>
          <el-button :loading="exportLoading" type="primary" size="small" @click="exportAllData">导出所有数据</el-button>
        </div>
      </div>
      <div class="right">
        <!-- 过滤按钮 -->
        <div class="filter-button">
          <slot name="right" />
          <el-popover v-if="isFilter" placement="left" trigger="click">
            <el-tree
              ref="treeRef"
              :data="options"
              :node-key="treeNodeKey"
              :accordion="isAccordion"
              :props="treeProps"
              :default-checked-keys="treeDefaultOptions"
              show-checkbox
              @check="treeCheck"
            />
            <el-button
              slot="reference"
              size="small"
              style="font-size: 20px"
              icon="el-icon-set-up"
              circle
            />
          </el-popover>
        </div>
      </div>
    </div>

    <el-table
      :key="key"
      :data="showTableData"
      :max-height="maxHeight"
      highlight-current-row
      :header-cell-style="{ background: '#f6f6f6' }"
      border
      style="width: 100%"
    >
      <column v-for="item in tableOptions" :key="item.key" :col="item" />
    </el-table>

    <div v-if="isShowPagination" class="pagination">
      <pagination
        :total="total"
        :page="pageInfo.page"
        :limit="pageInfo.limit"
        :auto-scroll="false"
        @pagination="pageInfoChange"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import Column from './Column'

import { parseTime, deepTraversal } from '@/utils'

export default {
  name: 'FilterTable',
  components: {
    Pagination,
    Column
  },
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 表格配置项
    options: {
      type: Array,
      default: () => []
    },
    // 表格高度
    maxHeight: {
      type: Number,
      default: () => null
    },
    // 是否启用分页器
    isPagination: {
      type: Boolean,
      default: false
    },
    // 是否启用过滤器
    isFilter: {
      type: Boolean,
      default: false
    },
    // filterTree 的主键
    treeNodeKey: {
      type: String,
      default: 'prop'
    },
    // filterTree 是否使用手风琴模式
    isAccordion: {
      type: Boolean,
      default: true
    },
    // filterTree 的配置项
    treeProps: {
      type: Object,
      default() {
        return {
          label: 'label',
          children: 'children'
        }
      }
    },
    // 是否显示 按需导出execl表格按钮和功能
    isExportExcel: {
      type: Boolean,
      default: false
    },
    // excel表格 导出名
    exportFilename: {
      type: String,
      default: 'excel-list'
    },
    // 表单的层级
    level: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      // 分页信息
      pageInfo: {
        page: 1,
        limit: 10
      },
      // filterTree选中的项
      filterTreeCheckedNodes: [],
      // filterTree 是否被选中过了
      isFilterTreeChecked: false,
      // 导出按钮是否显示下载中
      exportLoading: false,
      // 表格的key
      key: 0
    }
  },
  computed: {
    // 最终表格显示的数据
    showTableData() {
      // 启动分页
      if (this.isPagination) {
        return this.tableData.slice(
          (this.pageInfo.page - 1) * this.pageInfo.limit,
          this.pageInfo.page * this.pageInfo.limit
        )
      }
      // 没有启动分页
      return this.tableData
    },
    // 表格数据总数量
    total() {
      return this.tableData.length
    },
    // 是否显示分页器
    isShowPagination() {
      // 当表格数据少于10条时，默认不显示分页器
      return this.isPagination && this.total > 10
    },
    // filterTree 的默认选中项
    treeDefaultOptions() {
      return this.options.map((option) => {
        // 需要根据 TreeNodeKey 来判断
        return option[this.treeNodeKey]
      })
    },
    // 表格最终显示的数据配置项
    tableOptions() {
      return this.isFilterTreeChecked ? this.filterTreeCheckedNodes : this.options
    }
  },
  watch: {
    filterTreeCheckedNodes: {
      deept: true,
      handler() {
        this.key++
      }
    }
  },
  methods: {
    // 分页信息修改
    pageInfoChange(e) {
      this.pageInfo.page = e.page
      this.pageInfo.limit = e.limit
    },
    // filterTree 选择框选中
    treeCheck(checkedNode, checkedNodes) {
      if (!this.isFilter) {
        return
      }
      if (!this.isFilterTreeChecked) {
        // 证明被选中过了
        this.isFilterTreeChecked = true
      }
      // 根据 checkedNodes 的 checkedNodes 来渲染表格
      const checkedList = checkedNodes.checkedKeys
      const options = JSON.parse(JSON.stringify(this.options))
      const temp = this.filterTreeNode(checkedList, options)
      this.$set(this, 'filterTreeCheckedNodes', temp)
    },
    // 过滤子节点
    filterTreeNode(checkedList, nodes) {
      return nodes.map((node) => {
        // 如果自己被选中，有无子节点不需要判断
        if (checkedList.includes(node[this.treeNodeKey])) {
          return node
        }

        // 如果自己没有被选中，且有子节点
        if (!checkedList.includes(node[this.treeNodeKey]) && node['children']) {
          node['children'] = this.filterTreeNode(checkedList, node['children'])
          return node['children'].length === 0 ? null : node
        }

        // 如果自己没有被选中，且没有子节点
        if (!checkedList.includes(node[this.treeNodeKey]) && !node['children']) {
          return null
        }
      }).filter(e => e)
    },
    // 导出选中的表单数据
    exportCheckedData() {
      // 导出按钮显示加载中
      this.exportLoading = true
      import('@/vendor/Export2Excel').then((excel) => {
        // 如果还没有被选中，直接点击导出选中数据时
        if (!this.isFilterTreeChecked) {
          this.filterTreeCheckedNodes = this.options
        }
        // 判断是否是多级
        const isMulti = this.filterTreeCheckedNodes.some(e => e.children)
        if (!isMulti) {
          const tHeader = this.filterTreeCheckedNodes.map((option) => option[this.treeProps.label])
          const filterValue = this.filterTreeCheckedNodes.map((option) => option[this.treeNodeKey])
          const data = this.formatJson(filterValue, this.tableData)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.exportFilename
          })
        } else {
          const { multiHeader, filterValue, merges, header } = this.getTableHeader(this.filterTreeCheckedNodes)
          const data = this.formatJson(filterValue, this.tableData)
          //  导出数据
          excel.export_json_to_excel({
            multiHeader,
            header,
            merges,
            data
          })
        }

        // 取消导出按钮显示加载中
        this.$nextTick(() => {
          this.exportLoading = false
        })
      })
    },
    // 导出所有的表单数据
    exportAllData() {
      // 导出按钮显示加载中
      this.exportLoading = true
      import('@/vendor/Export2Excel').then((excel) => {
        // 1. 判断是否是多级表单
        const isMulti = this.options.some(e => e.children)
        if (!isMulti) {
          const tHeader = this.options.map((option) => option[this.treeProps.label])
          const filterValue = this.options.map((option) => option[this.treeNodeKey])
          const data = this.formatJson(filterValue, this.tableData)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.exportFilename
          })
        } else {
          const { multiHeader, filterValue, merges, header } = this.getTableHeader(this.options)
          const data = this.formatJson(filterValue, this.tableData)
          //  导出数据
          excel.export_json_to_excel({
            multiHeader,
            header,
            merges,
            data
          })
        }
        // 取消导出按钮显示加载中
        this.$nextTick(() => {
          this.exportLoading = false
        })
      })
    },
    // 获取表格表头
    getTableHeader(options) {
      // 获取多级表格表头
      const multiHeader = this.getMultiHeader(options)
      const filterValue = this.getFilterValue(options)
      // 获取 excel表格坐标轴
      const excelAxisMap = this.calcAxis(multiHeader[0].length, this.level)
      // 获取 excel表格合并坐标
      const merges = this.calcMerges(multiHeader, excelAxisMap)
      return {
        multiHeader: multiHeader.slice(0, multiHeader.length - 1),
        filterValue,
        merges,
        header: multiHeader[multiHeader.length - 1]
      }
    },
    // 获取多级表格表头项，返回二位数组
    getMultiHeader(options) {
      const multiHeader = []
      // 1. 获取最大层级
      const maxLevel = this.getHeaderRowLevel(options)
      // 2. 将 options 的 tree 转成 list
      const optionArr = deepTraversal(options)
      // 3. 遍历生成初步二维数组
      for (let i = 1; i <= maxLevel; i++) {
        const arr = optionArr.filter(option => option.rowKey === i)
        multiHeader.push(arr)
      }
      // 4. 遍历二维数组，生成最终数组
      for (let i = 0; i < multiHeader.length; i++) {
        let currentRow
        let beforeRow
        if (i > 0) {
          const cRow = []
          const bRow = []
          const resultArr = []
          currentRow = multiHeader[i]
          beforeRow = multiHeader[i - 1]

          for (let j = 0; j < beforeRow.length; j++) {
            const element = beforeRow[j] // 第一行的时候
            const temp = currentRow.filter(e => e.parentId === element.id)
            resultArr.push(temp)

            if (temp.length > 0) {
              // 存入 temp长度 - 1 个空格占位
              for (let z = 0; z < temp.length; z++) {
                z === 0 ? bRow.push(element.label) : bRow.push('')
              }
            } else {
              bRow.push(element.label)
            }
          }

          // 整理下面一个表格
          resultArr.map(item => {
            const tempArr = []
            if (item.length === 0) {
              cRow.push('')
            } else {
              item.forEach(e => tempArr.push(e.label))
            }
            cRow.push(...tempArr)
          })

          multiHeader[i] = cRow
          multiHeader[i - 1] = bRow
        }
      }
      return multiHeader
    },
    // 根据 excel表单列表, 计算出 excel表格中合并的单元格
    calcMerges(multiHeader, excelAxisMap) {
      const merges = []
      // 遍历二维数组
      for (let y = 0; y < multiHeader.length - 1; y++) {
        const currentRow = multiHeader[y]

        for (let x = 0; x < currentRow.length; x++) {
          if (!currentRow[x]) {
            const low = x - 1
            let high = currentRow.slice(x).findIndex(e => e)
            high = high <= 0 ? x : (high + low)
            merges.push(`${excelAxisMap[y][low]}:${excelAxisMap[y][high]}`)
          } else {
            for (let z = y; z < multiHeader.length; z++) {
              if (!multiHeader[z][x]) {
                merges.push(`${excelAxisMap[y][x]}:${excelAxisMap[z][x]}`)
              }
            }
          }
        }
      }

      return merges
    },
    // 计算出导出excel表格头的坐标
    calcAxis(width, deep) {
      const excelAxis = []
      const axisMap = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

      for (let j = 1; j <= deep; j++) {
        const row = []
        // 根据表格最大空度，计算出x坐标轴
        for (let i = 0; i < width; i++) {
          const divisor = Math.floor((i) / 26)
          const remainder = i % 26
          if (divisor === 0) {
            row.push(axisMap[remainder] + j)
          } else {
            row.push(axisMap[divisor - 1] + axisMap[remainder] + j)
          }
        }
        excelAxis.push(row)
      }
      return excelAxis
    },
    // 获取表格层级
    getHeaderRowLevel(options, level, maxLevel) {
      // 初始化
      if (!level && !maxLevel) {
        level = 1
        maxLevel = 1
      }
      level++ // 升级
      // 执行递归判断最大深度
      options.map((option) => {
        // 如果有children属性，层级+1
        if (option['children']) {
          // 最大层级 与 当前层级比较
          if (level > maxLevel) {
            maxLevel = level
          }
          this.getHeaderRowLevel(option['children'], level, maxLevel)
        }
      })
      return maxLevel
    },
    // 获取表格头每行配置信息
    getRow(options) {
      const arr = []
      if (!options) {
        arr.push('')
        return arr
      }

      options.map((option) => {
        const tempArr = []
        tempArr.push(option[this.treeProps.label])

        if (option['children'] && option['children'].length > 1) {
          for (let i = 0; i < option['children'].length - 1; i++) {
            tempArr.push('')
          }
        }
        arr.push(...tempArr)
      })

      return arr
    },
    // 获取最终显示的表格参数信息
    getFilterValue(options) {
      const list = []
      options.map((option) => {
        if (!option['children']) {
          return option[this.treeNodeKey]
        } else {
          return this.getFilterValue(option['children'])
        }
      }).map(item => {
        if (item instanceof Array) {
          list.push(...item)
        } else {
          list.push(item)
        }
      })
      return list
    },
    // 数据格式化
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-table {
  .operation-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #dcdcdc;
    border-bottom: none;
    padding: 8px 6px;
  }
}
</style>
