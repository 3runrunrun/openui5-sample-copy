/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/core/Element","sap/ui/core/HTML","sap/m/Button","sap/m/Image","sap/m/PDFViewer","sap/m/Dialog","sap/m/IllustratedMessage","sap/m/IllustratedMessageType","sap/m/Carousel","sap/base/Log"],function(e,t,i,a,r,o,n,s,c,l,g){"use strict";var u=sap.ui.getCore().getLibraryResourceBundle("sap.m");var d={Png:"image/png",Bmp:"image/bmp",Jpeg:"image/jpeg",Gif:"image/gif",Txt:"text/plain",Pdf:"application/pdf",ChromePdf:"application/x-google-chrome-pdf",Mpeg:"video/mpeg",Mp4:"video/mp4",Quicktime:"video/quicktime",MsVideo:"video/x-msvideo"};var p=t.extend("sap.m.upload.FilePreviewDialog",{constructor:function(e){if(!e){return}this._oPreviewItem=e;this._oRichTextEditor=null;this._oDialog=null},open:function(){this._loadRichTextEditorDependency().then(function(e){this._oRichTextEditor=e}.bind(this)).catch(function(e){g.error(e)}).finally(function(){var e=this._oPreviewItem.getParent().getAggregation("items");if(!e||e.length===0){return}var t=this._createCarousel(this._oPreviewItem,e);this._oDialog=this._createDialog(t,e);if(this._oDialog){this._oDialog.open()}}.bind(this))},_loadRichTextEditorDependency:function(){return new Promise(function(t,i){e.loadLibrary("sap.ui.richtexteditor",{async:true}).then(function(){sap.ui.require(["sap/ui/richtexteditor/RichTextEditor"],function(e){t(e)},function(e){i(e)})}).catch(function(){i("RichTextEditor Control not available.")})})},_createCarousel:function(e,t){var a="";var n=this;var g=t.map(function(t){var l=t.getMediaType();var g=new s({illustrationType:c.NoData,title:t.getFileName(),description:"No preview available for this file.",enableVerticalResponsiveness:true});switch(l.toLowerCase()){case d.Png:case d.Bmp:case d.Jpeg:case d.Gif:{g=new r({src:t.getUrl()});break}case d.Txt:{if(n._oRichTextEditor){var u=new XMLHttpRequest;u.open("GET",t.getUrl(),false);u.send(null);var p=u.responseText;g=new n._oRichTextEditor({height:"100%",width:"100%",value:p,editable:false})}break}case d.Pdf:case d.ChromePdf:{g=new o({source:t.getUrl(),showDownloadButton:false});break}case d.Mpeg:case d.Mp4:case d.Quicktime:case d.MsVideo:{g=new i({content:"<video controls width='100%' height='100%' src='"+t.getUrl()+"'>"});break}default:break}a=t.getId()===e.getId()?g.getId():a;return g});var u=new l({showPageIndicator:true,pages:[g],activePage:a,height:"85vh",pageChanged:function(e){var i=g.findIndex(function(t){return t.sId===e.getParameter("newActivePageId")});var a=t[i].getFileName();e.getSource().getParent().setProperty("title",a)}});return u},_createDialog:function(e,t){var i=this;var r=this._getActiveUploadSetTableItem(e,t);var o=new n({title:r.getFileName(),content:e,horizontalScrolling:true,verticalScrolling:true,buttons:[new a({text:u.getText("UPLOAD_SET_TABLE_FILE_PREVIEW_DIALOG_DOWNLOAD"),press:function(){i._getActiveUploadSetTableItem(e,t).download(true)}}),new a({text:u.getText("UPLOAD_SET_TABLE_FILE_PREVIEW_DIALOG_CLOSE"),press:function(){i._oDialog.close()}})]});return o},_getActiveUploadSetTableItem:function(e,t){var i=e.getActivePage();var a=e.getPages();var r=a.findIndex(function(e){return e.sId===i});return t[r]}});return p});
//# sourceMappingURL=FilePreviewDialog.js.map