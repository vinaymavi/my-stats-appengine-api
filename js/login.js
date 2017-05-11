/**
 * File contain login and user registration feature.
 * Trigger login and registration events.
 */
var myLogin = (function () {
    var myLogin = {};
    myLogin.login = function () {
        myFB.isLogin().then(function (bool) {
            if (bool) {
                checkExtensionAndRegisterUser();
            } else {
                myFB.login().then(function () {
                    checkExtensionAndRegisterUser();
                }, function () {
                    showLoginErrorMessage();
                });
            }
        });

    };
    /**
     * Register event on button for login.
     */
    function registerLoginEvent() {
        $(myConfig.FB_LOGIN_BUTTON_ID).on("click", myLogin.login);
    }

    /**Private functions*/
    function registerUser(data) {
        http.registerUser(data).then(function (resp) {
            console.log("*****Register user response *****");
            console.log(resp);
            showLoginWelcomeMessage(resp);
            window.location = '/dashboard';
        })
    }

    function showLoginWelcomeMessage(resp) {
        jQuery(myConfig.LOGIN_WELCOME_MSG_ID).html("Welcome " + resp.name + " ! ").parent().removeClass('invisible');
    }

    function showLoginErrorMessage() {
        jQuery(myConfig.LOGIN_ERROR_MSG_ID).removeClass('invisible');
    }

    function checkExtensionAndRegisterUser() {
        var hasUserDetails = false,
            hasExtensionDetails = false;
        var data = {};
        myFB.getDetails().then(function (resp) {
            console.log(resp);
            data.fb_id = resp.id;
            data.name = resp.name;
            data.email = resp.email;
            hasUserDetails = true;
            send();
        });
        if (myExt.hasExtension()) {
            myExt.getDeviceId().then(function (resp) {
                console.log(resp);
                if (typeof  resp.device_id !== "undefined") {
                    data.devices = [];
                    data.devices.push({"device_id": resp.device_id});
                }
                hasExtensionDetails = true;
                send();
            });
        } else {
            hasExtensionDetails = true;
            send();
        }
        function send() {
            if (hasUserDetails && hasExtensionDetails) {
                registerUser(data);
            }
        }
    }

    /*Register listener of application loaded event.*/
    jQuery('body').on(myConfig.EVENT_APPLICATION_LOADED_NAME, function () {
        if (jQuery('.login').length > 0) {
            registerLoginEvent();
        }
    });
    return myLogin;
}());
