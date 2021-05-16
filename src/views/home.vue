<template>
  <div class="home-container page-container">
    <div class="page-title">
      <el-link type="info">信息链接:</el-link>
      <el-link type="primary"  href="https://www.vitejs.net/guide/" >Vite2.x +</el-link>
      <el-link type="success"  href="https://v3.cn.vuejs.org/" >Vue3.x +</el-link>
      <el-link type="warning"  href="https://www.tslang.cn/" >TypeScript +</el-link>
      <el-link type="danger"  href="https://element-plus.gitee.io/#/zh-CN/component/link" >Element Plus</el-link>
    </div>
     <el-carousel  :interval="4000"  indicator-position="outside">
        <el-carousel-item v-for="item in swiperItems" :key="item">
          <img class="vue-element-plus-logo " :alt="item.name" :src="item.itemSrc" @click="handleClickImg(item.targetLink)"/>
        </el-carousel-item>
      </el-carousel>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import  logo from '@/assets/logo.png'

export default defineComponent({
  name: 'Home',
  components: {
  },
  setup() {

    const  swiperItems=reactive([{
      name:'vue-next',
      itemSrc:'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c588b8ab65a74d59aa379801136df4e0~tplv-k3u1fbpfcp-watermark.image',
      targetLink:'https://github.com/vuejs/docs-next-zh-cn'
    },{
      name:'vitejs',
      itemSrc:'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7351d2dcd7846158604ac8bd57222b5~tplv-k3u1fbpfcp-watermark.image',
      targetLink:'https://github.com/vitejs'

    },
    {
      name:'element-plus',
      itemSrc:'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48a7fd198df44cca9c0dc10a8047bbef~tplv-k3u1fbpfcp-watermark.image',
      targetLink:'https://github.com/element-plus/element-plus'

    },
     {
      name:'tslang',
      itemSrc:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/610fc57450884ceaae9578689663fe2f~tplv-k3u1fbpfcp-watermark.image',
      targetLink:'https://github.com/Microsoft/TypeScript'

    },
    ])
    // methods
     const handleClickImg=(targetUrl: string|undefined)=>{
         window.open(targetUrl, '_blank');
     }
    return{
      handleClickImg,
      swiperItems,
      logo,
    }
  }

});
</script>

<style scoped lang="stylus">
.home-container {
  .page-title{
    margin:20px;
  }
  .vue-element-plus-logo {
    width:100%;
    min-width:973px;
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
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}
</style>
