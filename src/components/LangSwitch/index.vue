<template>
  <ul id="lang" class="lang-switch">
    <li class="header-lang" :class="{ 'is-active': lang === '/zh-CN' }" @click="handleSwitchLang('/zh-CN')">中文</li>
    <span>/</span>
    <li class="header-lang" :class="{ 'is-active': lang === '/en-US' }" @click="handleSwitchLang('/en-US')">En</li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store/index'

export default defineComponent({
  setup() {
    const store = useStore()

    const lang = computed(() => {
      const langState = store.getters['settingsModule/getLangState']
      return langState
    })
    /**
     * @description 语言切换
     */
    const handleSwitchLang = (_lang: string) => {
      store.dispatch('settingsModule/toToggleLang', { lang: _lang })
    }
    return {
      lang,
      handleSwitchLang
    }
  }
})
</script>
<style lang="stylus" scoped>
.lang-switch
  display inline-block
  float right
  height 100%
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
