/**
 * File to listen and send communication to extension.
 */
var myExt = (function () {
    var myExt = {};
    var EXTENSION_ID = "hlaejfnjkhmmhldkfcnollanjnfgoodn";

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
        setTimeout(function () {
            dfd.resolve({});
        }, 1500)
        return dfd.promise();
    }

    function hasExtension() {
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


