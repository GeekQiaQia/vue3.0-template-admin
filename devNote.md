# 开发笔记-常见问题：

编辑器：vscode；

## 问题 1：

### 现象

> `vite.config.ts` 中 \_\_dirname 提示未定义；
> 此时在文件中通过通配符 `@` 引用文件，提示无法找到相对路径；

```
 resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src'),
    },
  },

```

### 解决方案：

`process ` 和 `__dirname` 都是 node.js 的全局定义变量；重新安装 node 包即可；

        npm i @types/node

## 问题 2：

```
Unexpected use of file extension "vue" for "@/components/Breadcrumb/index.vue"eslintimport/extensions
```

## 问题 3：

### 现象：

> 在 app.vue 文件执行 store.dispatch 进行异步路由注入（动态添加路由），F5 刷新页面后无法匹配到对应路由，

### 原因

```
现在所有的路由都是异步，需要等待路由 ready以后再挂载程序；在注册路由之前进行异步路由处理；
```

### 解决方案：

```
main.ts
// 在挂载路由之前，先进行异步路由处理
store.dispatch('permissionModule/getPermissonRoutes');
```

## 问题 4：

### 现象：

> Cannot find module '@/store/index' or its corresponding type declarations.Vetur(2307)

### 原因：

```
//app.vue
 vetur 读取tsconfig.json 配置文件，需要在tsconfig.json中配置path别名
```

### 解决方案：

```
tsconfig.json

"paths": {
      "@/*": ["src/*"]
    }

```

## 问题 5：eslint-plugin-vue 与 Prettier 冲突

### 现象：

> Prettier 和 eslint 设置的规则冲突

### 解决方案：举例

```
module.exports = {
  // ...
  extends: [
    // ...
    // 'eslint:recommended',
    // ...
    'plugin:vue/vue3-recommended',
    // ...
    "prettier"
    // Make sure "prettier" is the last element in this list.
  ],
  // ...
}
```

## 问题 11： ElementUI 国际化处理

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b2568fdd7134016bb468791fbfc89b8~tplv-k3u1fbpfcp-watermark.image)

### 现象：

> elementUI 组件默认英文

### 解决方案：

```
import ElementPlus from 'element-plus'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

createApp(App).use(ElementPlus, { locale })

```

## 问题 12 :修改配置项，ctrl+s 保存即执行代码格式化

### 现象：

> ctrl+s 保存当前失去了格式化效果

### 解决方案：举例

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b21c19141a64e47be8d49d6963fe09a~tplv-k3u1fbpfcp-watermark.image)

```
{
    "eslint.format.enable": true,
    "editor.formatOnSave": true
}

```

## 问题 12 : stylus 样式格式化

### 解决方案：举例

#### 格式化 Stylus 文件

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e04d5f4153d45aea5ec0fa09c95a4c3~tplv-k3u1fbpfcp-watermark.image)

> 在项目根目录创建`set.json`

```
{
"stylusSupremacy.insertColons": true,
"stylusSupremacy.insertSemicolons": false,
"stylusSupremacy.insertBraces": false,
"stylusSupremacy.insertNewLineAroundImports": false,
"stylusSupremacy.insertNewLineAroundBlocks":false
}

```

## 问题 13 Uncaught ReferenceError: process is not defined

### 场景

在.vue 文件中使用 node 环境的模块
import { resolve } from 'path'
// 报错：Uncaught ReferenceError: process is not defined

### 解决方案

[vue-next issue](https://github.com/vuejs/vue-next/issues/2154)
[vite issue](https://github.com/vitejs/vite/issues/2723)
[fix-merge](https://github.com/ipfs/js-ipfs-bitswap/pull/342)
vite.config.ts

```
//dev
 define: {
   'process.platform': null,
   'process.version': null,
  },

```

## 问题 14 Uncaught TypeError: Cannot read property 'constant' of undefined

### 场景

引入 antv 相关组件，使用 npm run build 以后，打开 index 页面，在运行中报错：
// 报错：Uncaught TypeError: Cannot read property 'constant' of undefined

### 解决方案

// https://github.com/rollup/plugins/tree/master/packages/commonjs
vite 在执行 npm run build 的时候，使用 rollup 打包，在有些模块中存在 commonJS 和 esModule 混合存在的场景，
// https://www.vitejs.net/config/#build-commonjsoptions

#### 使用场景

有些 require 调用不能被静态的解析为 imports

```
 build:{
    commonjsOptions:{
      ignoreDynamicRequires:false, // Default: false
    }
  },

```

# 待处理

## 问题 8：

> vite 修改 data 以后没有刷新数据；修改组件参数，并没有更新视图

### 原因：

### 优化：

## 问题 9：

> 添加修改元素属性 css 样式 等； vite 进行热更新，template 没有重新渲染， // example : icon="el-icon-edit"

```html
<el-button size="mini" icon="el-icon-edit"> </el-button>
```

## 问题 10： 错误提示不友好

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a07ce8d1bea437685e16dbb12c28464~tplv-k3u1fbpfcp-watermark.image)

## 问题 11： vue3 语法改变

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eae4d702a29d4211b6f33f469029d619~tplv-k3u1fbpfcp-watermark.image)

```html
<!-- <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>

    <transition name="fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition> -->
```

```html
<router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
  <transition name="fade" mode="out-in">
    <component :is="Component" />
  </transition>
</router-view>

<router-view v-if="!$route.meta.keepAlive" v-slot="{ Component }">
  <transition name="fade" mode="out-in">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </transition>
</router-view>
```

## 问题 12： hot

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/627a906b1b1b4088ba927f9db007b816~tplv-k3u1fbpfcp-watermark.image)

## 问题 13：hot module

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df4e74f57ee24d2db09fe39d2fbdc17e~tplv-k3u1fbpfcp-watermark.image)

## cjs default

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e13a67abd5f4f1c9eb075024f792856~tplv-k3u1fbpfcp-watermark.image)
