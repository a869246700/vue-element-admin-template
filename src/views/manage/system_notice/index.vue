<template>
  <el-card id="system-notice">
    <el-row :gutter="20">
      <el-col :span="6">
        <span>公告标题：</span>
        <el-input
          v-model.trim="listQuery.title"
          size="small"
          style="width: 130px;"
          placeholder="请输入公告标题"
        />
      </el-col>
      <el-col :span="6">
        <span>公告标题：</span>
        <el-input
          v-model.trim="listQuery.content"
          size="small"
          style="width: 130px;"
          placeholder="请输入公告内容"
        />
      </el-col>
      <el-col :span="7">
        <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
        <el-button size="small" @click="handleResetClick">重置</el-button>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleCreateClick">新建</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="tableLoading" :data="list" highlight-current-row style="margin: 20px 0;">
      <el-table-column
        v-for="item in tableOptions"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
      />
    </el-table>

    <div class="pagination">
      <pagination
        :total="total"
        :page="pageInfo.pageNum"
        :limit="pageInfo.pageSize"
        :auto-scroll="false"
        @pagination="handlePageUpdate"
      />
    </div>

    <add-dialog ref="addDialogRef" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import AddDialog from './components/AddDialog'
import { doListSystemNotice } from '@/services/manage/manage'

export default {
  name: 'SystemNotice',
  components: { Pagination, AddDialog },
  data() {
    return {
      listQuery: {
        title: '',
        content: ''
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        orderBy: null
      },
      list: undefined,
      tableLoading: false,
      total: 0,
      tableOptions: [
        {
          label: '创建时间',
          prop: 'create_time',
          minWidth: '90'
        },
        {
          label: '公告标题',
          prop: 'title',
          minWidth: '90'
        },
        {
          label: '公告内容',
          prop: 'content',
          minWidth: '300'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loadList()
    },
    handleQueryClick() {
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = 10
      this.queryList()
    },
    handleResetClick() {
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = 10
      this.listQuery = {
        title: '',
        content: ''
      }
      this.queryList()
    },
    handleCreateClick() {
      this.$refs.addDialogRef.resetTemp()
      this.$refs.addDialogRef.dialogVisible = true
    },
    handlePageUpdate(e) {
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit

      // 执行搜索
      this.queryList()
    },
    async queryList() {
      this.tableLoading = true
      const params = {
        conditions: this.listQuery,
        ...this.pageInfo
      }

      const { data: res } = await doListSystemNotice(params)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    async loadList() {
      this.tableLoading = true
      const { data: res } = await doListSystemNotice(this.pageInfo)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#system-notice {
  margin: 20px;
  font-size: 14px;
}
</style>
