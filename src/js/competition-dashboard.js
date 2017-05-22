var users = [];
var barchart;


$(document).ready(function () {
    // get the current date as a string
    $('#today').text(getTodaysDate());

    $.ajax({
        url: REST + '/competitions/stats/total',
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        dataType: 'JSON',
        statusCode: {
            200: function (response) {
               drawCompetitionChart(response);
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


    const drawCompetitionChart = function (data) {
        var lastComp = data[data.length - 1];
        var scoreFromEach = [];
        for (var i = 0; i < data.length; i++) {
            scoreFromEach[i] = {
                id: lastComp.results[i].userid,
                score: lastComp.results[i].score
            }
        }
        if (scoreFromEach.length > 0) {
            barchart = drawBarChart('#chart-competition', scoreFromEach, 'Naam', 'Stappen', '', $('#competition-data').width, 800);
        } else {
            printBarChartError('Er zijn nog geen competitiegegevens bekend.');
        }
    };
    const printBarChartError = function (message) {
        $('#chart-competition').html("<span class='glyphicon glyphicon-exclamation-sign'></span><br/>" + message);
    };


});