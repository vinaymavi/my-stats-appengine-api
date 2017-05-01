/**
 * main script to make ajax requests, handle responses and create graphs.
 */
/*TODO need to optimise this code.*/
/**
 * Draw chart.
 * @param data
 */
function drawChart(websiteData) {
    var data = websiteData[0];
    var sortObj = websiteData[1];
    var _data = [];
    var keysArr = Object.keys(sortObj);
    for (var i = 0; i < keysArr.length; i++) {
        var obj = data[keysArr[i]];
        var name = obj.name;
        var x = [];
        var y = [];
        Object.keys(obj.data).forEach(function (dateStr, index) {
            y.push(secToHours(obj.data[dateStr]["duration"]));
            x.push(dateStr);
        });
        _data.push({
            x: x,
            y: y,
            mode: 'lines',
            type: 'scatter',
            name: name,
        });
    }

    var layout = {
        title: 'My Stats',
        showlegend: true,
        xaxis: {
            type: 'date'
        },
        yaxis: {
            title: 'Time(Hours)',
            type: 'linear',
            hoverformat: '.2f'
        }
    };
    Plotly.newPlot('my-chart', _data, layout, {showLink: false});
}

function dateFormat(ts) {
    var dateStr = "";
    var d = new Date(ts);
    dateStr = d.getFullYear() + "-";
    dateStr = dateStr + (d.getMonth() + 1) + "-";
    dateStr = dateStr + (d.getDate()) + "";
    return dateStr;
}


function secToHours(sec) {
    return (sec / (60 * 60));
}

/**
 * Process array of items and group single website data.
 * @example
 * {"<website_name>"{
 * data:[]
 * name:<website name>
 * }}
 * @param items {Array} of items
 */
function processItems(items) {
    var data = {};
    var durObj = {};
    var sortArr;
    var dateStr;
    items.forEach(function (val, index) {
        if (typeof data[val.domain] === "undefined") {
            data[val.domain] = {
                data: {},
                name: val.domain
            }
            durObj[val.domain] = {
                duration: 0
            }
        }
        durObj[val.domain]['duration'] += val.duration;
        dateStr = dateFormat(val.startTime);
        if (typeof data[val.domain].data[dateStr] === "undefined") {
            data[val.domain].data[dateStr] = {};
            data[val.domain].data[dateStr]["duration"] = val.duration;
            data[val.domain].data[dateStr]["count"] = 1;
        } else {
            data[val.domain].data[dateStr]["duration"] += val.duration;
            data[val.domain].data[dateStr]["count"] += 1;
        }

    });
    console.log(durObj);
    sortArr = sortByDur(durObj);
    return [data, sortArr];
}

function sortByDur(obj) {
    var keyArr = Object.keys(obj);
    var sortableArr = [];
    var sortObj = {};
    keyArr.forEach(function (val) {
        sortableArr.push([val, obj[val]['duration']]);
    });
    var sortArr = sortableArr.sort(function (a, b) {
        return a[1] - b[1];
    });
    /* Convert to object first 10 sites.*/
    console.log(sortArr);
    for (var i = sortArr.length - 1; i > sortArr.length - 11; i--) {
        sortObj[sortArr[i][0]] = sortArr[i][1];
    }
    console.log(sortObj);
    return sortObj;
}
function init() {
    gapi.client.load('greeting', 'v1', function () {
        gapi.client.greeting.website_data.get().execute(function (resp) {
            console.log(resp.items);
            drawChart(processItems(resp.items));
        });
    }, "https://my-stats-ext.appspot.com/_ah/api");
}