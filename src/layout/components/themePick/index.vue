<template>
  <el-form ref="formRef" :model="colors" class="theme-form" label-position="top" label-width="70px">
    <el-form-item :label="langConfig.form.theme[lang]" prop="primary">
      <el-color-picker v-model="colors.primary" :predefine="predefineColors" show-alpha></el-color-picker>
    </el-form-item>
    <el-form-item class="color-buttons">
      <el-button type="primary" @click="$emit('submit', colors.primary)">{{ langConfig.form.switch[lang] }}</el-button>
      <el-button @click="resetForm">{{ langConfig.form.reset[lang] }}</el-button>
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
