<template>
  <div class="table-container">
    <!-- 表格顶部控制栏 -->
    <div class="operation-bar">
      <el-input
        v-model="listQuery.risk_item"
        placeholder="风险项"
        style="width: 150px;"
        @keyup.enter.native="handleSearchClick"
        @blur="handleSearchClick"
      />

      <el-select
        v-model="listQuery.type"
        placeholder="类型"
        clearable
        style="width: 120px"
        @change="handleSearchClick"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.id"
          :label="item.label"
          :value="item.label"
        />
      </el-select>

      <el-select
        v-model="listQuery.risk_level"
        placeholder="风险等级"
        clearable
        style="width: 120px"
        @change="handleSearchClick"
      >
        <el-option
          v-for="item in riskLevelOptions"
          :key="item.id"
          :label="item.label"
          :value="item.label"
        >
          <div class="select-item">
            <i class="dot" :style="{ background: item.bg }" />
            <span>{{ item.label }}</span>
          </div>
        </el-option>
      </el-select>

      <el-select
        v-model="listQuery.risk_status"
        placeholder="风险状态"
        clearable
        style="width: 120px"
        @change="handleSearchClick"
      >
        <el-option
          v-for="item in riskStatusOptions"
          :key="item.id"
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

      <el-button type="primary" size="small" icon="el-icon-edit" @click="handleCreateClcik">添加</el-button>

      <el-button
        v-waves
        :loading="downloadLoading"
        type="primary"
        size="small"
        icon="el-icon-download"
        @click="handleExportClick"
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
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%"
        border
        fit
        :header-cell-style="{'background-color': '#FAFAFA' }"
        highlight-current-row
      >
        <el-table-column
          v-for="item in tableOptions"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :fixed="item.fixed"
          :min-width="item.minWidth"
          :show-overflow-tooltip="item.sot"
        >
          <template slot-scope="{row}">
            <!-- 日期格式化 -->
            <span
              v-if="item.prop === 'createTime' || item.prop === 'target_finish_data' || item.prop === 'update_date'"
            >{{ row[item.prop] | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            <!-- tag标签 -->
            <div v-else-if="item.prop === 'probability' || item.prop === 'effect'">
              <el-tag
                v-if="row[item.prop]"
                :type="row[item.prop] | statusFilter"
                effect="dark"
              >{{ row[item.prop] }}</el-tag>
            </div>
            <!-- switch 切换 -->
            <el-switch
              v-else-if="item.prop === 'is_top' || item.prop === 'is_close'"
              v-model="row[item.prop]"
              @change="handleSwitchChange(row, item.prop)"
            />
            <span v-else>{{ row[item.prop] }}</span>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column min-width="96" fixed="right" align="center">
          <template #header>
            <span style="margin-right: 5px">操作</span>
            <el-popover placement="top-start" :width="170" trigger="hover" content="删除操作 / 编辑操作">
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
        v-if="total > pageSize"
        :total="total"
        :page.sync="currentPage"
        :limit.sync="pageSize"
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
        label-width="100px"
        style="width: 60%; margin: 0 auto;"
      >
        <el-form-item label="主干/组件" prop="project_type">
          <el-input v-model.trim="temp.project_type" style="width: 100%" clearable />
        </el-form-item>

        <el-form-item label="阶段" prop="project_stage">
          <el-input v-model.trim="temp.project_stage" style="width: 100%" clearable />
        </el-form-item>

        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker v-model="temp.createTime" type="datetime" style="width: 100%" />
        </el-form-item>

        <el-form-item label="风险项" prop="risk">
          <el-input v-model.trim="temp.risk" style="width: 100%" clearable />
        </el-form-item>

        <el-form-item label="风险描述" prop="risk_describe">
          <el-input v-model.trim="temp.risk_describe" type="textarea" autosize style="width: 100%" />
        </el-form-item>

        <el-form-item label="影响" prop="influence">
          <el-input v-model.trim="temp.influence" style="width: 100%" clearable />
        </el-form-item>

        <el-form-item label="来源" prop="source">
          <el-select v-model="temp.source" placeholder="请选择来源" style="width: 100%">
            <el-option
              v-for="item in sourceOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-select v-model="temp.type" placeholder="请选择类型" style="width: 100%">
            <el-option
              v-for="item in typeOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="发生阶段" prop="stage">
          <el-select v-model="temp.stage" placeholder="请选择发生阶段" style="width: 100%">
            <el-option
              v-for="item in occurrenceStageOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="风险概率" prop="probability">
          <el-select v-model="temp.probability" placeholder="请选择风险概率" style="width: 100%">
            <el-option
              v-for="item in riskLevelOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            >
              <div class="select-item">
                <i class="dot" :style="{ background: item.bg }" />
                <span>{{ item.label }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="风险等级" prop="effect">
          <el-select v-model="temp.effect" placeholder="请选择风险等级" style="width: 100%">
            <el-option
              v-for="item in riskLevelOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            >
              <div class="select-item">
                <i class="dot" :style="{ background: item.bg }" />
                <span>{{ item.label }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="责任人" prop="duty_name">
          <el-input v-model.trim="temp.duty_name" style="width: 100%" clearable />
        </el-form-item>

        <el-form-item label="风险状态" prop="state">
          <el-select v-model="temp.state" placeholder="请选择风险状态" style="width: 100%">
            <el-option
              v-for="item in riskStatusOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="当前进展" prop="newest_progress">
          <el-input
            v-model.trim="temp.newest_progress"
            type="textarea"
            autosize
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="希望解决时间" prop="target_finish_data">
          <el-date-picker v-model="temp.target_finish_data" type="datetime" style="width: 100%" />
        </el-form-item>

        <el-form-item label="最后更新时间" prop="update_date">
          <el-date-picker v-model="temp.update_date" type="datetime" style="width: 100%" disabled />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create' ? createData() : updateData()">确定</el-button>
      </div>
    </el-dialog>

    <!-- 数据视图 -->
    <el-dialog :visible.sync="dataViewVisible">
      <div class="content">数据视图</div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { rules } from './options'
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
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableKey: 0, // 用来强制视图的刷新
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页数据量
      // 筛选的条件
      listQuery: {
        state: undefined, // 风险状态
        risk: undefined, // 风险项
        effect: undefined, // 影响
        type: undefined // 类型
      },
      // 来源 select 配置项
      sourceOptions: [
        { label: 'PTM', id: 1 },
        { label: 'PTGTTL', id: 2 },
        { label: '组件接口人', id: 3 },
        { label: 'PTGTTM', id: 4 },
        { label: 'PTTL', id: 5 },
        { label: 'PTTE', id: 6 }
      ],
      // 风险状态 select 配置项
      riskStatusOptions: [
        { label: '识别', id: 1 },
        { label: '追踪', id: 2 },
        { label: '转问题', id: 3 },
        { label: '关闭', id: 4 }
      ],
      // 风险等级 select 配置项
      riskLevelOptions: [
        { label: 'High', id: 1, bg: 'red' },
        { label: 'Medium', id: 2, bg: 'orange' },
        { label: 'Low', id: 3, bg: 'green' }
      ],
      // 类型 select 配置项
      typeOptions: [
        { label: '管理风险', id: 1 },
        { label: '技术风险', id: 2 },
        { label: '资源风险', id: 3 },
        { label: '需求风险', id: 4 }
      ],
      // 发生阶段 select 配置项
      occurrenceStageOptions: [
        { label: '启动', id: 1 },
        { label: '需求', id: 2 },
        { label: '设计', id: 3 },
        { label: '准入', id: 4 },
        { label: '首轮/次轮', id: 5 },
        { label: '回归', id: 6 },
        { label: '发布', id: 7 }
      ],
      downloadLoading: false, // 下载按钮加载
      tableLoading: false, // 表单加载动画
      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogStatus: '', // 当前 添加和修改对话框 的类型
      dialogFormVisible: false, // 控制添加和修改对话框的显示与隐藏
      temp: {
        id: undefined,
        project_type: undefined,
        project_stage: undefined,
        createTime: new Date(),
        risk: undefined,
        risk_describe: undefined,
        influence: undefined,
        source: undefined,
        type: undefined,
        stage: undefined,
        probability: undefined,
        effect: undefined,
        duty_name: undefined,
        state: undefined,
        newest_progress: undefined,
        target_finish_data: undefined,
        update_date: undefined
      },
      rules, // 表单规则
      dataViewVisible: false // 控制数据视图的显示与隐藏
    }
  },
  computed: {
    tableShowData() {
      return this.tableData
    },
    total() {
      return this.tableShowData.length || 0
    },
    tableOptions() {
      return [
        {
          prop: 'project_type',
          label: '主干/组件',
          minWidth: 120,
          sot: true
        },
        {
          prop: 'project_stage',
          label: '阶段',
          minWidth: 120
        },
        {
          prop: 'createTime',
          label: '创建时间',
          minWidth: 140
        },
        {
          prop: 'risk',
          label: '风险项',
          minWidth: 120
        },
        {
          prop: 'risk_describe',
          label: '风险描述',
          minWidth: 160
        },
        {
          prop: 'influence',
          label: '影响',
          minWidth: 80
        },
        {
          prop: 'source',
          label: '来源',
          minWidth: 80
        },
        {
          prop: 'type',
          label: '类别',
          minWidth: 80
        },
        {
          prop: 'stage',
          label: '发生的阶段',
          minWidth: 160
        },
        {
          prop: 'probability',
          label: '风险概率',
          minWidth: 90
        },
        {
          prop: 'effect',
          label: '风险等级',
          minWidth: 90
        },
        {
          prop: 'duty_name',
          label: '责任人',
          minWidth: 120
        },
        {
          prop: 'state',
          label: '风险状态',
          minWidth: 120
        },
        {
          prop: 'newest_progress',
          label: '当前进展',
          minWidth: 120
        },
        {
          prop: 'target_finish_data',
          label: '希望解决时间',
          minWidth: 120
        },
        {
          prop: 'update_date',
          label: '最后更新时间',
          minWidth: 140
        },
        {
          prop: 'is_top',
          label: '优先',
          minWidth: 62,
          fixed: 'right'
        },
        {
          prop: 'is_close',
          label: '闭环',
          minWidth: 62,
          fixed: 'right'
        }
      ]
    }
  },
  methods: {
    // 点击搜索
    handleSearchClick() {
      this.tableLoading = true

      console.log(this.listQuery)
      // 重置页面为第一页
      this.listQuery.page = 1
      setTimeout(() => {
        this.tableLoading = false
      }, 1000)
    },
    // 点击下载
    handleExportClick() {
      this.downloadLoading = true

      setTimeout(() => {
        this.$message({
          message: '下载成功',
          type: 'success'
        })
        this.downloadLoading = false
      }, 2000)
    },
    handlePaginationChange(e) {
      this.pageSize = e.limit
      this.currentPage = e.page
    },
    // 修改优先级
    handleSwitchChange(row, prop) {
      console.log(prop)
    },
    // 重置 temp
    resetTemp() {
      this.temp = {
        id: undefined,
        project_type: undefined,
        project_stage: undefined,
        createTime: new Date(),
        risk: undefined,
        risk_describe: undefined,
        influence: undefined,
        source: undefined,
        type: undefined,
        stage: undefined,
        probability: undefined,
        effect: undefined,
        duty_name: undefined,
        state: undefined,
        newest_progress: undefined,
        target_finish_data: undefined,
        update_date: undefined
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
          this.temp.id = this.tableData[this.tableData.length - 1].id + 1
          // 添加数据
          this.tableData.push(this.temp)
          this.$emit('create', this.temp)
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
          // 1. 对象深拷贝
          const tempData = Object.assign({}, this.temp)
          // 2. 将 date 修改为 时间戳
          tempData.creation_time = +new Date(tempData.creation_time)
          // 3. 根据 id 找到下标值
          const index = this.tableData.findIndex((v) => v.id === this.temp.id)
          // 4. 进行数据修改
          this.tableData.splice(index, 1, this.temp)
          this.$emit('update', this.temp)
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
