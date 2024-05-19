/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/layout/library","sap/ui/layout/form/Form","./FormHelper","sap/ui/core/IconPool"],function(e,t,r,i,n){"use strict";var a=e.TitleLevel;var o=t.BackgroundDesign;var l={apiVersion:2};l.render=function(e,t){var i=t.getParent();if(i&&i instanceof r){this.renderForm(e,t,i)}};l.renderForm=function(e,t,r){var i=r.getToolbar();e.openStart("div",t);e.class(this.getMainClass());if(i){e.class("sapUiFormToolbar")}this.addBackgroundClass(e,t);e.openEnd();this.renderHeader(e,i,r.getTitle(),undefined,false,t._sFormTitleSize,r.getId());this.renderContainers(e,t,r);e.close("div")};l.getMainClass=function(){return"sapUiFormLayout"};l.addBackgroundClass=function(e,t){var r=t.getBackgroundDesign();if(r!=o.Transparent){e.class("sapUiFormBackgr"+r)}};l.renderContainers=function(e,t,r){var i=r.getVisibleFormContainers();for(var n=0,a=i.length;n<a;n++){var o=i[n];this.renderContainer(e,t,o)}};l.renderContainer=function(e,t,r){var i=r.getExpandable();var n=r.getToolbar();var a=r.getTitle();e.openStart("section",r);e.class("sapUiFormContainer");if(n){e.class("sapUiFormContainerToolbar")}else if(a){e.class("sapUiFormContainerTitle")}if(r.getTooltip_AsString()){e.attr("title",r.getTooltip_AsString())}this.writeAccessibilityStateContainer(e,r);e.openEnd();this.renderHeader(e,n,a,r._oExpandButton,i,t._sFormSubTitleSize,r.getId());if(i){e.openStart("div",r.getId()+"-content");if(!r.getExpanded()){e.style("display","none")}e.openEnd()}var o=r.getVisibleFormElements();for(var l=0,s=o.length;l<s;l++){var d=o[l];if(d.isA("sap.ui.layout.form.SemanticFormElement")&&!d._getEditable()){this.renderSemanticElement(e,t,d)}else{this.renderElement(e,t,d)}}if(i){e.close("div")}e.close("section")};l.renderElement=function(e,t,r){var i=r.getLabelControl();e.openStart("div",r);e.class("sapUiFormElement");if(i){e.class("sapUiFormElementLbl")}e.openEnd();if(i){e.renderControl(i)}var n=r.getFieldsForRendering();if(n&&n.length>0){for(var a=0,o=n.length;a<o;a++){var l=n[a];e.renderControl(l)}}e.close("div")};l.renderSemanticElement=function(e,t,r){this.renderElement(e,t,r)};l.renderTitle=function(e,t,r,i,n,o){if(t){if(typeof t!=="string"&&t.getLevel()!=a.Auto){n=t.getLevel()}if(!n){n="H5"}if(typeof t!=="string"){e.openStart(n.toLowerCase(),t);if(t.getTooltip_AsString()){e.attr("title",t.getTooltip_AsString())}if(t.getEmphasized()){e.class("sapUiFormTitleEmph")}}else{e.openStart(n.toLowerCase(),o+"--title")}e.class("sapUiFormTitle");e.class("sapUiFormTitle"+n);if(i&&r){e.class("sapUiFormTitleExpandable")}e.openEnd();if(i&&r){e.renderControl(r)}if(typeof t==="string"){t.split(/\n/).forEach(function(t,r){if(r>0){e.voidStart("br").voidEnd()}e.text(t)})}else{var l=t.getIcon();if(l){var s=[];var d={title:null};d["id"]=t.getId()+"-ico";e.icon(l,s,d)}t.getText().split(/\n/).forEach(function(t,r){if(r>0){e.voidStart("br").voidEnd()}e.text(t)})}e.close(n.toLowerCase())}};l.renderHeader=function(e,t,r,i,n,a,o){if(t){e.renderControl(t)}else{this.renderTitle(e,r,i,n,a,o)}};l.writeAccessibilityStateContainer=function(e,t){var r={};var n=t.getTitle();var a=t.getToolbar();if(a){if(!t.getAriaLabelledBy()||t.getAriaLabelledBy().length==0){var o=i.getToolbarTitle(a);r["labelledby"]={value:o,append:true}}}else if(n){var l="";if(typeof n=="string"){l=t.getId()+"--title"}else{l=n.getId()}r["labelledby"]={value:l,append:true}}if(r["labelledby"]||t.getAriaLabelledBy().length>0){r["role"]="form"}e.accessibilityState(t,r)};return l},true);
//# sourceMappingURL=FormLayoutRenderer.js.map