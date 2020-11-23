<template>
  <el-dialog title="工作包变更" :visible.sync="dialogVisible" width="70%">
    <el-form ref="formRef" :inline="true" :model="listQuery" class="demo-form-inline">
      <el-form-item label="工作包ID" prop="workPacketId">
        <el-input
          v-model.trim="listQuery.workPacketId"
          size="small"
          placeholder="请输入工作包ID"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="工作包名称" prop="workPacketName">
        <el-input
          v-model.trim="listQuery.workPacketName"
          size="small"
          placeholder="请输入工作包名称"
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
          <el-option key="change" value="3" label="修改">
            <badge type="success" title="修改" />
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
      <el-table-column key="workPacketId" prop="workPacketId" label="工作包ID" min-width="50" />

      <el-table-column key="workPacketName" prop="workPacketName" label="工作包名称" min-width="140">
        <template slot-scope="{row}">
          <div class="flex">
            <div
              v-if="row['work_state'] === 3 && row['work_package_old'] === row['workPacketName']"
              class="flex"
            >
              <span style="olor: red; text-decoration: line-through;">{{ row['work_package_old'] }}</span>
              <span style="margin: 0 2px;">-&gt;</span>
              <span
                style="color':'blue"
                :style="{ cursor : getClickFlag(row) === false ? 'auto' : 'pointer' }"
              >{{ row['workPacketName'] }}</span>
            </div>

            <div
              v-else-if="row['work_state'] === 0"
              style="color: blue"
              :style="{ cursor : getClickFlag(row) === false ? 'auto' : 'pointer' }"
              @click="handleRowClick(row)"
            >
              {{ row['workPacketName'] }}
            </div>

            <div
              v-else-if="row['work_state'] === 1"
              class="flex"
            >
              <img :src="newIcon" title="新增" height="20" width="20">
              <span
                style="color: green; margin: 0 2px;"
                :style="{ cursor : getClickFlag(row) === false ? 'auto' : 'pointer' }"
                @click="handleRowClick(row)"
              >
                {{ row['workPacketName'] }}
              </span>
            </div>

            <div
              v-else-if="row['work_state'] === 2"
              class="flex"
            >
              <img :src="deleteIcon" title="删除" height="20" width="20">
              <span
                style="color: red; margin: 0 2px; text-decoration: line-through;"
                :style="{ cursor : getClickFlag(row) === false ? 'auto' : 'pointer' }"
              >
                {{ row['workPacketName'] }}
              </span>
            </div>

            <div v-else style="color: blue;">{{ row['workPacketName'] }}</div>

            <img v-if="getClickFlag(row)" :src="updateBlueIcon" title="文档变更" height="20" width="20">
          </div>
        </template>
      </el-table-column>

      <el-table-column key="code" prop="code" label="代码量" min-width="50">
        <template slot-scope="{row}">
          <div
            v-if="row['work_state'] === 3 && row['code_old'] !== row['code']"
          >
            <span style="color: red; text-decoration: line-through;">{{ row['code_old'] }}</span>
            <span style="margin: 0 2px;">-&gt;</span>
            <span style="color: blue;">{{ row['code'] }}</span>
          </div>
          <span v-else>{{ row['code'] }}</span>
        </template>
      </el-table-column>
      <el-table-column key="requestId" prop="requestId" label="需求ID" min-width="50" />
      <el-table-column key="requestName" prop="requestName" label="需求名称" min-width="200" />
      <el-table-column key="workCreateDate" prop="workCreateDate" label="创建时间" min-width="100" />
      <el-table-column key="workModifyDate" prop="workModifyDate" label="修改时间" min-width="100" />
      <el-table-column key="project" prop="project" label="项目名称" min-width="80" />
      <el-table-column key="work_state" prop="work_state" label="变更状态" min-width="60">
        <template slot-scope="{row}">
          <div>{{ row['work_state'] | stateFilter }}</div>
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

    <demand-change-inner-dialog ref="innerDialogRef" />
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import Badge from '@/components/Badge'

import newIcon from './img/new.png'
import deleteIcon from './img/delete.png'
import updateBlueIcon from './img/update_blue.png'
import updateGreenIcon from './img/update_green.png'

import request from '@/services/request'
import DemandChangeInnerDialog from './DemandChangeInnerDialog.vue'

export default {
  components: {
    Pagination,
    Badge,
    DemandChangeInnerDialog
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
      deleteIcon,
      updateBlueIcon,
      updateGreenIcon
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
      this.getWorkPackageChangeList(row['project_source'], row['requestId'], '', '', '')
    },
    handleRowClick(row) {
      if (!this.getClickFlag(row)) {
        return
      }

      this.$refs.innerDialogRef.setTemp(row)
      this.$refs.innerDialogRef.showDialog()
    },
    getClickFlag(row) {
      return row['state'] > 0
    },
    handlePaginationChange(e) {
      this.pageInfo.page = e.page
      this.pageInfo.limit = e.limit
    },
    handleQueryClick() {
      this.getWorkPackageChangeList(this.temp.project, this.temp.requestId, this.listQuery.workPacketId, this.listQuery.workPacketName, this.listQuery.state)
    },
    handleResetClick() {
      this.$refs.formRef.resetFields()
    },
    async getWorkPackageChangeList(project, requestId, workPacketId, workPacketName, state) {
      this.tableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryProjectWorkPacketChange', {
        params: {
          project,
          requestId,
          workPacketId,
          workPacketName,
          state
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
.flex {
  display: flex;
  align-items: center;
}
</style>
