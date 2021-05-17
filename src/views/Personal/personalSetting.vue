<template>
  <div class="PersonalSetting">
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
            <fragment>
              <el-tabs :tab-position="tabPosition">
                <el-tab-pane label="基本设置">
                  <div class="set-title">
                    <span>基本设置</span>
                  </div>
                  <div class="set-info">
                    <div class="form-info">
                      <el-form ref="settingFormRef" :model="settingForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="邮箱" prop="email">
                          <el-input v-model="settingForm.email" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="昵称" prop="nickname">
                          <el-input v-model="settingForm.nickname" placeholder="请输入昵称" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="个人简介" prop="desc">
                          <el-input v-model="settingForm.desc" type="textarea" placeholder="个人简介" maxlength="120"></el-input>
                        </el-form-item>

                        <el-form-item label="联系电话" prop="mobile">
                          <el-input v-model="settingForm.mobile" placeholder="请输入11位大陆手机号码"></el-input>
                        </el-form-item>

                        <el-form-item>
                          <el-button type="primary" @click="submitForm()">更新基本信息</el-button>
                          <el-button @click="resetForm()">重置</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div class="avatar">
                      <div class="preview">
                        <span>头像</span>
                        <img src="../../assets/avatar-default.jpg">
                      </div>
                      <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                      >
                         <el-button style="margin-left: 10px;" size="small" type="success" ><i class="el-icon-upload"></i>更换头像</el-button>
                      </el-upload>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="安全设置">安全设置</el-tab-pane>
                <el-tab-pane label="账号绑定">账号绑定</el-tab-pane>
                <el-tab-pane label="个性化">个性化</el-tab-pane>
                <el-tab-pane label="新消息通知">新消息通知</el-tab-pane>
              </el-tabs>
            </fragment>
          </el-card>
        </div></el-col
      >
    </el-row>
  </div>
</template>
<script lang="ts">
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PersonalSetting',
  setup() {
    const router = useRouter()
    const tabPosition = ref('left')
    const settingFormRef = ref()
    const settingForm = reactive({
      email: '',
      nickname: '',
      desc: '',
      mobile: ''
    })
    const imageUrl = ref()

    // eslint-disable-next-line no-unused-vars
    const validateMobile = (rule: any, value: string, callback: (arg0: Error | undefined) => void) => {
      if (value === '') {
        callback(new Error('手机号码不可为空哦'))
      } else {
        const reg = /^1[3-9]\d{9}$/
        if (reg.test(value)) {
          callback(undefined)
        } else {
          callback(new Error('请输入正确的手机号码'))
        }
      }
    }

    //
    const rules = {
      email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ],
      nickname: { required: true, message: '请输入昵称', trigger: ['blur', 'change'] },
      desc: { required: true, message: '请输入个人简介', trigger: ['blur', 'change'] },
      mobile: { required: true, validator: validateMobile, trigger: ['blur', 'change'] }
    }
    onMounted(() => {})
    // methods

    const handleBack = () => {
      router.go(-1)
    }
    const submitForm = () => {
      settingFormRef.value.validate((valid: any) => {
        if (valid) {
          // 执行通过校验以后的操作；
          return true
        }
        return false
      })
    }
    const resetForm = () => {
      settingFormRef.value.resetFields()
    }
    const handleAvatarSuccess = (res: any, file: { raw: any }) => {
      console.log(file);
      imageUrl.value = URL.createObjectURL(file.raw)
    }
    const beforeAvatarUpload = (file: { raw: any,type: string; size: number }) => {
      console.log(file);
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        ElMessage.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
    return {
      handleBack,
      tabPosition,
      settingFormRef,
      settingForm,
      submitForm,
      resetForm,
      handleAvatarSuccess,
      beforeAvatarUpload,
      rules,
      imageUrl
    }
  }
})
</script>

<style lang="stylus" scoped>
.PersonalSetting{
    margin-top:20px;
    .demo-ruleForm{
        text-align :left;
    }
    .set-title{
      text-align :left;
    }
    .set-info{
      display :flex;
      flex-direction :row;
      justify-content :space-around;
      align-items :flex-start;
      .form-info{


      }
      .avatar{
        display :flex;
        flex-direction:row;
        justify-content:flex-start;
        align-items :flex-end;
        .preview{
           display :flex;
        flex-direction:column;
        justify-content:flex-start;
        align-items :flex-start;
        margin-right:20px;
         img{
            width:174px;
          height:174px;
          border-radius:50%;
         }
        }

          .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
          .avatar {
            width: 178px;
            height: 178px;
            display: block;
          }
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
}
</style>
