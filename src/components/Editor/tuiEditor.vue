<template>
  <div>
    <div ref="editorSection"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

import Editor from '@toast-ui/editor' /* ES6 Module */
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
// Editor's Style
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '# Toast UI Editor '
    }
  },
  setup(props) {
    const editorSection = ref()
    let editor: Editor
    onMounted(() => {
      editor = new Editor({
        el: editorSection.value,
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        height: '500px',
        initialValue: props.modelValue,
        theme: 'dark'
      })
    })
    onUnmounted(() => {
      editor.destroy()
    })
    return {
      editorSection
    }
  }
})
</script>
<style lang="stylus" scoped>

:deep .ProseMirror {
  text-align :left;
}

:deep .toastui-editor-contents{
  text-align :left;
}
</style>
