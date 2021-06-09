<template>
  <div class="wrapper">
    <textarea :value="editorValue" class="editor" @input="update"></textarea>
    <div class="markdown" v-html="compiledMarkdown"></div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import _ from 'lodash'
import marked from 'marked' // 解析mardown语法的库
// import hljs from 'highlight.js' // 对代码进行语法高亮的库

export default defineComponent({
  setup() {
    const editorValue = ref('# hello')
    const compiledMarkdown = computed(() => marked(editorValue.value, { sanitize: true, breaks: true, gfm: true, pedantic: false, smartLists: true, smartypants: false }))
    const update = _.debounce((e) => {
      editorValue.value = e.target.value
    }, 300)
    return {
      editorValue,
      compiledMarkdown,
      update
    }
  }
})
</script>
<style lang="stylus" scoped>
.wrapper{
    width:100%;
    min-height 350px;
    height :350px

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

textarea,  .markdown {
        display: inline-block;
        overflow: auto;
        width: 50%;
        height: 100%;
        vertical-align: top;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 20px;
        text-align :left;
}

code {
  color: #f66;
}

    }
</style>
