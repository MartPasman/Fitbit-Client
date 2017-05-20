/**
 * Created on 19-05-17.
 */

var stepsData = [];
var sleepData = [];

// redraw charts when the screen resizes
$(window).on('resize', function () {
    drawStepsChart(stepsData);
    drawSleepChart(sleepData);
});

$(document).ready(function () {
    // get the current date as a string
    $('#today').text(getTodaysDate());

    // total stats
    $.ajax({
        url: /*REST*/'http://localhost:3000' + '/accounts/users/' + 123/*localStorage.getItem('userid')*/ + '/stats/total',
        method: 'GET',
        dataType: 'JSON',
        statusCode: {
            200: function (data) {
                $('#total-steps').find('.value').html(data.success.steps);
            },
            400: function (error) {

            },
            401: function (error) {

            },
            403: function (error) {

            },
            404: function (error) {

            },
            412: function (error) {

            },
            500: function (error) {

            }
        }
    });

    // get last weeks steps
    $.ajax({
        url: /*REST*/'http://localhost:3000' + '/accounts/users/' + 123/*localStorage.getItem('userid')*/ + '/stats/weeks/last',
        method: 'GET',
        dataType: 'JSON',
        statusCode: {
            200: function (data) {
                stepsData = data.success;
                drawStepsChart(stepsData);
            },
            400: function (error) {
                printStepsChartError('Er ging iets mis.<br/>Probeer het later opnieuw.');
            },
            401: function (error) {
                printStepsChartError('Geen gebruiker ingelogd.');
            },
            403: function (error) {
                printStepsChartError('Geen toegang.');
            },
            404: function (error) {
                printStepsChartError('Gebruiker niet bekend.');
            },
            412: function (error) {
                printStepsChartError('Dit account is nog niet aan een Fitbit gekoppeld.');
            },
            500: function (error) {
                printStepsChartError('Er ging iets mis.<br/>Probeer het later opnieuw.');
            }
        }
    });

    // initially draw the charts
    // TODO ajax call
    // drawSleepChart(sleepData);
});

const printStepsChartError = function(message) {
    $('#chart-steps').html("<span class='glyphicon glyphicon-exclamation-sign'></span><br/>" + message);
};

const printSleepChartError = function(message) {
    $('#chart-sleep').html("<span class='glyphicon glyphicon-exclamation-sign'></span><br/>" + message);
};

const drawStepsChart = function (data) {
    var steps = [];
    // reformat date labels
    for (var i = 0; i < data.length; i++) {
        var date = data[i].dateTime;
        steps[i] = {
            label: date.substring(8, 10) + '/' + date.substring(5, 7),
            value: data[i].value
        };
    }

    drawLineChart('#chart-steps', steps, 'datum', 'stappen', '', $('#activity-data').width(), 200);
};

// TODO
const drawSleepChart = function (data) {
    drawColumnChart('#chart-sleep', [
        {label: '17/05', value: 6}, {label: '18/05', value: 8}, {label: '19/05', value: 9},
        {label: '20/05', value: 8}, {label: '21/05', value: 7}, {label: '22/05', value: 6}
    ], 'datum', 'uren', false, '', $('#sleep-data').width(), 200);
};