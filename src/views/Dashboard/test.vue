<template>
  <div class="analysisInfo">
    <div class="info">
      <span style="display: block; font-size: 24px; margin: 24px 0">数据可视化</span>
      <span style="text-align: left">数据可视化主要旨在借助于图形化手段，清晰有效地传达与沟通信息，</span>
    </div>
    <!-- <el-row>
      <el-col :offset="1" :span="15">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-card">

          </el-card>
        </div>
      </el-col>
    </el-row> -->
    <div class="echart-container">
      <div ref="lineEchart" style="width: 100%; height: 400px" class="echart"></div>

      <div class="bottom-chart">
        <div ref="refEchart" style="width: 49%; height: 400px" class="echart"></div>
        <div ref="radarEchart" style="width: 49%; height: 400px" class="echart"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import * as Echarts from 'echarts'

export default defineComponent({
  name: 'Analysis',
  setup() {
    const refEchart = ref()
    const lineEchart = ref()
    const radarEchart = ref()

    // 指定图表的配置项和数据
    const option = {
      // backgroundColor: '#2c343c',
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          data: [
            { value: 235, name: '视频广告' },
            { value: 274, name: '联盟广告' },
            { value: 310, name: '邮件营销' },
            { value: 335, name: '直接访问' },
            { value: 400, name: '搜索引擎' }
          ],
          roseType: 'angle',
          label: {
            normal: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }
          },
          itemStyle: {
            normal: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    const lineOptions = {
      title: {
        text: '折线图堆叠'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
    const radarOptions = {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ['product', '2015', '2016', '2017'],
          ['Matcha Latte', 43.3, 85.8, 93.7],
          ['Milk Tea', 83.1, 73.4, 55.1],
          ['Cheese Cocoa', 86.4, 65.2, 82.5],
          ['Walnut Brownie', 72.4, 53.9, 39.1]
        ]
      },
      xAxis: { type: 'category' },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
    }
    onMounted(() => {
      const myChart = Echarts.init(refEchart.value)

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option as any)

      const lineChart = Echarts.init(lineEchart.value)
      // 使用刚指定的配置项和数据显示图表。
      lineChart.setOption(lineOptions as any)

      const radarChart = Echarts.init(radarEchart.value)
      // 使用刚指定的配置项和数据显示图表。
      radarChart.setOption(radarOptions as any)
    })
    return {
      refEchart,
      lineEchart,
      radarEchart
    }
  }
})
</script>
<style lang="stylus" scoped>
.analysisInfo{
  background: #100c2a;
  color:white;
  padding:20px;

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
