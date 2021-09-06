<template>
  <div class="analysis-info">
    <div class="info">
      <span style="display: block; font-size: 24px; margin: 24px 0">数据可视化</span>
      <span style="text-align: left"
        >数据可视化主要旨在借助于图形化手段，清晰有效地传达与沟通信息，<el-link type="primary" href="https://g2.antv.vision/zh/examples/">AntV G2 让数据栩栩如生</el-link></span
      >
    </div>
    <el-card>
      <el-row :gutter="20" type="flex">
        <el-col v-for="item in cardItems" :key="item.id" :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
          <el-card shadow="always" :body-style="{ cursor: 'pointer', padding: '16px', 'background-color': item.background }">
            <div class="card-info">
              <div class="info-left">
                <span class="img-avatar bg-gray-light-o img-avatar-48">
                  <i :class="item.icon"></i>
                </span>
              </div>
              <div class="info-right">
                <span class="name font-weight-light">{{ item.itemName }}</span>
                <h3 class="count">{{ item.itemCount }}</h3>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <el-row style="margin: 15px">
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
import { defineComponent, onMounted, ref, reactive, toRefs } from 'vue'
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
    const state = reactive({
      cardItems: [
        {
          id: 1,
          itemName: '我的项目数',
          name: 'totalNum',
          itemCount: 25,
          background: '#bdc6cf',
          icon: 'el-icon-data-board'
        },
        {
          id: 2,
          itemName: '在线项目数',
          name: 'onlineNum',
          itemCount: 5,
          background: '#7dc855',
          icon: 'ic ic-flashlight'
        },
        {
          id: 3,
          itemName: '草稿项目数',
          name: 'draftNum',
          itemCount: 3,
          background: '#838cc7',
          icon: 'ic ic-brush'
        },
        {
          id: 4,
          itemName: '下线项目数',
          name: 'offlineNum',
          itemCount: 6,
          background: '#ffbe0b',
          icon: 'el-icon-bell'
        },
        {
          id: 5,
          itemName: '我的模板',
          name: 'templateNum',
          itemCount: 10,
          background: '#358ed7',
          icon: 'el-icon-wind-power'
        },
        {
          id: 6,
          itemName: '页面总访问数',
          name: 'viewsPV',
          itemCount: 100,
          background: '#53bbb3',
          icon: 'ic ic-group'
        },
        {
          id: 7,
          itemName: '页面独立访问数',
          name: 'viewsUV',
          itemCount: 1009,
          background: '#39add1',
          icon: 'el-icon-s-data'
        }
      ]
    })
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
      ...toRefs(state),
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

    .card-info{
    display :flex;
    flex-direction:row;
    justify-content :space-between;
    align-items :center;
    padding:5px;
    .info-left{
      .bg-gray-light-o {
       background-color: rgba(0, 20, 35, 0.07);
    }
      .img-avatar{
      display: inline-block !important;
      width: 64px;
      height: 64px;
      line-height: 64px;
      text-align: center;
      vertical-align: middle;
      border-radius: 50%;
        i{
           color: white;
        }
      }
      .img-avatar.img-avatar-48 {
      width: 48px;
      height: 48px;
      line-height: 48px;
      }
    }
    .info-right{
          .font-weight-light {
    font-weight: 300!important;
    }

    .count{
      color :#ffffff;
    }
    .name{
      color :rgba(255, 255, 255, 0.7);
      font-size:14px;

    }
    }
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
