<template>
  <div   :class="classObj" class="app-wrapper">
     <Sidebar class="sidebar-container" />
    <div class="main-container">
      <!--Navbar-->
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <!--AppMain-->
      <AppMain/>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, reactive, computed, toRefs,
} from 'vue';
import { useStore } from '../store/index';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar/index.vue';
import AppMain from './components/AppMain.vue';

export default defineComponent({
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
  setup() {
    const store = useStore();
    // eslint-disable-next-line no-console
    console.log(store);
    const reactiveData = reactive({
      fixedHeader: computed(() => store?.state?.settingsModule?.fixedHeader),
    });

    const opened = computed(() => store.getters['appModule/getSidebarState']);
    const device = computed(() => store.getters['appModule/getDeviceState']);
    const withoutAnimation = computed(() => store.getters['appModule/getSidebarAnimation']);

    const classObj = computed(() => ({
      hideSidebar: !opened.value,
      openSidebar: opened.value,
      withoutAnimation: withoutAnimation.value,
      mobile: device.value === 'mobile',
    }));
    return {
      classObj,
      ...toRefs(reactiveData),
    };
  },
});
</script>

<style lang="scss" scoped>

@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar{
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 63px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
