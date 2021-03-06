/**
 * Created on 19-05-17.
 */
let stepsData = [];
let sleepData = [];
let goalsData = [];

let stepsChart;
let sleepChart;

let dataLoaded = false;

// redraw charts when the screen resizes
$(window).on('resize', function () {
    if (dataLoaded) {
        drawStepsChart(stepsData);
        drawSleepChart(sleepData);
    }
});

$(document).ready(function () {

    // get the current date as a string
    $('#today').append(getTodaysDate());
    $('#pdf').val(localStorage.getItem('userid'));

    // total stats
    $.ajax({
        url: REST + '/users/' + localStorage.getItem('userid') + '/stats/total',
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        dataType: 'JSON',
        statusCode: {
            200: function (data) {
                $('#total-steps').find('.value').html(data.success.steps);
            },
            401: function () {
                // not logged id; redirect to login page
                localStorage.clear();
                location.replace('/index.php');
            },
            default: function (error) {
                console.log(error.error);
            }
        }
    });

    // get last weeks steps and sleep
    $.ajax({
        url: REST + '/users/' + localStorage.getItem('userid') + '/stats/weeks/last',
        method: 'GET',
        dataType: 'JSON',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        statusCode: {
            200: function (data) {
                stepsData = data.success.steps;
                sleepData = data.success.sleep;
                dataLoaded = true;
                drawStepsChart(stepsData);
                drawSleepChart(sleepData);
            },
            400: function () {
                printChartsError('Er ging iets mis.<br/>Probeer het later opnieuw.');
            },
            401: function () {
                // not logged id; redirect to login page
                localStorage.clear();
                location.replace('/index.php');
            },
            403: function () {
                printChartsError('Geen toegang.');
            },
            404: function () {
                printChartsError('Gebruiker niet bekend.');
            },
            412: function () {
                printChartsError('Dit account is nog niet aan een Fitbit gekoppeld.');
            },
            429: function () {
                printChartsError('We hebben even rust nodig.');
            },
            500: function () {
                printChartsError('Er ging iets mis.<br/>Probeer het later opnieuw.');
            }
        }
    });

    // get the goals history
    getGoalsHistory();
});

const getGoalsHistory = function () {
    $.ajax({
        url: REST + '/users/' + localStorage.getItem('userid') + '/goals?offset=' + 0 + '&limit=' + 10,
        method: 'GET',
        dataType: 'JSON',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        statusCode: {
            200: function (data) {
                $('#goal-history').removeClass('block-error');
                goalsData = data.goals;
                loadGoalsHistory(goalsData);
            },
            400: function () {
                printGoalsError('Er ging iets mis.<br/>Probeer het later opnieuw.');
            },
            401: function () {
                // not logged id; redirect to login page
                localStorage.clear();
                location.replace('/index.php');
            },
            403: function () {
                printGoalsError('Geen toegang.');
            },
            404: function () {
                printGoalsError('Gebruiker niet bekend.');
            },
            500: function () {
                printGoalsError('Er ging iets mis.<br/>Probeer het later opnieuw.');
            }
        }
    });
};

const printChartsError = function (message) {
    printStepsChartError(message);
    printSleepChartError(message);
};

const printStepsChartError = function (message) {
    printError('#chart-steps', message);
};

const printSleepChartError = function (message) {
    printError('#chart-sleep', message);
};

const printGoalsError = function (message) {
    $('#goal-history').addClass('block-error');
    printError('#goal-history', message);
};

const printError = function (selector, message) {
    $(selector).html("<span class='glyphicon glyphicon-exclamation-sign'></span><br/>" + message);
};

const drawStepsChart = function (data) {
    let steps = [];
    // reformat date labels
    for (let i = 0; i < data.length; i++) {
        let date = data[i].dateTime;
        steps[i] = {
            label: date.substring(8, 10) + '/' + date.substring(5, 7),
            value: data[i].value
        };
    }

    if (steps.length > 0) {
        stepsChart = drawLineChart('#chart-steps', steps, 'datum', 'stappen', '', $('#activity-data').width(), 220);
    } else {
        printStepsChartError('Er zijn nog geen activiteitgegevens bekend.');
    }
};

const drawSleepChart = function (data) {
    let sleep = [];
    // reformat date labels
    for (let i = 0; i < data.length; i++) {
        sleep[i] = {
            label: data[i].date.substring(8, 10) + '/' + data[i].date.substring(5, 7),
            value: data[i].duration
        };
    }

    if (sleepData.length > 0) {
        sleepChart = drawColumnChart('#chart-sleep', sleep, 'datum', 'uren', false, '', $('#sleep-data').width(), 220);
    } else {
        printSleepChartError('Er zijn nog geen slaapgegevens bekend.');
    }
};

const loadGoalsHistory = function (data) {
    if (data === undefined) {
        printGoalsError('Doelstellingen kunnen niet geladen worden.');
        return;
    }

    const goalHistory = $('#goal-history-inside');

    if (data.length < 1) {
        printGoalsError('Er zijn nog geen doelstellingen gezet.');
        return;
    }

    // clear the div
    goalHistory.html('');

    // set the width depending on the amount of items in it
    goalHistory.width(232 * data.length);

    // iterate through all goals
    for (let i = 0; i < data.length; i++) {
        const goal = data[i];

        // get the dates and parse them to the desired format
        const startDate = new Date(goal.start);
        const startDateStr = startDate.getDate() + '/' + (startDate.getMonth() + 1);
        const endDate = new Date(goal.end);
        const endDateStr = endDate.getDate() + '/' + (endDate.getMonth() + 1);
        const period = startDateStr + ' - ' + endDateStr;

        // start the html we are going to add
        let html = '<div class="goal ' + (goal.percentage === 100 ? 'achieved' : '') + '"><h2>';

        // calculate the right font-size depending on the amount of excess characters
        let fontSize = 1;
        let progressChars = goal.goal.toString().length + goal.progress.toString().length - 7; // 8 = max characters
        if (progressChars > 0) {
            fontSize -= 0.1 + (progressChars * 0.08);
            if (fontSize < 0.1) {
                fontSize = 0.1;
            }
        }

        // the right format depending on completion
        if (goal.percentage === 100) {
            html += goal.goal + '</h2>';
        } else {
            html += '<span class="not-achieved" style="font-size: ' + fontSize + 'em;">' + goal.progress + ' / ' + goal.goal + '</span></h2>';
        }

        // finish the div with the right icon
        let inProgress = 'option-horizontal';
        if ((endDate.getTime() + 1000 * 60 * 60 * 24) < new Date().getTime()) {
            // if the goal end date is over, user a different icon
            inProgress = 'remove';
        }
        html += period + '<br/>';
        html += '<span class="goal-icon glyphicon glyphicon-' + (goal.percentage === 100 ? 'ok' : inProgress) + '"></span>' +
            '</div>';

        // append the goal html
        goalHistory.append(html);
    }
};