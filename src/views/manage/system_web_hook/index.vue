<template>
  <el-card id="system-web-hook">
    <el-row :gutter="20">
      <el-col :span="6">
        <span>发送周期：</span>
        <el-select
          v-model="listQuery.periodType"
          placeholder="请选择发送周期"
          size="small"
          style="width: 80%; max-width: 200px;"
        >
          <el-option
            v-for="item in dataSelectList"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="6">
        <span>标题：</span>
        <el-input
          v-model.trim="listQuery.title"
          placeholder="请输入标题"
          size="small"
          style="width: 80%; max-width: 200px;"
        />
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
        <el-button size="small" @click="handleResetClick">重置</el-button>
        <el-button type="primary" size="small" @click="handleCreateClick">新增</el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="tableLoading"
      :data="list"
      highlight-current-row
      row-key="id"
      style="width: 100%; margin-top: 20px;"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :header-cell-style="{ background: '#f6f6f6' }"
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.key"
        :label="item.title"
        :prop="item.dataIndex"
        :min-width="item.width"
      >
        <template slot-scope="{row}">
          <div v-if="item.dataIndex === 'action'">
            <el-button
              v-if="row.parent_id !== 0"
              slot="reference"
              type="primary"
              size="small"
              @click="handleEditClick(row)"
            >修改</el-button>
            <el-button
              v-if="row.parent_id !== 0"
              slot="reference"
              type="success"
              size="small"
              @click="handleSendClick(row)"
            >立即发送</el-button>
          </div>

          <span v-else>{{ row[item.dataIndex] }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="total >= pageInfo.pageSize" class="pagination">
      <pagination
        :total="total"
        :page="pageInfo.pageNum"
        :limit="pageInfo.pageSize"
        :auto-scroll="false"
        @pagination="handlePageUpdate"
      />
    </div>

    <Dialog ref="dialogRef" @reload="handleResetClick" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import Dialog from './components/Dialog'

import request from '@/services/request'

export default {
  name: 'SystemWebHook',
  components: { Pagination, Dialog },
  data() {
    return {
      role: '',
      listQuery: {
        periodType: '',
        title: ''
      },
      pageInfo: {
        orderBy: null,
        pageNum: 1,
        pageSize: 20
      },
      list: [],
      total: 0,
      tableLoading: false,
      dataSelectList: [
        {
          value: '',
          label: '全部',
          key: 'all'
        },
        {
          value: '天',
          label: '天',
          key: 'day'
        },
        {
          value: '周',
          label: '周',
          key: 'week'
        }
      ],
      tableOptions: [
        {
          title: 'key',
          dataIndex: 'url_key',
          key: 'url_key',
          width: 140
        },
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
          width: 100
        },
        {
          title: '发送周期',
          dataIndex: 'period_type',
          key: 'period_type',
          width: 50
        },
        {
          title: '发送星期',
          dataIndex: 'date_type',
          key: 'date_type',
          width: 50
        },
        {
          title: '发送小时',
          dataIndex: 'hour_num',
          key: 'hour_num',
          width: 50
        },
        {
          title: '下次发送日期',
          dataIndex: 'nextDate',
          key: 'nextDate',
          width: 100
        },
        {
          title: '发送内容',
          dataIndex: 'content',
          key: 'content',
          width: 100
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          width: 80
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.queryList()
    },
    resetListQuery() {
      this.listQuery = {
        periodType: '',
        title: ''
      }
    },
    // 点击新建
    handleCreateClick() {
      this.$refs.dialogRef.create()
    },
    // 点击编辑
    handleEditClick(row) {
      this.$refs.dialogRef.edit(row)
    },
    // 点击立即发送
    async handleSendClick(row) {
      const params = {
        key: row.url_key,
        content: row.content
      }

      const { data: res } = await request('/api/webHook/sendMessage', {
        params
      })

      if (res && res !== undefined) {
        this.$message.success('发送成功')
      }
    },
    handleQueryClick() {
      this.pageInfo.orderBy = null
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = 20

      this.queryList()
    },
    handleResetClick() {
      this.resetListQuery()
      this.pageInfo.orderBy = null
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = 20

      this.queryList()
    },
    handlePageUpdate(e) {
      this.pageInfo.pageSize = e.limit
      this.pageInfo.pageNum = e.page
      this.queryList()
    },
    async queryList() {
      this.tableLoading = true
      const { periodType, title } = this.listQuery
      const { data: res } = await request('/api/webHook/list', {
        params: {
          periodType,
          title
        }
      })
      this.list = res
      this.total = res.length
      console.log(res)

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#system-web-hook {
  margin: 20px;

  .el-row {
    .el-col {
      display: flex;
      align-items: center;

      > span {
        font-size: 14px;
        white-space: nowrap;
      }
    }
  }
}
</style>
