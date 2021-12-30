<template>
  <div class="analysis-info">
    <el-row style="margin: 15px">
      <el-col :span="24" class="page-title-box">
        <h4 class="page-title">Dashboard</h4>
        <div class="page-title-right">
          <div style="margin-right: 10px"><el-date-picker v-model="pickDate" type="date" placeholder="选择日期"> </el-date-picker></div>
          <el-button icon="el-icon-refresh" circle type="primary" style="maring-left: 10px"></el-button>
          <el-button icon="el-icon-search" circle type="primary"></el-button>
        </div>
      </el-col>
    </el-row>
    <el-row >
      <el-col :xl="10">
        <el-row>
          <el-col :lg="12">
            <el-card shadow="hover" class="card">
              <div class="card-header">
                <h5 class="text-muted">Customers</h5>
                <i class="el-icon-shopping-cart-full widget-icon"></i>
              </div>
              <div class="card-middle margin-top-2 margin-bottom-2">
                <h3>37,258</h3>
              </div>
              <div class="card-footer text-muted">
                <span class="text-success margin-right-1"><i class="el-icon-top"></i>6.28%</span>
                <span class="text-nowrap">since last week </span>
              </div>
            </el-card>
          </el-col>
          <el-col :lg="12">
            <el-card shadow="hover" class="card">
              <div class="card-header">
                <h5 class="text-muted">Orders</h5>
                <i class="el-icon-s-order widget-icon"></i>
              </div>
              <div class="card-middle margin-top-2 margin-bottom-2">
                <h3>3,258</h3>
              </div>
              <div class="card-footer text-muted">
                <span class="text-danger margin-right-1"><i class="el-icon-top"></i>2.28%</span>
                <span class="text-nowrap">since last week </span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :lg="12">
            <el-card shadow="hover" class="card">
              <div class="card-header">
                <h5 class="text-muted">Revenue</h5>
                <i class="el-icon-coin widget-icon"></i>
              </div>
              <div class="card-middle margin-top-2 margin-bottom-2">
                <h3>￥3,258</h3>
              </div>
              <div class="card-footer text-muted">
                <span class="text-danger margin-right-1"><i class="el-icon-top"></i>3.28%</span>
                <span class="text-nowrap">since last week </span>
              </div>
            </el-card>
          </el-col>
          <el-col :lg="12">
            <el-card shadow="hover" class="card">
              <div class="card-header">
                <h5 class="text-muted">Growth</h5>
                <i class="el-icon-data-line widget-icon"></i>
              </div>
              <div class="card-middle margin-top-2 margin-bottom-2">
                <h3>+ 20.48%</h3>
              </div>
              <div class="card-footer text-muted">
                <span class="text-success margin-right-1"><i class="el-icon-top"></i>5.28%</span>
                <span class="text-nowrap">since last week </span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xl="14">
        <el-card shadow="hover" class="card">
          <div class="header-title">
            <h4 class="text-muted">products</h4>
            <div class="dropdown"> <i class="el-icon-more"></i></div>
          </div>
          <div style="height: 305px" class="e-chart">
            <canvas ref="refProduct" width="1746" style="display: block; height: 100%; width: 100%" class="chartjs-render-monitor" height="556"></canvas>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="16">
        <el-card shadow="hover" class="card">
          <div class="header-title">
            <h4 class="text-muted">Revene</h4>
            <div class="dropdown"> <i class="el-icon-more"></i></div>
          </div>
          <div class="chart-bg padding-top-1 padding-bottom-1">
            <el-row>
              <el-col :md="12">
                <p class="text-muted"> current week</p>
                <h2 class="font-nomal text-center">
                  <small class="text-primary dot bg-primary"></small>
                  <span>￥23.976</span>
                </h2>
              </el-col>
              <el-col :md="12">
                 <p class="text-muted"> previous week</p>
                <h2 class="font-nomal text-center">
                  <small class="text-primary dot bg-green" ></small>
                  <span>￥23.976</span>
                </h2>
              </el-col>
            </el-row>
          </div>
          <div style="height: 364px;">
            <canvas ref="refLineChart" width="2018" style="display: block; height: 364px; width: 1009px;" class="chartjs-render-monitor" height="728"></canvas>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" class="card">
             <div class="header-title">
            <h4 class="text-muted">Revene by Location</h4>
            <div class="dropdown"> <i class="el-icon-more"></i></div>
          </div>
          <div class="margin-top-2  margin-bottom-2">
            <div id="world-map-markers" style="height: 224px">
              <WorldMap></WorldMap>
            </div>
            <h5 class="font-nomal margin-bottom- text-left"> New York</h5>
            <el-progress class="margin-bottom-pro"  :percentage="70"  ><span>70k</span></el-progress>
            <h5 class="font-nomal margin-bottom text-left"> San Francisco</h5>
            <el-progress class="margin-bottom-pro"  :percentage="60"  ><span>60k</span></el-progress>
            <h5 class="font-nomal margin-bottom text-left">Sydney</h5>
            <el-progress class="margin-bottom-pro"  :percentage="50"  ><span>50k</span></el-progress>
            <h5 class="font-nomal margin-bottom text-left"> Singapore</h5>
            <el-progress class="margin-bottom-pro"  :percentage="30"  ><span>30k</span></el-progress>
          </div>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useInitChart } from './useInitEcharts'
