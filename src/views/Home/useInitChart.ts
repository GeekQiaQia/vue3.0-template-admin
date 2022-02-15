/*
 * @Author: GeekQiaQia
 * @Date: 2022-01-10 10:35:31
 * @LastEditTime: 2022-01-10 13:36:48
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /vue3.0-template-admin/src/views/Home/useInitChart.ts
 */

import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption
} from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer]);
type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | BarSeriesOption
>;

let option: EChartsOption

export const useInitBarChart = (chartDom: HTMLElement | undefined) => {
  // let chartDom = document.getElementById('main')!;

  const myChart = echarts.init(chartDom as HTMLElement)

  option = {
    xAxis: {
      type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          show:false
    },
    yAxis: {
        type: 'value',
        show:false
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
      ],
    color:"#409eff",
    tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'cross',
          axis:"auto",
        label: {
          backgroundColor: '#283b56'
        }
      }
      },
  };

  // eslint-disable-next-line no-unused-expressions
  option && myChart.setOption(option)
}

export default { useInitBarChart }
