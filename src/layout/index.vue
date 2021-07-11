<template>
  <div :class="classObj" class="app-wrapper">
    <!--backtop-->
    <el-backtop target=".app-wrapper" :visibility-height="100"></el-backtop>

    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <!--Navbar-->
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar :primary="primary" />
      </div>
      <!--AppMain-->
      <AppMain />

      <RightDrawer v-if="showSetting">
        <div class="setting-item">
          <theme-pick @submit="submitForm"></theme-pick>
          <div class="divider"></div>
        </div>
      </RightDrawer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs, ref } from 'vue'
import { useStore } from '@/store/index'

import { generateColors, writeNewStyle, getStyleTemplate } from '@/utils'
import { useFiles } from '@/hooks/useFiles'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import RightDrawer from './components/RightSetting/RightDrawer.vue'
import ThemePick from './components/themePick/index.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    RightDrawer,
    ThemePick
  },
  setup() {
    const { getIndexStyle } = useFiles()
    const store = useStore()
    const originalStyle = ref('')

    // eslint-disable-next-line no-console
    console.log(store)
    const reactiveData = reactive({
      fixedHeader: computed(() => store?.state?.settingsModule?.fixedHeader)
    })
    const color = ref('rgba(255, 69, 0, 0.68)')
    const colors = reactive({
      primary: '#fff'
    })
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
    const originalStylesheetCount = computed(() => document.styleSheets.length || -1)
    const classObj = computed(() => ({
      hideSidebar: !opened.value,
      openSidebar: opened.value,
      withoutAnimation: withoutAnimation.value,
      mobile: device.value === 'mobile'
    }))
    /**
     * @description 切换主题
     */
    const submitForm = (primary: string) => {
      colors.primary = primary
      Object.assign(colors, generateColors(primary))
      writeNewStyle(originalStylesheetCount.value, originalStyle.value, colors)
    }
    getIndexStyle().then((data: any) => {
      originalStyle.value = getStyleTemplate(data)
    })
    return {
      color,
      predefineColors,
      classObj,
      submitForm,
      showSetting,
      ...toRefs(colors),
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
