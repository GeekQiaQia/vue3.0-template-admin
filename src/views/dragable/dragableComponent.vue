<template>
  <div class="dragable-container">
    <div class="info">
      <el-divider content-position="left">拖拽组件</el-divider>
      <span style="text-align: left">拖拽组件常用于对当前活动列表进行优先级重新排列场景。<el-link type="primary" href="http://www.sortablejs.com/index.html">sortableJs</el-link></span>
    </div>
    <div>
      <el-row>
        <el-col :offset="1" :span="22">
          <div class="grid-content bg-purple-dark">
            <el-card class="box-card">
              <div style="text-align: left">
                <span>overview pinned 展示场景</span>
                <el-divider></el-divider>
              </div>
              <pinnedCard></pinnedCard>
            </el-card>
            <el-card class="box-card">
              <div style="text-align: left">
                <span>活动列表重新排列场景</span>
                <el-divider></el-divider>
              </div>
              <div class="section">
                <div ref="itemsRef">
                  <template v-for="item in input" :key="item.id">
                    <el-input v-model="item.task" readonly placeholder="请输入内容"></el-input>
                  </template>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, onUnmounted } from 'vue'
import Sortable from 'sortablejs'
import pinnedCard from './components/pinnedCard.vue'

export default defineComponent({
  name: 'DragableComponent',
  components: {
    pinnedCard
  },
  setup() {
    const itemsRef = ref()
    let listSortable: Sortable

    const input = ref([
      { id: '1', task: 'task1：可拖拽组件开发' },
      { id: '2', task: 'task2：监控页面开发' },
      { id: '3', task: 'task3：低代码平台开发' }
    ])

    onMounted(() => {
      listSortable = Sortable.create(itemsRef.value)
    })

    // 组件卸载时销毁实例
    onUnmounted(() => {
      listSortable.destroy()
    })

    return {
      itemsRef,
      input
    }
  }
})
</script>
<style lang="stylus" scoped>
.dragable-container{
   margin-top:20px;

    .info{
        text-align: left;
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
    }
    .section{
      display:flex;
      flex-direction:row;
      justify-content: flex-start;
      align-items :center;
    }

     .el-row {
       margin-bottom: 20px;
     }
     .box{
        background-color: var(--color-bg-primary);
        border: 1px solid var(--color-border-primary);
        border-radius: 6px;
        padding: 16px!important;
        display: flex!important;
        .item-list-content{
            display: flex;
            width: 100%;
            flex-direction: column;
        }
     }
     .box-card{
         margin-bottom :10px;
     }

}
</style>
