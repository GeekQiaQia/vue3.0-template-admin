import{r as s}from"./index.0d1898b4.js";const r={basicInfo:"/api/setting/basicInfo",personalTags:"/api/personal/tags"};class n{static postSetBasicInfo(e){return s({url:r.basicInfo,method:"post",json:!0,data:e}).then(t=>t.status===0?Promise.resolve(t):Promise.reject(t))}static getPersonTags(){return s({url:r.personalTags,method:"get",json:!0}).then(e=>e.status===0?Promise.resolve(e):Promise.reject(e))}}export{n as S};