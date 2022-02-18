<template>
  <div class="dragable-container">
    <el-row style="margin: 15px">
      <el-col :span="24" class="page-title-box">
        <h4 class="page-title">拖拽组件</h4>
        <div class="page-title-right">
          <div style="margin-right: 10px">
            <span style="text-align: left">拖拽组件常用于对当前活动列表进行优先级重新排列场景。<el-link type="primary" href="http://www.sortablejs.com/index.html">sortableJs</el-link></span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-row
        ><el-col><el-button type="success">Add New</el-button></el-col></el-row
      >
      <el-col :span="24">
        <div class="board">
          <div class="task">
            <h5 class="task-header text-upercase margin-top-0">TODO(3)</h5>
            <div ref="todoRef" class="task-list-item">
              <el-card v-for="item in task.todoList" :key="item.id" shadow="hover" class="card">
                <el-row>
                  <el-col :span="24" style="text-align: left">
                    <div class="flex flex-row flex-between">
                      <span class="badge badge-secondary">medium</span>
                      <small class="text-muted"> {{ item.date }} </small>
                    </div>

                    <h5 class="margin-top-1 margin-bottom-1">{{ item.title }}</h5>
                    <p class="text-muted margin-bottom-1">
                      <span class="text-norap margin-right-1"
                        ><el-icon><Suitcase /></el-icon> {{ item.tag }}</span
                      >
                      <span class="text-norap margin-right-1"
                        ><el-icon><ChatLineSquare /></el-icon> {{ item.comments }} Comments</span
                      >
                    </p>
                    <div class="flex flex-row flex-between">
                      <div class="flex flex-row flex-start align-center">
                        <el-avatar size="small" :src="item.avatar"></el-avatar>
                        <p class="name">{{ item.name }}</p>
                      </div>
                      <div class="handle">
                        <el-icon class="pointer"><Operation /></el-icon>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </div>
          <div class="task">
            <h5 class="task-header text-upercase margin-top-0">In Progress (2)</h5>
            <div ref="progressRef" class="task-list-item">
              <el-card shadow="hover" class="card">
                <el-row>
                  <el-col :span="24" style="text-align: left">
                    <div class="flex flex-row flex-between">
                      <span class="badge badge-secondary">medium</span>
                      <small class="text-muted"> 18 jul 2018 </small>
                    </div>

                    <h5 class="margin-top-1 margin-bottom-1">kanban reafactor</h5>
                    <p class="text-muted margin-bottom-1">
                      <span class="text-norap margin-right-1"
                        ><el-icon><Suitcase /></el-icon> web</span
                      >
                      <span class="text-norap margin-right-1"
                        ><el-icon><ChatLineSquare /></el-icon> 22 Comments</span
                      >
                    </p>
                    <div class="flex flex-row flex-between">
                      <div class="flex flex-row flex-start align-center">
                        <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        <p class="name">GeekQiaQia</p>
                      </div>
                      <div class="handle">
                        <el-icon class="pointer"><Operation /></el-icon>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
              <el-card shadow="hover" class="card">
                <el-row>
                  <el-col :span="24" style="text-align: left">
                    <div class="flex flex-row flex-between">
                      <span class="badge badge-success">low</span>
                      <small class="text-muted"> 19jul 2018 </small>
                    </div>

                    <h5 class="margin-top-1 margin-bottom-1">bugfix UI change</h5>
                    <p class="text-muted margin-bottom-1">
                      <span class="text-norap margin-right-1"
                        ><el-icon><Suitcase /></el-icon> IOS</span
                      >
                      <span class="text-norap margin-right-1"
                        ><el-icon><ChatLineSquare /></el-icon> 28 Comments</span
                      >
                    </p>
                    <div class="flex flex-row flex-between">
                      <div class="flex flex-row flex-start align-center">
                        <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        <p class="name">GeekQiaQia</p>
                      </div>
                      <div class="handle">
                        <el-icon class="pointer"><Operation /></el-icon>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </div>
          <div class="task">
            <h5 class="task-header text-upercase margin-top-0">review (3)</h5>
            <div ref="reviewRef" class="task-list-item">
              <el-card shadow="hover" class="card">
                <el-row>
                  <el-col :span="24" style="text-align: left">
                    <div class="flex flex-row flex-between">
                      <span class="badge badge-danger">heigh</span>
                      <small class="text-muted"> 19jul 2018 </small>
                    </div>

                    <h5 class="margin-top-1 margin-bottom-1">home page refactor</h5>
                    <p class="text-muted margin-bottom-1">
                      <span class="text-norap margin-right-1"
                        ><el-icon><Suitcase /></el-icon> web</span
                      >
                      <span class="text-norap margin-right-1"
                        ><el-icon><ChatLineSquare /></el-icon> 28 Comments</span
                      >
                    </p>
                    <div class="flex flex-row flex-between">
                      <div class="flex flex-row flex-start align-center">
                        <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        <p class="name">GeekQiaQia</p>
                      </div>
                      <div class="handle">
                        <el-icon class="pointer"><Operation /></el-icon>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
              <el-card shadow="hover" class="card">
                <el-row>
                  <el-col :span="24" style="text-align: left">
                    <div class="flex flex-row flex-between">
                      <span class="badge badge-danger">heigh</span>
                      <small class="text-muted"> 19jul 2018 </small>
                    </div>

                    <h5 class="margin-top-1 margin-bottom-1">analysis page refactor</h5>
                    <p class="text-muted margin-bottom-1">
                      <span class="text-norap margin-right-1"
                        ><el-icon><Suitcase /></el-icon> web</span
                      >
                      <span class="text-norap margin-right-1"
                        ><el-icon><ChatLineSquare /></el-icon> 28 Comments</span
                      >
                    </p>
                    <div class="flex flex-row flex-between">
                      <div class="flex flex-row flex-start align-center">
                        <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        <p class="name">GeekQiaQia</p>
                      </div>
                      <div class="handle">
                        <el-icon class="pointer"><Operation /></el-icon>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
              <el-card shadow="hover" class="card">
                <el-row>
                  <el-col :span="24" style="text-align: left">
                    <div class="flex flex-row flex-between">
                      <span class="badge badge-danger">heigh</span>
                      <small class="text-muted"> 19jul 2018 </small>
                    </div>

                    <h5 class="margin-top-1 margin-bottom-1">dashboard page refactor</h5>
                    <p class="text-muted margin-bottom-1">
                      <span class="text-norap margin-right-1"
                        ><el-icon><Suitcase /></el-icon> web</span
                      >
                      <span class="text-norap margin-right-1"
                        ><el-icon><ChatLineSquare /></el-icon> 28 Comments</span
                      >
                    </p>
                    <div class="flex flex-row flex-between">
                      <div class="flex flex-row flex-start align-center">
                        <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        <p class="name">GeekQiaQia</p>
                      </div>
                      <div class="handle">
                        <el-icon class="pointer"><Operation /></el-icon>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </div>
          <div class="task">
            <h5 class="task-header text-upercase margin-top-0">done (3)</h5>
            <div ref="doneRef" class="task-list-item">
              <el-card shadow="hover" class="card">
                <el-row>
                  <el-col :span="24" style="text-align: left">
                    <div class="flex flex-row flex-between">
                      <span class="badge badge-success">low</span>
                      <small class="text-muted"> 19jul 2018 </small>
                    </div>

                    <h5 class="margin-top-1 margin-bottom-1">draggable design width sortable</h5>
                    <p class="text-muted margin-bottom-1">
                      <span class="text-norap margin-right-1"
                        ><el-icon><Suitcase /></el-icon> web</span
                      >
                      <span class="text-norap margin-right-1"
                        ><el-icon><ChatLineSquare /></el-icon> 28 Comments</span
                      >
                    </p>
                    <div class="flex flex-row flex-between">
                      <div class="flex flex-row flex-start align-center">
                        <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        <p class="name">GeekQiaQia</p>
                      </div>
                      <div class="handle">
                        <el-icon class="pointer"><Operation /></el-icon>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <div>
      <el-row>
        <el-col :span="18">
          <div class="grid-content bg-purple-dark">
            <el-card class="box-card">
              <div style="text-align: left">
                <span>overview pinned 展示场景</span>
                <el-divider></el-divider>
              </div>
              <pinnedCard></pinnedCard>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card">
            <div style="text-align: left">
              <span>活动列表重新排列场景</span>
              <el-divider></el-divider>
            </div>
            <div class="section">
              <div ref="itemsRef">
                <div v-for="item in input" :key="item.id" class="external-events" :class="[item.classNames]"><i class="list-circle"></i>{{ item.task }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, onUnmounted, reactive } from 'vue'
