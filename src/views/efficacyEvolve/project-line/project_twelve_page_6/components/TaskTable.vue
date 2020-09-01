<template>
  <div class="table-container">
    <!-- 表格顶部控制栏 -->
    <div class="operation-bar">
      <div class="left">
        <el-radio-group v-model="currentStage" size="small" @change="handleStageChange">
          <el-radio-button
            v-for="item in projectStageList"
            :key="item.index_num"
            :label="item.stage_name"
          />
        </el-radio-group>
      </div>

      <div class="right" style="margin-right: 30px">
        <el-button type="primary" size="small" icon="el-icon-edit" @click="handleCreateClcik">添加数据</el-button>

        <el-button
          v-waves
          :loading="butLoading"
          type="primary"
          size="small"
          icon="el-icon-download"
          @click="handleExportClick"
        >导出数据</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <div class="table-content">
      <el-table
        v-loading="tableLoading"
        :data="list"
        style="width: 100%"
        border
        fit
        :header-cell-style="{'background-color': '#FAFAFA' }"
        highlight-current-row
      >
        <el-table-column
          v-for="item in tableOptions"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <!-- 如果是创建时间 | 希望解决时间 | 最后更新时间 则进行时间格式过滤 -->
            <span
              v-if="item.prop === 'planFinishDate'"
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
        v-show="total > limit"
        :total="total"
        :page.sync="currentPage"
        :limit.sync="limit"
        :auto-scroll="false"
        @pagination="handlePaginationChange"
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
        <el-form-item label="项目" prop="project">
          <el-select v-model="temp.project" placeholder="请选择项目" style="width: 100%">
            <el-option
              v-for="item in projectOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model.trim="temp.taskName" style="width: 100%" clearable />
        </el-form-item>

        <el-form-item label="负责人" prop="dutyName">
          <el-input v-model.trim="temp.dutyName" style="width: 100%" clearable />
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

        <el-form-item label="当前进展" prop="newestProgress">
          <el-input
            v-model.trim="temp.newestProgress"
            type="textarea"
            :row="2"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="风险&问题" prop="risk">
          <el-input v-model.trim="temp.risk" type="textarea" :row="2" style="width: 100%" />
        </el-form-item>

        <el-form-item label="对策" prop="countermeasure">
          <el-input v-model.trim="temp.countermeasure" style="width: 100%" clearable />
        </el-form-item>

        <el-form-item label="预计达成时间" prop="planFinishDate">
          <el-date-picker v-model="temp.planFinishDate" type="datetime" style="width: 100%" />
        </el-form-item>

        <el-form-item label="偏差原因" prop="cause">
          <el-input v-model.trim="temp.cause" type="textarea" :row="2" style="width: 100%" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create' ? createData() : updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'

