import Layout from '@/layout'

// 产出排行榜

const rankingListRouter = {
  path: '/ranking_list',
  name: 'ranking_list',
  meta: { title: 'ranking_list', icon: 'list' },
  component: Layout,
  redirect: 'noRedirect',
  children: [
    {
      path: 'qualifications_produce_statistics_score',
      name: 'qualifications_produce_statistics_score',
      meta: { title: 'qualifications_produce_statistics_score' },
      component: () => import('@/views/mygoo/demo2')
    },
    {
      path: 'qualifications_ranking_date_statistics',
      name: 'qualifications_ranking_date_statistics',
      meta: { title: 'qualifications_ranking_date_statistics' },
      component: () => import('@/views/mygoo/demo2')
    },
    {
      path: 'produce_ranking_list',
      name: 'produce_ranking_list',
      meta: { title: 'produce_ranking_list' },
      component: () => import('@/views/mygoo/demo2')
    },
    {
      path: 'produce_ranking_list_data',
      name: 'produce_ranking_list_data',
      meta: { title: 'produce_ranking_list_data' },
      component: () => import('@/views/mygoo/demo2')
    },
    {
      path: 'produce_ranking_score_contrast',
      name: 'produce_ranking_score_contrast',
      meta: { title: 'produce_ranking_score_contrast' },
      component: () => import('@/views/mygoo/demo2')
    },
    {
      path: 'produce_ranking_score_month_contrast',
      name: 'produce_ranking_score_month_contrast',
      meta: { title: 'produce_ranking_score_month_contrast' },
      component: () => import('@/views/mygoo/demo2')
    }
  ]
}

export default rankingListRouter
