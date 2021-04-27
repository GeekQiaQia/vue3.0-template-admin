import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
// eslint-disable-next-line import/no-unresolved

// 静态路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    meta: {
      title: '首页',
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'home',
        },
        component: () => import('@/views/home/home.vue'),
      },
    ],
  },
  {
    path: '/noFound',
    name: 'NoFound',
    component: () => import('@/views/noFound.vue'),
  },
];

// 异步路由
export const asyncRoutes:Array<RouteRecordRaw> = [];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
