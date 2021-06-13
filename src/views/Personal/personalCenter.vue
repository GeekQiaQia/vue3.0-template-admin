<template>
  <div class="home-container page-container">
    <el-row :gutter="20">
      <el-col :span="7" :offset="1">
        <el-card class="box-card">
          <div class="account-avatar">
            <img src="../../assets/avatar-default.jpg" />
            <div class="account-name">极客恰恰</div>
            <div class="account-sign">极客签名,持续学习</div>
          </div>
          <div class="account-detail">
            <el-descriptions class="detail" :column="1" :size="size">
              <el-descriptions-item>
                <template #label>
                  <i class="el-icon-user"></i>
                  用户名:
                </template>
                sara
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <i class="el-icon-chat-dot-round"></i>
                  状态:
                </template>
                在职
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <i class="el-icon-location-information"></i>
                  地址:
                </template>
                上海市虹口区
              </el-descriptions-item>
            </el-descriptions>
          </div>
          <div class="divider divider-dashed"></div>
          <div class="tag-title"><span>标签</span></div>
          <div class="tag-dynamic">
            <el-tag v-for="tag in dynamicTags" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)">
              {{ tag }}
            </el-tag>
            <el-input v-if="inputVisible" ref="saveTagInput" v-model="inputValue" class="input-new-tag" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm"> </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            <div class="divider divider-dashed"></div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="15" :push="0">
        <el-card class="box-card">
          <el-calendar>
            <template #dateCell="{ data }">
              <p :class="data.isSelected ? 'is-selected' : ''" @dblclick="handleDoubleClick(data.day)" @click="handleFocusCurrent(data.day)">
                {{ data.day.split('-')[2] }} {{ data.isSelected ? '✔️' : '' }}
              </p>
              <ul>
                <p v-for="[key, value] of record.entries()" :key="key">
                  <template v-if="key === data.day">
                    <li v-for="(tasks, index) in value" :key="tasks">
                      <span style="height: auto; line-height: 0px" class="el-tag el-tag--light" data-v-53b8cb1a=""
                        >{{ tasks.task }}<i class="el-tag__close el-icon-close" @click="handleListItem(index, value)"></i
                      ></span>
                    </li>
                  </template>
                </p>
              </ul>
            </template>
          </el-calendar>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="dialogFormVisible" title="请输入列表任务">
      <el-form :model="listForm">
        <el-form-item label="当前任务" :label-width="formLabelWidth">
          <el-input v-model="listForm.task" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddNewTask">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from '@/utils/request'

