import { createApp } from 'vue'
import App from './App.vue'

// 挂载路由
import router from './router/index'
// 挂载vuex
import store from './store/index'
// 挂载 elementPlus UI;
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

// 链式注册插件
createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus)
    .mount('#app')
