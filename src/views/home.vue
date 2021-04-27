<template>
  <div class="home-container page-container">
    <img class="vue-element-plus-logo" alt="Vue logo" src="../assets/logo.png" />
    <div class="page-title">Vite2.x + Vue3.x + TypeScript + Element Plus</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
});
</script>

<style scoped lang="stylus">
.home-container {
  .vue-element-plus-logo {
    width 50%
  }
}
</style>
