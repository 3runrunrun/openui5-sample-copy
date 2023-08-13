/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(aScriptIncludes) {
	"use strict";
	//extract base URL from script tag
	var aScripts, i, sSrc, mMatch, sBaseUrl, oScriptTag,
		bCoreRequired = false;
	oScriptTag = document.getElementById("sap-ui-bootstrap");
	if (oScriptTag) {
		sSrc = oScriptTag.getAttribute("src");
		mMatch = sSrc.match(/^(?:[^?#]*\/)?resources\//i);
		if (mMatch) {
			sBaseUrl = mMatch[0];
		}
	}
	if (sBaseUrl == null) {
		aScripts = document.getElementsByTagName("script");
		for (i = 0; i < aScripts.length; i++) {
			sSrc = aScripts[i].getAttribute("src");
			if (sSrc) {
				mMatch = sSrc.match(/^([^?#]*\/)sap-ui-core\.js(?:[?#]|$)/i);
				if (mMatch) {
					sBaseUrl = mMatch[1];
					break;
				}
			}
		}
	}
	if (sBaseUrl == null) {
		throw new Error("sap-ui-core.js: could not identify script tag!");
	}
	for (i = 0; i < aScriptIncludes.length; i++) {
		sSrc = aScriptIncludes[i];
		if ( sSrc.indexOf("raw:") === 0 ) {
			sSrc = sBaseUrl + sSrc.slice(4);
			document.write("<script src=\"" + sSrc + "\"></script>");
		} else if ( sSrc.indexOf("require:") === 0 ) {
			sSrc = sSrc.slice(8);
			bCoreRequired = bCoreRequired || sSrc === "sap/ui/core/Core";
			document.write("<script>sap.ui.require([\"" + sSrc + "\"]);</script>"); // legacy-relevant
		}
	}
}([
	"raw:ui5loader.js",
	"raw:ui5loader-autoconfig.js",
	"raw:sap/ui/core/boot/_runBoot.js"
]));