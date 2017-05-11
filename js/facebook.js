/**
 *  Face book api class is used to interact with facebook graph api.
 */
"use strict";
var myFB = (function () {
    var myFB = {};
    var EVENT_SDK_LOAD = jQuery.Event(myConfig.EVENT_FB_SDK_LOAD_NAME);
    /**
     * Setup facebook sdk environment and trigger facebook sdk event.
     */
    myFB.init = function () {
        console.log("facebook sdk is ready.");
        jQuery('body').trigger(EVENT_SDK_LOAD);
    };

    /**
     * Facebook login.
     */
    function faceBookLogin() {
        var dfd = jQuery.Deferred();
        FB.login(function (response) {
            if (response.authResponse) {
                dfd.resolve();
            } else {
                dfd.reject();
            }
        }, {scope: 'email'});
        return dfd.promise();
    }

    /**
     * Load FB user picture.
     */
    function getUserPicture() {
        var dfd = jQuery.Deferred();
        FB.api("me/picture", function (resp) {
            dfd.resolve(resp);
        })
        return dfd.promise();
    }

    /**
     * Check login status.
     */
    function isLogin() {
        var dfd = jQuery.Deferred();
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                dfd.resolve(true);
            } else {
                dfd.resolve(false);
            }
        });
        return dfd.promise();
    }

    function checkLoginOrRedirect() {
        var dfd = jQuery.Deferred();
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                dfd.resolve(true);
            } else {
                window.location = "/login";
            }
        });
        return dfd.promise();
    }

    function getUserDetails() {
        var dfd = jQuery.Deferred();
        checkLoginOrRedirect().then(function () {
            FB.api('me/?fields=name,email', function (response) {
                dfd.resolve(response);
            });
        });
        return dfd.promise();
    }


    myFB.login = faceBookLogin;
    myFB.isLogin = isLogin;
    myFB.getDetails = getUserDetails;
    myFB.getProfileImage = getUserPicture;
    return myFB;
}());

window.fbAsyncInit = function () {
    FB.init({
        appId: myConfig.FB_APP_ID,
        xfbml: true,
        version: 'v2.9'
    });
    FB.AppEvents.logPageView();
    myFB.init();
};
