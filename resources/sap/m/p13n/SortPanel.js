/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./QueryPanel","sap/m/Text","sap/m/SegmentedButton","sap/m/SegmentedButtonItem","sap/ui/layout/Grid","sap/ui/layout/GridData"],function(e,t,r,n,o,a){"use strict";var s=e.extend("sap.m.p13n.SortPanel",{metadata:{properties:{title:{type:"string",defaultValue:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("p13n.DEFAULT_TITLE_SORT")}},library:"sap.m"},renderer:{apiVersion:2}});s.prototype.PRESENCE_ATTRIBUTE="sorted";s.prototype.CHANGE_REASON_SORTORDER="sortorder";s.prototype._createRemoveButton=function(){var t=e.prototype._createRemoveButton.apply(this,arguments);t.setLayoutData(new a({span:"XL3 L3 M3 S4"}));return t};s.prototype._createOrderSwitch=function(e,t){var o=new r({enabled:e?true:false,layoutData:new a({span:"XL2 L2 M2 S3"}),items:[new n({key:"asc",icon:"sap-icon://sort-ascending"}),new n({key:"desc",icon:"sap-icon://sort-descending"})],select:function(e){var t=e.getParameter("key");var r=e.getSource().getParent().getContent()[2];r.setText(this._getSortOrderText(t==="desc"));var n=e.oSource.getParent().getContent()[0].getSelectedItem().getKey();this._changeOrder(n,t=="desc")}.bind(this)});o.setSelectedItem(t?o.getItems()[1]:o.getItems()[0]);return o};s.prototype._createSortOrderText=function(e,r){return new t({layoutData:new a({span:"XL3 L3 M3 S3",visibleS:false}),text:this._getSortOrderText(r)}).addStyleClass("sapUiTinyMarginTop")};s.prototype._createQueryRowGrid=function(e){var t=this._createKeySelect(e.name);var r=this._createOrderSwitch(e.name,e.descending);var n=this._createSortOrderText(e.name,e.descending);return new o({containerQuery:true,defaultSpan:"XL4 L4 M4 S5",content:[t,r,n]}).addStyleClass("sapUiTinyMargin")};s.prototype._getPlaceholderText=function(){return this._getResourceText("p13n.SORT_PLACEHOLDER")};s.prototype._getRemoveButtonTooltipText=function(){return this._getResourceText("p13n.SORT_REMOVEICONTOOLTIP")};s.prototype._getRemoveButtonAnnouncementText=function(){return this._getResourceText("p13n.SORT_REMOVEICONANNOUNCE")};s.prototype._selectKey=function(t){e.prototype._selectKey.apply(this,arguments);var r=t.getParent().getParent();var n=t.getSelectedKey();var o=r.getContent()[0].getContent();o[1].setEnabled(!!n);var a=o[1].getSelectedKey()==="desc";this._changeOrder(n,a)};s.prototype._getSortOrderText=function(e){return e?this._getResourceText("p13n.SORT_DESCENDING"):this._getResourceText("p13n.SORT_ASCENDING")};s.prototype._changeOrder=function(e,t){var r=this._getP13nModel().getProperty("/items").filter(function(t){return t.name===e});if(r.length>0){r[0].descending=t;this.fireChange({reason:this.CHANGE_REASON_SORTORDER,item:r[0]})}};return s});
//# sourceMappingURL=SortPanel.js.map