import Layout from '@/layout'

// 具体项目线下的子路由
const projectLineChildrenRouter = [
  {
    path: 'total',
    name: 'total',
    meta: { title: '总述', noCahe: true },
    hidden: false,
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'progress',
    name: 'progress',
    meta: { title: '进展', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'quality',
    name: 'quality',
    meta: { title: '质量', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'cost',
    name: 'cost',
    meta: { title: '成本', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'problem&risk',
    name: 'problem&risk',
    meta: { title: '问题&风险', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'risk_management',
    name: 'risk_management',
    meta: { title: '风险管理', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'special_task',
    name: 'special_task',
    meta: { title: '专项任务', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'project_long_path',
    name: 'project_long_path',
    meta: { title: '项目最长路径', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'technology_project',
    name: 'technology_project',
    meta: { title: '技术项目', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'design',
    name: 'design',
    meta: { title: '设计', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'wbs',
    name: 'wbs',
    meta: { title: 'WBS', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'communication_management',
    name: 'communication_management',
    meta: { title: '沟通管理', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'process',
    name: 'process',
    meta: { title: '流程', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'personnel_management',
    name: 'personnel_management',
    meta: { title: '人员管理', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'integral_management',
    name: 'integral_management',
    meta: { title: '积分管理', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'performance_appraisal',
    name: 'performance_appraisal',
    meta: { title: '绩效考核', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'qualification_review',
    name: 'qualification_review',
    meta: { title: '资质审查', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'component_project',
    name: 'Component_project',
    meta: { title: '组件项目', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'demand_change',
    name: 'demand_change',
    meta: { title: '需求变更', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  }
]

// 项目运营
const efficacyEvolveRouter = {
  path: '/efficacyEvolve',
  name: 'efficacyEvolve',
  component: Layout,
  redirect: 'noRedirect',
  meta: {
    title: 'efficacyEvolve',
    icon: 'nested'
  },
  // hidden: true, // 控制是否在侧边栏显示与隐藏的属性
  children: [
    // 资源统计
    {
      path: 'summary_sta',
      name: 'summary_sta',
      meta: { title: 'summary_sta', noCahe: true },
      component: () => import('@/views/mygoo/demo2')
    },
    // 项目线
    {
      path: 'project_line',
      name: 'project_line',
      meta: { title: 'project_line' },
      component: () => import('@/views/efficacyEvolve/index'),
      redirect: 'noRedirect',
      children: [
        {
          path: 'project_total',
          component: () => import('@/views/efficacyEvolve/index'),
          name: 'project_total',
          meta: { title: 'project_total', noCahe: true }
        },
        {
          path: 'project_twelve_four',
          name: 'project_twelve_four',
          meta: { title: 'project_twelve_four', icon: 'tree' },
          redirect: 'noRedirect',
          component: () => import('@/views/efficacyEvolve/index'),
          children: projectLineChildrenRouter
        },
        {
          path: 'project_twelve_five',
          name: 'project_twelve_five',
          meta: { title: 'project_twelve_five', noCahe: true, icon: 'tree' },
          component: () => import('@/views/efficacyEvolve/project-line/index')
        },
        {
          path: 'project_twelve_RPL1',
          name: 'project_twelve_RPL1',
          meta: { title: 'project_twelve_RPL1', noCahe: true, icon: 'tree' },
          component: () => import('@/views/efficacyEvolve/index')
        }
      ]
    },
    // 平台
    {
      path: 'platform',
      name: 'platform',
      meta: { title: 'platform' },
      component: () => import('@/views/efficacyEvolve/index'),
      redirect: 'noRedirect',
      children: [
        {
          path: 'platform_project_total',
          name: 'platform_project_total',
          meta: { title: 'platform_project_total', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'business_promise_cash',
          name: 'business_promise_cash',
          meta: { title: 'business_promise_cash', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'project_select',
          name: 'project_select',
          meta: { title: 'project_select', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        }
      ]
    },
    // 人员进展
    {
      path: 'user_evolve',
      name: 'user_evolve',
      meta: { title: 'user_evolve' },
      component: () => import('@/views/efficacyEvolve/index'),
      redirect: 'noRedirect',
      children: [
        {
          path: 'user_total',
          name: 'user_total',
          meta: { title: 'user_total', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'user_bug_evolve',
          name: 'user_bug_evolve',
          meta: { title: 'user_bug_evolve', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'user_week_effect_sta',
          name: 'user_week_effect_sta',
          meta: { title: 'user_week_effect_sta' },
          component: () => import('@/views/mygoo/demo2')
        }
      ]
    },
    {
      path: 'project_evolve_main',
      name: 'project_evolve_main',
      meta: { title: 'project_evolve_main', noCahe: true },
      component: () => import('@/views/mygoo/demo2'),
      hidden: true
    },
    {
      path: 'project_realm_evolve',
      name: 'project_realm_evolve',
      meta: { title: 'project_realm_evolve', noCahe: true },
      component: () => import('@/views/mygoo/demo2'),
      hidden: true
    }
  ]
}

export default efficacyEvolveRouter
