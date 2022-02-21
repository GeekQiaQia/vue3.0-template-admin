<!--
 * @Author: GeekQiaQia
 * @Date: 2022-02-21 18:03:30
 * @LastEditTime: 2022-02-21 18:05:52
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /test-vue3/src/layout/components/RightSetting/themePick/index.vue
-->
<template>
  <el-form ref="formRef" :model="colors" class="theme-form" label-position="left" label-width="70px">
    <el-form-item :label="langConfig.form.theme[lang]" prop="primary">
      <el-color-picker v-model="colors.primary" :predefine="predefineColors" show-alpha></el-color-picker>
    </el-form-item>
    <el-form-item>
      <div class="color-buttons">
        <el-button type="primary" @click="$emit('submit', colors.primary)">{{ langConfig.form.switch[lang] }}</el-button>
        <el-button @click="resetForm">{{ langConfig.form.reset[lang] }}</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue'
import { langConfig } from '@/utils/constant/config'

export default defineComponent({
  props: {
    lang: {
      type: String,
      default: '/zh-CN'
    }
  },
  emits: ['submit'],
  setup() {
    const formRef = ref(null)
    const colors = reactive({
      primary: '#1890FF'
    })
    const predefineColors = ref(['#1890ff', '#f5222d', '#fa541c', '#faad14', '#13c2c2', '#52c41a', '#2f54eb', '#722ed1'])
    const resetForm = () => {
      formRef.value.resetFields()
    }

    return {
      predefineColors,
      colors,
      langConfig,
      formRef,
      resetForm
    }
  }
})
</script>
<style lang="stylus" scoped>
.theme-form{
  .color-buttons{
    width 100%
    display flex
    flex-direction row
    justify-content center
    align-items center
  }
}
</style>