import {useInitLineChart} from './useInitLineCharts'
import WorldMap from '@/components/WorldMap.vue'

const pickDate = ref('')
const refProduct = ref<HTMLElement | undefined>()
const refLineChart = ref<HTMLElement | undefined>()

onMounted(() => {
  useInitChart(refProduct.value)
  useInitLineChart(refLineChart.value)
})

</script>
<style lang="stylus" scoped>
.analysis-info{
  color black
  padding 0px 20px
  background-color #fafbfe

  .page-title-box{
    box-sizing border-box
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    .page-title{
      font-size: 18px
      margin: 0
      line-height: 85px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
      color: inherit
      font-weight:700
    }
    .page-title-right{
      display flex
      flex-direction row
      justify-content space-around
      align-items center
    }
  }
  :deep(.el-card){
    margin-bottom 30px
    margin-right 20px
  }
  .card {
    .padding-top-1{
      padding-top  10px
    }
    .padding-bottom-1{
      padding-bottom  10px
    }
    .margin-bottom-pro{
      margin-bottom 15px
    }
    .margin-right-1{
      margin-right 10px
    }
    .margin-top-2{
      margin-top 20px
    }
     .margin-bottom-1{
      margin-bottom 10px
    }
    .margin-bottom-2{
      margin-bottom 20px
    }
    .font-nomal{
      font-weight 400
    }
    .text-muted{
        color #98a6ad
      }
      .text-left{
        text-align left
      }
      .text-nowrap{
        white-space nowrap
      }
      .text-success{
        color #0acf97
      }
      .text-danger{
        color #fa5c7c
      }
      .text-primary{
        color #409eff
      }
      .text-center{
        display flex
        flex-direction row
        justify-content center
        align-items center
      }
      .bg-primary{
        background-color #409eff
      }
      .bg-green{
        background-color green
      }
      .dot{
        width 12px
        height 12px
        display inline-block
        border-radius 50%
      }
    .header-title{
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      .dropdown{
        cursor pointer
      }
    }
    .chart-bg{
      background-color #f9f9fd
    }
    .card-header{
      display flex
      flex-direction row
      justify-content space-between
      align-items flex-start

      .widget-icon{
        color #248fed
        font-size 20px
        background-color #7fbdf33b
        height 40px
        width 40px
        text-align: center
        line-height 40px
        border-radius 3px
        display inline-block
      }
    }
    .card-middle{
      display flex
      flex-direction row
      justify-content flex-start
      align-items center
      color #6c757d
    }
    .card-footer{
      display flex
      flex-direction row
      justify-content flex-start
      align-items center
    }

    .e-chart{
      margin auto
      position relative
      width 100%
    }
  }

}
</style>
