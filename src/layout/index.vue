<template>
  <div :class="classObj" class="app-wrapper">
    <!--backtop-->
    Scroll down to see the bottom-right button.
    <el-backtop target=".app-wrapper" :visibility-height="100"></el-backtop>

    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <!--Navbar-->
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <!--AppMain-->
      <AppMain />

      <RightDrawer v-if="showSetting">
        <div class="setting-item">
          <div class="setting-draw-title">主题色</div>
          <el-color-picker v-model="color" show-alpha :predefine="predefineColors" @change="handleChangeTheme"> </el-color-picker>
          <div class="divider"></div>
        </div>
      </RightDrawer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs, ref } from 'vue'
import { useStore } from '@/store/index'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import RightDrawer from './components/RightSetting/RightDrawer.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    RightDrawer
  },
  setup() {
    const store = useStore()
    // eslint-disable-next-line no-console
    console.log(store)
    const reactiveData = reactive({
      fixedHeader: computed(() => store?.state?.settingsModule?.fixedHeader)
    })
    const color = ref('rgba(255, 69, 0, 0.68)')

    const predefineColors = ref([
      '#ff4500',
      '#ff8c00',
      '#ffd700',
      '#90ee90',
      '#00ced1',
      '#1e90ff',
      '#c71585',
      'rgba(255, 69, 0, 0.68)',
      'rgb(255, 120, 0)',
      'hsv(51, 100, 98)',
      'hsva(120, 40, 94, 0.5)',
      'hsl(181, 100%, 37%)',
      'hsla(209, 100%, 56%, 0.73)',
      '#c7158577'
    ])
    const showSetting = computed(() => store.state.settingsModule.showSettings)
    const opened = computed(() => store.getters['appModule/getSidebarState'])
    const device = computed(() => store.getters['appModule/getDeviceState'])
    const withoutAnimation = computed(() => store.getters['appModule/getSidebarAnimation'])

    const classObj = computed(() => ({
      hideSidebar: !opened.value,
      openSidebar: opened.value,
      withoutAnimation: withoutAnimation.value,
      mobile: device.value === 'mobile'
    }))
    // 将这个颜色设置为主题颜色；
    const handleChangeTheme = () => {
      console.log('color', color.value)
    }
    return {
      color,
      predefineColors,
      classObj,
      handleChangeTheme,
      showSetting,
      ...toRefs(reactiveData)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: scroll;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  // .main-container {
  //   // overflow: scroll;
  //   // height: 100%;
  // }
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
.setting-item {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .setting-draw-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }
  .divider {
    width: 100%;
    display: flex;
    clear: both;
    min-width: 100%;
    margin: 24px 0;

    box-sizing: border-box;
    padding: 0px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    border-top: 1px solid rgba(0, 0, 0, 0.09);
    list-style: none;
    line-height: 1.5715;
  }
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
  width: calc(100% - 63px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
