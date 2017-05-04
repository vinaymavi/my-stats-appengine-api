/**
 * This is file to create http requests to server.
 */
var http = (function () {
    var http = {};

    function registerUser(data) {
        var dfd = jQuery.Deferred();
        gapi.client.greeting.website_config.new_user(data).execute(function (resp) {
            console.log(resp);
            dfd.resolve(resp);
        });
        return dfd.promise();
    }

    function getGraphData(data) {

    }

    http.registerUser = registerUser;
    http.getGraphData = getGraphData;
    return http;
}());
