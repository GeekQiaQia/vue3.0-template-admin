<template>
  <div id="guide-info" class="guide-container">
    <div class="info">
      <el-divider content-position="left">引导页</el-divider>
      <span style="text-align: left">通常用于首次进入app应用的功能介绍、组件交互、用户注意力转移等场景。 </span>
      <el-link href="https://kamranahmed.info/driver.js/#single-element-no-popover" type="primary" target="_blank">driver.js</el-link>
    </div>
    <div>
      <el-row>
        <el-col :offset="1" :span="22">
          <div class="grid-content bg-purple-dark">
            <el-card class="box-card">
              <div style="text-align: left">
                <span>首次进入场景</span>
                <el-divider></el-divider>
              </div>
              <div class="section">
                <el-button type="primary" round @click="handleShowHighlight">展示引导</el-button>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './step'

export default defineComponent({
  name: 'Guide',
  setup() {
    const driver = ref()

    const handleShowGuide = () => {
      driver.value.defineSteps(steps)
      driver.value.start()
    }
    const handleShowHighlight = () => {
      const highlightTab = new Driver()
      highlightTab.highlight({
        element: '#Tabs',
        popover: {
          title: '引导页',
          description: '功能页区域介绍，用于查询不熟悉app应用的操作场景',
          position: 'bottom'
        }
      })
    }
    onMounted(() => {
      driver.value = new Driver({
        // className: 'scoped-class', // className to wrap driver.js popover
        animate: true, // Animate while changing highlighted element
        doneBtnText: '完成', // Text on the final button
        closeBtnText: '关闭', // Text on the close button for this step
        nextBtnText: '下一步', // Next button text for this step
        prevBtnText: '上一步', // Previous button text for this step
        keyboardControl: true // Allow controlling through keyboard (escape to close, arrow keys to move)
      })
      handleShowGuide()
    })
    return {
      handleShowGuide,
      handleShowHighlight
    }
  }
})
</script>
<style lang="stylus" scoped>
.guide-container{
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
