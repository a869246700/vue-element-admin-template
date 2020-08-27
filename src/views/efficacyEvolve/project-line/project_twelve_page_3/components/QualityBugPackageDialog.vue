<template>
  <el-dialog
    width="70%"
    top="5vh"
    title="控制面bug明细列表"
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
              v-if="item.prop === 'work_package' || item.prop === 'project' || item.prop === 'realm' || item.prop === 'type_ascription' || item.prop === 'stage_name' || item.prop === 'user_name' || item.prop === 'ptgttm'"
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
            v-if="item.prop === 'work_package'"
            class="work-package"
            @click="handleWorkPackageClick(row)"
          >{{ row[item.prop] }}</span>
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
        work_package: undefined,
        project: undefined,
        realm: undefined,
        type_ascription: undefined,
        stage_name: undefined,
        user_name: undefined,
        ptgttm: undefined
      } // 内部查询条件
    }
  },
  computed: {
    tableOptions() {
      return [
        {
          prop: 'work_package',
          label: '工作包',
          minWidth: 160,
          fixed: 'left'
        },
        {
          prop: 'code',
          label: '代码量',
          minWidth: 70,
          fixed: 'left'
        },
        {
          prop: 'project',
          label: '项目名称',
          minWidth: 200
        },
        {
          prop: 'realm',
          label: '测试域',
          minWidth: 100
        },
        {
          prop: 'type_ascription',
          label: '类型',
          minWidth: 80
        },
        {
          prop: 'stage_name',
          label: '阶段',
          minWidth: 80
        },
        {
          prop: 'user_name',
          label: '开发负责人',
          minWidth: 100
        },
        {
          prop: 'ptgttm',
          label: '测试负责人',
          minWidth: 100
        },
        {
          prop: 'all_num',
          label: '整体产出',
          minWidth: 90
        },
        {
          prop: 'all_rate',
          label: '整体缺陷',
          minWidth: 90
        },
        {
          prop: 'jc',
          label: '集成',
          align: 'center',
          children: [
            {
              prop: 'jc_rate',
              label: '缺陷率',
              minWidth: 60
            },
            {
              prop: 'jc_all_num',
              label: '总计',
              minWidth: 50
            },
            {
              prop: 'jc_pi_num',
              label: '平台测试',
              minWidth: 73
            },
            {
              prop: 'jc_pd_num',
              label: '事业部测试',
              minWidth: 88
            }
          ]
        },
        {
          prop: 'zr',
          label: '准入',
          align: 'center',
          children: [
            {
              prop: 'zr_rate',
              label: '缺陷率',
              minWidth: 60
            },
            {
              prop: 'zr_all_num',
              label: '总计',
              minWidth: 50
            },
            {
              prop: 'zr_pi_num',
              label: '平台测试',
              minWidth: 73
            },
            {
              prop: 'zr_pd_num',
              label: '事业部测试',
              minWidth: 88
            }
          ]
        },
        {
          prop: 'sl',
          label: '首轮',
          align: 'center',
          children: [
            {
              prop: 'sl_rate',
              label: '缺陷率',
              minWidth: 60
            },
            {
              prop: 'sl_all_num',
              label: '总计',
              minWidth: 50
            },
            {
              prop: 'sl_pi_num',
              label: '平台测试',
              minWidth: 73
            },
            {
              prop: 'sl_pd_num',
              label: '事业部测试',
              minWidth: 88
            }
          ]
        },
        {
          prop: 'cl',
          label: '次轮',
          align: 'center',
          children: [
            {
              prop: 'cl_rate',
              label: '缺陷率',
              minWidth: 60
            },
            {
              prop: 'cl_all_num',
              label: '总计',
              minWidth: 50
            },
            {
              prop: 'cl_pi_num',
              label: '平台测试',
              minWidth: 73
            },
            {
              prop: 'cl_pd_num',
              label: '事业部测试',
              minWidth: 88
            }
          ]
        },
        {
          prop: 'hg',
          label: '回归',
          align: 'center',
          children: [
            {
              prop: 'hg_rate',
              label: '缺陷率',
              minWidth: 60
            },
            {
              prop: 'hg_all_num',
              label: '总计',
              minWidth: 50
            },
            {
              prop: 'hg_pi_num',
              label: '平台测试',
              minWidth: 73
            },
            {
              prop: 'hg_pd_num',
              label: '事业部测试',
              minWidth: 88
            }
          ]
        },
        {
          prop: 'omit_rate',
          label: '遗漏率',
          minWidth: '75',
          align: 'center'
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
