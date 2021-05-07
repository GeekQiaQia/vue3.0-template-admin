<template>
    <div class="menu-wrapper">
   <el-submenu ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <!-- <template v-slot:title>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template> -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRef } from 'vue';
import { isExternal } from '@/utils/validate';
import path from 'path';

export default defineComponent({
  name: 'sidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNested: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const onlyOneChild = ref(null);
    const basePath = toRef(props, 'basePath');

    // methods
    const resolvePath = (routePath:string) => {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(basePath.value)) {
        return basePath.value;
      }
      return path.resolve(basePath.value, routePath);
    };
    return {
      onlyOneChild,
      resolvePath,
    };
  },
});
</script>
<style lang="stylus" scoped>

</style>
