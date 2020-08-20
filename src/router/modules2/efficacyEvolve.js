import Layout from '@/layout'

// 具体项目线下的子路由
const projectLineChildrenRouter = [
  {
    path: 'progress',
    name: 'progress',
    meta: { title: '进展管理' },
    component: () => import('@/views/efficacyEvolve/project-line/project_twelve_page_2/Evolve')
  },
  {
    path: 'quality',
    name: 'quality',
    meta: { title: '质量管理' },
    component: () => import('@/views/efficacyEvolve/project-line/project_twelve_page_3/Quality')
  },
  {
    path: 'cost',
    name: 'cost',
    meta: { title: '成本管理' },
    component: () => import('@/views/efficacyEvolve/project-line/project_twelve_page_4/Cost')
  },
  {
    path: 'risk_management',
    name: 'risk_management',
    meta: { title: '风险管理' },
    component: () => import('@/views/efficacyEvolve/project-line/project_twelve_page_5/RiskManage')
  },
  {
    path: 'test_task',
    name: 'test_task',
    meta: { title: '测试任务' },
    component: () => import('@/views/efficacyEvolve/project-line/project_twelve_page_6/TestTask')
  },
  {
    path: 'technology_project',
    name: 'technology_project',
    meta: { title: '技术项目' },
    component: () => import('@/views/efficacyEvolve/project-line/project_twelve_page_8/TechnologyProject')
  },
  {
    path: 'design',
    name: 'design',
    meta: { title: '积分考核' },
    component: () => import('@/views/efficacyEvolve/project-line/project_twelve_page_7/ProjectLongestPath')
  },
  {
    path: 'wbs',
    name: 'wbs',
    meta: { title: '项目报告推送', noCahe: true },
    component: () => import('@/views/mygoo/demo2')
  },
  {
    path: 'communication_management',
    name: 'communication_management',
    meta: { title: '项目要素设计管理', noCahe: true },
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
          redirect: '/efficacyEvolve/project_line/project_twelve_four/design',
          component: () => import('@/views/efficacyEvolve/project-line/index2'),
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
