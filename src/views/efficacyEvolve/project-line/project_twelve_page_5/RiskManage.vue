<template>
  <!-- 问题&风险 -->
  <div class="issue-risk">
    <!-- 通知栏 -->
    <div class="notify-bar">
      <div>
        <el-tag type="info">项目风险项共计 10项, 其中HIGH 6项, MIDDLE 3项, LOW 1项</el-tag>
      </div>
      <div>
        <el-tag type="danger" class="high">其中HIGH 风险中, 已闭环50%(3项), 还有3项未闭环</el-tag>
      </div>
      <div>
        <el-tag type="warning" class="medium">MEDIUM 风险中, 已闭环66%(2项), 还有1项未闭环, 需相关责任人继续推进</el-tag>
      </div>
    </div>

    <!-- 表格-阶段值切换栏 -->
    <div class="stage-change">
      <el-radio-group v-model="currentStage" @change="handleStageChange">
        <el-radio-button v-for="(item, index) in stageList" :key="index" :label="item.stage" />
      </el-radio-group>
    </div>

    <!-- 中间的表格区域 -->
    <div class="table">
      <risk-table :table-data="tableData" @create="handleRiskCreate" @update="handleRiskUpdate" />
    </div>

    <!-- charts区域 -->
    <div class="charts">
      <risk-chart />
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
      stageList: [{ stage: '阶段一' }, { stage: '阶段二' }], // 阶段列表
      tableData: []
    }
  },
  created() {
    this.project = this.$t(this.$route.matched[2].meta.title)
    this.stageList.forEach((item) => {
      this.getTableList(this.project, item.stage)
    })
  },
  methods: {
    // 处理阶段值的改变
    handleStageChange(e) {
      console.log(e)
    },
    // 添加风险信息
    handleRiskCreate(risk) {
      console.log(risk)
    },
    // 更新风险信息
    handleRiskUpdate(risk) {
      console.log(risk)
    },
    // 获取数据列表
    async getTableList(project, projectStage) {
      const { data: res1 } = await request('/api/projectEvolveSta/queryByProblemList', {
        methods: 'GET',
        params: {
          project,
          projectStage
        }
      })
      const { data: res2 } = await request('/api/projectEvolveSta/queryByRiskList', {
        methods: 'GET',
        params: {
          project,
          projectStage
        }
      })
      // res1 res2 两个数组对象，需要将两个数组对象链接
      const result = Object.assign(res1, res2)
      result.project_stage = projectStage // 项目阶段
      this.tableData.push(result)
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
      console.log(res)
    },
    // 查询项目阶段
    async queryByProjectStage(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByProjectStage', {
        methods: 'GET',
        params: {
          project
        }
      })
      console.log(res)
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
