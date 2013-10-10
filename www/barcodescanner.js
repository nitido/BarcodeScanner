/**
 * cordova is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) Matt Kane 2010
 * Copyright (c) 2011, IBM Corporation
 */

    var ScannerLoader = function (require, exports, module) {

        var exec = require("cordova/exec");

        /**
         * Constructor.
         *
         * @returns {BarcodeScanner}
         */
        function BarcodeScanner() {

            /**
             * Encoding constants.
             *
             * @type Object
             */
            this.Encode = {
                TEXT_TYPE: "TEXT_TYPE",
                EMAIL_TYPE: "EMAIL_TYPE",
                PHONE_TYPE: "PHONE_TYPE",
                SMS_TYPE: "SMS_TYPE"
                //  CONTACT_TYPE: "CONTACT_TYPE",  // TODO:  not implemented, requires passing a Bundle class from Javascript to Java
                //  LOCATION_TYPE: "LOCATION_TYPE" // TODO:  not implemented, requires passing a Bundle class from Javascript to Java
            };
        };

        /**
         * Read code from scanner.
         *
         * @param {Function} successCallback This function will recieve a result object: {
         *        text : '12345-mock',    // The code that was scanned.
         *        format : 'FORMAT_NAME', // Code format.
         *        cancelled : true/false, // Was canceled.
         *    }
         * @param {Function} errorCallback
         */
        BarcodeScanner.prototype.scan = function (successCallback, errorCallback) {
            if (errorCallback == null) {
                errorCallback = function () {
                };
            }

            if (typeof errorCallback != "function") {
                console.log("BarcodeScanner.scan failure: failure parameter not a function");
                return;
            }

            if (typeof successCallback != "function") {
                console.log("BarcodeScanner.scan failure: success callback parameter must be a function");
                return;
            }

            exec(successCallback, errorCallback, 'BarcodeScanner', 'scan', []);
        };

        //-------------------------------------------------------------------
        BarcodeScanner.prototype.encode = function (type, data, successCallback, errorCallback, options) {
            if (errorCallback == null) {
                errorCallback = function () {
                };
            }

            if (typeof errorCallback != "function") {
                console.log("BarcodeScanner.encode failure: failure parameter not a function");
                return;
            }

            if (typeof successCallback != "function") {
                console.log("BarcodeScanner.encode failure: success callback parameter must be a function");
                return;
            }

            exec(successCallback, errorCallback, 'BarcodeScanner', 'encode', [
                {"type": type, "data": data, "options": options}
            ]);
        };

        var barcodeScanner = new BarcodeScanner();
        module.exports = barcodeScanner;

    }

    ScannerLoader(require, exports, module);

    cordova.define("cordova/plugin/BarcodeScanner", ScannerLoader);
    
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
                SMS_TYPE: "SMS_TYPE",
                CONTACT_TYPE: "CONTACT_TYPE",
                LOCATION_TYPE: "LOCATION_TYPE"
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




