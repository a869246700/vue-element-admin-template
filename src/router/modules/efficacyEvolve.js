import Layout from '@/layout'

// 具体项目线下的子路由
const projectLineChildrenRouter = [{
  path: 'total',
  name: 'total',
  meta: {
    title: '总述'
  },
  component: () => import('@/views/efficacyEvolve/project_line/project_total')
},
{
  path: 'progress',
  name: 'progress',
  meta: {
    title: '进展管理'
  },
  component: () => import('@/views/efficacyEvolve/project_line/project_twelve_page_2/Evolve')
},
{
  path: 'quality',
  name: 'quality',
  meta: {
    title: '质量管理'
  },
  component: () => import('@/views/efficacyEvolve/project_line/project_twelve_page_3/Quality')
},
{
  path: 'cost',
  name: 'cost',
  meta: {
    title: '成本管理'
  },
  component: () => import('@/views/efficacyEvolve/project_line/project_twelve_page_4/Cost')
},
{
  path: 'risk_management',
  name: 'risk_management',
  meta: {
    title: '风险管理'
  },
  component: () => import('@/views/efficacyEvolve/project_line/project_twelve_page_5/RiskManage')
},
{
  path: 'test_task',
  name: 'test_task',
  meta: {
    title: '测试任务'
  },
  component: () => import('@/views/efficacyEvolve/project_line/project_twelve_page_6/TestTask')
},
{
  path: 'technology_project',
  name: 'technology_project',
  meta: {
    title: '技术项目'
  },
  component: () => import('@/views/efficacyEvolve/project_line/project_twelve_page_8/TechnologyProject')
},
{
  path: 'design',
  name: 'design',
  meta: {
    title: '积分考核'
  },
  component: () => import('@/views/mygoo/demo2')
},
{
  path: 'wbs',
  name: 'wbs',
  meta: {
    title: '项目报告推送',
    noCahe: true
  },
  component: () => import('@/views/mygoo/demo2')
},
{
  path: 'communication_management',
  name: 'communication_management',
  meta: {
    title: '项目要素设置',
    noCahe: true
  },
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
    {
      path: 'AddProject',
      name: 'AddProject',
      hidden: true,
      meta: {
        title: '添加项目'
      },
      component: () => import('@/views/efficacyEvolve/project_line/add_project')
    },
    // 资源统计
    {
      path: 'summary_sta',
      name: 'summary_sta',
      meta: {
        title: 'summary_sta',
        noCahe: true
      },
      component: () => import('@/views/efficacyEvolve/summary_sta')
    },
    // 项目线
    {
      path: 'project_line',
      name: 'project_line',
      meta: {
        title: 'project_line'
      },
      component: () => import('@/views/efficacyEvolve'),
      redirect: 'noRedirect',
      children: [
        {
          path: 'ProjectTotal',
          name: 'ProjectTotal',
          meta: {
            title: 'ProjectTotal'
          },
          component: () => import('@/views/efficacyEvolve/project_total')
        },
        {
          path: '12x_project_test_data',
          name: '12x_project_test_data',
          meta: {
            title: '12x_project_test_data'
          },
          component: () => import('@/views/efficacyEvolve/project_line/platform_project_total')
        },
        {
          path: '11x_project_test',
          name: '11x_project_test',
          meta: {
            title: '11x_project_test'
          },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'AddProject',
          name: 'AddProject',
          hidden: true,
          meta: {
            title: '添加项目'
          },
          component: () => import('@/views/efficacyEvolve/project_line/add_project')
        },
        {
          path: 'project_twelve_four',
          name: 'project_twelve_four',
          meta: {
            title: 'project_twelve_four',
            icon: 'tree'
          },
          component: () => import('@/views/efficacyEvolve/project_line/index2'),
          children: projectLineChildrenRouter
        },
        {
          path: 'project_twelve_five',
          name: 'project_twelve_five',
          meta: {
            title: 'project_twelve_five',
            noCahe: true,
            icon: 'tree'
          },
          component: () => import('@/views/efficacyEvolve/project_line')
        },
        {
          path: 'project_twelve_RPL1',
          name: 'project_twelve_RPL1',
          meta: {
            title: 'project_twelve_RPL1',
            noCahe: true,
            icon: 'tree'
          },
          component: () => import('@/views/efficacyEvolve')
        }
      ]
    },
    // 平台
    {
      path: 'platform',
      name: 'platform',
      meta: {
        title: 'platform'
      },
      component: () => import('@/views/efficacyEvolve'),
      redirect: 'noRedirect',
      children: [{
        path: 'platform_project_total',
        name: 'platform_project_total',
        meta: {
          title: 'platform_project_total',
          noCahe: true
        },
        component: () => import('@/views/efficacyEvolve/project_line/platform_project_total')
      },
      {
        path: 'business_promise_cash',
        name: 'business_promise_cash',
        meta: {
          title: 'business_promise_cash',
          noCahe: true
        },
        component: () => import('@/views/efficacyEvolve/platform/business_promise_cash')
      },
      {
        path: 'project_select',
        name: 'project_select',
        meta: {
          title: 'project_select',
          noCahe: true
        },
        component: () => import('@/views/efficacyEvolve/platform/project_select')
      }
      ]
    },
    // 人员进展
    {
      path: 'user_evolve',
      name: 'user_evolve',
      meta: {
        title: 'user_evolve'
      },
      component: () => import('@/views/efficacyEvolve'),
      redirect: 'noRedirect',
      children: [{
        path: 'user_total',
        name: 'user_total',
        meta: {
          title: 'user_total',
          noCahe: true
        },
        component: () => import('@/views/efficacyEvolve/user_evolve/user_total')
      },
      {
        path: 'user_bug_evolve',
        name: 'user_bug_evolve',
        meta: {
          title: 'user_bug_evolve',
          noCahe: true
        },
        component: () => import('@/views/mygoo/demo2')
      },
      {
        path: 'user_week_effect_sta',
        name: 'user_week_effect_sta',
        meta: {
          title: 'user_week_effect_sta'
        },
        component: () => import('@/views/efficacyEvolve/user_evolve/user_week_effect_sta')
      }
      ]
    },
    {
      path: 'project_evolve_main',
      name: 'project_evolve_main',
      meta: {
        title: 'project_evolve_main',
        noCahe: true
      },
      component: () => import('@/views/mygoo/demo2'),
      hidden: true
    },
    {
      path: 'project_realm_evolve',
      name: 'project_realm_evolve',
      meta: {
        title: 'project_realm_evolve',
        noCahe: true
      },
      component: () => import('@/views/mygoo/demo2'),
      hidden: true
    }
  ]
}

export default efficacyEvolveRouter
