const steps = [
    {
      element: '#Hamburger',
      popover: {
        title: 'Hamburger',
        description: '打开或关闭侧边栏',
        position: 'bottom'
      }
    },
    {
      element: '#Serach',
      popover: {
        title: 'Fuzzy Search',
        description: '关键词模糊搜索',
        position: 'bottom'
      }
    },
    {
        element: '#Message',
        popover: {
          title: 'Message Tip',
          description: '消息提醒,点击此处查看最近收到的消息',
          position: 'bottom'
        }
      },
      {
          element:'#fullScreen',
          popover: {
            title: 'fullScreen',
            description: '点击全屏浏览、按Esc即可退出全屏模式',
            position: 'bottom'
          }

      },
      {
        element:'#Tabs',
        popover: {
          title: 'Tabs Pane',
          description: '您可以点击选项卡，快速选择已经打开的路由页面',
          position: 'bottom'
        }

    }
  ]

  export default steps
