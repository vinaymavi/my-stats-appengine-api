/**
 * This is file to create http requests to server.
 */
"use strict";
var http = (function () {
    var http = {};
    var EVENT_GOOGLE_END_POINT_SDK_LOAD = jQuery.Event(myConfig.EVENT_GOOGLE_END_POINT_SDK_LOAD_NAME);
    var EVENT_AJAX_START = jQuery.Event(myConfig.EVENT_AJAX_START_NAME);
    var EVENT_AJAX_END = jQuery.Event(myConfig.EVENT_AJAX_END_NAME);

    /*
     * Private function.
     * */
    function registerUser(data) {
        var dfd = jQuery.Deferred();
        gapi.client.greeting.website_config.new_user(data).execute(function (resp) {
            console.log(resp);
            dfd.resolve(resp);
        });
        return dfd.promise();
    }

    function getWebsitesData(fb_id, statDate, endDate) {
        var dfd = jQuery.Deferred();
        jQuery('body').trigger(EVENT_AJAX_START);
        var data = {
            fb_id: fb_id,
            start_date: statDate,
            end_date: endDate
        };
        gapi.client.greeting.website_data.get_by_fbid(data).execute(function (resp) {
            console.log(resp);
            jQuery('body').trigger(EVENT_AJAX_END);
            dfd.resolve(resp);
        });
        return dfd.promise();
    }

    /**
     * setup http environment and trigger google endpoint load event.
     */
    function init() {
        jQuery('body').trigger(EVENT_GOOGLE_END_POINT_SDK_LOAD);
    }

    /*
     * Public properties
     * */
    http.init = init;
    http.registerUser = registerUser;
    http.getWebsitesData = getWebsitesData;
    return http;
}());
/**
 * Initial function executes when google endpoint sdk loaded.
 */
function init() {
    gapi.client.load('greeting', 'v1', function () {
        http.init();
    }, "https://my-stats-ext.appspot.com/_ah/api");
}
