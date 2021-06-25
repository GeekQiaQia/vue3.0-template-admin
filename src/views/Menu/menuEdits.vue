<template>
  <div v-loading="loading" class="new">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="100px">
      <el-form-item label="菜单名称" prop="meta.title">
        <el-input v-model="form.meta.title" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标" prop="meta.icon">
        <el-input v-model="form.meta.icon" placeholder="请选择菜单图标" style="width: 60%"> </el-input>
        <el-button disabled="disabled"><i :class="form.meta.icon"></i></el-button>
        <el-popover :visible="modal" placement="bottom" width="80vw" title="请选择图标">
          <icons @success="onSuccess"></icons>
          <template #reference>
            <el-button icon="el-icon-search" @click="handleClickChoose">选择图标</el-button>
          </template>
        </el-popover>
      </el-form-item>
      <el-form-item label="菜单路径" prop="path">
        <el-input v-model="form.path" placeholder="请输入菜单路径"></el-input>
      </el-form-item>
      <el-row class="btn-container">
        <el-button size="mini" type="primary" @click="submitForm()"> <i class="fa fa-plus"> </i> 确认修改 </el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, toRef } from 'vue'
import Icons from '@/components/icon.vue'

const Reg = /^(\/[a-zA-Z][0-9a-zA-Z]+)+$/

// eslint-disable-next-line no-unused-vars
type VoidNoop = (arg0?: Error) => void

const validPath = (rule: any, value: string, callback: VoidNoop) => {
  if (Reg.test(value)) {
    callback()
  } else {
    callback(new Error('必须输入正确的路径'))
  }
}

export default defineComponent({
  name: 'MenuEdit',
  components: { Icons },
  props: {
    currentMenu: {
      type: Object,
      default: null
    }
  },
  emits: ['success'],
  setup(props, { emit }) {
    // url: this.$store.state.server + '/menu/add',
    // 析构获取 props 属性 basePath
    const currentMenu = toRef(props, 'currentMenu')
    console.log(currentMenu)
    const rules = {
      'meta.title': [
        { required: true, message: '请输入菜单名称', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
      ],
      'meta.icon': [{ required: true, message: '请输入菜单图标', trigger: 'blur' }],
      path: [
        { required: true, message: '请输入菜单路径', trigger: 'blur' },
        { min: 2, message: '至少2个字符', trigger: 'blur' },
        { validator: validPath, trigger: 'blur' }
      ]
    }

    const formRef = ref()

    const state = reactive({
      form: currentMenu,
      modal: false,
      loading: false
    })
    const onSuccess = (val: string) => {
      console.log('val is ', val)
      state.modal = false
      state.form.meta.icon = val
    }
    const handleClickChoose = () => {
      state.modal = !state.modal
      console.log(' state.modal', state.modal)
    }
    /**
     * @description 此处通过接口进行异步修改路由对象；校验通过即进行提交
     */
    const submitForm = () => {
      formRef.value.validate((valid: any): boolean => {
        if (valid) {
          console.log(state.form)
          emit('success', state.form)
          // 此处暂时省去异步接口处理
          return true
        }
        return false
      })
    }
    return {
      ...toRefs(state),
      formRef,
      rules,
      onSuccess,
      submitForm,
      handleClickChoose
    }
  }
})
</script>
<style lang="stylus" scoped></style>