import Sortable from 'sortablejs'
import { Operation, Suitcase, ChatLineSquare } from '@element-plus/icons-vue'
import pinnedCard from './components/pinnedCard.vue'

let eventGuid = 0
/**
 * @description 事件Uid
 */
const createEventId = () => String(eventGuid++)

interface taskType {
  [key: string]: { id: number; priority: number; date: string; title: string; tag: string; comments: number; avatar: string; name: string }[]
}
interface taskRefType {
  [key: string]: any
}

const itemsRef = ref()
const todoRef = ref()
const reviewRef = ref()
const progressRef = ref()
const doneRef = ref()
let listSortable: Sortable
const task = reactive<taskType>({
  todoList: [
    {
      id: 1,
      priority: 2,
      date: '19jul 2018',
      title: 'dashboard page refactor',
      tag: 'web',
      comments: 28,
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      name: 'GeekQiaQia'
    },
    {
      id: 2,
      priority: 1,
      date: '19jul 2018',
      title: 'role page refactor',
      tag: 'web',
      comments: 28,
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      name: 'GeekQiaQia'
    }
  ],
  inProgress: [
    {
      id: 1,
      priority: 2,
      date: '19jul 2018',
      title: 'kanban reafactor',
      tag: 'web',
      comments: 22,
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      name: 'GeekQiaQia'
    },
    {
      id: 2,
      priority: 1,
      date: '19jul 2018',
      title: 'bugfix  UI change',
      tag: 'web',
      comments: 13,
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      name: 'GeekQiaQia'
    }
  ]
})
const taskRef = reactive<taskRefType>({})

