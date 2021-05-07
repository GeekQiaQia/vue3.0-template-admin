import {
  createRouter, createWebHashHistory, RouteRecordRaw,
} from 'vue-router';

import layout from '../layout/index.vue';
// 静态路由
export const constantRoutes: Array<RouteRecordRaw> = [

  {
    path: '/',
    component: layout,
    redirect: '/home',
    meta: {
      title: '首页',
      icon: 'el-icon-s-home',
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue'),
        meta: {
          title: '首页',
          icon: 'home',
        },
      },
    ],
  },
  {
    path: '/noFound',
    name: 'NoFound',
    component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
    meta: {
      title: '首页',
      icon: 'home',
      hidden: true,
    },
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue') },
];

// 异步路由
export const asyncRoutes:Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    component: layout,
    redirect: '/dashboard/workplace',
    meta: {
      title: 'Dashboard',
      icon: 'el-icon-data-analysis',
    },
    children: [
      {
        path: '/dashboard/workplace',
        name: 'workplace',
        component: () => import(/* webpackChunkName: "richText" */ '@/views/Dashboard/workplace.vue'),
        meta: {
          title: '工作台',
          icon: 'home',
        },
      },
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        component: () => import(/* webpackChunkName: "richText" */ '@/views/Dashboard/analysis.vue'),
        meta: {
          title: '分析页',
          icon: 'home',
        },
      },
    ],
  },
  {
    path: '/edit',
    component: layout,
    redirect: '/edit/richText',
    meta: {
      title: '富文本',
      icon: 'el-icon-edit-outline',
    },
    children: [
      {
        path: '/edit/richText',
        name: 'richText',
        component: () => import(/* webpackChunkName: "richText" */ '@/views/RichText/index.vue'),
        meta: {
          title: '富文本',
          icon: 'home',
        },
      },
    ],
  },

  {
    path: '/personal',
    component: layout,
    redirect: '/personal/personalCenter',
    meta: {
      title: '个人中心',
      icon: 'el-icon-user-solid',
    },
    children: [
      {
        path: '/personal/personalCenter',
        name: 'personalCenter',
        component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/PersonalCenter/index.vue'),
        meta: {
          title: '个人中心',
          icon: 'el-icon-user-solid',

        },
      },
    ],
  },

  {
    path: '/table',
    component: layout,
    redirect: '/table/tableList',
    meta: {
      title: 'Table',
      icon: 'el-icon-folder-opened',
    },
    children: [
      {
        path: '/table/tableList',
        name: 'tableList',
        component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/Table/tableList.vue'),
        meta: {
          title: '表格',
          icon: 'el-icon-folder-opened',

        },
      },
    ],
  },

  {
    path: '/form',
    component: layout,
    redirect: '/form/formInfo',
    meta: {
      title: 'Form',
      icon: 'el-icon-document',
    },
    children: [
      {
        path: '/form/formInfo',
        name: 'formInfo',
        component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/Form/formInfo.vue'),
        meta: {
          title: '表单',
          icon: 'el-icon-document',

        },
      },
    ],
  },

];

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  scrollBehavior: () => ({
    top: 0,
  }),
  routes: constantRoutes,

});

export default router;