import { parseTime } from '@/utils'
import request from '@/services/post'
import DownFiles from '@/vendor/ExportExcel'

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
  props: {
    project: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableKey: 0, // 用来强制视图的刷新
      currentStage: '阶段一', // 当前阶段
      projectStageList: [], // 项目阶段列表
      currentPage: 1,
      limit: 10,
      // 项目 select 配置项
      projectOptions: [
        { label: '12.5PL1', id: 1 },
        { label: '12.5PL1_S2', id: 2 }
      ],
      butLoading: false, // 下载按钮加载
      tableLoading: false, // 表单加载动画
      tableData: [],
      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogStatus: '', // 当前 添加和修改对话框 的类型
      dialogFormVisible: false, // 控制添加和修改对话框的显示与隐藏
      temp: {
        project: undefined,
        taskName: undefined,
        planFinishDate: new Date(),
        dutyName: undefined,
        target: undefined,
        newestProgress: undefined,
        risk: undefined,
        countermeasure: undefined,
        cause: undefined
      },
      dataViewVisible: false // 控制数据视图的显示与隐藏
    }
  },
  computed: {
    list() {
      const page = this.currentStage
      const limit = this.limit
      return this.tableData.slice((page - 1) * limit, page * limit)
    },
    total() {
      return this.tableData.length
    },
    // 表单配置对象
    tableOptions() {
      return [
        {
          prop: 'id',
          label: 'ID',
          minWidth: 60
        },
        {
          prop: 'project',
          label: '项目',
          minWidth: 100
        },
        {
          prop: 'task_name',
          label: '任务名称',
          minWidth: 120
        },
        {
          prop: 'duty_name',
          label: '负责人',
          minWidth: 100
        },
        {
          prop: 'target',
          label: '目标',
          minWidth: 140
        },
        {
          prop: 'newest_progress',
          label: '当前进展',
          minWidth: 140
        },
        {
          prop: 'risk',
          label: '风险&问题',
          minWidth: 140
        },
        {
          prop: 'countermeasure',
          label: '对策',
          minWidth: 100
        },
        {
          prop: 'plan_finish_date',
          label: '预计达成时间',
          minWidth: 160
        },
        {
          prop: 'cause',
          label: '偏差原因',
          minWidth: 140
        }
      ]
    },
    // form 规则
    rules() {
      return {
        project: [{ required: true, message: '请选择项目', trigger: 'change' }],
        taskName: [{ required: true, message: '请填写任务名称', trigger: 'blur' }],
        planFinishDate: [{ required: true, message: '请选择预计达成时间', trigger: 'change' }],
        cause: [{ required: true, message: '请填写偏差原因', trigger: 'blur' }],
        dutyName: [{ required: true, message: '请填写负责人', trigger: 'blur' }],
        target: [{ required: true, message: '请填写目标', trigger: 'blur' }],
        risk: [{ required: true, message: '请填写风险&问题', trigger: 'blur' }],
        countermeasure: [{ required: true, message: '请填写对策', trigger: 'blur' }],
        newestProgress: [{ required: true, message: '请填写对当前进展', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.getProjectStage(this.project)
      this.getprojectSpecialList(this.project, this.currentStage)
    },
    // 处理阶段改变
    handleStageChange() {
      this.getprojectSpecialList(this.project, this.currentStage)
    },
    // 点击下载
    handleExportClick() {
      this.butLoading = true
      const url = '/api/export/projectSpecialExport'
      const obj = {
        conditions: {
          project: this.project
        }
      }
      const fileName = this.project + '专项任务列表.xls'
      DownFiles(url, obj, fileName, this)
    },
    // 分页器改变
    handlePaginationChange(e) {
      this.currentStage = e.page
      this.limit = e.limit
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
        project: undefined,
        taskName: undefined,
        planFinishDate: new Date(),
        dutyName: undefined,
        target: undefined,
        newestProgress: undefined,
        risk: undefined,
        countermeasure: undefined,
        cause: undefined
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
      this.$refs.dataFormRef.validate(async(valid) => {
        if (valid && this.temp !== undefined) {
          const { data: res } = await request('/api/projectEvolveSta/projectSpecial/add', {
            method: 'POST',
            data: {
              projectSource: this.project,
              ...this.temp
            }
          })

          this.$notify({
            title: res ? '添加成功' : '添加失败',
            type: res ? 'success' : 'error',
            duration: 1500
          })
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
      this.$refs.dataFormRef.validate(async(valid) => {
        if (valid) {
          const { data: res } = await request('/api/projectEvolveSta/projectSpecial/update', {
            method: 'POST',
            data: this.temp
          })

          this.$notify({
            title: res ? '修改成功' : '修改失败',
            type: res ? 'success' : 'error',
            duration: 1500
          })
          // 隐藏添加窗口
          this.dialogFormVisible = false
        }
      })
    },
    // 点击询问是否删除
    async handleDeleteClick(row) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const id = row.id
          const { data: res } = await request('/api/projectEvolveSta/projectSpecial/delete', {
            method: 'DELETE',
            params: {
              id
            }
          })
          this.$notify({
            title: res ? '删除成功' : '删除失败',
            type: res ? 'success' : 'error',
            duration: 1500
          })
          // 重新获取数据
          this.getprojectSpecialList(this.project, this.currentStage)
        })
        .catch(() => {
          this.$message({
            message: '已取消删除',
            type: 'info',
            duration: 1500
          })
        })
    },
    // 查询项目阶段
    async getProjectStage(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByProjectStage', {
        method: 'GET',
        params: {
          project
        }
      })
      this.projectStageList = res
    },
    // 专项任务-专项列表
    async getprojectSpecialList(project, projectStage) {
      this.tableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryBySpecialList', {
        method: 'GET',
        params: {
          project,
          projectStage
        }
      })
      this.tableData = res

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 表单操作栏
.operation-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
