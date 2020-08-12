<template>
  <div class="table-container">
    <!-- 表格顶部控制栏 -->
    <div class="operation-bar">
      <el-input
        v-model="listQuery.risk_item"
        placeholder="风险项"
        style="width: 150px;"
        @keyup.enter.native="handleSearchClick"
      />

      <el-button
        v-waves
        type="primary"
        size="small"
        icon="el-icon-search"
        @click="handleSearchClick"
      >搜索</el-button>

      <el-button type="primary" size="small" icon="el-icon-edit" @click="handleCreateClcik">添加</el-button>

      <el-button
        v-waves
        :loading="downloadLoading"
        type="primary"
        size="small"
        icon="el-icon-download"
        @click="handleDownloadClick"
      >导出数据</el-button>

      <el-button
        type="primary"
        size="small"
        icon="el-icon-document"
        @click="hanleShowDataViewClick"
      >数据视图</el-button>
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
          v-for="(item, index) in tableTitleList"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <!-- 如果是创建时间 | 希望解决时间 | 最后更新时间 则进行时间格式过滤 -->
            <span
              v-if="item.prop === 'forecast_completion_time'"
            >{{ row[item.prop] | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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

    <!-- 分段器 -->
    <div class="pagination">
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        :auto-scroll="false"
        @pagination="getList"
      />
    </div>

    <!-- 添加 | 编辑 对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataFormRef"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="110px"
        style="width: 60%; margin: 0 auto;"
      >
        <el-form-item label="项目" prop="project_name">
          <el-select v-model="temp.project_name" placeholder="请选择项目" style="width: 100%">
            <el-option
              v-for="item in projectOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="任务名称" prop="task_name">
          <el-input v-model.trim="temp.task_name" style="width: 100%" clearable />
        </el-form-item>

        <el-form-item label="负责人" prop="principal">
          <el-input v-model.trim="temp.principal" style="width: 100%" clearable />
        </el-form-item>

        <el-form-item label="目标" prop="target">
          <el-input
            v-model.trim="temp.target"
            type="textarea"
            :row="2"
            style="width: 100%"
            clearable
          />
        </el-form-item>

        <el-form-item label="当前进展" prop="current_procress">
          <el-input
            v-model.trim="temp.current_procress"
            type="textarea"
            :row="2"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="风险&问题" prop="risk_issue">
          <el-input v-model.trim="temp.risk_issue" type="textarea" :row="2" style="width: 100%" />
        </el-form-item>

        <el-form-item label="对策" prop="solution">
          <el-input v-model.trim="temp.solution" style="width: 100%" clearable />
        </el-form-item>

        <el-form-item label="预计达成时间" prop="forecast_completion_time">
          <el-date-picker
            v-model="temp.forecast_completion_time"
            type="datetime"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="偏差原因" prop="deviation_reason">
          <el-input v-model.trim="temp.deviation_reason" type="textarea" :row="2" style="width: 100%" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create' ? createData() : updateData()">确定</el-button>
      </div>
    </el-dialog>

    <!-- 数据视图 -->
    <el-dialog :visible.sync="dataViewVisible">
      <div class="content">123</div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { tableTitleList, rules } from './options'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils'

export default {
  components: { Pagination },
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
      tableTitleList, // 表格头列表配置
      // 筛选的条件
      listQuery: {
        page: 1, // 第几页
        limit: 20, // 每页多少个
        risk_status: undefined, // 风险状态
        risk_item: undefined, // 风险项
        risk_level: undefined, // 影响
        type: undefined // 类型
      },
      // 项目 select 配置项
      projectOptions: [
        { label: '12.5PL1', id: 1 },
        { label: '12.5PL1_S2', id: 2 }
      ],
      downloadLoading: false, // 下载按钮加载
      listLoading: true, // 表单加载动画
      list: [],
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
      rules, // 表单规则
      dataViewVisible: false // 控制数据视图的显示与隐藏
    }
  },
  mounted() {
    setTimeout(() => {
      this.listLoading = false
    }, 2000)
  },
  methods: {
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
