<template>
  <el-breadcrumb class="app-breadcremb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { compile } from 'path-to-regexp'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const levelList = ref([] as any)
    const route = useRoute()
    const router = useRouter()
    // 获取面包屑
    const getBreadcrumb = () => {
      // 只展示路由中设置了meta.title的元素；
      const matched = route.matched.filter((item) => item.meta && item.meta.title)
      levelList.value = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }

    const pathCompile = (path: string) => {
      const { params } = route
      const toPath = compile(path)
      return toPath(params)
    }

    const handleLink = (item: any) => {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect)
      }
      router.push(pathCompile(path))
    }
    // 在挂载阶段执行获取面包屑数组
    onMounted(() => {
      getBreadcrumb()
    })
    // watch route to get  new breadcrumb
    watch(route, () => {
      getBreadcrumb()
    })
    return {
      levelList,
      handleLink
    }
  }
})
</script>
<style lang="stylus" scoped>
.navbar .breadcrumb-container {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
