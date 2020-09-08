<template>
  <div class="question-list">
    <el-row :gutter="20">
      <el-col :span="4">
        <span>项目名称：</span>
        <el-select v-model="listQuery.project" size="small" style="width: 100px;">
          <el-option label="全部" value />
          <el-option
            v-for="(item, index) in projectSelectList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>

      <el-col :span="4">
        <span>问题类型：</span>
        <el-select v-model="listQuery.questionType" size="small" style="width: 100px;">
          <el-option label="全部" value />
          <el-option
            v-for="(item, index) in typeSelectList"
            :key="index"
            :label="item.title"
            :value="item.value"
          />
        </el-select>
      </el-col>

      <el-col :span="4">
        <span>和自己相关：</span>
        <el-select v-model="listQuery.isSelf" size="small" style="width: 100px;">
          <el-option label="全部" value="0" />
          <el-option label="是" value="1" />
        </el-select>
      </el-col>

      <el-col :span="4">
        <span>问题状态：</span>
        <el-select v-model="listQuery.state" size="small" style="width: 100px;">
          <el-option label="全部" value />
          <el-option
            v-for="(item, index) in statusSelectList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
        <el-button size="small" @click="handleResetClick">重置</el-button>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleCreateClick">新建</el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="tableLoading"
      :data="list"
      border
      highlight-current-row
      style="margin-top: 20px;"
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :min-width="item.minWidth"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <span
            v-if="item.prop === 'is_loop' || item.prop === 'is_urge' || item.prop === 'is_ignore'"
          >{{ row[item.prop] === 1 ? '是' : '否' }}</span>

          <div v-else-if="item.prop === 'active'">
            <div
              v-if="row.create_name === currentUser.userCn && row.user_name !== currentUser.userCn && row.manage_name !== currentUser.userCn"
            >
              <div v-if="row.state === '已处理'">
                <el-button
                  type="primary"
                  size="small"
                  style="margin-right: 5px;"
                  @click="confirmModalVisible(row)"
                >确认</el-button>
                <el-button type="primary" size="small" @click="showModalVisible(row)">查看</el-button>
              </div>
              <div v-if="row.state === '待处理'">
                <el-button
                  type="primary"
                  size="small"
                  style="margin-right: 5px;"
                  @click="delContent(row)"
                >删除</el-button>
                <el-button
                  type="primary"
                  size="small"
                  style="margin-right: 5px;"
                  @click="updateContent(row)"
                >修改</el-button>
                <el-button type="primary" size="small" @click="showModalVisible(row)">查看</el-button>
              </div>
            </div>

            <div
              v-else-if="(row.user_name === currentUser.userCn || row.manage_name === currentUser.userCn) && row.create_name === currentUser.userCn"
            >
              <div v-if="row.state === '已处理'">
                <el-button
                  type="primary"
                  size="small"
                  style="margin-right: 5px;"
                  @click="confirmModalVisible(row)"
                >确认</el-button>
                <el-button type="primary" size="small" @click="showModalVisible(row)">查看</el-button>
              </div>
              <div v-if="row.state === '待处理'">
                <el-button
                  type="primary"
                  size="small"
                  style="margin-right: 5px;"
                  @click="delContent(row)"
                >删除</el-button>
                <el-button
                  type="primary"
                  size="small"
                  style="margin-right: 5px;"
                  @click="updateContent(row)"
                >修改</el-button>
                <el-button
                  type="primary"
                  size="small"
                  style="margin-right: 5px;"
                  @click="handleContent(row)"
                >处理</el-button>
                <el-button type="primary" size="small" @click="showModalVisible(row)">查看</el-button>
              </div>
            </div>

            <div
              v-else-if="(row.user_name === currentUser.userCn || row.manage_name === currentUser.userCn) && row.create_name !== currentUser.userCn"
            >
              <div v-if="row.state === '已处理' || row.state === '待处理'">
                <el-button
                  type="primary"
                  size="small"
                  style="margin-right: 5px;"
                  @click="handleContent(row)"
                >处理</el-button>
                <el-button type="primary" size="small" @click="showModalVisible(row)">查看</el-button>
              </div>
            </div>

            <div v-else>
              <el-button type="primary" size="small" @click="showModalVisible(row)">查看</el-button>
            </div>
          </div>

          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <pagination
        v-if="total !== 0"
        :total="total"
        :page="pageInfo.pageNum"
        :limit="pageInfo.pageSize"
        :auto-scroll="false"
        @pagination="handlePageUpdate"
      />
    </div>

    <question-dialog ref="questionDialogRef" :type-select-list="typeSelectList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import QuestionDialog from './QuestionDialog'

