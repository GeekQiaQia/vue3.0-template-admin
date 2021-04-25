import { defineConfig, resolveConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// npm i --save-dev @types/path  not found
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  base: './', // 设置打包路径
  server: {
    // 服务配置
    port: 4399, // 设置服务器启动端口
    open: true, // 设置服务器启动自动打开浏览器；
    cors: true // 允许跨域
  }
})
