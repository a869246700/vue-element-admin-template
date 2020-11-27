<template>
  <!-- 问题&风险 -->
  <div class="issue-risk">
    <!-- 通知栏 -->
    <div class="notify-bar">
      <div>
        <el-tag type="info">项目风险项共计 10项, 其中HIGH 6项, MIDDLE 3项, LOW 1项</el-tag>
      </div>
      <div>
        <el-tag type="danger" style="margin-right: 20px">其中HIGH 风险中, 已闭环50%(3项), 还有3项未闭环</el-tag>
        <el-tag type="success">MEDIUM 风险中, 已闭环66%(2项), 还有1项未闭环, 需相关责任人继续推进</el-tag>
      </div>
    </div>

    <!-- 表格-阶段值切换栏 -->
    <div class="stage-change">
      <el-radio-group v-model="currentStage" @change="handleStageChange">
        <el-radio-button v-for="item in stageList" :key="item.index_num" :label="item.stage_name">
          {{ item.stage_name }}
        </el-radio-button>
      </el-radio-group>
    </div>

    <!-- 中间的表格区域 -->
    <div class="table">
      <risk-table
        :table-data="tableData"
        :user-list="userList"
        @change-top="handleRiskTopChange"
        @change-closed="handleRiskClosedloopChange"
        @create="handleRiskCreate"
        @update="handleRiskUpdate"
        @delete="handleRiskDelete"
      />
    </div>

    <!-- charts区域 -->
    <div class="charts">
      <risk-chart ref="riskChartRef" />
    </div>
  </div>
</template>

<script>
import RiskTable from './components/RiskTable'
import RiskChart from './components/RiskChart'

import request from '@/services/request'

export default {
  components: {
    RiskChart,
    RiskTable
  },
  data() {
    return {
      project: undefined,
      currentStage: '阶段一', // 当前选中阶段值
      stageList: [], // 阶段列表
      tableData: [],
      userList: [] // 人员列表
    }
  },
  created() {
    this.project = this.$t(this.$route.matched[2].meta.title)
    this.queryByUserSelect()
    this.init()
  },
  methods: {
    init() {
      this.queryByProjectStage(this.project)
    },
    chartResize() {
      this.$refs.riskChartRef.chartResize()
    },
    // 处理阶段值的改变
    handleStageChange(e) {
      this.getTableList(this.project, e)
    },
    // 添加风险信息
    handleRiskCreate(risk) {
      console.log(risk)
    },
    // 更新风险信息
    handleRiskUpdate(risk) {
      console.log(risk)
    },
    handleRiskDelete(risk) {
      console.log('删除：' + risk)
    },
    // 获取数据列表
    async getTableList(project, projectStage) {
      console.log(project, projectStage)
      /* const { data: res1 } = await request('/api/projectEvolveSta/queryByProblemList', {
        methods: 'GET',
        params: {
          project,
          projectStage
        }
      })
      this.tableData = res */
    },
    // 修改置顶
    handleRiskTopChange(e) {
      console.log('修改置顶', e)
      // const { data: res } = await request('', {  })
      // console.log(res)
    },
    // 修改风险闭环
    handleRiskClosedloopChange(e) {
      console.log('修改闭环：', e)
      // const { data: res } = await request('', {  })
      // console.log(res)
    },
    // 获取具体风险的信息
    async getProjectRiskProgressList(id) {
      const { data: res } = await request('/api/projectEvolveSta/queryByRiskProgressList', {
        methods: 'GET',
        params: {
          id
        }
      })
      console.log(res)
    },
    // 查询人员列表
    async queryByUserSelect() {
      const { data: res } = await request('/api/authority/user/listUserSelect', { method: 'GET' })
      this.userList = res
    },
    // 查询项目阶段
    async queryByProjectStage(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByProjectStage', {
        methods: 'GET',
        params: {
          project
        }
      })
      this.stageList = res

      const stage = res && res.length > 0 ? res[0].stage_name : '阶段一'
      // 获取第一阶段数据
      this.getTableList(this.project, stage)
    }
  }
}
</script>

<style lang="scss" scoped>
.notify-bar {
  div {
    margin-bottom: 10px;
  }

  span {
    font-size: 16px;
    font-weight: bold;
  }
}

.wbs {
  margin: 40px 0;
}

.task-chart {
  margin: 30px 0;
}

.table {
  margin: 10px 0;
}

.charts {
  padding-top: 30px;
  border-top: 1px solid #ccc;
}
</style>
