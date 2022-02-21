import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { store } from '../store'
import layout from '../layout/index.vue'
// 静态路由
export const constantRoutes: Array<RouteRecordRaw> = [
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
    name: '登录',
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
    name: 'not-found',
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

// 异步路由
// 异步路由
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/guide',
    component: layout,
    redirect: '/guide/guide',
    meta: {
      title: {
        '/zh-CN': '引导页',
        '/en-US': 'Guide Page'
      },
      icon: 'ic ic-coordinates-fill'
    },
    children: [
      {
        path: '/guide/guide',
        name: 'guide',
        component: () => import('@/views/Guide/index.vue'),
        meta: {
          title: {
            '/zh-CN': '引导',
            '/en-US': 'Guide'
          },
          icon: 'ic ic-coordinates-fill'
        }
      }
    ]
  },
  {
    path: '/dashboard',
    component: layout,
    redirect: '/dashboard/workplace',
    meta: {
      title: {
        '/zh-CN': '仪表盘',
        '/en-US': 'Dashboard'
      },
      icon: 'ic ic-manage-fill'
    },
    children: [
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        component: () => import(/* webpackChunkName: "richText" */ '@/views/Dashboard/analysis.vue'),
        meta: {
          title: {
            '/zh-CN': '分析页',
            '/en-US': 'Analysis Page'
          },
          icon: 'el-icon-data-analysis',
          hidden: false,
          hiddenTab: false
        }
      },
      {
        path: '/dashboard/workplace',
        name: 'workplace',
        component: () => import(/* webpackChunkName: "richText" */ '@/views/Dashboard/workplace.vue'),
        meta: {
          title: {
            '/zh-CN': '工作台',
            '/en-US': 'Workplace'
          },
          icon: 'el-icon-data-analysis'
        }
      }
    ]
  },
  {
    path: '/dragable',
    component: layout,
    redirect: '/dragable/dragableComponent',
    meta: {
      title: {
        '/zh-CN': '拖拽组件',
        '/en-US': 'Dragable Component'
      },
      icon: 'ic ic-flip-fill'
    },
    children: [
      {
        path: '/dragable/dragableComponent',
        name: 'dragableComponent',
        component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/dragable/dragableComponent.vue'),
        meta: {
          title: {
            '/zh-CN': '拖拽组件',
            '/en-US': 'Dragable Component'
          },
          icon: 'ic ic-flip-fill'
        }
      }
    ]
  },
  {
    path: '/calendar',
    component: layout,
    redirect: '/calendar/index',
    meta: {
      title: {
        '/zh-CN': '日历',
        '/en-US': 'Calendar'
      },
      icon: 'ic ic-workbench'
    },
    children: [
      {
        path: '/calendar/index',
        name: 'Calendar',
        component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/Calendar/index.vue'),
        meta: {
          title: {
            '/zh-CN': '日历',
            '/en-US': 'Calendar'
          },
          icon: 'ic ic-workbench'
        }
      }
    ]
  },
  {
    path: '/copy',
    component: layout,
    redirect: '/copy/copyText',
    meta: {
      title: {
        '/zh-CN': '复制文本',
        '/en-US': 'Copy Text'
      },
      icon: 'ic ic-text'
    },
    children: [
      {
        path: '/copy/copyText',
        name: 'copyText',
        component: () => import('@/views/CopyText/index.vue'),
        meta: {
          title: {
            '/zh-CN': '复制文本',
            '/en-US': 'Copy Text'
          },
          icon: 'ic ic-text'
        }
      }
    ]
  },
  {
    path: '/zip',
    component: layout,
    redirect: '/zip/exportZip',
    meta: {
      title: {
        '/zh-CN': 'Zip',
        '/en-US': 'Zip'
      },
      icon: 'ic ic-tasklist-fill'
    },
    children: [
      {
        path: '/zip/exportZip',
        name: 'exportZip',
        component: () => import('@/views/Zip/exportZip.vue'),
        meta: {
          title: {
            '/zh-CN': '导出zip',
            '/en-US': 'Export Zip'
          },
          icon: 'ic ic-tasklist-fill'
        }
      }
    ]
  },
  {
    path: '/role',
    component: layout,
    redirect: '/Role/roleManage',
    meta: {
      title: {
        '/zh-CN': '角色管理',
        '/en-US': 'Role Manage'
      },
      icon: 'ic ic-group-fill'
    },
    children: [
      {
        path: '/Role/roleManage',
        name: 'roleManage',
        component: () => import(/* @/views/Menu/menuManage.vueichText" */ '@/views/Role/rolesManage.vue'),
        meta: {
          title: {
            '/zh-CN': '角色管理',
            '/en-US': 'Role Manage'
          },
          icon: 'ic ic-group-fill'
        }
      }
    ]
  },
  {
    path: '/menu',
    component: layout,
    redirect: '/Menu/menuEdit',
    meta: {
      title: {
        '/zh-CN': '菜单管理',
        '/en-US': 'Menu Manage'
      },
      icon: 'ic ic-other'
    },
    children: [
      {
        path: '/Menu/menuEdit',
        name: 'menuEdit',
        component: () => import(/* @/views/Menu/menuManage.vueichText" */ '@/views/Menu/menuManage.vue'),
        meta: {
          title: {
            '/zh-CN': '菜单管理',
            '/en-US': 'Menu Manage'
          },
          icon: 'ic ic-other'
        }
      }
    ]
  },
  {
    path: '/excel',
    component: layout,
    redirect: '/excel/uploadExcel',
    meta: {
      title: {
        '/zh-CN': 'Excel',
        '/en-US': 'Excel'
      },
      icon: 'ic ic-order-fill'
    },
    children: [
      {
        path: '/excel/uploadExcel',
        name: 'uploadExcel',
        component: () => import('@/views/Excel/uploadExcel.vue'),
        meta: {
          title: {
            '/zh-CN': '上传excel',
            '/en-US': 'Upload Excel'
          },
          icon: 'ic ic-order-fill'
        }
      },
      {
        path: '/excel/exportExcel',
        name: 'exportExcel',
        component: () => import('@/views/Excel/exportExcel.vue'),
        meta: {
          title: {
            '/zh-CN': '导出excel',
            '/en-US': 'Export Excel'
          },
          icon: 'ic ic-order-fill'
        }
      }
    ]
  },
  {
    path: '/table',
    component: layout,
    redirect: '/table/tableList',
    meta: {
      title: {
        '/zh-CN': '列表页',
        '/en-US': 'Table Page'
      },
      icon: 'ic ic-barrage-fill'
    },
    children: [
      {
        path: '/table/tableList',
        name: 'tableList',
        component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/Table/tableList.vue'),
        meta: {
          title: {
            '/zh-CN': '表格',
            '/en-US': 'Table'
          },
          icon: 'ic ic-barrage-fill'
        }
      }
    ]
  },

  {
    path: '/form',
    component: layout,
    redirect: '/form/formInfo',
    meta: {
      title: {
        '/zh-CN': '表单页',
        '/en-US': 'Form Page'
      },
      icon: 'ic ic-stealth-fill'
    },
    children: [
      {
        path: '/form/formInfo',
        name: 'formInfo',
        component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/Form/formInfo.vue'),
        meta: {
          title: {
            '/zh-CN': '基础表单',
            '/en-US': 'Basic Form'
          },
          icon: 'ic ic-stealth-fill'
        }
      },
      {
        path: '/form/stepForm',
        name: 'stepForm',
        component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/Form/stepForm.vue'),
        meta: {
          title: {
            '/zh-CN': '分步表单',
            '/en-US': 'Step Form'
          },
          icon: 'ic ic-stealth-fill'
        }
      },
      {
        path: '/form/advanceForm',
        name: 'advanceForm',
        component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/Form/advanceForm.vue'),
        meta: {
          title: {
            '/zh-CN': '高级表单',
            '/en-US': 'Advance Form'
          },
          icon: 'ic ic-stealth-fill'
        }
      }
    ]
  },
  {
    path: '/qrcode',
    component: layout,
    redirect: '/qrcode/qrcodeGen',
    meta: {
      title: {
        '/zh-CN': '二维码',
        '/en-US': 'QRCode'
      },
      icon: 'ic ic-qrcode-fill'
    },
    children: [
      {
        path: '/qrcode/qrcodeGen',
        name: 'qrcodeGen',
        component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/qrcode/qrcodeGen.vue'),
        meta: {
          title: {
            '/zh-CN': '二维码',
            '/en-US': 'QRCode'
          },
          icon: 'ic ic-qrcode-fill'
        }
      }
    ]
  },
  {
    path: '/editor',
    component: layout,
    redirect: '/Editor/editorComponent',
    meta: {
      title: {
        '/zh-CN': '编辑器组件',
        '/en-US': 'Editor Component'
      },
      icon: 'ic ic-editor'
    },
    children: [
      {
        path: '/Editor/markdownEditor',
        name: 'markdownEditor',
        component: () => import('@/views/Editor/markdownEditor.vue'),
        meta: {
          title: {
            '/zh-CN': 'Markdown编辑器',
            '/en-US': 'Markdown Editor'
          },
          icon: 'ic ic-editor'
        }
      },
      {
        path: '/Editor/richEditor',
        name: 'richEditor',
        component: () => import('@/views/Editor/richEditor.vue'),
        meta: {
          title: {
            '/zh-CN': '富文本编辑器',
            '/en-US': 'Rich Editor'
          },
          icon: 'ic ic-editor'
        }
      },
      {
        path: '/Editor/jsonEditor',
        name: 'jsonEditor',
        component: () => import('@/views/Editor/jsonEditor.vue'),
        meta: {
          title: {
            '/zh-CN': 'Json 编辑器',
            '/en-US': 'Json Editor'
          },
          icon: 'ic ic-editor'
        }
      }
    ]
  },
  {
    path: '/cropper',
    component: layout,
    redirect: '/cropper/cropFile',
    meta: {
      title: {
        '/zh-CN': '图片裁剪',
        '/en-US': 'Crop Image'
      },
      icon: 'ic ic-tailor'
    },
    children: [
      {
        path: '/cropper/cropFile',
        name: 'cropFile',
        component: () => import(/* webpackChunkName: "richText" */ '@/views/Cropper/cropFile.vue'),
        meta: {
          title: {
            '/zh-CN': '图片裁剪',
            '/en-US': 'Crop Image'
          },
          icon: 'ic ic-tailor'
        }
      }
    ]
  },
  {
    path: '/personal',
    component: layout,
    redirect: '/personal/personalCenter',
    meta: {
      title: {
        '/zh-CN': '个人页',
        '/en-US': 'Personal Page'
      },
      icon: 'ic ic-people-fill'
    },
    children: [
      {
        path: '/personal/personalCenter',
        name: 'personalCenter',
        component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/Personal/personalCenter.vue'),
        meta: {
          title: {
            '/zh-CN': '个人中心',
            '/en-US': 'PersonalCenter'
          },
          icon: 'ic ic-people-fill'
        }
      },
      {
        path: '/personal/personalSetting',
        name: 'personalSetting',
        component: () => import(/* webpackChunkName: "personalSetting" */ '@/views/Personal/personalSetting.vue'),
        meta: {
          title: {
            '/zh-CN': '个人设置',
            '/en-US': 'PersonalSetting'
          },
          icon: 'ic ic-setup-fill'
        }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  scrollBehavior: () => ({
    top: 0
  }),
  routes: constantRoutes
})
router.beforeEach((to, from, next) => {
  const tabsOption = store.getters['tabModule/getTabsOption']
  // 判断当前路由中是否已经入栈
  const flag = tabsOption.findIndex((tab: { route: string }) => tab.route === to.path) > -1
  if (!flag && !to.meta.hiddenTab) {
    store.commit('tabModule/ADD_TAB', { route: to.path, title: to.meta.title, name: to.name })
  }
  store.commit('tabModule/SET_TAB', to.path)
  if (sessionStorage.getItem('auth')) {
    next()
  } else if (to.path === '/login') {
    console.log('/login')
    next()
  } else {
    console.log('unauthed into login')
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})

export default router
