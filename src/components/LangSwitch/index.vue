<!--
 * @Author: GeekQiaQia
 * @Date: 2021-11-10 10:32:27
 * @LastEditTime: 2021-12-29 20:58:24
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /vue3.0-template-admin/src/components/LangSwitch/index.vue
-->
<template>
  <div class="lang-switch">
    <el-image style="width: 18.28px; height: 12px; margin-right: 5px" :src="flag"></el-image>
    <el-select v-model="selectedLang" placeholder="Select" style="width: 120px" @change="handleSwitchLang">
      <el-option v-for="item in languages" :key="item.value" :label="item.label" :value="item.value">
        <el-image style="width: 18.28px; height: 12px; margin-right: 5px" :src="item.img"></el-image>
        <span>{{ item.label }}</span>
      </el-option>
    </el-select>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useStore } from '@/store/index'
// eslint-disable-next-line no-unused-vars
import us from '@/assets/images/us.png'
// eslint-disable-next-line no-unused-vars
import chinese from '@/assets/images/chinese.png'

type langType = {
  value: string
  label: string
  img: string
}
const store = useStore()

// eslint-disable-next-line no-unused-vars
const languages = ref([
  {
    value: '/en-US',
    label: 'English',
    img: us
  },
  {
    value: '/zh-CN',
    label: '中文',
    img: chinese
  }
])
// eslint-disable-next-line no-unused-vars
const selectedLang = ref('/zh-CN')
// eslint-disable-next-line no-unused-vars
const lang = computed(() => {
  const langState = store.getters['settingsModule/getLangState']
  return langState
})

// eslint-disable-next-line no-unused-vars
const flag = computed(() => {
  const selectCountry: langType = languages.value.find((item) => item.value === selectedLang.value) as langType
  return selectCountry.img
})

/**
 * @description 语言切换
 */
// eslint-disable-next-line no-unused-vars
const handleSwitchLang = (_lang: string) => {
  store.dispatch('settingsModule/toToggleLang', { lang: _lang })
}
</script>
<style lang="stylus" scoped>
.lang-switch
  display inline-block
  float right
  height 100%
  margin-left: 5px
  vertical-align: middle;
  line-height: 100%;
  :deep(.el-input__inner) {
    border-radius: 0;
    border: 0;
    padding-left: 0;
    padding-right: 0;
    box-shadow: none !important;
    border:transparent
    vertical-align: middle;
  }
  & li
    color #2c3e50
    display inline-block
    vertical-align middle
    padding 0 10px
    cursor pointer
  .header-download
    opacity 0.4
    cursor default
    &.is-available
      opacity 1
      cursor pointer
  span
    opacity 0.7
  .header-lang
    cursor pointer
    opacity 0.7
    &.is-active
      opacity 1
      color rgba(24, 144, 255, 1)
.lang-switch::after
  display inline-block
  content ''
  height 100%
  vertical-align middle
  .header-lang
    cursor pointer
    opacity 0.7
    &.is-active
      opacity 1
</style>
