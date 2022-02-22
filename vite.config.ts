/*
 * @Author: GeekQiaQia
 * @Date: 2022-02-18 16:13:43
 * @LastEditTime: 2022-02-22 15:02:10
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /vue3.0-template-admin/vite.config.ts
 */
import path from 'path'
import { ConfigEnv, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const pathSrc = path.resolve(__dirname, 'src')

const CWD = process.cwd()

// https://cn.vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_BASE_URL } = loadEnv(mode, CWD)

  return {
    base: VITE_BASE_URL, // 设开发或生产环境服务的 公共基础路径
    define: {
      // 类型： Record<string, string> 定义全局变量替换方式。每项在开发时会被定义为全局变量，而在构建时则是静态替换。
      'process.platform': null,
      'process.version': null
    },
    resolve: {
      // 类型：Record<string, string> | Array<{ find: string | RegExp, replacement: string }> 将会被传递到 @rollup/plugin-alias 作为它的 entries。
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'] // 类型： string[] 导入时想要省略的扩展名列表。
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ],
        dts: path.resolve(pathSrc, 'components.d.ts')
      }),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      })
    ],
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层

      // 服务配置
      port: 3000, // 类型： number 指定服务器端口;
      open: true, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      proxy: {
        // 类型： Record<string, string | ProxyOp 为开发服务器配置自定义代理规则
        '/api': {
          target: 'http://106.12.45.247:3000/',
          changeOrigin: true,
          secure: false,
          // eslint-disable-next-line no-shadow
          rewrite: (path) => path.replace('/api', '')
        }
      }
    },
    optimizeDeps: {
      include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en']
    }
    // https://www.vitejs.net/config/#build-commonjsoptions
  }
}
