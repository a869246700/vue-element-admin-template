import Layout from '@/layout'

// 资质信息

const qualificationsRouter = {
  path: '/qualifications',
  name: 'qualifications',
  meta: { title: 'qualifications', icon: 'documentation' },
  component: Layout,
  redirect: 'noRedirect',
  children: [
    {
      path: 'qualifications_info',
      name: 'qualifications_info',
      meta: { title: 'qualifications_info' },
      component: () => import('@/views/qualifications/qualifications_info')
    },
    {
      path: 'qualifications_list',
      name: 'qualifications_list',
      meta: { title: 'qualifications_list' },
      component: () => import('@/views/qualifications/qualifications_list')
    },
    {
      path: 'qualifications_plan',
      name: 'qualifications_plan',
      meta: { title: 'qualifications_plan' },
      component: () => import('@/views/qualifications/qualifications_plan')
    },
    {
      path: 'qualifications_realm_reach',
      name: 'qualifications_realm_reach',
      meta: { title: 'qualifications_realm_reach' },
      component: () => import('@/views/qualifications/qualifications_realm_reach')
    },
    {
      path: 'qualifications_caf_list',
      name: 'qualifications_caf_list',
      meta: { title: 'qualifications_caf_list' },
      component: () => import('@/views/qualifications/qualifications_caf_list')
    },
    {
      path: 'qualifications_tp_fail_cause',
      name: 'qualifications_tp_fail_cause',
      meta: { title: 'qualifications_tp_fail_cause' },
      component: () => import('@/views/qualifications/qualifications_tp_fail_cause')
    },
    {
      path: 'qualifications_caf_grading_list',
      name: 'qualifications_caf_grading_list',
      meta: { title: 'qualifications_caf_grading_list' },
      component: () => import('@/views/qualifications/qualifications_caf_grading_list')
    },
    {
      path: 'qualifications_caf_plan_list',
      name: 'qualifications_caf_plan_list',
      meta: { title: 'qualifications_caf_plan_list' },
      component: () => import('@/views/qualifications/qualifications_caf_plan_list')
    },
    {
      path: 'qualifications_bug_list',
      name: 'qualifications_bug_list',
      meta: { title: 'qualifications_bug_list' },
      component: () => import('@/views/qualifications/qualifications_bug_list')
    },
    {
      path: 'user_realm_exam_info',
      name: 'user_realm_exam_info',
      meta: { title: 'user_realm_exam_info' },
      component: () => import('@/views/qualifications/user_realm_exam_info')
    },
    {
      path: 'qualifications_rule_major_define',
      name: 'qualifications_rule_major_define',
      meta: { title: 'qualifications_rule_major_define' },
      component: () => import('@/views/mygoo/demo2')
    },
    {
      path: 'qualifications_definition',
      name: 'qualifications_definition',
      meta: { title: 'qualifications_definition' },
      component: () => import('@/views/mygoo/demo2')
    }
  ]
}

export default qualificationsRouter
