/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/library","sap/ui/core/Control","./FormattedTextAnchorGenerator","./FormattedTextRenderer","sap/base/Log","sap/base/security/URLListValidator","sap/base/security/sanitizeHTML","sap/ui/util/openWindow","sap/ui/core/Core"],function(e,t,r,i,s,n,a,o,l,u){"use strict";var p=e.LinkConversion,c=t.TextDirection,f=t.TextAlign;var g=r.extend("sap.m.FormattedText",{metadata:{library:"sap.m",properties:{htmlText:{type:"string",group:"Misc",defaultValue:""},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},convertLinksToAnchorTags:{type:"sap.m.LinkConversion",group:"Behavior",defaultValue:p.None},convertedLinksDefaultTarget:{type:"string",group:"Behavior",defaultValue:"_blank"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:c.Inherit},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:f.Begin}},aggregations:{controls:{type:"sap.m.Link",multiple:true,singularName:"control"}}},renderer:s});var h={ATTRIBS:{style:1,class:1,"a::href":1,"a::target":1,dir:1},ELEMENTS:{a:{cssClass:"sapMLnk"},abbr:1,bdi:1,blockquote:1,br:1,cite:1,code:1,em:1,h1:{cssClass:"sapMTitle sapMTitleStyleH1"},h2:{cssClass:"sapMTitle sapMTitleStyleH2"},h3:{cssClass:"sapMTitle sapMTitleStyleH3"},h4:{cssClass:"sapMTitle sapMTitleStyleH4"},h5:{cssClass:"sapMTitle sapMTitleStyleH5"},h6:{cssClass:"sapMTitle sapMTitleStyleH6"},p:1,pre:1,strong:1,span:1,u:1,dl:1,dt:1,dd:1,ol:1,ul:1,li:1}},d={ATTRIBS:{"a::href":1,"a::target":1},ELEMENTS:{a:{cssClass:"sapMLnk"},br:1,em:1,strong:1,u:1}};g.prototype._renderingRules=h;g.prototype.init=function(){};function T(e){var t=window["parseCssDeclarations"];if(!t){return null}var r=[];t(e,{declaration:function(e,t){var i=e.toLowerCase();if(i=="position"){return}r.push(e+": "+t.join(" "))}});return r.length>0?r.join("; ")+";":null}function y(e){return e.split(" ").filter(function(e){return e.trim().startsWith("sapTheme")}).join(" ")}function m(e,t){var r;var i,s,o=e==="a";var l=this._renderingRules.ELEMENTS[e].cssClass||"";for(var u=0;u<t.length;u+=2){i=t[u];s=t[u+1];if(!this._renderingRules.ATTRIBS[i]&&!this._renderingRules.ATTRIBS[e+"::"+i]){r="FormattedText: <"+e+"> with attribute ["+i+'="'+s+'"] is not allowed';n.warning(r,this);t[u+1]=null;continue}if(i=="href"){if(!a.validate(s)){n.warning("FormattedText: incorrect href attribute:"+s,this);t[u+1]="#";o=false}}if(i=="target"){o=false}if(i=="style"){t[u+1]=T(s)}if(i.toLowerCase()=="class"){t[u+1]=(l+" "+y(s)).trim();l=""}}if(o){t.push("target");t.push("_blank")}if(l){t.push("class");t.push(l)}return t}function v(e,t){if(this._renderingRules.ELEMENTS[e]){return m.call(this,e,t)}else{var r="<"+e+"> is not allowed";n.warning(r,this)}}function R(e){return o(e,{tagPolicy:v.bind(this),uriRewriter:function(e){if(a.validate(e)){return e}}})}function L(t){t.preventDefault();var r=u.byId(t.currentTarget.id);if(r&&r.isA("sap.m.Link")&&r.getAccessibleRole()===e.LinkAccessibleRole.Button){return}l(t.currentTarget.href,t.currentTarget.target)}g.prototype.onAfterRendering=function(){this.$().find("a").on("click",L);var e=this.getControls(),t;e.forEach(function(e,r){t=this.getDomRef("$"+r);if(t){t.replaceWith(e.getDomRef())}else{e.getDomRef().style.display="none"}}.bind(this))};g.prototype.onBeforeRendering=function(){this.$().find("a").off("click",L)};g.prototype._getDisplayHtml=function(){var e=this.getHtmlText(),t=this.getConvertLinksToAnchorTags();if(t===p.None){return e}e=i.generateAnchors(e,t,this.getConvertedLinksDefaultTarget());return R.call(this,e)};g.prototype.setHtmlText=function(e){return this.setProperty("htmlText",R.call(this,e))};g.prototype._setUseLimitedRenderingRules=function(e){this._renderingRules=e?d:h};g.prototype.getFocusDomRef=function(){return this.getDomRef()&&this.getDomRef().querySelector("a")};return g});
//# sourceMappingURL=FormattedText.js.map