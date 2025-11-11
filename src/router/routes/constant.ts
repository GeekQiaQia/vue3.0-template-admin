import { RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue'

/**
 * 静态路由配置
 * 这些路由不需要权限验证，所有用户都可以访问
 */
const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: layout,
    redirect: '/home',
    meta: {
      title: {
        '/zh-CN': '首页',
        '/en-US': 'Home Page'
      },
      icon: 'ic ic-homepage-fill'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/home.vue'),
        meta: {
          title: {
            '/zh-CN': '首页',
            '/en-US': 'Home Page'
          },
          icon: 'ic ic-homepage-fill'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/index.vue'),
    meta: {
      title: {
        '/zh-CN': '登录',
        '/en-US': 'Login'
      },
      hidden: true,
      hiddenTab: true
    }
  },
  {
    path: '/noFound',
    name: 'NoFound',
    component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
    meta: {
      title: {
        '/zh-CN': '404',
        '/en-US': '404'
      },
      hidden: true,
      hiddenTab: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
    meta: {
      title: {
        '/zh-CN': '未找到',
        '/en-US': 'NOT FOUND'
      },
      hidden: true,
      hiddenTab: true
    }
  }
]

export default constantRoutes
