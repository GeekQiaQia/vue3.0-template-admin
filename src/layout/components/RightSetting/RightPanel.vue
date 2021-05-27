<template>
  <div class="right-panel">
    <div ref="rightPanel" :class="{ show: show }" class="rightPanel-container">
      <div class="rightPanel-background" />
      <div class="rightPanel">
        <div class="handle-button" :class="{ 'handle-button-close': !show }" :style="{ top: buttonTop + 'px', 'background-color': theme }" @click="show = !show">
          <i :class="show ? 'el-icon-close' : 'el-icon-setting'" />
        </div>
        <div class="rightPanel-items">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {  defineComponent,ref } from 'vue'


export default defineComponent({
     name: 'RightPanel',
      props: {
    clickNotClose: {
      default: false,
      type: Boolean
    },
    buttonTop: {
      default: 250,
      type: Number
    }
  },
  setup() {
      const show=ref(false)
      const theme=ref('rgb(24, 144, 255)');

      return {
          show,
          theme

      }
  }
})
</script>
<style>
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>
<style lang="stylus" scoped>
.right-panel{

.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity .3s cubic-bezier(.7, .3, .1, 1);
  background: rgba(0, 0, 0, .2);
  z-index: -1;
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
    i {
        font-size: 24px;
        line-height: 48px;
    }
  }
  .handle-button-close{
    left: -8px;
        &:hover{
            left: -48px;
        }
    }
}
.show {
  transition: all .3s cubic-bezier(.7, .3, .1, 1);
  .rightPanel-background {
    z-index: 20000;
    opacity: 1;
    width: calc(100% - 350px);
    height: 100%;
  }
  .rightPanel {
    transform: translate(0);
  }
}


}
</style>
