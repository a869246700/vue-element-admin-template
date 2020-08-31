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
      activeName: '2',
      tabMapOptions: [
        { label: '总述', key: '1', name: 'Dashboard', disabled: false },
        { label: '进展管理', key: '2', name: 'Evolve', disabled: false },
        { label: '质量管理', key: '3', name: 'Quality', disabled: false },
        { label: '成本管理', key: '4', name: 'Cost', disabled: false },
        { label: '风险管理', key: '5', name: 'RiskManage', disabled: false },
        { label: '测试任务', key: '6', name: 'SpecialTask', disabled: false },
        { label: '技术项目', key: '7', name: 'TechnologyProject', disabled: false },
        { label: '积分考核', key: '8', disabled: true },
        { label: '项目报告推送', key: '9', disabled: true },
        { label: '项目要素设计管理', key: '10', disabled: false }
      ]
    }
  }
}
</script>
