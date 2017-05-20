/**
 * Created on 19-05-17.
 */

var stepsData = [];
var sleepData = [];

var stepsChart;
var sleepChart;

var dataLoaded = false;

// redraw charts when the screen resizes
$(window).on('resize', function () {
    if (dataLoaded) {
        drawStepsChart(stepsData);
        drawSleepChart(sleepData);
    }
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
                console.log(error.error);
            },
            401: function (error) {
                console.log(error.error);
            },
            403: function (error) {
                console.log(error.error);
            },
            404: function (error) {
                console.log(error.error);
            },
            412: function (error) {
                console.log(error.error);
            },
            500: function (error) {
                console.log(error.error);
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
                stepsData = data.success.steps;
                sleepData = data.success.sleep;
                dataLoaded = true;
                drawStepsChart(stepsData);
                drawSleepChart(sleepData);
            },
            400: function () {
                printStepsChartError('Er ging iets mis.<br/>Probeer het later opnieuw.');
                printSleepChartError('Er ging iets mis.<br/>Probeer het later opnieuw.');
            },
            401: function () {
                printStepsChartError('Geen gebruiker ingelogd.');
                printSleepChartError('Geen gebruiker ingelogd.');
            },
            403: function () {
                printStepsChartError('Geen toegang.');
                printSleepChartError('Geen toegang.');
            },
            404: function () {
                printStepsChartError('Gebruiker niet bekend.');
                printSleepChartError('Gebruiker niet bekend.');
            },
            412: function () {
                printStepsChartError('Dit account is nog niet aan een Fitbit gekoppeld.');
                printSleepChartError('Dit account is nog niet aan een Fitbit gekoppeld.');
            },
            429: function () {
                printStepsChartError('We hebben even rust nodig.');
                printSleepChartError('We hebben even rust nodig.');
            },
            500: function () {
                printStepsChartError('Er ging iets mis.<br/>Probeer het later opnieuw.');
                printSleepChartError('Er ging iets mis.<br/>Probeer het later opnieuw.');
            }
        }
    });
});

const printStepsChartError = function (message) {
    $('#chart-steps').html("<span class='glyphicon glyphicon-exclamation-sign'></span><br/>" + message);
};

const printSleepChartError = function (message) {
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

    if (steps.length > 0) {
        stepsChart = drawLineChart('#chart-steps', steps, 'datum', 'stappen', '', $('#activity-data').width(), 200);
    } else {
        printStepsChartError('Er zijn nog geen activiteitgegevens bekend.');
    }
};

const drawSleepChart = function (data) {
    if (sleepData.length > 0) {
        sleepChart = drawColumnChart('#chart-sleep', data, 'datum', 'uren', false, '', $('#sleep-data').width(), 200);
    } else {
        printSleepChartError('Er zijn nog geen slaapgegevens bekend.');
    }
};