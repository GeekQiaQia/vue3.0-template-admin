<template>
  <div class="FormInfo">
    <div class="info">
      <el-divider content-position="left">基础表单</el-divider>
      <span style="text-align: left">用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。</span>
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
            <el-form ref="ruleFormRef" :model="ruleForm" label-position="right" :rules="rules" label-width="100px" class="demo-ruleForm">
              <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="活动区域" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="活动时间" required>
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker v-model="ruleForm.date1" type="date" placeholder="选择日期" style="width: 100%"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="date2">
                    <el-time-picker v-model="ruleForm.date2" placeholder="选择时间" style="width: 100%"></el-time-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="即时配送" prop="delivery">
                <el-switch v-model="ruleForm.delivery"></el-switch>
              </el-form-item>
              <el-form-item label="活动性质" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                  <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                  <el-checkbox label="地推活动" name="type"></el-checkbox>
                  <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                  <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="特殊资源" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="线上品牌商赞助"></el-radio>
                  <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="活动形式" prop="desc">
                <el-input v-model="ruleForm.desc" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm()">立即创建</el-button>
                <el-button @click="resetForm()">重置</el-button>
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

export default defineComponent({
  name: 'FormInfo',
  setup() {
    const router = useRouter()
    const rules = {
      name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ],
      region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
      date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
      date2: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
      type: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }],
      resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
      desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
    }
    const ruleForm = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    })

    const ruleFormRef = ref()
    onMounted(() => {
      // eslint-disable-next-line no-console
      console.log('show ruleFormRef.value', ruleFormRef.value)
    })
    // methods
    const submitForm = () => {
      ruleFormRef.value.validate((valid: any): boolean => {
        if (valid) {
          // eslint-disable-next-line no-alert
          alert('submit!')
          return true
        }
        // eslint-disable-next-line no-console
        console.log('error submit!!')
        return false
      })
    }
    const resetForm = () => {
      ruleFormRef.value.resetFields()
    }
    const handleBack = () => {
      router.go(-1)
    }
    return {
      handleBack,
      rules,
      ruleForm,
      ruleFormRef,
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
}
</style>
