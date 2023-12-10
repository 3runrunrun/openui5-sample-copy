/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/base/Log","sap/base/util/uid","sap/base/strings/escapeRegExp"],function(jQuery,e,t,r){"use strict";(function(i){var n="_skip",a=/\|id-[0-9]+-[0-9]+/,o=new RegExp(n+"[0-9]*$"),s=[],f=[],u={},h=0,l,c="|",p=[],y=false,d,g=false;jQuery.sap.history=function(e){if(!jQuery.isPlainObject(e)){return}if(!g){var t=jQuery(i),r=i.location.href.split("#")[1]||"";t.on("hashchange",k);if(Array.isArray(e.routes)){var n,a;for(n=0;n<e.routes.length;n++){a=e.routes[n];if(a.path&&a.handler){jQuery.sap.history.addRoute(a.path,a.handler)}}}if(typeof e.defaultHandler==="function"){d=e.defaultHandler}f.push(r);if(r.length>1){t.trigger("hashchange",[true])}else{l=r}g=true}};jQuery.sap.history.addHistory=function(e,t,r,n){var a,o;if(r===undefined){r=true}if(!n){o=O(e,t);a=T(o);if(a){o+=c+a}o+=c+(r?"1":"0")}else{o=x(l)}p.push(o);u[o]=true;i.location.hash=o;return o};jQuery.sap.history.addVirtualHistory=function(){jQuery.sap.history.addHistory("",undefined,false,true)};jQuery.sap.history.addRoute=function(e,t,r){if(r){t=jQuery.proxy(t,r)}var i={};i.sIdentifier=e;i["action"]=t;s.push(i);return this};jQuery.sap.history.setDefaultHandler=function(e){d=e};jQuery.sap.history.getDefaultHandler=function(){return d};jQuery.sap.history.backToHash=function(t){t=t||"";var r;if(f.length===1){if(typeof d==="function"){d()}}else{r=v(l,t);if(r<0){i.history.go(r)}else{e.error("jQuery.sap.history.backToHash: "+t+"is not in the history stack or it's after the current hash")}}};jQuery.sap.history.backThroughPath=function(t){t=t||"";t=i.encodeURIComponent(t);var r;if(f.length===1){if(typeof d==="function"){d()}}else{r=v(l,t,true);if(r<0){i.history.go(r)}else{e.error("jQuery.sap.history.backThroughPath: there's no history state which has the "+t+" identifier in the history stack before the current hash")}}};jQuery.sap.history.back=function(e){if(f.length===1){if(typeof d==="function"){d(jQuery.sap.history.NavType.Back)}}else{if(!e){e=1}i.history.go(-1*e)}};jQuery.sap.history.NavType={Back:"_back",Forward:"_forward",Bookmark:"_bookmark",Unknown:"_unknown"};function v(e,t,r){var i=f.indexOf(e),n,a,o;if(i>0){if(r){for(a=i-1;a>=0;a--){o=f[a];if(o.indexOf(t)===0&&!I(o)){return a-i}}}else{n=f.indexOf(t);if(n===-1&&t.length===0){return-1*i}if(n>-1&&n<i){return n-i}}}return 0}function k(e,t){var r=i.location.href.split("#")[1]||"";r=b(r);if(t||!u[r]){p.push(r)}if(!y){y=true;if(p.length>0){var n=p.shift();if(u[n]){m(n);delete u[n]}else{H(n)}l=n}y=false}}function b(e,t){var r=e,i=e?e.indexOf("#"):-1;if(i===0){r=r.slice(i+1)}if(t){r=r.replace(a,"")}return r}function x(e){var t=e?e:"";if(I(t)){var r=t.lastIndexOf(n);t=t.slice(0,r)}return t+n+h++}function O(e,t){var r=encodeURIComponent(e);var i=encodeURIComponent(JSON.stringify(t));return r+c+i}function T(e){var r=f.indexOf(l),i,n;if(r>-1){for(i=0;i<r+1;i++){n=f[i];if(n.slice(0,n.length-2)===e){return t()}}}return""}function m(e){var t=f.indexOf(l);if(!(t===-1||t===f.length-1)){f.splice(t+1,f.length-1-t)}f.push(e)}function I(e){return o.test(e)}function B(e,t){var r=f.indexOf(e),i;if(r!==-1){if(t){for(i=r;i<f.length;i++){if(!I(f[i])){return i-r}}}else{for(i=r;i>=0;i--){if(!I(f[i])){return i-r}}return-1*(r+1)}}}function H(t){var a,o,s,u,h;if(l===undefined){s=R(t);if(!s||!s.bBookmarkable){if(typeof d==="function"){d(jQuery.sap.history.NavType.Bookmark)}return}}if(t.length===0){if(typeof d==="function"){d(jQuery.sap.history.NavType.Back)}}else{u=f.indexOf(t);if(u===0){s=R(t);if(!s||!s.bBookmarkable){if(typeof d==="function"){d(jQuery.sap.history.NavType.Back)}return}}if(I(t)){if(I(l)){o=B(t,false);i.history.go(o)}else{var c=new RegExp(r(l+n)+"[0-9]*$");if(c.test(t)){o=B(t,true);if(o){i.history.go(o)}else{i.history.back()}}else{o=B(t,false);i.history.go(o)}}}else{if(u===-1){h=jQuery.sap.history.NavType.Unknown;f.push(t)}else{if(f.indexOf(l,u+1)===-1){h=jQuery.sap.history.NavType.Forward}else{h=jQuery.sap.history.NavType.Back}}s=R(t);if(s){a=N(s.sIdentifier);if(a){a.action.apply(null,[s.oStateData,h])}}else{e.error("hash format error! The current Hash: "+t)}}}}function N(e){var t;for(t=0;t<s.length;t++){if(s[t].sIdentifier===e){return s[t]}}}function R(e){if(I(e)){var t=e.lastIndexOf(n);e=e.slice(0,t)}var r=e.split(c),a={};if(r.length===4||r.length===3){a.sIdentifier=i.decodeURIComponent(r[0]);a.oStateData=JSON.parse(i.decodeURIComponent(r[1]));if(r.length===4){a.uid=r[2]}a.bBookmarkable=r[r.length-1]==="0"?false:true;return a}else{return null}}})(this);return jQuery});
//# sourceMappingURL=jquery.sap.history.js.map