declare type formulaType={
    [key: string]: any;
}
 export const formula:formulaType =  {
    "shade-1": "color(primary shade(10%))",
    "light-1": "color(primary tint(10%))",
    "light-2": "color(primary tint(20%))",
    "light-3": "color(primary tint(30%))",
    "light-4": "color(primary tint(40%))",
    "light-5": "color(primary tint(50%))",
    "light-6": "color(primary tint(60%))",
    "light-7": "color(primary tint(70%))",
    "light-8": "color(primary tint(80%))",
    "light-9": "color(primary tint(90%))"
  }


export const langConfig =  {
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
      }
    },
    form: {
      theme: {
        '/zh-CN': '主题色',
        '/en-US': 'Theme color'
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
    breadcrumb: {
      main: {
        '/zh-CN': '首页',
        '/en-US': 'Main'
      },
      project: {
        '/zh-CN': '项目',
        '/en-US': 'Project'
      }
    },
  }

  export default {formula,langConfig}
