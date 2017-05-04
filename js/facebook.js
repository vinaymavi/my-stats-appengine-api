/**
 *  Face book api class is used to interact with facebook graph api.
 */
var myFB = (function () {
    var myFB = {};
    var BUTTON_ID = "#fb_login";
    myFB.init = function () {
        console.log("facebook sdk is ready.");
        registerLogin();
    };
    /**
     * Register event on button for login.
     */
    function registerLogin() {
        $(BUTTON_ID).on("click", myStats.login)
    }

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

    function getUserDetails() {
        var dfd = jQuery.Deferred();
        FB.api('me/?fields=name,email', function (response) {
            dfd.resolve(response);
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
        appId: '285629665195437',
        xfbml: true,
        version: 'v2.9'
    });
    FB.AppEvents.logPageView();
    myFB.init();
};
