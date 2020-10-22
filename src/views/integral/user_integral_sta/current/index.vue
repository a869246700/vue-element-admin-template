<template>
  <div class="user-integral-sta-current">
    <div class="operation-bar">
      <div class="first-row">
        <el-button
          :loading="butLoading"
          type="primary"
          size="small"
          @click="handleClick"
        >导出积分统计列表</el-button>

        <el-button
          :loading="butLoading"
          type="primary"
          size="small"
          @click="handleClick"
        >导出项目管理明细列表</el-button>

        <el-button
          :loading="butLoading"
          type="primary"
          size="small"
          @click="handleClick"
        >导出项目明细列表</el-button>

        <el-button
          :loading="butLoading"
          type="primary"
          size="small"
          @click="handleClick"
        >导出维护入围明细列表</el-button>

        <el-button
          :loading="butLoading"
          type="primary"
          size="small"
          @click="handleClick"
        >导出技术分和满足度明细列表</el-button>
      </div>

      <el-form :inline="true" :model="listQuery" class="second-row">
        <el-form-item label="部门" class="search-item">
          <el-select v-model="listQuery.department" size="small">
            <el-option v-for="item in deptOptions" :key="item.key" :value="item.value">
              <div class="select-context">
                <span
                  class="dot"
                  :style="{ background: item.key !== 'all' ? '#52c41a' : '#1895ff' }"
                />
                <span>{{ item.text }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="专业组" class="search-item">
          <el-input v-model="listQuery.groupName" size="small" placeholder="请输入专业组" />
        </el-form-item>

        <el-form-item label="人员" class="search-item">
          <el-input v-model="listQuery.userName" size="small" placeholder="请输入人员名称" />
        </el-form-item>

        <el-form-item label="岗位" class="search-item">
          <el-select v-model="listQuery.positionType" size="small">
            <el-option v-for="item in positionOptions" :key="item.key" :value="item.value">
              <div class="select-context">
                <span
                  class="dot"
                  :style="{ background: item.key !== 'all' ? '#52c41a' : '#1895ff' }"
                />
                <span>{{ item.text }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleQueryClick">查询</el-button>
          <el-button type="primary" @click="handleResetClick">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table-content">
      <el-table
        v-loading="tableLoading"
        :data="tableList"
        border
        :header-cell-style="{ background: '#f6f6f6' }"
        style="margin-top: 20px"
      >
        <el-table-column
          v-for="item in tableOptions"
          :key="item.key"
          :label="item.title"
          :min-width="item.width"
          :prop="item.dataIndex"
          :fixed="item.fixed"
          :sortable="item.sortable"
          :align="item.children ? 'center' : ''"
          show-overflow-tooltip
        >
          <template v-if="item.children">
            <el-table-column
              v-for="child1 in item.children"
              :key="child1.key"
              :label="child1.title"
              :min-width="child1.width"
              :prop="child1.dataIndex"
              :fixed="child1.fixed"
              :sortable="child1.sortable"
              :align="child1.children ? 'center' : ''"
              show-overflow-tooltip
            >
              <template v-if="child1.children">
                <el-table-column
                  v-for="child2 in child1.children"
                  :key="child2.key"
                  :label="child2.title"
                  :min-width="child2.width"
                  :prop="child2.dataIndex"
                  :fixed="child2.fixed"
                  :sortable="child2.sortable"
                  show-overflow-tooltip
                >
                  <template slot-scope="{ row }">
                    <span>{{ Math.round(row[child2.dataIndex] * 100) / 100 }}</span>
                  </template>
                </el-table-column>
              </template>

              <template slot-scope="{ row }">.
                <span>{{ Math.round(row[child1.dataIndex] * 100) / 100 }}</span>
              </template>
            </el-table-column>
          </template>

          <template slot-scope="{ row }">
            <span
              v-if="item.dataIndex === 'total_score'"
              class="total-score"
              @click="handleTotalScoreClick(row)"
            >{{ Math.round(row[item.dataIndex] * 100) / 100 }}</span>
            <span
              v-else-if="
                item.dataIndex === 'base_score' ||
                  item.dataIndex === 'innovate_score' ||
                  item.dataIndex === 'contribution_score'
              "
            >
              {{ Math.round(row[item.dataIndex] * 100) / 100 }}
            </span>
            <span v-else>{{ row[item.dataIndex] }}</span>
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
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'

import request from '@/services/request'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      butLoading: false,
      listQuery: {},
      pageInfo: {
        pageSize: 10,
        pageNum: 1
      },
      tableLoading: false,
      list: [],
      tableOptions: [
        {
          title: '员工编号',
          dataIndex: 'code',
          key: 'code',
          windth: 80,
          fixed: 'left'
        },
        {
          title: '员工姓名',
          dataIndex: 'user_name',
          key: 'user_name',
          width: 80,
          fixed: 'left'
        },
        {
          title: '部门',
          dataIndex: 'department',
          key: 'department',
          width: 100
        },
        {
          title: '专业组',
          dataIndex: 'group_name',
          key: 'group_name',
          width: 140
        },
        {
          title: '职位名称',
          dataIndex: 'position',
          key: 'position',
          width: 100
        },
        // {
        //   title: '工作平台',
        //   dataIndex: 'platform',
        //   key: 'platform',
        //   width: 50
        // },
        // {
        //   title: '编制类型',
        //   dataIndex: 'org_type',
        //   key: 'org_type',
        //   width: 50
        // },
        // {
        //   title: '员工类别',
        //   dataIndex: 'user_type',
        //   key: 'user_type',
        //   width: 50
        // },
        {
          title: '直接上级领导',
          dataIndex: 'leader_name',
          key: 'leader_name',
          width: 120
        },
        {
          title: '经理分管',
          dataIndex: 'manage_name',
          key: 'manage_name',
          width: 140
        },
        {
          title: '岗位',
          dataIndex: 'position_type',
          key: 'position_type',
          width: 100
        },
        {
          title: '岗位分类',
          dataIndex: 'position_info',
          key: 'position_info',
          width: 100
        },
        {
          title: '总分',
          dataIndex: 'total_score',
          key: 'total_score',
          width: 80,
          sortable: true
        },
        {
          title: '基础分',
          dataIndex: 'base_score',
          key: 'base_score',
          width: 80
        },
        {
          title: '创新分',
          dataIndex: 'innovate_score',
          key: 'innovate_score',
          width: 80
        },
        {
          title: '组织贡献分',
          dataIndex: 'contribution_score',
          key: 'contribution_score',
          width: 100
        },
        {
          title: '额外加减分',
          dataIndex: 'extra_score',
          key: 'extra_score',
          width: 100
        },
        {
          title: '绩效分',
          dataIndex: 'achievements_score',
          key: 'achievements_score',
          children: [
            {
              title: '项目分',
              dataIndex: 'project_score',
              key: 'project_score',
              width: 80
            },
            {
              title: '项目管理分',
              dataIndex: 'project_manage_score',
              key: 'project_manage_score',
              width: 100
            },
            {
              title: '系统支撑分',
              dataIndex: 'brace_score',
              key: 'brace_score',
              width: 100
            },
            {
              title: '维护入围分',
              dataIndex: 'maintain_score',
              key: 'maintain_score',
              width: 100,
              children: [
                {
                  title: '维护/故障分',
                  dataIndex: 'maintain_fault_score',
                  key: 'maintain_fault_score',
                  width: 120
                },
                {
                  title: '蓝军分',
                  dataIndex: 'maintain_blue_score',
                  key: 'maintain_blue_score',
                  width: 80
                },
                {
                  title: '入围分',
                  dataIndex: 'maintain_select_score',
                  key: 'maintain_select_score',
                  width: 80
                }
              ]
            },
            {
              title: '技术分',
              dataIndex: 'direct_score',
              key: 'direct_score',
              children: [
                {
                  title: '直属技术分',
                  dataIndex: 'direct_user_score',
                  key: 'direct_user_score',
                  width: 100
                },
                {
                  title: '分管技术分',
                  dataIndex: 'manage_user_score',
                  key: 'manage_user_score',
                  width: 100
                }
              ]
            },
            {
              title: '人员满足度',
              dataIndex: 'user_rate',
              key: 'user_rate',
              children: [
                {
                  title: '直属满足度',
                  dataIndex: 'directly_rate',
                  key: 'directly_rate',
                  width: 100
                },
                {
                  title: '分属满足度',
                  dataIndex: 'manage_rate',
                  key: 'manage_rate',
                  width: 100
                }
              ]
            }
          ]
        }
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   key: 'action',
        //   fixed: 'right'
        // }
      ],
      deptOptions: [
        {
          value: '',
          key: 'all',
          text: '全部'
        },
        {
          value: '平台测试一部',
          key: 'one',
          text: '平测一部'
        },
        {
          value: '平台测试二部',
          key: 'two',
          text: '平测二部'
        },
        {
          value: '平台测试三部',
          key: 'three',
          text: '平测三部'
        },
        {
          value: '平台测试四部',
          key: 'four',
          text: '平测四部'
        }
      ],
      positionOptions: [
        {
          value: '',
          key: 'all',
          text: '全部'
        },
        {
          value: '工程岗',
          key: 'one',
          text: '工程岗'
        },
        {
          value: '支撑岗',
          key: 'two',
          text: '支撑岗'
        },
        {
          value: '管理岗',
          key: 'three',
          text: '管理岗'
        },
        {
          value: '维护入围',
          key: 'four',
          text: '维护入围'
        },
        {
          value: '项目管理',
          key: 'five',
          text: '项目管理'
        }
      ]
    }
  },
  computed: {
    tableList() {
      const limit = this.pageInfo.pageSize
      const current = this.pageInfo.pageNum
      return this.list.slice((current - 1) * limit, current * limit)
    },
    total() {
      return this.list.length
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loadList()
    },
    resetPageInfo() {
      this.pageInfo = {
        pageSize: 10,
        pageNum: 1
      }
    },
    // 点击总分
    handleTotalScoreClick(record) {
      console.log(record)
    },
    handleClick() {
      this.butLoading = true

      const timer = setTimeout(() => {
        this.$nextTick(() => {
          this.butLoading = false
        })
        clearTimeout(timer)
      }, 3000)
    },
    handleQueryClick() {
      this.resetPageInfo()
      this.loadList()
    },
    handleResetClick() {
      this.listQuery = {}
      this.loadList()
      this.resetPageInfo()
    },
    handlePageUpdate(e) {
      this.pageInfo.pageSize = e.limit
      this.pageInfo.pageNum = e.page
    },
    async loadList() {
      this.tableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByIntegralScoreSta', {
        params: {
          ...this.listQuery
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
.user-integral-sta-current {
  .operation-bar {
    .first-row {
      display: flex;
      justify-content: flex-end;
      padding-bottom: 15px;
      border-bottom: 1px solid #ccc;
    }

    .second-row {
      padding-top: 15px;

      .search-item {
        margin-left: 30px;

        &:nth-child(1) {
          margin-left: 0;
        }
      }
    }
  }

  .total-score {
    color: #1890ff;
    cursor: pointer;
  }
}

.select-context {
  display: flex;
  align-items: center;

  .dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    margin-right: 6px;
    border-radius: 50%;
  }
}
</style>
