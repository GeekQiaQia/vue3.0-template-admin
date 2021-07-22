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
          <el-button type="primary" style="width: 100%" @click="submitForm()">登录</el-button>
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
            <el-button @click="handleGetCaptcha">获取验证码</el-button>
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
          <el-button type="primary" style="width: 100%" @click="handleRegister()">完成注册</el-button>
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
// import { encrypt } from '@/utils/aes' // aes 密码加密
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
  setup(props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    const loginFormRef = ref()
    const registerRef = ref()
    const store = useStore()

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
            const data = {
              email,
              password
              // password: encrypt(password)
            }
            const res = await Service.postLogin(data)
            const userInfo = await Service.postAuthUserInfo({ email })
            // 将角色存储到全局vuex roles
            if (userInfo.status === 0) {
              store.dispatch('permissionModule/getPermissonRoles', userInfo.data)
            }
            // 先进行异步路由处理
            store.dispatch('permissionModule/getPermissonRoutes', userInfo.data)
            store.dispatch('permissionModule/getPermissions')

            const accessToken = res?.data?.accessToken ?? null
            if (accessToken) {
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
              password
              // password: encrypt(password)
            }
            Service.postRegister(data).then((res: any) => {
              console.log(res)
              ElMessage({
                type: 'success',
                message: '注册成功'
              })
              state.showLogin = true
            })
          } catch (err) {
            ElMessage({
              type: 'success',
              message: err.message
            })
          }
        }
      })
    }
    /**
     * @description 获取验证码
     */
    const handleGetCaptcha = async () => {
      try {
        const { email } = state.registerForm
        const data = {
          email
        }
        const res = await Service.postCaptcha(data)
        console.log(res)
        if (res.status === 0) {
          ElMessage({
            type: 'warning',
            message: res.message
          })
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
   :deep .el-input-group__append, .el-input-group__prepend{
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
     .operation{
       font-size: 12px;
       cursor: pointer;
       display:flex;
       flex-direction:row ;
       justify-content: space-between;
       align-items :center;

        .free-register{

           color: #2878ff;
         }
         .forget-password{
           color: #9fa2a8;
         }
        .btn-container{
          display :flex;
          flex-direction:row;
          justify-content :flex-start;
          align-items :center;
        }
     }
  }
</style>