const input = ref([
  { id: createEventId(), task: 'task1：可拖拽组件开发', classNames: 'bg-success' },
  { id: createEventId(), task: 'task2：监控页面开发', classNames: 'bg-info' },
  { id: createEventId(), task: 'task3：低代码平台开发', classNames: 'bg-warning' },
  { id: createEventId(), task: 'task4：低代码平台开发', classNames: 'bg-dark' },
  { id: createEventId(), task: 'task5：低代码平台开发', classNames: 'bg-danger' },
  { id: createEventId(), task: 'task6：低代码平台开发', classNames: 'bg-success' }
])

onMounted(() => {
  listSortable = Sortable.create(itemsRef.value)
  taskRef.todo = new Sortable(todoRef.value, {
    group: 'shared', // set both lists to same group
    animation: 150,
    easing: 'cubic-bezier(1, 0, 0, 1)'
  })
  taskRef.progress = new Sortable(progressRef.value, {
    group: 'shared', // set both lists to same group
    animation: 150,
    easing: 'cubic-bezier(1, 0, 0, 1)'
  })
  taskRef.reviewRef = new Sortable(reviewRef.value, {
    group: 'shared', // set both lists to same group
    animation: 150,
    easing: 'cubic-bezier(1, 0, 0, 1)'
  })
  taskRef.doneRef = new Sortable(doneRef.value, {
    group: 'shared', // set both lists to same group
    animation: 150,
    easing: 'cubic-bezier(1, 0, 0, 1)'
  })
})

