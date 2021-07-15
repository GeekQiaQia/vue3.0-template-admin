<template>
  <div v-loading="loading" class="wrapper">
    <el-card class="transfer">
      <template #header>
        <span>
          <div class="card-header">
            <el-form label-position="left" inline class="info-table">
              <el-form-item label="名称">
                <span>{{ role.roleName }}</span>
              </el-form-item>
            </el-form>
          </div>
        </span>
      </template>
      <el-transfer v-model="menu.form" v-loading="menu.loading" :data="menu.data" :titles="['菜单', '已授权']"> </el-transfer>
    </el-card>
    <br />
    <el-row class="btns">
      <el-button size="mini" type="primary" :disabled="role.state == 0" @click="saveData"> <i class="fa fa-check"> </i> 确认修改 </el-button>
    </el-row>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, watchEffect, reactive, toRef, toRefs } from 'vue'
import { useStore } from '@/store'
import Service from './api/index'

interface stateTypes {
  url: String
  purl: String
  loading: Boolean
  form: { key: String; label: String }
  menu: {
    loading: Boolean
    url: String
    data: { key: String; label: String }[]
    form: String[]
  }
}
export default defineComponent({
  name: 'RolesEdit',
  props: {
    currentRole: {
      type: Object,
      default: () => ({ roleName: '', state: 1 })
    }
  },
  emits: ['success'],

  setup(props, { emit }) {
    // 析构获取 props 属性 basePath
    const currentRole = toRef(props, 'currentRole')
    const store = useStore()

    const state = reactive<stateTypes>({
      url: `/role/allow`,
      purl: `/role/permissions`,
      loading: false,
      form: { key: '', label: '' },
      menu: {
        loading: false,
        url: `/menu/list`,
        data: [],
        form: []
      }
    })

    const role = computed(() => currentRole.value.role)
    // 可访问
    const routes = computed(() => store.state.permissionModule.routes)

    /**
     * @description 异步获取已经授权的菜单
     */
    const fetchData = async () => {
      const data = {
        roleName: role.value.roleName
      }
      // 后端根据角色名称，查询授权菜单
      const res = await Service.postAuthPermission(data)
      if (res?.data) {
        const { authedRoutes } = res.data
        state.menu.form = authedRoutes
      }
    }
    /**
     * @description 异步获取所有的菜单
     */
    const fetchMenuData = () => {
      // 模拟获取所有菜单数据；
      // eslint-disable-next-line no-restricted-syntax
      for (const i of routes.value) {
        if (!i?.meta?.hidden) {
          state.menu.data.push({
            key: i?.path,
            label: i?.meta?.title as String
          })
        }
      }
    }

    /**
     * @description 保存当前角色授权菜单
     */
    const saveData = () => {
      console.log('form is ', state.menu.form)
      //  省略接口：向后端接口传递已经授权菜单名称；  state.menu.form
      emit('success')
    }
    onMounted(() => {
      // 获取 auth Menu Info
      fetchMenuData()
    })
    // 使用watchEffect 监听所用到的变化时做出的副作用反应；
    watchEffect(() => {
      fetchData()
    })
    return {
      ...toRefs(state),
      role,
      fetchMenuData,
      saveData
    }
  }
})
</script>
<style lang="stylus" scoped>
.btns {
  text-align: right;
}

.el-transfer {
  display: inline-block;
  text-align: left;
}

.transfer {
  text-align: center;
}

.card-header {
  text-align: left;
}
</style>
