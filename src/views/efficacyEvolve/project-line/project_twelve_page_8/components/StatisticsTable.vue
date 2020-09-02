<template>
  <el-card class="card">
    <template #header>
      <el-popover placement="top-start" trigger="hover">
        <div v-html="topicPopoverContent" />
        <span slot="reference">课题分析统计</span>
      </el-popover>
    </template>

    <div class="statistics-table">
      <div class="table-container">
        <!-- 表格顶部控制栏 -->
        <div class="operation-bar">
          <el-input
            v-model="listQuery.topic_name"
            placeholder="技术课题"
            style="width: 150px;"
            clearable
            @keyup.enter.native="handleSearchClick"
            @clear="handleSearchClick"
          />
          <el-select
            v-model="listQuery.check_mode"
            placeholder="请选择验收方式"
            style="width: 160px"
            clearable
            @change="handleSearchClick"
            @clear="handleSearchClick"
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
            :loading="butLoading"
            type="primary"
            size="small"
            icon="el-icon-download"
            @click="handleExportClick"
          >导出课题分析统计</el-button>
        </div>

        <!-- 表格 -->
        <div class="table-content">
          <el-table
            v-loading="tableLoading"
            :data="tableShowData"
            style="width: 100%"
            border
            fit
            :header-cell-style="{'background-color': '#FAFAFA' }"
            highlight-current-row
          >
            <el-table-column
              v-for="item in statisticsTableList"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              show-overflow-tooltip
            >
              <template slot-scope="{row}">
                <!-- 技术课题 -->
                <div v-if="item.prop === 'topic_name'">
                  <span
                    v-if="row.topic_name === '合计' || row.topic_name === '' || row.topic_name === undefined"
                  >{{ row.topic_name }}</span>
                  <span v-else class="blue" @click="handleTopicClick(row)">{{ row.topic_name }}</span>
                </div>

                <div v-else-if="item.prop === 'code'">{{ Math.round(row[item.prop] * 100) / 100 }}</div>

                <!-- 如果是验收方式 -->
                <div v-else-if="item.prop === 'check_mode'">
                  <el-select
                    v-if="row.topic_name !== '合计'"
                    v-model="row[item.prop]"
                    :placeholder="row[item.prop] || '请选择'"
                    style="width: 100%"
                    @change="handleSelectChange(row)"
                  >
                    <el-option
                      v-for="method in acceptanceMethodOptions"
                      :key="method.key"
                      :label="method.label"
                      :value="method.label"
                    />
                  </el-select>

                  <span v-else>{{ row[item.prop] }}</span>
                </div>

                <!-- 正常输出 -->
                <span v-else>{{ row[item.prop] }}</span>
              </template>
            </el-table-column>

            <el-table-column width="100" fixed="right" align="center">
              <template #header>
                <span style="margin-right: 5px">操作</span>
                <el-popover placement="top-start" :width="170" trigger="hover" content="预留操作">
                  <i slot="reference" class="el-icon-question" />
                </el-popover>
              </template>
              <template slot-scope="{row}">
                <div v-if="row.topic_name !== '合计' ">
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
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- 添加对话框 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="50%">
      <el-form
        ref="dataFormRef"
        :model="temp"
        :rules="rules"
        label-position="right"
        label-width="110px"
        style="width: 60%; margin: 0 auto;"
      >
        <el-form-item
          v-for="item in statisticsTableList"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
        >
          <el-input v-model.trim="temp[item.prop]" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import waves from '@/directive/waves'
import { statisticsTableList } from './options'
import { parseTime } from '@/utils'

