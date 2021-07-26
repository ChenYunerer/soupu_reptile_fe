export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        path: '/',
        name: '爬虫数据总揽',
        component: '@/pages/index',
        showInMenu: true,
      },
      {
        path: '/taskList',
        name: '爬虫任务信息',
        component: '@/pages/taskList',
        showInMenu: true,
      },
      {
        path: '/taskScoreList',
        name: '爬虫曲谱信息',
        component: '@/pages/taskScoreList',
        showInMenu: true,
      },
      {
        path: '/taskTopListDetailList',
        name: '爬虫榜单信息',
        component: '@/pages/taskTopListDetailList',
        showInMenu: true,
      },
      {
        path: '/scoreSearch',
        name: '曲谱搜索',
        component: '@/pages/scoreSearch',
        showInMenu: true,
      },
      {
        path: '/scoreDetail',
        name: '曲谱详情',
        component: '@/pages/scoreDetail',
        showInMenu: false,
      },
    ],

  },
];
