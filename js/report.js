/**
 * This file is used to create all type of reporting.
 */
"use strict";
var myReport = (function () {
    var myReport = {};
    var _startDate,
        _endDate,
        fbId;

    function updateReport(startDate, endDate) {
        myFB.getDetails().then(function (resp) {
            fbId = resp.id;
            report(fbId, startDate, endDate);
        })
    }

    function initialReport() {
        _startDate = moment().subtract(myConfig.DEFAULT_WEBSITE_DATE_DURATION_REPORTING, "days").utc().format(myConfig.API_DATE_FORMAT);
        _endDate = moment().utc().format(myConfig.API_DATE_FORMAT);
        myFB.getDetails().then(function (resp) {
            fbId = resp.id;
            report(fbId, _startDate, _endDate);
        })
    }

    function report(fb_id, startDate, endDate) {
        var reportData;
        http.getWebsitesData(fb_id, startDate, endDate).then(function (resp) {
            reportData = myAlgorithm.processItems(resp.items);
            createReport(reportData);
        }, function (resp) {
            console.error("something is wrong");
        });
    }

    function createReport(reportData) {
        var processedItemsObj = reportData[0];
        var sortedArr = reportData[1];
        var html = [];
        var index = 1;
        var siteName;
        for (var i = sortedArr.length - 1; i >= 0; i--, index++) {
            siteName = sortedArr[i][0];
            html.push("<tr>");
            html.push('<th scope="row">' + index + '</th>');
            html.push('<td>' + siteName + '</td>');
            html.push('<td>' + moment().startOf('day').seconds(processedItemsObj[siteName]['duration']).format('H:mm:ss') + '</td>');
            html.push('<td>' + processedItemsObj[siteName]['count'] + '</td>');
            html.push("</tr>");
        }

        jQuery('table.reporting tbody').html(html.join(''));
    }

    jQuery('body').on(myConfig.EVENT_APPLICATION_LOADED_NAME, function () {
        if (jQuery('.reporting').length > 0) {
            initialReport();
            jQuery('body').on(myConfig.EVENT_DURATION_CHANGE_NAME, function (event) {
                updateReport(event.startDate, event.endDate);
            });
        }
    });
    return myReport;
}());