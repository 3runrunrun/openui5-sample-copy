/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/base/i18n/Localization","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/IconPool","sap/ui/core/Lib","sap/ui/core/theming/Parameters","sap/ui/events/KeyCodes","./SwitchRenderer","sap/base/assert"],function(t,e,i,s,o,n,a,r,p,u){"use strict";var h=t.touch;var c=t.SwitchType;var _=i.extend("sap.m.Switch",{metadata:{interfaces:["sap.ui.core.IFormContent","sap.m.IOverflowToolbarContent","sap.m.IToolbarInteractiveControl"],library:"sap.m",properties:{state:{type:"boolean",group:"Misc",defaultValue:false},customTextOn:{type:"string",group:"Misc",defaultValue:""},customTextOff:{type:"string",group:"Misc",defaultValue:""},enabled:{type:"boolean",group:"Data",defaultValue:true},name:{type:"string",group:"Misc",defaultValue:""},type:{type:"sap.m.SwitchType",group:"Appearance",defaultValue:c.Default}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{state:{type:"boolean"}}}},designtime:"sap/m/designtime/Switch.designtime"},renderer:p});o.insertFontFaceStyle();s.apply(_.prototype,[true]);_.prototype._slide=function(t){if(t>_._OFFPOSITION){t=_._OFFPOSITION}else if(t<_._ONPOSITION){t=_._ONPOSITION}if(t>this._iNoLabelFix){t=this._iNoLabelFix}if(this._iCurrentPosition===t){return}this._iCurrentPosition=t;this.getDomRef("inner").style[e.getRTL()?"right":"left"]=t+"px";this._setTempState(Math.abs(t)<_._SWAPPOINT)};_.prototype._resetSlide=function(){this.getDomRef("inner").style.cssText=""};_.prototype._setTempState=function(t){if(this._bTempState===t){return}this._bTempState=t;this.getDomRef("handle").setAttribute("data-sap-ui-swt",t?this._sOn:this._sOff)};_.prototype._getInvisibleElement=function(){return this.$("invisible")};_.prototype.getInvisibleElementId=function(){return this.getId()+"-invisible"};_.prototype.getInvisibleElementText=function(t){var e=n.getResourceBundleFor("sap.m");var i="";switch(this.getType()){case c.Default:if(t){i=this.getCustomTextOn().trim()||e.getText("SWITCH_ON")}else{i=this.getCustomTextOff().trim()||e.getText("SWITCH_OFF")}break;case c.AcceptReject:if(t){i=e.getText("SWITCH_ARIA_ACCEPT")}else{i=e.getText("SWITCH_ARIA_REJECT")}break}return i};var l=Object.assign({_sap_m_Switch_OnPosition:-32,_sap_m_Switch_OffPosition:0},a.get({name:["_sap_m_Switch_OnPosition","_sap_m_Switch_OffPosition"],callback:function(t){_._ONPOSITION=Number(t["_sap_m_Switch_OnPosition"]);_._OFFPOSITION=Number(t["_sap_m_Switch_OffPosition"]);_._SWAPPOINT=Math.abs((_._ONPOSITION-_._OFFPOSITION)/2)}}));_._ONPOSITION=Number(l["_sap_m_Switch_OnPosition"]);_._OFFPOSITION=Number(l["_sap_m_Switch_OffPosition"]);_._SWAPPOINT=Math.abs((_._ONPOSITION-_._OFFPOSITION)/2);_.prototype.onBeforeRendering=function(){var t=n.getResourceBundleFor("sap.m");this._sOn=this.getCustomTextOn()||t.getText("SWITCH_ON");this._sOff=this.getCustomTextOff()||t.getText("SWITCH_OFF")};_.prototype.ontouchstart=function(t){var e=t.targetTouches[0],i=this.getRenderer().CSS_CLASS,s=this.$("inner");t.setMarked();if(h.countContained(t.touches,this.getId())>1||!this.getEnabled()||t.button){return}this._iActiveTouchId=e.identifier;this._bTempState=this.getState();this._iStartPressPosX=e.pageX;this._iPosition=s.position().left;this._bDragging=false;setTimeout(this["focus"].bind(this),0);this.$("switch").addClass(i+"Pressed");this._iNoLabelFix=parseInt(getComputedStyle(this.getDomRef("switch")).outlineOffset)};_.prototype.ontouchmove=function(t){t.setMarked();t.preventDefault();var i,s,o=h;if(!this.getEnabled()||t.button){return}u(o.find(t.touches,this._iActiveTouchId),"missing touchend");i=o.find(t.changedTouches,this._iActiveTouchId);if(!i||Math.abs(i.pageX-this._iStartPressPosX)<6){return}this._bDragging=true;s=(this._iStartPressPosX-i.pageX)*-1+this._iPosition;if(e.getRTL()){s=-s}this._slide(s)};_.prototype.ontouchend=function(t){t.setMarked();var e,i=h;if(!this.getEnabled()||t.button){return}u(this._iActiveTouchId!==undefined,"expect to already be touching");e=i.find(t.changedTouches,this._iActiveTouchId);if(e){u(!i.find(t.touches,this._iActiveTouchId),"touchend still active");if(!this._updateStateAndNotify()){this.$("switch").removeClass(this.getRenderer().CSS_CLASS+"Pressed");this._resetSlide()}}};_.prototype.ontouchcancel=_.prototype.ontouchend;_.prototype._handleSpaceOrEnter=function(t){if(this.getEnabled()){t.setMarked();if(!this._bDragging){this._updateStateAndNotify()}}};_.prototype.onsapspace=function(t){t.preventDefault()};_.prototype.onkeyup=function(t){if(t.which===r.SPACE){this._handleSpaceOrEnter(t)}};_.prototype.onsapenter=_.prototype._handleSpaceOrEnter;_.prototype._updateStateAndNotify=function(){var t=this.getState(),e;this.setState(this._bDragging?this._bTempState:!t);e=t!==this.getState();if(e){this.fireChange({state:this.getState()})}this._bDragging=false;return e};_.prototype.getAccessibilityInfo=function(){var t=n.getResourceBundleFor("sap.m"),e=this.getState(),i=this.getInvisibleElementText(e);return{role:"switch",type:t.getText("ACC_CTR_TYPE_SWITCH"),description:i,focusable:this.getEnabled(),enabled:this.getEnabled()}};_.prototype.getOverflowToolbarConfig=function(){return{propsUnrelatedToSize:["enabled","state"]}};_.prototype._getToolbarInteractive=function(){return true};return _});
//# sourceMappingURL=Switch.js.map