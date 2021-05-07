<template>
  <div :class="{'has-logo':showLogo}">
      <logo  v-if='showLogo' :collapse="isCollapse"  />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
      :uniqueOpened="false"
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
       :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
       @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
            <template v-for="route in routes">
                <template v-if="route?.meta && !route.meta?.hidden">
                    <!--only has one child check redirect-->
                    <template v-if="route.children &&route.children.length==1&& route.meta.title">

                        <el-menu-item :key="route.redirect" :index="route.path" >
                            <i :class="route.meta.icon"></i>
                            <template #title>{{route.meta.title}}</template>
                        </el-menu-item>
                    </template>
                    <!--more the one child -->
                    <template v-else>
                         <el-submenu :key="route.redirect" >
                            <template #title>
                            <i :class="route.meta.icon"></i>
                            <span>{{route.meta.title}}</span>
                            </template>
                            <template v-for="child in route.children"  >
                               <template v-if="route.meta.title">
                                    <el-menu-item :key="child.path" :index="child.path">
                                          {{child.meta.title}}
                                    </el-menu-item>
                               </template>
                            </template>

                        </el-submenu>
                    </template>

                </template>

                <!-- <el-submenu v-else :index="route.path" > -->
                <!-- <template #title v-if="route.meta && route.meta.title">
                    <i :class="route.meta.icon"></i>
                    <span>{{route.meta.title}}</span>
                </template> -->

                <!-- <template v-if="route.children && route.children.length>0">
                    <el-menu-item-group >
                        <el-menu-item index="5-1">选项1</el-menu-item>
                        <el-menu-item index="5-2">选项2</el-menu-item>
                    </el-menu-item-group>
                </template> -->

                <!-- <template v-else-if="route.meta && route.meta.title">
                     <el-menu-item  :index="route.path">{{route.meta.title}}</el-menu-item>
                </template> -->
                <!-- </el-submenu> -->
            </template>

        <!-- <el-submenu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template #title>选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <template #title>导航二</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <template #title>导航三</template>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <template #title>导航四</template>
        </el-menu-item> -->

      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import {
  useRouter,
} from 'vue-router';
import { isExternal } from '@/utils/validate';
import logo from './Logo.vue';
import { useStore } from '../../../store/index';
// import SidebarItem from './SidebarItem.vue';
export default defineComponent({
  components: {
    logo,
    // SidebarItem,
  },
  setup() {
    const route = useRouter();

    const store = useStore();
    const isCollapse = computed(() => !store.getters['appModule/getSidebarState']);
    const showLogo = computed(() => store.state.settingsModule.sideBarLogo);
    const routes = computed(() => store.state.permissionModule.routes);
    const activeMenu = computed(() => route.currentRoute.value.fullPath);
    // mothods
    const handleOpen = (key: any, keyPath: any) => {
      // eslint-disable-next-line no-console
      console.log(key, keyPath);
    };
    const handleClose = (key: any, keyPath: any) => {
      // eslint-disable-next-line no-console
      console.log(key, keyPath);
    };
    const handleSelect = (key: any) => {
      route.push(key);
    };
    // methods
    // eslint-disable-next-line consistent-return
    const resolvePath = (routePath:string) => {
      if (isExternal(routePath)) {
        return routePath;
      }
    };
    return {
      activeMenu,
      resolvePath,
      routes,
      showLogo,
      isCollapse,
      handleOpen,
      handleClose,
      handleSelect,
    };
  },
});
</script>
<style lang="stylus" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
