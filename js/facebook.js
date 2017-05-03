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
        $(BUTTON_ID).on("click", checkLoginStatus)
    }

    /**
     * Facebook login.
     */
    function faceBookLogin() {
        FB.login(function (response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('me/?fields=name,email', function (response) {
                    console.log(response);
                    console.log('Good to see you, ' + response.name + '.');
                });
                getUserPicture();
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'email'});
    }

    /**
     * Load FB user picture.
     */
    function getUserPicture() {
        FB.api("me/picture", function (resp) {
            console.log(resp);
        })
    }

    /**
     * Check login status.
     */
    function checkLoginStatus() {
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                faceBookLogin();
            }
            else {
                faceBookLogin();
            }
        });
    }

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
