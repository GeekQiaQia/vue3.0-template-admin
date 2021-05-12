<template>
  <div class="analysisInfo">
    <el-row>
      <el-col :offset="1" :span="22">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <el-button class="button" type="text" @click="handleBack"><i class="el-icon-arrow-left" />返回</el-button>

                <span>仪表信息</span>
                <div></div>
              </div>
            </template>

            <div class="progress-container">
              <div class="progress">
                <el-progress type="dashboard" :percentage="percentage" :color="colors"></el-progress>
                <div><span>需求</span></div>
              </div>
              <div class="progress">
                <el-progress type="dashboard" :percentage="devPercentage" :color="colors"></el-progress>
                <div><span>开发</span></div>
              </div>
              <div class="progress">
                <el-progress type="dashboard" :percentage="testPercentage" :color="colors"></el-progress>
                <div><span>测试</span></div>
              </div>
              <div class="progress">
                <el-progress type="dashboard" :percentage="proPercentage" :color="colors"></el-progress>
                <div><span>产品</span></div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Analysis',
  setup() {
    const percentage = ref(20)
    const devPercentage = ref(40)
    const testPercentage = ref(60)
    const proPercentage = ref(80)

    const colorArr = [
      { color: '#f56c6c', percentage: 20 },
      { color: '#e6a23c', percentage: 40 },
      { color: '#5cb87a', percentage: 60 },
      { color: '#1989fa', percentage: 80 },
      { color: '#6f7ad3', percentage: 100 }
    ]
    const colors = ref(colorArr)
    // methods
    const increase = () => {
      percentage.value += 10
      if (percentage.value > 100) {
        percentage.value = 100
      }
    }
    const decrease = () => {
      percentage.value -= 10
      if (percentage.value < 0) {
        percentage.value = 0
      }
    }
    return {
      percentage,
      devPercentage,
      testPercentage,
      proPercentage,
      colors,
      increase,
      decrease
    }
  }
})
</script>
<style lang="stylus" scoped>
.analysisInfo{
   margin-top:20px;

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
  .progress-container{
      display:flex;
      flex-direction :row;
      justify-content space-around;
      align-items center;

        .progress{
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items center;
  }
  }

}
</style>
