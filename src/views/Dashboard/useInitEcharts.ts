/*
 * @Author: GeekQiaQia
 * @Date: 2021-12-30 15:50:10
 * @LastEditTime: 2021-12-30 17:22:30
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /vue3.0-template-admin/src/views/Dashboard/useInitEcharts.ts
 */
import * as echarts from 'echarts/core'
import { TitleComponent, TitleComponentOption, GridComponent, GridComponentOption, DataZoomComponent, DataZoomComponentOption } from 'echarts/components'
import { BarChart, BarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TitleComponent, GridComponent, DataZoomComponent, BarChart, CanvasRenderer])

type EChartsOption = echarts.ComposeOption<TitleComponentOption | GridComponentOption | DataZoomComponentOption | BarSeriesOption>

let option: EChartsOption

export const useInitChart = (chartDom: HTMLElement | undefined) => {
  // let chartDom = document.getElementById('main')!;

  const myChart = echarts.init(chartDom as HTMLElement)
  // prettier-ignore
  const dataAxis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // prettier-ignore
  const data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149,];
  const yMax = 500
  const dataShadow = []

  for (let i = 0; i < data.length; i++) {
    dataShadow.push(yMax)
  }

  option = {
    title: {
      text: 'sells in every mounth',
      subtext: 'zoom to show every details of data'
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data
      }
    ]
  }

  // Enable data zoom when user click bar.
  const zoomSize = 6
  myChart.on('click', (params) => {
    myChart.dispatchAction({
      type: 'dataZoom',
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    })
  })

  // eslint-disable-next-line no-unused-expressions
  option && myChart.setOption(option)
}

export default { useInitChart }
