<template>
  <!-- 项目线 -->
  <div id="project-line">
    <el-card>
      <!-- Tab 切换 -->
      <el-tabs v-model="activeName" style="margin-top:15px;">
        <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" lazy :name="item.key">
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

export default {
  components: {
    Dashboard,
    Evolve,
    Quality,
    Cost
  },
  data() {
    return {
      name: '12.5PL1',
      activeName: '2',
      tabMapOptions: [
        { label: '总述', key: '1', name: 'Dashboard' },
        { label: '进展', key: '2', name: 'Evolve' },
        { label: '质量', key: '3', name: 'Quality' },
        { label: '成本', key: '4', name: 'Cost' },
        { label: '问题&风险', key: '5' },
        { label: '风险管理', key: '6' },
        { label: '专项任务', key: '7' },
        { label: '项目最长路径', key: '8' },
        { label: '技术项目', key: '9' },
        { label: '设计', key: '10' },
        { label: 'WBS', key: '11' },
        { label: '沟通管理', key: '12' },
        { label: '流程', key: '13' },
        { label: '人员管理', key: '14' },
        { label: '积分管理', key: '15' },
        { label: '绩效考核', key: '16' },
        { label: '资质审查  ', key: '17' },
        { label: '组件项目', key: '18' },
        { label: '需求变更', key: '19' }
      ]
    }
  },
  created() {
    console.log(this.$route.name)
  },
  methods: {}
}
</script>
