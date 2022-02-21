<!--
 * @Author: GeekQiaQia
 * @Date: 2022-02-18 16:13:43
 * @LastEditTime: 2022-02-21 14:28:20
 * @LastEditors: GeekQiaQia
 * @Description: 
 * @FilePath: /test-vue3/src/App.vue
-->
<template>
   <el-config-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
   </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import enLocale from 'element-plus/lib/locale/lang/en'
import { computed, onMounted } from 'vue'
import { useStore } from '@/store/index'

    const store = useStore()
    const resizeHeight = () => {
      const { clientHeight } = document.body // 获取文档可视区域的宽度
      const height = Math.max(600, clientHeight - 170) // 保证最小值大于600
      store.commit('settingsModule/setTableHeight', height) // 设置tableHeight
    }
    onMounted(() => {
      store.dispatch('permissionModule/getPermissions')
    })
    resizeHeight()
    const locale = computed(() => {
      const langState = store.getters['settingsModule/getLangState']
      const local = langState === '/zh-CN' ? zhLocale : enLocale
      return local
    })
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.element-plus-logo {
  width: 50%;
}
</style>
