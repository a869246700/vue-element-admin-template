<template>
  <div class="type-list">
    <el-row :gutter="20">
      <el-col :span="6">
        <span>问题类型：</span>
        <el-select v-model="listQuery.question" size="small" style="width: 100px;">
          <el-option label="全部" value />
          <el-option
            v-for="(item, index) in typeSelectList"
            :key="index"
            :label="item.title"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="8">
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
        v-for="(item, index) in tableOptions"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :min-width="item.minWidth"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <div v-if="item.prop === 'action'">
            <el-popconfirm title="您确定要删除该数据？" @onConfirm="handleDeleteClick(row)">
              <el-button slot="reference" type="danger" icon="el-icon-delete" size="small">删除</el-button>
            </el-popconfirm>
          </div>
          <div v-else>{{ row[item.prop] }}</div>
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

    <type-dialog ref="typeDialogRef" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import TypeDialog from './TypeDialog'
import request from '@/services/request'
import { doListSystemQuestionType } from '@/services/manage/manage'

export default {
  components: { Pagination, TypeDialog },
  data() {
    return {
      listQuery: {
        question: ''
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        orderBy: null
      },
      total: 0,
      list: [],
      tableLoading: false,
      typeSelectList: [],
      tableOptions: [
        {
          label: '问题',
          prop: 'question',
          minWidth: '120'
        },
        {
          label: '判断依据',
          prop: 'according',
          minWidth: '120'
        },
        {
          label: '根因',
          prop: 'cause',
          minWidth: '120'
        },
        {
          label: '根因补充说明',
          prop: 'cause_replenish',
          minWidth: '120'
        },
        {
          label: '问题其他补充',
          prop: 'other_replenish',
          minWidth: '120'
        },
        {
          label: '支撑人员',
          prop: 'user_name',
          minWidth: '80'
        },
        {
          label: '操作',
          prop: 'action',
          minWidth: '50'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loadTyleList()
      this.getTypeList()
    },
    handleQueryClick() {
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = 10
      this.queryTypeList()
    },
    handleResetClick() {
      this.listQuery.question = ''
      this.queryTypeList()
    },
    handlePageUpdate(e) {
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit
      this.queryTypeList()
    },
    handleCreateClick() {
      this.$refs.typeDialogRef.resetTemp()
      this.$refs.typeDialogRef.dialogVisible = true
    },
    // 点击确认删除
    async handleDeleteClick(row) {
      const res = await request('/api/systemAutoProjectQuestion/deleteType', {
        method: 'DELETE',
        params: {
          id: row.id
        }
      })
      if (res && res !== undefined) {
        this.$message.success('删除成功')
      } else {
        this.$message.error('删除失败')
      }
    },
    // 查询
    async queryTypeList() {
      this.tableLoading = true
      const params = {
        conditions: this.listQuery,
        ...this.pageInfo
      }
      const { data: res } = await doListSystemQuestionType(params)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    // 初始化
    async loadTyleList() {
      this.tableLoading = true
      const { data: res } = await doListSystemQuestionType(this.pageInfo)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    // 获取 问题类型
    async getTypeList() {
      const { data: res } = await request('/api/systemAutoProjectQuestion/questionTypeList')
      this.typeSelectList = res
    }
  }
}
</script>
