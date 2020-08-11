<template>
  <div class="table-container">
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
        />
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
        />
        <el-table-column label="置于优先" min-width="120" fixed="right" align="center">
          <template slot-scope="{row}">
            <el-switch v-model="row.isTop" @change="handlePriorityChange(row)" />
          </template>
        </el-table-column>

        <el-table-column label="是否闭环" min-width="100" fixed="right" align="center">
          <template slot-scope="{row}">
            <el-switch v-model="row.isRound" @change="handleCloseLoopChange(row)" />
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="160" fixed="right" align="center">
          <template slot-scope="{row}">
            <el-button type="danger" size="mini" @click="handleDeleteClick(row)">删除</el-button>
            <el-button type="primary" size="mini" @click="handleUpdateClcik(row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分段器 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <!-- 添加 | 编辑 对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataFormRef"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin: 0 auto;"
      >
        <el-form-item label="主干" prop="name">
          <el-input v-model.trim="temp.name" style="width: 300px" clearable />
        </el-form-item>

        <el-form-item label="阶段" prop="stage">
          <el-input v-model.trim="temp.stage" style="width: 300px" clearable />
        </el-form-item>

        <el-form-item label="创建时间" prop="creation_time">
          <el-date-picker v-model="temp.creation_time" type="datetime" style="width: 300px" />
        </el-form-item>

        <el-form-item label="风险项" prop="risk_item">
          <el-input v-model.trim="temp.risk_item" style="width: 300px" clearable />
        </el-form-item>

        <el-form-item label="风险描述" prop="risk_desc">
          <el-input v-model.trim="temp.risk_desc" style="width: 300px" clearable />
        </el-form-item>

        <el-form-item label="影响" prop="influence">
          <el-input v-model.trim="temp.influence" style="width: 300px" clearable />
        </el-form-item>

        <el-form-item label="来源" prop="source">
          <el-select v-model="temp.source" placeholder="请选择来源" style="width: 300px">
            <el-option
              v-for="item in sourceOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-select v-model="temp.type" placeholder="请选择类型" style="width: 300px">
            <el-option
              v-for="item in typeOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="发生阶段" prop="occurrence_stage">
          <el-select v-model="temp.occurrence_stage" placeholder="请选择发生阶段" style="width: 300px">
            <el-option
              v-for="item in occurrenceStageOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="风险概率" prop="risk_probability">
          <el-select v-model="temp.risk_probability" placeholder="请选择风险概率" style="width: 300px">
            <el-option
              v-for="item in riskLevelOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="风险等级" prop="risk_level">
          <el-select v-model="temp.risk_level" placeholder="请选择风险等级" style="width: 300px">
            <el-option
              v-for="item in riskLevelOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="责任人" prop="principal">
          <el-input v-model.trim="temp.principal" style="width: 300px" clearable />
        </el-form-item>

        <el-form-item label="风险状态" prop="risk_status">
          <el-select v-model="temp.risk_status" placeholder="请选择风险状态" style="width: 300px">
            <el-option
              v-for="item in riskStatusOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="当前进展" prop="current_progress">
          <el-input v-model.trim="temp.current_progress" style="width: 300px" clearable />
        </el-form-item>

        <el-form-item label="希望解决时间" prop="hope_resolution_time">
          <el-date-picker v-model="temp.hope_resolution_time" type="datetime" style="width: 300px" />
        </el-form-item>

        <el-form-item label="最后更新时间" prop="last_update_time">
          <el-date-picker v-model="temp.last_update_time" type="datetime" style="width: 300px" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create' ? createData() : updateData()">确定</el-button>
      </div>
    </el-dialog>

    <!-- 修改对话框 -->
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { tableTitleList, rules } from './options'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  directives: { waves },
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
        { label: 'High', id: 1 },
        { label: 'Medium', id: 2 },
        { label: 'Low', id: 3 }
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
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          isTop: false,
          isRound: true
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
        name: '',
        stage: '',
        creation_time: new Date(),
        risk_item: '',
        risk_desc: '',
        influence: '',
        source: '',
        type: '',
        occurrence_stage: '',
        risk_probability: '',
        risk_level: '',
        principal: '',
        risk_status: '',
        current_progress: '',
        hope_resolution_time: '',
        last_update_time: ''
      },
      rules
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
      console.log(e) // page, limit
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
        name: '',
        stage: '',
        creation_time: new Date(),
        risk_item: '',
        risk_desc: '',
        influence: '',
        source: '',
        type: '',
        occurrence_stage: '',
        risk_probability: '',
        risk_level: '',
        principal: '',
        risk_status: '',
        current_progress: '',
        hope_resolution_time: '',
        last_update_time: ''
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
          console.log('通过校验可以进行添加')
          console.log(this.temp)
        }
      })
    },
    // 点击编辑按钮，显示编辑表单
    handleUpdateClcik(row) {
      this.temp = Object.assign({}, row) // 复制对象
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      // 清除原有的校验内容
      this.$nextTick(() => {
        this.$refs.dataFormRef.clearValidate()
      })
    },
    // 真正的修改数据
    updateData() {},
    // 点击询问是否删除
    handleDeleteClick(row) {
      console.log(row.id)
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
