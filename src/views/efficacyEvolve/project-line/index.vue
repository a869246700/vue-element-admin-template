<template>
  <!-- 项目线 -->
  <div id="project-line">
    <el-card>
      <!-- Tab 切换 -->
      <el-tabs v-model="activeName" style="margin-top:15px;">
        <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" lazy :name="item.key" :disabled="item.disabled">
          <tab-component :is="item.name" />
        </el-tab-pane>
      </el-tabs>

      <!-- router 切换 -->
      <router-view />
    </el-card>
  </div>
</template>

<script>
import Dashboard from '@/views/dashboard/index'
import Evolve from './project_twelve_page_2/Evolve'
import Quality from './project_twelve_page_3/Quality'
import Cost from './project_twelve_page_4/Cost'
import RiskManage from './project_twelve_page_5/RiskManage'
import SpecialTask from './project_twelve_page_6/SpecialTask'
import ProjectLongestPath from './project_twelve_page_7/ProjectLongestPath'
import TechnologyProject from './project_twelve_page_8/TechnologyProject'

export default {
  components: {
    Dashboard,
    Evolve,
    Quality,
    Cost,
    RiskManage,
    SpecialTask,
    TechnologyProject,
    ProjectLongestPath
  },
  data() {
    return {
      name: '12.5PL1',
      activeName: '9',
      tabMapOptions: [
        { label: '总述', key: '1', name: 'Dashboard', disabled: false },
        { label: '进展', key: '2', name: 'Evolve', disabled: false },
        { label: '质量', key: '3', name: 'Quality', disabled: false },
        { label: '成本', key: '4', name: 'Cost', disabled: false },
        // { label: '问题&风险', key: '5', name: 'RiskManage' },
        { label: '风险管理', key: '6', name: 'RiskManage', disabled: false },
        { label: '专项任务', key: '7', name: 'SpecialTask', disabled: false },
        { label: '项目最长路径', key: '8', name: 'ProjectLongestPath', disabled: false },
        { label: '技术项目', key: '9', name: 'TechnologyProject', disabled: false },
        { label: '设计', key: '10', disabled: true },
        { label: 'WBS', key: '11', disabled: true },
        { label: '沟通管理', key: '12', disabled: false },
        { label: '流程', key: '13', disabled: true },
        { label: '人员管理', key: '14', disabled: true },
        { label: '积分管理', key: '15', disabled: true },
        { label: '绩效考核', key: '16', disabled: true },
        { label: '资质审查  ', key: '17', disabled: false },
        { label: '组件项目', key: '18', disabled: false },
        { label: '需求变更', key: '19', disabled: false }
      ]
    }
  }
}
</script>
