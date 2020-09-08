<template>
  <div class="outbox">
    <el-table v-loading="tableLoading" :data="list" style="width: 100%;" highlight-current-row>
      <el-table-column
        v-for="(item, index) in tableOptions"
        :key="index"
        :label="item.label"
        :min-width="item.minWidth"
        :prop="item.prop"
      >
        <template slot-scope="{row}">
          <span v-if="item.prop === 'time_stamp'">{{ row[item.prop] | parseTime }}</span>
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
import { parseTime } from '@/utils'
import { doListSendMessage } from '@/services/manage/manage'

export default {
  filters: { parseTime },
  components: { Pagination },
  data() {
    return {
      tableLoading: false,
      list: undefined,
      total: 0,
      pageInfo: {
        orderBy: null,
        pageSize: 20,
        pageNum: 1
      },
      tableOptions: [
        {
          label: '收件人',
          prop: 'receiver_name',
          minWidth: '60'
        },
        {
          label: '消息标题',
          prop: 'title',
          minWidth: '80'
        },
        {
          label: '消息内容',
          prop: 'msg_content',
          minWidth: '200'
        },
        {
          label: '消息发送时间',
          prop: 'time_stamp',
          minWidth: '100'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loadSendMessageList()
    },
    handlePageUpdate(e) {
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit
      this.querySendMessageList()
    },
    async querySendMessageList() {
      this.tableLoading = true
      const { data: res } = await doListSendMessage(this.pageInfo)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    async loadSendMessageList() {
      this.pageInfo.pageNum = 1
      this.tableLoading = true
      const { data: res } = await doListSendMessage(this.pageInfo)
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
</style>
