/**
 * Created on 19-05-17.
 */
/**
 * Draw a line chart inside the element given with the given data
 * @param selector      an element to draw it in
 * @param data          the data to draw given as label, value pairs in an array
 * @param xName         the name displayed at the x-axis
 * @param yName         the name displayed at the y-axis
 * @param valuePrefix   a prefix displayed in front of a value (e.g. $)
 * @param width         the width of the chart
 * @param height        the height of the chart
 */
function drawLineChart(selector, data, xName, yName, valuePrefix, width, height) {
    if (selector === undefined || data === undefined || data.length === 0) return console.error("selector parameter or data parameter undefined or empty!");
    if (xName === '' || yName === '' || xName === undefined || yName === undefined) return console.error("xName parameter or yName parameter empty in drawColumnChart call!");

    return $(selector).insertFusionCharts({
        type: 'line',
        width: width,
        height: height,
        dataFormat: 'json',
        dataSource: {
            chart: {
                xAxisName: xName,
                yAxisName: yName,
                exportEnabled: 0,
                numberPrefix: valuePrefix,
                theme: 'goals'
            },
            data: data
        }
    });
}

/**
 * Draw a column chart inside the element given with the given data
 * @param selector      an element to draw it in
 * @param data          the data to draw given as label, value pairs in an array
 * @param xName         the name displayed at the x-axis
 * @param yName         the name displayed at the y-axis
 * @param yes3d         if the chart should be 3d
 * @param valuePrefix   a prefix displayed in front of a value (e.g. $)
 * @param width         the width of the chart
 * @param height        the height of the chart
 */
function drawColumnChart(selector, data, xName, yName, yes3d, valuePrefix, width, height) {
    if (selector === undefined || data === undefined || data.length === 0) return console.error("selector parameter or data parameter undefined or empty!");
    if (yes3d !== false && yes3d !== true) yes3d = false;
    if (xName === '' || yName === '' || xName === undefined || yName === undefined) return console.error("xName parameter or yName parameter empty in drawColumnChart call!");

    return $(selector).insertFusionCharts({
        type: 'column' + (yes3d ? '3d' : '2d'),
        width: width,
        height: height,
        dataFormat: 'json',
        dataSource: {
            chart: {
                xAxisName: xName,
                yAxisName: yName,
                exportEnabled: 0,
                numberPrefix: valuePrefix,
                theme: 'goals'
            },
            data: data
        }
    });
}

function drawBarChart(selector, data, xName, yName, valuePrefix, width, height){
    if (selector === undefined || data === undefined || data.length === 0) return console.error("selector parameter or data parameter undefined or empty!");
    if (xName === '' || yName === '' || xName === undefined || yName === undefined) return console.error("xName parameter or yName parameter empty in drawColumnChart call!");

    return $(selector).insertFusionCharts({
        type: 'bar2d',
        width: width,
        height: height,
        dataFormat: 'json',
        dataSource: {
            chart:{
                xAxisName: xName,
                yAxisName: yName,
                exportEnabled: 0,
                numberPrefix: valuePrefix,
                theme:'goals'
            },
            data: data
        }

    })

}