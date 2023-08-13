/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(e){"use strict";function t(e){const t=e.search(/[?#]/);return t<0?e:e.slice(0,t)}function n(e,r){r=t(r?n(r):document.baseURI);return new URL(e,r).href}function r(){}function i(e,t){Object.keys(e).forEach(n=>t(n,e[n]))}function s(e){setTimeout(e,0)}function o(e){Promise.resolve().then(e)}const a=[];function u(e,t){a.push({level:e,message:t})}let l={debug:u.bind(this,"debug"),info:u.bind(this,"info"),warning:u.bind(this,"warning"),error:u.bind(this,"error"),isLoggable:r};let f=r;let c;let d;let g=s;const h=true;let p=false;let m=false;let b=0;const y="./";let w;let x;const v=Object.create(null);v[""]={url:y,absoluteUrl:n(y)};const E=Object.create(null);const $=Object.create(null);const j=Object.create(null);let A=false;let L;const q=Object.create(null);let I=null;const O=[];let D="";let M=0;const T=-1;let U=T;let R=Date.now()+U;let k;let _;function P(){if(k==null){R=Date.now()+U}}function S(e){e=Number(e);const t=R-U;U=e>=-1?e:T;if(k==null){R=t+U}}function C(){if(k==null){k=new Promise(function(e){if(_==null){_=new MessageChannel;_.port2.start()}_.port2.addEventListener("message",function(){setTimeout(function(){k=null;R=Date.now()+U;e()},0)},{once:true});_.port1.postMessage(null)})}return k}function N(e){if(U<0){return e}return function(){if(k==null){e.call(undefined,arguments[0]);if(Date.now()>=R){C()}return}k.then(N(e).bind(undefined,arguments[0]))}}function W(e){if(!/\.js$/.test(e)){return undefined}e=e.slice(0,-3);if(/^jquery\.sap\./.test(e)){return e}return e.replace(/\//g,".")}function J(e){const t=e.lastIndexOf("/");const n=e.lastIndexOf(".");if(n>t){return{id:e.slice(0,n),type:e.slice(n)}}return{id:e,type:""}}const F=/(\.controller|\.fragment|\.view|\.designtime|\.support)?.js$/;function G(e){const t=F.exec(e);if(t){return{baseID:e.slice(0,t.index),subType:t[0]}}}const X=/(?:^|\/)\.+(?=\/|$)/;const B=/^\.*$/;function H(e,t){const n=e.search(X);if(n<0){return e}if(n===0){if(t==null){throw new Error("relative name not supported ('"+e+"'")}e=t.slice(0,t.lastIndexOf("/")+1)+e}const r=e.split("/");let i=0;const s=r.length;for(let t=0;t<s;t++){const n=r[t];if(B.test(n)){if(n==="."||n===""){continue}else if(n===".."){if(i===0){throw new Error("Can't navigate to parent of root ('"+e+"')")}i--}else{throw new Error("Illegal path segment '"+n+"' ('"+e+"')")}}else{r[i++]=n}}r.length=i;return r.join("/")}function Y(e,r){e=String(e||"");if(r==null){if(e){if(v[e]){delete v[e];l.info(`registerResourcePath ('${e}') (registration removed)`)}return}r=y;l.info(`registerResourcePath ('${e}') (default registration restored)`)}r=t(String(r));if(r.slice(-1)!=="/"){r+="/"}v[e]={url:r,absoluteUrl:n(r)}}function z(e,t){let n=e;let r=e.length;while(r>0&&!v[n]){r=n.lastIndexOf("/");n=r>0?n.slice(0,r):""}f((r>0||n==="")&&v[n],"there always must be a mapping");let i=v[n].url+e.slice(r+1);if(i.slice(-1)==="/"){i=i.slice(0,-1)}return i+(t||"")}function K(){return b}function Q(e,r){e=t(n(e));for(const t in v){const n=v[t].absoluteUrl.slice(0,-1);if(e.startsWith(n)){let i=t+e.slice(n.length);if(i.charAt(0)==="/"){i=i.slice(1)}if(!r||q[i]?.data!=undefined){return i}}}}function V(e){let t,n;if(e!=null){e=J(e).id;t=e.length;n=E[e];while(t>0&&n==null){t=e.lastIndexOf("/");if(t>0){e=e.slice(0,t);n=E[e]}}}return n||E["*"]}function Z(e,t){const n=V(t);e=H(e,t);if(n!=null){let t=J(e).id;let r=t.length;while(r>0&&n[t]==null){r=t.lastIndexOf("/");t=r>0?t.slice(0,r):""}if(r>0){const i=n[t]+e.slice(r);if(l.isLoggable()){l.debug(`module ID ${e} mapped to ${i}`)}return i}}return e}function ee(e,t,n,r){for(let i=0;e&&i<n;i++){if(!e[t[i]]&&r){e[t[i]]={}}e=e[t[i]]}return e}function te(t){const n=t?t.split("."):[];if(b&&n.length>1){l.error("[nosync] getGlobalProperty called to retrieve global name '"+t+"'")}return ee(e,n,n.length)}function ne(t,n){const r=t?t.split("."):[];if(r.length>0){const t=ee(e,r,r.length-1,true);t[r[r.length-1]]=n}}function re(e){return{moduleExport:e}}function ie(e){return e.moduleExport}const se=0,oe=-1,ae=1,ue=2,le=3,fe=4,ce=5,de={};class ge{constructor(e){this.name=e;this.state=se;this.settled=false;this.url=this._deferred=this.data=this.group=this.error=this.pending=null;this.content=de}deferred(){if(this._deferred==null){const e=this._deferred={};e.promise=new Promise(function(t,n){e.resolve=t;e.reject=n});e.promise.catch(r)}return this._deferred}api(){this._api??={id:this.name.slice(0,-3),exports:this._exports={},url:this.url,config:r};return this._api}ready(e){f(!this.settled,`Module ${this.name} is already settled`);this.state=fe;this.settled=true;if(arguments.length>0){this.content=e}this.deferred().resolve(re(this.value()));if(this.aliases){e=this.value();this.aliases.forEach(t=>ge.get(t).ready(e))}}failWith(e,t){const n=we(e,this,t);this.fail(n);return n}fail(e){f(!this.settled,`Module ${this.name} is already settled`);this.settled=true;if(this.state!==ce){this.state=ce;this.error=e;this.deferred().reject(e);this.aliases?.forEach(t=>ge.get(t).fail(e))}}addPending(e){(this.pending??=[]).push(e)}addAlias(e){(this.aliases??=[]).push(e);ge.get(e).addPending(this.name)}preload(e,t,n){if(this.state===se&&!L?.(this.name)){this.state=oe;this.url=e;this.data=t;this.group=n}return this}value(){if(this.state===fe){if(this.content===de){const e=$[this.name],t=e&&(Array.isArray(e.exports)?e.exports[0]:e.exports);this.content=te(t||W(this.name))}return this.content}return undefined}dependsOn(e){const t=e.name,n=Object.create(null);function r(e){if(!n[e]){n[e]=true;const i=q[e]?.pending;return Array.isArray(i)&&(i.indexOf(t)>=0||i.some(r))}return false}return this.name===t||r(this.name)}static get(e){const t=q[e]??=new ge(e);return t}}function he(){if(O.length>0){return O[O.length-1].name}return document.currentScript?.getAttribute("data-sap-ui-module")}let pe,me;function be(e){if(pe===e){return}if(pe){pe.amd=me;pe=me=undefined}pe=e;if(e&&!e.ui5){me=pe.amd;Object.defineProperty(pe,"amd",{get:function(){const e=he();if(e&&$[e]?.amd){l.debug(`suppressing define.amd for ${e}`);return undefined}return me},set:function(e){me=e;l.debug(`define.amd became ${e?"active":"unset"}`)},configurable:true})}}try{Object.defineProperty(e,"define",{get:function(){return pe},set:function(e){be(e);l.debug(`define became ${e?"active":"unset"}`)},configurable:true})}catch(e){l.warning("could not intercept changes to window.define, ui5loader won't be able to a change of the AMD loader")}be(e.define);function ye(e){return e?.name==="ModuleError"}function we(e,t,n){let r=`'${t.name}'`;if(ye(n)){r+=`\n -> ${n._modules.replace(/ -> /g,"  -> ")}`;if(e===n._template){n=n.cause}}const i=e.replace(/\{id\}/,r).replace(/\{url\}/,t.url)+(n?": "+n.message:"");const s=new Error(i);s.name="ModuleError";s.cause=n;if(n?.stack){s.stack=s.stack+"\nCaused by: "+n.stack}s._template=e;s._modules=r;return s}function xe(e){f(/\.js$/.test(e),"must be a Javascript module");const t=ge.get(e);if(t.state>se){return t}if(l.isLoggable()){l.debug(`${D}declare module '${e}'`)}t.state=fe;return t}function ve(e,t){ge.get(e).ready(t)}function Ee(e){let t=[],n=0,r;this.push=function(i,s,o,a){if(l.isLoggable()){l.debug(D+"pushing define() call"+(document.currentScript?" from "+document.currentScript.src:"")+" to define queue #"+n)}const u=document.currentScript?.getAttribute("data-sap-ui-module");t.push({name:i,deps:s,factory:o,_export:a,guess:u});if(!r&&!e&&u==null){r=setTimeout(this.process.bind(this,null,"timer"))}};this.clear=function(){t=[];if(r){clearTimeout(r);r=null}};this.process=function(e,r){const i=l.isLoggable();const s=t;const o=n++;let a=null;this.clear();if(e?.execError){if(i){l.debug(`module execution error detected, ignoring queued define calls (${s.length})`)}e.fail(e.execError);return}a=e?.name;s.forEach(t=>{if(t.name==null){if(a!=null){t.name=a;a=null}else{if(h){const t=new Error("Modules that use an anonymous define() call must be loaded with a require() call; "+"they must not be executed via script tag or nested into other modules. ");if(e){e.fail(t)}else{throw t}}t.name=`~anonymous~${++M}.js`;l.error("Modules that use an anonymous define() call must be loaded with a require() call; "+"they must not be executed via script tag or nested into other modules. "+"All other usages will fail in future releases or when standard AMD loaders are used. "+"Now using substitute name "+t.name)}}else if(e&&t.name===e.name){if(a==null&&!h){l.error("Duplicate module definition: both, an unnamed module and a module with the expected name exist."+"This use case will fail in future releases or when standard AMD loaders are used. ")}a=null}});if(a&&s.length>0){if(i){l.debug("No queued module definition matches the ID of the request. "+`Now assuming that the first definition '${s[0].name}' is an alias of '${a}'`)}ge.get(s[0].name).addAlias(a);a=null}if(i){l.debug(D+"["+r+"] "+"processing define queue #"+o+(e?" for '"+e.name+"'":"")+` with entries [${s.map(e=>`'${e.name}'`)}]`)}s.forEach(e=>{De(e.name,e.deps,e.factory,e._export,true)});if(a!=null&&!e.settled){if(i){l.debug(D+"no queued module definition for the requested module found, assume the module to be ready")}e.data=undefined;e.ready()}if(i){l.debug(D+`processing define queue #${o} done`)}}}let $e=new Ee;function je(e){const t=new XMLHttpRequest;function n(e){e=new Error(t.statusText?t.status+" - "+t.statusText:t.status);e.name="XHRLoadError";e.status=t.status;e.statusText=t.statusText;return e}t.addEventListener("load",function(r){if(t.status===200||t.status===0){e.state=ue;e.data=t.responseText}else{e.error=n()}});t.addEventListener("error",function(t){e.error=n()});t.open("GET",e.url,false);try{t.send()}catch(t){e.error=t}}window.addEventListener("error",function e(t){var n=document.currentScript?.getAttribute("data-sap-ui-module");var r=n&&ge.get(n);if(r&&r.execError==null){if(l.isLoggable()){l.debug(`unhandled exception occurred while executing ${n}: ${t.message}`)}r.execError=t.error||{name:"Error",message:t.message};return false}});function Ae(e,t){const n=document.createElement("SCRIPT");n["s"+"rc"]=e.url;n.setAttribute("data-sap-ui-module",e.name);function r(t){P();if(l.isLoggable()){l.debug(`JavaScript resource loaded: ${e.name}`)}n.removeEventListener("load",r);n.removeEventListener("error",i);$e.process(e,"onload")}function i(s){P();n.removeEventListener("load",r);n.removeEventListener("error",i);if(t){l.warning(`retry loading JavaScript resource: ${e.name}`);n?.parentNode?.removeChild(n);e.url=t;Ae(e,null);return}l.error(`failed to load JavaScript resource: ${e.name}`);e.failWith("failed to load {id} from {url}",new Error("script load error"))}if(t!==undefined){if($[e.name]?.amd){n.setAttribute("data-sap-ui-module-amd","true")}n.addEventListener("load",r);n.addEventListener("error",i)}document.head.appendChild(n)}function Le(e){const t=j[e];if(Array.isArray(t)){l.debug(`preload dependencies for ${e}: ${t}`);t.forEach(t=>{t=Z(t,e);if(/\.js$/.test(t)){qe(null,t,true)}})}}function qe(e,t,n,i,s){const o=G(t);if(!o){throw new Error(`can only require Javascript module, not ${t}`)}if(t[0]=="/"){l.error("Module names that start with a slash should not be used, as they are reserved for future use.")}const a=l.isLoggable();const u=ge.get(t);const f=$[t];if(f?.deps&&!i){if(a){l.debug("require dependencies of raw module "+t)}return Oe(u,f.deps,function(){return qe(e,t,n,true,s)},function(e){throw u.failWith("Failed to resolve dependencies of {id}",e)},n)}if(u.state===se&&u.group&&u.group!==t&&!s){if(a){l.debug(`${D}require bundle '${u.group}' containing '${t}'`)}if(n){return qe(null,u.group,n).catch(r).then(function(){return qe(e,t,n,i,true)})}else{try{qe(null,u.group,n)}catch(e){if(a){l.error(D+"require bundle '"+u.group+"' failed (ignored)")}}}}if(a){l.debug(D+"require '"+t+"'"+(e?" (dependency of '"+e.name+"')":""))}if(u.state!==se){let r=false;if(u.state===le&&u.data!=null&&!n&&u.async){u.state=oe;u.async=n;u.pending=null}if(u.state===oe){u.state=ue;u.async=n;r=true;c&&c.start(t,"Require module "+t+" (preloaded)",["require"]);Ie(t,n);c&&c.end(t)}if(u.state===fe){if(!r&&a){l.debug(D+"module '"+t+"' has already been loaded (skipped).")}return n?Promise.resolve(re(u.value())):re(u.value())}else if(u.state===ce){if(n){return u.deferred().promise}else{throw u.error}}else{if(n){if(e&&u.dependsOn(e)){if(l.isLoggable()){l.debug("cycle detected between '"+e.name+"' and '"+t+"', returning undefined for '"+t+"'")}return Promise.resolve(re(undefined))}return u.deferred().promise}if(!n&&!u.async){if(l.isLoggable()){l.debug("cycle detected between '"+(e?e.name:"unknown")+"' and '"+t+"', returning undefined for '"+t+"'")}return re(undefined)}l.warning("Sync request triggered for '"+t+"' while async request was already pending."+" Loading a module twice might cause issues and should be avoided by fully migrating to async APIs.")}}c&&c.start(t,"Require module "+t,["require"]);u.state=ae;u.async=n;const d=A?["-dbg",""]:[""];if(!n){for(let e=0;e<d.length&&u.state!==ue;e++){u.url=z(o.baseID,d[e]+o.subType);if(a){l.debug(D+"loading "+(d[e]?d[e]+" version of ":"")+"'"+t+"' from '"+u.url+"' (using sync XHR)")}if(b){const e="[nosync] loading module '"+u.url+"'";if(b===1){l.error(e)}else{throw new Error(e)}}_e.load({completeLoad:r,async:false},u.url,o.baseID);je(u)}if(u.state===ae){u.failWith("failed to load {id} from {url}",u.error)}else if(u.state===ue){Ie(t,n)}c&&c.end(t);if(u.state!==fe){throw u.error}return re(u.value())}else{u.url=z(o.baseID,d[0]+o.subType);const e=A?z(o.baseID,d[1]+o.subType):u.url;if(l.isLoggable()){l.debug(D+"loading '"+t+"' from '"+u.url+"' (using <script>)")}_e.load({completeLoad:r,async:true},e,o.baseID);Ae(u,e);Le(t);return u.deferred().promise}}function Ie(t,r){const i=q[t];if(i&&i.state===ue&&typeof i.data!=="undefined"){const s=l.isLoggable();const o=I;const a=$e;let u,f;try{I=!r;$e=new Ee(true);if(s){if(typeof i.data==="string"){l.warning(D+"executing '"+t+"' (using eval)")}else{l.debug(D+"executing '"+t+"'")}u=D;D=D+": "}i.state=le;O.push({name:t,used:false});if(typeof i.data==="function"){i.data.call(e)}else if(Array.isArray(i.data)){Me.apply(null,i.data)}else{f=i.data;if(f){const e=/\/\/[#@] source(Mapping)?URL=(.*)$/.exec(f);if(e&&e[1]&&/^[^/]+\.js\.map$/.test(e[2])){f=f.slice(0,e.index)+e[0].slice(0,-e[2].length)+n(e[2],i.url)}if(!e||e[1]){f+="\n//# sourceURL="+n(i.url)+"?eval"}}if(typeof d==="function"){f=d(f,t)}e.eval(f)}$e.process(i,"after eval")}catch(e){i.data=undefined;if(ye(e)){i.fail(e)}else{if(e instanceof SyntaxError&&f){if(L){i.url=URL.createObjectURL(new Blob([f],{type:"text/javascript"}));Ae(i)}else{l.error("A syntax error occurred while evaluating '"+t+"'"+", restarting the app with sap-ui-debug=x might reveal the error location")}}i.failWith("Failed to execute {id}",e)}}finally{O.pop();if(s){D=u;l.debug(D+"finished executing '"+t+"'")}$e=a;I=o}}}function Oe(e,t,n,r,i){const s=[];let o,a;try{if(e instanceof ge){o=e.name}else{o=e;e=null}t=t.slice();for(let e=0;e<t.length;e++){t[e]=Z(t[e]+".js",o)}if(e){t.forEach(t=>{if(!/^(require|exports|module)\.js$/.test(t)){e.addPending(t)}})}for(let n=0;n<t.length;n++){const r=t[n];if(e){switch(r){case"require.js":s[n]=re(Ue(o,true));break;case"module.js":s[n]=re(e.api());break;case"exports.js":e.api();s[n]=re(e._exports);break;default:break}}if(!s[n]){s[n]=qe(e,r,i)}}}catch(e){a=e}if(i){const e=a?Promise.reject(a):Promise.all(s);return e.then(n,r)}else{if(a){r(a)}else{return n(s)}}}function De(t,n,r,i,s){const o=l.isLoggable();t=H(t);if(o){l.debug(D+"define('"+t+"', "+"['"+n.join("','")+"']"+")")}const a=xe(t);let u=false;function f(){if(a.settled){if(a.state>=fe&&s&&a.async===false){l.warning("Repeated module execution skipped after async/sync conflict for "+a.name);return true}if(h&&s){l.warning("Module '"+a.name+"' has been defined more than once. "+"All but the first definition will be ignored, don't try to define the same module again.");return true}if(!u){l.error("Module '"+a.name+"' is executed more than once. "+"This is an unsupported scenario and will fail in future versions of UI5 or "+"when a standard AMD loader is used. Don't define the same module again.");u=true}}}if(f()){return}a.content=undefined;function c(n){if(f()){return}if(o){l.debug(D+"define('"+t+"'): dependencies resolved, calling factory "+typeof r)}if(i&&b!==2){const n=t.split("/");if(n.length>1){ee(e,n,n.length-1,true)}}if(typeof r==="function"){try{n=n.map(ie);let t=r.apply(e,n);if(a._api?.exports!==undefined&&a._api.exports!==a._exports){t=a._api.exports}else if(t===undefined&&a._exports){t=a._exports}a.content=t}catch(e){const t=a.failWith("failed to execute module factory for '{id}'",e);if(s){return}throw t}}else{a.content=r}if(i&&b!==2){if(a.content==null){l.error(`Module '${t}' returned no content, but should export to global?`)}else{if(o){l.debug(`exporting content of '${t}': as global object`)}const e=W(t);ne(e,a.content)}}a.ready()}Oe(a,n,s&&a.data?N(c):c,function(e){const t=a.failWith("Failed to resolve dependencies of {id}",e);if(!s){throw t}},s)}function Me(e,t,n,r){let i;if(typeof e==="string"){i=e+".js"}else{r=n;n=t;t=e;i=null}if(!Array.isArray(t)){r=n;n=t;if(typeof n==="function"&&n.length>0){t=["require","exports","module"].slice(0,n.length)}else{t=[]}}if(I===false||I==null&&p){$e.push(i,t,n,r);if(i!=null){const e=ge.get(i);if(e.state===se){e.state=le;e.async=true}}return}const s=O.length>0?O[O.length-1]:null;if(!i){if(s&&!s.used){i=s.name;s.used=true}else{i=`~anonymous~${++M}.js`;if(s){i=s.name.slice(0,s.name.lastIndexOf("/")+1)+i}l.error("Modules that use an anonymous define() call must be loaded with a require() call; "+"they must not be executed via script tag or nested into other modules. "+"All other usages will fail in future releases or when standard AMD loaders are used "+"or when ui5loader runs in async mode. Now using substitute name "+i)}}else if(s?.used&&i!==s.name){l.debug(`module names don't match: requested: ${e}, defined: ${s.name}`);ge.get(s.name).addAlias(e)}De(i,t,n,r,false)}function Te(e,t,n){let r=arguments;const i=typeof r[r.length-1]==="boolean";if(i){r=Array.prototype.slice.call(r,0,r.length-1)}Me.apply(this,r)}Te.amd={};Te.ui5={};function Ue(t,n){const r=function(r,i,s){f(typeof r==="string"||Array.isArray(r),"dependency param either must be a single string or an array of strings");f(i==null||typeof i==="function","callback must be a function or null/undefined");f(s==null||typeof s==="function","error callback must be a function or null/undefined");if(typeof r==="string"){const e=Z(r+".js",t);const i=ge.get(e);if(n&&i.state!==le&&i.state!==fe){throw new Error("Module '"+e+"' has not been loaded yet. "+"Use require(['"+e+"']) to load it.")}return i.value()}Oe(t,r,function(t){t=t.map(ie);if(typeof i==="function"){if(p){i.apply(e,t)}else{g(function(){i.apply(e,t)})}}},function(t){if(typeof s==="function"){if(p){s.call(e,t)}else{g(function(){s.call(e,t)})}}else{throw t}},p)};r.toUrl=function(e){const n=Re(Z(e,t),e);return ke(n)};return r}function Re(e,t){if(t.slice(-1)==="/"&&e.slice(-1)!=="/"){return e+"/"}return e}function ke(e){if(e.indexOf("/")===0){throw new Error(`The provided argument '${e}' may not start with a slash`)}return Re(z(e),e)}const _e=Ue(null,false);const Pe=Ue(null,true);function Se(e){e=Z(e+".js");if(l.isLoggable()){l.warning(`sync require of '${e}'`)}return ie(qe(null,e,false))}function Ce(e,t,n,r){if(typeof e!=="string"){throw new Error("predefine requires a module name")}e=H(e);ge.get(e+".js").preload("<unknown>/"+e,[e,t,n,r],null)}function Ne(e,t,n){t=t||null;n=n||"<unknown>";for(let r in e){r=H(r);ge.get(r).preload(n+"/"+r,e[r],t)}}function We(e){const t=[oe,se,ue,fe,ce,le,ae];const n={[oe]:"PRELOADED",[se]:"INITIAL",[ae]:"LOADING",[ue]:"LOADED",[le]:"EXECUTING",[fe]:"READY",[ce]:"FAILED"};if(e==null){e=oe}const r=l.isLoggable("INFO")?l.info.bind(l):console.info.bind(console);const i=Object.keys(q).sort();t.forEach(t=>{if(t<e){return}let s=0;r(n[t]+":");i.forEach((e,i)=>{const o=q[e];if(o.state===t){let t;if(o.state===ae){const e=o.pending?.reduce((e,t)=>{const r=ge.get(t);if(r.state!==fe){e.push(t+"("+n[r.state]+")")}return e},[]);if(e?.length>0){t="waiting for "+e.join(", ")}}else if(o.state===ce){t=(o.error.name||"Error")+": "+o.error.message}r("  "+(i+1)+" "+e+(t?" ("+t+")":""));s++}});if(s===0){r("  none")}})}function Je(){const e=Object.create(null);i(v,function(t,n){e[t]=n.url});return e}function Fe(e,t,n,r){const i=[];if(t==null){t=true}if(t){for(const t in q){const n=q[t];if(n&&n.group===e){i.push(t)}}}else{if(q[e]){i.push(e)}}i.forEach(e=>{const t=q[e];if(t&&r&&e.match(/\.js$/)){ne(W(e),undefined)}if(t&&(n||t.state===oe)){delete q[e]}})}function Ge(e,t){if(e){e=Z(e)}else{e=Q(t,true)}const n=e&&q[e];if(n){n.state=ue;return n.data}else{return undefined}}function Xe(){const e=Object.create(null);i(q,function(t,n){e[t]={state:n.state,ui5:W(t)}});return e}function Be(e,t){e=Z(e);const n=qe(null,e,true).then(ie);return t?n.catch(r):n}const He={baseUrl(e){Y("",e)},paths:Y,shim(e,t){if(Array.isArray(t)){t={deps:t}}$[e+".js"]=t},amd(t){t=!!t;if(m!==t){m=t;if(t){w=e.define;x=e.require;e.define=Te;e.require=Pe;p=true}else{e.define=w;e.require=x}}},async(e){if(p&&!e){throw new Error("Changing the ui5loader config from async to sync is not supported. Only a change from sync to async is allowed.")}p=!!e},bundles(e,t){e+=".js";t.forEach(t=>{ge.get(t+".js").group=e})},bundlesUI5(e,t){t.forEach(t=>{ge.get(t).group=e})},debugSources(e){A=!!e},depCache(e,t){j[e+".js"]=t.map(e=>e+".js")},depCacheUI5(e,t){j[e]=t},ignoreBundledResources(e){if(e==null||typeof e==="function"){L=e}},map(e,t){if(t==null){delete E[e]}else if(typeof t==="string"){E["*"][e]=t}else{E[e]||=Object.create(null);i(t,function(t,n){E[e][t]=n})}},reportSyncCalls(e){if(e===0||e===1||e===2){b=e}},noConflict(e){l.warning("Config option 'noConflict' has been deprecated, use option 'amd' instead, if still needed.");He.amd(!e)}};const Ye={baseUrl:He.baseUrl,paths(e,t){Y(e,n(t,z("")+"/"))},map:He.map,shim:He.shim};function ze(e,t){function n(e,n){const r=t[e];if(typeof r==="function"){if(r.length===1){r(n)}else if(n!=null){i(n,r)}}else{l.warning(`configuration option ${e} not supported (ignored)`)}}if(e.baseUrl){n("baseUrl",e.baseUrl)}i(e,function(e,t){if(e!=="baseUrl"){n(e,t)}})}function Ke(e){if(e===undefined){return{amd:m,async:p,noConflict:!m}}ze(e,He)}function Qe(e){if(e===undefined){return undefined}ze(e,Ye)}_e.preload=Ne;_e.load=function(e,t,n){};const Ve={get assert(){return f},set assert(e){f=e},get logger(){return l},set logger(e){l=e;a.forEach(({level:e,message:t})=>l[e](t))},get measure(){return c},set measure(e){c=e},get translate(){return d},set translate(e){d=e},get callbackInMicroTask(){return g===o},set callbackInMicroTask(e){g=e?o:s},get maxTaskDuration(){return U},set maxTaskDuration(e){S(e)},amdDefine:Te,amdRequire:Pe,config:Ke,declareModule(e){xe(H(e))},defineModuleSync:ve,dump:We,getAllModules:Xe,getModuleContent:Ge,getModuleState(e){return q[e]?q[e].state:se},getResourcePath:z,getSyncCallBehavior:K,getUrlPrefixes:Je,loadJSResourceAsync:Be,resolveURL:n,guessResourceName:Q,toUrl:ke,unloadResources:Fe};e.sap=e.sap||{};sap.ui=sap.ui||{};sap.ui.loader={config:Ke,_:Ve};Pe.config=Qe;sap.ui.define=Me;sap.ui.predefine=Ce;sap.ui.require=_e;sap.ui.requireSync=Se})(globalThis);
//# sourceMappingURL=ui5loader.js.map