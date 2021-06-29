<template>
  <div class="editorWrapper">
    <div class="info">
      <el-divider content-position="left">富文本编辑器</el-divider>
      <span style="text-align: left">富文本编辑器编辑场景。</span>
    </div>
    <div>
      <el-row>
        <el-col :offset="1" :span="22">
          <div class="grid-content bg-purple-dark">
            <el-card class="box-card">
              <fragment>
                <div style="text-align: left">
                  <span>富文本编辑器</span>
                  <el-divider></el-divider>
                </div>
              </fragment>
              <div ref="reditor"></div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import E from 'wangeditor'

export default defineComponent({
  components: {},
  setup() {
    const reditor = ref() // 富文本引用
    const richHtml = ref() // 富文本内容；
    onMounted(() => {
      const editor = new E(reditor.value)
      // 配置 onchange 回调函数
      editor.config.onchange = (newHtml: any) => {
        richHtml.value = newHtml
        console.log('change 之后最新的 html', richHtml.value)
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
.editorWrapper{
    margin-top:20px;
    :deep .w-e-text-container{
      text-align :left;
    }
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
