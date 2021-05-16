/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { createApp } from 'vue';
import ElementPlus from 'element-plus';

// eslint-disable-next-line import/no-unresolved
import { key, store } from './store/index';
import router from './router/index';
import App from './App.vue';
import '@/styles/index.scss'; // global css
import '@/permission'; // permission control 全局路由守卫
import 'dayjs/locale/zh-cn'
// eslint-disable-next-line import/order
// import enLocale from 'element-plus/lib/locale/lang/en'
// eslint-disable-next-line import/order
// import zhLocale from 'element-plus/lib/locale/lang/zh-CN'

// eslint-disable-next-line import/order
// import { createI18n } from 'vue-i18n'
// 1、挂载vuex
// 2、挂载路由
// 3、挂载 elementPlus UI;
import 'element-plus/lib/theme-chalk/index.css';

// const messages = {
//     [enLocale.name]: {
//       // el 这个属性很关键，一定要保证有这个属性，
//       el: enLocale.el,
//       // 定义您自己的字典，但是请不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
//       message: {
//         hello: 'hello world',
//       },
//     },
//     [zhLocale.name]: {
//       el: zhLocale.el,
//       // 定义您自己的字典，但是请不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
//       message: {
//         hello: '你好，世界',
//       },
//     },
//     testLocale: {
//       el: {},
//       // 没有定义 message 字段，会 fallback 回到 en 去, fallbackLocale 的定义在下方 👇
//     },
//   }

//   const i18n = createI18n({
//     locale: zhLocale.name,
//     fallbackLocale: enLocale.name,
//   })


// 在挂载路由之前，先进行异步路由处理
store.dispatch('permissionModule/getPermissonRoutes');

// .use(VueClipboard)

// , {
//     i18n: i18n.global.t,
//   }
// 链式注册插件
const app = createApp(App).use(store, key).use(router).use(ElementPlus);
// 现在所有的导航都是异步的，等路由ready以后再进行挂载组件；
router.isReady().then(() => app.mount('#app'));

// 在导航期间每次发生未捕获的错误时都会调用该处理程序
// eslint-disable-next-line no-console
router.onError((err) => { console.error(err); });
