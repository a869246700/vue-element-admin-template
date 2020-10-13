<template>
  <div class="charge-implement">
    <!-- 搜索栏 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <span>项目名称：</span>
        <el-select v-model="listQuery.project" size="small" style="width: 150px">
          <el-option label="全部" value />
          <el-option
            v-for="(item, index) in selectImplementList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="6">
        <span>日期：</span>
        <el-date-picker
          v-model="listQuery.date"
          type="date"
          placeholder="选择日期"
          size="small"
          style="width: 200px"
        />
      </el-col>
      <el-col :span="8">
        <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
        <el-button size="small" @click="handleResetClick">重置</el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="chargeImplementTableLoading"
      :data="chargeImplementList"
      border
      highlight-current-row
      :header-cell-style="{ background: '#f6f6f6' }"
      style="margin-top: 20px"
    >
      <el-table-column
        v-for="item in columnsImplement"
        :key="item.key"
        :label="item.title"
        :prop="item.dataIndex"
        :min-width="item.width"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <div v-if="item.prop === 'action'">
            <el-button
              type="primary"
              size="small"
              @click="implementUpdateVisible(row, '执行进展偏低')"
            >
              {{ row.c_id === undefined ? '反馈' : '修改反馈' }}
            </el-button>
          </div>
          <div v-else-if="item.prop === 'exe_rate' || item.prop === 'pass_rate'">
            {{ Math.round(row[item.prop] * 100) + '%' }}
          </div>
          <div v-else-if="item.prop === 'is_close'">
            {{ row[item.prop] === 1 || row.feedback_close === 1 ? '是' : '否' }}
          </div>
          <div v-else>{{ row[item.prop] }}</div>
        </template>
      </el-table-column>
    </el-table>

    <el-table
      v-loading="chargeImplementAnalysisTableLoading"
      :data="chargeImplementAnalysisList"
      border
      highlight-current-row
      :header-cell-style="{ background: '#f6f6f6' }"
      style="margin-top: 20px"
    >
      <el-table-column
        v-for="item in columnsImplementAnalysis"
        :key="item.key"
        :label="item.title"
        :prop="item.dataIndex"
        :min-width="item.width"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <div v-if="item.prop === 'action'">
            <el-button
              type="primary"
              size="small"
              @click="implementUpdateVisible(row, '分析进展偏低')"
            >
              {{ row.c_id === undefined ? '反馈' : '修改反馈' }}
            </el-button>
          </div>
          <div v-else-if="item.prop === 'analysis_rate'">
            {{ Math.round(row[item.prop] * 100) + '%' }}
          </div>
          <div v-else-if="item.prop === 'is_close'">
            {{ row[item.prop] === 1 || row.feedback_close === 1 ? '是' : '否' }}
          </div>
          <div v-else>{{ row[item.prop] }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from '@/services/request'
import { parseTime } from '@/utils'

export default {
  data() {
    return {
      cName: '',
      isBisBlockHidden: '',
      isBlockShow: '',
      delayIsRequired: '',
      listQuery: {
        project: undefined,
        date: undefined
      },
      selectImplementList: [],
      chargeImplementList: [],
      chargeImplementTableLoading: false,
      chargeImplementAnalysisList: [],
      chargeImplementAnalysisTableLoading: false,
      columnsImplement: [
        {
          title: '日期',
          dataIndex: 'date',
          key: 'date',
          width: 120
        },
        {
          title: '负责人',
          dataIndex: 'charge',
          key: 'charge',
          width: 80
        },
        {
          title: '项目',
          dataIndex: 'project',
          key: 'project',
          width: 120
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          width: 80
        },
        {
          title: '阶段',
          dataIndex: 'stage',
          key: 'stage',
          width: 80
        },
        {
          title: '子系统',
          dataIndex: 'system',
          key: 'system',
          width: 80
        },
        {
          title: '用例总数',
          dataIndex: 'all_num',
          key: 'all_num',
          width: 100
        },
        {
          title: '今日执行数',
          dataIndex: 'today_num',
          key: 'today_num',
          width: 100
        },
        {
          title: '累计执行数',
          dataIndex: 'today_exe_num',
          key: 'today_exe_num',
          width: 110
        },
        {
          title: 'pass数',
          dataIndex: 'pass_num',
          key: 'pass_num',
          width: 80
        },
        {
          title: 'fail数',
          dataIndex: 'fail_num',
          key: 'fail_num',
          width: 80
        },
        {
          title: '执行率',
          dataIndex: 'exe_rate',
          key: 'exe_rate',
          width: 80
        },
        {
          title: 'pass率',
          dataIndex: 'pass_rate',
          key: 'pass_rate',
          width: 80
        },
        {
          title: '是否闭环',
          dataIndex: 'is_close',
          key: 'is_close',
          width: 80
        },
        {
          title: '操作',
          key: 'action',
          width: 80
        }
      ],
      columnsImplementAnalysis: [
        {
          title: '日期',
          dataIndex: 'date',
          key: 'date',
          width: 120
        },
        {
          title: '负责人',
          dataIndex: 'charge',
          key: 'charge',
          width: 80
        },
        {
          title: '项目',
          dataIndex: 'project',
          key: 'project',
          width: 120
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          width: 80
        },
        {
          title: '阶段',
          dataIndex: 'stage',
          key: 'stage',
          width: 80
        },
        {
          title: '子系统',
          dataIndex: 'system',
          key: 'system',
          width: 80
        },
        {
          title: '用例需要分析总数',
          dataIndex: 'all_num',
          key: 'all_num',
          width: 140
        },
        {
          title: '今日分析数',
          dataIndex: 'today_num',
          key: 'today_num',
          width: 100
        },
        {
          title: '累计分析数',
          dataIndex: 'today_exe_num',
          key: 'today_exe_num',
          width: 100
        },
        {
          title: '未分析数',
          dataIndex: 'no_analysis_num',
          key: 'no_analysis_num',
          width: 100
        },
        {
          title: '分析率',
          dataIndex: 'analysis_rate',
          key: 'analysis_rate',
          width: 100
        },
        {
          title: '是否闭环',
          dataIndex: 'is_close',
          key: 'is_close',
          width: 100
        },
        {
          title: '操作',
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
      this.querySelectImplementProject()
      this.queryByChargeImplementList('', '')
      this.queryByChargeImplementAnalysisList('', '')
    },
    handleQueryClick() {
      const project = this.listQuery.project ? this.listQuery.project : ''
      const date = this.listQuery.date ? parseTime(this.listQuery.date, '{y}-{m}-{d}') : ''
      this.querySelectImplementProject(project, date)
      this.queryByChargeImplementAnalysisList(project, date)
    },
    handleResetClick() {
      this.listQuery = {
        project: undefined,
        date: undefined
      }

      this.queryByChargeImplementList('', '')
      this.queryByChargeImplementAnalysisList('', '')
    },
    implementUpdateVisible(record, name) {
      if (record.c_id !== undefined) {
        this.queryByChargeImplementInfo(record.c_id)
      } else {
        this.isBlockOnChange('否')
        this.isRiskOnChange('否')
      }
    },
    isBlockOnChange(value) {
      this.isBlockHidden = value === '否' ? 'none' : false
      this.isBlockShow = value === '否' ? false : 'none'
    },
    isRiskOnChange(value) {
      this.delayIsRequired = value !== '否'
    },
    async queryByChargeImplementInfo(id) {
      const { data: res } = await request('/api/chargeFeedback/queryByChargeFeedback', {
        params: {
          id
        }
      })
      console.log(res)
      this.isBlockOnChange(res.isBlock)
      this.isRiskOnChange(res.isRisk)
    },
    async querySelectImplementProject() {
      const { data: res } = await request('/api/chargeFeedback/queryByProject')
      this.selectImplementList = res
    },
    async queryByChargeImplementList(project, date) {
      this.chargeImplementTableLoading = true
      const { data: res } = await request('/api/chargeFeedback/queryByChargeImplementList', {
        params: {
          project,
          date
        }
      })
      this.chargeImplementList = res

      this.$nextTick(() => {
        this.chargeImplementTableLoading = false
      })
    },
    async queryByChargeImplementAnalysisList(project, date) {
      this.chargeImplementAnalysisTableLoading = true
      const { data: res } = await request(
        '/api/chargeFeedback/queryByChargeImplementAnalysisList',
        {
          params: {
            project,
            date
          }
        }
      )
      this.chargeImplementAnalysisList = res

      this.$nextTick(() => {
        this.chargeImplementAnalysisTableLoading = false
      })
    }
  }
}
</script>

<style>
</style>
