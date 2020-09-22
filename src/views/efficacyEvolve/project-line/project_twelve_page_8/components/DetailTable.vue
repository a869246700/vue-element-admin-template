<template>
  <card title="课题分析明细" class="card">
    <template #buttons>
      <el-button
        v-waves
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="handleCreateClick"
      >新增课题分析</el-button>
    </template>

    <template #content>
      <div class="table-container">
        <!-- 表格 -->
        <div class="table-content">
          <el-table
            v-loading="listLoading"
            :data="tableShowData"
            style="width: 100%"
            border
            fit
            :header-cell-style="{'background-color': '#FAFAFA' }"
            highlight-current-row
          >
            <el-table-column
              v-for="item in detailTableList"
              :key="item.prop"
              :prop="item.prop"
              :min-width="item.minWidth"
              show-overflow-tooltip
            >
              <template #header>
                <div v-if="item.prop !== 'code_count'" class="table-title">
                  <span class="title">{{ item.label }}</span>
                  <el-popover :ref="item.prop" placement="bottom-end" :width="200" trigger="click">
                    <el-input v-model.trim="listQuery[item.prop]" style="margin-bottom: 5px" />
                    <div style="display: flex">
                      <el-button
                        size="mini"
                        type="primary"
                        style="width: 50%"
                        @click="handleSearchClick(item.prop)"
                      >查询</el-button>

                      <el-button
                        size="mini"
                        style="width: 50%"
                        @click="handleResetClick(item.prop)"
                      >重置</el-button>
                    </div>

                    <i
                      slot="reference"
                      class="el-icon-help table-title-icon"
                      :class="listQuery[item.prop] === undefined || listQuery[item.prop] === '' ? '' : 'active'"
                    />
                  </el-popover>
                </div>
                <span v-else>{{ item.label }}</span>
              </template>

              <template slot-scope="{row}">
                <!-- 如果是验收方式 -->
                <div v-if="item.prop === 'check_mode'">
                  <el-select
                    v-model="row[item.prop]"
                    :placeholder="row[item.prop] || '请选择'"
                    style="width: 100%"
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

            <el-table-column min-width="100" fixed="right" align="center">
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

        <!-- 添加对话框 -->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
          <el-form
            ref="dataFormRef"
            :rules="rules"
            :model="temp"
            label-position="right"
            label-width="110px"
            style="width: 60%; margin: 0 auto;"
          >
            <el-form-item label="技术项目" prop="project">
              <el-select
                v-if="dialogStatus === 'create'"
                v-model="temp.project"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="(item, index) in projectNameOptions"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>

              <span v-else>{{ temp.project }}</span>
            </el-form-item>

            <el-form-item label="bugid" prop="bugid">
              <el-input
                v-if="dialogStatus === 'create'"
                v-model.trim="temp.bugid"
                placeholder="请输入bugid"
                style="width: 100%"
                @blur="handleBugIdValid(temp.bugid)"
              >
                <span slot="suffix">
                  <el-popover v-if="bugIdMessage" placement="bottom-end" trigger="hover">
                    <span>{{ bugIdMessage }}</span>
                    <i
                      slot="reference"
                      :class="bugIdIcon"
                      style="margin-right: 5px; font-size: 18px;"
                    />
                  </el-popover>
                </span>
              </el-input>

              <span v-else>{{ temp.bugid }}</span>
            </el-form-item>

            <el-form-item label="技术课题" prop="topic">
              <el-input
                v-if="dialogStatus === 'create'"
                v-model.trim="temp.topic"
                placeholder="根据bugid关联"
                readonly
                style="width: 100%"
              />

              <span v-else>{{ temp.topic }}</span>
            </el-form-item>

            <el-form-item label="工作包" prop="workPackage">
              <el-input
                v-if="dialogStatus === 'create'"
                v-model.trim="temp.workPackage"
                placeholder="根据bugid关联"
                readonly
                style="width: 100%"
              />

              <span v-else>{{ temp.workPackage }}</span>
            </el-form-item>

            <el-form-item label="代码量" prop="code">
              <el-input
                v-if="dialogStatus === 'create'"
                v-model.trim="temp.code"
                placeholder="根据bugid关联"
                readonly
                style="width: 100%"
              />

              <span v-else>{{ temp.code }}</span>
            </el-form-item>

            <el-form-item label="验收方式" prop="checkMode">
              <el-input
                v-if="dialogStatus === 'create'"
                v-model.trim="temp.checkMode"
                placeholder="根据bugid关联"
                readonly
                style="width: 100%"
              />

              <span v-else>{{ temp.checkMode }}</span>
            </el-form-item>

            <el-form-item label="遗漏类型归属" prop="omitType">
              <el-select v-model="temp.omitType" placeholder="请选择遗漏类型归属" style="width: 100%">
                <el-option
                  v-for="method in omissionTypeOptions"
                  :key="method.key"
                  :label="method.label"
                  :value="method.label"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="遗漏原因" prop="omitCause">
              <el-input
                v-model.trim="temp.omitCause"
                type="textarea"
                placeholder="请输入遗漏原因"
                style="width: 100%"
              />
            </el-form-item>

            <el-form-item label="改进对策" prop="improve">
              <el-input
                v-model.trim="temp.improve"
                type="textarea"
                placeholder="请输入改进对策"
                style="width: 100%"
              />
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button
              :loading="formLoading"
              type="primary"
              @click="dialogStatus==='create' ? createData() : updateData()"
            >确定</el-button>
          </div>
        </el-dialog>
      </div>
    </template>
  </card>
