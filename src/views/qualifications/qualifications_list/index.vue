<template>
  <el-card id="qualifications_list">
    <el-row :gutter="10">
      <el-col :span="7">
        <span>事业部：</span>
        <el-select v-model="listQuery.business" size="small" style="width: 150px;">
          <el-option
            v-for="option in business"
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
        <span>部门：</span>
        <el-input v-model.trim="listQuery.dept" size="small" style="width: 150px" />
      </el-col>
      <el-col :span="8">
        <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
        <el-button size="small" @click="handleResetClick">重置</el-button>
        <el-button
          :loading="butLoading"
          type="primary"
          icon="el-icon-download"
          size="small"
          @click="handleExportClick"
        >导出数据</el-button>
      </el-col>
    </el-row>

    <div class="total-table table">
      <el-table
        v-loading="totalTableLoading"
        :data="totalList"
        border
        highlight-current-row
        :header-cell-style="{ background: '#f6f6f6' }"
        style="width: 100%;"
      >
        <el-table-column
          v-for="item in totalTableOptions"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :min-width="item.minWidth"
        >
          <template slot-scope="{row}">
            <span
              v-if="item.prop === 'sz_num' || item.prop === 'sd_num' || item.prop === 'bd_num'"
            >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>

            <span v-else>{{ row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分段器 -->
      <div v-if="totalTotal >= totalPageInfo.pageSize" class="pagination">
        <pagination
          :total="totalTotal"
          :page="totalPageInfo.pageNum"
          :limit="totalPageInfo.pageSize"
          :auto-scroll="false"
          @pagination="handleTotalPageUpdate"
        />
      </div>
    </div>

    <div class="plan-table table">
      <el-table
        v-loading="planTableLoading"
        :data="planList"
        border
        highlight-current-row
        :header-cell-style="{ background: '#f6f6f6' }"
        style="width: 100%;"
      >
        <el-table-column
          v-for="item in planTableOptions"
          :key="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          :prop="item.prop"
          show-overflow-tooltip
        >
          <template v-if="item.children">
            <el-table-column
              v-for="child in item.children"
              :key="child.prop"
              :label="child.label"
              :prop="child.prop"
              :min-width="child.minWidth"
              show-overflow-tooltip
            >
              <template slot-scope="{row}">
                <span>{{ row[child.prop] === undefined || row[child.prop].length === 0 ? 0 : row[child.prop] }}</span>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
      </el-table>

      <div v-if="planTotal >= planPageInfo.pageSize" class="pagination">
        <pagination
          :total="planTotal"
          :page="planPageInfo.pageNum"
          :limit="planPageInfo.pageSize"
          :auto-scroll="false"
          @pagination="handlePlanPageUpdate"
        />
      </div>
    </div>

    <div class="person-table table">
      <el-table
        v-loading="personTableLoading"
        :data="personList"
        border
        highlight-current-row
        :header-cell-style="{ background: '#f6f6f6' }"
        style="width: 100%;"
      >
        <el-table-column
          v-for="item in personTableOptions"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <!-- 1. 产出bug数 -->
            <div v-if="item.prop === 'bug_num'">
              <span
                v-if="row.bug !== undefined && row.bug !== 0"
                :style="{ color: row[item.prop] >= row.bug ? '#42b983' : '#ff5777' }"
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
              <span
                v-else
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
            </div>

            <div v-else-if="item.prop === 'case_num'">
              <span
                v-if="row.case_implement !== undefined && row.case_implement !== 0"
                :style="{ color: row[item.prop] >= row.case_implement ? '#42b983' : '#ff5777' }"
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
              <span
                v-else
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
            </div>

            <div v-else-if="item.prop === 'script_num'">
              <span
                v-if="row.script !== undefined && row.script !== 0"
                :style="{ color: row[item.prop] >= row.script ? '#42b983' : '#ff5777' }"
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
              <span
                v-else
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
            </div>

            <div v-else-if="item.prop === 'one_level'">
              <span
                v-if="row.tp_level !== undefined && row.tp_level !== 0 && row.tp_level === 1"
                :style="{ color: row[item.prop] >= row.tp_level ? '#42b983' : '#ff5777' }"
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
              <span
                v-else
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
            </div>

            <div v-else-if="item.prop === 'two_level'">
              <span
                v-if="row.tp_level !== undefined && row.tp_level !== 0 && row.tp_level === 2"
                :style="{ color: row[item.prop] >= row.tp_level ? '#42b983' : '#ff5777' }"
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
              <span
                v-else
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
            </div>

            <div v-else-if="item.prop === 'stp_one_level'">
              <span
                v-if="row.stp_level !== undefined && row.stp_level !== 0 && row.stp_level === 2"
                :style="{ color: row[item.prop] >= row.stp_level ? '#42b983' : '#ff5777' }"
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
              <span
                v-else
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
            </div>

            <div v-else-if="item.prop === 'stp_two_level'">
              <span
                v-if="row.stp_level !== undefined && row.stp_level !== 0 && row.stp_level === 2"
                :style="{ color: row[item.prop] >= row.stp_level ? '#42b983' : '#ff5777' }"
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
              <span
                v-else
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
            </div>

            <div v-else-if="item.prop === 'one_score_num'">
              <span
                v-if="((row.excellent_level !== undefined && row.excellent_level !== 0 && row.excellent_level === 1) || ((row.excellent_level === undefined || row.excellent_level === 0) && (row.excellent_num !== undefined && row.excellent_num !== 0)))"
                :style="{ color: row[item.prop] >= row.excellent_num ? '#42b983' : '#ff5777' }"
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
              <span
                v-else
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
            </div>

            <div v-else-if="item.prop === 'two_score_num'">
              <span
                v-if="((row.excellent_level !== undefined && row.excellent_level !== 0 && row.excellent_level === 2) || ((row.excellent_level === undefined || row.excellent_level === 0) && (row.excellent_num !== undefined && row.excellent_num !== 0)))"
                :style="{ color: row[item.prop] >= row.excellent_num ? '#42b983' : '#ff5777' }"
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
              <span
                v-else
              >{{ row[item.prop] === undefined || row[item.prop].length === 0 ? 0 : row[item.prop] }}</span>
            </div>

            <div
              v-else-if="item.prop === 'exam_defence_rate' || item.prop === 'realm_num_rate'"
            >{{ row[item.prop] === 0 ? 0 : row[item.prop] + '%' }}</div>

            <span v-else>{{ row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div v-if="personTotal >= personPageInfo.pageSize" class="pagination">
        <pagination
          :total="personTotal"
          :page="personPageInfo.pageNum"
          :limit="personPageInfo.pageSize"
          :auto-scroll="false"
          @pagination="handlePersonPageUpdate"
        />
      </div>
    </div>
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination/index'

import {
  doQualificationsTotal,
  doQualificationsPlan,
  doQualificationsPerson
} from '@/services/qualifications/qualifications'
import DownFiles from '@/vendor/ExportExcel'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      butLoading: false,
      totalTableLoading: false,
      totalList: undefined,
      totalTotal: 0, // total 数据总数
      totalPageInfo: {
        orderBy: null,
        pageNum: 1,
        pageSize: 10
      },
      personTableLoading: false,
      personList: undefined,
      personTotal: 0, // person 数据总数
      personPageInfo: {
        orderBy: null,
        pageNum: 1,
        pageSize: 10
      },
      planTableLoading: false,
      planList: undefined,
      planTotal: 0, // plan 数据总数
      planPageInfo: {
        orderBy: null,
        pageNum: 1,
        pageSize: 10
      },
      business: [
        {
          label: '全部',
          value: '',
          key: 'all'
        },
        {
          label: 'SMB产品事业部',
          value: 'SMB产品事业部',
          key: 'smb'
        },
        {
          label: '路由器产品事业部',
          value: '路由器产品事业部',
          key: 'lu'
        },
        {
          label: '数据中心交换产品事业部',
          value: '数据中心交换产品事业部',
          key: 'wu'
        },
        {
          label: '研究院',
          value: '研究院',
          key: 'yan'
        },
        {
          label: '园区与城域网交换产品事业部',
          value: '园区与城域网交换产品事业部',
          key: 'yuan'
        },
        {
          label: '北京研发中心',
          value: '北京研发中心',
          key: 'bj'
        }
      ],
      listQuery: {
        business: '',
        dept: null
      },
      totalTableOptions: [
        {
          label: '事业部',
          prop: 'business_dep',
          minWidth: '100'
        },
        {
          label: '部门',
          prop: 'department',
          minWidth: '100'
        },
        {
          label: '总计人数',
          prop: 'all_num',
          minWidth: '80'
        },
        {
          label: '工程力人数',
          prop: 'zi_num',
          minWidth: '80'
        },
        {
          label: '今年升级计划人数',
          prop: 'sz_num',
          minWidth: '80'
        },
        {
          label: '今年升级达成人数',
          prop: 'sd_num',
          minWidth: '80'
        },
        {
          label: '今年保级达成人数',
          prop: 'bd_num',
          minWidth: '80'
        }
      ],
      personTableOptions: [
        {
          label: '事业部',
          prop: 'business_dep',
          minWidth: '100',
          fixed: 'left'
        },
        {
          label: '部门',
          prop: 'department',
          minWidth: '120',
          fixed: 'left'
        },
        {
          label: '专业组',
          prop: 'group_name',
          minWidth: '120',
          fixed: 'left'
        },
        {
          label: '人员',
          prop: 'user_name',
          minWidth: '80',
          fixed: 'left'
        },
        {
          label: '当前资质',
          prop: 'qualifications',
          minWidth: '120'
        },
        {
          label: '是否提升',
          prop: 'qualifications_plan',
          minWidth: '80'
        },
        {
          label: '计划开始时间',
          prop: 'relegation_start_date',
          minWidth: '110'
        },
        {
          label: '计划结束时间',
          prop: 'relegation_end_date',
          minWidth: '110'
        },
        {
          label: '专业域/技能域计划',
          prop: 'realm_explain',
          minWidth: '150'
        },
        {
          label: '产出计划',
          prop: 'project_produce',
          minWidth: '100'
        },
        {
          label: '产出bug数',
          prop: 'bug_num',
          minWidth: '100'
        },
        {
          label: '新增用例数',
          prop: 'case_num',
          minWidth: '100'
        },
        {
          label: '新增脚本数',
          prop: 'script_num',
          minWidth: '100'
        },
        {
          label: 'TP一级个数',
          prop: 'one_level',
          minWidth: '100'
        },
        {
          label: 'TP二级个数',
          prop: 'two_level',
          minWidth: '100'
        },
        {
          label: 'STP一级个数',
          prop: 'stp_one_level',
          minWidth: '110'
        },
        {
          label: 'STP二级个数',
          prop: 'stp_two_level',
          minWidth: '110'
        },
        {
          label: '一级优秀作品个数',
          prop: 'one_score_num',
          minWidth: '140'
        },
        {
          label: '二级优秀作品个数',
          prop: 'two_score_num',
          minWidth: '140'
        },
        {
          label: '是否达成',
          prop: 'is_reach',
          minWidth: '80'
        },
        {
          label: '产出达成率',
          prop: 'produce_rate',
          minWidth: '100'
        },
        {
          label: '专业域/技能域考试达成率',
          prop: 'exam_defence_rate',
          minWidth: '180'
        },
        {
          label: '专业域/技能域个数达成率',
          prop: 'realm_num_rate',
          minWidth: '180'
        },
        {
          label: '本周期达成时间',
          prop: 'success_date',
          minWidth: '120'
        },
        {
          label: '今年达成时间',
          prop: 'now_year_date',
          minWidth: '120'
        }
      ],
      planTableOptions: [
        {
          label: '事业部',
          prop: 'business_dep',
          minWidth: 100
        },
        {
          label: '部门',
          prop: 'department',
          minWidth: 120
        },
        {
          label: 'CAF',
          prop: 'caf',
          minWidth: 310,
          children: [
            {
              label: '本月之前累积计划总人数',
              prop: 'add_num',
              minWidth: 190
            },
            {
              label: '本月之前累积计划达成人数',
              prop: 'add_reach_num',
              minWidth: 200
            },
            {
              label: '本月计划人数',
              prop: 'now_num',
              minWidth: 120
            },
            {
              label: '本月计划达成人数',
              prop: 'now_reach_num',
              minWidth: 140
            },
            {
              label: '本周计划达成人数',
              prop: 'now_week_num',
              minWidth: 140
            }
          ]
        },
        {
          label: '资质',
          prop: 'zz',
          children: [
            {
              label: '累计达成人数',
              prop: 'q_add_num',
              minWidth: '110'
            },
            {
              label: '本月达成人数',
              prop: 'q_month_num',
              minWidth: '110'
            }
          ]
        },
        {
          label: '产出个数',
          prop: 'cc',
          children: [
            {
              label: 'bug',
              prop: 'bug_num',
              minWidth: '60'
            },
            {
              label: '用例',
              prop: 'case_num',
              minWidth: '60'
            },
            {
              label: '脚本',
              prop: 'script_num',
              minWidth: '60'
            },
            {
              label: '一级作品',
              prop: 'one_num',
              minWidth: '80'
            },
            {
              label: '二级作品',
              prop: 'two_num',
              minWidth: '80'
            },
            {
              label: '优秀作品',
              prop: 'outstanding_num',
              minWidth: '80'
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
      this.loadTotalList()
      this.loadPersonList()
      this.loadPlanList()
    },
    resetListQuery() {
      this.listQuery = {
        business: '',
        dept: null
      }
    },
    // 重置所有的 pageInfo
    resetPageInfos() {
      this.totalPageInfo.pageNum = 1
      this.totalPageInfo.pageSize = 10
      this.personPageInfo.pageNum = 1
      this.personPageInfo.pageSize = 10
      this.planPageInfo.pageNum = 1
      this.planPageInfo.pageSize = 10
    },
    // 点击查询
    handleQueryClick() {
      // 1. 恢复 page = 1
      this.resetPageInfos()

      // 2. 查询
      this.queryTotalList()
      this.queryPersonList()
      this.queryPlanList()
    },
    // 点击重置
    handleResetClick() {
      // 1. 重置 listQuery
      this.resetListQuery()

      // 2. 设置 page = 1
      this.resetPageInfos()

      // 3. 查询
      this.queryTotalList()
      this.queryPersonList()
      this.queryPlanList()
    },
    // 点击导出数据
    handleExportClick() {
      const url = '/api/export/qualificationsStatistics'
      const fileName = '资质统计.xls'
      const options = {
        orderBy: null,
        pageNum: 1,
        pageSize: 100
      }
      DownFiles(url, options, fileName, this)
    },
    handleTotalPageUpdate(e) {
      // 1. 修改分段器配置
      this.totalPageInfo.pageNum = e.page
      this.totalPageInfo.pageSize = e.limit

      // 2. 查询
      this.queryTotalList()
    },
    handlePersonPageUpdate(e) {
      // 1. 修改分段器配置
      this.totalPageInfo.pageNum = e.page
      this.totalPageInfo.pageSize = e.limit

      // 2. 查询
      this.queryPersonList()
    },
    handlePlanPageUpdate(e) {
      // 1. 修改分段器配置
      this.totalPageInfo.pageNum = e.page
      this.totalPageInfo.pageSize = e.limit

      // 2. 查询
      this.queryPlanList()
    },
    async queryTotalList() {
      this.totalTableLoading = true

      const params = {
        conditions: this.listQuery,
        ...this.totalPageInfo
      }
      const { data: res } = await doQualificationsTotal(params)
      if (res && res !== undefined) {
        this.totalList = res.list
        this.totalTotal = res.total
      } else {
        this.totalList = []
        this.totalTotal = 0
      }

      this.$nextTick(() => {
        this.totalTableLoading = false
      })
    },
    async loadTotalList() {
      this.totalTableLoading = true
      const { data: res } = await doQualificationsTotal(this.totalPageInfo)
      if (res && res !== undefined) {
        this.totalList = res.list
        this.totalTotal = res.total
      } else {
        this.totalList = []
        this.totalTotal = 0
      }

      this.$nextTick(() => {
        this.totalTableLoading = false
      })
    },
    async queryPersonList() {
      this.personTableLoading = true

      const params = {
        conditions: this.listQuery,
        ...this.personPageInfo
      }
      const { data: res } = await doQualificationsPerson(params)
      if (res && res !== undefined) {
        this.personList = res.list
        this.personTotal = res.total
      } else {
        this.personList = []
        this.personTotal = 0
      }

      this.$nextTick(() => {
        this.personTableLoading = false
      })
    },
    async loadPersonList() {
      this.personTableLoading = true

      const { data: res } = await doQualificationsPerson(this.personPageInfo)
      if (res && res !== undefined) {
        this.personList = res.list
        this.personTotal = res.total
      } else {
        this.personList = []
        this.personTotal = 0
      }

      this.$nextTick(() => {
        this.personTableLoading = false
      })
    },
    async queryPlanList() {
      this.planTableLoading = true

      const params = {
        conditions: this.listQuery,
        ...this.planPageInfo
      }
      const { data: res } = await doQualificationsPlan(params)
      if (res && res !== undefined) {
        this.planList = res.list
        this.planTotal = res.total
      } else {
        this.planList = []
        this.planTotal = 0
      }

      this.$nextTick(() => {
        this.planTableLoading = false
      })
    },
    async loadPlanList() {
      this.planTableLoading = true

      const { data: res } = await doQualificationsPlan(this.planPageInfo)
      if (res && res !== undefined) {
        console.log(res.list)
        this.planList = res.list
        this.planTotal = res.total
      } else {
        this.planList = []
        this.planTotal = 0
      }

      this.$nextTick(() => {
        this.planTableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  margin-top: 40px;
}

.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 6px;
  border-radius: 50%;
}
</style>
