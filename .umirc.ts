import { defineConfig } from 'umi';
import routes from './config/routes';

export default defineConfig({
  title: "SOUPU爬虫",
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  fastRefresh: {},
  proxy: {
    "/admin/api": "http://soupu.yuner.fun"
  }
});
