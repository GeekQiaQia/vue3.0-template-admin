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
import { defineComponent, onMounted, reactive,toRefs } from 'vue';
import  logo from '@/assets/logo.png'
import axios from '@/utils/request'

export default defineComponent({
  name: 'Home',
  components: {
  },
  setup() {

     const state=reactive({
       swiperItems:[{
            name:'vue-next',
            itemSrc:'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c588b8ab65a74d59aa379801136df4e0~tplv-k3u1fbpfcp-watermark.image',
            targetLink:'https://github.com/vuejs/docs-next-zh-cn'
          }]
     });
    // methods
     const handleClickImg=(targetUrl: string|undefined)=>{
         window.open(targetUrl, '_blank');
     }
     /**
      * @description 获取角色
     */
     const getRoles=()=>{
       axios.get('/api/auth/roles')
       .then((res: any)=>{
         console.log(res);
       })
       .catch((err: any)=>{
        // eslint-disable-next-line no-console
         console.error(err);
       });
     }
      /**
      * @description 获取swiperInfo
     */
     const getSwiperInfo=()=>{
       axios.get('/api/home/swiperInfo')
       .then((res:any)=>{
         if(res.data.code===0){
           state.swiperItems=res.data.data;
         }
       })
       .catch((err:any)=>{
         // eslint-disable-next-line no-console
         console.error(err);
       })
     }
     onMounted(()=>{
       getRoles();
       getSwiperInfo();
     });
    return{
      handleClickImg,
      ...toRefs(state),
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
