import Layout from '@/layout'

// 管理中心

const manageRouter = {
  path: '/manage',
  name: 'manage',
  meta: { title: 'manage', icon: 'peoples' },
  component: Layout,
  redirect: 'noRedirect',
  children: [
    {
      path: 'account_center',
      name: 'account_center',
      meta: { title: 'account_center', noCahe: true },
      component: () => import('@/views/manage/account_center')
    },
    {
      path: 'authority_apply',
      name: 'authority_apply',
      meta: { title: 'authority_apply', noCahe: true },
      component: () => import('@/views/manage/authority_apply')
    },
    {
      path: 'message_list',
      name: 'message_list',
      meta: { title: 'message_list', noCahe: true },
      component: () => import('@/views/manage/message_list')
    },
    {
      path: 'system_feedback',
      name: 'system_feedback',
      meta: { title: 'system_feedback', noCahe: true },
      component: () => import('@/views/manage/system_feedback')
    },
    {
      path: 'system_help',
      name: 'system_help',
      meta: { title: 'system_help', noCahe: true },
      component: () => import('@/views/mygoo/demo2')
    },
    {
      path: 'system_notice',
      name: 'system_notice',
      meta: { title: 'system_notice', noCahe: true },
      component: () => import('@/views/mygoo/demo2')
    },
    {
      path: 'system_question',
      name: 'system_question',
      meta: { title: 'system_question', noCahe: true },
      component: () => import('@/views/mygoo/demo2')
    }
  ]
}

export default manageRouter