import { doListSystemQuestion } from '@/services/manage/manage'
import request from '@/services/request'
import { mapGetters } from 'vuex'

export default {
  components: { Pagination, QuestionDialog },
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        orderBy: null
      },
      listQuery: {
        isSelf: '0',
        project: '',
        question: '',
        questionType: '',
        state: ''
      },
      total: 0,
      tableLoading: false,
      list: undefined,
      projectSelectList: [],
      typeSelectList: [],
      statusSelectList: ['待处理', '已处理', '已确认'],
      tableOptions: [
        {
          label: '项目名称',
          prop: 'project',
          minWidth: '160'
        },
        {
          label: '问题',
          prop: 'question',
          minWidth: '100'
        },
        {
          label: '责任人',
          prop: 'user_name',
          minWidth: '80'
        },
        {
          label: '管理者',
          prop: 'manage_name',
          minWidth: '80'
        },
        {
          label: '发现时间',
          prop: 'createTime',
          minWidth: '140'
        },
        {
          label: '是否闭环',
          prop: 'is_loop',
          minWidth: '80'
        },
        {
          label: '闭环时间',
          prop: 'loopTime',
          minWidth: '140'
        },
        {
          label: '是否跟催',
          prop: 'is_urge',
          minWidth: '80'
        },
        {
          label: '问题类型',
          prop: 'question_type',
          minWidth: '100'
        },
        {
          label: '考核时间',
          prop: 'examineTime',
          minWidth: '140'
        },
        {
          label: '是否忽略',
          prop: 'is_ignore',
          minWidth: '80'
        },
        {
          label: '问题状态',
          prop: 'state',
          minWidth: '100'
        },
        {
          label: '操作',
          prop: 'action',
          minWidth: '100'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getQuestionList()
      this.getProjectSelectList()
      this.getTypeList()
    },
    handleQueryClick() {
      this.pageInfo.pageSize = 10
      this.pageInfo.pageNum = 1
      this.queryQuestionList()
    },
    handleResetClick() {
      this.pageInfo.pageSize = 10
      this.pageInfo.pageNum = 1
      this.listQuery = {
        isSelf: '0',
        project: '',
        question: '',
        questionType: '',
        state: ''
      }
      this.queryQuestionList()
    },
    handlePageUpdate(e) {
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit
      this.queryQuestionList()
    },
    // 新建按钮
    handleCreateClick() {
      this.$refs.questionDialogRef.resetTemp()
      this.$refs.questionDialogRef.dialogVisible = true
    },
    // 确认按钮
    confirmModalVisible(record) {},
    // 查看按钮
    showModalVisible(record) {},
    // 更新按钮
    updateContent(record) {},
    // 删除按钮
    delContent(record) {},
    // 处理按钮
    handleContent(record) {},
    async queryQuestionList() {
      this.tableLoading = true
      const params = {
        conditions: this.listQuery,
        ...this.pageInfo
      }
      const { data: res } = await doListSystemQuestion(params)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    // 获取问题列表
    async getQuestionList() {
      this.tableLoading = true
      const { data: res } = await doListSystemQuestion(this.pageInfo)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    // 获取 projectSelect
    async getProjectSelectList() {
      const { data: res } = await request('/api/systemAutoProjectQuestion/findByQuestionProject')
      this.projectSelectList = res
    },
    // 获取 问题类型
    async getTypeList() {
      const { data: res } = await request('/api/systemAutoProjectQuestion/questionTypeList')
      this.typeSelectList = res
    }
  }
}
</script>
