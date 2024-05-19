/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../base/DataType","../base/Object","../base/ManagedObject","./ElementMetadata","../Device","sap/ui/performance/trace/Interaction","sap/base/future","sap/base/assert","sap/ui/thirdparty/jquery","sap/ui/events/F6Navigation","sap/ui/util/_enforceNoReturnValue","./RenderManager","./EnabledPropagator","./ElementRegistry","./Theming","sap/ui/core/util/_LocalizationHelper"],function(e,t,r,i,n,o,a,s,jQuery,u,l,p,d,f,g,h){"use strict";var c=r.extend("sap.ui.core.Element",{metadata:{stereotype:"element",abstract:true,publicMethods:["getId","getMetadata","getTooltip_AsString","getTooltip_Text","getModel","setModel","hasModel","bindElement","unbindElement","getElementBinding","prop","getLayoutData","setLayoutData"],library:"sap.ui.core",aggregations:{tooltip:{type:"sap.ui.core.TooltipBase",altTypes:["string"],multiple:false},customData:{type:"sap.ui.core.CustomData",multiple:true,singularName:"customData"},layoutData:{type:"sap.ui.core.LayoutData",multiple:false,singularName:"layoutData"},dependents:{type:"sap.ui.core.Element",multiple:true},dragDropConfig:{type:"sap.ui.core.dnd.DragDropBase",multiple:true,singularName:"dragDropConfig"}}},constructor:function(e,t){r.apply(this,arguments);this._iRenderingDelegateCount=0},renderer:null},i);f.init(c);c.defineClass=function(e,r,n){return t.defineClass(e,r,n||i)};c.prototype.getInterface=function(){return this};c.prototype._handleEvent=function(e){var t=this,r="on"+e.type;function i(i){var n,o,a;if(i&&(o=i.length)>0){i=o===1?i:i.slice();for(n=0;n<o;n++){if(e.isImmediateHandlerPropagationStopped()){return}a=i[n].oDelegate;if(a[r]){a[r].call(i[n].vThis===true?t:i[n].vThis||a,e)}}}}i(this.aBeforeDelegates);if(e.isImmediateHandlerPropagationStopped()){return}if(this[r]){if(e._bNoReturnValue){l(this[r](e),{name:r,component:this.getId()})}else{this[r](e)}}i(this.aDelegates)};c.prototype.init=function(){return undefined};c.prototype.exit=function(){return undefined};c.create=r.create;c.prototype.toString=function(){return"Element "+this.getMetadata().getName()+"#"+this.sId};c.prototype.getDomRef=function(e){return document.getElementById(e?this.getId()+"-"+e:this.getId())};c.prototype.$=function(e){return jQuery(this.getDomRef(e))};c.prototype.isActive=function(){return this.oParent&&this.oParent.isActive()};c.prototype.prop=function(e,t){var r=this.getMetadata().getAllSettings()[e];if(r){if(arguments.length==1){return this[r._sGetter]()}else{this[r._sMutator](t);return this}}};c.prototype.setProperty=function(e,t,i){if(e!="enabled"||i){return r.prototype.setProperty.apply(this,arguments)}var n=this.mProperties.enabled;r.prototype.setProperty.apply(this,arguments);if(n!=this.mProperties.enabled){d.updateDescendants(this)}return this};c.prototype.insertDependent=function(e,t){this.insertAggregation("dependents",e,t,true);return this};c.prototype.addDependent=function(e){this.addAggregation("dependents",e,true);return this};c.prototype.removeDependent=function(e){return this.removeAggregation("dependents",e,true)};c.prototype.removeAllDependents=function(){return this.removeAllAggregation("dependents",true)};c.prototype.destroyDependents=function(){this.destroyAggregation("dependents",true);return this};c.prototype.rerender=function(){if(this.oParent){this.oParent.rerender()}};c.prototype.getUIArea=function(){return this.oParent?this.oParent.getUIArea():null};c.prototype.destroy=function(e){if(this.bIsDestroyed){return}var t=!this.getParent();c._updateFocusInfo(this);r.prototype.destroy.call(this,e);this.data=C;var i=this.getDomRef();if(!i){return}var n=e==="KeepDom";if(e===true||!n&&t||this.isA("sap.ui.core.PopupInterface")||p.isPreservedContent(i)){jQuery(i).remove()}else{i.removeAttribute("data-sap-ui-preserve");if(!n){i.id="sap-ui-destroyed-"+this.getId();for(var o=0,a=i.querySelectorAll('[id^="'+this.getId()+'-"]');o<a.length;o++){a[o].id="sap-ui-destroyed-"+a[o].id}}}};c.prototype.fireEvent=function(e,t,i,n){if(this.hasListeners(e)){o.notifyStepStart(e,this)}if(typeof t==="boolean"){n=i;i=t;t=null}t=t||{};t.id=t.id||this.getId();if(c._interceptEvent){c._interceptEvent(e,this,t)}return r.prototype.fireEvent.call(this,e,t,i,n)};c._interceptEvent=undefined;function y(e,t,r){if(t.canSkipRendering||!(t.onAfterRendering||t.onBeforeRendering)){return}e._iRenderingDelegateCount+=r||-1;if(e.bOutput===true&&e._iRenderingDelegateCount==r){p.canSkipRendering(e,1)}}c.prototype.hasRenderingDelegate=function(){return Boolean(this._iRenderingDelegateCount)};c.prototype.addDelegate=function(e,t,r,i){s(e,"oDelegate must be not null or undefined");if(!e){return this}this.removeDelegate(e);if(typeof t==="object"){i=r;r=t;t=false}if(typeof r==="boolean"){i=r;r=undefined}(t?this.aBeforeDelegates:this.aDelegates).push({oDelegate:e,bClone:!!i,vThis:r===this?true:r});y(this,e,1);return this};c.prototype.removeDelegate=function(e){var t;for(t=0;t<this.aDelegates.length;t++){if(this.aDelegates[t].oDelegate==e){this.aDelegates.splice(t,1);y(this,e,0);t--}}for(t=0;t<this.aBeforeDelegates.length;t++){if(this.aBeforeDelegates[t].oDelegate==e){this.aBeforeDelegates.splice(t,1);y(this,e,0);t--}}return this};c.prototype.addEventDelegate=function(e,t){return this.addDelegate(e,false,t,true)};c.prototype.removeEventDelegate=function(e){return this.removeDelegate(e)};c.prototype.getFocusDomRef=function(){return this.getDomRef()||null};function m(e,t){if(t[0]>e[1]||e[0]>t[1]){return null}else{return[Math.max(e[0],t[0]),Math.min(e[1],t[1])]}}c.prototype.isFocusable=function(){var e=this.getFocusDomRef();if(!e){return false}var t=e;var r=[[0,window.innerWidth],[0,window.innerHeight]];var i;var n;while(!i||!n){var o=t.getBoundingClientRect();i=m(r[0],[o.x,o.x+o.width]);n=m(r[1],[o.y,o.y+o.height]);if(t.assignedSlot){t=t.assignedSlot}if(t.parentElement){t=t.parentElement}else if(t.parentNode&&t.parentNode.nodeType===Node.DOCUMENT_FRAGMENT_NODE){t=t.parentNode.host}else{break}}var a=document.elementsFromPoint(Math.floor((i[0]+i[1])/2),Math.floor((n[0]+n[1])/2));var s=a.findIndex(function(t){return t.contains(e)});var u=a.findIndex(function(e){return e.classList.contains("sapUiBLy")||e.classList.contains("sapUiBlockLayer")});if(u!==-1&&s>u){return false}return jQuery(e).is(":sapFocusable")};function D(e){var t,r=[];t=e.parentNode;while(t){r.push({node:t,scrollLeft:t.scrollLeft,scrollTop:t.scrollTop});t=t.parentNode}return r}function v(e){e.forEach(function(e){var t=e.node;if(t.scrollLeft!==e.scrollLeft){t.scrollLeft=e.scrollLeft}if(t.scrollTop!==e.scrollTop){t.scrollTop=e.scrollTop}})}c.prototype.focus=function(e){var t=this.getFocusDomRef(),r=[];e=e||{};if(t){if(n.browser.safari){if(e.preventScroll===true){r=D(t)}t.focus();if(r.length>0){setTimeout(v.bind(null,r),0)}}else{t.focus(e)}}};c.prototype.getFocusInfo=function(){return{id:this.getId()}};c.prototype.applyFocusInfo=function(e){this.focus(e);return this};c.prototype._refreshTooltipBaseDelegate=function(e){var r=this.getTooltip();if(t.isObjectA(r,"sap.ui.core.TooltipBase")){this.removeDelegate(r)}if(t.isObjectA(e,"sap.ui.core.TooltipBase")){e._currentControl=this;this.addDelegate(e)}};c.prototype.setTooltip=function(e){this._refreshTooltipBaseDelegate(e);this.setAggregation("tooltip",e);return this};c.prototype.getTooltip=function(){return this.getAggregation("tooltip")};c.runWithPreprocessors=r.runWithPreprocessors;c.prototype.getTooltip_AsString=function(){var e=this.getTooltip();if(typeof e==="string"||e instanceof String){return e}return undefined};c.prototype.getTooltip_Text=function(){var e=this.getTooltip();if(e&&typeof e.getText==="function"){return e.getText()}return e};var b=c.extend("sap.ui.core.CustomData",{metadata:{library:"sap.ui.core",properties:{key:{type:"string",group:"Data",defaultValue:null},value:{type:"any",group:"Data",defaultValue:null},writeToDom:{type:"boolean",group:"Data",defaultValue:false}},designtime:"sap/ui/core/designtime/CustomData.designtime"}});b.prototype.setValue=function(e){this.setProperty("value",e,true);var t=this.getParent();if(t&&t.getDomRef()){var r=this._checkWriteToDom(t);if(r){t.$().attr(r.key,r.value)}}return this};b.prototype._checkWriteToDom=function(t){if(!this.getWriteToDom()){return null}var r=this.getKey();var i=this.getValue();function n(e){a.errorThrows("CustomData with key "+r+" should be written to HTML of "+t+" but "+e);return null}if(typeof i!="string"){return n("the value is not a string.")}var o=e.getType("sap.ui.core.ID");if(!o.isValid(r)||r.indexOf(":")!=-1){return n("the key is not valid (must be a valid sap.ui.core.ID without any colon).")}if(r==u.fastNavigationKey){i=/^\s*(x|true)\s*$/i.test(i)?"true":"false"}else if(r.indexOf("sap-ui")==0){return n("the key is not valid (may not start with 'sap-ui').")}return{key:"data-"+r,value:i}};function _(e,t){var r=e.getAggregation("customData");if(r){for(var i=0;i<r.length;i++){if(r[i].getKey()==t){return r[i]}}}return null}function T(e,t,r,i){var n=_(e,t);if(r===null){if(!n){return}var o=e.getAggregation("customData").length;if(o==1){e.destroyAggregation("customData",true)}else{e.removeAggregation("customData",n,true);n.destroy()}}else if(n){n.setValue(r);n.setWriteToDom(i)}else{e.addAggregation("customData",new b({key:t,value:r,writeToDom:i}),true)}}c.prototype.data=function(){var e=arguments.length;if(e==0){var t=this.getAggregation("customData"),r={};if(t){for(var i=0;i<t.length;i++){r[t[i].getKey()]=t[i].getValue()}}return r}else if(e==1){var n=arguments[0];if(n===null){this.destroyAggregation("customData",true);return this}else if(typeof n=="string"){var o=_(this,n);return o?o.getValue():null}else if(typeof n=="object"){for(var a in n){T(this,a,n[a])}return this}else{throw new TypeError("When data() is called with one argument, this argument must be a string, an object or null, but is "+typeof n+":"+n+" (on UI Element with ID '"+this.getId()+"')")}}else if(e==2){T(this,arguments[0],arguments[1]);return this}else if(e==3){T(this,arguments[0],arguments[1],arguments[2]);return this}else{throw new TypeError("data() may only be called with 0-3 arguments (on UI Element with ID '"+this.getId()+"')")}};c._CustomData=b;c.getMetadata().getAggregation("customData").defaultClass=b;function C(){var e=arguments.length;if(e===1&&arguments[0]!==null&&typeof arguments[0]=="object"||e>1&&e<4&&arguments[1]!==null){a.errorThrows("Cannot create custom data on an already destroyed element '"+this+"'");return this}return c.prototype.data.apply(this,arguments)}c.prototype.clone=function(e,t){var i=r.prototype.clone.apply(this,arguments);for(var n=0;n<this.aDelegates.length;n++){if(this.aDelegates[n].bClone){i.aDelegates.push(this.aDelegates[n])}}for(var o=0;o<this.aBeforeDelegates.length;o++){if(this.aBeforeDelegates[o].bClone){i.aBeforeDelegates.push(this.aBeforeDelegates[o])}}if(this._sapui_declarativeSourceInfo){i._sapui_declarativeSourceInfo=Object.assign({},this._sapui_declarativeSourceInfo)}return i};c.prototype.findElements=r.prototype.findAggregatedObjects;function E(e){var t=e.getParent();if(t){var r=jQuery.Event("LayoutDataChange");r.srcControl=e;t._handleEvent(r)}}c.prototype.setLayoutData=function(e){this.setAggregation("layoutData",e,true);E(this);return this};c.prototype.destroyLayoutData=function(){this.destroyAggregation("layoutData",true);E(this);return this};c.prototype.bindElement=r.prototype.bindObject;c.prototype.unbindElement=r.prototype.unbindObject;c.prototype.getElementBinding=r.prototype.getObjectBinding;c.prototype._getFieldGroupIds=function(){var e;if(this.getMetadata().hasProperty("fieldGroupIds")){e=this.getFieldGroupIds()}if(!e||e.length==0){var t=this.getParent();if(t&&t._getFieldGroupIds){return t._getFieldGroupIds()}}return e||[]};c.prototype.getDomRefForSetting=function(e){var t=this.getMetadata().getAllSettings()[e];if(t&&t.selector){var r=this.getDomRef();if(r){r=r.parentNode;if(r&&r.querySelector){var i=t.selector.replace(/\{id\}/g,this.getId().replace(/(:|\.)/g,"\\$1"));return r.querySelector(i)}}}return null};c.prototype._getMediaContainerWidth=function(){if(typeof this._oContextualSettings==="undefined"){return undefined}return this._oContextualSettings.contextualWidth};c.prototype._getCurrentMediaContainerRange=function(e){var t=this._getMediaContainerWidth();e=e||n.media.RANGESETS.SAP_STANDARD;return n.media.getCurrentRange(e,t)};c.prototype._onContextualSettingsChanged=function(){var e=this._getMediaContainerWidth(),t=e!==undefined,r=t^!!this._bUsingContextualWidth,i=this._aContextualWidthListeners||[];if(r){if(t){i.forEach(function(e){n.media.detachHandler(e.callback,e.listener,e.name)})}else{i.forEach(function(e){n.media.attachHandler(e.callback,e.listener,e.name)})}this._bUsingContextualWidth=t}i.forEach(function(e){var t=this._getCurrentMediaContainerRange(e.name);if(t&&t.from!==e.media.from){e.media=t;e.callback.call(e.listener||window,t)}},this)};c.prototype._attachMediaContainerWidthChange=function(e,t,r){r=r||n.media.RANGESETS.SAP_STANDARD;this._aContextualWidthListeners=this._aContextualWidthListeners||[];this._aContextualWidthListeners.push({callback:e,listener:t,name:r,media:this._getCurrentMediaContainerRange(r)});if(!this._bUsingContextualWidth){n.media.attachHandler(e,t,r)}};c.prototype._detachMediaContainerWidthChange=function(e,t,r){var i;r=r||n.media.RANGESETS.SAP_STANDARD;if(!this._aContextualWidthListeners){return}for(var o=0,a=this._aContextualWidthListeners.length;o<a;o++){i=this._aContextualWidthListeners[o];if(i.callback===e&&i.listener===t&&i.name===r){if(!this._bUsingContextualWidth){n.media.detachHandler(e,t,r)}this._aContextualWidthListeners.splice(o,1);break}}};var A;c._updateFocusInfo=function(e){A=A||sap.ui.require("sap/ui/core/FocusHandler");if(A){A.updateControlFocusInfo(e)}};c.closestTo=function(e,t){var r="[data-sap-ui]",i,n;if(e===undefined||e===null){return undefined}if(typeof e==="string"){i=document.querySelector(e)}else if(e instanceof window.Element){i=e}else if(e.jquery){i=e[0];a.errorThrows("Do not call Element.closestTo() with jQuery object as parameter. The function should be called with either a DOM Element or a CSS selector.")}else{throw new TypeError("Element.closestTo accepts either a DOM element or a CSS selector string as parameter, but not '"+e+"'")}if(t){r+=",[data-sap-ui-related]"}i=i&&i.closest(r);if(i){if(t){n=i.getAttribute("data-sap-ui-related")}n=n||i.getAttribute("id")}return c.getElementById(n)};c.getElementById=f.get;c.getActiveElement=()=>{try{var e=jQuery(document.activeElement);if(e.is(":focus")){return c.closestTo(e[0])}}catch(e){}};c.registry=f;g.attachApplied(function(e){var t=jQuery.Event("ThemeChanged");t.theme=e.theme;f.forEach(function(e){t._bNoReturnValue=true;e._handleEvent(t)})});h.registerForUpdate("Elements",f.all);return c});
//# sourceMappingURL=Element.js.map