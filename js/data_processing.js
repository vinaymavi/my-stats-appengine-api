/**
 * This file has all algorithm to process data to create graphs and charts.
 */
"use strict";
var myAlgorithm = (function () {
    var myAlgo = {};

    /**
     * Process array of items and group single website processedItemsObj.
     * @example
     * {"<website_name>"{
     * processedItemsObj:[]
     * name:<website name>
     * }}
     * @param items {Array} of items
     * @param isTopTen {Boolean}
     */
    function processItems(items, isTopTen) {
        var processedItemsObj = {};
        var websiteDurationObj = {};
        var sortedArrByDur;
        var dateStr;
        items.forEach(function (val, index) {
            if (typeof processedItemsObj[val.domain] === "undefined") {
                processedItemsObj[val.domain] = {
                    data: {},
                    name: val.domain,
                    duration: 0,
                    count: 0
                };
                websiteDurationObj[val.domain] = {
                    duration: 0
                }
            }
            websiteDurationObj[val.domain]['duration'] += val.duration;
            dateStr = dateFormat(val.startTime);
            if (typeof processedItemsObj[val.domain].data[dateStr] === "undefined") {
                processedItemsObj[val.domain].data[dateStr] = {};
                processedItemsObj[val.domain].data[dateStr]["duration"] = val.duration;
                processedItemsObj[val.domain].data[dateStr]["count"] = 1;
            } else {
                processedItemsObj[val.domain].data[dateStr]["duration"] += val.duration;
                processedItemsObj[val.domain].data[dateStr]["count"] += 1;
                processedItemsObj[val.domain].duration += val.duration;
                processedItemsObj[val.domain].count += 1;
            }

        });
        if (Object.keys(websiteDurationObj) < 10) {
            return undefined;
        }
        console.log(websiteDurationObj);
        sortedArrByDur = sortByDur(websiteDurationObj, isTopTen);
        return [processedItemsObj, sortedArrByDur];
    }

    function sortByDur(processedItemsObj, isTopTen) {
        var keyArr = Object.keys(processedItemsObj);
        var sortableArr = [];
        var sortedObj = {};
        keyArr.forEach(function (val) {
            sortableArr.push([val, processedItemsObj[val]['duration']]);
        });

        var sortArr = sortableArr.sort(function (a, b) {
            return parseInt(a[1]) - parseInt(b[1]);
        });
        if (typeof  isTopTen === 'undefined') {
            return sortArr;
        }
        /* Get top 10 sites*/
        for (var i = sortArr.length - 1; (i > sortArr.length - 11) && (i >= 0); i--) {
            sortedObj[sortArr[i][0]] = sortArr[i][1];
        }
        return sortedObj;
    }

    /**
     *
     * @param ts time string
     * @returns {string} date string in "YYYY-MM-DD" format.
     */
    function dateFormat(ts) {
        return moment(ts).local().format(myConfig.PLOTLY_DATE_FORMAT);
    }

    /**
     * Create plotly line chart data from website objects.
     * @param items {{Array}} of website data.
     * @param startDate {String} in format YYYY/MM/DD
     * @param endDate {String} in format YYYY/MM/DD
     */
    function createLineChartData(items, startDate, endDate) {
        var processedDataArr;
        if (typeof items !== "undefined") {
            processedDataArr = processItems(items, true);
        }
        var data = processedDataArr[0];
        var sortObj = processedDataArr[1];
        var lineChartData = [];
        var keysArr = Object.keys(sortObj);
        var durInDays = moment(endDate, myConfig.API_DATE_FORMAT).diff(moment(startDate, myConfig.API_DATE_FORMAT), 'days');
        for (var i = 0; i < keysArr.length; i++) {
            var website = data[keysArr[i]];
            var name = website.name;
            var x = [];
            var y = [];
            var durStringArr = durDateStrings(startDate, endDate);
            durStringArr.forEach(function (dateStr) {
                if (typeof website.data[dateStr] !== 'undefined') {
                    y.push(secToHours(website.data[dateStr]["duration"]));
                    x.push(dateStr);
                } else {
                    y.push(0);
                    x.push(dateStr);
                }
            });

            lineChartData.push({
                x: x,
                y: y,
                mode: 'lines',
                type: 'scatter',
                name: name
            });
        }
        return lineChartData;
    }

    function secToHours(sec) {
        return (sec / (60 * 60));
    }

    /**
     * Return date strings between dates
     * @param startDate {String}
     * @param endDate {String}
     * @returns {Array}
     */
    function durDateStrings(startDate, endDate) {
        var durStringArr = [];
        var startDateMomentObj = moment(startDate, myConfig.API_DATE_FORMAT);
        var endDateMomentObj = moment(endDate, myConfig.API_DATE_FORMAT);
        var days = endDateMomentObj.diff(startDateMomentObj, 'days') + 1;
        durStringArr.push(startDateMomentObj.local().format(myConfig.PLOTLY_DATE_FORMAT));
        for (var i = 0; i < days - 1; i++) {
            durStringArr.push(startDateMomentObj.add(1, 'days').local().format(myConfig.PLOTLY_DATE_FORMAT));
        }
        return durStringArr;
    }

    myAlgo.dateFormat = dateFormat;
    myAlgo.sortByDur = sortByDur;
    myAlgo.processItems = processItems;
    myAlgo.secToHours = secToHours;
    myAlgo.createLinechartData = createLineChartData;
    return myAlgo;
}());