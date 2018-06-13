!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=70)}({0:function(e){e.exports=require("react")},1:function(e){e.exports=require("prop-types")},21:function(e){e.exports=require("react-dom")},22:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&"object"==typeof e&&"default"in e?e.default:e}(n(0)),o=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},i=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},a=function(e){function t(){return o(this,t),i(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.render=function(){return r.Children.only(this.props.children)},t}(r.Component);t.AppContainer=a,t.hot=function(){return function(e){return e}},t.areComponentsEqual=function(e,t){return e===t},t.setConfig=function(){}},3:function(e){e.exports=require("styled-components")},30:function(){if(document.addEventListener("dragover",e=>e.preventDefault()),document.addEventListener("drop",e=>e.preventDefault()),"linux"==process.platform||"win32"==process.platform){document.querySelectorAll("body,#root,.appWrapper").forEach(e=>{e.classList.add("non-draggable")})}},31:function(e,t,n){"use strict";e.exports=n(22)},69:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),i=n(21),a=n.n(i),s=(n(1),n(3)),l=n.n(s);const c=n(7).remote.require("electron-settings"),u=n(7).remote.BrowserWindow,p=n(7).ipcRenderer,d=u.fromId(c.get("mainWindowID")),f=l.a.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background: #f7f7f9;
`,h=l.a.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  padding-top: 10px;
  i {
    font-size: 42px;
  }
  ${e=>"warning"===e.type&&"\n    i { color: #f0ad4e; }\n  "} ${e=>"info"===e.type&&"\n    i { color: #0275d8; }\n  "};
`,m=(l.a.div``,l.a.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 2;
  width: 100%;
`),x=l.a.h4`
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0;
  ${e=>"warning"===e.type&&"\n    color: #f0ad4e;\n  "} ${e=>"info"===e.type&&"\n    color: #0275d8;\n  "};
`,y=l.a.p`
  color: #464a4c;
  text-align: center;
  padding: 0 40px;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
`,g=l.a.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: row;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 5px 0;
  ${e=>"warning"===e.type&&"\n    border-top: 4px solid #f0ad4e;\n  "} ${e=>"info"===e.type&&"\n    border-top: 4px solid #0275d8;\n  "} a {
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 5px 30px;
    border-radius: 4px;
    color: #464a4c;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 12px;
    margin: 0 5px;
    -moz-transition: all 0.1s ease-in;
    -o-transition: all 0.1s ease-in;
    -webkit-transition: all 0.1s ease-in;
    transition: all 0.1s ease-in;
    &:hover {
      text-decoration: none;
      background: rgb(2, 117, 216);
      color: white;
    }
  }
`;n(30),a.a.render(o.a.createElement(class extends r.PureComponent{constructor(e){super(e),this.state={},this.handleClick=this.handleClick.bind(this)}componentDidMount(){p.on("update-modal",(e,t,n,r)=>{this.setState({returnChannel:n,dialogOptions:t,rest:[r]})})}componentWillUnmount(){p.removeAllListeners("update-modal")}handleClick(e){const t=e.target.getAttribute("alt"),{rest:n,returnChannel:r}=this.state;""!==r&&d.send(r,parseInt(t),n),u.getFocusedWindow().close()}renderIconClass(){switch(this.state.type){case"info":return"ion-alert";case"warning":return"ion-alert-circled";default:return"ion-information-circled"}}rendersButtons(){return this.state.buttons?this.state.buttons.map((e,t)=>o.a.createElement("a",{href:"#",key:t,alt:t,onClick:this.handleClick},e)):o.a.createElement("a",{href:"#",onClick:this.handleClick},"Ok")}render(){const{type:e}=this.state;return void 0===e?null:o.a.createElement(f,null,o.a.createElement(h,{type:e},o.a.createElement("i",{className:this.renderIconClass()})),o.a.createElement(m,null,o.a.createElement(x,{type:e},this.state.title),o.a.createElement(y,null,this.state.message)),o.a.createElement(g,{type:e},this.rendersButtons()))}},null),document.getElementById("root"))},7:function(e){e.exports=require("electron")},70:function(e,t,n){n(31),e.exports=n(69)}});