/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert","sap/base/config","sap/base/Event","sap/base/Log","sap/base/i18n/Formatting","sap/base/i18n/Localization","sap/base/util/Version","sap/ui/base/DesignTime","sap/ui/base/Object","sap/ui/core/AnimationMode","sap/ui/core/ControlBehavior","sap/ui/core/getCompatibilityVersion","sap/ui/core/Locale","sap/ui/core/Supportability","sap/ui/core/Theming","sap/ui/security/Security"],function(e,t,n,a,i,r,o,s,u,g,l,c,p,m,f,d){"use strict";var y=new o("1.122.0");var C;var b;var h;function A(){h=h||{__count:0};h.__count++;return h}function T(){if(h&&--h.__count===0){var e=h;delete h.__count;h=undefined;b?.fireLocalizationChanged(e)}}var S=u.extend("sap.ui.core.Configuration",{constructor:function(){u.call(this);a.error("Configuration is designed as a singleton and should not be created manually! "+"Please require 'sap/ui/core/Configuration' instead and use the module export directly without using 'new'.");return S}});Object.assign(S,{getVersion:function(){return y},getCompatibilityVersion:c,getTheme:f.getTheme,setTheme:function(e){f.setTheme(e);return this},getLanguage:r.getLanguage,setLanguage:function(){r.setLanguage.apply(r,arguments);return S},getLanguageTag:function(){return r.getLanguageTag().toString()},getSAPLogonLanguage:r.getSAPLogonLanguage,getTimezone:r.getTimezone,setTimezone:function(){r.setTimezone.apply(r,arguments);return S},getCalendarType:i.getCalendarType,getCalendarWeekNumbering:i.getCalendarWeekNumbering,getRTL:r.getRTL,setRTL:function(){r.setRTL.apply(r,arguments);return S},getLocale:function(){var e=r.getLanguageTag();return p._getCoreLocale(e)},setCalendarType:function(e){i.setCalendarType.apply(i,arguments);return this},setCalendarWeekNumbering:function(e){i.setCalendarWeekNumbering.apply(i,arguments);return this},getFormatLocale:function(){return i.getLanguageTag().toString()},setFormatLocale:function(e){i.setLanguageTag.apply(i,arguments);return this},getLanguagesDeliveredWithCore:r.getLanguagesDeliveredWithCore,getSupportedLanguages:r.getSupportedLanguages,getAccessibility:l.isAccessibilityEnabled,getAutoAriaBodyRole:function(){return t.get({name:"sapUiAutoAriaBodyRole",type:t.Type.Boolean})},getAnimation:function(){var e=S.getAnimationMode();return e!==S.AnimationMode.minimal&&e!==S.AnimationMode.none},getAnimationMode:l.getAnimationMode,setAnimationMode:l.setAnimationMode,getFiori2Adaptation:function(){var e=t.get({name:"sapUiXxFiori2Adaptation",type:t.Type.StringArray,external:true}),n;if(e.length===0||e.length===1&&e[0]==="false"){n=false}else if(e.length===1&&e[0]==="true"){n=true}return n===undefined?e:n},getDebug:m.isDebugModeEnabled,getInspect:m.isControlInspectorEnabled,getOriginInfo:m.collectOriginInfo,getNoDuplicateIds:function(){return t.get({name:"sapUiNoDuplicateIds",type:t.Type.Boolean,defaultValue:true,external:true})},getUIDPrefix:function(){var e=sap.ui.require("sap/ui/base/ManagedObjectMetadata");return e.getUIDPrefix()},getDesignMode:s.isDesignModeEnabled,getSuppressDeactivationOfControllerCode:s.isControllerCodeDeactivationSuppressed,getControllerCodeDeactivated:s.isControllerCodeDeactivated,getApplication:function(){return t.get({name:"sapUiApplication",type:t.Type.String,external:true})},getRootComponent:function(){return t.get({name:"sapUiRootComponent",type:t.Type.String})},getAppCacheBuster:function(){return t.get({name:"sapUiAppCacheBuster",type:t.Type.StringArray,external:true,freeze:true})},getAppCacheBusterMode:function(){return t.get({name:"sapUiXxAppCacheBusterMode",type:t.Type.String,defaultValue:"sync",external:true,freeze:true})},getDisableCustomizing:function(){return t.get({name:"sapUiXxDisableCustomizing",type:t.Type.Boolean})},getManifestFirst:function(){return t.get({name:"sapUiManifestFirst",type:t.Type.Boolean,external:true})},getFlexibilityServices:function(){var e=sap.ui.require("sap/ui/fl/initial/_internal/FlexConfiguration");var n;if(e){n=e.getFlexibilityServices()}else{const e=[{url:"/sap/bc/lrep",connector:"LrepConnector"}];n=t.get({name:"sapUiFlexibilityServices",type:t=>{if(t&&typeof t==="string"){if(t[0]==="/"){e[0].url=t;t=e}else{t=JSON.parse(t)}}return t||[]},defaultValue:e,external:true})}return n},getFormatSettings:function(){return C},getFrameOptions:d.getFrameOptions,getWhitelistService:d.getAllowlistService,getAllowlistService:d.getAllowlistService,getFileShareSupport:function(){return t.get({name:"sapUiFileShareSupport",type:t.Type.String,defaultValue:undefined})},getStatistics:S.getStatisticsEnabled,getStatisticsEnabled:m.isStatisticsEnabled,getNoNativeScroll:function(){return false},getActiveTerminologies:r.getActiveTerminologies,getSecurityTokenHandlers:d.getSecurityTokenHandlers,setSecurityTokenHandlers:d.setSecurityTokenHandlers,applySettings:function(t){function n(e,t){var i,r;for(i in t){r="set"+i.slice(0,1).toUpperCase()+i.slice(1);if(i==="formatSettings"&&C){n(C,t[i])}else if(typeof e[r]==="function"){e[r](t[i])}else{a.warning("Configuration.applySettings: unknown setting '"+i+"' ignored")}}}e(typeof t==="object","mSettings must be an object");A();n(S,t);T();return this},setCore:function(e){b=e}});S.AnimationMode=g;function L(e,t){if(!e){throw new Error(t)}}var D=u.extend("sap.ui.core.Configuration.FormatSettings",{constructor:function(){u.call(this);this.mSettings={}},getFormatLocale:function(){var e=i.getLanguageTag();return p._getCoreLocale(e)},_set:i._set,getCustomUnits:i.getCustomUnits,setCustomUnits:function(){i.setCustomUnits.apply(i,arguments);return this},addCustomUnits:function(){i.addCustomUnits.apply(i,arguments);return this},setUnitMappings:function(){i.setUnitMappings.apply(i,arguments);return this},addUnitMappings:function(){i.addUnitMappings.apply(i,arguments);return this},getUnitMappings:i.getUnitMappings,getDatePattern:i.getDatePattern,setDatePattern:function(){i.setDatePattern.apply(i,arguments);return this},getTimePattern:i.getTimePattern,setTimePattern:function(){i.setTimePattern.apply(i,arguments);return this},getNumberSymbol:i.getNumberSymbol,setNumberSymbol:function(){i.setNumberSymbol.apply(i,arguments);return this},getCustomCurrencies:i.getCustomCurrencies,setCustomCurrencies:function(){i.setCustomCurrencies.apply(i,arguments);return this},addCustomCurrencies:function(){i.addCustomCurrencies.apply(i,arguments);return this},setFirstDayOfWeek:function(e){L(typeof e=="number"&&e>=0&&e<=6,"iValue must be an integer value between 0 and 6");i._set("weekData-firstDay",e);return this},_setDayPeriods:i._setDayPeriods,getLegacyDateFormat:i.getABAPDateFormat,setLegacyDateFormat:function(){i.setABAPDateFormat.apply(i,arguments);return this},getLegacyTimeFormat:i.getABAPTimeFormat,setLegacyTimeFormat:function(){i.setABAPTimeFormat.apply(i,arguments);return this},getLegacyNumberFormat:i.getABAPNumberFormat,setLegacyNumberFormat:function(){i.setABAPNumberFormat.apply(i,arguments);return this},setLegacyDateCalendarCustomizing:function(){i.setCustomIslamicCalendarData.apply(i,arguments);return this},getLegacyDateCalendarCustomizing:i.getCustomIslamicCalendarData,setTrailingCurrencyCode:function(){i.setTrailingCurrencyCode.apply(i,arguments);return this},getTrailingCurrencyCode:i.getTrailingCurrencyCode,getCustomLocaleData:i.getCustomLocaleData});C=new D(this);r.attachChange(function(e){if(!h&&b){b.fireLocalizationChanged(n.getParameters(e))}else if(h){Object.assign(h,n.getParameters(e))}});i.attachChange(function(e){const t=n.getParameters(e);Object.keys(e).forEach(e=>{if(["ABAPDateFormat","ABAPTimeFormat","ABAPNumberFormat"].includes(e)){t[e.replace("ABAP","legacy")]=t[e];delete t[e]}else if(e==="customIslamicCalendarData"){t["legacyDateCalendarCustomizing"]=t[e];delete t[e]}});if(!h&&b){b.fireLocalizationChanged(t)}else if(h){Object.assign(h,t)}});return S});
//# sourceMappingURL=Configuration.js.map