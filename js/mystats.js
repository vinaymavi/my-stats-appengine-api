/**
 * main script to make ajax requests, handle responses and create graphs.
 */
/*TODO need to optimise this code.*/
"use strict";
var myStats = (function () {
    var myStats = {};
    var AJAX_MSG = '#ajax-loading';
    var EVENT_APPLICATION_LOADED = jQuery.Event(myConfig.EVENT_APPLICATION_LOADED_NAME);
    var fbSdk,
        googleEndPointSdk;

    myStats.ajaxStart = function () {
        jQuery(AJAX_MSG).removeClass('invisible');
    };
    myStats.ajaxStop = function () {
        jQuery(AJAX_MSG).addClass('invisible');
    };
    myStats.init = init;

    function init() {
        jQuery('body').on(myConfig.EVENT_FB_SDK_LOAD_NAME, function (e) {
            console.log('facebook sdk loaded');
            fbSdk = true;
            triggerAppReady();
        }).on(myConfig.EVENT_GOOGLE_END_POINT_SDK_LOAD_NAME, function (e) {
            console.log('google endpoint sdk loaded');
            googleEndPointSdk = true;
            triggerAppReady();
        }).on(myConfig.EVENT_AJAX_START_NAME, myStats.ajaxStart).on(myConfig.EVENT_AJAX_END_NAME, myStats.ajaxStop);


    }

    /**
     * Trigger application ready event when all sdk loaded.
     */
    function triggerAppReady() {
        if (fbSdk && googleEndPointSdk) {
            jQuery('body').trigger(EVENT_APPLICATION_LOADED);
        }
    }

    return myStats;
}());

$(document).ready(function () {
    myStats.init();
});