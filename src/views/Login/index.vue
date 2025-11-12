<template>
  <div class="container">
    <div class="login-container">
      <div class="login-left">
        <div class="top">
          <div class="title">
            <span>欢迎使用</span>
          </div>
          <div class="desc">
            <span>Vite2.x + ElementPlus + Vue3.x + TypeScript</span>
          </div>
        </div>
        <div class="bottom">
          <img :src="working" />
        </div>
      </div>
      <div class="login-right">
        <Login v-if="!showReset" @toResetPwd="handleResetPwd"></Login>
        <ForgetPassword v-else :show-reset="showReset" @toLogin="handleToLogin"></ForgetPassword>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import viteLogo from '@/assets/logo-vite.svg'
import vueLogo from '@/assets/logo.png'
import working from '@/assets/woking.gif'
import Login from './components/loginForm.vue'
import ForgetPassword from './components/forgetPassword.vue'

export default defineComponent({
  name: 'Index',
  components: {
    Login,
    ForgetPassword
  },
  setup() {
    const showReset = ref(false)
    const handleResetPwd = () => {
      // 展示重置密码框
      showReset.value = true
    }
    const handleToLogin = () => {
      // 展示登录框框
      showReset.value = false
    }
    return {
      showReset,
      handleResetPwd,
      handleToLogin,
      vueLogo,
      working,
      viteLogo
    }
  }
})
</script>

<style lang="stylus" scoped>
.container{
    position: relative;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(252, 103, 250, 0.2), transparent 50%);
      animation: gradient-shift 15s ease infinite;
    }

    @keyframes gradient-shift {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.8;
      }
    }

    .login-container{
        position: relative;
        z-index: 1;
        width:900px;
        min-width: 900px;
        height: 80%;
        min-height: 600px;
        flex-direction: row;
        display: flex;
        justify-content: space-evenly;
        border-radius: 20px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;

        &:hover {
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .login-left{
            width:50%;
            padding:47px 54px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            img{
               width: 85%;
               height: auto;
               margin: 0 auto;
               display: block;
               filter: drop-shadow(0 8px 24px rgba(102, 126, 234, 0.2));
               transform: scale(1);
               transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
               border-radius: 16px;
               background: rgba(255, 255, 255, 0.6);
               padding: 20px;

               &:hover {
                 transform: scale(1.05) translateY(-8px);
                 filter: drop-shadow(0 12px 32px rgba(102, 126, 234, 0.3));
               }
            }

            .top{
                display:flex;
                flex-direction:column;
                justify-content :flex-start;
                align-items :flex-start;
                margin:40px 0px;

                .title{
                    font-size: 36px;
                    font-weight: 700;
                    margin-bottom: 16px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: fadeInDown 0.8s ease;
                }

                .desc{
                    font-size: 16px;
                    text-align: left;
                    color: #6b7280;
                    font-weight: 500;
                    line-height: 1.6;
                    animation: fadeInUp 0.8s ease 0.2s backwards;
                }
            }

            .bottom {
              animation: fadeIn 1s ease 0.4s backwards;
              position: relative;

              &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 120%;
                height: 120%;
                background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
                animation: pulse 3s ease-in-out infinite;
                pointer-events: none;
                z-index: 0;
              }

              img {
                position: relative;
                z-index: 1;
              }
            }

            @keyframes pulse {
              0%, 100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0.5;
              }
              50% {
                transform: translate(-50%, -50%) scale(1.1);
                opacity: 0.8;
              }
            }
        }

        .login-right{
            width:50%;
            display:flex;
            flex-direction:column ;
            justify-content: center;
            align-items :center;
            padding:30px 50px;
            background: white;
        }
    }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
