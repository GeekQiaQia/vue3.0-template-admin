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
    path: '/login',
    name: '登录',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login.vue'),
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/noFound',
    name: 'NoFound',
    component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
    meta: {
    title: 'not-found',
    hidden: true,
  }, },
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
    redirect: '/edit/copyText',
    meta: {
      title: '复制文本',
      icon: 'el-icon-edit-outline',
    },
    children: [
      {
        path: '/edit/copyText',
        name: 'copyText',
        component: () => import(/* webpackChunkName: "richText" */ '@/views/CopyText/index.vue'),
        meta: {
          title: '复制文本',
          icon: 'home',
        },
      },
    ],
  },



  {
    path: '/table',
    component: layout,
    redirect: '/table/tableList',
    meta: {
      title: '列表页',
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
      title: '表单页',
      icon: 'el-icon-s-grid',
    },
    children: [
      {
        path: '/form/formInfo',
        name: 'formInfo',
        component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/Form/formInfo.vue'),
        meta: {
          title: '基础表单',
          icon: 'el-icon-s-grid',

        },
      },
      {
        path: '/form/stepForm',
        name: 'stepForm',
        component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/Form/stepForm.vue'),
        meta: {
          title: '分步表单',
          icon: 'el-icon-s-grid',

        },
      },
      {
        path: '/form/advanceForm',
        name: 'advanceForm',
        component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/Form/advanceForm.vue'),
        meta: {
          title: '高级表单',
          icon: 'el-icon-s-grid',

        },
      },
    ],
  },
  {
    path: '/qrcode',
    component: layout,
    redirect: '/qrcode/qrcodeGen',
    meta: {
      title: '二维码',
      icon: 'el-icon-c-scale-to-original',
    },
    children: [
      {
        path: '/qrcode/qrcodeGen',
        name: 'qrcodeGen',
        component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/qrcode/qrcodeGen.vue'),
        meta: {
          title: '二维码',
          icon: 'el-icon-c-scale-to-original',
        },
      }
    ],
  },
  {
    path: '/personal',
    component: layout,
    redirect: '/personal/personalCenter',
    meta: {
      title: '个人页',
      icon: 'el-icon-user-solid',
    },
    children: [
      {
        path: '/personal/personalCenter',
        name: 'personalCenter',
        component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/Personal/personalCenter.vue'),
        meta: {
          title: '个人中心',
          icon: 'el-icon-user-solid',

        },
      },
      {
        path: '/personal/personalSetting',
        name: 'personalSetting',
        component: () => import(/* webpackChunkName: "personalSetting" */ '@/views/Personal/personalSetting.vue'),
        meta: {
          title: '个人设置',
          icon: 'el-icon-user-solid',

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
