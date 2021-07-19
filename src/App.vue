<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from '@/store/index'

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const store = useStore()
    // methods
    // 改变tableHeight的大小
    const resizeHeight = () => {
      const { clientHeight } = document.body // 获取文档可视区域的宽度
      const height = Math.max(600, clientHeight - 170) // 保证最小值大于600
      store.commit('settingsModule/setTableHeight', height) // 设置tableHeight
    }
    onMounted(() => {
      store.dispatch('permissionModule/getPermissions')
    })
    resizeHeight()
    return {}
  }
  // watch: {
  //   $route(to, from) {
  //     // eslint-disable-next-line no-console
  //     console.log(to, from);
  //   },
  // },
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
</style>
