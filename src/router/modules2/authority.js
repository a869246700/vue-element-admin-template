import Layout from '@/layout'

// 权限控制

const authorityRouter = {
  path: '/authority',
  name: 'authority',
  meta: { title: 'authority', icon: 'user' },
  component: Layout,
  redirect: 'noRedirect',
  children: [
    {
      path: 'index',
      name: 'authority-index',
      meta: { title: 'authority-index', noCahe: true },
      component: () => import('@/views/mygoo/demo2'),
      hidden: true
    },
    {
      path: 'role',
      name: 'role',
      meta: { title: 'role', noCahe: true },
      component: () => import('@/views/mygoo/demo2')
    },
    {
      path: 'router',
      name: 'router',
      meta: { title: 'router', noCahe: true },
      component: () => import('@/views/mygoo/demo2')
    },
    {
      path: 'role_man',
      name: 'role_man',
      meta: { title: 'role_man', noCahe: true },
      component: () => import('@/views/mygoo/demo2')
    },
    {
      path: 'role_auth_list',
      name: 'role_auth_list',
      meta: { title: 'role_auth_list', noCahe: true },
      component: () => import('@/views/mygoo/demo2')
    }
  ]
}

export default authorityRouter
