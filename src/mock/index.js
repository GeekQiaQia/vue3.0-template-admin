/**
 * @description register mock data right here
*/
import Mock from 'mockjs'
// 设置拦截请求的响应时间 ajax 请求；
Mock.setup({
    timeout:'200-600'
});

// mock 一组角色数据；
const genRoles=function(){
    return {
        code:0,
        data:['super','admin','nomal'],
        message:'成功'
    }
}

const getSwiperInfo=function(){
    return {
        code:0,
        data:[{
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
          ],
          message:'成功'
    }
}

Mock.mock('/api/auth/login','post',(option) => {
    const {account,password} = JSON.parse(option.body);

    if(account==='admin'&&password==='admin'){
        return {
            code:0,
            data:{
                userName:account
            },
            message:'成功'
        }
    }
        return {
            code:1,
            data:null,
            message:'账户或者密码错误'
        }



});
Mock.mock('/api/setting/basicInfo','post',(option)=>{
    const {email,nickname,desc,mobile} = JSON.parse(option.body);
    return {
        code:0,
        data:{
            email,nickname,desc,mobile
        },
        message:'更新成功'
    }
});
Mock.mock('/api/auth/roles','get',genRoles);
Mock.mock('/api/home/swiperInfo','get',getSwiperInfo);


