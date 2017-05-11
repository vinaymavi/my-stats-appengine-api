/**
 * File contain dashboard javaScript code.
 */
"use strict";
var myDashboard = (function () {
    var myDashboard = {};
    var startDate,
        endDate,
        fbId;


    /**
     * Display initial graph for one week duration.
     */
    function drawInitialGraph() {
        startDate = moment().subtract(myConfig.DEFAULT_WEBSITE_DATE_DURATION, "days").format(myConfig.API_DATE_FORMAT);
        endDate = moment().format(myConfig.API_DATE_FORMAT);
        myFB.getDetails().then(function (resp) {
            fbId = resp.id;
            drawLineChart(fbId, startDate, endDate);
        })
    }

    function drawLineChart(fb_id, startDate, endDate) {
        var lineChartData;
        http.getWebsitesData(fb_id, startDate, endDate).then(function (resp) {
            lineChartData = myAlgorithm.createLinechartData(resp.items, startDate, endDate);
            myGraphs.drawLineChart(lineChartData);
        }, function (resp) {
            console.error("something is wrong");
        });
    }

    /**
     * Update line chart
     * @param startDate {String}
     * @param endDate {String}
     */
    function updateLineChart(startDate, endDate) {
        var fbId;
        myFB.getDetails().then(function (resp) {
            fbId = resp.id;
            drawLineChart(fbId, startDate, endDate);
        })
    }

    jQuery('body').on(myConfig.EVENT_APPLICATION_LOADED_NAME, function () {
        if (jQuery('#my-chart').length > 0) {
            drawInitialGraph();
            jQuery('body').on(myConfig.EVENT_DURATION_CHANGE_NAME, function (event) {
                console.log(event);
                updateLineChart(event.startDate, event.endDate);
            });
        }
    });
}());
