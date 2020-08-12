<template>
  <div class="table-container">
    <!-- 表格顶部控制栏 -->
    <div class="operation-bar">
      <el-input
        v-model="listQuery.technical_issues"
        placeholder="技术课题"
        style="width: 150px;"
        clearable
        @keyup.enter.native="handleSearchClick"
      />
      <el-select
        v-model="listQuery.acceptance_method"
        placeholder="请选择验收方式"
        style="width: 160px"
        clearable
      >
        <el-option
          v-for="item in acceptanceMethodOptions"
          :key="item.key"
          :label="item.label"
          :value="item.label"
        />
      </el-select>

      <el-button
        v-waves
        type="primary"
        size="small"
        icon="el-icon-search"
        @click="handleSearchClick"
      >搜索</el-button>

      <el-button
        type="primary"
        size="small"
        icon="el-icon-setting"
        @click="handleSearchResetClick"
      >重置</el-button>

      <el-button
        v-waves
        :loading="downloadLoading"
        type="primary"
        size="small"
        icon="el-icon-download"
        @click="handleDownloadClick"
      >导出课题分析统计</el-button>
    </div>

    <!-- 表格 -->
    <div class="table-content">
      <el-table
        v-loading="listLoading"
        :data="list"
        style="width: 100%"
        border
        fit
        :header-cell-style="{'background-color': '#FAFAFA' }"
        highlight-current-row
      >
        <el-table-column
          v-for="(item, index) in statisticsTableList"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <!-- 如果是验收方式 -->
            <div v-if="item.prop === 'acceptance_method'">
              <el-select
                v-model="row[item.prop]"
                :placeholder="row[item.prop] || '请选择'"
                style="width: 110px"
              >
                <el-option
                  v-for="method in acceptanceMethodOptions"
                  :key="method.key"
                  :label="method.label"
                  :value="method.label"
                />
              </el-select>
            </div>
            <!-- 正常输出 -->
            <span v-else>{{ row[item.prop] }}</span>
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
import { statisticsTableList } from './options'
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
      statisticsTableList, // 表格头列表配置
      // 筛选的条件
      listQuery: {
        technical_issues: undefined, // 技术课题
        acceptance_method: undefined // 验收方式
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
      dataViewVisible: false // 控制数据视图的显示与隐藏
    }
  },
  mounted() {
    setTimeout(() => {
      this.listLoading = false
    }, 2000)
  },
  methods: {
    // 点击搜索重置
    handleSearchResetClick() {
      this.listQuery.technical_issues = undefined
      this.listQuery.acceptance_method = undefined
    },
    // 点击搜索
    handleSearchClick() {
      this.listLoading = true

      // 重置页面为第一页
      this.listQuery.page = 1
      setTimeout(() => {
        this.listLoading = false
      }, 2000)
    },
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
    getList(e) {
      console.log(this.listQuery)
    },
    // 修改优先级
    handlePriorityChange(row) {
      console.log(row)
    },
    // 修改是否闭环
    handleCloseLoopChange(row) {
      this.$notify({
        title: '修改',
        message: '成功修改闭环状态',
        type: 'success',
        duration: 2000
      })
    },
    // 重置 temp
    resetTemp() {
      this.temp = {
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
      }
    },
    // 点击添加按钮, 显示添加表单
    handleCreateClcik() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      // 清除原有的校验内容
      this.$nextTick(() => {
        this.$refs.dataFormRef.clearValidate()
      })
    },
    // 真正的添加数据
    createData() {
      // 1. 表单校验
      this.$refs.dataFormRef.validate((valid) => {
        if (valid) {
          // 模拟 id
          this.temp.id = this.list.length === 0 ? 1 : this.list[this.list.length - 1].id + 1
          console.log(this.temp)
          // 添加数据
          this.list.push(this.temp)
          // 隐藏添加窗口
          this.dialogFormVisible = false
        }
      })
    },
    // 点击编辑按钮，显示编辑表单
    handleUpdateClcik(row) {
      this.temp = Object.assign({}, row) // 复制对象
      // 将 时间戳 修改为 date
      this.temp.creation_time = this.temp.creation_time
        ? new Date(this.temp.creation_time)
        : new Date()
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      // 清除原有的校验内容
      this.$nextTick(() => {
        this.$refs.dataFormRef.clearValidate()
      })
    },
    // 真正的修改数据
    updateData() {
      // 1. 表单校验
      this.$refs.dataFormRef.validate((valid) => {
        if (valid) {
          console.log('进行修改')
          // 1. 对象深拷贝
          const tempData = Object.assign({}, this.temp)
          // 2. 将 date 修改为 时间戳
          tempData.creation_time = +new Date(tempData.creation_time)
          // 3. 根据 id 找到下标值
          const index = this.list.findIndex((v) => v.id === this.temp.id)
          // 4. 进行数据修改
          this.list.splice(index, 1, this.temp)

          // 5. 提示修改成功
          this.$notify({
            title: '成功',
            message: '修改数据成功',
            type: 'success',
            duration: 2000
          })

          // 6. 隐藏添加窗口
          this.dialogFormVisible = false
        }
      })
    },
    // 点击询问是否删除
    handleDeleteClick(row) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 1500
          })
        })
        .catch(() => {
          this.$message({
            message: '已取消删除',
            type: 'info',
            duration: 1500
          })
        })
    },
    // 点击显示数据视图
    hanleShowDataViewClick() {
      this.dataViewVisible = true
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
</style>
