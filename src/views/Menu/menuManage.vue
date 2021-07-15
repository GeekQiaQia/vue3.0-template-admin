<template>
  <div>
    <el-card class="card-ctrl">
      <el-row>
        <el-col>
          <el-col>
            <el-button type="primary" icon="el-icon-plus" size="small" @click="onCreate">新增</el-button>
            <el-button type="success" icon="el-icon-refresh" size="small" @click="onRefresh">刷新</el-button>
          </el-col>
          <el-table v-loading="loading" :data="data" stripe class="table">
            <el-table-column label="菜单名称" align="center">
              <template #default="scope">
                <span>{{ scope.row.meta.title }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="state" label="菜单状态" align="center">
              <template #default="scope">
                <el-tag v-if="scope.row.state === 0" size="mini" type="info"><i class="ic ic-lock"></i> 锁定</el-tag>
                <el-tag v-else-if="scope.row.state === 1" size="mini" type="success">正常</el-tag>
                <el-tag v-else size="mini" type="danger">未知</el-tag>
              </template>
            </el-table-column> -->
            <el-table-column label="图标" align="center">
              <template #default="scope">
                <i :class="scope.row.meta.icon"></i>
              </template>
            </el-table-column>
            <el-table-column label="路径" align="center">
              <template #default="scope">
                <el-tag size="mini" type="info">{{ scope.row.path }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <template v-if="scope.row.state != 0">
                  <el-tooltip class="item" effect="dark" content="修改" placement="bottom">
                    <el-button circle plain type="primary" icon="el-icon-edit" size="mini" @click="onEdit(scope.$index, scope.row)"> </el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                    <el-button circle plain type="danger" icon="el-icon-minus" size="mini" @click="onDelete(scope.$index, scope.row)"> </el-button>
                  </el-tooltip>
                </template>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              :current-page="param.page"
              :page-size="param.limit"
              layout="sizes,prev,pager,next,total"
              :page-sizes="[5, 10, 20]"
              :total="total"
              background
              @current-change="onCurrentChange"
              @size-change="onSizeChange"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog v-model="addVisible" width="632px" title="新增菜单">
      <menu-new @success="onAddSuccess"></menu-new>
    </el-dialog>
    <el-dialog v-model="editVisible" center width="632px" :title="posted.menu.meta.title">
      <menu-edit :current-menu="posted.menu" @success="onEditSuccess"></menu-edit>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed } from 'vue'
import { useStore } from '@/store'
import { ElMessage, ElMessageBox } from 'element-plus'
import { RouteRecordRaw } from 'vue-router'
import MenuNew from './menuNew.vue'
import MenuEdit from './menuEdits.vue'

const useConfirmDelete = (index: any) => {
  console.log(index)
  ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除'
      })
    })
}
interface stateTypes {
  url: {}
  param: {
    limit: Number
    page: Number
  }
  data: Array<RouteRecordRaw>
  total: Number
  loading: Boolean
  addVisible: Boolean
  editVisible: Boolean
  detailVisible: Boolean
  posted: {
    menu: {
      path: String
      meta: {
        title: String
        icon: String
      }
    }
  }
}
export default defineComponent({
  name: 'Menu',
  components: { MenuNew, MenuEdit },
  setup() {
    const store = useStore()
    const state = reactive<stateTypes>({
      url: {
        c: '/menu/add',
        r: '/menu/list',
        u: '/menu/update',
        d: '/menu/delete'
      },
      param: {
        limit: 10,
        page: 1
      },
      data: [
        {
          path: '/',
          redirect: '/home',
          meta: {
            title: '首页',
            icon: 'el-icon-s-home'
          },
          children: [
            {
              path: '/home',
              name: 'home',
              component: () => import(/* webpackChunkName: "home" */ '@/views/Home/home.vue'),
              meta: {
                title: '首页',
                icon: 'home'
              }
            }
          ]
        }
      ],
      total: 1,
      loading: false,
      addVisible: false,
      editVisible: false,
      detailVisible: false,
      posted: {
        menu: {
          path: '',
          meta: {
            title: '',
            icon: ''
          }
        }
      }
    })
    const routes = computed(() => store.state.permissionModule.accessRoutes)

    const initTableData = () => {
      const result = routes.value.filter((item) => item?.meta?.hidden !== true)
      state.data = result
    }
    /**
     * @description 此处做异步请求处理
     */
    const fetchData = (val?: any) => {
      // handle val
      console.log(val)
    }
    const onCurrentChange = (val: any) => {
      fetchData(val)
    }
    const onSizeChange = (val: any) => {
      state.param.limit = val
      fetchData(val)
    }
    const onCreate = () => {
      state.addVisible = true
    }
    const onRefresh = () => {
      fetchData()
    }
    const onEdit = (index: any, row: any) => {
      console.log('row,', row, index)
      state.posted.menu = row
      state.editVisible = true
    }

    const onDelete = (index: any, row: any) => {
      // const form = {
      //   menuId: row.menuId
      // }
      console.log(row)
      useConfirmDelete(index)
      // 次处省去异步接口处理 异步请求删除当前id路由
      // store.dispatch
    }
    const onAddSuccess = () => {
      state.addVisible = false
      fetchData()
    }
    const onEditSuccess = () => {
      console.log('on edit success')
      state.editVisible = false
    }
    const onError = () => {}
    onMounted(() => {
      initTableData()
    })
    return {
      ...toRefs(state),
      onError,
      onAddSuccess,
      onEditSuccess,
      onDelete,
      onCurrentChange,
      onSizeChange,
      onCreate,
      onRefresh,
      onEdit
    }
  }
})
</script>
<style lang="stylus" scoped></style>