export default defineComponent({
  name: 'PersonalCenter',
  components: {},
  setup() {
    const state = reactive({
      dynamicTags: ['default'],
      inputVisible: false,
      inputValue: ''
    })
    const formLabelWidth = ref(100)
    const listForm = reactive({
      task: ''
    })
    // const initData=[

    // ['2021-05-19',[{task:"读书看报"}]],

    // ['2021-05-20',[{task:"吃饭打屁"}]]
    // ];

    const currentEdit = ref()
    // record.set();
    const recordData = reactive({
      record: new Map()
    })
    const computedData = computed(() => recordData.record.entries())
    const size = ref('medium')
    const showDesc = ref(true)
    const dialogFormVisible = ref(false)
    const selectedDay = ref()

    // mothods
    const handleClose = (tag: string) => {
      state.dynamicTags.splice(state.dynamicTags.indexOf(tag), 1)
    }
    const filterData = computed(() => recordData.record.get(selectedDay.value))

    const showInput = () => {
      state.inputVisible = true
    }
    const filter = (day: any) => {
      if (recordData.record.has(day)) {
        return recordData.record.get(day)
      }
      return false
    }

    const handleDoubleClick = (day: any) => {
      selectedDay.value = day

      dialogFormVisible.value = true
      listForm.task = ''
    }
    /**
     * @description 获取角色
     */
    const getTaskList = async () => {
      await axios
        .get('/api/personal/tasks')
        .then((res: any) => {
          if (res.data.code === 0) {
            const initData = res.data.data.tasks
            const record = new Map(initData as any)
            recordData.record = record
          }
        })
        .catch((err: any) => {
          // eslint-disable-next-line no-console
          console.error(err)
        })
    }
    /**
     * @description 获取当前tags
     */
    /**
     * @description 获取角色
     */
    const getTagList = async () => {
      await axios
        .get('/api/personal/tags')
        .then((res: any) => {
          if (res.data.code === 0) {
            state.dynamicTags = res.data.data.tags
          }
        })
        .catch((err: any) => {
          // eslint-disable-next-line no-console
          console.error(err)
        })
    }

    /**
     * @description 删除当前列表任务
     */
    const handleListItem = (index: number, list: any[]) => {
      // 删除当前item ;
      list.splice(index, 1)

      ElMessage({
        type: 'success',
        message: '删除成功!'
      })
    }
    const handleAddNewTask = () => {
      // 存储当前日期的事件；
      if (recordData.record.get(selectedDay.value)) {
        recordData.record.get(selectedDay.value as string).push([{ task: listForm.task }])
      } else {
        // fixbug proxy 代理对象的索引
        recordData.record.set(selectedDay.value, [{ task: listForm.task }])
      }
      dialogFormVisible.value = false
    }
    // 聚焦的时候，
    const handleFocusCurrent = (day: any) => {
      selectedDay.value = day
      currentEdit.value = recordData.record.get(selectedDay.value)
    }
    const handleBlurCurrent = () => {
      recordData.record.set(selectedDay.value, currentEdit.value)
      // 更新到后台接口
    }
    const handleInputConfirm = () => {
      const { inputValue } = state
      if (inputValue) {
        state.dynamicTags.push(inputValue)
      }
      state.inputVisible = false
      state.inputValue = ''
    }

    const handleInputEnter = () => {}

    onMounted(() => {
      getTaskList()
      getTagList()
    })
    return {
      dialogFormVisible,
      computedData,
      filter,
      listForm,
      formLabelWidth,
      handleListItem,
      handleAddNewTask,
      handleDoubleClick,
      handleBlurCurrent,
      handleFocusCurrent,
      currentEdit,
      filterData,
      ...toRefs(state),
      ...toRefs(recordData),
      size,
      showDesc,
      handleClose,
      showInput,
      handleInputConfirm,
      handleInputEnter
    }
  }
})
</script>
<style lang="stylus" scoped>
.box-card{
  p{
    text-align :right;
  }
    .is-selected {
    color: #1989FA;
  }
  ul{
    margin-top: 4%;
    margin-left: 15%;
    width: 80%;
    text-align :left;
    position: relative;
    display: inline-block;
    background-color: white;
    li{
      text-align :left;
      .list-tag{
            background-color: #ecf5ff;
            border-color: #d9ecff;
            height: 32px;
            padding: 0 10px;
            line-height: 30px;
            font-size: 12px;
            color: #409EFF;
            border-width: 1px;
            border-style: solid;
            border-radius: 4px;
            box-sizing: border-box;
            white-space: nowrap;
            .el-icon-close{
              border-radius: 50%;
                text-align: center;
                position: relative;
                cursor: pointer;
                font-size: 12px;
                height: 16px;
                width: 16px;
                line-height: 16px;
                vertical-align: middle;
                top: -1px;
                right: -5px;

                :before{
                  display :block;
                }
             }
        .el-tag__close{
                  color: #409eff;
            }
      }

    }
  }
  margin-top:14px;
  .account-avatar{
    text-align: center;
    margin-bottom :24px;
    img{
      width:105px;
      height:105px;
      margin-bottom :20px;
      border-radius:50%;
    }
    .account-name{
      margin-bottom: 4px;
      color: rgba(0,0,0,.85);
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }

  }
  .account-detail{
    .detail{
      display :flex;
      flex-direction:column;
      justify-content :flex-start;
      align-items :flex-start;
    }
  }
  .divider{
    display: flex;
    clear: both;
    width: 100%;
    min-width: 100%;
    margin: 24px 0;
  }
  .divider-dashed{
    background: 0 0;
    border: dashed rgba(0,0,0,.06);
    border-width: 1px 0 0;
  }
  .tag-title{
    text-align:left;
  }
  .tag-dynamic{
        display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    margin: 10px 0px;

  }
   .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