</template>

<script>
import waves from '@/directive/waves'
import Card from '@/components/Card/index'
import { detailTableList, rules } from './options'
import { parseTime } from '@/utils'
import request from '@/services/request'

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
  components: {
    Card
  },
  props: {
    project: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      technologyProject: undefined,
      tableShowData: undefined, // 表格显示的数据
      list: undefined, // 存储表格数据
      detailTableList, // 表格头列表配置
      formLoading: false,
      // 筛选的条件
      listQuery: {
        project: undefined,
        topic: undefined,
        check_mode: undefined,
        work_package: undefined,
        deve_name: undefined,
        test_name: undefined,
        bugid: undefined,
        summary: undefined,
        omit_type: undefined,
        omit_cause: undefined,
        improve: undefined
      },
      // 验证方式 select 配置项
      acceptanceMethodOptions: [
        { label: '验证结项', id: 1 },
        { label: '评审结项', id: 2 }
      ],
      // 技术项目 select 配置项
      projectNameOptions: undefined,
      // 遗漏类型 select 配置项
      omissionTypeOptions: [
        { label: '功能类', id: 1 },
        { label: '非功能类', id: 2 },
        { label: '性能&容量类', id: 3 },
        { label: '未知缺陷', id: 4 }
      ],
      listLoading: false, // 表单加载动画
      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogStatus: '', // 当前 添加和修改对话框 的类型
      dialogFormVisible: false, // 控制添加和修改对话框的显示与隐藏
      temp: {
        project: undefined,
        bugid: undefined,
        topic: undefined,
        workPackage: undefined,
        code: undefined,
        checkMode: undefined,
        omitType: undefined,
        omitCause: undefined,
        improve: undefined
      },
      rules, // 表单校验规则
      bugIdIcon: '', // bugID校验图标
      bugIdMessage: '' // bugid 显示的文本
    }
  },
  computed: {
    updateRules() {
      return {
        omitType: [{ required: true, message: '请填写遗漏类型归属', trigger: 'blur' }],
        omitCause: [{ required: true, message: '请填写遗漏原因', trigger: 'blur' }],
        improve: [{ required: true, message: '请填写改进对策', trigger: 'blur' }]
      }
    },
    createRules() {
      return {
        project: [{ required: true, message: '请填写项目名称', trigger: 'blur' }],
        bugid: [{ required: true, message: '请填写bugid', trigger: 'blur' }],
        omitType: [{ required: true, message: '请填写遗漏类型归属', trigger: 'blur' }],
        omitCause: [{ required: true, message: '请填写遗漏原因', trigger: 'blur' }],
        improve: [{ required: true, message: '请填写改进对策', trigger: 'blur' }]
      }
    },
    tableOptions() {
      return [
        {
          prop: 'project',
          label: '项目名称',
          minWidth: 120,
          search: true
        },
        {
          prop: 'topic',
          label: '技术课题',
          minWidth: 120,
          search: true
        },
        {
          prop: 'check_mode',
          label: '验收方式',
          minWidth: 140,
          search: true
        },
        {
          prop: 'work_package',
          label: '工作包',
          minWidth: 100,
          search: true
        },
        {
          prop: 'code',
          label: '代码量',
          minWidth: 100
        },
        {
          prop: 'deve_name',
          label: '开发负责人',
          minWidth: 120,
          search: true
        },
        {
          prop: 'test_name',
          label: '测试负责人',
          minWidth: 120,
          search: true
        },
        {
          prop: 'bugid',
          label: 'bugid',
          minWidth: 100,
          search: true
        },
        {
          prop: 'summary',
          label: 'bug描述',
          minWidth: 120,
          search: true
        },
        {
          prop: 'omit_type',
          label: '遗漏类型归属',
          minWidth: 140,
          search: true
        },
        {
          prop: 'omit_cause',
          label: '遗漏原因',
          minWidth: 120,
          search: true
        },
        {
          prop: 'improve',
          label: '改进对策',
          minWidth: 120,
          search: true
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getTechnologyBugInfoList(this.project)
      this.queryByTechnologyProject(this.project)
    },
    // 点击新增课题分析
    handleCreateClick() {
      this.resetTemp()
      this.resetBugIcon()
      this.temp.project = this.projectNameOptions[0]
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      // 清除原有的校验内容
      this.$nextTick(() => {
        this.$refs.dataFormRef.clearValidate()
      })
    },
    // 真正的添加数据
    createData() {
      this.formLoading = true
      // 1. 表单校验
      this.$refs.dataFormRef.validate(async(valid) => {
        if (valid) {
          const values = {
            projectSource: this.project,
            ...this.temp
          }
          const { data: res } = await request('/api/projectEvolveSta/technologyBugInfo/add', {
            method: 'POST',
            data: values
          })

          if (res) {
            // 页面更新
            this.$emit('update-view')
            this.$notify.success('添加成功')
          } else {
            this.$notify.error('添加失败')
          }
          this.formLoading = false
          // 隐藏添加窗口
          this.dialogFormVisible = false
        }
      })
    },
    // 点击删除
    async handleDeleteClick(row) {
      try {
        await this.$confirm('您确定要删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        this.deleteData(row)
      } catch (e) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    // 确认删除
    async deleteData(row) {
      const { data: res } = await request('/api/projectEvolveSta/technologyBugInfo/delete', {
        method: 'DELETE',
        params: {
          id: row.id
        }
      })
      if (res) {
        this.$emit('update-view')
        this.$notify.success('删除成功')
      } else {
        this.$notify.error('删除失败')
      }
    },
    // 点击编辑按钮，显示编辑表单
    handleUpdateClcik(row) {
      this.resetBugIcon()
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      // 清除原有的校验内容
      this.$nextTick(() => {
        this.$refs.dataFormRef.clearValidate()
      })
    },
    // 真正的修改数据
    updateData() {
      this.formLoading = true
      console.log(this.temp)
      this.formLoading = false
    },
    // 当 bugid 输入框失去焦点时
    handleBugIdValid(bugid) {
      // 非空判断
      if (bugid && bugid !== '') {
        this.queryByTechnologyProjectById(bugid)
      }
    },
    // 重置 BUG ID 的图标和内容
    resetBugIcon() {
      this.bugIdMessage = undefined
      this.bugIdIcon = undefined
    },
    // 重置temp
    resetTemp() {
      this.temp = {
        project: undefined,
        bugid: undefined,
        topic: undefined,
        workPackage: undefined,
        code: undefined,
        checkMode: undefined,
        omitType: undefined,
        omitCause: undefined,
        improve: undefined
      }
    },
    // 重置 listRequery
    resetListQuery() {
      this.listQuery = {
        project: undefined,
        topic: undefined,
        check_mode: undefined,
        work_package: undefined,
        deve_name: undefined,
        test_name: undefined,
        bugid: undefined,
        summary: undefined,
        omit_type: undefined,
        omit_cause: undefined,
        improve: undefined
      }
    },
    // 点击 popover 搜索
    handleSearchClick(key) {
      // 1. 隐藏popover
      this.closePopover(key)
      // 2. 执行搜索
      // console.log()
      this.getList()
    },
    // 点击popover重置
    handleResetClick(key) {
      // 1. 重置输入框内容
      this.listQuery[key] = undefined

      // 2. 隐藏
      this.$nextTick(() => {
        this.closePopover(key)
        this.getList()
      })
    },
    // 关闭 popover
    closePopover(key) {
      const list = this.$refs[key]
      list.forEach((item) => {
        this.$nextTick(() => {
          item.doClose()
        })
      })
    },
    // 搜索
    getList() {
      let list = this.list
      for (const key in this.listQuery) {
        if (this.listQuery[key] !== '' && this.listQuery[key] !== undefined) {
          list = list.filter((item) => {
            return String(item[key]).includes(this.listQuery[key])
          })
        }
      }
      this.tableShowData = list
    },
    // 判断 bugId 是否存在，符合要求
    async queryByTechnologyProjectById(bugid) {
      this.bugIdIcon = 'el-icon-loading'
      const { data: res } = await request('/api/projectEvolveSta/validityBugid', {
        method: 'GET',
        params: {
          bugid
        }
      })

      if (res === undefined || !res) {
        this.bugIdMessage =
          '未匹配到bugid，请检查是否正确或为今天新增bug，新增bug暂未同步，后续同步后会自动匹配！'
        this.bugIdIcon = 'el-icon-warning warning'
        const topicObject = {}
        console.log(topicObject)
      } else if (res.result === undefined) {
        this.bugIdMessage = ''
        this.bugIdIcon = 'el-icon-success success'
        const topicObject = res
        console.log(topicObject)
      } else {
        this.bugIdMessage = 'bugid已经录入，请勿重复添加！'
        this.bugIdIcon = 'el-icon-error error'
        const topicObject = {}
        console.log(topicObject)
      }
    },
    // 技术项目-课题bug分析明细列表
    async getTechnologyBugInfoList(project) {
      this.listLoading = true
      // 重置 listQuery
      this.resetListQuery()
      const { data: res } = await request('/api/projectEvolveSta/queryByTechnologyBugInfo', {
        method: 'GET',
        params: {
          project
        }
      })

      this.list = res
      this.tableShowData = res
      this.$nextTick(() => {
        this.listLoading = false
      })
    },
    // 技术项目-获取技术项目名称
    async queryByTechnologyProject(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByTechnologyProject', {
        method: 'GET',
        params: {
          project
        }
      })
      this.projectNameOptions = res
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
  color: #00f;
}

.success {
  color: #1f3;
}

.warning {
  color: #faad14;
}

.error {
  color: #f00;
}
</style>
