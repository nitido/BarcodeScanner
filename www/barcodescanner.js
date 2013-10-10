    /**
    * PhoneGap/Cordova is available under *either* the terms of the modified BSD license *or* the
    * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
     *
     * Copyright (c) Matt Kane 2010
     * Copyright (c) 2010, IBM Corporation
     */
    NIM.namespace("plugins");
    
    NIM.plugins.BarcodeScanner = (function() {

    //"use strict";
    
        return {
            Encode: {
                TEXT_TYPE: "TEXT_TYPE",
                EMAIL_TYPE: "EMAIL_TYPE",
                PHONE_TYPE: "PHONE_TYPE",
                SMS_TYPE: "SMS_TYPE"
                //CONTACT_TYPE: "CONTACT_TYPE",
                //LOCATION_TYPE: "LOCATION_TYPE"
            },
    
            scan: function(success, fail, options) {
                function successWrapper(result) {
                    result.cancelled = (result.cancelled === 1);
                    success.call(null, result);
                }
    
                if(!fail) {
                    fail = function() {};
                }
    
                if(typeof fail !== "function") {
                    return;
                }
    
                if(typeof success !== "function") {
                    fail("success callback parameter must be a function");
                    return;
                }
    
                if(typeof options === "undefined" || null === options ) {
                    options = [];
                }
    
                return cordova.exec(successWrapper, fail, "BarcodeScanner", "scan", options);
            },
    
            encode: function(type, data, success, fail, options) {
                if(!fail) {
                    fail = function() {};
                }
    
                if(typeof fail !== "function") {
                    return;
                }
    
                if(typeof success !== "function") {
                    fail("success callback parameter must be a function");
                    return;
                }
    
                if(typeof options === "undefined" || null === options ) {
                    options = [];
                }
    
                return cordova.exec(success, fail, "BarcodeScanner", "encode", [{
                    type: type,
                    data: data,
                    options: options
                }]);
            }
        };
    
    })();




