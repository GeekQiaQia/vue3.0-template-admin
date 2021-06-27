<template>
  <section class="app-main">
    <el-tabs id="Tabs" v-model="currentIndex" type="card" closable @tab-click="clickTab" @tab-remove="removeTab">
      <el-tab-pane v-for="item in tabsOption" :key="item.route" :closable="item.route !== '/home'" :label="item.title" :name="item.route">
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
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store/index'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AppMain',
  setup() {
    // store 中获取当前路由以及所有的路由对象；
    const store = useStore()
    const tabsOption = computed(() => store.getters['tabModule/getTabsOption'])
    console.log('tabsOption.value is ', tabsOption.value)
    const currentIndex = computed(() => store.getters['tabModule/getCurrentIndex'])
    const router = useRouter()
    // mothods
    /**
     * @description 移除tab
     * */
    const removeTab = (tabName: string) => {
      if (tabName === '/home') {
        return
      }
      store.commit('tabModule/DELETE_TAB', tabName)
      if (currentIndex.value === tabName) {
        if (tabsOption.value && tabsOption.value.length) {
          store.commit('tabModule/SET_TAB', tabsOption.value[tabsOption.value.length - 1].route)
          router.replace({ path: currentIndex.value })
        } else {
          router.replace({ path: '/' })
        }
      }
    }
    /**
     * @description 点击tab
     */
    const clickTab = (tabName: { paneName: string }) => {
      // eslint-disable-next-line no-console
      store.commit('tabModule/SET_TAB', tabName.paneName)
      router.replace({ path: currentIndex.value })
    }
    return {
      tabsOption,
      currentIndex,
      removeTab,
      clickTab
    }
  }
})
</script>
<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: white;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
