<template>
  <div class="form-container">
    <el-form v-if="showReset" ref="resetRef" :model="resetForm" status-icon :hide-required-asterisk="true" :rules="rules" label-width="100px" class="login-form">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="resetForm.email" autocomplete="off" placeholder="请输入注册邮箱">
          <template #append>
            <el-button :disabled="sendingCode" @click="handleGetCaptcha">{{ codeText }}</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="capcha">
        <el-input v-model.number="resetForm.capcha" maxlength="6" autocomplete="off" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="resetForm.password" type="password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="resetForm.checkPass" type="password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <div class="btn-container">
          <el-button type="primary" style="width: 100%" @click="handleResetPwd()">确认重置</el-button>
        </div>
        <div class="go-login">
          <span class="to-login" @click="handleToLogin"><em>去登陆</em></span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { encrypt } from '@/utils/aes' // aes 密码加密
import Service from '../api/index'

interface stateType {
  resetForm: {
    email: string
    capcha: number | null
    password: string
    checkPass: string
  }
}

// eslint-disable-next-line no-unused-vars
type VoidNoop = (arg0?: Error) => void

export default defineComponent({
  name: 'ForgetPassword',
  props: {
    showReset: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toLogin'],
  setup(_props, { emit }) {
    const resetRef = ref()
    const state = reactive<stateType>({
      resetForm: {
        email: '',
        capcha: null,
        password: '',
        checkPass: ''
      }
    })
    const sendingCode = ref(false)
    const codeText = ref('获取验证码')
    const handleToLogin = () => {
      emit('toLogin')
    }
    // 短验已发送状态
    const getCodeSucces = () => {
      let countDown = 60
      sendingCode.value = true
      const interval = setInterval(() => {
        if (countDown > 0) {
          codeText.value = `已发送(${countDown}s)`
          countDown -= 1
        } else {
          clearInterval(interval)
          sendingCode.value = false
          codeText.value = '获取验证码'
        }
      }, 1000)
    }
    /**
     * @description 获取验证码
     */
    const handleGetCaptcha = async (): Promise<boolean> => {
      try {
        const { email } = state.resetForm
        if (!email) {
          ElMessage({
            type: 'warning',
            message: '请输入注册邮箱'
          })
          return false
        }
        const data = {
          email
        }
        const res = await Service.postForgetPwd(data)
        if (res.status === 0) {
          ElMessage({
            type: 'success',
            message: res.message
          })
          getCodeSucces()
          return true
        }
        ElMessage({
          type: 'warning',
          message: res.message
        })
        return false
      } catch (err) {
        console.error(err)
        return false
      }
    }
    /**
     * @description 重置密码
     *
     */
    const handleResetPwd = async () => {
      resetRef.value.validate(async (valid: any) => {
        if (valid) {
          try {
            const { email, password, capcha } = state.resetForm
            const data = {
              email,
              // password,
              password: encrypt(password),
              capcha
            }
            const res = await Service.postResetPwd(data)
            if (res.status === 0) {
              ElMessage({
                type: 'warning',
                message: res.message
              })
              emit('toLogin')
            } else {
              ElMessage({
                type: 'success',
                message: res.message
              })
            }
          } catch (err) {
            console.error(err)
          }
        }
        return false
      })
    }

    // eslint-disable-next-line no-unused-vars
    const validatePass2 = (rule: any, value: string, callback: VoidNoop) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== state.resetForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validatePass = (rule: any, value: string, callback: VoidNoop) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (state.resetForm.checkPass !== '') {
          resetRef.value.validateField('checkPass')
        }
        callback()
      }
    }
    const rules = {
      password: [
        { validator: validatePass, trigger: 'blur' },
        { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
      ],
      checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      email: [
        { required: true, message: '请输入注册邮箱', trigger: 'change' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ],
      capcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
    }
    return {
      ...toRefs(state),
      rules,
      sendingCode,
      codeText,
      resetRef,
      handleGetCaptcha,
      handleToLogin,
      handleResetPwd
    }
  }
})
</script>
<style lang="stylus" scoped>
.form-container{
  width:100%

  :deep(.el-input-group__append) {
    padding:0px 7px;
  }

  :deep(.el-input-group__prepend) {
    padding:0px 7px;
  }

  .login-form{
    width:100%;
    margin: 0 auto;
  }

  .go-login{
    font-size: 12px;
    cursor: pointer;
    display:flex;
    flex-direction:row ;
    justify-content: center;
    align-items :center;

    .to-login{
      color: #9fa2a8;

      em{
        color: #2878ff;
      }
    }
  }
}
</style>
