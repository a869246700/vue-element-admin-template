<template>
  <el-dialog
    width="70%"
    top="5vh"
    :title="topic + '课题工作包统计'"
    :visible.sync="dialogVisible"
    append-to-body
    class="quality-innerdialog"
  >
    <el-table
      v-loading="isLoading"
      :data="showTableData"
      highlight-current-row
      border
      style="width: 100%"
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
        :fixed="item.fixed || false"
        :align="item.align"
        show-overflow-tooltip
      >
        <template #header>
          <div class="table-title">
            <span class="title">{{ item.label }}</span>
            <el-popover
              v-if="item.search"
              :ref="item.prop"
              placement="bottom-end"
              :width="200"
              trigger="click"
            >
              <el-input v-model.trim="listQuery[item.prop]" style="margin-bottom: 5px" />
              <div style="display: flex">
                <el-button
                  size="mini"
                  type="primary"
                  style="width: 50%"
                  @click="handleSearchClick(item.prop)"
                >查询</el-button>

                <el-button size="mini" style="width: 50%" @click="handleResetClick(item.prop)">重置</el-button>
              </div>

              <i
                slot="reference"
                :class="listQuery[item.prop] !== undefined && listQuery[item.prop] !== ''? 'active': ''"
                class="el-icon-help table-title-icon"
              />
            </el-popover>
          </div>
        </template>

        <template slot-scope="{row}">
          <span
            v-if="item.prop === 'topic_code'"
          >{{ Math.round(object.code * 100) / 100 }}</span>
          <span v-else>{{ row[item.prop] }}</span>
        </template>

        <div v-if="item.children">
          <el-table-column
            v-for="child in item.children"
            :key="child.prop"
            :prop="child.prop"
            :label="child.label"
            :min-width="child.minWidth"
          />
        </div>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <pagination
        v-if="total>=limit"
        :total="total"
        :page="currentPage"
        :limit="limit"
        :auto-scroll="false"
        @pagination="handlePageUpdate"
      />
    </div>
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination/index'

export default {
  components: { Pagination },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    object: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      topic: '',
      dialogVisible: false, // 内部对话框
      showTableData: undefined, // 内部表格展示的数据
      isLoading: false,
      currentPage: 1,
      limit: 10,
      total: 0,
      listQuery: {
        check_mode: undefined,
        work_package: undefined,
        workPacketManager: undefined,
        ptgttm: undefined
      }, // 内部查询条件
      tableOptions: [
        {
          prop: 'topic_name',
          label: '技术课题',
          minWidth: 100
        },
        {
          prop: 'topic_code',
          label: '技术课题代码量',
          minWidth: 115
        },
        {
          prop: 'check_mode',
          label: '验收方式',
          minWidth: 90,
          search: true
        },
        {
          prop: 'work_package',
          label: '工作包',
          minWidth: 140,
          search: true
        },
        {
          prop: 'code',
          label: '代码量',
          minWidth: 60
        },
        {
          prop: 'workPacketManager',
          label: '开发负责人',
          minWidth: 100,
          search: true
        },
        {
          prop: 'ptgttm',
          label: '测试负责人',
          minWidth: 100,
          search: true
        },
        {
          prop: 'all_num',
          label: '工作包缺陷总数',
          minWidth: 115
        },
        {
          prop: 'type_all_num',
          label: '技术课题遗漏个数',
          minWidth: 128
        },
        {
          prop: 'type_all_rate',
          label: '缺陷率',
          minWidth: 65
        },
        {
          prop: 'function_type',
          label: '功能类',
          minWidth: 65
        },
        {
          prop: 'performance_type',
          label: '性能类',
          minWidth: 65
        },
        {
          prop: 'no_function_type',
          label: '非功能类',
          minWidth: 80
        }
      ]
    }
  },
  computed: {
    list() {
      let list = this.tableData
      for (const key in this.listQuery) {
        if (this.listQuery[key] !== '' && this.listQuery[key]) {
          list = list.filter((e) => String(e[key]).includes(this.listQuery[key]))
        }
      }
      return list
    }
  },
  methods: {
    handleWorkPackageClick(row) {
      this.$emit('work-package-click', row)
    },
    // 点击 popover 搜索
    handleSearchClick(key) {
      // 1. 隐藏popover
      this.closePopover(key)
      // 2. 执行搜索
      this.getList()
    },
    // 点击popover重置
    handleResetClick(key) {
      // 1. 重置输入框内容
      this.listQuery[key] = undefined
      // 2. 执行搜索
      this.getList()
      // 3. 隐藏popover
      this.closePopover(key)
    },
    // 关闭 popover
    closePopover(key) {
      // 展示无法关闭
      this.$refs[key].forEach((item) => {
        item.doClose()
      })
    },
    // 搜索
    getList() {
      const currentPage = this.currentPage
      const limit = this.limit

      this.showTableData = this.list.slice((currentPage - 1) * limit, currentPage * limit)
      this.total = this.list.length
    },
    // 修改分页器
    handlePageUpdate(e) {
      this.currentPage = e.page
      this.limit = e.limit
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.table-title {
  display: flex;
  justify-content: space-between;

  .title {
    flex: 1;
  }

  .table-title-icon {
    cursor: pointer;
  }

  .table-title-icon:hover {
    background-color: #d9d9d9;
  }
}

.active {
  color: #1895ff;
}

.work-package {
  color: #1890ff;
  cursor: pointer;
}

.pagination-container {
  margin: 0;
}
</style>
