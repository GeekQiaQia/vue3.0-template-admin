<template>
  <div class="home-container page-container">
    <el-carousel :interval="4000" indicator-position="outside">
      <el-carousel-item v-for="item in swiperItems" :key="item">
        <img class="vue-element-plus-logo" :alt="item.name" :src="item.itemSrc" @click="handleClickImg(item.targetLink)" />
      </el-carousel-item>
    </el-carousel>
    <div class="top-container">
      <div class="title">搜索词云</div>
      <div class="page-title">
        <el-link type="info">信息链接:</el-link>
        <el-link type="primary" href="https://www.vitejs.net/guide/">Vite2.x +</el-link>
        <el-link type="success" href="https://v3.cn.vuejs.org/">Vue3.x +</el-link>
        <el-link type="warning" href="https://www.tslang.cn/">TypeScript +</el-link>
        <el-link type="danger" href="https://element-plus.gitee.io/#/zh-CN/component/link">Element Plus</el-link>
      </div>
    </div>
    <div class="word-cloud-wrapper">
      <div class="right-bottom"></div>

      <div class="word-sets">
        <div class="sets-module">
          <div id="container" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import logo from '@/assets/logo.png'
import DataSet from '@antv/data-set'
import { Chart, registerShape, ShapeAttrs, Util } from '@antv/g2'
import { Datum, ShapeInfo } from 'node_modules/@antv/g2/lib/interface'
import Service from './api/index'

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const state = reactive({
      swiperItems: [
        {
          name: 'vue-next',
          itemSrc: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c588b8ab65a74d59aa379801136df4e0~tplv-k3u1fbpfcp-watermark.image',
          targetLink: 'https://github.com/vuejs/docs-next-zh-cn'
        },
        {
          name: 'vitejs',
          itemSrc: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7351d2dcd7846158604ac8bd57222b5~tplv-k3u1fbpfcp-watermark.image',
          targetLink: 'https://github.com/vitejs'
        },
        {
          name: 'element-plus',
          itemSrc: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48a7fd198df44cca9c0dc10a8047bbef~tplv-k3u1fbpfcp-watermark.image',
          targetLink: 'https://github.com/element-plus/element-plus'
        },
        {
          name: 'tslang',
          itemSrc: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/610fc57450884ceaae9578689663fe2f~tplv-k3u1fbpfcp-watermark.image',
          targetLink: 'https://github.com/Microsoft/TypeScript'
        }
      ]
    })

    const getTextAttrs = (cfg: ShapeInfo): ShapeAttrs => ({
      ...cfg.defaultStyle,
      ...cfg.style,
      fontSize: (cfg.data as Datum).size,
      text: (cfg.data as Datum).text,
      textAlign: 'center',
      fontFamily: (cfg.data as Datum).font,
      fill: cfg.color || cfg?.defaultStyle?.stroke,
      textBaseline: 'alphabetic'
    })

    // 给point注册一个词云的shape
    registerShape('point', 'cloud', {
      draw(cfg, container) {
        const attrs = getTextAttrs(cfg)
        const textShape = container.addShape('text', {
          attrs: {
            ...attrs,
            x: cfg?.x,
            y: cfg?.y
          }
        })
        const data = cfg.data as Datum

        if (data.rotate) {
          Util.rotate(textShape, (data.rotate * Math.PI) / 180)
        }
        return textShape
      }
    })

    // methods
    const handleClickImg = (targetUrl: string | undefined) => {
      window.open(targetUrl, '_blank')
    }

    // /**
    //  * @description 获取词云
    //  */
    const getWords = async () => {
      try {
        const res = await Service.getWorldPopulation()
        const { dataSets } = res.data
        const dv = new DataSet.View().source(dataSets)
        const range = dv.range('value')
        const min = range[0]
        const max = range[1]
        dv.transform({
          type: 'tag-cloud',
          fields: ['x', 'value'],
          size: [800, 600],
          font: 'Verdana',
          padding: 0,
          timeInterval: 5000, // max execute time
          rotate() {
            // eslint-disable-next-line no-bitwise
            let random = ~~(Math.random() * 4) % 4
            if (random === 2) {
              random = 0
            }
            return random * 90 // 0, 90, 270
          },
          fontSize(d) {
            if (d.value) {
              return ((d.value - min) / (max - min)) * (80 - 24) + 24
            }
            return 0
          }
        })
        const chart = new Chart({
          container: 'container',
          autoFit: false,
          width: 800,
          height: 600,
          padding: 0
        })
        chart.data(dv.rows)
        chart.scale({
          x: { nice: false },
          y: { nice: false }
        })
        chart.legend(false)
        chart.axis(false)
        chart.tooltip({
          showTitle: false,
          showMarkers: false
        })
        chart.coordinate().reflect('x')
        chart.point().position('x*y').color('CornflowerBlue').shape('cloud').tooltip('value*category')
        chart.interaction('element-active')
        chart.render()
      } catch (err) {
        console.error(err)
      }
    }

    onMounted(() => {
      getWords()
    })
    return {
      handleClickImg,
      ...toRefs(state),
      logo
    }
  }
})
</script>

<style scoped lang="stylus">
.home-container {
  background: #f0f5fa;
   .top-container{
      width:90%;
      margin:0px auto;
      .title{

        margin-left: 4.06%;
        font-size: 2.714em;
        color: #000;
        margin-bottom: 0;
        font-weight: 500;
        position: relative;
        height: -webkit-min-content;
        height: min-content;
        cursor: pointer;
        text-align :left;
      }
    }
  .word-cloud-wrapper{
    width:100%;
    height:800px;
    display: flex;
    margin: 50px auto auto;
    position: relative;
    flex-direction: column;
    padding: 0;
    background: #f0f5fa;
    overflow-x: hidden;
    transition: all .3s;

      .right-bottom{
    background:linear-gradient(130deg, #6a91ff 40%, #615edd);
    width: 100%;
    height: 80%;
    right: 0;
    margin-top: 48px;
    position: absolute;
  }
  .word-sets{
    width: 95.8%;
    height: 100%;
    margin-left: 0;
    margin-bottom: 5%;
    position: relative;
    .sets-module{
      background: #fff;
      width: 100%;
      height: 85%;
      position: relative;
      box-shadow: -5px 5px 15px rgba(0,0,0,.1);
      overflow: hidden;
    }
  }
  }

  .page-title{
  }
  .vue-element-plus-logo {
    width:100%;
    max-width:750px;
    height:100%;
    cursor :pointer;
  }
   .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color:white;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color:white;
  }
}
</style>