// 组件卸载时销毁实例
onUnmounted(() => {
  listSortable.destroy()
  taskRef.todo.destroy()
  taskRef.progress.destroy()
  taskRef.review.destroy()
  taskRef.doneRef.destroy()
})
</script>
<style lang="stylus" scoped>
.dragable-container{
    color #6c757d
    padding 0px 20px
    background-color #fafbfe

    .page-title-box{
      box-sizing border-box
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      .page-title{
        font-size  18px
        margin  0
        line-height  85px
        overflow  hidden
        white-space: nowrap
        text-overflow  ellipsis
        color  inherit
        font-weight 700
      }
      .page-title-right{
        display flex
        flex-direction row
        justify-content space-around
        align-items center
      }
    }
     .flex{
      display flex
    }
    .flex-row{
      flex-direction row
    }
    .flex-column{
      flex-direction column
    }
    .flex-end{
      justify-content flex-end
    }
    .flex-start{
      justify-content flex-start
    }
    .flex-between{
      justify-content space-between
    }
    .text-muted{
          color #98a6ad
    }
    .align-center{
      align-items center
    }
    .text-norap{
      white-space nowrap
    }
     .margin-top-1{
        margin-top 10px
      }
      .margin-bottom-1{
        margin-bottom 10px
      }
      .margin-top-2{
        margin-top 20px
      }
      .margin-bottom-2{
        margin-bottom 20px
      }
       .margin-right-1{
        margin-right 10px
      }
      .padding-right-1{
        padding-right 10px
      }

    .badge{
          display: inline-block;
          padding: 0.25em 0.4em;
          font-size: 75%;
          font-weight: 700;
          line-height: 1;
          text-align: center;
          white-space: nowrap;
          vertical-align: baseline;
          border-radius: 0.25rem;
          -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
          transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
          transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
          transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
        }
    .badge-secondary{
      color #fff
      background-color #6c757d
    }
    .badge-danger{
        color #fff
        background-color #fa5c7c
    }
    .badge-success{
      color: #fff;
      background-color: #0acf97;
    }

    .board{
      display: block;
      white-space: nowrap;
      overflow-x: auto;
      .task{
        display: inline-block;
        width: 22rem;
        padding: 0 1rem 1rem 1rem;
        border: 1px solid #e3eaef;
        vertical-align: top;
        margin-bottom: 30px;
        border-radius: 0.25rem;
        .task-header{
          background-color #f1f3fa
          padding 1rem
          margin 0 -1rem
        }
        .task-list-item{
          min-height 150px
          position relative
          .card {
            white-space normal
            margin-top 1rem
          }
        }
        &:not(:last-child) {
            margin-right: 1.25rem;
        }
      }

      .text-upercase{
            text-transform: uppercase!important;
      }
      .margin-top-0{
        margin-top 0 !important
      }
      h5{
        font-weight 700
        color  #6c757d
      }
      .name{
        margin-left 5px
      }
      .pointer{
        cursor pointer
      }

    }
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

  .external-events{
    cursor move
    margin 10px 0
    padding 8px 10px
    color #fff
    text-align left
    width 258.25px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap

    .list-circle{
        width 14px
        height 14px
        border-radius 50%
        background-color white
        display inline-block
        margin-right 10px
    }
  }
  :deep(.bg-success){
    background-color #0acf97!important
  }
  :deep(.bg-info) {
    background-color: #39afd1!important;
  }
  :deep(.bg-danger) {
    background-color: #fa5c7c!important;
  }
  :deep(.bg-dark) {
    background-color: #313a46!important;
  }
  :deep(.bg-warning) {
    background-color: #ffbc00!important;
  }

}
</style>
