<template>
  <!-- 项目线 -->
  <div id="project-line">
    <el-card>
      <!-- Tab 切换 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane
          v-for="item in tabMapOptions"
          :key="item.key"
          :label="item.label"
          lazy
          :name="item.key"
          :disabled="item.disabled"
        >
          <el-popover
            v-if="item.disabled"
            slot="label"
            placement="top-start"
            trigger="hover"
            content="该模块尚未开发(开放)"
          >
            <span slot="reference" class="disabled" style="padding: 0 10px;">{{ item.label }}</span>
          </el-popover>

          <span v-else slot="label" style="padding: 0 10px;">{{ item.label }}</span>
          <tab-component :is="item.name" :ref="item.name + 'Ref'" />
        </el-tab-pane>
      </el-tabs>

      <!-- router 切换 -->
      <router-view />
    </el-card>
  </div>
</template>

<script>
import ProjectTotal from '@/views/efficacyEvolve/project_line/project_total'
import Evolve from './project_twelve_page_2/Evolve'
import Quality from './project_twelve_page_3/Quality'
import Cost from './project_twelve_page_4/Cost'
import RiskManage from './project_twelve_page_5/RiskManage'
import TestTask from './project_twelve_page_6/TestTask'
import TechnologyProject from './project_twelve_page_8/TechnologyProject'
import IntegralAssessment from './project_twelve_page_9/IntegralAssessment'

export default {
  components: {
    ProjectTotal,
    Evolve,
    Quality,
    Cost,
    RiskManage,
    TestTask,
    TechnologyProject,
    IntegralAssessment
  },
  provide() {
    return {
      project: this.project
    }
  },
  data() {
    return {
      name: '12.5PL1',
      activeName: '2',
      tabMapOptions: [
        { label: '总述', key: '1', name: 'ProjectTotal', disabled: false },
        { label: '进展管理', key: '2', name: 'Evolve', disabled: false },
        { label: '质量管理', key: '3', name: 'Quality', disabled: false },
        { label: '成本管理', key: '4', name: 'Cost', disabled: false },
        { label: '风险管理', key: '5', name: 'RiskManage', disabled: false },
        { label: '测试任务', key: '6', name: 'TestTask', disabled: false },
        { label: '技术项目', key: '7', name: 'TechnologyProject', disabled: false },
        { label: '积分考核', key: '8', name: 'IntegralAssessment', disabled: false },
        { label: '项目报告推送', key: '9', disabled: true },
        { label: '项目要素设置', key: '10', disabled: true }
      ]
    }
  },
  beforeCreate() {
    this.project = this.$t(this.$route.matched[2].meta.title)
  },
  methods: {
    handleTabClick(e) {
      const currentCom = this.tabMapOptions.find(ele => ele.key === this.activeName).name + 'Ref'
      if (currentCom === 'EvolveRef') {
        // 刷新
        this.$nextTick(() => {
          // console.log(this.$refs.EvolveRef)
          this.$refs['EvolveRef'][0].reloadGantt()
        })
      }
      this.$nextTick(() => {
        this.$refs[currentCom] && this.$refs[currentCom].length !== 0 && this.$refs[currentCom][0].chartResize && this.$refs[currentCom][0].chartResize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  color: #1895ff;
}

.disabled {
  cursor: not-allowed;
  color: #bbb;
}

.el-card_body {
  padding: 0px!important;
}
</style>
