/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./InputBase","./library","sap/ui/core/LabelEnablement","./ComboBoxTextFieldRenderer"],function(e,t,o,r){"use strict";var i=e.extend("sap.m.ComboBoxTextField",{metadata:{library:"sap.m",properties:{maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},showButton:{type:"boolean",group:"Appearance",defaultValue:true}}},renderer:r});var n=sap.ui.getCore().getLibraryResourceBundle("sap.m");i.prototype.init=function(){e.prototype.init.apply(this,arguments);this._oArrowIcon=this.addEndIcon({id:this.getId()+"-arrow",src:"sap-icon://slim-arrow-down",noTabStop:true,alt:n.getText("COMBOBOX_BUTTON"),decorative:false})};i.prototype.getArrowIcon=function(){return this._oArrowIcon};i.prototype.getIcon=i.prototype.getArrowIcon;i.prototype.toggleIconPressedStyle=function(t){this.toggleStyleClass(e.ICON_PRESSED_CSS_CLASS,t)};i.prototype.onBeforeRendering=function(){e.prototype.onBeforeRendering.apply(this,arguments);var t=o.getReferencingLabels(this)||[],r=this.getArrowIcon();r.setVisible(this.getShowButton());t.forEach(function(e){if(r.getAriaLabelledBy().indexOf(e)===-1){r.addAssociation("ariaLabelledBy",e,true)}},this)};i.prototype.getOpenArea=function(){var e=this.getArrowIcon().getDomRef();return e?e.parentNode:e};i.prototype.onsapenter=function(t){e.prototype.onsapenter.apply(this,arguments);if(!this.getEnabled()||!this.getEditable()){return}this._bCheckDomValue&&t.setMarked();var o=this.getValue(),r=o.length;this.setValue(o);this.selectText(r,r)};i.prototype.getValue=function(){var e=this.getFocusDomRef();if(e){return e.value}return this.getProperty("value")};i.prototype.getDomRefForValueStateMessage=function(){return this.getDomRef()};i.prototype.getAccessibilityInfo=function(){var t=e.prototype.getAccessibilityInfo.apply(this,arguments);t.type=n.getText("ACC_CTR_TYPE_COMBO");return t};i.prototype.exit=function(){e.prototype.exit.apply(this,arguments);this._oArrowIcon=null};return i});
//# sourceMappingURL=ComboBoxTextField.js.map