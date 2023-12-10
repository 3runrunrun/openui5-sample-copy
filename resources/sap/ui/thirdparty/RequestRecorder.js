/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(e,t){"use strict";if(typeof define==="function"&&define.amd){define(["URI","sinon"],function(e,r){return t(e,r)})}else{e.RequestRecorder=t(e.URI,e.sinon)}})(this,function(e,t){"use strict";var r="RequestRecorder";function n(t){return new e(t).absoluteTo(new e(document.baseURI).search("")).toString()}function i(){}i.prototype={bIsRecording:false,bIsPaused:false,aEntriesUrlFilter:[],aEntriesUrlReplace:[],fnCustomGroupNameCallback:null,sDefaultFilename:"Record",aRequests:[],mXhrNativeFunctions:{},sFilename:"",bIsDownloadDisabled:false,bPromptForDownloadFilename:false,mHarFileContent:null,sDefaultMajorHarVersion:1,sDefaultCustomGroup:"defaultCustomGroup",oSinonXhr:null,mDelaySettings:null,oLog:{info:function(e){console.info(e)},debug:function(e){console.debug(e)},warning:function(e){console.warn(e)},error:function(e){console.error(e)}},preciseDateNow:function(){return window.performance.timing.navigationStart+window.performance.now()},loadFile:function(e){var t=null;var n=new XMLHttpRequest;n.open("GET",e,false);n.addEventListener("load",function(){if(this.status===200){t=JSON.parse(this.responseText)}});n.send();try{t=JSON.parse(n.responseText)}catch(e){throw new Error("Har file could not be loaded.")}if(t&&(!t.log||!t.log.version||parseInt(t.log.version,10)!=this.sDefaultMajorHarVersion)){this.oLog.error(r+" - Incompatible version. Please provide .har file with version "+this.sDefaultMajorHarVersion+".x")}return t},prepareEntries:function(e){var t;if(!e.log.entries||!e.log.entries.length){this.oLog.info(r+" - Empty entries array or the provided har file is empty.");t=[]}else{t=e.log.entries;for(var n=0;n<t.length;n++){t[n]._timestampStarted=new Date(t[n].startedDateTime).getTime();t[n]._timestampFinished=t[n]._timestampStarted+t[n].time;t[n]._initialOrder=n}this.prepareEntriesOrder(t,"_timestampFinished");this.prepareEntriesOrder(t,"_timestampStarted");e._groupedEntries={};for(var i=0;i<t.length;i++){this.addEntryToMapping(e,t,i)}}e.log.entries=t;return e},prepareEntriesOrder:function(e,t){e.sort(function(e,r){var n=e[t]-r[t];if(n===0){return e._initialOrder-r._initialOrder}else{return n}})},addEntryToMapping:function(e,t,r){var n=this.createUrlGroup(t[r].request.method,t[r].request.url);var i=t[r]._customGroupName?t[r]._customGroupName:this.sDefaultCustomGroup;if(!e._groupedEntries[i]){e._groupedEntries[i]={}}if(!e._groupedEntries[i][n]){e._groupedEntries[i][n]=[]}e._groupedEntries[i][n].push(r)},createUrlGroup:function(t,r){var n=new e(r).resource();n=this.replaceEntriesUrlByRegex(n);return t+n},replaceEntriesUrlByRegex:function(e){for(var t=0;t<this.aEntriesUrlReplace.length;t++){var n=this.aEntriesUrlReplace[t];if(n.regex instanceof RegExp&&n.value!==undefined){e=e.replace(n.regex,n.value)}else{this.oLog.warning(r+" - Invalid regular expression for url replace.")}}return e},prepareRequestForHar:function(e,t){var r={startedDateTime:new Date(t).toISOString(),time:this.preciseDateNow()-t,request:{headers:e._requestParams.headers,url:n(e._requestParams.url),method:e._requestParams.method},response:{status:e.status,content:{text:e.responseText}}};if(e._requestParams.customGroupName){r._customGroupName=e._requestParams.customGroupName}r.response.headers=this.transformHeadersFromArrayToObject(e);return r},transformHeadersFromArrayToObject:function(e){var t=e.getAllResponseHeaders().split("\r\n");var r=[];for(var n=0;n<t.length;n++){if(t[n]){var i=t[n].split(":");r.push({name:i[0].trim(),value:i[1].trim()})}}return r},deleteRecordedEntries:function(){this.aRequests=[]},getHarContent:function(e){var t=this.sFilename||this.sDefaultFilename;if(this.bPromptForDownloadFilename){t=window.prompt("Enter file name",t+".har")}else{t=t+".har"}var r={log:{version:"1.2",creator:{name:"RequestRecorder",version:"1.0"},entries:this.aRequests}};if(e){this.deleteRecordedEntries()}if(!this.bIsDownloadDisabled){var n=JSON.stringify(r,null,4);var i=document.createElement("a");document.body.appendChild(i);var s=new window.Blob([n],{type:"octet/stream"});var o=window.URL.createObjectURL(s);i.href=o;i.download=t;i.click();window.URL.revokeObjectURL(o)}return r},calculateDelay:function(e,t){if(e){if(e.factor!==undefined&&typeof e.factor==="number"){t*=e.factor}if(e.offset!==undefined&&typeof e.offset==="number"){t+=e.offset}if(e.max!==undefined&&typeof e.max==="number"){t=Math.min(e.max,t)}if(e.min!==undefined&&typeof e.min==="number"){t=Math.max(e.min,t)}}return t},respond:function(e,t){var r=function(){if(e.readyState!==0){var r=t.response.content.text;var n={};t.response.headers.forEach(function(e){n[e.name]=e.value});if(typeof r==="function"){r=r()}e.respond(t.response.status,n,r)}};if(e.async){setTimeout(function(){r()},this.calculateDelay(this.mDelaySettings,t.time))}else{r()}},isUrlFiltered:function(e,t){if(this.bIsPaused){return true}var n=this;return t.every(function(t){if(t instanceof RegExp){return!t.test(e)}else{n.oLog.error(r+" - Invalid regular expression for filter.");return true}})},init:function(e){e=e||{};if(typeof e!=="object"){throw new Error("Parameter object isn't a valid object")}this.mHarFileContent=null;this.aRequests=[];this.sFilename="";this.bIsRecording=false;this.bIsPaused=false;this.bIsDownloadDisabled=false;if(this.oSinonXhr){this.oSinonXhr.filters=this.aSinonFilters;this.aSinonFilters=[];this.oSinonXhr.restore();this.oSinonXhr=null}for(var t in this.mXhrNativeFunctions){if(this.mXhrNativeFunctions.hasOwnProperty(t)){window.XMLHttpRequest.prototype[t]=this.mXhrNativeFunctions[t]}}this.mXhrNativeFunctions={};this.bIsDownloadDisabled=e.disableDownload===true;this.bPromptForDownloadFilename=e.promptForDownloadFilename===true;if(e.delay){if(e.delay===true){this.mDelaySettings={}}else{this.mDelaySettings=e.delay}}else{this.mDelaySettings={max:0}}if(e.entriesUrlFilter){if(Array.isArray(e.entriesUrlFilter)){this.aEntriesUrlFilter=e.entriesUrlFilter}else{this.aEntriesUrlFilter=[e.entriesUrlFilter]}}else{this.aEntriesUrlFilter=[new RegExp(".*")]}if(e.entriesUrlReplace){if(Array.isArray(e.entriesUrlReplace)){this.aEntriesUrlReplace=e.entriesUrlReplace}else{this.aEntriesUrlReplace=[e.entriesUrlReplace]}}else{this.aEntriesUrlReplace=[]}if(e.customGroupNameCallback&&typeof e.customGroupNameCallback==="function"){this.fnCustomGroupNameCallback=e.customGroupNameCallback}else{this.fnCustomGroupNameCallback=function(){return false}}},isPlayStarted:function(){return!!this.oSinonXhr},isRecordStarted:function(){return this.bIsRecording}};var s=new i;var o={start:function(t,n){try{this.play(t,n)}catch(a){var i=new e(t);var o=i.suffix();if(o!="har"){s.oLog.warning(r+" - Invalid file extension: "+o+", please use '.har' files.")}this.record(i.filename().replace("."+o,""),n)}},record:function(e,t){s.oLog.info(r+" - Record");if(window.XMLHttpRequest.name==="FakeXMLHttpRequest"){s.oLog.warning(r+" - Sinon FakeXMLHttpRequest is enabled by another application, recording could be defective")}if(s.isRecordStarted()){s.oLog.error(r+" - RequestRecorder is already recording, please stop first...");return}s.init(t);s.sFilename=e;s.bIsRecording=true;s.mXhrNativeFunctions.open=window.XMLHttpRequest.prototype.open;window.XMLHttpRequest.prototype.open=function(){this._requestParams=this._requestParams||{};this._requestParams.method=arguments[0];this._requestParams.url=arguments[1];this._requestParams.customGroupName=s.fnCustomGroupNameCallback();this._requestParams.headers=this._requestParams.headers||[];s.mXhrNativeFunctions.open.apply(this,arguments)};s.mXhrNativeFunctions.setRequestHeader=window.XMLHttpRequest.prototype.setRequestHeader;window.XMLHttpRequest.prototype.setRequestHeader=function(e,t){this._requestParams=this._requestParams||{headers:[]};this._requestParams.headers.push({name:e,value:t});s.mXhrNativeFunctions.setRequestHeader.apply(this,arguments)};s.mXhrNativeFunctions.send=window.XMLHttpRequest.prototype.send;window.XMLHttpRequest.prototype.send=function(){if(!s.isUrlFiltered(this._requestParams.url,s.aEntriesUrlFilter)){var e=s.preciseDateNow();var t=this.onreadystatechange;this.onreadystatechange=function(){if(this.readyState===4){s.aRequests.push(s.prepareRequestForHar(this,e));s.oLog.info(r+" - Record XMLHttpRequest. Method: "+this._requestParams.method+", URL: "+this._requestParams.url)}if(t){t.apply(this,arguments)}}}s.mXhrNativeFunctions.send.apply(this,arguments)}},play:function(i,o){s.oLog.info(r+" - Play");if(s.isPlayStarted()){s.oLog.error(r+" - RequestRecorder is already playing, please stop first...");return}s.init(o);var a;if(i&&Array.isArray(i)){s.mHarFileContent={};s.mHarFileContent.log={entries:i.slice(0)};a=""}else{a=i;s.mHarFileContent=s.loadFile(a)}if(s.mHarFileContent){s.mHarFileContent=s.prepareEntries(s.mHarFileContent);s.oLog.info(r+" - Har file found, replay started ("+a+")");s.oSinonXhr=t.useFakeXMLHttpRequest();s.oSinonXhr.useFilters=true;s.aSinonFilters=s.oSinonXhr.filters;s.oSinonXhr.filters=[];s.oSinonXhr.addFilter(function(e,t,n,i,o){if(!s.isUrlFiltered(t,s.aEntriesUrlFilter)){return false}for(var a=0;a<s.aSinonFilters.length;a++){if(s.aSinonFilters[a](e,t,n,i,o)===false){s.oLog.debug(r+" - Foreign URL filter from sinon filters are applied.");return false}}return true});var l=s.oSinonXhr.onCreate;s.oSinonXhr.onCreate=function(t){var i=t.send;t.send=function(){if(!s.isUrlFiltered(t.url,s.aEntriesUrlFilter)){var o;var a;var l=n(t.url);l=new e(l).resource();l=s.replaceEntriesUrlByRegex(l);var u=t.method+l;var f=s.fnCustomGroupNameCallback();if(!f){f=s.sDefaultCustomGroup}if(!s.mHarFileContent._groupedEntries[f]){throw new Error("Custom group name does not exist: "+f)}a=s.mHarFileContent._groupedEntries[f];if(!a[u]){throw new Error("URL does not exist: "+u)}if(!a[u].length){throw new Error("No more entries left for: "+u)}o=s.mHarFileContent.log.entries[a[u].shift()];s.oLog.info(r+" - Respond XMLHttpRequest. Method: "+t.method+", URL: "+l);s.respond(t,o)}else{i.apply(this,arguments)}};if(l){l.apply(this,arguments)}}}},stop:function(){s.oLog.info(r+" - Stop");var e=null;if(s.isRecordStarted()){e=s.getHarContent(true)}s.init();return e},pause:function(){s.oLog.info(r+" - Pause");s.bIsPaused=true},resume:function(){s.oLog.info(r+" - Resume");s.bIsPaused=false},getRecordings:function(e){var t=e||false;s.oLog.info(r+" - Get Recordings");return s.getHarContent(t)},addResponseJson:function(e,t,r,n,i){var s=i||[];s.push({name:"Content-Type",value:"application/json;charset=utf-8"});this.addResponse(e,t,r,n,s)},addResponse:function(e,t,r,n,i){if(!s.isPlayStarted()){throw new Error("Start the player first before you add a response.")}var o=r||"GET";var a=i||[{name:"Content-Type",value:"text/plain;charset=utf-8"}];var l=n||200;var u={startedDateTime:(new Date).toISOString(),time:0,request:{headers:[],url:e,method:o},response:{status:l,content:{text:t},headers:a}};var f=s.mHarFileContent.log.entries.push(u)-1;s.addEntryToMapping(s.mHarFileContent,s.mHarFileContent.log.entries,f)},setLogger:function(e){if(typeof e!="object"||typeof e.info!="function"||typeof e.debug!="function"||typeof e.warning!="function"||typeof e.error!="function"){throw new Error("Logger is not valid. It should implement at least the functions: info, debug, warning, error.")}s.oLog=e}};return o});
//# sourceMappingURL=RequestRecorder.js.map