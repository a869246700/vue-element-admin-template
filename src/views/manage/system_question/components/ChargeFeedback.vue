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
      columnsImplement: [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          width: 80
        },
        {
          title: '提交人',
          dataIndex: 'create_name',
          key: 'create_name',
          width: 80
        },
        {
          title: '提交时间',
          dataIndex: 'createTime',
          key: 'createTime',
          width: 100
        },
        {
          title: '问题类型',
          dataIndex: 'type',
          key: 'type',
          width: 100
        },
        {
          title: '问题归属',
          dataIndex: 'ascription',
          key: 'ascription',
          width: 120
        },
        {
          title: '问题现象',
          dataIndex: 'phenomenon',
          key: 'phenomenon',
          width: 120
        },
        {
          title: '问题出现条件',
          dataIndex: 'condition',
          key: 'condition',
          width: 150
        },
        {
          title: '问题概率',
          dataIndex: 'probability',
          key: 'probability',
          width: 100
        },
        {
          title: '定位开发',
          dataIndex: 'development',
          key: 'development',
          width: 120
        },
        {
          title: '规避办法',
          dataIndex: 'avoid_way',
          key: 'avoid_way',
          width: 120
        },
        {
          title: '影响域',
          dataIndex: 'system',
          key: 'system',
          width: 100
        },
        {
          title: '影响用例个数',
          dataIndex: 'case_num',
          key: 'case_num',
          width: 120
        },
        {
          title: '影响周期',
          dataIndex: 'period',
          key: 'period',
          width: 100
        },
        {
          title: 'bugid',
          dataIndex: 'bug_id',
          key: 'bug_id',
          width: 100
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
    },
    handleQueryClick() {
      const project = this.listQuery.project ? this.listQuery.project : ''
      const date = this.listQuery.date ? parseTime(this.listQuery.date, '{y}-{m}-{d}') : ''
      this.querySelectImplementProject(project, date)
    },
    handleResetClick() {
      this.listQuery = {
        project: undefined,
        date: undefined
      }

      this.queryByChargeImplementList('', '')
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
    }
  }
}
</script>
