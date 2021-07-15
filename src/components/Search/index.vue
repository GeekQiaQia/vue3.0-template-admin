<template>
  <div id="Serach" class="search-container">
    <el-select v-model="value" :remote-method="querySearch" filterable default-first-option remote placeholder="请输入关键字搜索" @change="handleChange">
      <template #prefix>
        <i class="el-input__icon el-icon-search"></i>
      </template>
      <el-option v-for="{ item } in options" :key="item.path" :value="item" :label="item.title.join(' > ')"> </el-option>
    </el-select>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed, ref, watchEffect } from 'vue'
import Fuse from 'fuse.js'
import { resolve } from 'path'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

interface dataType {
  path: string
  title: string[]
}
interface stateType {
  options: dataType[]
  value: string
}
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const fuse = ref()
    const routes = computed(() => store.state.permissionModule.accessRoutes)
    const state = reactive<stateType>({
      options: [],
      value: ''
    })
    const config = {
      shouldSort: true,
      threshold: 0.7,
      location: 0,
      distance: 150,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        {
          name: 'title',
          weight: 0.7
        },
        {
          name: 'path',
          weight: 0.3
        }
      ]
    }
    const querySearch = (query: string) => {
      if (query !== '') {
        state.options = fuse.value.search(query)
      } else {
        state.options = []
      }
    }
    /**
     * @description 生成搜索列表
     */
    const generateList = (routers: any, basePath = '/', prefixTitle: string[] = []) => {
      let list: any[] = []
      // eslint-disable-next-line no-restricted-syntax
      for (const route of routers) {
        // skip hidden router
        if (!route?.meta?.hidden) {
          const data: dataType = {
            path: resolve(basePath, route.path),
            title: [...prefixTitle]
          }
          if (route?.meta?.title) {
            data.title = [...data.title, route.meta.title]
            list.push(data)
          }
          if (route.children) {
            const childList = generateList(route.children, data.path, data.title)
            if (childList.length >= 1) {
              list = [...list, ...childList]
            }
          }
        }
      }
      return list
    }
    const handleChange = (val: { path: any }) => {
      router.push(val.path)
      state.value = ''
      state.options = []
    }
    const initFuse = (list: readonly unknown[]) => {
      fuse.value = new Fuse(list, config)
    }
    watchEffect(() => {
      const searchList = generateList(routes.value)
      initFuse(searchList)
    })

    return {
      handleChange,
      querySearch,
      ...toRefs(state)
    }
  }
})
</script>
<style lang="stylus" scoped>
.search-container{
    :deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
}
</style>
