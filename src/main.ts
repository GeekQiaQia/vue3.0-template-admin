/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
// eslint-disable-next-line import/no-unresolved
import router from './router/index';
import store from './store/index';
import App from './App.vue';

// 挂载路由
// 挂载vuex
// 挂载 elementPlus UI;
import 'element-plus/lib/theme-chalk/index.css';

// 链式注册插件
createApp(App).use(router).use(store).use(ElementPlus)
  .mount('#app');
