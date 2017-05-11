/**
 * This file is used to create all type of graphs.
 */
'use strict';
var myGraphs = (function () {
    var myGraphs = {};

    /**
     * Draw chart.
     * @param lineChartData
     */
    function drawLineChart(lineChartData) {

        var layout = {
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
        Plotly.newPlot('my-chart', lineChartData, layout, {showLink: false});
    }

    myGraphs.drawLineChart = drawLineChart;
    return myGraphs;
}());