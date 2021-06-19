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
    ],

  },
];
