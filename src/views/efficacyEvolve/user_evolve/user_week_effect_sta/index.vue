<template>
  <el-card id="user-week-effect-sta">
    <el-row :gutter="20">
      <el-col :span="6">
        <span>项目名称：</span>
        <el-select v-model="project" size="small" style="width: 150px;">
          <el-option
            v-for="(item, index) in projectSelectList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
        <el-button size="small" @click="handleResetClick">重置</el-button>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px;">
      <div slot="header" class="header">
        <el-popover placement="right-start" trigger="click">
          <div>
            <p>缺陷率基准值：</p>
            <p>bug总目标=控制面*2.3</p>
            <p>bug总目标=数据面*4</p>
            <p>遗留bug率目标：bug总目标*0.3</p>
            <br>
            <p>效率基准值：</p>
            <p>手工：控制面：5/D，数据面8/D</p>
            <p>自动化：本地：100/D，工厂（丁忠健部分）200/D</p>
          </div>
          <el-button
            slot="reference"
            size="mini"
            style="font-size: 20px;"
            icon="el-icon-bell"
            circle
          />
        </el-popover>

        <el-popover placement="right-start" trigger="click">
          <div style="display: flex; flex-direction: column;">
            <el-checkbox
              v-for="(item, index) in tableOptions"
              :key="index"
              v-model="item.hide"
              :label="item.title"
              style="margin: 1px;"
              @change="handleCheckChange(item, index)"
            />
          </div>
          <el-button
            slot="reference"
            size="mini"
            style="font-size: 20px;"
            icon="el-icon-set-up"
            circle
          />
        </el-popover>
      </div>

      <el-table
        v-loading="tableLoading"
        :data="showList"
        highlight-current-row
        border
        :header-cell-style="{ background: '#F5F7FA' }"
        style="width: 100%;"
      >
        <el-table-column
          v-for="item in columns"
          :key="item.dataIndex"
          :label="item.title"
          :prop="item.key"
          :min-width="item.width"
          :fixed="item.fixed"
          :align="item.children ? 'center' : ''"
          :show-overflow-tooltip="item.sot"
        >
          <template slot-scope="{row}">
            <div
              v-if="item.dataIndex === 'bug_all_num'"
              :class="row[item.dataIndex] >= row.defect_target ? '' : 'table-td-bg-red'"
            >{{ row[item.dataIndex] }}</div>

            <div
              v-else-if="item.dataIndex === 'y_bug_num'"
              :class="row[item.dataIndex] >= row.leave_over_target ? '' : 'table-td-bg-red'"
            >{{ row[item.dataIndex] }}</div>

            <div v-else>{{ row[item.dataIndex] }}</div>
          </template>

          <template v-if="item.children">
            <el-table-column
              v-for="child in item.children"
              :key="child.dataIndex"
              :label="child.title"
              :prop="child.key"
              :min-width="child.width"
              :fixed="child.fixed"
              :show-overflow-tooltip="child.sot"
            >
              <template slot-scope="{row}">
                <div
                  v-if="child.dataIndex === 'bug_num_0'"
                  :class="row.total_time_0 === 0 ? '' : row.total_time_0 > 0 && row.total_time_0 < 4 ? 'table-td-bg-red' : 'table-td-bg-green'"
                >{{ row[child.dataIndex] + "|" + row.case_num_0 + "|" + row.case_pass_num_0 + "|" + row.duration_0 }}</div>

                <div
                  v-else-if="child.dataIndex === 'bug_num_1'"
                  :class="row.total_time_1 === 0 ? '' : row.total_time_1 > 0 && row.total_time_1 < 4 ? 'table-td-bg-red' : 'table-td-bg-green'"
                >{{ row[child.dataIndex] + "|" + row.case_num_1 + "|" + row.case_pass_num_1 + "|" + row.duration_1 }}</div>

                <div
                  v-else-if="child.dataIndex === 'bug_num_2'"
                  :class="row.total_time_2 === 0 ? '' : row.total_time_2 > 0 && row.total_time_2 < 4 ? 'table-td-bg-red' : 'table-td-bg-green'"
                >{{ row[child.dataIndex] + "|" + row.case_num_2 + "|" + row.case_pass_num_2 + "|" + row.duration_2 }}</div>

                <div
                  v-else-if="child.dataIndex === 'bug_num_3'"
                  :class="row.total_time_3 === 0 ? '' : row.total_time_3 > 0 && row.total_time_3 < 4 ? 'table-td-bg-red' : 'table-td-bg-green'"
                >{{ row[child.dataIndex] + "|" + row.case_num_3 + "|" + row.case_pass_num_3 + "|" + row.duration_3 }}</div>

                <div
                  v-else-if="child.dataIndex === 'bug_num_4'"
                  :class="row.total_time_4 === 0 ? '' : row.total_time_4 > 0 && row.total_time_4 < 4 ? 'table-td-bg-red' : 'table-td-bg-green'"
                >{{ row[child.dataIndex] + "|" + row.case_num_4 + "|" + row.case_pass_num_4 + "|" + row.duration_4 }}</div>

                <div
                  v-else-if="child.dataIndex === 'bug_num_5'"
                  :class="row.total_time_5 === 0 ? '' : row.total_time_5 > 0 && row.total_time_5 < 4 ? 'table-td-bg-red' : 'table-td-bg-green'"
                >{{ row[child.dataIndex] + "|" + row.case_num_5 + "|" + row.case_pass_num_5 + "|" + row.duration_5 }}</div>

                <div
                  v-else-if="child.dataIndex === 'bug_num_6'"
                  :class="row.total_time_6 === 0 ? '' : row.total_time_6 > 0 && row.total_time_6 < 4 ? 'table-td-bg-red' : 'table-td-bg-green'"
                >{{ row[child.dataIndex] + "|" + row.case_num_6 + "|" + row.case_pass_num_6 + "|" + row.duration_6 }}</div>

                <div
                  v-else-if="child.dataIndex === 'week_sta'"
                  :class="calcTotal(row) === 0 ? '' : calcTotal(row) > 0 && calcTotal(row) < (4 * 5) ? 'table-td-bg-red' : 'table-td-bg-green'"
                >{{ calcBugNum(row) + "|" + row.week_all_num + "|" + row.week_pass_num + "|" + calcDuration(row) }}</div>

                <div
                  v-else-if="child.dataIndex === 'total_sta'"
                >{{ row.bug_all_num + "|" + row.case_all + "|" + row.pass_all + "|" + row.duration_all }}</div>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div v-if="total > pageInfo.pageSize" class="pagination">
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

