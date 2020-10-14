import Layout from '@/layout'

// 积分管理

const integralRouter = {
  path: '/integral',
  name: 'integral',
  meta: { title: 'integral', icon: 'tree-table' },
  component: Layout,
  redirect: 'noRedirect',
  children: [
    {
      path: 'user_integral_sta',
      name: 'user_integral_sta',
      meta: { title: 'user_integral_sta', noCahe: true },
      component: () => import('@/views/integral/user_integral_sta'),
      hidden: true
    },
    {
      path: 'integral_rules',
      name: 'integral_rules',
      meta: { title: 'integral_rules', noCahe: true },
      component: () => import('@/views/integral/integral_rules')
    }
  ]
}

export default integralRouter
