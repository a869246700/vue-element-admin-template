import Layout from '@/layout'

// 历史菜单

const beforeMenuRouter = {
  path: '/beforeMenu',
  name: 'beforeMenu',
  meta: { title: 'beforeMenu', icon: 'star' },
  component: Layout,
  redirect: 'noRedirect',
  children: [
    {
      path: 'dataArrange',
      name: 'dataArrange',
      meta: { title: 'dataArrange' },
      component: () => import('@/views/efficacyEvolve'),
      redirect: 'noRedirect',
      children: [
        {
          path: 'study_data',
          name: 'study_data',
          meta: { title: 'study_data', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'exam_data',
          name: 'exam_data',
          meta: { title: 'exam_data', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        }
      ]
    },

    {
      path: 'projectInfo',
      name: 'projectInfo',
      meta: { title: 'projectInfo' },
      component: () => import('@/views/efficacyEvolve'),
      redirect: 'noRedirect',
      children: [
        {
          path: 'project_classify',
          name: 'project_classify',
          meta: { title: 'project_classify', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'project_stage_date',
          name: 'project_stage_date',
          meta: { title: 'project_stage_date', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'realm_project_work_package',
          name: 'realm_project_work_package',
          meta: { title: 'realm_project_work_package', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'basic_data_export',
          name: 'basic_data_export',
          meta: { title: 'basic_data_export', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'data_export_info',
          name: 'data_export_info',
          meta: { title: 'data_export_info', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        }
      ]
    },

    {
      path: 'projectProcess',
      name: 'projectProcess',
      meta: { title: 'projectProcess' },
      component: () => import('@/views/efficacyEvolve'),
      redirect: 'noRedirect',
      children: [
        {
          path: 'engineering',
          name: 'engineering',
          meta: { title: 'engineering', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'project_need',
          name: 'project_need',
          meta: { title: 'project_need', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'two_realm_person',
          name: 'two_realm_person',
          meta: { title: 'two_realm_person', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'project_month',
          name: 'project_month',
          meta: { title: 'project_month', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'summary_waste',
          name: 'summary_waste',
          meta: { title: 'summary_waste', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'engineering_omit',
          name: 'engineering_omit',
          meta: { title: 'engineering_omit', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'engineering_project_omit',
          name: 'engineering_project_omit',
          meta: { title: 'engineering_project_omit', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'stage_project_caf',
          name: 'stage_project_caf',
          meta: { title: 'stage_project_caf', noCahe: true },
          component: () => import('@/views/mygoo/demo2'),
          hidden: true
        },
        {
          path: 'summary_project_type_time',
          name: 'summary_project_type_time',
          meta: { title: 'summary_project_type_time', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'summary_dept_type_time',
          name: 'summary_dept_type_time',
          meta: { title: 'summary_dept_type_time', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        }
      ]
    },

    {
      path: 'projectData',
      name: 'projectData',
      meta: { title: 'projectData' },
      component: () => import('@/views/efficacyEvolve'),
      redirect: 'noRedirect',
      children: [
        {
          path: 'resource_speciality_divide',
          name: 'resource_speciality_divide',
          meta: { title: 'resource_speciality_divide', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'engineering_realm',
          name: 'engineering_realm',
          meta: { title: 'engineering_realm', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'engineering_realm_top',
          name: 'engineering_realm_top',
          meta: { title: 'engineering_realm_top', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'team_building',
          name: 'team_building',
          meta: { title: 'team_building', noCahe: true },
          component: () => import('@/views/mygoo/demo2'),
          hidden: true
        },
        {
          path: 'team_building_gap',
          name: 'team_building_gap',
          meta: { title: 'team_building_gap', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'project_bug_summary',
          name: 'project_bug_summary',
          meta: { title: 'project_bug_summary', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'project_bug_summary_sum',
          name: 'project_bug_summary_sum',
          meta: { title: 'project_bug_summary_sum', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'project_bug_summary_dept_sum',
          name: 'project_bug_summary_dept_sum',
          meta: { title: 'project_bug_summary_dept_sum', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'project_review_statistics',
          name: 'project_review_statistics',
          meta: { title: 'project_review_statistics', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'project_bug_case_sta',
          name: 'project_bug_case_sta',
          meta: { title: 'project_bug_case_sta', noCahe: true },
          component: () => import('@/views/mygoo/demo2'),
          hidden: true
        },
        {
          path: 'project_effect_sta',
          name: 'project_effect_sta',
          meta: { title: 'project_effect_sta', noCahe: true },
          component: () => import('@/views/mygoo/demo2'),
          hidden: true,
          children: [
            {
              path: 'user_week_effect_sta',
              name: 'user_week_effect_sta',
              meta: { title: 'user_week_effect_sta', noCahe: true },
              component: () => import('@/views/mygoo/demo2')
            }
          ]
        }
      ]
    },

    {
      path: 'resource',
      name: 'resource',
      meta: { title: 'resource' },
      component: () => import('@/views/efficacyEvolve'),
      redirect: 'noRedirect',
      children: [
        {
          path: 'resource_into',
          name: 'resource_into',
          meta: { title: 'resource_into', noCahe: true },
          component: () => import('@/views/mygoo/demo2'),
          hidden: true
        },
        {
          path: 'effective_resources',
          name: 'effective_resources',
          meta: { title: 'effective_resources', noCahe: true },
          component: () => import('@/views/mygoo/demo2'),
          hidden: true
        },
        {
          path: 'efficiency_resource',
          name: 'efficiency_resource',
          meta: { title: 'efficiency_resource', noCahe: true },
          component: () => import('@/views/mygoo/demo2'),
          hidden: true
        },
        {
          path: 'structure_ratio',
          name: 'structure_ratio',
          meta: { title: 'structure_ratio', noCahe: true },
          component: () => import('@/views/mygoo/demo2'),
          hidden: true
        },
        {
          path: 'codecoveragetrace',
          name: 'codecoveragetrace',
          meta: { title: 'codecoveragetrace', noCahe: true },
          component: () => import('@/views/mygoo/demo2'),
          hidden: true
        },
        {
          path: 'resource_stage',
          name: 'resource_stage',
          meta: { title: 'resource_stage', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'resource_test_develop',
          name: 'resource_test_develop',
          meta: { title: 'resource_test_develop', noCahe: true },
          component: () => import('@/views/mygoo/demo2'),
          hidden: true
        },
        {
          path: 'summary_rank',
          name: 'summary_rank',
          meta: { title: 'summary_rank', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'summary_rank_top',
          name: 'summary_rank_top',
          meta: { title: 'summary_rank_top', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'echarts_resource_project',
          name: 'echarts_resource_project',
          meta: { title: 'echarts_resource_project', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'echarts_resource_project_divide',
          name: 'echarts_resource_project_divide',
          meta: { title: 'echarts_resource_project_divide', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'person_caf_type_num',
          name: 'person_caf_type_num',
          meta: { title: 'person_caf_type_num', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'high_person_summary',
          name: 'high_person_summary',
          meta: { title: 'high_person_summary', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'high_person_summary_contrast',
          name: 'high_person_summary_contrast',
          meta: { title: 'high_person_summary_contrast', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'summary_abnormal_week',
          name: 'summary_abnormal_week',
          meta: { title: 'summary_abnormal_week', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        }
      ]
    },

    {
      path: 'case',
      name: 'case',
      meta: { title: 'case' },
      component: () => import('@/views/efficacyEvolve'),
      redirect: 'noRedirect',
      children: [
        {
          path: 'case_info_list',
          name: 'case_info_list',
          meta: { title: 'case_info_list', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'case_info_handle_list',
          name: 'case_info_handle_list',
          meta: { title: 'case_info_handle_list', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        }
      ]
    },

    {
      path: 'testActionInspect',
      name: 'testActionInspect',
      meta: { title: 'testActionInspect' },
      component: () => import('@/views/efficacyEvolve'),
      redirect: 'noRedirect',
      children: [
        {
          path: 'test_project_method_info',
          name: 'test_project_method_info',
          meta: { title: 'test_project_method_info', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'test_action_inspect_tree',
          name: 'test_action_inspect_tree',
          meta: { title: 'test_action_inspect_tree', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'test_action_inspect_info',
          name: 'test_action_inspect_info',
          meta: { title: 'test_action_inspect_info', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        }
      ]
    },

    {
      path: 'qualityInfo',
      name: 'qualityInfo',
      meta: { title: 'qualityInfo' },
      component: () => import('@/views/efficacyEvolve'),
      redirect: 'noRedirect',
      children: [
        {
          path: 'quality_info_list',
          name: 'quality_info_list',
          meta: { title: 'quality_info_list', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'quality_car_list',
          name: 'quality_car_list',
          meta: { title: 'quality_car_list', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        },
        {
          path: 'word_scan_keyword',
          name: 'word_scan_keyword',
          meta: { title: 'word_scan_keyword', noCahe: true },
          component: () => import('@/views/mygoo/demo2')
        }
      ]
    }
  ]
}

export default beforeMenuRouter
