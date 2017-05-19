/**
 * Created on 19-05-17.
 */

// redraw charts when the screen resizes
$(window).on('resize', function () {
    drawStepsChart();
    drawSleepChart();
});

$(document).ready(function () {
    // get the current date as a string
    $('#today').text(getTodaysDate());

    // total stats
    $.ajax({
        url: REST + '/accounts/users/' + localStorage.getItem('userid') + '/stats/total',
        method: 'GET',
        dataType: 'JSON',
        statusCode: {
            200: function () {

            },
            400: function () {

            },
            401: function () {

            },
            404: function () {

            }
        }
    });

    // get last weeks activity and sleep data
    $.ajax({
        url: REST + '/accounts/users/' + localStorage.getItem('userid') + '/stats/weeks/last',
        method: 'GET',
        dataType: 'JSON',
        statusCode: {
            200: function () {

            },
            400: function () {

            },
            401: function () {

            },
            404: function () {

            }
        }
    });

    // initially draw the charts
    drawStepsChart();
    drawSleepChart();
});

const drawStepsChart = function () {
    drawLineChart('#chart-steps', [
        {label: '17/05', value: 4788}, {label: '18/05', value: 5901}, {label: '19/05', value: 3870},
        {label: '20/05', value: 3822}, {label: '21/05', value: 5520}, {label: '22/05', value: 6302}
    ], 'datum', 'stappen', '', $('#activity-data').width(), 200);
};

const drawSleepChart = function () {
    drawColumnChart('#chart-sleep', [
        {label: '17/05', value: 6}, {label: '18/05', value: 8}, {label: '19/05', value: 9},
        {label: '20/05', value: 8}, {label: '21/05', value: 7}, {label: '22/05', value: 6}
    ], 'datum', 'uren', false, '', $('#sleep-data').width(), 200);
};