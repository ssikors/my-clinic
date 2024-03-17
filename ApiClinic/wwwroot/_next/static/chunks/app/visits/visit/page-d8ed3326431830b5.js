(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[729],{4482:function(e,t){"use strict";/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */t.parse=function(e,t){if("string"!=typeof e)throw TypeError("argument str must be a string");for(var o={},r=e.split(";"),n=(t||{}).decode||i,s=0;s<r.length;s++){var a=r[s],c=a.indexOf("=");if(!(c<0)){var l=a.substring(0,c).trim();if(void 0==o[l]){var d=a.substring(c+1,a.length).trim();'"'===d[0]&&(d=d.slice(1,-1)),o[l]=function(e,t){try{return t(e)}catch(t){return e}}(d,n)}}}return o},t.serialize=function(e,t,i){var n=i||{},s=n.encode||o;if("function"!=typeof s)throw TypeError("option encode is invalid");if(!r.test(e))throw TypeError("argument name is invalid");var a=s(t);if(a&&!r.test(a))throw TypeError("argument val is invalid");var c=e+"="+a;if(null!=n.maxAge){var l=n.maxAge-0;if(isNaN(l)||!isFinite(l))throw TypeError("option maxAge is invalid");c+="; Max-Age="+Math.floor(l)}if(n.domain){if(!r.test(n.domain))throw TypeError("option domain is invalid");c+="; Domain="+n.domain}if(n.path){if(!r.test(n.path))throw TypeError("option path is invalid");c+="; Path="+n.path}if(n.expires){if("function"!=typeof n.expires.toUTCString)throw TypeError("option expires is invalid");c+="; Expires="+n.expires.toUTCString()}if(n.httpOnly&&(c+="; HttpOnly"),n.secure&&(c+="; Secure"),n.sameSite)switch("string"==typeof n.sameSite?n.sameSite.toLowerCase():n.sameSite){case!0:case"strict":c+="; SameSite=Strict";break;case"lax":c+="; SameSite=Lax";break;case"none":c+="; SameSite=None";break;default:throw TypeError("option sameSite is invalid")}return c};var i=decodeURIComponent,o=encodeURIComponent,r=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/},7713:function(e,t,i){"use strict";var o=this&&this.__assign||function(){return(o=Object.assign||function(e){for(var t,i=1,o=arguments.length;i<o;i++)for(var r in t=arguments[i])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)},r=this&&this.__rest||function(e,t){var i={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&0>t.indexOf(o)&&(i[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,o=Object.getOwnPropertySymbols(e);r<o.length;r++)0>t.indexOf(o[r])&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(i[o[r]]=e[o[r]]);return i};Object.defineProperty(t,"__esModule",{value:!0}),t.hasCookie=t.deleteCookie=t.setCookie=t.getCookie=t.getCookies=void 0;var n=i(4482),s=function(){return"undefined"!=typeof window},a=function(e){return!!e&&"getAll"in e&&"set"in e&&"function"==typeof e.getAll&&"function"==typeof e.set},c=function(e){return!!(null==e?void 0:e.req)&&"cookies"in e.req&&a(null==e?void 0:e.req.cookies)||!!(null==e?void 0:e.res)&&"cookies"in e.res&&a(null==e?void 0:e.res.cookies)||!!(null==e?void 0:e.cookies)&&a(e.cookies())},l=function(e){var t={};return e.getAll().forEach(function(e){var i=e.name,o=e.value;t[i]=o}),t},d=function(e){void 0===e&&(e="");try{var t=JSON.stringify(e);return/^[\{\[]/.test(t)?t:e}catch(t){return e}};t.getCookies=function(e){if(c(e)){if(null==e?void 0:e.req)return l(e.req.cookies);if(null==e?void 0:e.cookies)return l(e.cookies())}if(e&&(t=e.req),!s())return t&&t.cookies?t.cookies:t&&t.headers.cookie?(0,n.parse)(t.headers.cookie):{};for(var t,i={},o=document.cookie?document.cookie.split("; "):[],r=0,a=o.length;r<a;r++){var d=o[r].split("="),u=d.slice(1).join("=");i[d[0]]=u}return i},t.getCookie=function(e,i){var o=(0,t.getCookies)(i)[e];if(void 0!==o)return o?o.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent):o},t.setCookie=function(e,t,i){if(c(i)){var a,l,u,f=i.req,p=i.res,h=i.cookies,m=r(i,["req","res","cookies"]),x=o({name:e,value:t},m);f&&f.cookies.set(x),p&&p.cookies.set(x),h&&h().set(x);return}if(i){var f=i.req,p=i.res,g=r(i,["req","res"]);l=f,u=p,a=g}var v=(0,n.serialize)(e,d(t),o({path:"/"},a));if(s())document.cookie=v;else if(u&&l){var k=u.getHeader("Set-Cookie");if(Array.isArray(k)||(k=k?[String(k)]:[]),u.setHeader("Set-Cookie",k.concat(v)),l&&l.cookies){var y=l.cookies;""===t?delete y[e]:y[e]=d(t)}if(l&&l.headers&&l.headers.cookie){var y=(0,n.parse)(l.headers.cookie);""===t?delete y[e]:y[e]=d(t),l.headers.cookie=Object.entries(y).reduce(function(e,t){return e.concat("".concat(t[0],"=").concat(t[1],";"))},"")}}},t.deleteCookie=function(e,i){return(0,t.setCookie)(e,"",o(o({},i),{maxAge:-1}))},t.hasCookie=function(e,i){return!!e&&(0,t.getCookies)(i).hasOwnProperty(e)}},4008:function(e,t,i){Promise.resolve().then(i.bind(i,8893))},6967:function(e,t,i){"use strict";i.r(t),i.d(t,{Wrapper:function(){return f}});var o=i(7437),r=i(7713),n=i(1396),s=i.n(n),a=i(2265),c=i(4033);let l=e=>{let{loggedIn:t,setLoggedIn:i}=e,[n,s]=(0,a.useState)(""),[l,d]=(0,a.useState)(""),[u,f]=(0,a.useState)(""),p=(0,c.useRouter)();return(0,a.useEffect)(()=>{(0,r.hasCookie)("jwttoken")&&i(!0)},[i]),(0,o.jsx)("div",{className:"flex flex-col gap-2 items-center",children:(0,o.jsx)("button",{onClick:()=>{(0,r.deleteCookie)("email"),(0,r.deleteCookie)("jwttoken"),(0,r.deleteCookie)("role"),i(!1),p.push("/log-in")},className:"py-1 flex rounded-md bg-red-600 justify-center text-lg text-white w-32",children:"Log out"})})},d=()=>{let[e,t]=(0,a.useState)(!1),[i,n]=(0,a.useState)("");return(0,a.useLayoutEffect)(()=>{(0,r.hasCookie)("email")&&t(!0),(0,r.hasCookie)("role")&&n((0,r.getCookie)("role"))},[]),(0,o.jsx)("header",{className:"fixed w-full left-0 top-0 h-16 bg-slate-100 px-4 shadow-md",children:(0,o.jsxs)("div",{className:"flex flex-row justify-between items-center w-full h-full",children:[(0,o.jsxs)("div",{className:"flex flex-row w-[80%] justify-start gap-6 items-center",children:[(0,o.jsx)(s(),{scroll:!1,href:"/",className:" text-gray-500",children:"Welcome to MyClinic!"}),(0,o.jsx)(s(),{scroll:!1,href:"/visits",children:"Appoint a visit"}),(0,o.jsx)(s(),{scroll:!1,href:"/".concat(i,"/visits"),children:"Your visits"}),"admin"==i?(0,o.jsx)(s(),{scroll:!1,href:"/admin",children:"Admin panel"}):""]}),e?(0,o.jsx)(l,{loggedIn:e,setLoggedIn:t}):""]})})},u=e=>{let{children:t,role:i}=e,[n,s]=(0,a.useState)(!0);return((0,a.useLayoutEffect)(()=>{(0,r.hasCookie)("email")||(0,c.redirect)("/log-in"),i&&(0,r.getCookie)("role")!=i&&(0,c.redirect)("/"),s(!1)},[n,s]),n)?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(d,{}),(0,o.jsx)("div",{className:"flex min-h-screen flex-col items-center justify-center p-24",children:"Loading..."})]}):(0,o.jsx)(o.Fragment,{children:t})},f=e=>{let{children:t,role:i}=e;return(0,o.jsxs)(u,{role:i,children:[(0,o.jsx)(d,{}),(0,o.jsx)("main",{className:"flex w-full min-h-screen flex-col items-center justify-start p-24",children:t})]})}},8893:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return c}});var o=i(7437),r=i(6967),n=i(7713),s=i(4033),a=i(2265);function c(){let[e,t]=(0,a.useState)(),[i,c]=(0,a.useState)();(0,a.useEffect)(()=>{u()},[]);let l=(0,s.useSearchParams)();async function d(){let o={description:i,id:null==e?void 0:e.id};console.log(o);let r=await fetch("/api/Visits/Description",{method:"POST",headers:{Authorization:"bearer "+(0,n.getCookie)("jwttoken"),Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(o)});r.ok&&t(await r.json())}async function u(){let e=await fetch("/api/Visits/Visit?visitId=".concat(l.get("visitId"),"&email=").concat((0,n.getCookie)("email")),{headers:{Authorization:"bearer "+(0,n.getCookie)("jwttoken")}});e.ok&&t(await e.json())}return(0,o.jsx)(r.Wrapper,{children:e?(0,o.jsxs)("div",{className:"flex flex-col items-center text-center",children:[(0,o.jsxs)("div",{className:"flex flex-col w-full bg-slate-100 rounded-md mb-8 shadow-md",children:[(0,o.jsx)("h1",{className:"text-xl w-full bg-cyan-600 bg-opacity-30",children:"Visit details:"}),(0,o.jsxs)("span",{className:" border-b-2 border-black p-2",children:["Date: ",new Date(e.visitDate).toDateString()]}),(0,o.jsxs)("span",{className:" border-b-2 border-black p-2",children:["Time:"," ",e.startTime.slice(0,-3)+" - "+e.endTime.slice(0,-3)]}),(0,o.jsxs)("span",{className:" border-b-2 border-black p-2",children:["Doctor:"," ",e.doctor.fullName+", "+e.doctor.specialization]}),e.patient?(0,o.jsxs)("span",{className:" p-2",children:["Patient: ",e.patient.fullName]}):""]}),(0,o.jsxs)("div",{className:"flex flex-col items-center w-fit bg-slate-100 rounded-md shadow-md",children:[(0,o.jsx)("h1",{className:"text-xl w-full bg-cyan-600 bg-opacity-30",children:"Visit description:"}),(0,o.jsx)("span",{className:"flex flex-col p-6 gap-3 items-center",children:"doctor"==(0,n.getCookie)("role")?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("p",{children:e.description}),(0,o.jsx)("textarea",{rows:12,cols:window.screen.width<800?18:50,value:i,placeholder:i,onChange:e=>{c(e.target.value)}}),(0,o.jsx)("button",{className:"text-white bg-cyan-500 w-fit p-2 rounded-sm bg-opacity-80 hover:bg-opacity-100",onClick:d,children:"Save changes"})]}):(0,o.jsx)("p",{children:e.description})})]})]}):"Loading..."})}},4033:function(e,t,i){e.exports=i(5313)}},function(e){e.O(0,[176,971,938,744],function(){return e(e.s=4008)}),_N_E=e.O()}]);