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
      name: '403',
      meta: { title: '403', noCahe: true },
      component: () => import('@/views/mygoo/demo2')
    },
    {
      path: '404',
      name: '404',
      meta: { title: '404', noCahe: true },
      component: () => import('@/views/mygoo/demo2')
    },
    {
      path: '500',
      name: '500',
      meta: { title: '500', noCahe: true },
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
