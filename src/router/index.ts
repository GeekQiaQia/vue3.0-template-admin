import {
  createRouter, createWebHashHistory, RouteRecordRaw,
} from 'vue-router';
import { store } from '@/store';
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
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/home.vue'),
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
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/index.vue'),
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
    path: '/guide',
    component: layout,
    redirect: '/guide/guide',
    meta: {
      title: '引导页',
      icon: 'el-icon-guide',
    },
    children: [
      {
        path: '/guide/guide',
        name: 'guide',
        component: () => import('@/views/Guide/index.vue'),
        meta: {
          title: '引导',
          icon: 'el-icon-guide',
        },
      }
    ],
  },
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
    path: '/copy',
    component: layout,
    redirect: '/copy/copyText',
    meta: {
      title: '复制文本',
      icon: 'el-icon-edit-outline',
    },
    children: [
      {
        path: '/copy/copyText',
        name: 'copyText',
        component: () => import( '@/views/CopyText/index.vue'),
        meta: {
          title: '复制文本',
          icon: 'home',
        },
      },
    ],
  },
  {
    path: '/excel',
    component: layout,
    redirect: '/excel/uploadExcel',
    meta: {
      title: 'Excel',
      icon: 'el-icon-edit-outline',
    },
    children: [
      {
        path: '/excel/uploadExcel',
        name: 'uploadExcel',
        component: () => import( '@/views/Excel/uploadExcel.vue'),
        meta: {
          title: '上传excel',
          icon: 'home',
        },
      },
      {
        path: '/excel/exportExcel',
        name: 'exportExcel',
        component: () => import( '@/views/Excel/exportExcel.vue'),
        meta: {
          title: '导出excel',
          icon: 'home',
        },
      },
    ],
  },
  {
    path: '/zip',
    component: layout,
    redirect: '/zip/exportZip',
    meta: {
      title: 'Zip',
      icon: 'el-icon-folder',
    },
    children: [
      {
        path: '/zip/exportZip',
        name: 'exportZip',
        component: () => import( '@/views/Zip/exportZip.vue'),
        meta: {
          title: '导出zip',
          icon: 'el-icon-folder',
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
    path: '/dragable',
    component: layout,
    redirect: '/dragable/dragableComponent',
    meta: {
      title: '拖拽组件',
      icon: 'el-icon-s-promotion',
    },
    children: [
      {
        path: '/dragable/dragableComponent',
        name: 'dragableComponent',
        component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/dragable/dragableComponent.vue'),
        meta: {
          title: '拖拽组件',
          icon: 'el-icon-s-promotion',
        },
      }
    ],
  },
  {
    path: '/editor',
    component: layout,
    redirect: '/Editor/editorComponent',
    meta: {
      title: '编辑器组件',
      icon: 'el-icon-edit',
    },
    children: [
      {
        path: '/Editor/markdownEditor',
        name: 'markdownEditor',
        component: () => import( '@/views/Editor/markdownEditor.vue'),
        meta: {
          title: 'markdown编辑器',
          icon: 'el-icon-edit',
        },
      },
      {
        path: '/Editor/richEditor',
        name: 'richEditor',
        component: () => import( '@/views/Editor/richEditor.vue'),
        meta: {
          title: '富文本编辑器',
          icon: 'el-icon-edit',
        },
      },
      {
        path: '/Editor/jsonEditor',
        name: 'jsonEditor',
        component: () => import( '@/views/Editor/jsonEditor.vue'),
        meta: {
          title: 'json编辑器',
          icon: 'el-icon-edit',
        },
      }
    ],
  },
  // {
  //   path: '/permission',
  //   component: layout,
  //   redirect: '/permission/permission',
  //   meta: {
  //     title: '权限',
  //     icon: 'el-icon-c-scale-to-original',
  //   },
  //   children: [
  //     {
  //       path: '/permission/permission',
  //       name: 'permission',
  //       component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/permission/permission.vue'),
  //       meta: {
  //         title: '权限',
  //         icon: 'el-icon-c-scale-to-original',
  //       },
  //     }
  //   ],
  // },

  {
    path: '/upload',
    component: layout,
    redirect: '/upload/uploadFile',
    meta: {
      title: '文件上传',
      icon: 'el-icon-upload',
    },
    children: [
      {
        path: '/upload/uploadFile',
        name: 'uploadFile',
        component: () => import(/* webpackChunkName: "richText" */ '@/views/Upload/uplodFile.vue'),
        meta: {
          title: '文件上传',
          icon: 'home',
        },
      },
    ],
  },
  {
    path: '/cropper',
    component: layout,
    redirect: '/cropper/cropFile',
    meta: {
      title: '图片裁剪',
      icon: 'ic ic-tailor',
    },
    children: [
      {
        path: '/cropper/cropFile',
        name: 'cropFile',
        component: () => import(/* webpackChunkName: "richText" */ '@/views/Cropper/cropFile.vue'),
        meta: {
          title: '图片裁剪',
          icon: 'ic ic-tailor',
        },
      },
    ],
  },
  {
    path: '/menu',
    component: layout,
    redirect: '/Menu/menuEdit',
    meta: {
      title: '菜单管理',
      icon: 'ic ic-other',
    },
    children: [
      {
        path: '/Menu/menuEdit',
        name: 'menuEdit',
        component: () => import(/* @/views/Menu/menuManage.vueichText" */ '@/views/Menu/menuManage.vue'),
        meta: {
          title: '菜单管理',
          icon: 'ic ic-other',
        },
      },
    ],
  },
  {
    path: '/role',
    component: layout,
    redirect: '/Role/roleManage',
    meta: {
      title: '角色管理',
      icon: 'ic ic-other',
    },
    children: [
      {
        path: '/Role/roleManage',
        name: 'roleManage',
        component: () => import(/* @/views/Menu/menuManage.vueichText" */ '@/views/Role/rolesManage.vue'),
        meta: {
          title: '角色管理',
          icon: 'ic ic-other',
        },
      },
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
router.beforeEach((to, from, next) => {
    const tabsOption = store.getters['tabModule/getTabsOption']
    // 判断当前路由中是否已经入栈
    const flag = tabsOption.findIndex((tab: { route: string }) => tab.route === to.fullPath) > -1
    if (!flag && !to.meta.hidden) {

      store.commit('tabModule/ADD_TAB', { route: to.fullPath, title: to.meta.title,name: to.name })

        }
    store.commit('tabModule/SET_TAB', to.fullPath)
  if(sessionStorage.getItem('auth')){
    next();
  }else if(to.path==='/login'){
    console.log("/login");
    next();
  }else{
    console.log('unauthed into login');
         next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
  }


});


export default router;
