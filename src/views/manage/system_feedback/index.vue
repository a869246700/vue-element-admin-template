<template>
  <el-card id="system-feedback">
    <el-row :gutter="20">
      <el-col :span="6">
        <span>提交人：</span>
        <el-input v-model.trim="submitter" size="small" style="width: 110px;" placeholder="请输入提交人" />
      </el-col>
      <el-col :span="6">
        <span>意见类型：</span>
        <el-select v-model="opinionVal" placeholder="请选择意见类型" size="small" style="width: 110px;">
          <el-option
            v-for="item in opinionList"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="6">
        <span>意见标题：</span>
        <el-input v-model.trim="title" size="small" style="width: 130px;" placeholder="请输入意见标题" />
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
      highlight-current-row
      border
      :header-cell-style="{ background: '#f6f6f6' }"
      style="margin: 20px 0;"
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
        show-overflow-tooltip
      />
    </el-table>

    <div v-if="total > pageInfo.pageSize" class="pagination">
      <pagination
        :total="total"
        :page="pageInfo.pageNum"
        :limit="pageInfo.pageSize"
        :auto-scroll="false"
        @pagination="handlePageUpdate"
      />
    </div>

    <add-dialog ref="addRef" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import AddDialog from './components/AddDialog'
import { doListSystemFeedback } from '@/services/manage/manage'

export default {
  name: 'SystemFeedback',
  components: { Pagination, AddDialog },
  data() {
    return {
      submitter: '', // 提交人
      // 意见类型
      opinionVal: '',
      opinionList: [
        {
          label: '全部',
          key: 'all',
          value: ''
        },
        {
          label: '布局样式',
          key: 'style',
          value: '布局样式'
        },
        {
          label: '页面操作',
          key: '页面操作',
          value: 'page'
        },
        {
          label: '数据准确',
          key: 'data',
          value: '数据准确'
        },
        {
          label: '缺少内容',
          key: 'content',
          value: '缺少内容'
        }
      ],
      title: '', // 意见标题
      tableOptions: [
        {
          label: '提交人',
          prop: 'user_name',
          minWidth: '240'
        },
        {
          label: '创建时间',
          prop: 'time',
          minWidth: '240'
        },
        {
          label: '意见类型',
          prop: 'type',
          minWidth: '240'
        },
        {
          label: '意见标题',
          prop: 'title',
          minWidth: '240'
        },
        {
          label: '意见内容',
          prop: 'content',
          minWidth: '240'
        }
      ],
      pageInfo: {
        orderBy: null,
        pageSize: 10,
        pageNum: 1
      },
      list: undefined,
      tableLoading: false
    }
  },
  computed: {
    total() {
      return this.list ? this.list.length : 0
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loadList()
    },
    // 点击查询
    handleQueryClick() {
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = 10

      // 执行搜索
      this.queryList()
    },
    // 点击重置
    handleResetClick() {
      this.submitter = ''
      this.opinionVal = ''
      this.title = ''
      this.pageInfo = {
        orderBy: null,
        pageSize: 20,
        pageNum: 1
      }

      // 执行初始化
      this.loadList()
    },
    // 分段器修改
    handlePageUpdate(e) {
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit

      // 执行搜索
      this.queryList()
    },
    // 点击新建
    handleCreateClick() {
      // 显示添加对话框
      this.$refs.addRef.resetTemp()
      this.$refs.addRef.dialogVisible = true
    },
    // 初始化加载数据
    async loadList() {
      this.tableLoading = true
      const { data: res } = await doListSystemFeedback(this.pageInfo)
      this.list = res.list

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    // 搜索数据
    async queryList() {
      this.tableLoading = true
      const params = {
        conditions: {
          userName: this.submitter === '' ? undefined : this.submitter,
          title: this.title === '' ? undefined : this.title,
          type: this.opinionVal
        },
        ...this.pageInfo
      }
      const { data: res } = await doListSystemFeedback(params)
      this.list = res.list

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#system-feedback {
  margin: 20px;
  font-size: 14px;

  .el-row .el-col {
    display: flex;
    align-items: center;

    span {
      // 不换行
      white-space: nowrap;
      margin-right: 8px;
    }
  }
}
</style>
