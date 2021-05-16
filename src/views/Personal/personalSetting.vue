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
                 <el-tabs :tab-position="tabPosition" style="height: 200px;">
                    <el-tab-pane label="基本设置">基本设置</el-tab-pane>
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
import { defineComponent, onMounted,ref} from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PersonalSetting',
  setup() {
    const router = useRouter()
    const tabPosition=ref('left');


    onMounted(() => {

    })
    // methods

    const handleBack = () => {
      router.go(-1)
    }
    return {
      handleBack,
      tabPosition

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
