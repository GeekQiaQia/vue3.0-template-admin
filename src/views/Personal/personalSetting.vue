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
            <template>
                <span>sss</span>
            </template>

          </el-card>
        </div></el-col
      >
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted} from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PersonalSetting',
  setup() {
    const router = useRouter()



    onMounted(() => {

    })
    // methods

    const handleBack = () => {
      router.go(-1)
    }
    return {
      handleBack,

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
