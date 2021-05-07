<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  watch: {
    $route(to, from) {
      // eslint-disable-next-line no-console
      console.log(to, from);
    },
  },
  components: {
  },
  setup() {
  },
});
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
