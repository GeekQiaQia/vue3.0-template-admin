<template>
  <div v-if="!item.meta.hidden" class="menu-wrapper">
    <!--only on child show el-menu -->
    <template v-if="hasOneShowingChild(item.children, item)">
      <el-menu-item :key="item.path" :index="item.path" :route="item.path">
        <i :class="item.meta.icon"></i>
        <template #title>{{ item.meta.title }}</template>
      </el-menu-item>
    </template>
    <el-submenu v-else ref="subMenu" :index="item.path" popper-append-to-body>
      <template #title>
        <i :class="item.meta.icon"></i>
        <span>{{ item.meta.title }}</span>
      </template>
      <!--children 进行递归调用自身组件-->
      <sidebar-item v-for="child in item.children" :key="child.path" :is-nest="true" :item="child" :base-path="child.path" class="nest-menu" />
    </el-submenu>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, toRef } from 'vue'
// import { isExternal } from '@/utils/validate'
// import path from 'path'
interface childType {
  path: string
  name?: string
  component: Function
  meta: {
    title: string
    icon: string
    hidden?: boolean
    [key: string]: any
  }
}
export default defineComponent({
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNested: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // 是否只有一个孩子
    const onlyOneChild = ref()
    // 析构获取 props 属性 basePath
    const basePath = toRef(props, 'basePath')

    onMounted(() => {
      // eslint-disable-next-line no-console
      console.log('basePath.value', basePath.value)
    })
    // methods
    /**
     * @description 展示只有一个孩子的情况
     */
    const hasOneShowingChild = (children: childType[] = [], parent: any) => {
      // RouteRecordRaw 只能在meta中配置额外属性，过滤是否展示路由；
      // if (children) {
      const showingChildren = children.filter((item) => {
        // 如果meta 配置隐藏该路由，则返回false;

        if (item?.meta?.hidden) {
          return false
        }
        //
        onlyOneChild.value = item
        return true
      })

      // 判断当前路由，是否有孩子children，以及孩子个数；
      if (showingChildren.length === 1) {
        return true
      }

      // 如果没有孩子，则展示父级路由；
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, noShowingChildren: true }
        return true
      }
      // }

      return false
    }
    // const resolvePath = (routePath:string) => {
    //   if (isExternal(routePath)) {
    //     return routePath;
    //   }
    //   if (isExternal(basePath.value)) {
    //     return basePath.value;
    //   }
    //   return path.resolve(basePath.value, routePath);
    // };

    return {
      onlyOneChild,
      hasOneShowingChild
      // resolvePath,
    }
  }
})
</script>
<style lang="stylus" scoped></style>
