/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/deepExtend","sap/base/util/isEmptyObject","sap/base/util/ObjectPath","sap/ui/base/Object","sap/ui/test/Opa"],function(e,a,t,i,n,s){"use strict";var r=n.extend("sap.ui.test.PageObjectFactory");var o={};r.create=function(a,i){var n={},s;for(var c in a){if(a.hasOwnProperty(c)&&t(n[c])){s=a[c].namespace||"sap.ui.test.opa.pageObject";if(o[s]&&!t(o[s][c])){e.error("Opa5 Page Object namespace clash: You have loaded multiple page objects with the same name '"+s+"."+c+"'. "+"To prevent override, specify the namespace parameter.")}n[c]=r._createPageObject({name:c,baseClass:a[c].baseClass||i,namespace:s,view:v(a[c]),actions:a[c].actions,assertions:a[c].assertions});if(!o[s]){o[s]={}}o[s][c]=n[c]}}return n};r._createPageObject=function(e){var a={};["actions","assertions"].forEach(function(t){var i=c(t,e);var n=new i;p(n,e.view);b(n,t);u(n,t,e.name);a[t]=n});return a};function c(e,a){var t=f(a.namespace,a.name,e);var i=a.baseClass.extend(t);for(var n in a[e]){if(a[e].hasOwnProperty(n)){i.prototype[n]=a[e][n]}}return i}function f(e,a,t){var i=e+"."+a+"."+t;return i}function p(e,i){if(!t(i)&&e.waitFor){var n=e.waitFor;e.waitFor=function(e){return n.call(this,a({},i,e))}}}function u(e,a,t){if(a==="actions"){s.config.arrangements[t]=e;s.config.actions[t]=e}else if(a==="assertions"){s.config.assertions[t]=e}}function b(e,a){if(s.config.testLibs){for(var i in s.config.testLibs){if(s.config.testLibBase&&!t(s.config.testLibBase[i])){var n=Object.getPrototypeOf(e);n[i]={};var r=s.config.testLibBase[i][a];if(r){for(var o in r){if(r.hasOwnProperty(o)){n[i][o]=r[o].bind(e)}}}}}}}function v(e){var a={};["viewName","viewId"].forEach(function(t){if(e[t]){a[t]=e[t]}});return a}return r});
//# sourceMappingURL=PageObjectFactory.js.map