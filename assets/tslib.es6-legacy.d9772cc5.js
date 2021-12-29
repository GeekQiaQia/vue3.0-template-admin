System.register([],(function(t){"use strict";return{execute:function(){t({_:function(){for(var t=0,r=0,n=arguments.length;r<n;r++)t+=arguments[r].length;var o=Array(t),e=0;for(r=0;r<n;r++)for(var c=arguments[r],l=0,a=c.length;l<a;l++,e++)o[e]=c[l];return o},a:function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=t}r(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)},b:function(t,r,n){if(n||2===arguments.length)for(var o,e=0,c=r.length;e<c;e++)!o&&e in r||(o||(o=Array.prototype.slice.call(r,0,e)),o[e]=r[e]);return t.concat(o||Array.prototype.slice.call(r))},d:function(t,r){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&r.indexOf(o)<0&&(n[o]=t[o]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var e=0;for(o=Object.getOwnPropertySymbols(t);e<o.length;e++)r.indexOf(o[e])<0&&Object.prototype.propertyIsEnumerable.call(t,o[e])&&(n[o[e]]=t[o[e]])}return n}});
/*! *****************************************************************************
            Copyright (c) Microsoft Corporation.

            Permission to use, copy, modify, and/or distribute this software for any
            purpose with or without fee is hereby granted.

            THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
            REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
            AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
            INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
            LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
            OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
            PERFORMANCE OF THIS SOFTWARE.
            ***************************************************************************** */var r=function(t,n){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])},r(t,n)},n=t("c",(function(){return t("c",n=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++)for(var e in r=arguments[n])Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e]);return t}),n.apply(this,arguments)}))}}}));
