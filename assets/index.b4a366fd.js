import{d as O,r as i,q as g,c as j,j as y,h as x,i as e,w as a,n,u as v,aJ as J,s as K,aX as X,F as Y,k as Z,K as H,a0 as f,t as k,L as Q,M as ee,aY as te,N as T,av as le,R as ae,aw as se,ax as ne,aZ as oe,ay as ue,aE as ie,ah as re,f as de,g as ce,ai as pe,a_ as me}from"./vendor.5527eabd.js";/* empty css               *//* empty css            *//* empty css                 *//* empty css                    */import{m as _e,a as ge,b as ve,E as fe,F as Ee}from"./main.83a61435.js";import{_ as be}from"./index.8c47300f.js";let he=0;const I=new Date().toISOString().replace(/T.*$/,"");function o(){return String(he++)}const ye=[{id:o(),title:"\u5168\u5929\u5B89\u6392",start:I},{id:o(),title:"\u7B97\u6CD5\u4E13\u8BAD",start:`${I}T12:00:00`}];const D=p=>(Q("data-v-6366db16"),p=p(),ee(),p),xe={class:"calendar-info"},ke=D(()=>n("h4",{class:"page-title"},"Calendar",-1)),De={class:"page-title-right"},Fe={style:{"margin-right":"10px"}},we=f(" \u521B\u5EFA\u65B0\u7684\u4E8B\u4EF6"),Be=D(()=>n("div",null,[n("br"),n("p",{class:"text-muted text-left"},"Drag and drop your event or click in the calendar")],-1)),Ve=D(()=>n("i",{class:"list-circle"},null,-1)),Ne={style:{"text-align":"left"}},Ce={style:{"text-align":"left"}},Se={class:"dialog-footer"},Ae=f("\u5173\u95ED"),Te=f("\u4FDD\u5B58"),Ie=O({name:"index",setup(p){const F=i(),w=i(""),E=i(!1),B=i(!1),r=i(!1),V=i(120),N=i(),u=g({title:"",className:"bg-success"}),M=g({title:[{required:!0,message:"Please input event title",trigger:"blur"}],className:[{required:!0,message:"Please select category color",trigger:"blur"}]}),C=g([{title:"meet manger",classNames:"bg-danger",id:o()},{title:"interview for front-end",classNames:"bg-success",id:o()},{title:"studying",classNames:"bg-info",id:o()},{title:"dead line ",classNames:"bg-warning",id:o()},{title:"go to sleep",classNames:"bg-dark",id:o()}]),R=s=>{const t=prompt("\u8BF7\u8F93\u5165\u4EFB\u52A1\u6807\u9898"),m=s.view.calendar;m.unselect(),t&&m.addEvent({id:o(),title:t,start:s.startStr,end:s.endStr,allDay:s.allDay})},U=()=>{r.value=!0},$=s=>{!s||s.validate(t=>{if(t)C.push({id:o(),title:u.title,classNames:u.className}),r.value=!1;else return console.log("error submit!"),!1})},b=g({plugins:[_e,ge,ve],headerToolbar:{left:"prev,next today",center:"title",right:"dayGridMonth,timeGridWeek,timeGridDay"},droppable:!0,drop(s){E.value&&s.draggedEl.parentNode.removeChild(s.draggedEl)},initialView:"dayGridMonth",initialEvents:ye,editable:!0,selectable:!0,selectMirror:!0,dayMaxEvents:!0,weekends:!0,select:R,eventClick:s=>{te.confirm("\u786E\u5B9A\u5220\u9664\u5F53\u524D\u4EFB\u52A1\u5417\uFF1F","\u6E29\u99A8\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>{s.event.remove(),T({type:"success",message:"\u5220\u9664\u6210\u529F"})}).catch(()=>{T({type:"info",message:"\u5DF2\u53D6\u6D88\u5220\u9664"})})},eventsSet:s=>{}}),G=()=>{b.weekends=!b.weekends};return j(()=>{new fe(F.value,{itemSelector:".external-events",eventData(s){const t=s.className.split(" ")[1];return{title:s.innerText,classNames:[t]}}})}),(s,t)=>{const m=le,d=ae,_=se,h=ne,S=oe,L=ue,P=ie,A=re,c=de,W=ce,q=pe,z=me;return y(),x("div",xe,[e(h,{style:{margin:"15px"}},{default:a(()=>[e(_,{span:24,class:"page-title-box"},{default:a(()=>[ke,n("div",De,[n("div",Fe,[e(m,{modelValue:w.value,"onUpdate:modelValue":t[0]||(t[0]=l=>w.value=l),type:"date",placeholder:"\u9009\u62E9\u65E5\u671F"},null,8,["modelValue"])]),e(d,{icon:v(J),circle:"",type:"primary",style:{"maring-left":"10px"}},null,8,["icon"]),e(d,{icon:v(K),circle:"",type:"primary"},null,8,["icon"])])]),_:1})]),_:1}),e(h,null,{default:a(()=>[e(_,{span:24},{default:a(()=>[e(L,null,{default:a(()=>[e(h,null,{default:a(()=>[e(_,{span:6},{default:a(()=>[e(d,{icon:v(X),type:"primary",style:{width:"258.25px",height:"42px"},onClick:U},{default:a(()=>[we]),_:1},8,["icon"]),Be,n("div",{ref_key:"containerRef",ref:F},[(y(!0),x(Y,null,Z(C,l=>(y(),x("div",{key:l.id,class:H(["external-events",[l.classNames]])},[Ve,f(k(l.title),1)],2))),128))],512),n("div",Ne,[e(S,{modelValue:E.value,"onUpdate:modelValue":t[1]||(t[1]=l=>E.value=l),label:"remove after drop",size:"large"},null,8,["modelValue"])]),n("div",Ce,[e(S,{modelValue:B.value,"onUpdate:modelValue":t[2]||(t[2]=l=>B.value=l),label:"weekends toggle",size:"large",onChange:G},null,8,["modelValue"])])]),_:1}),e(_,{span:18},{default:a(()=>[e(v(Ee),{class:"demo-app-calendar",options:b},{eventContent:a(l=>[n("b",null,k(l.timeText),1),n("i",null,k(l.event.title),1)]),_:1},8,["options"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(z,{modelValue:r.value,"onUpdate:modelValue":t[7]||(t[7]=l=>r.value=l),title:"\u6DFB\u52A0\u4E8B\u9879",width:"450px"},{footer:a(()=>[n("span",Se,[e(d,{onClick:t[5]||(t[5]=l=>r.value=!1)},{default:a(()=>[Ae]),_:1}),e(d,{type:"primary",onClick:t[6]||(t[6]=l=>$(N.value))},{default:a(()=>[Te]),_:1})])]),default:a(()=>[e(q,{ref_key:"ruleFormRef",ref:N,model:u,rules:M},{default:a(()=>[e(A,{label:"\u8BF7\u8F93\u5165\u4E8B\u9879","label-width":V.value,prop:"title"},{default:a(()=>[e(P,{modelValue:u.title,"onUpdate:modelValue":t[3]||(t[3]=l=>u.title=l),autocomplete:"off",style:{width:"189.5px"}},null,8,["modelValue"])]),_:1},8,["label-width"]),e(A,{label:"\u9009\u62E9\u4E8B\u9879\u989C\u8272","label-width":V.value,prop:"className"},{default:a(()=>[e(W,{modelValue:u.className,"onUpdate:modelValue":t[4]||(t[4]=l=>u.className=l),placeholder:"Please select category color"},{default:a(()=>[e(c,{label:"Success",value:"bg-success"}),e(c,{label:"Danger",value:"bg-danger"}),e(c,{label:"Info",value:"bg-info"}),e(c,{label:"Warning",value:"bg-warning"}),e(c,{label:"Dark",value:"bg-dark"})]),_:1},8,["modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model","rules"])]),_:1},8,["modelValue"])])}}});var ze=be(Ie,[["__scopeId","data-v-6366db16"]]);export{ze as default};
