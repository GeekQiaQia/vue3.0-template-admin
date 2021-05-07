# 常见问题：

## 问题1：
* `vite.config.ts` 中 __dirname 提示未定义；
* 此时在文件中通过通配符 `@` 引用文件，提示无法找到相对路径；
```
 resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src'),
    },
  },

```
### 解决：
`process ` 和 `__dirname` 都是node.js的全局定义变量；重新安装node包即可；

        npm i @types/node


## 问题2：
```
Unexpected use of file extension "vue" for "@/components/Breadcrumb/index.vue"eslintimport/extensions
```

## 问题3：
在 app.vue文件执行 store.dispatch 进行异步路由注入（动态添加路由），F5刷新页面后无法匹配到对应路由，
```
现在所有的路由都是异步，需要等待路由 ready以后再挂载程序；在注册路由之前进行异步路由处理；
main.ts
// 在挂载路由之前，先进行异步路由处理
store.dispatch('permissionModule/getPermissonRoutes');
```
