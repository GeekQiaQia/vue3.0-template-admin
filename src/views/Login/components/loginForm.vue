<template>
  <div class="form-container">
    <el-form v-if="showLogin" ref="loginFormRef" :model="loginForm" status-icon :hide-required-asterisk="true" :rules="rules" label-width="100px" class="login-form">
      <el-form-item label="账号" prop="email">
        <el-input v-model="loginForm.email" autocomplete="off" placeholder="请输入登录邮箱(super@outlook.com)"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" autocomplete="off" placeholder="请输入密码(123456)"></el-input>
      </el-form-item>

      <el-form-item>
        <div class="btn-container">
          <el-button type="primary" class="modern-btn" style="width: 100%" @click="submitForm()">
            <span>登录</span>
          </el-button>
        </div>
        <div class="operation">
          <span class="free-register" @click="showLogin = !showLogin">免费注册</span>
          <span class="forget-password" @click="handleForget">忘记密码</span>
        </div>
      </el-form-item>
    </el-form>
    <el-form v-if="!showLogin" ref="registerRef" :model="registerForm" status-icon :hide-required-asterisk="true" :rules="rules" label-width="100px" class="login-form">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email" autocomplete="off" placeholder="请输入注册邮箱">
          <template #append>
            <el-button :disabled="sendingCode" @click="handleGetCaptcha">{{ codeText }}</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="capcha">
        <el-input v-model.number="registerForm.capcha" maxlength="10" autocomplete="off" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password" type="password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="registerForm.checkPass" type="password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <div class="btn-container">
          <el-button type="primary" class="modern-btn" style="width: 100%" @click="handleRegister()">
            <span>完成注册</span>
          </el-button>
        </div>
        <div class="go-login">
          <span class="to-login" @click="showLogin = !showLogin">已有账号<em>去登陆</em></span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { encrypt } from '@/utils/aes' // aes 密码加密
import { useStore } from '@/store'
import Service from '../api/index'

interface stateType {
  loginForm: {
    email: string
    password: string
  }
  registerForm: {
    email: string
    capcha: number | null
    password: string
    checkPass: string
  }
  showLogin: boolean
}

// eslint-disable-next-line no-unused-vars
type VoidNoop = (arg0?: Error) => void
export default defineComponent({
  name: 'LoginForm',
  emits: ['toResetPwd'],
  setup(_props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    const loginFormRef = ref()
    const registerRef = ref()
    const store = useStore()
    const sendingCode = ref(false)
    const codeText = ref('获取验证码')
    const state = reactive<stateType>({
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        email: '',
        capcha: null,
        password: '',
        checkPass: ''
      },
      showLogin: true
    })

    // eslint-disable-next-line no-unused-vars
    const validatePass2 = (rule: any, value: string, callback: VoidNoop) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== state.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validatePass = (rule: any, value: string, callback: VoidNoop) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (state.registerForm.checkPass !== '') {
          registerRef.value.validateField('checkPass')
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

    // methods

    /**
     * @description  用户登录接口
     *
     */
    const submitForm = () => {
      loginFormRef.value.validate(async (valid: any) => {
        if (valid) {
          try {
            const { email, password } = state.loginForm
            const encryptedPassword = encrypt(password)
            console.log('Login attempt:', { email, password, encryptedPassword })
            const data = {
              email,
              // password
              password: encryptedPassword
            }
            const res = await Service.postLogin(data)
            const userInfo = await Service.postUserInfo({ email })

            const accessToken = res?.accessToken ?? null
            if (accessToken) {
              // 将角色存储到全局vuex roles
              if (userInfo.status === 0) {
                store.dispatch('permissionModule/getPermissonRoles', userInfo.data)
              }
              // 先进行异步路由处理
              store.dispatch('permissionModule/getPermissonRoutes', userInfo.data)
              store.dispatch('permissionModule/getPermissions').catch((error) => {
                console.error('Failed to get permissions:', error)
              })
              sessionStorage.setItem('auth', 'true')
              sessionStorage.setItem('accessToken', accessToken)
              if (route.query.redirect) {
                const path = route.query.redirect
                router.push({ path: path as string })
              } else {
                router.push('/')
              }
            } else {
              ElMessage({
                type: 'warning',
                message: '账号或者密码有误'
              })
            }
          } catch (err) {
            ElMessage({
              type: 'warning',
              message: err.message
            })
          }
        }
        return false
      })
    }
    /**
     * @description 处理注册接口
     */
    const handleRegister = () => {
      registerRef.value.validate(async (valid: any) => {
        if (valid) {
          try {
            const { email, password, capcha } = state.registerForm
            const data = {
              email,
              capcha,
              // password
              password: encrypt(password)
            }
            Service.postRegister(data)
              .then((res: any) => {
                if (res.status === 0) {
                  ElMessage({
                    type: 'success',
                    message: '注册成功'
                  })
                  state.showLogin = true
                } else {
                  ElMessage({
                    type: 'warning',
                    message: res.message
                  })
                }
              })
              .catch((err) => {
                ElMessage({
                  type: 'warning',
                  message: err.message
                })
              })
          } catch (err) {
            ElMessage({
              type: 'error',
              message: err.message
            })
          }
        }
      })
    }
    /**
     * @description 获取验证码状态
     */
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
        const { email } = state.registerForm
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
        const res = await Service.postCaptcha(data)
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
     * @description 忘记密码
     */
    const handleForget = () => {
      emit('toResetPwd')
    }
    return {
      ...toRefs(state),
      loginFormRef,
      registerRef,
      sendingCode,
      codeText,
      rules,
      submitForm,
      handleRegister,
      handleGetCaptcha,
      handleForget
    }
  }
})
</script>
<style lang="stylus" scoped>
.form-container{
  width:100%;

  :deep(.el-input-group__append) {
    padding:0px 7px;
  }

  :deep(.el-input-group__prepend) {
    padding:0px 7px;
  }

  :deep(.el-form-item__label) {
    font-weight: 600;
    color: #374151;
  }

  :deep(.el-input__wrapper) {
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }
  }

  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1), 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .login-form{
    width:100%;
    margin: 0 auto;
  }

  .modern-btn {
    height: 44px;
    border-radius: 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
      background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    }

    &:active {
      transform: translateY(0);
    }

    span {
      position: relative;
      z-index: 1;
    }
  }

  .go-login{
    font-size: 13px;
    cursor: pointer;
    display:flex;
    flex-direction:row ;
    justify-content: center;
    align-items :center;
    margin-top: 16px;

    .to-login{
      color: #6b7280;
      transition: color 0.3s ease;

      &:hover {
        color: #374151;
      }

      em{
        color: #667eea;
        font-weight: 600;
        margin-left: 4px;
        transition: color 0.3s ease;

        &:hover {
          color: #764ba2;
        }
      }
    }
  }

  .operation{
    font-size: 13px;
    cursor: pointer;
    display:flex;
    flex-direction:row ;
    justify-content: space-between;
    align-items :center;
    margin-top: 16px;

    .free-register{
      color: #667eea;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        color: #764ba2;
        transform: translateX(2px);
      }
    }

    .forget-password{
      color: #6b7280;
      transition: all 0.3s ease;

      &:hover {
        color: #374151;
        transform: translateX(-2px);
      }
    }
  }

  .btn-container{
    width:100%;
    display :flex;
    flex-direction:row;
    justify-content :flex-start;
    align-items :center;
  }
}
</style>
