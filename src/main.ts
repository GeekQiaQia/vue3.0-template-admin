/*
 * @Author: GeekQiaQia
 * @Date: 2022-02-18 16:13:43
 * @LastEditTime: 2022-02-21 17:43:37
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /test-vue3/src/main.ts
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import { key, store } from './store/index'
import router from './router/index'
import { isPermission } from './directive/permission'
import logger from '@/utils/logger'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'

import '@/mock'

const roles = localStorage.getItem('role')

if (roles) {
  // 在挂载路由之前，先进行异步路由处理
  store.dispatch('permissionModule/getPermissonRoutes', { roleName: roles })
}

store.dispatch('permissionModule/getRoutes')

// 链式注册插件
const app = createApp(App).use(store, key).use(router).use(ElementPlus, { locale: zhCn })
// 挂载全局方法 isPermission
app.config.globalProperties.$isPermission = isPermission
// 现在所有的导航都是异步的，等路由ready以后再进行挂载组件；
router.isReady().then(() => app.mount('#app'))

// 在导航期间每次发生未捕获的错误时都会调用该处理程序
router.onError((err) => {
  logger.error('Router error:', err)
})
