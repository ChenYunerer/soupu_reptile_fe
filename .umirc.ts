import { defineConfig } from 'umi';
import routes from './config/routes';

export default defineConfig({
  title: 'SOUPU爬虫',
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  routes: routes,
  fastRefresh: {},
  publicPath: './',
  proxy: {
    '/admin/api': 'http://localhost:7002',
  },
});
