<template>
  <div class="stepForm">
    <div class="info">
      <el-divider content-position="left">分步表单</el-divider>
      <span style="text-align: left">将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。</span>
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
            <el-steps :active="active" align-center="false" finish-status="success">
              <el-step title="填写转账信息" description="请仔细填写转账信息"></el-step>
              <el-step title="确认转账信息" description="请仔细核对转账信息"></el-step>
              <el-step title="完成" description="操作成功"></el-step>
            </el-steps>
            <template v-if="active == 0">
              <el-form ref="accountForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                <el-form-item label="付款账户" prop="payAccountNo">
                  <el-input v-model="ruleForm.payAccountNo"></el-input>
                </el-form-item>
                <el-form-item label="收款账户" prop="accAccountNo">
                  <el-input v-model="ruleForm.accAccountNo">
                    <template #prepend>
                      <el-select v-model="selectedAccType" style="width: 110px" placeholder="请选择">
                        <el-option label="支付宝" value="1"></el-option>
                        <el-option label="银行账户" value="2"></el-option>
                      </el-select>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="收款人姓名" prop="accAccountName">
                  <el-input v-model="ruleForm.accAccountName"></el-input>
                </el-form-item>
                <el-form-item label="转账金额" prop="transferNum">
                  <el-input v-model.number="ruleForm.transferNum" prefix-icon="el-icon-money"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleNextStep()">下一步</el-button>
                  <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
              </el-form>
            </template>
            <template v-else-if="active == 1">
              <el-form ref="accountForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="付款账户" prop="payAccountNo">
                  <el-input v-model="ruleForm.payAccountNo" readonly></el-input>
                </el-form-item>
                <el-form-item label="收款账户" prop="payAccountNo">
                  <el-input v-model="ruleForm.accAccountNo" readonly></el-input>
                </el-form-item>
                <el-form-item label="付款人姓名" prop="payAccountNo">
                  <el-input v-model="ruleForm.accAccountName" readonly></el-input>
                </el-form-item>
                <el-form-item label="转账金额" prop="payAccountNo">
                  <el-input v-model="ruleForm.transferNum" readonly></el-input>
                </el-form-item>
              </el-form>
              <el-form-item>
                <el-button type="warning" @click="submitForm()">提交</el-button>
                <el-button @click="handleLastStep()">上一步</el-button>
              </el-form-item>
              <el-divider></el-divider>
            </template>
            <template v-else-if="active == 3">
              <el-result icon="success" title="操作成功" sub-title="预计两小时内到账">
                <template #extra>
                  <el-button type="primary" size="medium" @click="handleRedo">再转一笔</el-button>
                </template>
              </el-result>
            </template>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const rules = {
      payAccountNo: [{ required: true, message: '请输入付款人账户', trigger: 'blur' }],
      accAccountNo: [{ required: true, message: '请输入收款人账户', trigger: 'blur' }],
      accAccountName: [{ required: true, message: '请输入收款人姓名', trigger: 'blur' }],
      transferNum: [{ required: true, message: '请输入转账金额', trigger: 'blur' }]
    }
    const accountForm = ref()
    const active = ref(0)
    const ruleForm = reactive({
      payAccountNo: '',
      accAccountNo: '',
      accAccountName: '',
      transferNum: ''
    })
    // 下一步标记
    const selectedAccType = ref('1')

    const router = useRouter()
    // method

    const handleNextStep = () => {
      accountForm.value.validate((valid: any) => {
        if (valid) {
          active.value = 1
          // eslint-disable-next-line no-console
          console.log('handle ruleForm  data', ruleForm)
          return true
        }
        // eslint-disable-next-line no-console
        console.log('error submit!!')
        return false
      })
    }
    const handleLastStep = () => {
      active.value = 0
      return true
    }

    const submitForm = () => {
      active.value = 3
      return true
    }
    const resetForm = () => {
      accountForm.value.resetFields()
    }
    const handleBack = () => {
      router.go(-1)
    }
    const handleRedo = () => {
      // resetForm
      active.value = 0
    }
    return {
      handleRedo,
      active,
      handleBack,
      ruleForm,
      selectedAccType,
      rules,
      submitForm,
      handleNextStep,
      handleLastStep,
      accountForm,
      resetForm
    }
  }
})
</script>

<style lang="stylus" scoped>
.stepForm{
    margin-top:20px;
    .demo-ruleForm{
        text-align :left;
        width:500px;
        margin:15px;


    }
    .confirmInfo{
        display:flex;
        flex-direction:column;
        justify-content center;
        align-items center;
        .infoItem{
            display:flex;
            flex-direction :row;
            justify-content flex-start;
            align-items center;
            width:300px;

            .label{
                    font-weight: 400;
                color: rgba(0,0,0,.85);
                font-size: 14px;
            }
        }
        .value{
            color: rgba(0,0,0,.85);
            font-size: 14px;
        }
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
  .el-step__head{
      text-align:left;
  }
}
  .el-input-group__prepend{
        width:80px !important;
    }
    .el-input-group__append, .el-input-group__prepend{
        background-color:white;
    }
      .el-select .el-input {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
     ackground-color: #fff;
    }
</style>
