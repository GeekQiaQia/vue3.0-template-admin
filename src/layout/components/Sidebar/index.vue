<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :router="true"
        :unique-opened="false"
        :default-active="activeMenu"
        class="el-menu-vertical"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
      >
        <!--递归路由对象-->
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { isExternal } from '@/utils/validate'
import sidebarItem from '@/layout/components/Sidebar/sidebarItem.vue'
import logo from './Logo.vue'
import { useStore } from '../../../store/index'

export default defineComponent({
  components: {
    logo,
    sidebarItem
  },
  setup() {
    const router = useRouter()

    const store = useStore()
    const isCollapse = computed(() => !store.getters['appModule/getSidebarState'])
    const showLogo = computed(() => store.state.settingsModule.sideBarLogo)
    const routes = computed(() => store.state.permissionModule.accessRoutes)
    const activeMenu = computed(() => router.currentRoute.value.fullPath)

    onMounted(() => {
      console.log('activeMenu.value', activeMenu.value)
    })
    // mothods
    const handleOpen = (key: any, keyPath: any) => {
      // eslint-disable-next-line no-console
      console.log('key is ', key)
      console.log('keyPath is ', keyPath)
    }
    const handleClose = (key: any, keyPath: any) => {
      // eslint-disable-next-line no-console
      console.log(key, keyPath)
    }
    const handleSelect = (key: any) => {
      console.log('handleSelect is ', key)
      router.replace({ path: key })
    }
    // methods
    // eslint-disable-next-line consistent-return
    const resolvePath = (routePath: string) => {
      if (isExternal(routePath)) {
        return routePath
      }
    }
    return {
      activeMenu,
      resolvePath,
      routes,
      showLogo,
      isCollapse,
      handleOpen,
      handleClose,
      handleSelect
    }
  }
})
</script>
<style lang="stylus" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  text-align:left;
}
</style>
