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
              <div style="text-align: left">
                <span>富文本编辑器</span>
                <el-divider></el-divider>
              </div>
              <RichEditor :model-value="editorValue" @update:modelValue="handleUpdateValue"></RichEditor>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import RichEditor from '@/components/Editor/richEditor.vue'

export default defineComponent({
  components: {
    RichEditor
  },
  setup() {
    const editorValue = ref('默认数据') // 富文本引用
    const richHtml = ref() // 富文本内容；

    setTimeout(() => {
      // 3秒后设置数据为'3秒后的数据'
      editorValue.value = '3秒后的数据'
    }, 3000)

    /**
     * @description  获取接收最新文本
     */
    const handleUpdateValue = (val: any) => {
      console.log(val)
      richHtml.value = val
    }
    return {
      handleUpdateValue,
      editorValue
    }
  }
})
</script>
<style lang="scss" scoped>
.editorWrapper {
  margin-top: 20px;
  :deep(.w-e-text-container) {
    text-align: left;
  }
  .info {
    text-align: left;
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
  }
  .section {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .el-row {
    margin-bottom: 20px;
  }
}
</style>