import request from '@/services/post'
import DownFiles from '@/vendor/ExportExcel'

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
  props: {
    project: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableShowData: undefined,
      technologyTopicStaList: undefined, // 课题统计数据
      technologyTopicTotalSta: undefined, // 总述
      technologyTopicOmitTopList: undefined, // 遗漏率 TOP3
      technologyTopicNotTopList: undefined, // 非功能性比占 TOP3
      statisticsTableList, // 表格头列表配置
      // 筛选的条件
      listQuery: {
        topic_name: undefined, // 技术课题
        check_mode: undefined // 验收方式
      },
      // 项目 select 配置项
      acceptanceMethodOptions: [
        { label: '验证结项', id: 1 },
        { label: '评审结项', id: 2 }
      ],
      butLoading: false, // 下载按钮加载
      tableLoading: false, // 表单加载动画

      dialogFormVisible: false, // 控制添加和修改对话框的显示与隐藏
      temp: {
        id: undefined,
        topic_name: undefined,
        code: undefined,
        check_mode: undefined,
        all_num: undefined,
        type_all_num: undefined,
        type_all_rate: undefined,
        unknown_defect: undefined,
        function_type: undefined,
        performance_type: undefined,
        no_function_type: undefined
      }
    }
  },
  computed: {
    rules() {
      return {
        topic_name: [{ required: true, message: '请输入技术课题', trigger: 'blur' }],
        code: [{ required: true, message: '请输入代码量', trigger: 'blur' }],
        // check_mode: [{ required: true, message: '请输入验收方式', trigger: 'change' }],
        all_num: [{ required: true, message: '请输入工作包缺陷数', trigger: 'blur' }],
        type_all_num: [{ required: true, message: '请输入课题遗漏数', trigger: 'blur' }],
        type_all_rate: [{ required: true, message: '请输入缺陷率', trigger: 'blur' }],
        unknown_defect: [{ required: true, message: '请输入未知缺陷数', trigger: 'blur' }],
        function_type: [{ required: true, message: '请输入功能类数', trigger: 'blur' }],
        performance_type: [{ required: true, message: '请输入性能类数', trigger: 'blur' }],
        no_function_type: [{ required: true, message: '请输入非功能类数', trigger: 'blur' }]
      }
    },
    // 课题分析统计 popover 显示
    topicPopoverContent() {
      const technologyTopicTotalSta = this.technologyTopicTotalSta
      const technologyTopicOmitTopList = this.technologyTopicOmitTopList
      const technologyTopicNotTopList = this.technologyTopicNotTopList
      if (
        technologyTopicTotalSta !== undefined &&
        technologyTopicOmitTopList !== undefined &&
        technologyTopicNotTopList !== undefined
      ) {
        return `<ol type="1" start="1">
          <li>
            技术项目总述：技术课题
            ${
  technologyTopicTotalSta.verify_num +
  technologyTopicTotalSta.review_num +
  technologyTopicTotalSta.other_num
}
            个，${technologyTopicTotalSta.verify_num}个验证结项，${
  technologyTopicTotalSta.review_num
}
            个评审结项，${technologyTopicTotalSta.other_num}个未归类；
          </li>
          <li>缺陷产出：总遗漏率${technologyTopicTotalSta.type_all_rate}个/k，遗漏率TOP3：</li>
          
          <ul type="circle">
            ${technologyTopicOmitTopList.map(
    (item) =>
      `<li>
                ${item.topic_name}(课题)：${item.type_all_rate}（${item.type_all_num}/${item.code}）
              </li>`
  )}
          </ul>
          <li>
            非功能性占比${technologyTopicTotalSta.no_function_rate}
            %(非功能性问题数量/遗漏缺陷总数)；非功能性占比TOP3：
          </li>
          <ul type="circle">
            ${technologyTopicNotTopList.map(
    (item) =>
      `<li>
                ${item.topic_name}(课题)：${item.no_function_type} 个
              </li>`
  )}
          </ul>
        </ol>`
      }
      return ''
    },
    list() {
      let list = this.tableData
      for (const key in this.listQuery) {
        if (this.listQuery[key] !== '' && this.listQuery !== undefined) {
          list = list.filter((item) => String(item[key]).includes(this.listQuery[key]))
        }
      }
      return list
    }
  },
  created() {
    this.getTechnologyTopicStaList(this.project)
    this.getTechnologyTopicTotalSta(this.project)
    this.getTechnologyTopicOmitTopList(this.project)
    this.getTechnologyTopicNotTopList(this.project)
  },
  methods: {
    // 课题点击事件
    handleTopicClick(row) {
      this.$emit('topic-click', row)
    },
    // 验收方式改变事件
    async handleSelectChange(row) {
      const values = {
        topic_name: row.topic_name,
        check_mode: row.check_mode,
        project: this.project
      }

      const { data: res } = await request('/api/projectEvolveSta/technologyTopicInfo/updateCheckMode', {
        method: 'POST',
        data: values
      })

      if (res) {
        this.$notify.success({ title: '修改成功' })
        this.$emit('check_mode-change')
      } else {
        this.$notify.error({ title: '修改失败' })
      }
    },
    // 点击搜索重置
    handleSearchResetClick() {
      this.listQuery.topic_name = undefined
      this.listQuery.check_mode = undefined
      // 执行搜索
      this.getList()
    },
    // 点击搜索
    handleSearchClick() {
      this.getList()
    },
    getList() {
      let list = this.technologyTopicStaList
      for (const key in this.listQuery) {
        if (this.listQuery[key] !== '' && this.listQuery[key] !== undefined) {
          list = list.filter((item) => {
            return String(item[key]).includes(this.listQuery[key])
          })
        }
      }
      this.tableShowData = list
    },
    // 点击导出课题分析
    handleExportClick() {
      this.butLoading = true
      const url = '/api/export/projectTechnologyTopicInfo'
      const obj = {
        conditions: {
          project: this.project
        }
      }
      const fileName = this.project + '技术项目课题分析统计.xls'
      DownFiles(url, obj, fileName, this)
    },
    // 重置 temp
    resetTemp() {
      this.temp = {
        id: undefined,
        topic_name: undefined,
        code: undefined,
        check_mode: undefined,
        all_num: undefined,
        type_all_num: undefined,
        type_all_rate: undefined,
        unknown_defect: undefined,
        function_type: undefined,
        performance_type: undefined,
        no_function_type: undefined
      }
    },
    // 点击编辑按钮，显示编辑表单
    handleUpdateClcik(row) {
      this.temp = Object.assign({}, row) // 复制对象
      this.dialogFormVisible = true // 显示编辑对话框
    },
    // 真正的修改数据
    updateData() {
      this.$refs.dataFormRef.validate((valid) => {
        if (valid) {
          this.$notify.error('功能尚未开发')
          this.$emit('update-view')
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
          this.$emit('update-view')
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
    // 技术项目-课题统计
    async getTechnologyTopicStaList(project) {
      this.tableLoading = true
      this.listQuery = {
        topic_name: undefined, // 技术课题
        check_mode: undefined // 验收方式
      }
      const { data: res } = await request('/api/projectEvolveSta/queryByTechnologyTopicSta', {
        method: 'GET',
        params: {
          project
        }
      })
      this.tableShowData = res // 用来查询
      this.technologyTopicStaList = res

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    // 技术项目-总述
    async getTechnologyTopicTotalSta(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByTechnologyTopicTotalSta', {
        method: 'GET',
        params: {
          project
        }
      })
      this.technologyTopicTotalSta = res
    },
    // 技术项目-遗漏率TOP3
    async getTechnologyTopicOmitTopList(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByTechnologyTopicTopSta', {
        method: 'GET',
        params: {
          project
        }
      })
      this.technologyTopicOmitTopList = res
    },
    // 技术项目-非功能性占比TOP3
    async getTechnologyTopicNotTopList(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByTechnologyTopicTopSta', {
        method: 'GET',
        params: {
          project
        }
      })
      this.technologyTopicNotTopList = res
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

.blue {
  color: #1895ff;
  cursor: pointer;
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
