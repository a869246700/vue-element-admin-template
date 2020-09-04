import Layout from '@/layout'

// 异常处理

const execptionRouter = {
  path: '/exception',
  name: 'exception',
  meta: { title: 'exception', icon: 'user' },
  hidden: true,
  component: Layout,
  redirect: 'noRedirect',
  children: [
    {
      path: '403',
      name: 'not-permission',
      meta: { title: 'not-permission', noCahe: true },
      component: () => import('@/views/mygoo/demo2')
    },
    {
      path: '404',
      name: 'not-find',
      meta: { title: 'not-find', noCahe: true },
      component: () => import('@/views/mygoo/demo2')
    },
    {
      path: '500',
      name: 'server-error',
      meta: { title: 'server-error', noCahe: true },
      component: () => import('@/views/mygoo/demo2')
    },
    {
      path: 'build',
      name: 'build',
      meta: { title: 'build', noCahe: true },
      component: () => import('@/views/mygoo/demo2')
    },
    {
      path: 'trigger',
      name: 'trigger',
      meta: { title: 'trigger', noCahe: true },
      component: () => import('@/views/mygoo/demo2')
    }
  ]
}

export default execptionRouter
