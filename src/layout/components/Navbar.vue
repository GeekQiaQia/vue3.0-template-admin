<template>
  <div class="navbar">
    <hamburger :is-active="opened" class="hamburger-container"
     @toggleClick="toggleSideBar" />
    <breadcrumb class="breadcrumb-container" />
      <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="hover">
        <div class="avatar-wrapper">
           <el-avatar :src="avatar"></el-avatar>
            <div class="nickname">{{ nickname }}</div>
        </div>
        <template #dropdown>
           <el-dropdown-menu  class="user-dropdown">
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
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
        </template>

      </el-dropdown>
    </div>

  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
// eslint-disable-next-line import/extensions
import Hamburger from '@/components/Hamburger/Hamburger.vue';
// eslint-disable-next-line import/extensions
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import avatar from '@/assets/avatar-default.jpg'
import { useRouter } from 'vue-router';
import { useStore } from '../../store/index';

export default defineComponent({
  name: 'Navbar',
  components: {
    Hamburger,
    Breadcrumb,
  },
  setup() {
    const router=useRouter();
    const store = useStore();
    const opened = computed(() => store.getters['appModule/getSidebarState']);
    const nickname =computed(()=> JSON.parse(localStorage.getItem('userInfo') as string)?.userName ?? '极客恰恰');
    // methods
    const toggleSideBar = () => {
      store.dispatch('appModule/toggleSideBar');
    };
    const logout=()=> {
      // clear()
      router.replace('/login')
    }
    return {
      nickname,
      avatar,
      toggleSideBar,
      opened,
      logout
    };
  },
});
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

    &:focus {
      outline: none;
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
