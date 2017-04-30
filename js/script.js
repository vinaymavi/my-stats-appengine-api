/**
 * main script to make ajax requests, handle responses and create graphs.
 */

/**
 * Draw chart.
 * @param data
 */
function drawChart(data) {
    var _data = [];
    var keysArr = Object.keys(data);
    for (var i = 0; i < keysArr.length; i++) {
        if (i > 10) {
            continue;
        }
        var obj = data[keysArr[i]];
        var name = obj.name;
        var x = [];
        var y = [];
        obj.data.forEach(function (val, index) {
            y.push(val.duration);
            x.push(dateFormat(val.startTime));
        });
        _data.push({
            x: x,
            y: y,
            mode: 'lines',
            type: 'scatter',
            name: name
        });
    }

    function dateFormat(ts) {
        var dateStr = "";
        var d = new Date(ts);
        dateStr = d.getFullYear() + "-";
        dateStr = dateStr + (d.getMonth() + 1) + "-";
        dateStr = dateStr + (d.getDate()) + " ";
        dateStr = dateStr + (d.getHours()) + ":";
        dateStr = dateStr + (d.getMinutes()) + ":";
        dateStr = dateStr + (d.getSeconds()) + "";
        return dateStr;
    }

    var layout = {
        title: 'My Stats',
        showlegend: true,
        xaxis: {
            type: 'date'
        },
        yaxis: {
            title: 'Time',
            type: 'linear'
        }
    };
    Plotly.newPlot('my-chart', _data, layout, {showLink: false});
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
    items.forEach(function (val, index) {
        if (typeof data[val.domain] === "undefined") {
            data[val.domain] = {
                data: [],
                name: val.domain
            }
        }
        data[val.domain].data.push(val);
    });
    return data;
}

function init() {
    gapi.client.load('greeting', 'v1', function () {
        gapi.client.greeting.website_data.get().execute(function (resp) {
            console.log(resp.items);
            drawChart(processItems(resp.items));
        });
    }, "https://my-stats-ext.appspot.com/_ah/api");
}