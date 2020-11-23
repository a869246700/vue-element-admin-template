<template>
  <div class="demand-change">
    <!-- 操作栏 -->
    <el-form ref="formRef" :inline="true" :model="listQuery" class="demo-form-inline">
      <el-form-item label="需求ID" prop="requestId">
        <el-input
          v-model.trim="listQuery.requestId"
          size="small"
          placeholder="请输入需求ID"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="需求名称" prop="requestName">
        <el-input
          v-model.trim="listQuery.requestName"
          size="small"
          placeholder="请输入需求名称"
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

    <!-- 表单数据 -->
    <el-table
      v-loading="tableLoading"
      :data="showTableData"
      highlight-current-row
      border
      :header-cell-style="{background: '#f6f6f6'}"
      style="width: 100%"
    >
      <el-table-column key="requestId" prop="requestId" label="需求ID" min-width="50" />
      <el-table-column key="requestName" prop="requestName" label="需求名称" min-width="360">
        <template slot-scope="{row}">
          <div class="flex">
            <div
              v-if="row['request_state'] === 0"
              style="color: blue"
              :style="{ cursor : getClickFlag(row) === false ? 'auto' : 'pointer' }"
              @click="handleDemandOnRowClick(row)"
            >{{ row['requestName'] }}</div>

            <div v-else-if="row['request_state'] === 1" class="flex">
              <img :src="newIcon" title="新增" height="20" width="20">
              <span
                style="color: green; margin: 0 5px;"
                :style="{ cursor : getClickFlag(row) === false ? 'auto' : 'pointer' }"
                @click="handleDemandOnRowClick(row)"
              >{{ row['requestName'] }}</span>
            </div>

            <div v-else-if="row['request_state'] === 2" class="flex">
              <img :src="deleteIcon" title="删除" height="20" width="20">
              <span
                style="color: red; text-decoration: line-through; margin: 0 5px;"
              >{{ row['requestName'] }}</span>
            </div>

            <img
              v-if="row['state'] > 0"
              :src="updateBlueIcon"
              title="文档变更"
              height="20"
              width="20"
              class="workUpdate"
            >
            <img
              v-if="row['work_state'] > 0"
              :src="updateGreenIcon"
              title="工作包变更"
              height="20"
              width="20"
              class="fileUpdate"
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column key="create_time" prop="create_time" label="创建时间" min-width="100" />
      <el-table-column key="update_time" prop="update_time" label="修改时间" min-width="100" />
      <el-table-column key="requestStatus" prop="requestStatus" label="需求状态" min-width="50">
        <template slot-scope="{row}">
          <div>{{ row['requestStatus'] | statusFilter }}</div>
        </template>
      </el-table-column>
      <el-table-column key="project" prop="project" label="项目名称" min-width="120" />
      <el-table-column key="request_state" prop="request_state" label="变更状态" min-width="50">
        <template slot-scope="{row}">
          <div>{{ row['request_state'] | stateFilter }}</div>
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

    <demand-change-dialog ref="dialogRef" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import Badge from '@/components/Badge'

import request from '@/services/request'
import newIcon from './img/new.png'
import deleteIcon from './img/delete.png'
import updateBlueIcon from './img/update_blue.png'
import updateGreenIcon from './img/update_green.png'
import DemandChangeDialog from './DemandChangeDialog.vue'

export default {
  components: {
    Pagination,
    Badge,
    DemandChangeDialog
  },
  filters: {
    statusFilter(status) {
      switch (status) {
        case 'DEVELOP':
          return '开发中'
        case 'FINISH':
          return '完成'
        case 'DISABLED':
          return '取消'
        default:
          return ' '
      }
    },
    stateFilter(state) {
      switch (state) {
        case 1:
          return '新增'
        case 2:
          return '删除'
        default:
          return ' '
      }
    }
  },
  props: {
    project: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      listQuery: {
        requestId: '',
        requestName: '',
        state: ''
      },
      pageInfo: {
        page: 1,
        limit: 10
      },
      list: [],
      tableLoading: false,
      newIcon,
      deleteIcon,
      updateBlueIcon,
      updateGreenIcon,
      temp: undefined
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
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getList(this.project, this.listQuery)
    },
    handleDemandOnRowClick(row) {
      if (!this.getClickFlag(row)) {
        return
      }

      this.$refs.dialogRef.setTemp(row)
      // 显示对话框
      this.$refs.dialogRef.showDialog()
    },
    handlePaginationChange(e) {
      this.pageInfo.page = e.page
      this.pageInfo.limit = e.limit
    },
    getClickFlag(row) {
      return row['state'] > 0 || row['work_state'] > 0
    },
    handleQueryClick() {
      this.getList(this.project, this.listQuery)
    },
    handleResetClick() {
      this.$refs.formRef.resetFields()
    },
    async getList(project, listQuery) {
      this.tableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryProjectDemandChange', {
        params: {
          project,
          ...listQuery
        }
      })
      console.log(res)
      this.list = res

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.demand-change {
  margin: 10px;

  .flex {
    display: flex;
    align-items: center;
  }
}

.demand-change ::v-deep .el-form-item {
  &:nth-child(1) {
    margin-left: 0px;
  }

  margin-left: 20px;
}
</style>
