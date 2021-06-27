import { Liquid, measureTextWidth , Bar } from '@antv/g2plot'
import { Chart, Util  } from '@antv/g2';

import DataSet from '@antv/data-set';

export const useInitPlot = (plot: string | HTMLElement,title:string) => {
  const liquidPlot = new Liquid(plot, {
    percent: 0.26,
    radius: 0.8,
    height:128,
    statistic: {
      title: {
        formatter: () => title,
        style: ({ percent }) => ({
          fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)'
        })
      },
      content: {
        style: ({ percent }) => ({
          fontSize: 60,
          lineHeight: 1,
          fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)'
        }),
        customHtml: (container, view,{ percent }) => {
          const { width, height } = container.getBoundingClientRect()
          // eslint-disable-next-line no-restricted-properties
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))
          const text = `占比 ${(percent * 100).toFixed(0)}%`
          const textWidth = measureTextWidth(text, { fontSize: 60 })
          const scale = Math.min(d / textWidth, 1)
          return `<div style="width:${d}px;display:flex;align-items:center;justify-content:center;font-size:${scale}em;line-height:${scale <= 1 ? 1 : 'inherit'}">${text}</div>`
        }
      }
    },
    liquidStyle: ({ percent }) => ({
      fill: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
      stroke: percent > 0.45 ? '#5B8FF9' : '#FAAD14'
    }),
    color: () => '#5B8FF9'
  })
  liquidPlot.render()

  let data = 0.25
  const interval = setInterval(() => {
    data += Math.min(Math.random() * 0.1, 0.1)
    if (data < 0.75) {
      liquidPlot.changeData(data)
    } else {
      clearInterval(interval)
    }
  }, 500)
}

export const useInitBar=(barContainer:string | HTMLElement)=>{
  const data = [
    { action: '浏览网站', pv: 50000 },
    { action: '放入购物车', pv: 35000 },
    { action: '生成订单', pv: 25000 },
    { action: '支付订单', pv: 15000 },
    { action: '完成交易', pv: 8500 },
  ];

  const barPlot = new Bar(barContainer, {
    data,
    xField: 'pv',
    yField: 'action',
    conversionTag: {},
    theme: 'default', // 'dark',

  });

  barPlot.render();
}

export const useInitChart=(charContainer:string | HTMLElement)=>{
const data = [
  { type: '一线城市', value: 0.19 },
  { type: '二线城市', value: 0.21 },
  { type: '三线城市', value: 0.27 },
  { type: '四线及以下', value: 0.33 },
];
const chart = new Chart({
  container: charContainer,
  autoFit: true,
  height: 500,

});
chart.data(data);

chart.coordinate('theta', {
  radius: 0.75
});
chart.tooltip({
  showMarkers: false
});

chart
  .interval()
  .adjust('stack')
  .position('value')
  .color('type', ['#063d8a', '#1770d6', '#47abfc', '#38c060'])
  .style({ opacity: 0.4 })
  .state({
    active: {
      style: (element) => {
        const {shape} = element;
        return {
          matrix: Util.zoom(shape, 1.1),
        }
      }
    }
  })
  .label('type', (val) => {
    const opacity = val === '四线及以下' ? 1 : 0.5;
    return {
      offset: -30,
      style: {
        opacity,
        fill: 'white',
        fontSize: 12,
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)',
      },
      content: (obj) => `${obj.type  }\n${  obj.value  }%`,
    };
  });

chart.interaction('element-single-selected');

chart.render();


}


