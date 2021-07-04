<template>
  <div class="FormInfo">
    <div class="info">
      <el-divider content-position="left">高级表单</el-divider>
      <span style="text-align: left">高级表单常见于一次性输入和提交大批量数据的场景。</span>
    </div>
    <el-row>
      <el-col :offset="1" :span="22">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <el-button class="button" type="text" @click="handleBack"><i class="el-icon-arrow-left" />返回</el-button>

                <span>表单信息</span>
                <div></div>
              </div>
            </template>
            <div style="text-align: left">
              <span>记录管理</span>
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
                  <el-button v-if="scope.row.edit" size="mini" type="success" icon="el-icon-check" @click="handleSave(scope.$index, scope.row)">保存</el-button>

                  <el-button v-else size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-popconfirm
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    icon="el-icon-info"
                    icon-color="red"
                    title="确定删除该条记录吗？"
                    @confirm="handleDelete(scope.$index, scope.row)"
                  >
                    <template #reference>
                      <el-button size="mini" icon="el-icon-delete" type="danger">删除</el-button>
                    </template>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin: 5px"><el-button @click="handleAddRecord">+ 新增记录</el-button></div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :offset="1" :span="22">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-card">
            <div style="text-align: left">
              <span>活动管理</span>
              <el-divider></el-divider>
            </div>
            <el-form ref="activityForm" style="text-align: left" :model="sizeForm" label-width="80px" size="mini">
              <el-form-item label="活动名称">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="活动时间">
                <el-col :span="11">
                  <el-date-picker v-model="sizeForm.date1" type="date" placeholder="选择日期" style="width: 100%"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-time-picker v-model="sizeForm.date2" placeholder="选择时间" style="width: 100%"></el-time-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="活动性质">
                <el-checkbox-group v-model="sizeForm.type">
                  <el-checkbox-button label="美食/餐厅线上活动" name="type"></el-checkbox-button>
                  <el-checkbox-button label="地推活动" name="type"></el-checkbox-button>
                  <el-checkbox-button label="线下主题活动" name="type"></el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="特殊资源">
                <el-radio-group v-model="sizeForm.resource" size="medium">
                  <el-radio border label="线上品牌商赞助"></el-radio>
                  <el-radio border label="线下场地免费"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" @click="submitForm">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div></el-col
      >
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'AdvanceForm',
  setup() {
    const router = useRouter()

    const tableData = reactive([
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
    ])

    const sizeForm = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    })

    const activityForm = ref()
    onMounted(() => {
      // eslint-disable-next-line no-console
      console.log('show sizeFormRef.value', activityForm.value)
    })
    // methods
    const submitForm = () => {
      activityForm.value.validate((valid: any): boolean => {
        if (valid) {
          ElMessage({
            type: 'success',
            message: '创建成功'
          })
          return true
        }
        // eslint-disable-next-line no-console
        console.log('error submit!!')
        return false
      })
    }
    const resetForm = () => {
      activityForm.value.resetFields()
    }
    const handleBack = () => {
      router.go(-1)
    }
    const handleEdit = (index: any, row: any) => {
      // eslint-disable-next-line no-console
      console.log(index, row)
      tableData[index].edit = true
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
      tableData[index].edit = false
      tableData[index] = row
      ElMessage({
        type: 'success',
        message: '保存成功'
      })
      return true
    }
    const handleDelete = (index: any, row: any) => {
      // eslint-disable-next-line no-console
      console.log(index, row)
      tableData.splice(index, 1)
    }
    // 新增一条记录
    const handleAddRecord = () => {
      tableData.push({
        province: '',
        city: '',
        name: '',
        address: '',
        edit: true
      })
    }
    return {
      handleAddRecord,
      handleEdit,
      handleSave,
      handleDelete,
      tableData,
      handleBack,
      sizeForm,
      activityForm,
      submitForm,
      resetForm
    }
  }
})
</script>

<style lang="stylus" scoped>
.FormInfo{
    margin-top:20px;
    .demo-ruleForm{
        text-align :left;
    }
    .info{
        text-align: left;
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
    }
     .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width:100%;
  }

   .el-row {
       margin-bottom: 20px;
     }
}
</style>
