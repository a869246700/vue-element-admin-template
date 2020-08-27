<template>
  <el-dialog title="资源明细" :visible.sync="isDialogVisible" width="70%" class="cost-dialog">
    <div class="tool-bar">
      <el-button type="primary" size="small">导出资源明细数据</el-button>
    </div>
    <!-- 表格 -->
    <el-table v-loading="isLoading" :data="list" highlight-current-row border style="width: 100%">
      <el-table-column
        v-for="item in tableOptions"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
        :fixed="item.fixed || false"
        show-overflow-tooltip
      >
        <template #header>
          <div class="table-title">
            <span class="title">{{ item.label }}</span>
            <el-popover
              v-if="item.prop !== 'total_time'"
              :ref="item.prop"
              placement="bottom-end"
              :width="200"
              trigger="click"
            >
              <el-input
                v-model.trim="listQuery[item.prop]"
                style="margin-bottom: 5px"
                @blur="handleSearchClcik(item.prop)"
              />
              <div style="display: flex">
                <el-button
                  size="mini"
                  type="primary"
                  style="width: 50%"
                  @click="handleSearchClcik(item.prop)"
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
      </el-table-column>
    </el-table>

    <!-- 外层表格分段器 -->
    <pagination
      v-if="total>=pageSize"
      :total="total"
      :page="currentPage"
      :limit="pageSize"
      :auto-scroll="false"
      @pagination="handlePageUpdate"
    />
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination/index'
export default {
  name: 'CostDialog',
  components: { Pagination },
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isLoading: false,
      isDialogVisible: false,
      listQuery: {
        type: undefined,
        area: undefined,
        realm: undefined,
        project: undefined,
        user_name: undefined,
        department: undefined,
        group_name: undefined,
        task_name: undefined,
        total_time: undefined,
        week: undefined,
        createDate: undefined,
        stage: undefined,
        project_process: undefined
      },
      temp: [],
      tableShowData: [],
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页大小
      key: 1
    }
  },
  computed: {
    list() {
      const currentPage = this.currentPage
      const pageSize = this.pageSize
      return this.tableShowData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    },
    total() {
      return this.tableShowData.length
    },
    tableOptions() {
      return {
        type: {
          prop: 'type',
          label: '大类',
          minWidth: 80
        },
        area: {
          prop: 'area',
          label: '类型',
          minWidth: 90
        },
        realm: {
          prop: 'realm',
          label: '域名',
          minWidth: 90
        },
        project: {
          prop: 'project',
          label: '项目名称',
          minWidth: 90
        },
        user_name: {
          prop: 'user_name',
          label: '人员姓名',
          minWidth: 90
        },
        department: {
          prop: 'department',
          label: '部门',
          minWidth: 110
        },
        group_name: {
          prop: 'group_name',
          label: '专业组',
          minWidth: 110
        },
        task_name: {
          prop: 'task_name',
          label: '任务名称',
          minWidth: 640
        },
        total_time: {
          prop: 'total_time',
          label: '资源投入(h)',
          minWidth: 100
        },
        week: {
          prop: 'week',
          label: '周期',
          minWidth: 170
        },
        createDate: {
          prop: 'createDate',
          label: '时间',
          minWidth: 150
        },
        stage: {
          prop: 'stage',
          label: '阶段',
          minWidth: 70
        },
        project_process: {
          prop: 'project_process',
          label: '工序',
          minWidth: 100
        }
      }
    }
  },
  watch: {
    tableData(newV, oldV) {
      this.tableShowData = newV.slice()
    }
  },
  methods: {
    handleSearchClcik(key) {
      this.$nextTick(() => {
        this.closePopover(key)
      })

      this.tableShowData = this.getList()
    },
    handleResetClick(key) {
      this.$set(this.listQuery, key, undefined)

      this.tableShowData = this.getList()

      this.$nextTick(() => {
        this.closePopover(key)
      })
    },
    getList() {
      let list = this.tableData.slice()

      for (const key in this.listQuery) {
        if (this.listQuery[key] !== '' && this.listQuery[key]) {
          list = list.filter((e) => String(e[key]).includes(this.listQuery[key]))
        }
      }
      return list
    },
    closePopover(key) {
      this.$refs[key].forEach((ele) => ele.doClose())
    },
    handlePageUpdate(e) {
      this.currentPage = e.page
      this.pageSize = e.limit
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
</style>
