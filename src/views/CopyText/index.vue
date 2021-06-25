<template>
  <div class="copy-container">
    <div class="info">
      <el-divider content-position="left">文本复制</el-divider>
      <span style="text-align: left">文本复制常用于多数据拼接或者长文本内容复制场景。</span>
    </div>
    <div>
      <el-row>
        <el-col :offset="1" :span="22">
          <div class="grid-content bg-purple-dark">
            <el-card class="box-card">
              <div style="text-align: left">
                <span>长文本内容复制场景</span>
                <el-divider></el-divider>
              </div>
              <div class="section">
                <el-input id="textarea" v-model="inputContent" style="width: 70%; margin: 0px 20px" type="textarea" :rows="2" placeholder="请输入内容"> </el-input>
                <el-button size="medium" type="success" plain @click="handleCopyInput(inputContent, $event)">复制</el-button>
                <!--clipboard bug-->
                <!-- <el-button v-clip:cut="inputContent" class="cut-btn" size="medium" type="warning" plain>剪切</el-button> -->
                <!-- <el-button class="cut-btn" size="medium" type="warning" plain data-clipboard-action="cut" data-clipboard-target="#textarea">剪切</el-button> -->
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1" :span="22">
          <div class="grid-content bg-purple-dark">
            <el-card class="box-card">
              <div style="text-align: left">
                <span>多数据拼接复制场景</span>
                <el-divider></el-divider>
              </div>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="姓名" width="180">
                  <template #default="scope">
                    <el-popover effect="light" trigger="hover" placement="top">
                      <template #default>
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                      </template>
                      <template #reference>
                        <el-input v-if="scope.row.edit" v-model="scope.row.name"></el-input>
                        <div v-else class="name-wrapper">
                          <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                      </template>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column prop="province" label="省份" width="120">
                  <template #default="scope">
                    <el-input v-if="scope.row.edit" v-model="scope.row.province"></el-input>
                    <span v-else>{{ scope.row.province }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="city" label="市区" width="120">
                  <template #default="scope">
                    <el-input v-if="scope.row.edit" v-model="scope.row.city"></el-input>
                    <span v-else>{{ scope.row.city }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="详细地址">
                  <template #default="scope">
                    <el-input v-if="scope.row.edit" v-model="scope.row.address"></el-input>
                    <span v-else>{{ scope.row.address }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template #default="scope">
                    <el-button v-if="scope.row.edit" size="medium" type="success" plain icon="el-icon-check" @click="handleSave(scope.$index, scope.row)">保存</el-button>

                    <el-button v-else v-clip:copy="`姓名:${scope.row.name},详细地址:${scope.row.address}`" size="medium" type="info" icon="el-icon-copy" plain>复制</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin: 5px"><el-button @click="handleAddRecord">+ 新增记录</el-button></div>
            </el-card>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, reactive, toRefs } from 'vue'
import ClipboardJS from 'clipboard'
import { ElMessage } from 'element-plus'
import clipboard from '@/utils/clipboard' // use clipboard directly
import clip from '@/directive/clipboard/clipboard'

export default defineComponent({
  name: 'RichText',
  components: {},
  directives: {
    clip
  },
  setup() {
    const inputContent = ref('vue3+vite+typescirpt+ElementPlus')
    const cutClipboard = new ClipboardJS('.cut-btn')

    // clipboard's bug for event twice and cut clip
    onMounted(() => {
      if (cutClipboard) {
        cutClipboard.on('success', (e) => {
          ElMessage({
            type: 'success',
            message: '剪切成功'
          })
          e.clearSelection()
        })
      }
    })

    onUnmounted(() => {
      cutClipboard.destroy()
    })

    const state = reactive({
      tableData: [
        {
          province: '上海市',
          city: '浦东新区',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 1518 弄',
          edit: false
        },
        { province: '上海市', city: '浦东新区', name: '王小虎2', address: '上海市普陀区金沙江路 1517 弄', edit: false },
        {
          province: '上海市',
          city: '浦东新区',
          name: '王小虎3',
          address: '上海市普陀区金沙江路 1519 弄',
          edit: false
        },
        {
          province: '上海市',
          city: '浦东新区',
          name: '王小虎4',
          address: '上海市普陀区金沙江路 1516 弄',
          edit: true
        }
      ]
    })

    const handleEdit = (index: any, row: any) => {
      // eslint-disable-next-line no-console
      console.log(index, row)
      state.tableData[index].edit = true
    }
    /**
     * @description  useXXX写法,代替mixin有待改进的地方
     * */
    const checkEmpty = (row: any) => {
      const result = Object.keys(row).some((key) => row[key] === '')
      return result
    }
    const handleSave = (index: any, row: any): Boolean => {
      // eslint-disable-next-line no-console
      console.log(index, row)
      if (checkEmpty(row)) {
        ElMessage.warning('保存前请完善信息！')
        return false
      }
      // save current row data and update table data;
      state.tableData[index].edit = false
      state.tableData[index] = row
      return true
    }
    const handleDelete = (index: any, row: any) => {
      // eslint-disable-next-line no-console
      console.log(index, row)
      state.tableData.splice(index, 1)
    }
    /**
     * @description 新增一条记录
     * */
    const handleAddRecord = () => {
      state.tableData.push({
        province: '',
        city: '',
        name: '',
        address: '',
        edit: true
      })
    }
    /**
     * @description 处理复制输入框
     */
    const handleCopyInput = (content: any, event: any) => {
      const options = {
        successTip: '复制成功',
        failedTip: '复制失败'
      }
      clipboard(content, event, options)
    }
    return {
      handleCopyInput,
      inputContent,
      handleAddRecord,
      handleEdit,
      handleSave,
      handleDelete,
      ...toRefs(state)
    }
  }
})
</script>
<style lang="stylus" scoped>
.copy-container{
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
}
</style>
