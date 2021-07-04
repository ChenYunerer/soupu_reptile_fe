export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        path: '/',
        name: '爬虫数据总揽',
        component: '@/pages/index',
      },
      {
        path: '/taskList',
        name: '爬虫任务信息',
        component: '@/pages/taskList',
      },
      {
        path: '/taskScoreList',
        name: '爬虫曲谱信息',
        component: '@/pages/taskScoreList',
      },
      {
        path: '/scoreSearch',
        name: '曲谱搜索',
        component: '@/pages/scoreSearch',
      },
      {
        path: '/scoreDetail',
        name: '曲谱详情',
        component: '@/pages/scoreDetail',
      },
    ],

  },
];
