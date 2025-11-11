import { createRouter, createWebHashHistory } from 'vue-router'
import { store } from '../store'
import { constantRoutes, asyncRoutes } from './routes'
import logger from '@/utils/logger'

// 导出路由配置供其他模块使用
export { constantRoutes, asyncRoutes }
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  scrollBehavior: () => ({
    top: 0
  }),
  routes: constantRoutes
})
/**
 * 路由前置守卫
 * 处理登录验证和标签页管理
 */
router.beforeEach((to, from, next) => {
  const tabsOption = store.getters['tabModule/getTabsOption']
  const isAuthenticated = sessionStorage.getItem('auth')
  
  // 判断当前路由中是否已经入栈
  const flag = tabsOption.findIndex((tab: { route: string }) => tab.route === to.path) > -1
  if (!flag && !to.meta.hiddenTab) {
    store.commit('tabModule/ADD_TAB', { route: to.path, title: to.meta.title, name: to.name })
  }
  store.commit('tabModule/SET_TAB', to.path)
  
  // 登录验证
  if (isAuthenticated) {
    next()
  } else if (to.path === '/login') {
    next()
  } else {
    logger.warn('Unauthorized access, redirecting to login')
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})

export default router
