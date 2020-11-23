<template>
  <el-dialog title="文档变更" :visible.sync="dialogVisible" width="70%" append-to-body>
    <el-form ref="formRef" :inline="true" :model="listQuery" class="demo-form-inline">
      <el-form-item label="文档名称" prop="fileName">
        <el-input
          v-model.trim="listQuery.fileName"
          size="small"
          placeholder="请输入文档名称"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="变更状态" prop="state">
        <el-select v-model="listQuery.state" placeholder="请选择变更状态">
          <el-option key="all" value="" label="全部">
            <badge type="primary" title="全部" />
          </el-option>
          <el-option key="add" value="1" label="新增">
            <badge type="success" title="新增" />
          </el-option>
          <el-option key="del" value="2" label="删除">
            <badge type="success" title="删除" />
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
        <el-button @click="handleResetClick">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="tableLoading"
      :data="showTableData"
      highlight-current-row
      border
      :header-cell-style="{background: '#f6f6f6'}"
      style="width: 100%"
    >
      <el-table-column key="documentName" prop="documentName" label="文档名称" min-width="240">
        <template slot-scope="{row}">
          <div v-if="row['state'] === 1" class="flex">
            <img :src="newIcon" title="新增" alt="" height="20" width="20">
            <span style="color: green; margin: 0 2px;">{{ row['documentName'] }}</span>
          </div>
          <div v-else-if="row['state'] === 2" class="flex">
            <img :src="deleteIcon" title="删除" alt="" height="20" width="20">
            <span style="color: red; text-decoration: line-through; margin: 0 2px;">{{ row['documentName'] }}</span>
          </div>
          <div v-else style="color: blue;">{{ row['documentName'] }}</div>
        </template>
      </el-table-column>
      <el-table-column key="create_date" prop="create_date" label="创建时间" min-width="90" />
      <el-table-column key="modify_date" prop="modify_date" label="修改时间" min-width="90" />
      <el-table-column key="type" prop="type" label="文档类型" min-width="50" />
      <el-table-column key="chargeUserName" prop="chargeUserName" label="负责人" min-width="50" />
      <el-table-column key="is_submit" prop="is_submit" label="是否入库" min-width="50" />
      <el-table-column key="project" prop="project" label="项目名称" min-width="70" />
      <el-table-column key="state" prop="state" label="变更状态" min-width="50">
        <template slot-scope="{row}">
          <span>{{ row['state'] | stateFilter }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="isShowPagination" class="pagination">
      <pagination
        :total="total"
        :page="pageInfo.page"
        :limit="pageInfo.limit"
        :auto-scroll="false"
        @pagination="handlePaginationChange"
      />
    </div>
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import Badge from '@/components/Badge'

import request from '@/services/request'

import newIcon from './img/new.png'
import deleteIcon from './img/delete.png'

export default {
  components: {
    Pagination,
    Badge
  },
  filters: {
    stateFilter(state) {
      switch (state) {
        case 1:
          return '新增'
        case 2:
          return '删除'
        case 3:
          return '修改'
        default:
          return ' '
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      temp: undefined,
      listQuery: {
        workPacketId: '',
        workPacketName: '',
        state: ''
      },
      list: [],
      pageInfo: {
        page: 1,
        limit: 10
      },
      tableLoading: false,
      newIcon,
      deleteIcon
    }
  },
  computed: {
    // 表单列表总数
    total() {
      return this.list.length
    },
    // 是否显示表单
    isShowPagination() {
      return this.list.length > 10
    },
    // 显示的表单列表数据
    showTableData() {
      return this.list.slice((this.pageInfo.page - 1) * this.pageInfo.limit, this.pageInfo.page * this.pageInfo.limit)
    }
  },
  methods: {
    showDialog() {
      this.dialogVisible = true
    },
    setTemp(row) {
      this.temp = row

      // 执行查询
      this.getList(row.project, row.workPacketId, '', '')
    },
    getClickFlag(row) {
      return row['state'] > 0
    },
    handlePaginationChange(e) {
      this.pageInfo.page = e.page
      this.pageInfo.limit = e.limit
    },
    handleQueryClick() {
      this.getList(this.temp.project, this.temp.workPacketId, this.listQuery.fileName, this.listQuery.state)
    },
    handleResetClick() {
      this.$refs.formRef.resetFields()
    },
    async getList(project, workPacketId, fileName, state) {
      this.tableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryProjectDocumentChange', {
        params: {
          project,
          workPacketId,
          fileName,
          state
        }
      })
      this.list = res

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
}
</style>
