<!--
 * @Author: GeekQiaQia
 * @Date: 2022-02-21 17:07:07
 * @LastEditTime: 2022-02-21 17:37:37
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /test-vue3/src/views/Editor/markdownEditor.vue
-->
<template>
  <div class="editorWrapper">
    <div class="info">
      <el-divider content-position="left">markdown编辑器</el-divider>
      <span style="text-align: left">markdown编辑器常用于技术型文本编辑场景。</span>
    </div>
    <div>
      <el-row>
        <el-col :offset="1" :span="22">
          <div class="grid-content bg-purple-dark">
            <el-card class="box-card">
              <div style="text-align: left">
                <span>Toast UI Editor markdown编辑器 <el-link type="primary" href="https://nhn.github.io/tui.editor/latest/tutorial-example01-editor-basic">Toast UI Editor </el-link></span>
                <el-divider></el-divider>
              </div>
              <tuiEditor :model-value="content"></tuiEditor>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'

import tuiEditor from '@/components/Editor/tuiEditor.vue'

export default defineComponent({
  components: {
    tuiEditor
  },
  setup() {
    const value = ref('')
    const state = reactive({
      content: '# wesome Editor! Toast UI'
    })
    return {
      value,
      ...toRefs(state)
    }
  }
})
</script>
<style lang="stylus" scoped>
.editorWrapper{
  margin-top:20px;

  .info{
    text-align: left;
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
  }

  .section{
    display:flex;
    flex-direction:row;
    justify-content: flex-start;
    align-items :center;
  }

  .el-row {
    margin-bottom: 20px;
  }
}
</style>
