<template>
  <!-- 内层dialog -->
  <el-dialog
    width="70%"
    top="5vh"
    title="控制面bug明细列表"
    :visible.sync="dialogVisible"
    class="quality-innerdialog"
    append-to-body
    :before-close="handleDialogClose"
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
        :show-overflow-tooltip="item.sot"
      >
        <template #header>
          <div class="table-title">
            <span class="title">{{ item.label }}</span>
            <el-popover
              v-if="item.prop !== 'submitDate' && item.prop !== 'stage'"
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
    }
  },
  data() {
    return {
      dialogVisible: false, // 内部对话框
      showTableData: undefined, // 内部表格展示的数据
      isLoading: false,
      currentPage: 1,
      limit: 10,
      total: 0,
      listQuery: {
        bugid: undefined,
        submiter: undefined,
        project: undefined,
        work_package: undefined,
        stage_name: undefined,
        state: undefined,
        severity: undefined,
        source: undefined,
        charge: undefined,
        developLeader: undefined
      } // 内部查询条件
    }
  },
  computed: {
    tableOptions() {
      return [
        {
          prop: 'bugid',
          label: 'bugid',
          minWidth: 73,
          fixed: true
        },
        {
          prop: 'submiter',
          label: '提交人',
          minWidth: 80,
          fixed: true
        },
        {
          prop: 'submitDate',
          label: '提交时间',
          minWidth: 145
        },
        {
          prop: 'project',
          label: '项目名称',
          minWidth: 90
        },
        {
          prop: 'work_package',
          label: '工作包',
          minWidth: 130
        },
        {
          prop: 'stage_name',
          label: '阶段类型',
          minWidth: 90
        },
        {
          prop: 'state',
          label: '状态',
          minWidth: 184,
          sot: true
        },
        {
          prop: 'severity',
          label: '等级',
          minWidth: 75
        },
        {
          prop: 'source',
          label: '来源',
          minWidth: 170,
          sot: true
        },
        {
          prop: 'charge',
          label: '开发负责人',
          minWidth: 100
        },
        {
          prop: 'developLeader',
          label: '开发部门',
          minWidth: 240
        },
        {
          prop: 'stage',
          label: '阶段',
          minWidth: 80
        }
      ]
    },
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
    handleDialogClose() {
      this.$emit('close')
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
</style>
