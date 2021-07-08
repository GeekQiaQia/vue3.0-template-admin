<template>
  <div class="editor-container">
    <div ref="reditor"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import E from 'wangeditor'

export default defineComponent({
  name: 'RichEditor',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const reditor = ref() // 富文本引用
    onMounted(() => {
      const editor = new E(reditor.value)
      // 配置 onchange 回调函数
      editor.config.onchange = (newHtml: any) => {
        emit('update:modelValue', newHtml)
      }

      // 配置触发 onchange 的时间频率，默认为 200ms
      editor.config.onchangeTimeout = 500 // 修改为 500ms
      editor.create()
    })
    return {
      reditor
    }
  }
})
</script>
<style lang="stylus" scoped>
.editor-container{
      :deep .w-e-text-container{
      text-align :left;
    }
}
</style>
