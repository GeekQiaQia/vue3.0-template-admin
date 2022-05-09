declare type formulaType = {
  [key: string]: any
}
export const formula: formulaType = {
  'shade-1': 'color(primary shade(10%))',
  'light-1': 'color(primary tint(10%))',
  'light-2': 'color(primary tint(20%))',
  'light-3': 'color(primary tint(30%))',
  'light-4': 'color(primary tint(40%))',
  'light-5': 'color(primary tint(50%))',
  'light-6': 'color(primary tint(60%))',
  'light-7': 'color(primary tint(70%))',
  'light-8': 'color(primary tint(80%))',
  'light-9': 'color(primary tint(90%))'
}

export const langConfig = {
  header: {
    switch: {
      '/zh-CN': '切换主题色',
      '/en-US': 'Change Theme Color'
    },
    download: {
      '/zh-CN': '下载主题',
      '/en-US': 'Download Theme'
    },
    help: {
      '/zh-CN': '帮助',
      '/en-US': 'Help'
    },
    fullScreen: {
      '/zh-CN': '全屏预览',
      '/en-US': 'Full Screen'
    },
    exitFullScreen: {
      '/zh-CN': '退出全屏',
      '/en-US': 'Exit FullScreen'
    },
    user: {
      homePage: {
        '/zh-CN': '首页',
        '/en-US': 'HomePage'
      },
      personalCenter: {
        '/zh-CN': '个人中心',
        '/en-US': 'Personal Center'
      },
      personalSetting: {
        '/zh-CN': '个人设置',
        '/en-US': 'Personal Setting'
      },
      logout: {
        '/zh-CN': '退出登录',
        '/en-US': 'Logout'
      }
    }
  },
  form: {
    theme: {
      '/zh-CN': '主题色',
      '/en-US': 'Theme color'
    },
    headerArea: {
      '/zh-CN': '顶栏',
      '/en-US': 'Header Area'
    },
    sidebarLogo: {
      '/zh-CN': '侧边栏 logo',
      '/en-US': 'sidebar logo'
    },
    headerFixed: {
      '/zh-CN': '固定顶栏',
      '/en-US': 'Header Fixed'
    },
    switch: {
      '/zh-CN': '切换',
      '/en-US': 'Change'
    },
    reset: {
      '/zh-CN': '重置',
      '/en-US': 'Reset'
    }
  },
  home: {
    internationTip: {
      '/zh-CN': '切换语言可进行国际化',
      '/en-US': 'change Lang for internationalization'
    }
  },
  breadcrumb: {
    main: {
      '/zh-CN': '首页',
      '/en-US': 'Main'
    },
    project: {
      '/zh-CN': '项目',
      '/en-US': 'Project'
    }
  }
}

export default { formula, langConfig }