import request from '@/services/request'

export default {
  name: 'UserWeekEffectSta',
  components: {
    Pagination
  },
  data() {
    return {
      project: '12.4PL1',
      tableLoading: false,
      total: 0,
      list: [],
      pageInfo: {
        orderBy: null,
        pageNum: 1,
        pageSize: 10
      },
      columns: [],
      latelySevenDay: [],
      projectSelectList: [
        {
          label: '12.4PL1',
          value: '12.4PL1'
        }
      ],
      tableOptions: [
        {
          title: '域',
          hide: false,
          dataIndex: 'realm',
          key: 'realm',
          width: 100
        },
        {
          title: 'PTTL',
          hide: false,
          dataIndex: 'pttl',
          key: 'pttl',
          width: 80
        },
        {
          title: '执行人员',
          hide: true,
          dataIndex: 'user_name',
          key: 'user_name'
        },
        {
          title: '负责代码量',
          hide: true,
          dataIndex: 'code',
          key: 'code',
          width: 100
        },
        {
          title: '任务目标',
          hide: true,
          dataIndex: 'assignment',
          key: 'assignment',
          width: 80
        },
        {
          title: '总数',
          hide: true,
          dataIndex: 'case_total',
          key: 'case_total',
          width: 70
        },
        {
          title: '手工',
          hide: true,
          dataIndex: 'case_handwork',
          key: 'case_handwork',
          width: 70
        },
        {
          title: '自动化',
          hide: true,
          dataIndex: 'case_auto',
          key: 'case_auto',
          width: 70
        },
        {
          title: '预计工作量(D)',
          hide: true,
          dataIndex: 'workload',
          key: 'workload',
          width: 118
        },
        {
          title: '缺陷目标',
          hide: true,
          dataIndex: 'defect_target',
          key: 'defect_target',
          width: 80
        },
        {
          title: '遗留目标',
          hide: true,
          dataIndex: 'leave_over_target',
          key: 'leave_over_target',
          width: 80
        },
        {
          title: '缺陷达成',
          hide: true,
          dataIndex: 'bug_all_num',
          key: 'bug_all_num',
          width: 80
        },
        {
          title: '遗留达成',
          hide: true,
          dataIndex: 'y_bug_num',
          key: 'y_bug_num',
          width: 80
        },
        {
          title: '工作包内的bug',
          hide: true,
          dataIndex: 'c_z_num',
          key: 'c_z_num',
          width: 120
        },
        {
          title: '遗漏bug',
          hide: true,
          dataIndex: 'c_y_num',
          key: 'c_y_num',
          width: 80
        },
        {
          title: '未CBTbug数',
          hide: true,
          dataIndex: 'no_cbt_num',
          key: 'no_cbt_num',
          width: 110
        },
        {
          title: '启动时间',
          hide: false,
          dataIndex: 'start_date',
          key: 'start_date',
          width: 120
        },
        {
          title: '完成目标时间',
          hide: false,
          dataIndex: 'end_date',
          key: 'end_date',
          width: 120
        },
        {
          title: 'bug数 | 用例总数 | 用例PASS数 | bug定位时长',
          hide: true,
          dataIndex: 'title',
          key: 'title',
          children: [
            {
              dataIndex: 'bug_num_0',
              key: 'bug_num_0',
              width: 110
            },
            {
              dataIndex: 'bug_num_1',
              key: 'bug_num_1',
              width: 110
            },
            {
              dataIndex: 'bug_num_2',
              key: 'bug_num_2',
              width: 110
            },
            {
              dataIndex: 'bug_num_3',
              key: 'bug_num_3',
              width: 110
            },
            {
              dataIndex: 'bug_num_4',
              key: 'bug_num_4',
              width: 110
            },
            {
              dataIndex: 'bug_num_5',
              key: 'bug_num_5',
              width: 110
            },
            {
              dataIndex: 'bug_num_6',
              key: 'bug_num_6',
              width: 110
            },
            {
              title: '本周统计',
              dataIndex: 'week_sta',
              key: 'week_sta',
              width: 110
            },
            {
              title: '总计',
              dataIndex: 'total_sta',
              key: 'total_sta',
              width: 110
            }
          ]
        }
      ]
    }
  },
  computed: {
    showList() {
      const page = this.pageInfo.pageNum
      const limit = this.pageInfo.pageSize
      return this.list.slice((page - 1) * limit, page * limit)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.queryLatelySevenDay()
      this.queryTableData('12.4PL1')
    },
    calcBugNum(record) {
      return (
        record.bug_num_0 +
        record.bug_num_1 +
        record.bug_num_2 +
        record.bug_num_3 +
        record.bug_num_4 +
        record.bug_num_5 +
        record.bug_num_6
      )
    },
    calcDuration(record) {
      return (
        record.duration_0 +
        record.duration_1 +
        record.duration_2 +
        record.duration_3 +
        record.duration_4 +
        record.duration_5 +
        record.duration_6
      )
    },
    calcTotal(record) {
      return (
        record.total_time_0 +
        record.total_time_1 +
        record.total_time_2 +
        record.total_time_3 +
        record.total_time_4 +
        record.total_time_5 +
        record.total_time_6
      )
    },
    handlePageUpdate(e) {
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit
    },
    handleCheckChange(item, index) {
      console.log(item)
      const target = {
        ...item,
        value: index
      }
      this.inspectColumn(target)
    },
    handleQueryClick() {
      this.queryTableData(this.project)
      this.queryLatelySevenDay()
    },
    handleResetClick() {
      this.project = '12.4PL1'
      this.init()
    },
    inspectColumn(target) {
      const latelySevenDay = this.latelySevenDay
      for (let i = 0; i < latelySevenDay.length; i++) {
        this.tableOptions[this.tableOptions.length - 1].children[i].title = latelySevenDay[i]
      }

      if (target !== undefined) {
        this.tableOptions[target.value].hide = target.hide
      }

      const column = []
      for (let i = 0; i < this.tableOptions.length; i++) {
        if (this.tableOptions[i].hide) {
          column.push(this.tableOptions[i])
        }
      }
      this.columns = column
    },
    async queryLatelySevenDay() {
      const { data: res } = await request('/api/dateWorkingData/queryByLastWeek')
      this.latelySevenDay = res
      this.inspectColumn()
    },
    async queryTableData(project) {
      this.tableLoading = true
      const { data: res } = await request('/api/resource/listUserWeekEffectSta', {
        params: {
          project
        }
      })
      this.list = res
      this.total = res.length

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#user-week-effect-sta {
  margin: 20px;
  font-size: 14px;

  >>> .el-card__body {
    padding: 0 !important;
  }

  .el-row .el-col {
    display: flex;
    align-items: center;

    span {
      // 不换行
      white-space: nowrap;
      margin-right: 8px;
    }
  }

  .table-td-bg-red {
    color: #000;
    font-weight: bold;
    background-color: #f00;
  }

  .table-td-bg-green {
    color: #000;
    font-weight: bold;
    background: #0f0;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
