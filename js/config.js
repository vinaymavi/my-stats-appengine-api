/**
 * File contain all application level configuration.
 *
 */
"use strict";
window.myConfig = (function () {
    var myConfig = {};
    myConfig.EVENT_GOOGLE_END_POINT_SDK_LOAD_NAME = "GOOGLE_END_POINT_SDK_LOAD";
    myConfig.EVENT_FB_SDK_LOAD_NAME = "FB_SDK_LOAD";
    myConfig.EVENT_APPLICATION_LOADED_NAME = "MY_STATS_LOADED";
    myConfig.EVENT_DURATION_CHANGE_NAME = "DURATION_CHANGE";
    myConfig.EVENT_AJAX_START_NAME = "AJAX_START";
    myConfig.EVENT_AJAX_END_NAME = "AJAX_END";
    myConfig.FB_LOGIN_BUTTON_ID = "#fb_login";
    myConfig.FB_APP_ID = "288076444950759";
    myConfig.EXTENSION_RESPONSE_TIME_OUT = 1500;
    myConfig.LOGIN_WELCOME_MSG_ID = '#login-welcome-msg';
    myConfig.LOGIN_ERROR_MSG_ID = '#login-error-msg';
    myConfig.API_DATE_FORMAT = 'YYYY/MM/DD HH:mm:ss';
    myConfig.PLOTLY_DATE_FORMAT = 'YYYY-MM-DD';
    myConfig.DEFAULT_WEBSITE_DATE_DURATION = 7;
    myConfig.DEFAULT_WEBSITE_DATE_DURATION_REPORTING = 1;
    return myConfig;
}());
