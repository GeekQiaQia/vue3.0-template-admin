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
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNTMuNzEgMzgiPjxkZWZzPjxzdHlsZT4uY2xzLTEsLmNscy0ye2ZpbGw6IzQwOWVmZjt9LmNscy0xe2ZpbGwtcnVsZTpldmVub2RkO308L3N0eWxlPjwvZGVmcz48dGl0bGU+6LWE5rqQIDE8L3RpdGxlPjxnIGlkPSLlm77lsYJfMiIgZGF0YS1uYW1lPSLlm77lsYIgMiI+PGcgaWQ9IuWbvuWxgl8xLTIiIGRhdGEtbmFtZT0i5Zu+5bGCIDEiPjxwYXRoIGlkPSJTaGFwZS1Db3B5IiBjbGFzcz0iY2xzLTEiIGQ9Ik0xNDIsMjYuMTZzLjI4LDAsLjgyLDBhLjcyLjcyLDAsMCwxLC42OS40MXMxLjA4LDIsMS4zNywyLjQ4LDAsLjQyLS4xMi40MWgwcy0uMzEsMC0zLjQ1LDBhNC45Myw0LjkzLDAsMCwxLTQuNTQtNC41NHYtN0gxMzQuM1YxNS4yOGMwLS4zNi40MS0uNDEuNDEtLjQxaDIuMDdWMTIuMjVhLjYuNiwwLDAsMSwuNDEtLjU1bDIuMy0uNjZjLjM0LS4xLjU5LDAsLjU5LjM1VjE1aDMuNThjLjM0LDAsLjQxLjQxLjQxLjQxVjE4aC00djYuMDZjMCwxLjc2LDEuOTMsMi4wNywxLjkzLDIuMDdabS0xMC42LDNoLTIuMmMtLjQzLDAtLjQxLS41NS0uNDEtLjU1VjE4LjQ1YzAtLjYyLS44My0uODMtLjgzLS44M2gtNC41NGMtLjY4LDAtLjY5LjgzLS42OS44M1YyOC43N2EuNDEuNDEsMCwwLDEtLjQxLjQyaC0yLjJjLS40OCwwLS40MS0uNTUtLjQxLS41NVYxNS44M2MwLTEsMS4yNC0xLjI0LDEuMjQtMS4yNGg5LjYzYzEsMCwxLjIzLDEuMjQsMS4yMywxLjI0VjI4LjVjMCwuNzItLjQxLjY5LS40MS42OVpNMTE1LjczLDIzLjRIMTA3LjJ2Mi4wN2MwLC43NCwxLDEsMSwxSDExNWExLjE2LDEuMTYsMCwwLDEsLjgyLjQycy42MSwxLjI1LjgzLDEuNzktLjQxLjU1LS40MS41NUgxMDZjLTEuMjQsMC0xLjUxLTEuNTItMS41MS0xLjUyVjE2YzAtLjY3LDEtMSwxLTFoMTAuMzJjMSwwLDEuMjQsMS4yMywxLjI0LDEuMjN2NS45M2MwLDEtMS4yNCwxLjIzLTEuMjQsMS4yM1ptLTEuNTItNC45NXMtLjA4LS42OS0uNjgtLjY5aC01LjY1cy0uNjguMTgtLjY4LjY5VjIwYS42OS42OSwwLDAsMCwuNjguNjloNS42NWEuOS45LDAsMCwwLC42OC0uODNWMTguNDVaTTEwMS4yOCwyOS4xOWgtMi4yYy0uMjksMC0uNDEtLjQyLS40MS0uNDJWMTguNDVjMC0uNjQtLjgzLS44My0uODMtLjgzSDk1Ljc4Yy0uNTgsMC0uNjkuODMtLjY5LjgzVjI4Ljc3YzAsLjM1LS40MS40Mi0uNDEuNDJoLTIuMmMtLjMxLDAtLjQyLS40Mi0uNDItLjQyVjE4LjQ1YzAtLjY2LS44Mi0uODMtLjgyLS44M0g4OS4xN2MtLjYzLDAtLjY4LjgzLS42OC44M1YyOC43N2EuMzkuMzksMCwwLDEtLjQyLjQyaC0yLjJhLjQxLjQxLDAsMCwxLS40MS0uNDJWMTUuNjljMC0uNzUsMS4xLTEuMSwxLjEtMS4xaDEzLjc2YzEuMSwwLDEuMzcsMS4zOCwxLjM3LDEuMzh2MTIuOGMwLC40OC0uNDEuNDItLjQxLjQyWm0tMjAtNS43OUg3Mi44djIuMDdjMCwuNzQsMSwxLDEsMWg2Ljg4YTEuMTksMS4xOSwwLDAsMSwuODMuNDJzLjYsMS4yNS44MiwxLjc5LS40MS41NS0uNDEuNTVINzEuNTZjLTEuMjQsMC0xLjUxLTEuNTItMS41MS0xLjUyVjE2YzAtLjY3LDEtMSwxLTFIODEuMzNjMSwwLDEuMjQsMS4yMywxLjI0LDEuMjN2NS45M2MwLDEtMS4yNCwxLjIzLTEuMjQsMS4yM1ptLTEuNTEtNC45NXMtLjA5LS42OS0uNjktLjY5SDczLjQ5cy0uNjkuMTgtLjY5LjY5VjIwYS42OS42OSwwLDAsMCwuNjkuNjloNS42NGEuOTEuOTEsMCwwLDAsLjY5LS44M1YxOC40NVpNNjgsMjkuMTlINjIuNzZhNC4zNSw0LjM1LDAsMCwxLTQuMTMtNGMwLTMuOTEsMC0xNi4xLDAtMTYuMWgyLjQ4YS43OS43OSwwLDAsMSwuODIuODJWMjQuMzdBMi41OCwyLjU4LDAsMCwwLDYzLjg2LDI2aDIuMnMuNzItLjIzLDEuMjQuNjlsMS4xLDEuOTNzLjA4LjU1LS40MS41NVptLTI2LjU2LS44M1YxMC4xOWExLDEsMCwwLDEsLjY5LTFINTUuMDVjLjczLDAsLjQyLjgzLjQyLjgzcy0uNDEsMS4xMi0uNjksMS42NWExLDEsMCwwLDEtLjgzLjU1SDQ1LjU2YS43Ny43NywwLDAsMC0uODMuNjl2NC41NGg5LjVjLjU1LDAsLjI3LjY5LjI3LjY5cy0uNzEsMS41Mi0xLDEuOTNhMS4wNSwxLjA1LDAsMCwxLS44My40MWgtOHY0LjgyYS45MS45MSwwLDAsMCwuNjkuODNoOC44MWEuODUuODUsMCwwLDEsLjgyLjQxbDEuMjQsMS45M2MuMzcuNTYtLjE0LjY5LS4xNC42OUg0Mi4yNkM0MS42OCwyOS4xOSw0MS40MywyOC4zNiw0MS40MywyOC4zNlptLTguMTQtMS4xNGMwLDEuNTctLjgzLDEuOTMtLjgzLDEuOTNTMTguMzIsMzcuMzEsMTcuNCwzNy44M2ExLjY4LDEuNjgsMCwwLDEtMS41MiwwUzEuMDksMjkuMjUuNTUsMjguODdhMS4yOSwxLjI5LDAsMCwxLS41NS0xczAtMTcsMC0xNy43OFMxLDguNzYsMSw4Ljc2TDE1Ljc1LjIxYTIsMiwwLDAsMSwxLjc5LDBTMzAuNiw3LjgsMzIsOC42MmEyLjA4LDIuMDgsMCwwLDEsMS4yNSwyLjA2czAsMTUuMDcsMCwxNi41NFptLTUuOS0xN2MtMy0xLjc0LTEwLjE2LTUuODctMTAuMTYtNS44N2ExLjU4LDEuNTgsMCwwLDAtMS40MSwwTDQuMjIsMTFzLS43Ny40Ni0uNzYsMS4wOFMzLjQ2LDI2LDMuNDYsMjZhMSwxLDAsMCwwLC40My43NWMuNDMuMywxMiw3LDEyLDdhMS4zLDEuMywwLDAsMCwxLjE5LDBjLjcyLS40LDExLjgyLTYuNzksMTEuODItNi43OXMuNjUtLjI4LjY1LTEuNTFjMC0uMzYsMC0xLjc0LDAtMy40N0wxNi41MywyOS44OHYtM2EzLDMsMCwwLDEsMS0yLjA3bDExLjU2LTdhMi40OSwyLjQ5LDAsMCwwLC41NS0xLjQ2YzAtMS4yNywwLTIuMzcsMC0zLjA3TDE2LjUzLDIxLjJWMThhMi4xNywyLjE3LDAsMCwxLC44My0xLjc5WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE1MC4zMiwxMS4yMWgtMi4yNHYtNWMwLS4xMS4xMi0uMjEuMjktLjI0bDEuNDQtLjI2Yy4yNiwwLC41MS4wNy41MS4yNFoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xNDguMDgsOWgyLjI0djUuMTFjMCwuMTEtLjExLjIxLS4yOC4yNWwtMS40NS4yNmMtLjI2LjA1LS41MS0uMDctLjUxLS4yNFoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xNDUuMDksOWg4LjIyYS40LjQsMCwwLDEsLjQuNHYxLjg1YTAsMCwwLDAsMSwwLDBoLTlhMCwwLDAsMCwxLDAsMFY5LjM2QS40LjQsMCwwLDEsMTQ1LjA5LDlaIi8+PC9nPjwvZz48L3N2Zz4="
          />
          <div>
            <img class="viteLogo" :src="viteLogo" />
            <img class="vueLogo" :src="vueLogo" />
          </div>
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
      viteLogo
    }
  }
})
</script>

<style lang="stylus" scoped>
.container{

    position: relative;
    background-image:linear-gradient(90deg, #ebebeb, #f5f7f6);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-container{
        width:874px;
        min-width: 874px;
        height: 78%;
        min-height: 600px;
        flex-direction: row;
        display: flex;
        justify-content: space-evenly;
        border-radius: 10px;
        overflow: hidden;
        background-color :white;
        box-shadow:0 0 20px 5px rgba(34,84,142,.26);

        .login-left{
            width:50%;
        padding:47px 54px;
        img{
            width: 90px;
            height: 100px;
            margin:0px 20px;
        }
        .top{
            display:flex;
            flex-direction:column;
            justify-content :flex-start;
            align-items :flex-start;
            margin:40px 0px;
            .title{
                font-size: 32px;
                margin-bottom: 16px;

            }
            .desc{
                font-size: 28px;
                text-align: left;
                color: rgb(166,175,188);
            }
        }
         .bottom{
              .viteLogo{
            transform :rotate(45deg)
        }
        .vueLogo{
            transform :rotate(-45deg)
        }
        }

        }
        .login-right{
            width:50%;
            display:flex;
            flex-direction:column ;
            justify-content: center;
            align-items :center;
            padding:30px;

        }
    }

}
</style>
