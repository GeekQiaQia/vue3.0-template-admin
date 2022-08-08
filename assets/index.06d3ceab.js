var ce=Object.defineProperty;var J=Object.getOwnPropertySymbols;var se=Object.prototype.hasOwnProperty,le=Object.prototype.propertyIsEnumerable;var X=(i,f,r)=>f in i?ce(i,f,{enumerable:!0,configurable:!0,writable:!0,value:r}):i[f]=r,q=(i,f)=>{for(var r in f||(f={}))se.call(f,r)&&X(i,r,f[r]);if(J)for(var r of J(f))le.call(f,r)&&X(i,r,f[r]);return i};import{ap as de,ab as fe,H as j,d as pe,aq as ye,ar as ve,r as me,c as _e,aj as he,A as ge,C as be,s as x,as as Ee,f as B,e as N,h as F,t as b,m as w,x as O,k as V,N as R,L as Ce,p as we,g as De}from"./vendor.6752bb16.js";import{_ as Ae}from"./index.0d1898b4.js";var K={exports:{}};/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */(function(i,f){(function(D,h){i.exports=h()})(de,function(){return function(){var r={686:function(p,d,e){e.d(d,{default:function(){return ie}});var l=e(279),o=e.n(l),u=e(370),g=e.n(u),E=e(817),A=e.n(E);function m(s){try{return document.execCommand(s)}catch{return!1}}var C=function(n){var t=A()(n);return m("cut"),t},_=C;function k(s){var n=document.documentElement.getAttribute("dir")==="rtl",t=document.createElement("textarea");t.style.fontSize="12pt",t.style.border="0",t.style.padding="0",t.style.margin="0",t.style.position="absolute",t.style[n?"right":"left"]="-9999px";var a=window.pageYOffset||document.documentElement.scrollTop;return t.style.top="".concat(a,"px"),t.setAttribute("readonly",""),t.value=s,t}var M=function(n,t){var a=k(n);t.container.appendChild(a);var c=A()(a);return m("copy"),a.remove(),c},$=function(n){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{container:document.body},a="";return typeof n=="string"?a=M(n,t):n instanceof HTMLInputElement&&!["text","search","url","tel","password"].includes(n==null?void 0:n.type)?a=M(n.value,t):(a=A()(n),m("copy")),a},y=$;function S(s){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?S=function(t){return typeof t}:S=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},S(s)}var Q=function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=n.action,a=t===void 0?"copy":t,c=n.container,v=n.target,T=n.text;if(a!=="copy"&&a!=="cut")throw new Error('Invalid "action" value, use either "copy" or "cut"');if(v!==void 0)if(v&&S(v)==="object"&&v.nodeType===1){if(a==="copy"&&v.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if(a==="cut"&&(v.hasAttribute("readonly")||v.hasAttribute("disabled")))throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`)}else throw new Error('Invalid "target" value, use a valid Element');if(T)return y(T,{container:c});if(v)return a==="cut"?_(v):y(v,{container:c})},W=Q;function L(s){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?L=function(t){return typeof t}:L=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},L(s)}function Z(s,n){if(!(s instanceof n))throw new TypeError("Cannot call a class as a function")}function G(s,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(s,a.key,a)}}function ee(s,n,t){return n&&G(s.prototype,n),t&&G(s,t),s}function te(s,n){if(typeof n!="function"&&n!==null)throw new TypeError("Super expression must either be null or a function");s.prototype=Object.create(n&&n.prototype,{constructor:{value:s,writable:!0,configurable:!0}}),n&&z(s,n)}function z(s,n){return z=Object.setPrototypeOf||function(a,c){return a.__proto__=c,a},z(s,n)}function ne(s){var n=ue();return function(){var a=P(s),c;if(n){var v=P(this).constructor;c=Reflect.construct(a,arguments,v)}else c=a.apply(this,arguments);return oe(this,c)}}function oe(s,n){return n&&(L(n)==="object"||typeof n=="function")?n:re(s)}function re(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function ue(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}function P(s){return P=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},P(s)}function H(s,n){var t="data-clipboard-".concat(s);if(!!n.hasAttribute(t))return n.getAttribute(t)}var ae=function(s){te(t,s);var n=ne(t);function t(a,c){var v;return Z(this,t),v=n.call(this),v.resolveOptions(c),v.listenClick(a),v}return ee(t,[{key:"resolveOptions",value:function(){var c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};this.action=typeof c.action=="function"?c.action:this.defaultAction,this.target=typeof c.target=="function"?c.target:this.defaultTarget,this.text=typeof c.text=="function"?c.text:this.defaultText,this.container=L(c.container)==="object"?c.container:document.body}},{key:"listenClick",value:function(c){var v=this;this.listener=g()(c,"click",function(T){return v.onClick(T)})}},{key:"onClick",value:function(c){var v=c.delegateTarget||c.currentTarget,T=this.action(v)||"copy",U=W({action:T,container:this.container,target:this.target(v),text:this.text(v)});this.emit(U?"success":"error",{action:T,text:U,trigger:v,clearSelection:function(){v&&v.focus(),window.getSelection().removeAllRanges()}})}},{key:"defaultAction",value:function(c){return H("action",c)}},{key:"defaultTarget",value:function(c){var v=H("target",c);if(v)return document.querySelector(v)}},{key:"defaultText",value:function(c){return H("text",c)}},{key:"destroy",value:function(){this.listener.destroy()}}],[{key:"copy",value:function(c){var v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{container:document.body};return y(c,v)}},{key:"cut",value:function(c){return _(c)}},{key:"isSupported",value:function(){var c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:["copy","cut"],v=typeof c=="string"?[c]:c,T=!!document.queryCommandSupported;return v.forEach(function(U){T=T&&!!document.queryCommandSupported(U)}),T}}]),t}(o()),ie=ae},828:function(p){var d=9;if(typeof Element!="undefined"&&!Element.prototype.matches){var e=Element.prototype;e.matches=e.matchesSelector||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector||e.webkitMatchesSelector}function l(o,u){for(;o&&o.nodeType!==d;){if(typeof o.matches=="function"&&o.matches(u))return o;o=o.parentNode}}p.exports=l},438:function(p,d,e){var l=e(828);function o(E,A,m,C,_){var k=g.apply(this,arguments);return E.addEventListener(m,k,_),{destroy:function(){E.removeEventListener(m,k,_)}}}function u(E,A,m,C,_){return typeof E.addEventListener=="function"?o.apply(null,arguments):typeof m=="function"?o.bind(null,document).apply(null,arguments):(typeof E=="string"&&(E=document.querySelectorAll(E)),Array.prototype.map.call(E,function(k){return o(k,A,m,C,_)}))}function g(E,A,m,C){return function(_){_.delegateTarget=l(_.target,A),_.delegateTarget&&C.call(E,_)}}p.exports=u},879:function(p,d){d.node=function(e){return e!==void 0&&e instanceof HTMLElement&&e.nodeType===1},d.nodeList=function(e){var l=Object.prototype.toString.call(e);return e!==void 0&&(l==="[object NodeList]"||l==="[object HTMLCollection]")&&"length"in e&&(e.length===0||d.node(e[0]))},d.string=function(e){return typeof e=="string"||e instanceof String},d.fn=function(e){var l=Object.prototype.toString.call(e);return l==="[object Function]"}},370:function(p,d,e){var l=e(879),o=e(438);function u(m,C,_){if(!m&&!C&&!_)throw new Error("Missing required arguments");if(!l.string(C))throw new TypeError("Second argument must be a String");if(!l.fn(_))throw new TypeError("Third argument must be a Function");if(l.node(m))return g(m,C,_);if(l.nodeList(m))return E(m,C,_);if(l.string(m))return A(m,C,_);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function g(m,C,_){return m.addEventListener(C,_),{destroy:function(){m.removeEventListener(C,_)}}}function E(m,C,_){return Array.prototype.forEach.call(m,function(k){k.addEventListener(C,_)}),{destroy:function(){Array.prototype.forEach.call(m,function(k){k.removeEventListener(C,_)})}}}function A(m,C,_){return o(document.body,m,C,_)}p.exports=u},817:function(p){function d(e){var l;if(e.nodeName==="SELECT")e.focus(),l=e.value;else if(e.nodeName==="INPUT"||e.nodeName==="TEXTAREA"){var o=e.hasAttribute("readonly");o||e.setAttribute("readonly",""),e.select(),e.setSelectionRange(0,e.value.length),o||e.removeAttribute("readonly"),l=e.value}else{e.hasAttribute("contenteditable")&&e.focus();var u=window.getSelection(),g=document.createRange();g.selectNodeContents(e),u.removeAllRanges(),u.addRange(g),l=u.toString()}return l}p.exports=d},279:function(p){function d(){}d.prototype={on:function(e,l,o){var u=this.e||(this.e={});return(u[e]||(u[e]=[])).push({fn:l,ctx:o}),this},once:function(e,l,o){var u=this;function g(){u.off(e,g),l.apply(o,arguments)}return g._=l,this.on(e,g,o)},emit:function(e){var l=[].slice.call(arguments,1),o=((this.e||(this.e={}))[e]||[]).slice(),u=0,g=o.length;for(u;u<g;u++)o[u].fn.apply(o[u].ctx,l);return this},off:function(e,l){var o=this.e||(this.e={}),u=o[e],g=[];if(u&&l)for(var E=0,A=u.length;E<A;E++)u[E].fn!==l&&u[E].fn._!==l&&g.push(u[E]);return g.length?o[e]=g:delete o[e],this}},p.exports=d,p.exports.TinyEmitter=d}},D={};function h(p){if(D[p])return D[p].exports;var d=D[p]={exports:{}};return r[p](d,d.exports,h),d.exports}return function(){h.n=function(p){var d=p&&p.__esModule?function(){return p.default}:function(){return p};return h.d(d,{a:d}),d}}(),function(){h.d=function(p,d){for(var e in d)h.o(d,e)&&!h.o(p,e)&&Object.defineProperty(p,e,{enumerable:!0,get:d[e]})}}(),function(){h.o=function(p,d){return Object.prototype.hasOwnProperty.call(p,d)}}(),h(686)}().default})})(K);var I=fe(K.exports);const Se=i=>{j({message:i,type:"success",duration:1500})},xe=i=>{j({message:i,type:"error"})},Fe=(i,f,r)=>{const D=new I(f.target,{text:()=>i});D.on("success",()=>{var h;Se((h=r==null?void 0:r.successTip)!=null?h:"copy success"),D.destroy()}),D.on("error",()=>{var h;xe((h=r==null?void 0:r.failedTip)!=null?h:"copy success"),D.destroy()})};if(!I)throw new Error("you should npm install `clipboard` --save at first ");var ke={beforeMount(){},mounted(i,f){const r=i,D=new I(r,{text(){return f.value},action(){return f.arg==="cut"?"cut":"copy"}});D.on("success",h=>{console.log(h);const p=i.vClipSuccess;p&&p(h)}),D.on("error",h=>{console.log(h);const p=i.vClipFailure;p&&p(h)}),r.vClipboard=D},beforeUpdate(){},updated(i,f){const r=i;f.arg==="success"?r.vClipSuccess=f.value:f.arg==="error"?r.vClipFailure=f.value:r!=null&&r.vClipboard&&(r.vClipboard.text=()=>f.value,r.vClipboard.action=()=>f.arg==="cut"?"cut":"copy")},beforeUnmount(){},unmounted(i,f){var D;const r=i;f.arg==="success"?delete r.vClipSuccess:f.arg==="error"?delete r.vClipFailure:((D=i==null?void 0:i.vClipboard)==null||D.destroy(),delete r.vClipboard)}};const Te=pe({name:"RichText",components:{Check:ye,CopyDocument:ve},directives:{clip:ke},setup(){const i=me("vue3+vite+typescirpt+ElementPlus"),f=new I(".cut-btn");_e(()=>{f&&f.on("success",o=>{j({type:"success",message:"\u526A\u5207\u6210\u529F"}),o.clearSelection()})}),he(()=>{f.destroy()});const r=ge({tableData:[{province:"\u4E0A\u6D77\u5E02",city:"\u6D66\u4E1C\u65B0\u533A",name:"\u738B\u5C0F\u864E1",address:"\u4E0A\u6D77\u5E02\u666E\u9640\u533A\u91D1\u6C99\u6C5F\u8DEF 1518 \u5F04",edit:!1},{province:"\u4E0A\u6D77\u5E02",city:"\u6D66\u4E1C\u65B0\u533A",name:"\u738B\u5C0F\u864E2",address:"\u4E0A\u6D77\u5E02\u666E\u9640\u533A\u91D1\u6C99\u6C5F\u8DEF 1517 \u5F04",edit:!1},{province:"\u4E0A\u6D77\u5E02",city:"\u6D66\u4E1C\u65B0\u533A",name:"\u738B\u5C0F\u864E3",address:"\u4E0A\u6D77\u5E02\u666E\u9640\u533A\u91D1\u6C99\u6C5F\u8DEF 1519 \u5F04",edit:!1},{province:"\u4E0A\u6D77\u5E02",city:"\u6D66\u4E1C\u65B0\u533A",name:"\u738B\u5C0F\u864E4",address:"\u4E0A\u6D77\u5E02\u666E\u9640\u533A\u91D1\u6C99\u6C5F\u8DEF 1516 \u5F04",edit:!0}]}),D=(o,u)=>{console.log(o,u),r.tableData[o].edit=!0},h=o=>Object.keys(o).some(g=>o[g]==="");return q({handleCopyInput:(o,u)=>{Fe(o,u,{successTip:"\u590D\u5236\u6210\u529F",failedTip:"\u590D\u5236\u5931\u8D25"})},inputContent:i,handleAddRecord:()=>{r.tableData.push({province:"",city:"",name:"",address:"",edit:!0})},handleEdit:D,handleSave:(o,u)=>(console.log(o,u),h(u)?(j.warning("\u4FDD\u5B58\u524D\u8BF7\u5B8C\u5584\u4FE1\u606F\uFF01"),!1):(r.tableData[o].edit=!1,r.tableData[o]=u,!0)),handleDelete:(o,u)=>{console.log(o,u),r.tableData.splice(o,1)}},be(r))}}),Y=i=>(we("data-v-1794b252"),i=i(),De(),i),Be={class:"copy-container"},Oe={class:"info"},Ve=R("\u6587\u672C\u590D\u5236"),Re=Y(()=>F("span",{style:{"text-align":"left"}},"\u6587\u672C\u590D\u5236\u5E38\u7528\u4E8E\u591A\u6570\u636E\u62FC\u63A5\u6216\u8005\u957F\u6587\u672C\u5185\u5BB9\u590D\u5236\u573A\u666F\u3002",-1)),Le={class:"grid-content bg-purple-dark"},Ne={style:{"text-align":"left"}},Me=Y(()=>F("span",null,"\u957F\u6587\u672C\u5185\u5BB9\u590D\u5236\u573A\u666F",-1)),Pe={class:"section"},Ue=R("\u590D\u5236"),je={class:"grid-content bg-purple-dark"},Ie={style:{"text-align":"left"}},$e=Y(()=>F("span",null,"\u591A\u6570\u636E\u62FC\u63A5\u590D\u5236\u573A\u666F",-1)),ze={key:1,class:"name-wrapper"},He={key:1},Ye={key:1},Ge={key:1},Je=R(" \u4FDD\u5B58"),Xe=R(" \u590D\u5236"),qe={style:{margin:"5px"}},Ke=R("+ \u65B0\u589E\u8BB0\u5F55");function Qe(i,f,r,D,h,p){const d=x("el-divider"),e=x("el-input"),l=x("el-button"),o=x("el-card"),u=x("el-col"),g=x("el-row"),E=x("el-tag"),A=x("el-popover"),m=x("el-table-column"),C=x("check"),_=x("el-icon"),k=x("copy-document"),M=x("el-table"),$=Ee("clip");return B(),N("div",Be,[F("div",Oe,[b(d,{"content-position":"left"},{default:w(()=>[Ve]),_:1}),Re]),F("div",null,[b(g,null,{default:w(()=>[b(u,{offset:1,span:22},{default:w(()=>[F("div",Le,[b(o,{class:"box-card"},{default:w(()=>[F("div",Ne,[Me,b(d)]),F("div",Pe,[b(e,{id:"textarea",modelValue:i.inputContent,"onUpdate:modelValue":f[0]||(f[0]=y=>i.inputContent=y),style:{width:"70%",margin:"0px 20px"},type:"textarea",rows:2,placeholder:"\u8BF7\u8F93\u5165\u5185\u5BB9"},null,8,["modelValue"]),b(l,{size:"medium",type:"success",plain:"",onClick:f[1]||(f[1]=y=>i.handleCopyInput(i.inputContent,y))},{default:w(()=>[Ue]),_:1})])]),_:1})])]),_:1})]),_:1}),b(g,null,{default:w(()=>[b(u,{offset:1,span:22},{default:w(()=>[F("div",je,[b(o,{class:"box-card"},{default:w(()=>[F("div",Ie,[$e,b(d)]),b(M,{data:i.tableData,style:{width:"100%"}},{default:w(()=>[b(m,{label:"\u59D3\u540D",width:"180"},{default:w(y=>[b(A,{effect:"light",trigger:"hover",placement:"top"},{default:w(()=>[F("p",null,"\u59D3\u540D: "+O(y.row.name),1),F("p",null,"\u4F4F\u5740: "+O(y.row.address),1)]),reference:w(()=>[y.row.edit?(B(),V(e,{key:0,modelValue:y.row.name,"onUpdate:modelValue":S=>y.row.name=S},null,8,["modelValue","onUpdate:modelValue"])):(B(),N("div",ze,[b(E,{size:"medium"},{default:w(()=>[R(O(y.row.name),1)]),_:2},1024)]))]),_:2},1024)]),_:1}),b(m,{prop:"province",label:"\u7701\u4EFD",width:"120"},{default:w(y=>[y.row.edit?(B(),V(e,{key:0,modelValue:y.row.province,"onUpdate:modelValue":S=>y.row.province=S},null,8,["modelValue","onUpdate:modelValue"])):(B(),N("span",He,O(y.row.province),1))]),_:1}),b(m,{prop:"city",label:"\u5E02\u533A",width:"120"},{default:w(y=>[y.row.edit?(B(),V(e,{key:0,modelValue:y.row.city,"onUpdate:modelValue":S=>y.row.city=S},null,8,["modelValue","onUpdate:modelValue"])):(B(),N("span",Ye,O(y.row.city),1))]),_:1}),b(m,{prop:"address",label:"\u8BE6\u7EC6\u5730\u5740"},{default:w(y=>[y.row.edit?(B(),V(e,{key:0,modelValue:y.row.address,"onUpdate:modelValue":S=>y.row.address=S},null,8,["modelValue","onUpdate:modelValue"])):(B(),N("span",Ge,O(y.row.address),1))]),_:1}),b(m,{label:"\u64CD\u4F5C",width:"200"},{default:w(y=>[y.row.edit?(B(),V(l,{key:0,size:"medium",type:"success",plain:"",onClick:S=>i.handleSave(y.$index,y.row)},{default:w(()=>[b(_,null,{default:w(()=>[b(C)]),_:1}),Je]),_:2},1032,["onClick"])):Ce((B(),V(l,{key:1,size:"medium",type:"info",plain:""},{default:w(()=>[b(_,null,{default:w(()=>[b(k)]),_:1}),Xe]),_:2},1024)),[[$,`\u59D3\u540D:${y.row.name},\u8BE6\u7EC6\u5730\u5740:${y.row.address}`,"copy"]])]),_:1})]),_:1},8,["data"]),F("div",qe,[b(l,{onClick:i.handleAddRecord},{default:w(()=>[Ke]),_:1},8,["onClick"])])]),_:1})])]),_:1})]),_:1})])])}var nt=Ae(Te,[["render",Qe],["__scopeId","data-v-1794b252"]]);export{nt as default};