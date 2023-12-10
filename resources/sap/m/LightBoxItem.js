/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/library","sap/ui/core/Element","sap/m/Image","sap/m/Title","sap/m/Label"],function(t,e,a,i,s,r){"use strict";var g=t.LightBoxLoadingStates;var n=e.OpenState;var o=e.TitleLevel;var p=a.extend("sap.m.LightBoxItem",{metadata:{library:"sap.m",properties:{imageSrc:{type:"sap.ui.core.URI",group:"Appearance",multiple:false,defaultValue:""},alt:{type:"string",group:"Appearance",multiple:false,defaultValue:""},title:{type:"string",group:"Appearance",multiple:false,defaultValue:""},subtitle:{type:"string",group:"Appearance",multiple:false,defaultValue:""}},aggregations:{_image:{type:"sap.m.Image",multiple:false,visibility:"hidden"},_title:{type:"sap.m.Title",multiple:false,visibility:"hidden"},_subtitle:{type:"sap.m.Label",multiple:false,visibility:"hidden"}}}});p.prototype.init=function(){this._createNativeImage();this.setAggregation("_image",new i({decorative:false,densityAware:false}),true);this.setAggregation("_title",new s({level:o.H2,wrapping:false}),true);this.setAggregation("_subtitle",new r({wrapping:false}),true)};p.prototype._createNativeImage=function(){var t=this;this._sImageState=g.Loading;this._oImage=new window.Image;this._oImage.onload=function(){if(this.complete&&t._sImageState===g.Loading){t._setImageState(g.Loaded)}};this._oImage.onerror=function(){t._setImageState(g.Error)}};p.prototype.exit=function(){this._oImage=null};p.prototype._setImageState=function(t){if(t!==this._sImageState){this._sImageState=t;if(this.getParent()){this.getParent()._imageStateChanged(t)}}};p.prototype._getImageState=function(){return this._sImageState};p.prototype._getNativeImage=function(){return this._oImage};p.prototype.setImageSrc=function(t){var e=this.getAggregation("_image"),a=this.getParent();if(this.getImageSrc()===t){return this}this._sImageState=g.Loading;if(a&&a._oPopup.getOpenState()===n.OPEN){this._oImage.src=t}this.setProperty("imageSrc",t,false);e.setSrc(t);return this};p.prototype.setAlt=function(t){var e=this.getAggregation("_image");this.setProperty("alt",t,false);e.setAlt(t);return this};p.prototype.setTitle=function(t){var e=this.getAggregation("_title");this.setProperty("title",t,false);e.setText(t);return this};p.prototype.setSubtitle=function(t){var e=this.getAggregation("_subtitle");this.setProperty("subtitle",t,false);e.setText(t);return this};return p});
//# sourceMappingURL=LightBoxItem.js.map