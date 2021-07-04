<template>
  <div class="analysis-info">
    <div class="info">
      <span style="display: block; font-size: 24px; margin: 24px 0">数据可视化</span>
      <span style="text-align: left"
        >数据可视化主要旨在借助于图形化手段，清晰有效地传达与沟通信息，<el-link type="primary" href="https://g2.antv.vision/zh/examples/">AntV G2 让数据栩栩如生</el-link></span
      >
    </div>
    <el-row>
      <el-col :span="24">
        <div class="indicators">
          <div class="indicator">
            <div class="title">访问 UV</div>
            <div class="measure">
              <div class="value">2.211</div>
              <div class="unit">亿</div>
            </div>
            <div class="compare">
              <div class="name">日环比</div>
              <div class="icon up"></div>
              <div class="value up">8.9%</div>
            </div>
          </div>
          <div class="indicator">
            <div class="title">点击 UV</div>
            <div class="measure">
              <div class="value">15.2</div>
              <div class="unit">%</div>
            </div>
            <div class="compare">
              <div class="name">日环比</div>
              <div class="icon up"></div>
              <div class="value up">2.3%</div>
            </div>
          </div>
          <div class="indicator">
            <div class="title">UV 点击率</div>
            <div class="measure">
              <div class="value">875</div>
              <div class="unit">%</div>
            </div>
            <div class="compare">
              <div class="name">日环比</div>
              <div class="icon down"></div>
              <div class="value down">1.83%</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-row>
          <el-col :span="6"> 经营状况 </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div ref="plot1Ref"></div>
          </el-col>
          <el-col :span="6">
            <div ref="plot2Ref"></div>
          </el-col>
          <el-col :span="6">
            <div ref="plot3Ref"></div>
          </el-col>
          <el-col :span="6">
            <div ref="plot4Ref"></div>
          </el-col>
        </el-row>
        <el-row>
          <el-row>
            <el-col :span="24"> 转化率 </el-col>
          </el-row>
          <el-col :span="24">
            <div ref="barRef"></div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row> 城市分布 </el-row>
        <div ref="chartRef"></div
      ></el-col>
    </el-row>
    <el-row justify="start"> 指标转化桑基图 </el-row>
    <el-row>
      <el-col :span="24">
        <div ref="indicatorRef"></div>
      </el-col>
    </el-row>
    <el-row justify="start"> 用户年龄分布 </el-row>
    <el-row>
      <el-col :span="24">
        <div ref="ageRef"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useInitPlot, useInitBar, useInitChart, useInitIndicator, useInitAge } from './useInitG2'

export default defineComponent({
  name: 'Analysis',
  setup() {
    const plot1Ref = ref()
    const plot2Ref = ref()
    const plot3Ref = ref()
    const plot4Ref = ref()
    const chartRef = ref()
    const barRef = ref()
    const indicatorRef = ref()
    const ageRef = ref()
    onMounted(() => {
      useInitPlot(plot1Ref.value, '盈利率')
      useInitPlot(plot2Ref.value, '今日UV')
      useInitPlot(plot3Ref.value, '今日PV')
      useInitPlot(plot4Ref.value, '净增长')
      useInitChart(chartRef.value)
      useInitBar(barRef.value)
      useInitIndicator(indicatorRef.value)
      useInitAge(ageRef.value)
    })

    return {
      plot1Ref,
      plot2Ref,
      plot3Ref,
      plot4Ref,
      chartRef,
      barRef,
      indicatorRef,
      ageRef
    }
  }
})
</script>
<style lang="stylus" scoped>
.analysis-info{
  // background: #100c2a;
  color:black;
  padding:0px 20px;
  .indicators {
  font-family: PingFangSC-Regular;
  display: flex;
}
.indicators .indicator {
  padding: 16px;
}
.indicators .indicator .title {
  font-size: 12px;
  color: #000000;
  opacity: 0.65;
}
.indicators .indicator .measure {
  margin-top: 4px;
  display: flex;
  align-items: baseline;
}
.indicators .indicator .measure .value {
  margin-right: 12px;
  opacity: 0.85;
  font-family: Helvetica;
  font-size: 24px;
  color: #000000;
}
.indicators .indicator .measure .unit {
  font-size: 12px;
  color: #333;
  opacity: 0.65;
}
.indicators .indicator .compare {
  display: flex;
  align-items: baseline;
}
.indicators .indicator .compare .name {
  color: #666;
  margin-right: 4px;
}
.indicators .indicator .compare .icon {
  width: 0;
  height: 0;
  border-left: 3.5px solid transparent;
  border-right: 3.5px solid transparent;
  border-bottom: 9px solid #000;
  margin-right: 4px;
}
.indicators .indicator .compare .icon.up {
  transform: rotate(0deg);
  color: #f5684a;
  border-bottom-color: #f5684a;
}
.indicators .indicator .compare .icon.down {
  transform: rotate(180deg);
  color: #28a995;
  border-bottom-color: #28a995;
}
.indicators .indicator .compare .value.up {
  color: #f5684a;
}
.indicators .indicator .compare .value.down {
  color: #28a995;
}

   .info{
    text-align: left;
    margin-bottom: 20px;
    font-size: 12px;
    }

    .echart-container{
  .echart{
   background: rgb(16, 12, 42);
   border:1px solid white;
   margin:10px;
  }
  .bottom-chart{
    width:100%;
    display :flex;
    flex-direction:row;
    justify-content :space-between;
    align-items :center;
  }
}
}
.el-card__body{

      padding:0px !important;
    }
</style>
