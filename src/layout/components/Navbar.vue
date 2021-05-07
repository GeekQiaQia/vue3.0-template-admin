<template>
  <div class="navbar">
    <hamburger :is-active="opened" class="hamburger-container"
     @toggleClick="toggleSideBar" />
    <breadcrumb class="breadcrumb-container" />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
// eslint-disable-next-line import/extensions
import Hamburger from '@/components/Hamburger/Hamburger.vue';
// eslint-disable-next-line import/extensions
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import { useStore } from '../../store/index';

export default defineComponent({
  name: 'Navbar',
  components: {
    Hamburger,
    Breadcrumb,
  },
  setup() {
    const store = useStore();

    // methods
    const toggleSideBar = () => {
      store.dispatch('appModule/toggleSideBar');
    };
    const opened = computed(() => store.getters['appModule/getSidebarState']);
    return {
      toggleSideBar,
      opened,
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
    padding: 0 20px;
    line-height: 50px;
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
