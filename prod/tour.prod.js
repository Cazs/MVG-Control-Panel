!function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=87)}({0:function(e){e.exports=require("react")},1:function(e){e.exports=require("prop-types")},14:function(e){e.exports=require("recompose")},15:function(e){e.exports=require("path")},16:function(e){e.exports=require("uuid/v4")},22:function(e){e.exports=require("react-dom")},24:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return e&&"object"==typeof e&&"default"in e?e.default:e}(r(0)),o=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},i=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},a=function(e){function t(){return o(this,t),i(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.render=function(){return n.Children.only(this.props.children)},t}(n.Component);t.AppContainer=a,t.hot=function(){return function(e){return e}},t.areComponentsEqual=function(e,t){return e===t},t.setConfig=function(){}},3:function(e){e.exports=require("styled-components")},32:function(e,t,r){"use strict";e.exports=r(24)},35:function(){if(document.addEventListener("dragover",e=>e.preventDefault()),document.addEventListener("drop",e=>e.preventDefault()),"linux"==process.platform||"win32"==process.platform){document.querySelectorAll("body,#root,.appWrapper").forEach(e=>{e.classList.add("non-draggable")})}},36:function(e,t,r){"use strict";e.exports=r(24)},41:function(e){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},6:function(e){e.exports=require("electron")},63:function(e,t,r){"use strict";function n(e){const{inverted:t,heading:r,description:n,imgSrc:o,imgSize:i,fromColor:a,toColor:l}=e;return c.a.createElement(x,{fromColor:a,toColor:l},c.a.createElement(v,{inverted:t},c.a.createElement(h,null,r),c.a.createElement(y,null,n)),c.a.createElement(b,{size:i,src:o}))}function o({currentSlide:e}){return c.a.createElement(q,null,1===e&&c.a.createElement(k,null),2===e&&c.a.createElement(C,null),3===e&&c.a.createElement(w,null),4===e&&c.a.createElement(E,null),5===e&&c.a.createElement(j,null))}function i({endTour:e,nextSlide:t,currentSlide:r,totalSlide:n}){const o=[];for(let e=0;e<n;e++)o.push(c.a.createElement(F,{key:$()(),active:e+1===r}));return c.a.createElement(P,null,c.a.createElement("div",null,r<n&&c.a.createElement(O.a,{link:!0,danger:!0,onClick:e},"Skip")),c.a.createElement("div",null,r===n?c.a.createElement(O.a,{success:!0,onClick:e},"Start"):o),c.a.createElement("div",null,r<n&&c.a.createElement(O.a,{primary:!0,onClick:t},"Next")))}var a=r(0),c=r.n(a),l=r(14),u=r(6),s=r(3),d=r.n(s),p=r(1),f=r.n(p),m=r(15),g=r.n(m);const x=d.a.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 40px;
  background: #f9fafa;
  ${e=>`\n    background: -webkit-linear-gradient(to bottom, ${e.fromColor}, ${e.toColor});\n    background: linear-gradient(to bottom, ${e.fromColor}, ${e.toColor});\n  `} > * {
    flex: 1;
  }
`,b=d.a.img`
  ${e=>e.size&&`\n    max-width: ${e.size};\n  `};
`,h=d.a.h1`
  margin-top: 30px;
  margin-bottom: 20px;
`,v=d.a.div`
  padding-top: 20px;
  text-align: center;
  ${e=>e.inverted&&"\n    color: white;\n  "};
`,y=d.a.p`
  max-width: 80%;
  margin: 0 auto 20px auto;
`;n.propTypes={description:f.a.string.isRequired,fromColor:f.a.string.isRequired,heading:f.a.string.isRequired,imgSize:f.a.string,imgSrc:f.a.string.isRequired,inverted:f.a.bool,toColor:f.a.string.isRequired},n.defaultProps={imgSize:"400px",inverted:!1};var S=n,E=function(){return c.a.createElement(S,{fromColor:"#FFD200",toColor:"#F7971E",heading:"Save",description:"Description",imgSrc:g.a.resolve(__dirname,"./imgs/Save.svg"),imgSize:"460px"})},C=function(){return c.a.createElement(S,{fromColor:"#85E5A9",toColor:"#26BB86",heading:"Slide Heading",description:"Slide Description",imgSrc:g.a.resolve(__dirname,"./imgs/Create.svg"),imgSize:"350px"})},k=function(){return c.a.createElement(S,{inverted:!0,fromColor:"#CAD2E8",toColor:"#6979A4",heading:"Welcome",description:"Insert Description Here",imgSrc:g.a.resolve(__dirname,"./imgs/Welcome.svg"),imgSize:"475px"})},w=function(){return c.a.createElement(S,{inverted:!0,fromColor:"#5691c8",toColor:"#457fca",heading:"Preview",description:"Preview Description",imgSrc:g.a.resolve(__dirname,"./imgs/Preview.svg"),imgSize:"520px"})},j=function(){return c.a.createElement(S,{fromColor:"#FFFFFF",toColor:"#ECE9E6",heading:"Slides Success",description:"Slides Description",imgSrc:g.a.resolve(__dirname,"./imgs/Success.svg"),imgSize:"425px"})};const q=d.a.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;o.propTypes={currentSlide:f.a.number.isRequired};var _=r(16),$=r.n(_),O=r(8);const P=d.a.div`
  flex: 1;
  max-height: 80px;
  background: #f9fafa;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  justify-content: space-around;
  display: flex;
  align-items: center;
  > * {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`,F=d.a.div`
  height: 6px;
  width: 6px;
  background: #c4c8cc;
  margin: 0 4px;
  border-radius: 10px;
  ${e=>e.active&&"\n    background: #c80000;\n  "};
`;i.propTypes={currentSlide:f.a.number.isRequired,endTour:f.a.func.isRequired,nextSlide:f.a.func.isRequired,totalSlide:f.a.number.isRequired};const T=d.a.div`
  display: flex;
  flex-direction: column;
  height: 100%;
}
`;t.a=Object(l.compose)()(class extends a.Component{constructor(e){super(e),this.state={currentSlide:1,totalSlide:5},this.nextSlide=this.nextSlide.bind(this),this.endTour=this.endTour.bind(this)}shouldComponentUpdate(e,t){return this.state!==t}nextSlide(){this.setState({currentSlide:this.state.currentSlide+1})}endTour(){this.setState({currentSlide:1},()=>{u.ipcRenderer.send("end-tour")})}render(){return c.a.createElement(T,null,c.a.createElement(o,{currentSlide:this.state.currentSlide}),c.a.createElement(i,{totalSlide:this.state.totalSlide,currentSlide:this.state.currentSlide,nextSlide:this.nextSlide,endTour:this.endTour}))}})},8:function(e,t,r){"use strict";function n(e){return e.link?i.a.createElement(d,e,e.children):i.a.createElement(s,e,e.children)}var o=r(0),i=r.n(o),a=r(1),c=r.n(a),l=r(3),u=r.n(l);const s=u.a.button`
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
`,d=u.a.button`
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
`;u.a.div`
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
`;n.propTypes={link:c.a.bool,danger:c.a.bool,onClick:c.a.func,primary:c.a.bool,success:c.a.bool},n.defaultProps={link:!1,primary:!1,success:!1,danger:!1},t.a=n},86:function(e,t,r){"use strict";r.r(t),function(e){var t=r(0),n=r.n(t),o=r(32),i=(r.n(o),r(22)),a=(r.n(i),r(63));r(35),Object(i.render)(n.a.createElement(o.AppContainer,null,n.a.createElement(a.a,null)),document.getElementById("root")),e.hot&&e.hot.accept()}.call(this,r(41)(e))},87:function(e,t,r){r(36),e.exports=r(86)}});