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
***************************************************************************** */
var t=function(r,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])})(r,o)};function r(r,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function n(){this.constructor=r}t(r,o),r.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}var o=function(){return o=Object.assign||function(t){for(var r,o=1,n=arguments.length;o<n;o++)for(var e in r=arguments[o])Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e]);return t},o.apply(this,arguments)};function n(t,r){var o={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&r.indexOf(n)<0&&(o[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var e=0;for(n=Object.getOwnPropertySymbols(t);e<n.length;e++)r.indexOf(n[e])<0&&Object.prototype.propertyIsEnumerable.call(t,n[e])&&(o[n[e]]=t[n[e]])}return o}function e(){for(var t=0,r=0,o=arguments.length;r<o;r++)t+=arguments[r].length;var n=Array(t),e=0;for(r=0;r<o;r++)for(var a=arguments[r],c=0,l=a.length;c<l;c++,e++)n[e]=a[c];return n}function a(t,r,o){if(o||2===arguments.length)for(var n,e=0,a=r.length;e<a;e++)!n&&e in r||(n||(n=Array.prototype.slice.call(r,0,e)),n[e]=r[e]);return t.concat(n||Array.prototype.slice.call(r))}export{e as _,r as a,a as b,o as c,n as d};
