<template>
  <div class="outbox">
    <!-- 操作栏 -->
    <div class="operation-bar">
      申请状态：
      <el-select
        v-model="selectVal"
        size="small"
        placeholder="请输入角色名称"
        style="width: 100px; margin-left: 10px;"
      >
        <el-option
          v-for="(item, index) in selectOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" size="small" style="margin-left: 15px;" @click="handleQueryClick">查询</el-button>
      <el-button size="small" @click="handleResetClick">重置</el-button>
    </div>

    <el-table
      v-loading="tableLoading"
      :data="list"
      style="width: 100%;margin: 20px 0;"
      highlight-current-row
    >
      <el-table-column
        v-for="(item, index) in tableOptions"
        :key="index"
        :label="item.label"
        :min-width="item.minWidth"
      >
        <template slot-scope="{row}">
          <div v-if="item.prop === 'time_stamp'">{{ row[item.prop] | parseTime }}</div>
          <div v-else-if="item.prop === 'readed' && row.readed === 0">未读</div>
          <div v-else-if="item.prop === 'readed' && row.readed === 1">已读</div>
          <div v-else-if="item.prop === 'action'">
            <el-popconfirm
              v-if="row.readed === 0"
              placement="top"
              title="您确定要将该消息标记为已读?"
              @onConfirm="handleReadClick(row, 0)"
            >
              <el-button slot="reference" type="primary" size="small">已读</el-button>
            </el-popconfirm>

            <el-popconfirm
              v-else-if="row.readed === 1"
              placement="top"
              title="您确定要将该消息标记为未读?"
              @onConfirm="handleReadClick(row, 1)"
            >
              <el-button slot="reference" type="info" size="small">未读</el-button>
            </el-popconfirm>
          </div>
          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>
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
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import request from '@/services/request'
import { doListReceiverMessage } from '@/services/manage/manage'
import { parseTime } from '@/utils'

export default {
  filters: {
    parseTime
  },
  components: { Pagination },
  data() {
    return {
      selectVal: '',
      selectOptions: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '已读',
          value: '1'
        },
        {
          label: '未读',
          value: '0'
        }
      ],
      tableOptions: [
        {
          label: '发件人',
          prop: 'send_name',
          minWidth: 60
        },
        {
          label: '消息标题',
          prop: 'title',
          minWidth: 80
        },
        {
          label: '消息内容',
          prop: 'msg_content',
          minWidth: 200
        },
        {
          label: '消息发送时间',
          prop: 'time_stamp',
          minWidth: 100
        },
        {
          label: '消息状态',
          prop: 'readed',
          minWidth: 60
        },
        {
          label: '操作',
          prop: 'action',
          minWidth: 80
        }
      ],
      pageInfo: {
        pageNum: 1,
        pageSize: 20,
        orderBy: null
      },
      tableLoading: false,
      list: undefined,
      total: 0
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loadReceiverMessageList()
    },
    handlePageUpdate(e) {
      this.pageInfo.pageSize = e.limit
      this.pageInfo.pageNum = e.page

      const params = {
        conditions: {
          read: this.selectVal,
          updatedAt: undefined
        },
        ...this.pageInfo
      }
      this.queryReceiverMessageList(params)
    },
    async handleReadClick(row, flag) {
      const values = {
        id: row.id,
        readed: flag
      }

      const { data: res } = await request('api/message/updateReaded', {
        method: 'POST',
        data: values
      })

      if (res && res !== undefined) {
        if (flag === 0) {
          this.$notify.success('标记为已读')
        } else {
          this.$notify.success('标记为未读')
        }
        this.handleQueryClick()
      }
    },
    handleQueryClick() {
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = 20

      const params = {
        conditions: {
          read: this.selectVal,
          updatedAt: undefined
        },
        ...this.pageInfo
      }

      this.queryReceiverMessageList(params)
    },
    handleResetClick() {
      // 重置val
      this.selectVal = '全部'
      this.loadReceiverMessageList()
    },
    async loadReceiverMessageList() {
      this.pageInfo.pageNum = 1
      this.tableLoading = true
      const { data: res } = await doListReceiverMessage(this.pageInfo)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    async queryReceiverMessageList(params) {
      this.tableLoading = true
      const { data: res } = await doListReceiverMessage(params)
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
.operation-bar {
  display: flex;
  align-items: center;
}
</style>
