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

      <el-select v-model="listQuery.type" placeholder="类型" clearable style="width: 100px">
        <el-option
          v-for="item in typeOptions"
          :key="item.id"
          :label="item.label"
          :value="item.label"
        />
      </el-select>

      <el-select v-model="listQuery.risk_level" placeholder="风险等级" clearable style="width: 120px">
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

      <el-select v-model="listQuery.risk_status" placeholder="风险状态" clearable style="width: 120px">
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
        <el-table-column prop="name" label="主干/组件" min-width="120 " show-overflow-tooltip />
        <el-table-column
          v-for="(item, index) in tableTitleList"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          align="center"
        >
          <template slot-scope="{row}">
            <!-- 如果是风险概率 或者 风险等级 时，采用 tag 的方式进行渲染 -->
            <div v-if="item.prop === 'risk_level' || item.prop === 'risk_probability'">
              <el-tag
                v-if="row[item.prop]"
                :type="row[item.prop] | statusFilter"
                effect="dark"
              >{{ row[item.prop] }}</el-tag>
            </div>
            <!-- 如果是创建时间 | 希望解决时间 | 最后更新时间 则进行时间格式过滤 -->
            <span
              v-else-if="item.prop === 'creation_time' || item.prop === 'hope_resolution_time' || item.prop === 'last_update_time'"
            >{{ row[item.prop] | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            <!-- 正常输出 -->
            <span v-else>{{ row[item.prop] }}</span>
          </template>
        </el-table-column>

        <el-table-column label="优先" min-width="75" fixed="right" align="center">
          <template slot-scope="{row}">
            <el-switch v-model="row.isTop" @change="handlePriorityChange(row)" />
          </template>
        </el-table-column>

        <el-table-column label="闭环" min-width="75" fixed="right" align="center">
          <template slot-scope="{row}">
            <el-switch v-model="row.isRound" @change="handleCloseLoopChange(row)" />
          </template>
        </el-table-column>

        <el-table-column min-width="120" fixed="right" align="center">
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
        label-width="100px"
        style="width: 60%; margin: 0 auto;"
      >
        <el-form-item label="主干/组件" prop="name">
          <el-input v-model.trim="temp.name" style="width: 100%" clearable />
        </el-form-item>

        <el-form-item label="阶段" prop="stage">
          <el-input v-model.trim="temp.stage" style="width: 100%" clearable />
        </el-form-item>

        <el-form-item label="创建时间" prop="creation_time">
          <el-date-picker v-model="temp.creation_time" type="datetime" style="width: 100%" />
        </el-form-item>

        <el-form-item label="风险项" prop="risk_item">
          <el-input v-model.trim="temp.risk_item" style="width: 100%" clearable />
        </el-form-item>

        <el-form-item label="风险描述" prop="risk_desc">
          <el-input v-model.trim="temp.risk_desc" type="textarea" autosize style="width: 100%" />
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

        <el-form-item label="发生阶段" prop="occurrence_stage">
          <el-select v-model="temp.occurrence_stage" placeholder="请选择发生阶段" style="width: 100%">
            <el-option
              v-for="item in occurrenceStageOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="风险概率" prop="risk_probability">
          <el-select v-model="temp.risk_probability" placeholder="请选择风险概率" style="width: 100%">
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

        <el-form-item label="风险等级" prop="risk_level">
          <el-select v-model="temp.risk_level" placeholder="请选择风险等级" style="width: 100%">
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

        <el-form-item label="责任人" prop="principal">
          <el-input v-model.trim="temp.principal" style="width: 100%" clearable />
        </el-form-item>

        <el-form-item label="风险状态" prop="risk_status">
          <el-select v-model="temp.risk_status" placeholder="请选择风险状态" style="width: 100%">
            <el-option
              v-for="item in riskStatusOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="当前进展" prop="current_progress">
          <el-input
            v-model.trim="temp.current_progress"
            type="textarea"
            autosize
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="希望解决时间" prop="hope_resolution_time">
          <el-date-picker v-model="temp.hope_resolution_time" type="datetime" style="width: 100%" />
        </el-form-item>

        <el-form-item label="最后更新时间" prop="last_update_time">
          <el-date-picker v-model="temp.last_update_time" type="datetime" style="width: 100%" />
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
      total: 50, // 搜索到的数据条数
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
      listLoading: true, // 表单加载动画
      list: [
        {
          id: 1,
          creation_time: 1597205131699,
          current_progress: '1',
          influence: '1',
          name: '王小虎',
          occurrence_stage: '需求',
          principal: '1',
          risk_desc: '1',
          risk_item: '1',
          risk_level: 'High',
          risk_probability: 'High',
          risk_status: '识别',
          source: 'PTTL',
          stage: '1',
          type: '资源风险',
          isRound: true,
          isTop: false
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          isTop: true,
          isRound: true
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          isTop: false,
          isRound: true
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          isTop: false,
          isRound: true
        }
      ],
      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogStatus: '', // 当前 添加和修改对话框 的类型
      dialogFormVisible: false, // 控制添加和修改对话框的显示与隐藏
      temp: {
        id: undefined,
        name: undefined,
        stage: undefined,
        creation_time: new Date(),
        risk_item: undefined,
        risk_desc: undefined,
        influence: undefined,
        source: undefined,
        type: undefined,
        occurrence_stage: undefined,
        risk_probability: undefined,
        risk_level: undefined,
        principal: undefined,
        risk_status: undefined,
        current_progress: undefined,
        hope_resolution_time: undefined,
        last_update_time: undefined
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
        name: undefined,
        stage: undefined,
        creation_time: new Date(),
        risk_item: undefined,
        risk_desc: undefined,
        influence: undefined,
        source: undefined,
        type: undefined,
        occurrence_stage: undefined,
        risk_probability: undefined,
        risk_level: undefined,
        principal: undefined,
        risk_status: undefined,
        current_progress: undefined,
        hope_resolution_time: undefined,
        last_update_time: undefined
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
          this.temp.id = this.list[this.list.length - 1].id + 1
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
