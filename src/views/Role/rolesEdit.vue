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
import { computed, defineComponent, onMounted, reactive, toRef, toRefs } from 'vue'
import { useStore } from '@/store'

interface stateTypes {
  url: String
  purl: String
  loading: Boolean
  form: { key: String; label: String }
  menu: {
    loading: Boolean
    url: String
    data: { key: String; label: String }[]
    form: { key: String; label: String }[]
  }
}
export default defineComponent({
  props: {
    currentRole: {
      type: Object,
      default: () => ({ roleName: '', state: 1 })
    }
  },
  setup(props) {
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
    const routes = computed(() => store.state.permissionModule.routes)

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
     * @description 异步获取已经授权的菜单
     */
    const fetchData = () => {}
    /**
     * @description 保存当前角色授权菜单
     */
    const saveData = () => {}
    onMounted(() => {
      fetchMenuData()
    })
    return {
      ...toRefs(state),
      role,
      fetchMenuData,
      fetchData,
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
