import Layout from '@/layout'

const gooRouter = {
  path: '/mygoo',
  component: Layout,
  redirect: '/mygoo/index',
  meta: {
    title: 'MyGoo',
    icon: 'goo'
  },
  // hidden: true, // 控制是否在侧边栏显示与隐藏的属性
  children: [
    {
      path: 'index',
      component: () => import('@/views/mygoo/index'),
      name: 'Goo Chart',
      meta: { title: 'Goo Chart', icon: 'goo', noCahe: true }
    },
    {
      path: 'demo1',
      component: () => import('@/views/mygoo/demo1'),
      name: 'Goo demo1',
      meta: { title: 'Mygoo demo1', icon: 'goo', noCahe: true }
    },
    {
      path: 'demo2',
      component: () => import('@/views/mygoo/demo2'),
      name: 'Goo demo2',
      meta: { title: 'Mygoo demo2', icon: 'goo', noCahe: true }
    }
  ]
}

export default gooRouter
