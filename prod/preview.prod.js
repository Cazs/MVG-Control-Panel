!function(e){function t(l){if(n[l])return n[l].exports;var a=n[l]={i:l,l:!1,exports:{}};return e[l].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,l){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:l})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=73)}([function(e){e.exports=require("react")},function(e){e.exports=require("prop-types")},,function(e){e.exports=require("styled-components")},function(e){e.exports=require("redux-actions")},function(e,t){"use strict";let n=null,l=null,a=0,r=0;const o=new class{constructor(){n=null,l={usr:"N/A",name:"N/A",firstname:"N/A",lastname:"N/A",cell:"N/A",tel:"N/A",email:"N/A",access_level:0},a=0,r=0}setSessionId(e){n=e}getSessionId(){return n}getSessionUser(){return l}setSessionUser(e){l=e}session_date(){}setSessionDate(e){a=e}session_ttl(){return r}setSessionTtl(e){r=e}};t.a=o},function(e){e.exports=require("electron")},,function(e,t,n){"use strict";function l(e){return e.link?r.a.createElement(d,e,e.children):r.a.createElement(u,e,e.children)}var a=n(0),r=n.n(a),o=n(1),c=n.n(o),i=n(3),s=n.n(i);const u=s.a.button`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 4px;
  padding: 4px 15px;
  font-size: 12px;
  text-decoration: none;
  background: #ffffff;
  border: 1px solid #e0e1e1;
  text-transform: uppercase;
  letter-spacing: 1px;
  // Block Level Button
  ${e=>e.block&&"width: 100%;"}
  // Color
  ${e=>e.primary&&"\n    background: #469fe5;\n    color: white;\n  "}
  ${e=>e.success&&"\n    background: #6bbb69;\n    color: white;\n  "}
  ${e=>e.danger&&"\n    background: #EC476E;\n    color: white;\n  "}
  // Active state
  ${e=>e.active&&"\n    background: #F2F3F4;\n    color: #4F555C;\n  "}
  // Hover
  &:hover {
    cursor: pointer;
    text-decoration: none;
    // color: white;
  }
`,d=s.a.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  ${e=>e.primary&&"color: #469fe5;"} ${e=>e.success&&"color: #6bbb69;"} ${e=>e.danger&&"color: #EC476E;"} &:hover {
    cursor: pointer;
  }
`;s.a.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  > button {
    margin: 0!important;
    border-radius: 0;
    &:first-child { border-radius: 4px 0 0 4px; }
    &:last-child { border-radius: 0 4px 4px 0; }
    &:not(:first-child) { border-left: 0; }
  }
  & > button:hover {
    background-color: #343434;
    color: #fff;
  }
`;l.propTypes={link:c.a.bool,danger:c.a.bool,onClick:c.a.func,primary:c.a.bool,success:c.a.bool},l.defaultProps={link:!1,primary:!1,success:!1,danger:!1},t.a=l},,,function(e){e.exports=require("react-redux")},,function(e){e.exports=require("reselect")},function(e){e.exports=require("recompose")},function(e){e.exports=require("path")},,,function(e){e.exports=require("lodash")},function(e,t,n){"use strict";n.d(t,"b",function(){return l}),n.d(t,"a",function(){return a}),n.d(t,"f",function(){return r}),n.d(t,"c",function(){return o}),n.d(t,"d",function(){return c}),n.d(t,"e",function(){return i});const l="QUOTE_UPDATE",a="INVOICE_UPDATE",r="UI_CHANGE_LANGUAGE",o="SETTINGS_RELOAD_CONFIGS",c="SETTINGS_UPDATE_CONFIGS",i="SETTINGS_UPDATE_PROFILE"},function(e){e.exports=require("redux")},function(e,t,n){const l=n(6).remote.require("electron-settings"),a=n(55),r=n(54);let o,c;e.exports={preload:function(){for(const e in o={},function(){switch(l.get("general.sound")){case"cs":c=a;break;default:c=r}}(),c)if(!o[e]){const t=c[e],n=o[e]=new window.Audio;n.volume=t.volume,n.src=t.url}},play:function(e){if(!l.get("general.muted")){let t=o[e];if(!t){const n=c[e];if(!n)throw new Error("Invalid sound name");(t=o[e]=new window.Audio).volume=n.volume,t.src=n.url}t.currentTime=0,t.play()}}}},function(e){e.exports=require("react-dom")},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=function(e){return e&&"object"==typeof e&&"default"in e?e.default:e}(n(0)),a=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},o=function(e){function t(){return a(this,t),r(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.render=function(){return l.Children.only(this.props.children)},t}(l.Component);t.AppContainer=o,t.hot=function(){return function(e){return e}},t.areComponentsEqual=function(e,t){return e===t},t.setConfig=function(){}},,,,,,function(e,t,n){"use strict";var l=n(0),a=n.n(l),r=n(1),o=n.n(r),c=n(3),i=n.n(c);const s=i.a.div`
  padding: 20px;
  font-weight: 200;
  color: #4f555c;
  background: white;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  ${e=>e.info&&"border-left: 5px solid #469FE5; border-right: 5px solid #469FE5;"} ${e=>e.success&&"border-left: 5px solid #6BBB69; border-right: 5px solid #6BBB69;"} ${e=>e.danger&&"border-left: 5px solid #EC476E; border-right: 5px solid #EC476E;"} ${e=>e.warning&&"border-left: 5px solid #F9D548; border-right: 5px solid #F9D548;"};
`,u=e=>a.a.createElement(s,e,e.text);u.propTypes={text:o.a.string.isRequired,info:o.a.bool,success:o.a.bool,danger:o.a.bool,warning:o.a.bool},u.defaultProps={info:!0,success:!1,danger:!1,warning:!1},t.a=u},function(e,t,n){const l=n(15),a=n(53),{BrowserWindow:r}=n(6).remote,o=n(21),c=n(52);e.exports=function(e,t="",n){const i=c(450,220);let s=new r({x:i.x,y:i.y,width:450,height:220,backgroundColor:"#282828",frame:!1,show:!1});s.loadURL(a.format({pathname:l.resolve(__dirname,"../modal/index.html"),protocol:"file:",slashes:!0})),s.on("close",()=>s=null),s.webContents.on("did-finish-load",()=>{s.webContents.send("update-modal",e,t,n)}),s.on("ready-to-show",()=>{s.show(),s.focus(),o.play("DIALOG")})}},function(e,t,n){"use strict";e.exports=n(24)},,function(e){e.exports={}},function(){if(document.addEventListener("dragover",e=>e.preventDefault()),document.addEventListener("drop",e=>e.preventDefault()),"linux"==process.platform||"win32"==process.platform){document.querySelectorAll("body,#root,.appWrapper").forEach(e=>{e.classList.add("non-draggable")})}},function(e,t,n){"use strict";e.exports=n(24)},,,,,function(e){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},function(e,t,n){"use strict";var l=n(0),a=n.n(l),r=(n(30),n(3)),o=n.n(r);const c=n(31),i=o.a.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: #2C323A;
  h1 {
    font-size: 500%;
    color: #CBC189;
  }
  h2 {
    font-weight: 400;
    color: white;
  }
  p {
    margin: 0;
    font-weight: 100;
    color: #C4C8CC;
    line-height: 1.75;
    text-align: center;
  }
`;t.a=class extends l.Component{constructor(e){super(e),this.state={hasError:!1}}componentDidCatch(e,t){this.setState({hasError:!0}),c({type:"warning",title:"Error Boundary",message:t.componentStack})}render(){return this.state.hasError?a.a.createElement(i,null,a.a.createElement("h1",null,a.a.createElement("i",{className:"ion-bug"})),a.a.createElement("h2",null,"You have found a bug!"),a.a.createElement("p",null,"Please report this to the maintainer of Resource Engine.",a.a.createElement("br",null),"GitHub: https://github.com/FadulousIT/ERP_app",a.a.createElement("br",null),"Email: casper@foag.co.za")):this.props.children}}},,function(e,t){!function(e){"use strict";function t(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function n(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0})}function l(e,t,n){l.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:n,enumerable:!0})}function a(e,t){a.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function r(e,t){r.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function o(e,t,n){o.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:n,enumerable:!0})}function c(e,t,n){var l=e.slice((n||t)+1||e.length);return e.length=0>t?e.length+t:t,e.push.apply(e,l),e}function i(e){var t=void 0===e?"undefined":v(e);return"object"===t?e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object":t}function s(e,t,n,u,d,p,m){d=d||[],m=m||[];var f=d.slice(0);if(void 0!==p){if(u){if("function"==typeof u&&u(f,p))return;if("object"===(void 0===u?"undefined":v(u))){if(u.prefilter&&u.prefilter(f,p))return;if(u.normalize){var E=u.normalize(f,p,e,t);E&&(e=E[0],t=E[1])}}}f.push(p)}"regexp"===i(e)&&"regexp"===i(t)&&(e=e.toString(),t=t.toString());var g=void 0===e?"undefined":v(e),_=void 0===t?"undefined":v(t),h="undefined"!==g||m&&m[m.length-1].lhs&&m[m.length-1].lhs.hasOwnProperty(p),b="undefined"!==_||m&&m[m.length-1].rhs&&m[m.length-1].rhs.hasOwnProperty(p);if(!h&&b)n(new a(f,t));else if(!b&&h)n(new r(f,e));else if(i(e)!==i(t))n(new l(f,e,t));else if("date"===i(e)&&0!=e-t)n(new l(f,e,t));else if("object"!==g||null===e||null===t)e!==t&&("number"===g&&isNaN(e)&&isNaN(t)||n(new l(f,e,t)));else if(m.filter(function(t){return t.lhs===e}).length)e!==t&&n(new l(f,e,t));else{if(m.push({lhs:e,rhs:t}),Array.isArray(e)){var x;for(e.length,x=0;x<e.length;x++)x>=t.length?n(new o(f,x,new r(void 0,e[x]))):s(e[x],t[x],n,u,f,x,m);for(;x<t.length;)n(new o(f,x,new a(void 0,t[x++])))}else{var y=Object.keys(e),w=Object.keys(t);y.forEach(function(l){var a=w.indexOf(l);0<=a?(s(e[l],t[l],n,u,f,l,m),w=c(w,a)):s(e[l],void 0,n,u,f,l,m)}),w.forEach(function(e){s(void 0,t[e],n,u,f,e,m)})}--m.length}}function u(e,t,n,l){return l=l||[],s(e,t,function(e){e&&l.push(e)},n),l.length?l:void 0}function d(e,t,n){if(n.path&&n.path.length){var l,a=e[t],r=n.path.length-1;for(l=0;l<r;l++)a=a[n.path[l]];switch(n.kind){case"A":d(a[n.path[l]],n.index,n.item);break;case"D":delete a[n.path[l]];break;case"E":case"N":a[n.path[l]]=n.rhs}}else switch(n.kind){case"A":d(e[t],n.index,n.item);break;case"D":e=c(e,t);break;case"E":case"N":e[t]=n.rhs}return e}function p(e,t,n){if(e&&t&&n&&n.kind){for(var l=e,a=-1,r=n.path?n.path.length-1:0;++a<r;)void 0===l[n.path[a]]&&(l[n.path[a]]="number"==typeof n.path[a]?[]:{}),l=l[n.path[a]];switch(n.kind){case"A":d(n.path?l[n.path[a]]:l,n.index,n.item);break;case"D":delete l[n.path[a]];break;case"E":case"N":l[n.path[a]]=n.rhs}}}function m(e,t,n){if(n.path&&n.path.length){var l,a=e[t],r=n.path.length-1;for(l=0;l<r;l++)a=a[n.path[l]];switch(n.kind){case"A":m(a[n.path[l]],n.index,n.item);break;case"D":case"E":a[n.path[l]]=n.lhs;break;case"N":delete a[n.path[l]]}}else switch(n.kind){case"A":m(e[t],n.index,n.item);break;case"D":case"E":e[t]=n.lhs;break;case"N":e=c(e,t)}return e}function f(e,t,n,l){var a=u(e,t);try{l?n.groupCollapsed("diff"):n.group("diff")}catch(l){n.log("diff")}a?a.forEach(function(e){var t=e.kind,l=function(e){var t=e.kind,n=e.path,l=e.lhs,a=e.rhs,r=e.index,o=e.item;return"E"===t?[n.join("."),l,"→",a]:"N"===t?[n.join("."),a]:"D"===t?[n.join(".")]:"A"===t?[n.join(".")+"["+r+"]",o]:[]}(e);n.log.apply(n,["%c "+S[t].text,function(e){return"color: "+S[e].color+"; font-weight: bold"}(t)].concat(w(l)))}):n.log("—— no diff ——");try{n.groupEnd()}catch(l){n.log("—— diff end —— ")}}function E(e,t,n,l){switch(void 0===e?"undefined":v(e)){case"object":return"function"==typeof e[l]?e[l].apply(e,w(n)):e[l];case"function":return e(t);default:return e}}function g(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},A,e),n=t.logger,l=t.stateTransformer,a=t.errorTransformer,r=t.predicate,o=t.logErrors,c=t.diffPredicate;if(void 0===n)return function(){return function(e){return function(t){return e(t)}}};if(e.getState&&e.dispatch)return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"),function(){return function(e){return function(t){return e(t)}}};var i=[];return function(e){var n=e.getState;return function(e){return function(s){if("function"==typeof r&&!r(n,s))return e(s);var u,d={};if(i.push(d),d.started=y.now(),d.startedTime=new Date,d.prevState=l(n()),d.action=s,o)try{u=e(s)}catch(e){d.error=a(e)}else u=e(s);d.took=y.now()-d.started,d.nextState=l(n());var p=t.diff&&"function"==typeof c?c(n,s):t.diff;if(function(e,t){var n=t.logger,l=t.actionTransformer,a=t.titleFormatter,r=void 0===a?function(e){var t=e.timestamp,n=e.duration;return function(e,l,a){var r=["action"];return r.push("%c"+e.type),t&&r.push("%c@ "+l),n&&r.push("%c(in "+a.toFixed(2)+" ms)"),r.join(" ")}}(t):a,o=t.collapsed,c=t.colors,i=t.level,s=t.diff,u=void 0===t.titleFormatter;e.forEach(function(a,d){var p=a.started,m=a.startedTime,g=a.action,_=a.prevState,h=a.error,b=a.took,y=a.nextState,v=e[d+1];v&&(y=v.prevState,b=v.started-p);var w=l(g),C="function"==typeof o?o(function(){return y},g,a):o,S=x(m),A=c.title?"color: "+c.title(w)+";":"",R=["color: gray; font-weight: lighter;"];R.push(A),t.timestamp&&R.push("color: gray; font-weight: lighter;"),t.duration&&R.push("color: gray; font-weight: lighter;");var k=r(w,S,b);try{C?c.title&&u?n.groupCollapsed.apply(n,["%c "+k].concat(R)):n.groupCollapsed(k):c.title&&u?n.group.apply(n,["%c "+k].concat(R)):n.group(k)}catch(a){n.log(k)}var j=E(i,w,[_],"prevState"),q=E(i,w,[w],"action"),O=E(i,w,[h,_],"error"),T=E(i,w,[y],"nextState");if(j)if(c.prevState){var D="color: "+c.prevState(_)+"; font-weight: bold";n[j]("%c prev state",D,_)}else n[j]("prev state",_);if(q)if(c.action){var F="color: "+c.action(w)+"; font-weight: bold";n[q]("%c action    ",F,w)}else n[q]("action    ",w);if(h&&O)if(c.error){var I="color: "+c.error(h,_)+"; font-weight: bold;";n[O]("%c error     ",I,h)}else n[O]("error     ",h);if(T)if(c.nextState){var N="color: "+c.nextState(y)+"; font-weight: bold";n[T]("%c next state",N,y)}else n[T]("next state",y);s&&f(_,y,n,C);try{n.groupEnd()}catch(a){n.log("—— log end ——")}})}(i,Object.assign({},t,{diff:p})),i.length=0,d.error)throw d.error;return u}}}}var _,h,b=function(e,t){return function(e,t){return Array(t+1).join(e)}("0",t-e.toString().length)+e},x=function(e){return b(e.getHours(),2)+":"+b(e.getMinutes(),2)+":"+b(e.getSeconds(),2)+"."+b(e.getMilliseconds(),3)},y="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance:Date,v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},w=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)},C=[];_="object"===("undefined"==typeof global?"undefined":v(global))&&global?global:"undefined"==typeof window?{}:window,(h=_.DeepDiff)&&C.push(function(){void 0!==h&&_.DeepDiff===u&&(_.DeepDiff=h,h=void 0)}),t(l,n),t(a,n),t(r,n),t(o,n),Object.defineProperties(u,{diff:{value:u,enumerable:!0},observableDiff:{value:s,enumerable:!0},applyDiff:{value:function(e,t,n){e&&t&&s(e,t,function(l){n&&!n(e,t,l)||p(e,t,l)})},enumerable:!0},applyChange:{value:p,enumerable:!0},revertChange:{value:function(e,t,n){if(e&&t&&n&&n.kind){var l,a,r=e;for(a=n.path.length-1,l=0;l<a;l++)void 0===r[n.path[l]]&&(r[n.path[l]]={}),r=r[n.path[l]];switch(n.kind){case"A":m(r[n.path[l]],n.index,n.item);break;case"D":case"E":r[n.path[l]]=n.lhs;break;case"N":delete r[n.path[l]]}}},enumerable:!0},isConflict:{value:function(){return void 0!==h},enumerable:!0},noConflict:{value:function(){return C&&(C.forEach(function(e){e()}),C=null),u},enumerable:!0}});var S={E:{color:"#2196F3",text:"CHANGED:"},N:{color:"#4CAF50",text:"ADDED:"},D:{color:"#F44336",text:"DELETED:"},A:{color:"#2196F3",text:"ARRAY:"}},A={level:"log",logger:console,logErrors:!0,collapsed:void 0,predicate:void 0,duration:!1,timestamp:!0,stateTransformer:function(e){return e},actionTransformer:function(e){return e},errorTransformer:function(e){return e},colors:{title:function(){return"inherit"},prevState:function(){return"#9E9E9E"},action:function(){return"#03A9F4"},nextState:function(){return"#4CAF50"},error:function(){return"#F20404"}},diff:!1,diffPredicate:void 0,transformer:void 0},R=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=e.dispatch,n=e.getState;return"function"==typeof t||"function"==typeof n?g()({dispatch:t,getState:n}):void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n")};e.defaults=A,e.createLogger=g,e.logger=R,e.default=R,Object.defineProperty(e,"__esModule",{value:!0})}(t)},,function(e,t,n){"use strict";n.d(t,"b",function(){return m});var l=n(19),a=n(13),r=(n.n(a),n(4));n.n(r);const o=n(6).remote.require("electron-settings"),c=o.get("invoice"),i=o.get("profile"),s=o.get("general"),u={ui:{language:s.language},invoice:{},profile:i,configs:{dateFormat:c.dateFormat,language:s.language,template:c.template,accentColor:"#2CCCE4",logoSize:"20",fontSize:"200",alignItems:"top",showLogo:!0,useSymbol:!0,customAccentColor:!0,showRecipient:!0}},d=Object(r.handleActions)({[l.b]:(e,t)=>Object.assign({},e,{quote:t.payload,configs:t.payload.configs?t.payload.configs:e.configs}),[l.a]:(e,t)=>Object.assign({},e,{invoice:t.payload,configs:t.payload.configs?t.payload.configs:e.configs}),[l.f]:(e,t)=>Object.assign({},e,{ui:Object.assign({},e.ui,{language:t.payload})}),[l.e]:(e,t)=>Object.assign({},e,{profile:t.payload}),[l.d]:(e,t)=>Object.assign({},e,{configs:Object.assign({},e.configs,{[t.payload.name]:t.payload.value})}),[l.c]:(e,t)=>{const{profile:n,invoice:l,general:a}=t.payload;return Object.assign({},e,{profile:n,configs:Object.assign({},e.configs,{language:a.language,template:l.template,dateFormat:l.dateFormat})})}},u);t.a=d;const p=e=>e,m=Object(a.createSelector)(p,e=>e.configs);Object(a.createSelector)(p,e=>e.quote),Object(a.createSelector)(p,e=>e.invoice),Object(a.createSelector)(p,e=>e.pdf_data),Object(a.createSelector)(p,e=>e.profile)},,,,,function(e){e.exports=require("moment")},function(e,t,n){const l=n(6);e.exports=((e,t)=>{const n=l.screen.getPrimaryDisplay(),{x:a,y:r,width:o,height:c}=n.bounds;return{x:a+(o-e)/2,y:r+(c-t)/2}})},function(e){e.exports=require("url")},function(e,t,n){const l=n(15),a=.5;e.exports={STARTUP:{url:l.resolve(__dirname,"../static/sounds/default/startup.wav"),volume:1},DIALOG:{url:l.resolve(__dirname,"../static/sounds/default/dialog.wav"),volume:a},SUCCESS:{url:l.resolve(__dirname,"../static/sounds/default/success.wav"),volume:a},WARNING:{url:l.resolve(__dirname,"../static/sounds/default/warning.wav"),volume:a},ADD:{url:l.resolve(__dirname,"../static/sounds/default/add.wav"),volume:a},REMOVE:{url:l.resolve(__dirname,"../static/sounds/default/remove.wav"),volume:a},RELOAD:{url:l.resolve(__dirname,"../static/sounds/default/reload.wav"),volume:a},TAP:{url:l.resolve(__dirname,"../static/sounds/default/tap.wav"),volume:a}}},function(e,t,n){const l=n(15),a=.25;e.exports={STARTUP:{url:l.resolve(__dirname,"../static/sounds/cs/startup.wav"),volume:.5},DIALOG:{url:l.resolve(__dirname,"../static/sounds/cs/dialog.wav"),volume:a},SUCCESS:{url:l.resolve(__dirname,"../static/sounds/cs/success.wav"),volume:a},WARNING:{url:l.resolve(__dirname,"../static/sounds/cs/warning.wav"),volume:a},ADD:{url:l.resolve(__dirname,"../static/sounds/cs/add.wav"),volume:a},REMOVE:{url:l.resolve(__dirname,"../static/sounds/cs/remove.wav"),volume:a},RELOAD:{url:l.resolve(__dirname,"../static/sounds/cs/reload.wav"),volume:a},TAP:{url:l.resolve(__dirname,"../static/sounds/cs/tap.wav"),volume:a}}},,,,,,,,,,function(e,t,n){"use strict";function l({saveConfigs:e,savePDF:t}){return p.a.createElement(S,null,p.a.createElement(A,null,p.a.createElement(C.a,{block:!0,primary:!0,onClick:t},"Save PDF"),p.a.createElement(C.a,{block:!0,secondary:!0,onClick:e},"Save Configs")))}function a({alignItems:e,handleInputChange:t}){return p.a.createElement(y,null,p.a.createElement(v,null,"Name"),p.a.createElement("select",{name:"alignItems",value:e,onChange:t},p.a.createElement("option",{value:"top"},"Top"),p.a.createElement("option",{value:"middle"},"Middle"),p.a.createElement("option",{value:"bottom"},"Bottom")))}function r({fontSize:e,handleInputChange:t}){return p.a.createElement(y,null,p.a.createElement(v,null,"Font Size"),p.a.createElement(w,{name:"fontSize",type:"range",min:"100",max:"500",step:"100",value:e,onChange:t}))}function o({configs:e,handleInputChange:t}){const{showLogo:n,useSymbol:l,showRecipient:a,customAccentColor:r}=e;return p.a.createElement(y,null,p.a.createElement(v,null,"Toggle"),p.a.createElement("label",null,p.a.createElement("input",{name:"showLogo",type:"checkbox",checked:n,onChange:t})," ","Logo"),p.a.createElement("label",null,p.a.createElement("input",{name:"useSymbol",type:"checkbox",checked:l,onChange:t})," ","Symbol"),p.a.createElement("label",null,p.a.createElement("input",{name:"showRecipient",type:"checkbox",checked:a,onChange:t})," ","Recipient"),p.a.createElement("label",null,p.a.createElement("input",{name:"customAccentColor",type:"checkbox",checked:r,onChange:t})," ","Name"))}function c({pdf_data:e,configs:t,t:n}){let l=0;e.resources.map(e=>l+=e.unit_cost*e.quantity);const a=l*e.vat/100,r=l+a;return p.a.createElement(D,{alignItems:function(e){let t;switch(e.alignItems){case"top":t="flex-start";break;case"bottom":t="flex-end";break;default:t="center"}return t}(t)},p.a.createElement("div",{style:{marginTop:"-72px"}},p.a.createElement("table",{style:{width:"100%",fontSize:"16pt"},border:"1px solid red"},p.a.createElement("thead",null,p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("strong",null,"Client Details")),p.a.createElement("td",null,p.a.createElement("strong",null,"Quotation No."),p.a.createElement("i",{style:{marginLeft:"15px"}},T.session_usr.firstname,"-",T.session_usr.firstname.charAt(0)+T.session_usr.lastname.charAt(0),"-00",e.object_number," REV ",e.revision)))),p.a.createElement("tbody",null,p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Contact Person: ",e.contact_person)),p.a.createElement("td",null,p.a.createElement("p",null,"Date: ",e.date_logged))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Company: ",e.client_name)),p.a.createElement("td",null,p.a.createElement("p",null,"Sale Consultant: ",T.session_usr.name," "))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Cell: ",e.contact.cell)),p.a.createElement("td",null,p.a.createElement("p",null,"Consultant Cell: ",T.session_usr.cell," "),p.a.createElement("p",null,"Consultant eMail: ",T.session_usr.email," "))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Tel: ",e.contact.tel?e.contact.tel:""," ",e.client.tel?" / ":""," ",e.client.tel?e.client.tel:"")),p.a.createElement("td",null,p.a.createElement("p",null,"Fax: ",e.fax))))),p.a.createElement("p",{style:{borderBottom:"1px solid black",borderLeft:"1px solid black",borderRight:"1px solid black"}},"Sitename: ",e.sitename),p.a.createElement("p",{style:{borderBottom:"1px solid black",borderLeft:"1px solid black",borderRight:"1px solid black"}},"Request: ",e.request),p.a.createElement(F,{accentColor:"#A183E8",customAccentColor:"lime"},p.a.createElement("thead",null,p.a.createElement("tr",null,p.a.createElement("th",{style:{borderLeft:"1px solid #A183E8",borderRight:"1px solid #A183E8"}},"Item Number"),p.a.createElement("th",{style:{borderRight:"1px solid #A183E8"}},"Item Description"),p.a.createElement("th",{style:{borderRight:"1px solid #A183E8"}},"Unit"),p.a.createElement("th",{style:{borderRight:"1px solid #A183E8"}},"Qty"),p.a.createElement("th",{style:{borderRight:"1px solid #A183E8"}},"Rate"),p.a.createElement("th",{style:{borderRight:"1px solid #A183E8"}},"Total Cost"))),p.a.createElement("tbody",null,e.resources.map((e,t)=>p.a.createElement("tr",{key:t},p.a.createElement("td",null,Object(O.padStart)(t+1,2,0),"."),p.a.createElement("td",null,e.item_description),p.a.createElement("td",null,e.unit),p.a.createElement("td",null,e.quantity),p.a.createElement("td",null,"R ",e.unit_cost),p.a.createElement("td",null,"R ",e.unit_cost*e.quantity)))),p.a.createElement("tfoot",{style:{marginTop:"40px"}},p.a.createElement("tr",null,p.a.createElement("td",null,"Sub-Total: "),p.a.createElement("td",{colSpan:"5"},"R ",l)),p.a.createElement("tr",null,p.a.createElement("td",null,"VAT: "),p.a.createElement("td",{colSpan:"5"},"R ",a)),p.a.createElement("tr",null,p.a.createElement("td",null,"Total: "),p.a.createElement("td",{colSpan:"5"},"R ",r)))),p.a.createElement("div",{style:{width:"100%",backgroundColor:"#eeeeee",marginLeft:"auto",marginRight:"auto",marginTop:"20px",fontSize:"18pt"}},p.a.createElement("p",{style:{textAlign:"center"}},"Terms and Conditions of Sale"),p.a.createElement("p",null,"*Validity: Quote valid subject to rate of exchange (30days)"),p.a.createElement("p",null,"*Payment Terms: COD / 30 Days on approved accounts."),p.a.createElement("p",null,"*Delivery: 1 - 6 Weeks, subject to stock availability."),p.a.createElement("p",null,"*All pricing quoted, is subject to the exchange rate variations"),p.a.createElement("p",null,"*All goods / equipment remain the property Omega Fire and Security until paid for completely."),p.a.createElement("p",null,"*Omega Fire and Security reserves the right to retake possession of all equipment not paid for completely within the payment term set out above E & OE"),p.a.createElement("table",{style:{marginTop:"20px"}},p.a.createElement("tbody",null,p.a.createElement("tr",null,p.a.createElement("td",{style:{paddingRight:"200px"}},p.a.createElement("p",null,"Acceptance: (Full Name)")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null,"Signature:"))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null," _________________________")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",{colSpan:"4"},p.a.createElement("p",null,"_________________________"))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Order / Reference No.:")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",{colSpan:"4"},p.a.createElement("p",null,"Date:"))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"_________________________")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",{colSpan:"4"},p.a.createElement("p",null,"_________________________"))))))))}function i({pdf_data:e,configs:t,t:n}){let l=0;e.quote.resources.map(e=>l+=e.unit_cost*e.quantity);e.vat;return p.a.createElement(I,{alignItems:function(e){let t;switch(e.alignItems){case"top":t="flex-start";break;case"bottom":t="flex-end";break;default:t="center"}return t}(t)},p.a.createElement("div",{style:{marginTop:"-60px"}},p.a.createElement("h4",{style:{textAlign:"center"}},"JOB CARD"),p.a.createElement("table",{style:{fontSize:"16pt"},border:"1"},p.a.createElement("tbody",null,p.a.createElement("tr",null,p.a.createElement("td",{style:{paddingRight:"100px"}},p.a.createElement("p",null,"ISO: 9001: 2008")),p.a.createElement("td",{style:{paddingRight:"80px"}},p.a.createElement("p",null,"Effective Date: 2014.04.10")),p.a.createElement("td",{style:{paddingRight:"135px"}},p.a.createElement("p",null,"Authorised By:"))))),p.a.createElement("table",{style:{width:"100%",fontSize:"16pt"},border:"1"},p.a.createElement("tbody",null,p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Job No.: #",e.object_number)),p.a.createElement("td",null,p.a.createElement("p",null,"Date Logged: ",new Date(1e3*e.date_logged).toString()))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Customer: ",e.client_name)),p.a.createElement("td",null,p.a.createElement("p",null,"Address: ",e.quote.client.physical_address))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Site: ",e.quote.sitename)),p.a.createElement("td",null,p.a.createElement("p",null,"Contact: ",e.contact_person))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Technician: ")),p.a.createElement("td",null,p.a.createElement("p",null,"Start Time: "),p.a.createElement("p",null,"End Time: "))))),p.a.createElement("p",{style:{fontSize:"12pt",borderBottom:"1px solid black",borderLeft:"1px solid black",borderRight:"1px solid black"}},"Request: ",e.request),p.a.createElement("table",{style:{width:"100%",fontSize:"16pt"},border:"1"},p.a.createElement("thead",null,p.a.createElement("tr",null,p.a.createElement("th",null,"Date"),p.a.createElement("th",null,"Time In"),p.a.createElement("th",null,"Time Out"),p.a.createElement("th",null,"Description Of Work Done"),p.a.createElement("th",null,"Materials Used"),p.a.createElement("th",null,"Model/Serial"),p.a.createElement("th",null,"Qty"))),p.a.createElement("tbody",null,p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," "))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," "))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," "))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," "))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," "))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," "))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," "))))),p.a.createElement("table",{style:{marginTop:"40px",width:"100%",fontSize:"16pt"},border:"1"},p.a.createElement("thead",null,p.a.createElement("tr",{style:{backgroundColor:"#eeeeee"}},p.a.createElement("th",null,"Labour Hours"),p.a.createElement("th",null,"Travel Hours"),p.a.createElement("th",null,"Klms."),p.a.createElement("th",null,"Other Staff"),p.a.createElement("th",null,"PO"))),p.a.createElement("tbody",null,p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",{style:{backgroundColor:"#eeeeee"}},p.a.createElement("p",null,"Quote"))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",{style:{backgroundColor:"#eeeeee"}},p.a.createElement("p",null,"Client PO"))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",{style:{backgroundColor:"#eeeeee"}},p.a.createElement("p",null,"Invoice"))))),p.a.createElement("div",{style:{width:"100%",backgroundColor:"#eeeeee",marginLeft:"auto",marginRight:"auto",marginTop:"20px",fontSize:"18pt"}},p.a.createElement("p",null,"CUSTOMER NOTE: ________________________________________________________________________________________"),p.a.createElement("p",null,"The authorised signatory agrees that the detailed tasks listed above have been performed and completed to the client's satisfaction and acknowledges that all equipment installed remains the property of Omega Fire & Security until final payment has been received."),p.a.createElement("table",{style:{marginTop:"20px"}},p.a.createElement("tbody",null,p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Customer Name")),p.a.createElement("td",null,p.a.createElement("p",null,"Customer Signature:")),p.a.createElement("td",null,p.a.createElement("p",null,"Designation:"))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null," _________________________")),p.a.createElement("td",null,p.a.createElement("p",null," _________________________")),p.a.createElement("td",null,p.a.createElement("p",null,"_________________________"))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Technician Signature:")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null,"Date:"))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"_________________________")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null,"_________________________")))))),p.a.createElement("table",{style:{width:"100%",border:" 1px solid #000",marginTop:"5px",fontSize:"10pt"}},p.a.createElement("tbody",null,p.a.createElement("tr",null,p.a.createElement("td",null,"Omega Fire & Security"),p.a.createElement("td",null,"Form 20 :Job Card"),p.a.createElement("td",null,"Revision 1 :10 April 2014"))))))}function s({pdf_data:e,configs:t,t:n}){let l=0;e.job.quote.resources.map(e=>l+=e.unit_cost*e.quantity);const a=l*e.vat/100,r=l+a;return p.a.createElement(N,{alignItems:function(e){let t;switch(e.alignItems){case"top":t="flex-start";break;case"bottom":t="flex-end";break;default:t="center"}return t}(t)},p.a.createElement("div",{style:{marginTop:"-72px"}},p.a.createElement("table",{style:{width:"100%",fontSize:"16pt"},border:"1px solid red"},p.a.createElement("thead",null,p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("strong",null,"Client Details")),p.a.createElement("td",null,p.a.createElement("strong",null,"Invoice No."),p.a.createElement("i",{style:{marginLeft:"15px"}},T.session_usr.firstname,"-",T.session_usr.firstname.charAt(0)+T.session_usr.lastname.charAt(0),"-00",e.object_number," REV ",e.revision)))),p.a.createElement("tbody",null,p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Contact Person: ",e.job.quote.contact_person)),p.a.createElement("td",null,p.a.createElement("p",null,"Date: ",e.date_logged))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Company: ",e.job.quote.client_name)),p.a.createElement("td",null,p.a.createElement("p",null,"Sale Consultant: ",T.session_usr.name," "))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Cell: ",e.job.quote.contact.cell)),p.a.createElement("td",null,p.a.createElement("p",null,"Consultant Cell: ",T.session_usr.cell," "),p.a.createElement("p",null,"Consultant eMail: ",T.session_usr.email," "))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Tel: ",e.job.quote.contact.tel?e.job.quote.contact.tel:""," ",e.job.quote.client.tel?" / ":""," ",e.job.quote.client.tel?e.job.quote.client.tel:"")),p.a.createElement("td",null,p.a.createElement("p",null,"Fax: ",e.job.quote.fax))))),p.a.createElement("p",{style:{borderBottom:"1px solid black",borderLeft:"1px solid black",borderRight:"1px solid black"}},"Sitename: ",e.job.quote.sitename),p.a.createElement("p",{style:{borderBottom:"1px solid black",borderLeft:"1px solid black",borderRight:"1px solid black"}},"Request: ",e.job.quote.request),p.a.createElement(P,{accentColor:"#A183E8",customAccentColor:"lime"},p.a.createElement("thead",null,p.a.createElement("tr",null,p.a.createElement("th",{style:{borderLeft:"1px solid #A183E8",borderRight:"1px solid #A183E8"}},"Item Number"),p.a.createElement("th",{style:{borderRight:"1px solid #A183E8"}},"Item Description"),p.a.createElement("th",{style:{borderRight:"1px solid #A183E8"}},"Unit"),p.a.createElement("th",{style:{borderRight:"1px solid #A183E8"}},"Qty"),p.a.createElement("th",{style:{borderRight:"1px solid #A183E8"}},"Rate"),p.a.createElement("th",{style:{borderRight:"1px solid #A183E8"}},"Total Cost"))),p.a.createElement("tbody",null,e.job.quote.resources.map((e,t)=>p.a.createElement("tr",{key:t},p.a.createElement("td",null,Object(O.padStart)(t+1,2,0),"."),p.a.createElement("td",null,e.item_description),p.a.createElement("td",null,e.unit),p.a.createElement("td",null,e.quantity),p.a.createElement("td",null,"R ",e.unit_cost),p.a.createElement("td",null,"R ",e.unit_cost*e.quantity)))),p.a.createElement("tfoot",{style:{marginTop:"40px"}},p.a.createElement("tr",null,p.a.createElement("td",null,"Sub-Total: "),p.a.createElement("td",{colSpan:"5"},"R ",l)),p.a.createElement("tr",null,p.a.createElement("td",null,"VAT: "),p.a.createElement("td",{colSpan:"5"},"R ",a)),p.a.createElement("tr",null,p.a.createElement("td",null,"Total: "),p.a.createElement("td",{colSpan:"5"},"R ",r)))),p.a.createElement("div",{style:{width:"100%",backgroundColor:"#eeeeee",marginLeft:"auto",marginRight:"auto",marginTop:"20px",fontSize:"18pt"}},p.a.createElement("p",{style:{textAlign:"center"}},"Terms and Conditions of Sale"),p.a.createElement("p",null,"*Validity: Invoice valid subject to rate of exchange (30days)"),p.a.createElement("p",null,"*Payment Terms: COD / 30 Days on approved accounts."),p.a.createElement("p",null,"*Delivery: 1 - 6 Weeks, subject to stock availability."),p.a.createElement("p",null,"*All pricing quoted, is subject to the exchange rate variations"),p.a.createElement("p",null,"*All goods / equipment remain the property Omega Fire and Security until paid for completely."),p.a.createElement("p",null,"*Omega Fire and Security reserves the right to retake possession of all equipment not paid for completely within the payment term set out above E & OE"),p.a.createElement("table",{style:{marginTop:"20px"}},p.a.createElement("tbody",null,p.a.createElement("tr",null,p.a.createElement("td",{style:{paddingRight:"200px"}},p.a.createElement("p",null,"Acceptance: (Full Name)")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null,"Signature:"))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null," _________________________")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",{colSpan:"4"},p.a.createElement("p",null,"_________________________"))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Order / Reference No.:")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",{colSpan:"4"},p.a.createElement("p",null,"Date:"))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"_________________________")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",{colSpan:"4"},p.a.createElement("p",null,"_________________________"))))))))}function u({pdf_data:e,configs:t,t:n}){let l=0;e.resources.map(e=>l+=e.unit_cost*e.quantity);const a=l*e.vat/100,r=l+a;return p.a.createElement($,{alignItems:function(e){let t;switch(e.alignItems){case"top":t="flex-start";break;case"bottom":t="flex-end";break;default:t="center"}return t}(t)},p.a.createElement("div",{style:{marginTop:"-72px"}},p.a.createElement("table",{style:{width:"100%",fontSize:"16pt"},border:"1px solid red"},p.a.createElement("thead",null,p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("strong",null,"Supplier Details")),p.a.createElement("td",null,p.a.createElement("strong",null,"PurchaseOrder No."),p.a.createElement("i",{style:{marginLeft:"15px"}},T.session_usr.firstname,"-",T.session_usr.firstname.charAt(0)+T.session_usr.lastname.charAt(0),"-00",e.object_number)))),p.a.createElement("tbody",null,p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Contact Person: ",e.contact_person)),p.a.createElement("td",null,p.a.createElement("p",null,"Date: ",e.date_logged))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Company: ",e.supplier.supplier_name)),p.a.createElement("td",null,p.a.createElement("p",null,"Sale Consultant: ",T.session_usr.name," "))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Cell: ",e.contact.cell)),p.a.createElement("td",null,p.a.createElement("p",null,"Consultant Cell: ",T.session_usr.cell," "),p.a.createElement("p",null,"Consultant eMail: ",T.session_usr.email," "))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Tel: ",e.contact.tel?e.contact.tel:""," ",e.supplier.tel?" / ":""," ",e.supplier.tel?e.supplier.tel:"")),p.a.createElement("td",null,p.a.createElement("p",null,"Fax: ",e.supplier.fax))))),p.a.createElement(L,{accentColor:"#A183E8",customAccentColor:"lime"},p.a.createElement("thead",null,p.a.createElement("tr",null,p.a.createElement("th",{style:{borderLeft:"1px solid #A183E8",borderRight:"1px solid #A183E8"}},"Item Number"),p.a.createElement("th",{style:{borderRight:"1px solid #A183E8"}},"Item Description"),p.a.createElement("th",{style:{borderRight:"1px solid #A183E8"}},"Unit"),p.a.createElement("th",{style:{borderRight:"1px solid #A183E8"}},"Qty"),p.a.createElement("th",{style:{borderRight:"1px solid #A183E8"}},"Rate"),p.a.createElement("th",{style:{borderRight:"1px solid #A183E8"}},"Total Cost"))),p.a.createElement("tbody",null,e.resources.map((e,t)=>p.a.createElement("tr",{key:t},p.a.createElement("td",null,Object(O.padStart)(t+1,2,0),"."),p.a.createElement("td",null,e.item_description),p.a.createElement("td",null,e.unit),p.a.createElement("td",null,e.quantity),p.a.createElement("td",null,"R ",e.unit_cost),p.a.createElement("td",null,"R ",e.unit_cost*e.quantity)))),p.a.createElement("tfoot",{style:{marginTop:"40px"}},p.a.createElement("tr",null,p.a.createElement("td",null,"Sub-Total: "),p.a.createElement("td",{colSpan:"5"},"R ",l)),p.a.createElement("tr",null,p.a.createElement("td",null,"VAT: "),p.a.createElement("td",{colSpan:"5"},"R ",a)),p.a.createElement("tr",null,p.a.createElement("td",null,"Total: "),p.a.createElement("td",{colSpan:"5"},"R ",r)))),p.a.createElement("div",{style:{width:"100%",backgroundColor:"#eeeeee",marginLeft:"auto",marginRight:"auto",marginTop:"20px",fontSize:"18pt"}},p.a.createElement("table",{style:{marginTop:"20px"}},p.a.createElement("tbody",null,p.a.createElement("tr",null,p.a.createElement("td",{style:{paddingRight:"200px"}},p.a.createElement("p",null,"Acceptance: (Full Name)")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",null,p.a.createElement("p",null,"Signature:"))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null," _________________________")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",{colSpan:"4"},p.a.createElement("p",null,"_________________________"))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"Order / Reference No.:")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",{colSpan:"4"},p.a.createElement("p",null,"Date:"))),p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,"_________________________")),p.a.createElement("td",null,p.a.createElement("p",null," ")),p.a.createElement("td",{colSpan:"4"},p.a.createElement("p",null,"_________________________"))))))))}var d=n(0),p=n.n(d),m=n(1),f=n.n(m),E=n(68),g=n(11),_=n(14),h=n(3),b=n.n(h),x=n(67);const y=b.a.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  justify-content: flex-end;
  align-items: flex-start;
  &:last-child {
    margin-bottom: 0;
  }
`,v=b.a.label`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  color: #4f555c;
`,w=b.a.input`
  width: 100%;
  -webkit-app-region: no-drag;
`;(class extends d.Component{constructor(e){super(e),this.handleChange=this.handleChange.bind(this)}handleChange(e){this.props.handleAccentColorChange(e.hex)}render(){const{t:e,UILang:t,accentColor:n}=this.props;return p.a.createElement(y,null,p.a.createElement(v,null,"Accent Color"),p.a.createElement(x.BlockPicker,{width:"100%",colors:["#D9E3F0","#F47373","#697689","#37D67A","#2CCCE4","#555555","#dce775","#ff8a65"],color:n,onChange:this.handleChange,triangle:"hide"}))}}).propTypes={accentColor:f.a.string.isRequired,handleAccentColorChange:f.a.func.isRequired,UILang:f.a.string.isRequired};var C=n(8);const S=b.a.div`
  display: flex;
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 2;
  margin: -20px;
  padding-top: 10px;
`,A=b.a.div`
  width: 100%;
  align-self: flex-end;
  padding: 20px;
  background: #f9fafa;
  border-top: 1px solid #e0e1e1;
  > * {
    margin-bottom: 10px;
    &:last-child {
    margin-bottom: 0;
    }
 }
`;l.propTypes={saveConfigs:f.a.func.isRequired,savePDF:f.a.func.isRequired,t:f.a.func.isRequired},a.propTypes={alignItems:f.a.string.isRequired,handleInputChange:f.a.func.isRequired};n(51);f.a.string.isRequired,f.a.func.isRequired,f.a.string.isRequired,f.a.func.isRequired,f.a.string.isRequired,r.propTypes={fontSize:f.a.string.isRequired,handleInputChange:f.a.func.isRequired},f.a.string.isRequired,f.a.func.isRequired,f.a.string.isRequired,f.a.func.isRequired,f.a.func.isRequired,f.a.string.isRequired,f.a.func.isRequired,f.a.string.isRequired,f.a.string.isRequired,o.propTypes={configs:f.a.object.isRequired,handleInputChange:f.a.func.isRequired};const R=n(6).ipcRenderer,k=b.a.div`
  min-width: 150px;
  width: 220px;
  max-width: 600px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  justify-content: flex-start;
  background: #f9fafa;
  border-right: 1px solid #e0e1e1;
`,j=b.a.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: min-content;
  padding: 20px;

  > div:last-child {
    flex: 1 0 auto;
  }
`;class q extends d.Component{constructor(e){super(e),this.savePDF=this.savePDF.bind(this),this.saveConfigs=this.saveConfigs.bind(this),this.handleInputChange=this.handleInputChange.bind(this),this.handleAccentColorChange=this.handleAccentColorChange.bind(this)}handleInputChange(e){const t=e.target,n="checkbox"===t.type?t.checked:t.value,l=t.name;this.props.updateConfigs({name:l,value:n})}handleAccentColorChange(e){this.props.updateConfigs({name:"accentColor",value:e})}savePDF(){const e=this.props.pdf_data._id;R.send("save-pdf",e),this.saveConfigs()}saveConfigs(){const{configs:e,pdf_data:t}=this.props,{_id:n}=t;R.send("save-configs-to-pdf_data",n,e)}render(){const{configs:e,UILang:t}=this.props,{accentColor:n,alignItems:c,customAccentColor:i,dateFormat:s,fontSize:u,language:d,logoSize:m,showLogo:f,template:E}=e;return p.a.createElement(k,null,p.a.createElement(j,null,p.a.createElement(a,{alignItems:c,handleInputChange:this.handleInputChange}),p.a.createElement(r,{fontSize:u,handleInputChange:this.handleInputChange}),p.a.createElement(o,{configs:e,handleInputChange:this.handleInputChange}),p.a.createElement(l,{savePDF:this.savePDF,saveConfigs:this.saveConfigs})))}}q.propTypes={configs:f.a.object.isRequired,updateConfigs:f.a.func.isRequired};var O=n(18),T=(n(34),n(5));const D=b.a.div`
  flex: 1;
  display: flex;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  ${e=>e.alignItems&&`\n    align-items: ${e.alignItems};\n  `};
`,F=b.a.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th {
    border-bottom: 2px solid #efefd1;
    border-top: 2px solid #efefd1;
    padding-bottom: 0.8em;
    &:last-child {
      text-align: right;
    }
  }

  thead {margin-top: 15px;}
  ${e=>e.customAccentColor&&`\n    th\n    {\n      padding: 5px;\n      // border-bottom: 1px solid ${e.accentColor};\n      // border-top: 1px solid ${e.accentColor};\n      border: 1px solid #000 !important;\n      padding-bottom: 10px;\n    }\n  `};
  tr > td:last-child {
    text-align: right;
  }
  td {
    color: #2c323a;
    font-weight: 300;
    line-height: 2.75;
    font-size: 0.7em;
    border-bottom: 2px solid #ecf1f1;
    &:first-child {
      color: #c4c8cc;
    }
  }
  tfoot {
    td {
      font-weight: 400;
      &:first-child {
        border: none;
      }
    }
  }
`;b.a.tr`
  font-size: 1.5em;
  td {
    border-bottom: none;
    line-height: 2;
    border-top: 4px solid #efefd1;
    color: #6bbb69;
    &:first-child {
      border: none;
    }
  }

  ${e=>e.customAccentColor&&`\n    td {\n      border-top: 1px solid ${e.accentColor};\n    }\n  `};
`,b.a.div`
  padding: 20px;
  font-weight: 200;
  color: #4f555c;
  background: white;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  ${e=>e.info&&"border-left: 5px solid #469FE5; border-right: 5px solid #469FE5;"} ${e=>e.success&&"border-left: 5px solid #6BBB69; border-right: 5px solid #6BBB69;"} ${e=>e.danger&&"border-left: 5px solid #EC476E; border-right: 5px solid #EC476E;"} ${e=>e.warning&&"border-left: 5px solid #F9D548; border-right: 5px solid #F9D548;"};
`;c.propTypes={configs:f.a.object.isRequired,pdf_data:f.a.object.isRequired,t:f.a.func.isRequired};const I=b.a.div`
  flex: 1;
  display: flex;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  ${e=>e.alignItems&&`\n    align-items: ${e.alignItems};\n  `};
`;b.a.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th {
    border-bottom: 2px solid #efefd1;
    border-top: 2px solid #efefd1;
    padding-bottom: 0.8em;
    &:last-child {
      text-align: right;
    }
  }

  thead {margin-top: 15px;}
  ${e=>e.customAccentColor&&`\n    th\n    {\n      padding: 5px;\n      // border-bottom: 1px solid ${e.accentColor};\n      // border-top: 1px solid ${e.accentColor};\n      border: 1px solid #000 !important;\n      padding-bottom: 10px;\n    }\n  `};
  tr > td:last-child {
    text-align: right;
  }
  td {
    color: #2c323a;
    font-weight: 300;
    line-height: 2.75;
    font-size: 0.7em;
    border-bottom: 2px solid #ecf1f1;
    &:first-child {
      color: #c4c8cc;
    }
  }
  tfoot {
    td {
      font-weight: 400;
      &:first-child {
        border: none;
      }
    }
  }
`,b.a.tr`
  font-size: 1.5em;
  td {
    border-bottom: none;
    line-height: 2;
    border-top: 4px solid #efefd1;
    color: #6bbb69;
    &:first-child {
      border: none;
    }
  }

  ${e=>e.customAccentColor&&`\n    td {\n      border-top: 1px solid ${e.accentColor};\n    }\n  `};
`,b.a.div`
  padding: 20px;
  font-weight: 200;
  color: #4f555c;
  background: white;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  ${e=>e.info&&"border-left: 5px solid #469FE5; border-right: 5px solid #469FE5;"} ${e=>e.success&&"border-left: 5px solid #6BBB69; border-right: 5px solid #6BBB69;"} ${e=>e.danger&&"border-left: 5px solid #EC476E; border-right: 5px solid #EC476E;"} ${e=>e.warning&&"border-left: 5px solid #F9D548; border-right: 5px solid #F9D548;"};
`;i.propTypes={configs:f.a.object.isRequired,pdf_data:f.a.object.isRequired,t:f.a.func.isRequired};const N=b.a.div`
  flex: 1;
  display: flex;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  ${e=>e.alignItems&&`\n    align-items: ${e.alignItems};\n  `};
`,P=b.a.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th {
    border-bottom: 2px solid #efefd1;
    border-top: 2px solid #efefd1;
    padding-bottom: 0.8em;
    &:last-child {
      text-align: right;
    }
  }

  thead {margin-top: 15px;}
  ${e=>e.customAccentColor&&`\n    th\n    {\n      padding: 5px;\n      // border-bottom: 1px solid ${e.accentColor};\n      // border-top: 1px solid ${e.accentColor};\n      border: 1px solid #000 !important;\n      padding-bottom: 10px;\n    }\n  `};
  tr > td:last-child {
    text-align: right;
  }
  td {
    color: #2c323a;
    font-weight: 300;
    line-height: 2.75;
    font-size: 0.7em;
    border-bottom: 2px solid #ecf1f1;
    &:first-child {
      color: #c4c8cc;
    }
  }
  tfoot {
    td {
      font-weight: 400;
      &:first-child {
        border: none;
      }
    }
  }
`;b.a.tr`
  font-size: 1.5em;
  td {
    border-bottom: none;
    line-height: 2;
    border-top: 4px solid #efefd1;
    color: #6bbb69;
    &:first-child {
      border: none;
    }
  }

  ${e=>e.customAccentColor&&`\n    td {\n      border-top: 1px solid ${e.accentColor};\n    }\n  `};
`,b.a.div`
  padding: 20px;
  font-weight: 200;
  color: #4f555c;
  background: white;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  ${e=>e.info&&"border-left: 5px solid #469FE5; border-right: 5px solid #469FE5;"} ${e=>e.success&&"border-left: 5px solid #6BBB69; border-right: 5px solid #6BBB69;"} ${e=>e.danger&&"border-left: 5px solid #EC476E; border-right: 5px solid #EC476E;"} ${e=>e.warning&&"border-left: 5px solid #F9D548; border-right: 5px solid #F9D548;"};
`;s.propTypes={configs:f.a.object.isRequired,pdf_data:f.a.object.isRequired,t:f.a.func.isRequired};const $=b.a.div`
  flex: 1;
  display: flex;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  ${e=>e.alignItems&&`\n    align-items: ${e.alignItems};\n  `};
`,L=b.a.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th {
    border-bottom: 2px solid #efefd1;
    border-top: 2px solid #efefd1;
    padding-bottom: 0.8em;
    &:last-child {
      text-align: right;
    }
  }

  thead {margin-top: 15px;}
  ${e=>e.customAccentColor&&`\n    th\n    {\n      padding: 5px;\n      // border-bottom: 1px solid ${e.accentColor};\n      // border-top: 1px solid ${e.accentColor};\n      border: 1px solid #000 !important;\n      padding-bottom: 10px;\n    }\n  `};
  tr > td:last-child {
    text-align: right;
  }
  td {
    color: #2c323a;
    font-weight: 300;
    line-height: 2.75;
    font-size: 0.7em;
    border-bottom: 2px solid #ecf1f1;
    &:first-child {
      color: #c4c8cc;
    }
  }
  tfoot {
    td {
      font-weight: 400;
      &:first-child {
        border: none;
      }
    }
  }
`;b.a.tr`
  font-size: 1.5em;
  td {
    border-bottom: none;
    line-height: 2;
    border-top: 4px solid #efefd1;
    color: #6bbb69;
    &:first-child {
      border: none;
    }
  }

  ${e=>e.customAccentColor&&`\n    td {\n      border-top: 1px solid ${e.accentColor};\n    }\n  `};
`,b.a.div`
  padding: 20px;
  font-weight: 200;
  color: #4f555c;
  background: white;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  ${e=>e.info&&"border-left: 5px solid #469FE5; border-right: 5px solid #469FE5;"} ${e=>e.success&&"border-left: 5px solid #6BBB69; border-right: 5px solid #6BBB69;"} ${e=>e.danger&&"border-left: 5px solid #EC476E; border-right: 5px solid #EC476E;"} ${e=>e.warning&&"border-left: 5px solid #F9D548; border-right: 5px solid #F9D548;"};
`;u.propTypes={configs:f.a.object.isRequired,pdf_data:f.a.object.isRequired,t:f.a.func.isRequired};const z=b.a.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  overflow: auto;
  padding-top: 30px;
`,B=(b.a.p`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
  height: 100%;
  margin: 0;
`,b.a.div`
  position: relative;
  width: 21cm;
  height: 29.7cm;
  min-height: 29.7cm;
  min-width: 21cm;
  margin-left: auto;
  margin-right: auto;
  background: #FFFFFF;
  box-shadow: 0 0 10px rgba(0,0,0,.1);
  display: flex;
  border-radius: 4px;
`),U=b.a.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3.33333em;
  width: 100%;
  font-family: 'Montserrat';
  ${e=>e.baseFontSize&&`\n    font-size: ${e.baseFontSize};\n  `} .label, h4, th {
    font-weight: 500;
    font-size: 0.66667em;
    text-transform: uppercase;
    text-align: left;
    letter-spacing: 1px;
    color: #2c323a;
    margin: 0;
  }
  h4 {
    margin-bottom: 0.66667em;
  }
  p {
    font-weight: 300;
    font-size: 0.66667em;
    color: #2c323a;
    line-height: 1.75;
    margin: 0;
  }
  .w5 {
    width: 5%;
  }
  .w10 {
    width: 10%;
  }
  .w15 {
    width: 15%;
  }
  .w20 {
    width: 20%;
  }
`;class M extends d.Component{renderTemplate(){return"quote"===this.props.type?p.a.createElement(c,this.props):"invoice"===this.props.type?p.a.createElement(s,this.props):"po"===this.props.type?p.a.createElement(u,this.props):p.a.createElement(i,this.props)}render(){const{pdf_data:e}=this.props;return p.a.createElement(z,null,p.a.createElement("div",{className:"print-area"},p.a.createElement("div",{style:{width:"100%",height:"110px",backgroundColor:"#A183E8",background:"url(../static/images/header.jpg)",backgroundSize:"cover"}}),p.a.createElement(B,null,p.a.createElement(U,{baseFontSize:function(e){let t;switch(e){case"500":t="1.175em";break;case"400":t="1.1em";break;case"300":t="1.025em";break;case"200":t=".95em";break;default:t=".875em"}return t}(this.props.configs.fontSize)},this.renderTemplate()))))}}M.propTypes={configs:f.a.object.isRequired,pdf_data:f.a.object.isRequired};var G=n(19),V=n(4);Object(V.createAction)(G.b,e=>e),Object(V.createAction)(G.a,e=>e);const H=Object(V.createAction)(G.d,e=>e),Q=Object(V.createAction)(G.e,e=>e),W=Object(V.createAction)(G.f,e=>e);Object(V.createAction)(G.c,e=>e);var J=n(46);const K=n(6).ipcRenderer,X=b.a.div`
  display: flex;
  height: 100%;
`;class Y extends d.Component{constructor(e){super(e),this.updateConfigs=this.updateConfigs.bind(this),this.state={pdf_data:null,type:null}}componentDidMount(){const{dispatch:e}=this.props;K.on("update-quote-preview",(e,t)=>{t&&this.setState({pdf_data:t,type:"quote"})}),K.on("update-job-card-preview",(e,t)=>{t&&this.setState({pdf_data:t,type:"job"})}),K.on("update-invoice-preview",(e,t)=>{t&&this.setState({pdf_data:t,type:"invoice"})}),K.on("update-po-preview",(e,t)=>{t&&(console.log("showing PDF version of: ",t),this.setState({pdf_data:t,type:"po"}))}),K.on("change-preview-window-language",(t,n)=>{e(W(n))}),K.on("change-preview-window-profile",(t,n)=>{e(Q(n))}),K.on("pfd-exported",(e,t)=>{Object(E.Notify)(t).onclick=(()=>{K.send("reveal-file",t.location)})})}componentWillUnmount(){K.removeAllListeners(["pfd-exported","update-quote-preview","update-invoice-preview","update-preview-window"])}updateConfigs(e){const{dispatch:t}=this.props;t(H({name:e.name,value:e.value}))}render(){console.log("current state: ",this.state);const{t:e,configs:t}=this.props;return this.state.pdf_data?p.a.createElement(X,null,p.a.createElement(q,{configs:t,pdf_data:this.state.pdf_data,updateConfigs:this.updateConfigs,t:e}),p.a.createElement(M,{pdf_data:this.state.pdf_data,configs:t,type:this.state.type,t:e})):p.a.createElement("h1",{style:{textAlign:"center",marginTop:"340px"}},"Loading...")}}Y.propTypes={configs:f.a.object.isRequired,dispatch:f.a.func.isRequired,t:f.a.func.isRequired},t.a=Object(_.compose)(Object(g.connect)(e=>({configs:Object(J.b)(e),pdf_data:e.pdf_data})))(Y)},,function(e){e.exports=require("react-color")},function(e){e.exports={Notify:({title:e,body:t})=>new Notification(e,{body:t})}},,,,function(e,t,n){"use strict";n.r(t),function(e){var t=n(0),l=n.n(t),a=n(22),r=n.n(a),o=n(32),c=(n.n(o),n(20)),i=(n.n(c),n(11)),s=(n.n(i),n(42)),u=n(46),d=n(65),p=n(44),m=n.n(p);n(35);const f=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||c.compose,E=Object(c.createStore)(u.a,f(Object(c.applyMiddleware)(m.a)));r.a.render(l.a.createElement(i.Provider,{store:E},l.a.createElement(o.AppContainer,null,l.a.createElement(s.a,null,l.a.createElement(d.a,null)))),document.getElementById("root")),e.hot&&e.hot.accept()}.call(this,n(41)(e))},function(e,t,n){n(36),e.exports=n(72)}]);