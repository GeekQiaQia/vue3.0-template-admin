<!--
 * @Author: GeekQiaQia
 * @Date: 2021-11-10 10:32:27
 * @LastEditTime: 2021-12-27 18:18:30
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /vue3.0-template-admin/src/layout/components/RightSetting/RightDrawer.vue
-->
<template>
  <div class="rightDrawer">
    <!-- :modal-append-to-body="false"  -->
    <el-drawer v-model="openDrawer" size="20%" :with-header="false">
      <div class="slot-body">
        <slot />
      </div>
    </el-drawer>
    <div class="rightPanel">
      <el-button class="handle-button" type="primary" :class="{ 'handle-button-close': !openDrawer }" :style="{ top: buttonTop + 'px' }" @click="openDrawer = !openDrawer">
        <el-icon><Setting /></el-icon>
      </el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Setting } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'RightDrawer',
  components: {
    Setting
  },
  props: {
    buttonTop: {
      default: 250,
      type: Number
    }
  },
  setup() {
    const openDrawer = ref(false)
    return {
      openDrawer
    }
  }
})
</script>
<style lang="stylus" scoped>
.rightDrawer{
    .slot-body{
        padding 20px;
    }
}

.rightPanel {
  width:100%;
  max-width: 350px;
  height: 100vh;
  position: fixed;
  padding:24px;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .05);
  transition: all .25s cubic-bezier(.7, .3, .1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 2000;

  .handle-button {
    width: 48px;
    height: 48px;
    position: absolute;
    left: -48px;
    text-align: center;
    font-size: 24px;
    border-radius: 6px 0 0 6px !important;
    z-index: 0;
    pointer-events: auto;
    cursor: pointer;
    color: #fff;
    line-height: 48px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .handle-button-close{
    left: -8px;
        &:hover{
            left: -48px;
        }
    }
}
</style>