export const useInitIndicator=(indicatorContainer:string | HTMLElement)=>{

// ============= 数据准备
const DATA = {
  nodes: [
    {
      name: '首次打开',
    },
    {
      name: '结果页',
    },
    {
      name: '验证页',
    },
    {
      name: '我的',
    },
    {
      name: '朋友',
    },
    {
      name: '其他来源',
    },
    {
      name: '首页 UV',
    },
    {
      name: '我的',
    },
    {
      name: '扫一扫',
    },
    {
      name: '服务',
    },
    {
      name: '蚂蚁森林',
    },
    {
      name: '跳失',
    },
    {
      name: '借呗',
    },
    {
      name: '花呗',
    },
    {
      name: '其他流向',
    },
  ],
  links: [
    {
      source: 0,
      target: 6,
      value: 160,
    },
    {
      source: 1,
      target: 6,
      value: 40,
    },
    {
      source: 2,
      target: 6,
      value: 10,
    },
    {
      source: 3,
      target: 6,
      value: 10,
    },
    {
      source: 4,
      target: 6,
      value: 8,
    },
    {
      source: 5,
      target: 6,
      value: 27,
    },
    {
      source: 6,
      target: 7,
      value: 30,
    },
    {
      source: 6,
      target: 8,
      value: 40,
    },
    {
      source: 6,
      target: 9,
      value: 35,
    },
    {
      source: 6,
      target: 10,
      value: 25,
    },
    {
      source: 6,
      target: 11,
      value: 10,
    },
    {
      source: 6,
      target: 12,
      value: 30,
    },
    {
      source: 6,
      target: 13,
      value: 40,
    },
    {
      source: 6,
      target: 14,
      value: 45,
    },
  ],
};

// arc diagram layout
const ds = new DataSet();
const dv = ds.createView().source(DATA, {
  type: 'graph',
  edges: (d) => d.links,
});
dv.transform({
  type: 'diagram.sankey',
  nodeWidth: 0.008,
  nodePadding: 0.03,
  sort: (a, b) => {
    if (a.value > b.value) {
      return 0;
    } if (a.value < b.value) {
      return -1;
    }
    return 0;
  },
});

const edges = dv.edges.map((edge) => ({
    source: edge.source.name,
    target: edge.target.name,
    name: edge.source.name === '首页 UV' ? edge.target.name : edge.source.name,
    x: edge.x,
    y: edge.y,
    value: edge.value,
  }));

const nodes = dv.nodes.map((node) => ({
    x: node.x,
    y: node.y,
    name: node.name,
  }));

// ============= 绘图
const chart = new Chart({
  container: indicatorContainer,
  autoFit: true,
  height: 500,
  appendPadding: 16,
  syncViewPadding: true,
});

chart.legend(false);

chart.tooltip({
  showTitle: false,
  showMarkers: false,
});

chart.axis(false);

chart.scale({
  x: { sync: true, nice: true },
  y: { sync: true, nice: true },
  source: { sync: 'color' },
  name: { sync: 'color' },
});

// node view
const nodeView = chart.createView();
nodeView.data(nodes);
nodeView
  .polygon()
  .position('x*y') // nodes数据的x、y由layout方法计算得出
  .color('name')
  .label('x*name', (x, name) => {
    const isLast = x[1] === 1;
    return {
      style: {
        fill: '#545454',
        textAlign: isLast ? 'end' : 'start',
      },
      offsetX: isLast ? -8 : 8,
      content: name,
    };
  })
  .tooltip(false)
  .style('name', (name) => {
    if (name === '跳失') {
      return {
        fill: '#FF6010',
        stroke: '#FF6010',
      };
    }
    if (name === '首页 UV') {
      return {
        fill: '#5D7092',
        stroke: '#5D7092',
      };
    }
    return {};
	});

// edge view
const edgeView = chart.createView();
edgeView.data(edges);

console.log(edges);
edgeView
  .edge()
  .position('x*y')
  .shape('arc')
  .color('name')
  .tooltip('target*source*value', (target, source, value) => ({
      name: `${source  } to ${  target}`,
      value,
    }))
	.style('source*target', (source, target) => {
    if (source.includes('其他') || target.includes('其他')) {
      return {
        lineWidth: 0,
        opacity: 0.4,
        fill: '#CCC',
        stroke: '#CCC',
      };
    }

    if (target === '跳失') {
      return {
        lineWidth: 0,
        opacity: 0.4,
        fill: 'l(0) 0:#FFBB9E 0.2:#FFC8B4 1:#FFFCF2',
        stroke: 'l(0) 0:#FFBB9E 0.2:#FFC8B4 1:#FFFCF2',
      };
    }

    return {
      opacity: 0.2,
      lineWidth: 0,
    };
	})
  .state({
    active: {
      style: {
        opacity: 0.8,
        lineWidth: 0,
      },
    },
  });

chart.interaction('element-active');

chart.render();

}

export const useInitAge=(ageContainer:string | HTMLElement)=>{

const data = [
  { type: '未知', value: 654, percent: 0.02 },
  { type: '17 岁以下', value: 654, percent: 0.02 },
  { type: '18-24 岁', value: 4400, percent: 0.2 },
  { type: '25-29 岁', value: 5300, percent: 0.24 },
  { type: '30-39 岁', value: 6200, percent: 0.28 },
  { type: '40-49 岁', value: 3300, percent: 0.14 },
  { type: '50 岁以上', value: 1500, percent: 0.06 },
];

const chart = new Chart({
  container: ageContainer,
  autoFit: true,
  height: 500,
  padding: [50, 20, 50, 20],
});
chart.data(data);
chart.scale('value', {
  alias: '销售额(万)',
});

chart.axis('type', {
  tickLine: {
    alignTick: false,
  },
});
chart.axis('value', false);

chart.tooltip({
  showMarkers: false,
});
chart.interval().position('type*value');
chart.interaction('element-active');

// 添加文本标注
data.forEach((item) => {
  chart
    .annotation()
    .text({
      position: [item.type, item.value],
      content: item.value,
      style: {
        textAlign: 'center',
      },
      offsetY: -30,
    })
    .text({
      position: [item.type, item.value],
      content: `${(item.percent * 100).toFixed(0)  }%`,
      style: {
        textAlign: 'center',
      },
      offsetY: -12,
    });
});
chart.render();

}

export default {useInitPlot,useInitBar,useInitChart,useInitIndicator,useInitAge}
