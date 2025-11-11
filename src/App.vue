<!--
 * @Author: GeekQiaQia
 * @Date: 2022-02-18 16:13:43
 * @LastEditTime: 2022-04-28 11:14:35
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /github/vue3.0-template-admin/src/App.vue
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
import zhLocale from 'element-plus/es/locale/lang/zh-cn'
import enLocale from 'element-plus/es/locale/lang/en'
import { computed, onMounted } from 'vue'
import { useStore } from '@/store/index'
import { useWindowResize } from '@/hooks/useWindowResize'

const store = useStore()

// 计算表格高度的函数
const calculateTableHeight = () => {
  const { clientHeight } = document.documentElement || document.body
  const height = Math.max(600, clientHeight - 170)
  store.commit('settingsModule/setTableHeight', height)
}

// 使用响应式窗口变化 Hook
useWindowResize(calculateTableHeight, 200)

onMounted(() => {
  // 初始化权限
  store.dispatch('permissionModule/getPermissions')
  
  // 初始化表格高度
  calculateTableHeight()
})

// 国际化locale配置
const locale = computed(() => {
  const langState = store.getters['settingsModule/getLangState']
  return langState === '/zh-CN' ? zhLocale : enLocale
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
