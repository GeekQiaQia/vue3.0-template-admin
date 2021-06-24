<template>
  <div class="markdown-container">
    <textarea ref="markdownPaneRef" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
import 'codemirror/theme/night.css'
import 'codemirror/theme/shadowfox.css'
import 'codemirror/theme/darcula.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/material-ocean.css'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

// require('script-loader!jsonlint')

export default defineComponent({
  name: 'CodeMarkdown',
  props: {
    modelValue: {
      type: Object,
      default: () => {}
    },
    theme: {
      type: String,
      default: 'shadowfox'
    }
  },
  emits: ['changed', 'input', 'update:modelValue'],
  setup(props, { emit }) {
    const markdownPaneRef = ref()
    let jsonEditor: any = null
    const state = reactive({
      options: {
        lineNumbers: true,
        mode: 'markdown',
        gutters: ['CodeMirror-lint-markers'],
        theme: props.theme,
        lint: false
      }
    })
    const initCodeMirror = () => {
      jsonEditor = CodeMirror.fromTextArea(markdownPaneRef.value, state.options)
      // doc.setValue(content: string) :set the editor content
      jsonEditor.setValue(JSON.stringify(props.modelValue, null, 2))
      // "changes" (instance: CodeMirror, changes: array<object>) Fires every time the content of the editor is changed.This event is fired after the operation finished
      jsonEditor.on('change', (cm: { getValue: () => any }) => {
        console.log('ssss')
        emit('changed', cm.getValue())
        emit('input', cm.getValue())
      })
    }
    const getValue = () => jsonEditor.getValue()
    onMounted(() => {
      initCodeMirror()
    })
    // watchEffect(() => {
    //   const editorValue = jsonEditor.value.getValue()
    //   if (props.modelValue !== editorValue) {
    //     jsonEditor.value.setValue(JSON.stringify(props.modelValue, null, 2))
    //   }
    // })
    watch(
      () => props.theme,
      (theme, prevTheme) => {
        if (theme !== prevTheme) {
          jsonEditor.setOption('theme', theme)
        }
      }
    )
    return { markdownPaneRef, getValue }
  }
})
</script>
<style lang="stylus" scoped>
.markdown-container {
  height: 100%;
  position: relative;

  :deep {
    .CodeMirror {
      height: auto;
      min-height: 300px;
    }
    .CodeMirror-code{
      text-align :left;
    }

    .CodeMirror-scroll {
      min-height: 300px;
    }

    .cm-s-rubyblue span.cm-string {
      color: #f08047;
    }
  }
}
</style>
