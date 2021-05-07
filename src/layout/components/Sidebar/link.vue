<template>
  <component :is="linkProps(to)">
    <slot />
  </component>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { isExternal } from '@/utils/validate.js';

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup() {
    // methods
    const linkProps = (url:string) => {
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener',
        };
      }
      return {
        is: 'router-link',
        to: url,
      };
    };
    return {
      linkProps,

    };
  },
});
</script>
<style lang="stylus" scoped>

</style>
