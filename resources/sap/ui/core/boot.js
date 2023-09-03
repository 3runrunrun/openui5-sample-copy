/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/config/_Configuration","sap/base/util/Deferred","sap/ui/core/boot/initDOM","sap/ui/core/boot/loadManifest","sap/ui/core/boot/onInit"],function(e,t,n,r,o){"use strict";var i=e.getLevel();e.setLevel(e.Level.WARNING);e.warning("sap-ui-boot.js: This is a private module, its API must not be used in production and is subject to change!");e.setLevel(i);var u=false;var a=new n;var s;var c={ready:function(e){if(e&&u){e()}else{a.promise.then(e)}return a.promise}};var f=r.run(c);var l=t.getWritableBootInstance();delete t.getWritableBootInstance;function p(e){e=e||[];var t=new Promise(function(t,n){sap.ui.require(e,function(){t(Array.from(arguments))},n)});return t}function v(e,t){return Promise.all(e.map(function(e){return e.run(t)}))}o().then(function(e){s=e;return p(s.preBoot)}).then(function(e){return v(e,l)}).then(function(){return p(s.boot)}).then(function(e){return v(e,c)}).then(function(){return p(s.postBoot)}).then(function(e){return Promise.all([v(e),f])}).then(function(){a.resolve();u=true}).catch(a.reject);return c},true);
//# sourceMappingURL=boot.js.map