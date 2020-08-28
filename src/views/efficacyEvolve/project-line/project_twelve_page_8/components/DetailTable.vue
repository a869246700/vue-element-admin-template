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
              align="center"
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
            <el-form-item label="技术项目" prop="project_name">
              <el-select v-model="temp.project_name" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="(item, index) in projectNameOptions"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="bugid" prop="bugid">
              <el-input
                v-model.trim="temp.bugid"
                placeholder="请输入bugid"
                style="width: 100%"
                @blur="handleBugIdValid(temp.bugid)"
              >
                <span v-if="bugIdIcon === 'el-icon-warning'" slot="suffix">
                  <el-popover
                    placement="bottom-end"
                    :width="bugIdMessageWidth"
                    trigger="hover"
                    :content="bugIdMessage"
                  >
                    <i
                      slot="reference"
                      :class="bugIdIcon"
                      style="margin-right: 5px; font-size: 18px; color: #faad14;"
                    />
                  </el-popover>
                </span>

                <span v-else slot="suffix">
                  <i
                    :class="bugIdIcon"
                    :style="bugIdIcon === 'el-icon-success' ? ' color: #67C23A' : ' color: #409EFF;'"
                    style="margin-right: 5px; font-size: 18px;"
                  />
                </span>
              </el-input>
            </el-form-item>

            <el-form-item label="技术课题" prop="technical_issues">
              <el-input
                v-model.trim="temp.technical_issues"
                placeholder="根据bugid关联"
                readonly
                style="width: 100%"
              />
            </el-form-item>

            <el-form-item label="工作包" prop="work_package">
              <el-input
                v-model.trim="temp.work_package"
                placeholder="根据bugid关联"
                readonly
                style="width: 100%"
              />
            </el-form-item>

            <el-form-item label="代码量" prop="code_count">
              <el-input
                v-model.trim="temp.code_count"
                placeholder="根据bugid关联"
                readonly
                style="width: 100%"
              />
            </el-form-item>

            <el-form-item label="验收方式" prop="acceptance_method">
              <el-input
                v-model.trim="temp.acceptance_method"
                placeholder="根据bugid关联"
                readonly
                style="width: 100%"
              />
            </el-form-item>

            <el-form-item label="遗漏类型归属" prop="omission_type">
              <el-select v-model="temp.omission_type" placeholder="请选择遗漏类型归属" style="width: 100%">
                <el-option
                  v-for="method in omissionTypeOptions"
                  :key="method.key"
                  :label="method.label"
                  :value="method.label"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="遗漏原因" prop="omission_reason">
              <el-input
                v-model.trim="temp.omission_reason"
                type="textarea"
                placeholder="请输入遗漏原因"
                style="width: 100%"
              />
            </el-form-item>

            <el-form-item label="改进对策" prop="improve_solution">
              <el-input
                v-model.trim="temp.improve_solution"
                type="textarea"
                placeholder="请输入改进对策"
                style="width: 100%"
              />
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button
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
      list: [
        { project: '项目1', topic: '课题1', check_mode: '验证结项' },
        { project: '项目1', topic: '课题2', check_mode: '评审结项' },
        { project: '项目2', topic: '课题3' }
      ], // 存储表格数据
      detailTableList, // 表格头列表配置
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
        id: undefined,
        project_name: undefined,
        technical_issues: undefined,
        acceptance_method: undefined,
        work_package: undefined,
        code_count: undefined,
        dev_principal: undefined,
        test_principal: undefined,
        bugid: undefined,
        bug_desc: undefined,
        omission_type: undefined,
        omission_reason: undefined,
        improve_solution: undefined
      },
      rules, // 表单校验规则
      bugIdIcon: '', // bugID校验图标
      bugIdMessage: '', // bugid 显示的文本
      bugIdMessageWidth: ''
    }
  },
  mounted() {
    this.tableShowData = this.list
    this.getTechnologyBugInfoList(this.project)
    this.queryByTechnologyProject(this.project)
  },
  methods: {
    // 点击新增课题分析
    handleCreateClick() {
      this.resetTemp()
      this.temp.project_name = this.projectNameOptions[0]
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
          // 添加数据
          this.list.push(this.temp)
          // 隐藏添加窗口
          this.dialogFormVisible = false
        }
      })
    },
    // 重置temp
    resetTemp() {
      this.temp = {
        id: undefined,
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
    // 点击删除
    handleDeleteClick(row) {
      console.log(row)
    },
    // 点击编辑按钮，显示编辑表单
    handleUpdateClcik(row) {
      this.temp = Object.assign({}, row)
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
    // 当 bugid 输入框失去焦点时
    handleBugIdValid(bugid) {
      this.queryByTechnologyProjectById(bugid)
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
      console.log(res.result === undefined)

      if (res === undefined || !res) {
        this.bugIdMessageWidth = 645
        this.bugIdMessage =
          '未匹配到bugid，请检查是否正确或为今天新增bug，新增bug暂未同步，后续同步后会自动匹配！'
        this.bugIdIcon = 'el-icon-warning'
        const topicObject = {}
        console.log(topicObject)
      } else if (res.result === undefined) {
        this.bugIdMessage = ''
        this.bugIdIcon = 'el-icon-success'
        const topicObject = res
        console.log(topicObject)
      } else {
        this.bugIdMessageWidth = 450
        this.bugIdMessage = 'bugid已经录入，请勿重复添加！'
        this.bugIdIcon = 'el-icon-error'
        const topicObject = {}
        console.log(topicObject)
      }
    },
    // 技术项目-课题bug分析明细列表
    async getTechnologyBugInfoList(project) {
      this.listLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByTechnologyBugInfo', {
        method: 'GET',
        params: {
          project
        }
      })
      console.log(res)

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
</style>
