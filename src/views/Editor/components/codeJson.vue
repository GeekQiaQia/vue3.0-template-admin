<template>
  <div class="json-container">
    <textarea ref="jsonPaneRef" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/display/panel.js'
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
  name: 'CodeJson',
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
    const jsonPaneRef = ref()
    let jsonEditor: any = null
    const state = reactive({
      options: {
        lineNumbers: true,
        mode: 'application/json',
        gutters: ['CodeMirror-lint-markers'],
        theme: props.theme,
        lint: false,
        selfContain: true
      }
    })
    const initCodeMirror = () => {
      jsonEditor = CodeMirror.fromTextArea(jsonPaneRef.value, state.options)
      // doc.setValue(content: string) :set the editor content
      jsonEditor.setValue(JSON.stringify(props.modelValue, null, 2))
      // "changes" (instance: CodeMirror, changes: array<object>) Fires every time the content of the editor is changed.This event is fired after the operation finished
      jsonEditor.on('change', (cm: { getValue: () => any }) => {
        console.log('ssss')
        emit('changed', cm.getValue())
        emit('input', cm.getValue())
      })
      jsonEditor.addPanel = () => {}
    }
    const getValue = () => jsonEditor.getValue()
    onMounted(() => {
      initCodeMirror()
    })
    watch(
      () => props.theme,
      (theme, prevTheme) => {
        if (theme !== prevTheme) {
          jsonEditor.setOption('theme', theme)
        }
      }
    )
    return { jsonPaneRef, getValue }
  }
})
</script>
<style lang="stylus" scoped>
.json-container {
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
