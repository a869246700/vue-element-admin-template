<template>
  <div class="table-container">
    <!-- 表格顶部控制栏 -->
    <div class="operation-bar">
      <el-button
        v-waves
        :loading="downloadLoading"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="handleDownloadClick"
      >新增课题分析</el-button>
    </div>

    <!-- 表格 -->
    <div class="table-content">
      <el-table
        :data="list"
        style="width: 100%"
        border
        fit
        :header-cell-style="{'background-color': '#FAFAFA' }"
        highlight-current-row
      >
        <el-table-column prop="project_name" min-width="120" align="center" show-overflow-tooltip>
          <template #header>
            <div class="table-title">
              <span>项目名称</span>
              <el-popover ref="project_name" placement="bottom-end" :width="200" trigger="click">
                <el-input v-model="listQuery.project_name" style="margin-bottom: 5px" />
                <div style="display: flex">
                  <el-button
                    size="mini"
                    type="primary"
                    style="width: 50%"
                    @click="handleSearchClick('project_name')"
                  >查询</el-button>

                  <el-button
                    size="mini"
                    style="width: 50%"
                    @click="handleResetClick('project_name')"
                  >重置</el-button>
                </div>

                <i
                  slot="reference"
                  class="el-icon-help table-title-icon"
                  @click="resetList('project_name')"
                />
              </el-popover>
            </div>
          </template>
        </el-table-column>

        <el-table-column min-width="120" fixed="right" align="center">
          <template #header>
            <span style="margin-right: 5px">操作</span>
            <el-popover placement="top-start" :width="170" trigger="hover" content="预留操作">
              <i slot="reference" class="el-icon-question" />
            </el-popover>
          </template>
          <template slot-scope="{row}">
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              circle
              @click="handleDeleteClick(row)"
            />
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              circle
              @click="handleUpdateClcik(row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { detailTableList } from './options'
import { parseTime } from '@/utils'

export default {
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        High: 'danger',
        Medium: 'warning',
        Low: 'success'
      }
      return statusMap[status]
    },
    parseTime
  },
  data() {
    return {
      tableKey: 0, // 用来强制视图的刷新
      total: 0, // 搜索到的数据条数
      detailTableList, // 表格头列表配置
      // 筛选的条件
      listQuery: {
        project_name: undefined,
        technical_issues: undefined,
        acceptance_method: undefined,
        work_package: undefined,
        dev_principal: undefined,
        test_principal: undefined,
        bugid: undefined,
        bug_desc: undefined,
        omission_type: undefined,
        omission_reason: undefined,
        improve_solution: undefined
      },
      listVisible: {
        project_name: false,
        technical_issues: false,
        acceptance_method: false,
        work_package: false,
        dev_principal: false,
        test_principal: false,
        bugid: false,
        bug_desc: false,
        omission_type: false,
        omission_reason: false,
        improve_solution: false
      },
      // 项目 select 配置项
      acceptanceMethodOptions: [
        { label: '验证结项', id: 1 },
        { label: '评审结项', id: 2 }
      ],
      downloadLoading: false, // 下载按钮加载
      listLoading: true, // 表单加载动画
      list: [{ acceptance_method: '验证结项' }, { acceptance_method: '评审结项' }, {}],
      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogStatus: '', // 当前 添加和修改对话框 的类型
      dialogFormVisible: false, // 控制添加和修改对话框的显示与隐藏
      temp: {
        id: undefined,
        project_name: undefined,
        task_name: undefined,
        forecast_completion_time: new Date(),
        principal: undefined,
        target: undefined,
        current_procress: undefined,
        risk_issue: undefined,
        solution: undefined,
        deviation_reason: undefined
      },
      projectNameVisible: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.listLoading = false
    }, 2000)
  },
  methods: {
    // 点击下载
    handleDownloadClick() {
      this.downloadLoading = true

      setTimeout(() => {
        this.$message({
          message: '下载成功',
          type: 'success'
        })
        this.downloadLoading = false
      }, 2000)
    },
    // 点击 popover 搜索
    handleSearchClick(key) {
      // 1. 隐藏popover
      this.resetList(key)
      // 2. 执行搜索
      this.getList()
    },
    // 点击popover重置
    handleResetClick(key) {
      this.resetList(key)
      this.listQuery[key] = undefined
    },
    // 隐藏 popover
    resetList(key) {
      this.$refs[key].doClose()
    },
    // 搜索
    getList() {
      console.log(this.listQuery)
    }
  }
}
</script>

<style lang="scss" scoped>
// 表单操作栏
.operation-bar {
  display: flex;

  .el-input {
    margin-right: 10px;
  }

  .el-select {
    margin-right: 10px;
  }
}

.table-content {
  margin-top: 20px;
}

// 分页器
.pagination {
  display: flex;
  justify-content: center;
}

// 选择器
.select-item {
  display: flex;
  align-items: center;

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 8px;
  }
}

.table-title {
  position: relative;

  .table-title-icon {
    position: absolute;
    right: 0;
    top: 4px;
  }
}
</style>
