<template>
  <el-card id="qualifications-caf-plan-list">
    <el-row :gutter="20" style="margin-top: 10px;">
      <el-col :span="6">
        <span>人员姓名：</span>
        <el-input
          v-model.trim="listQuery.userName"
          placeholder="请输入人员姓名"
          size="small"
          class="operation-input"
        />
      </el-col>

      <el-col :span="6">
        <span>是否达成：</span>
        <el-select v-model="listQuery.reach" size="small" class="operation-input">
          <el-option
            v-for="option in reaches"
            :key="option.key"
            :value="option.value"
            :label="option.label"
          >
            <div class="flex">
              <span
                class="dot"
                :style="{ background: option.key !== 'all' ? '#52c41a' : '#1895ff' }"
              />
              <span>{{ option.label }}</span>
            </div>
          </el-option>
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
        <el-button size="small" style="margin-right: 10px;" @click="handleResetClick">重置</el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="tableLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px;"
      :header-cell-style="{ background: '#f6f6f6' }"
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.key"
        :label="item.title"
        :prop="item.dataIndex"
        :min-width="item.width"
        :align="item.align"
        show-overflow-tooltip
      >
        <template v-if="item.children">
          <el-table-column
            v-for="child in item.children"
            :key="child.key"
            :label="child.title"
            :prop="child.dataIndex"
            :min-width="child.width"
            show-overflow-tooltip
          />
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
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination/index'

import { doQualificationsCafPlan } from '@/services/qualifications/qualifications'

export default {
  name: 'QualificationsCafPlanList',
  components: { Pagination },
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        orderBy: null
      },
      list: [],
      total: 0,
      tableLoading: false,
      listQuery: {
        reach: '',
        userName: ''
      },
      reaches: [
        {
          label: '全部',
          key: 'all',
          value: ''
        },
        {
          label: '达成',
          key: 'true',
          value: '1'
        },
        {
          label: '未达成',
          key: 'false',
          value: '2'
        }
      ],
      tableOptions: [
        {
          title: '人员姓名',
          dataIndex: 'user_name',
          key: 'user_name',
          width: 70
        },
        {
          title: '计划',
          dataIndex: 'plan',
          key: 'plan',
          align: 'center',
          width: 390,
          children: [
            {
              title: '文档类型',
              dataIndex: 'type',
              key: 'type',
              width: 70
            },
            {
              title: '项目名称',
              dataIndex: 'project',
              key: 'project',
              width: 80
            },
            {
              title: '文档名称',
              dataIndex: 'caf_name',
              key: 'caf_name',
              width: 100
            },
            {
              title: '月份',
              dataIndex: 'res_month',
              key: 'res_month',
              width: 60
            },
            {
              title: '文档等级',
              dataIndex: 'level',
              key: 'level',
              width: 70
            }
          ]
        },
        {
          title: '实际',
          dataIndex: 'reality',
          align: 'center',
          key: 'reality',
          width: 100,
          children: [
            {
              title: '文档名称',
              dataIndex: 'ci_name',
              key: 'ci_name',
              width: 100
            },
            {
              title: '提交时间',
              dataIndex: 'time',
              key: 'time',
              width: 100
            },
            {
              title: '文档等级',
              dataIndex: 'z_level',
              key: 'z_level',
              width: 70
            },
            {
              title: '是否达成',
              dataIndex: 'is_reach',
              key: 'is_reach',
              width: 80
            }
          ]
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
      this.resetPageInfo()
      this.queryList()
    },
    handleResetClick() {
      this.resetPageInfo()
      this.listQuery = {
        reach: '',
        userName: ''
      }
      this.loadList()
    },
    resetPageInfo() {
      this.pageInfo = {
        orderBy: null,
        pageSize: 10,
        pageNum: 1
      }
    },
    handlePageUpdate(e) {
      // 1. 修改分段器配置
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit

      this.queryList()
    },
    async queryList() {
      this.tableLoading = true
      const params = {
        conditions: this.listQuery,
        ...this.pageInfo
      }
      const { data: res } = await doQualificationsCafPlan(params)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    async loadList() {
      this.tableLoading = true
      const { data: res } = await doQualificationsCafPlan(this.pageInfo)
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
#qualifications-caf-plan-list {
  margin: 20px;

  .el-col {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    span {
      font-size: 14px;
    }

    .operation-input {
      flex: 1;
      margin-right: 20px;
    }
  }
}

.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 6px;
  border-radius: 50%;
}
</style>
