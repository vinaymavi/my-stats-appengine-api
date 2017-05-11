/**
 * File to listen and send communication to extension.
 */
"use strict";
var myExt = (function () {
    var myExt = {};

    function getDeviceId() {
        var dfd = jQuery.Deferred();
        var msg = {
            "from": "WEB_PAGE",
            "action": "send_device_id"
        };
        window.postMessage(JSON.stringify(msg), '*');
        window.addEventListener("message", function (event) {
            try {
                var data = JSON.parse(event.data);
                if (data.from === "EXTENSION") {
                    dfd.resolve(data['app_config']);
                }
            } catch (e) {
                console.warn(e);
            }
        });

        /*Resolve if extension not exist or not getting response till 1.5 sec*/
        setTimeout(function () {
            dfd.resolve({});
        }, myConfig.EXTENSION_RESPONSE_TIME_OUT);
        return dfd.promise();
    }

    function hasExtension() {
        /*TODO this function should send by communicating extension.*/
        if (typeof chrome === "undefined" || typeof chrome.runtime === "undefined") {
            return false;
        } else {
            return true;
        }
    }

    myExt.getDeviceId = getDeviceId;
    myExt.hasExtension = hasExtension;

    return myExt;
}());


