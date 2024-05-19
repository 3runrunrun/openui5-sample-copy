/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/AnimationMode","sap/ui/core/ControlBehavior","sap/ui/core/Lib","sap/ui/core/library","sap/ui/core/IconPool"],function(e,t,i,r){"use strict";var a=r.Orientation;var o=i.getResourceBundleFor("sap.ui.layout");var n={apiVersion:2};n.render=function(i,r){var o=r.getOrientation()===a.Horizontal,n=o?"sapUiLoSplitterH":"sapUiLoSplitterV";i.openStart("div",r).class("sapUiLoSplitter").class(n);if(!r._liveResize&&t.getAnimationMode()!==e.none&&t.getAnimationMode()!==e.minimal){i.class("sapUiLoSplitterAnimated")}i.style("width",r.getWidth()).style("height",r.getHeight()).openEnd();this.renderContentAreas(i,r);i.close("div")};n.renderContentAreas=function(e,t){var i=t.getId(),r=t.getOrientation()===a.Horizontal,o=r?"width":"height",s=t._getContentAreas(),p=s.length,l=t._calculatedSizes;s.forEach(function(a,s){var c=a.getLayoutData(),d="0";if(l[s]){d=l[s]+"px"}else if(c){d=c.getSize()}e.openStart("section",i+"-content-"+s).style(o,d).class("sapUiLoSplitterContent").openEnd();e.renderControl(a);e.close("section");if(s<p-1){n.renderBar(e,r,t.getId()+"-splitbar-"+s,"sapUiLoSplitterBar")}});e.openStart("div",i+"-overlay").class("sapUiLoSplitterOverlay").openEnd();n.renderBar(e,r,i+"-overlayBar","sapUiLoSplitterOverlayBar");e.close("div")};n.renderBar=function(e,t,i,r){e.openStart("div",i).attr("role","separator").attr("title",o.getText("SPLITTER_MOVE")).attr("aria-orientation",t?"vertical":"horizontal").attr("tabindex",0).class(r).openEnd();n.renderBarGripAndDecorations(e,t);e.close("div")};n.renderBarGripAndDecorations=function(e,t){var i=t?"sap-icon://vertical-grip":"sap-icon://horizontal-grip";e.openStart("div").class("sapUiLoSplitterBarDecorationBefore").openEnd().close("div");e.openStart("div").class("sapUiLoSplitterBarGrip").openEnd().icon(i,["sapUiLoSplitterBarGripIcon"]).close("div");e.openStart("div").class("sapUiLoSplitterBarDecorationAfter").openEnd().close("div")};return n},true);
//# sourceMappingURL=SplitterRenderer.js.map