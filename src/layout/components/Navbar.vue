<template>
  <div class="navbar">
    <el-header height="50px">
      <hamburger id="Hamburger" :is-active="opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <breadcrumb class="breadcrumb-container" />
      <div class="right-menu">
        <search></search>
        <div id="Message">
          <el-dropdown>
            <el-badge :value="messageNum" :max="99" class="message-badge" type="danger">
              <el-button class="message">
                <i class="el-icon-message-solid"></i>
              </el-button>
            </el-badge>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="a">mike 回复了你的邮件</el-dropdown-item>
                <el-dropdown-item command="b">您有5个新任务</el-dropdown-item>
                <el-dropdown-item command="c">您已经和Jone成为了好友</el-dropdown-item>
                <el-dropdown-item command="d">项目验收通知</el-dropdown-item>
                <el-dropdown-item command="e" divided>新会议通知</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <el-button id="fullScreen" class="full-screen">
          <el-tooltip content="全屏浏览" effect="dark" placement="left">
            <i v-show="fullScreen == false" class="el-icon-full-screen" @click="toShowFullScreen()"></i>
          </el-tooltip>
          <el-tooltip content="退出全屏" effect="dark" placement="left">
            <i v-show="fullScreen == true" class="el-icon-bottom-left" @click="toExitFullScreen()"></i>
          </el-tooltip>
        </el-button>
        <el-dropdown class="avatar-container" trigger="hover">
          <div class="avatar-wrapper">
            <el-avatar :src="avatar"></el-avatar>
            <div class="nickname">{{ nickname }}</div>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="user-dropdown">
              <router-link to="/">
                <el-dropdown-item>首页</el-dropdown-item>
              </router-link>
              <router-link to="/personal/personalCenter">
                <el-dropdown-item>个人中心</el-dropdown-item>
              </router-link>
              <router-link to="/personal/personalSetting">
                <el-dropdown-item>个人设置</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <span style="display: block" @click="logout">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import Hamburger from '@/components/Hamburger/Hamburger.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Search from '@/components/Search/index.vue'
import avatar from '@/assets/avatar-default.jpg'
import { useRouter } from 'vue-router'
import { toFullScreen, exitFullScreen } from '@/utils/screen'
import { useStore } from '@/store/index'

export default defineComponent({
  name: 'Navbar',
  components: {
    Hamburger,
    Breadcrumb,
    Search
  },
  props: {
    primary: {
      default: '#fff',
      type: String
    }
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const opened = computed(() => store.getters['appModule/getSidebarState'])
    const nickname = computed(() => JSON.parse(localStorage.getItem('userInfo') as string)?.userName ?? '极客恰恰')
    const fullScreen = ref(false)
    const messageNum = computed(() => store.getters['messageModule/getMessageNum'])
    // methods
    const toggleSideBar = () => {
      console.log('into toggleSideBar')
      store.dispatch('appModule/toggleSideBar')
    }

    const toShowFullScreen = () => {
      toFullScreen()
      fullScreen.value = true
    }

    const toExitFullScreen = () => {
      exitFullScreen()
      fullScreen.value = false
    }
    const logout = () => {
      // clear()
      sessionStorage.removeItem('auth')
      sessionStorage.removeItem('accessToken')

      router.replace('/login')
    }
    return {
      messageNum,
      toShowFullScreen,
      toExitFullScreen,
      toFullScreen,
      exitFullScreen,
      fullScreen,
      nickname,
      avatar,
      toggleSideBar,
      opened,
      logout
    }
  }
})
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.28);
  z-index: 1;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .nickname {
    float: right;
    padding: 0px 25px 0px 25px;
    line-height: 40px;
    outline: none;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    &:focus {
      outline: none;
    }
    .message-badge {
      .is-fixed {
        top: 12px !important;
        right: 28px !important;
      }
      .message {
        border: none;
        padding: 5px 20px;

        i {
          background-color: transparent;
          border: none;
          color: #2c3e50;
          font-size: 25px;
        }
      }
    }

    .full-screen {
      background-color: transparent;
      border: none;
      padding: 5px 20px;

      i {
        background-color: transparent;
        border: none;
        color: #2c3e50;
        font-size: 28px;
      }
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        cursor: pointer;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
