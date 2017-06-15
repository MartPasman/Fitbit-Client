$(document).ready(function () {
    $('#today').html(getTodaysDate());

    // TODO: get from AJAX call
    const data = [
        {
            goal: 100000,
            score: 111000,
            period: '30/05 - 05/06',
        },
        {
            goal: 120000,
            score: 124000,
            period: '06/06 - 12/06',
        },
        {
            goal: 130000,
            score: 132000,
            period: '13/05 - 19/06',
        },
        {
            goal: 135000,
            score: 133000,
            period: '20/05 - 26/06',
        },
        {
            goal: 140000,
            score: 136000,
            period: '27/05 - 03/07',
        },
        {
            goal: 135000,
            score: 94000,
            period: '04/07 - 10/07',
        }
    ];

    $.ajax({
        url: REST + '/competitions/shared',
        method: 'GET',
        dataType: 'JSON',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        statusCode: {
            200: function (data) {
                $('#shared-goal-chart').removeClass('block-error');
                drawSharedGoalChart(data.success);
            },
            401: logout,
            404: function () {
                $('#shared-goal-chart-error').html('Er zijn helaas nog geen gezamenlijke doelstellingen gehouden.');
            },
            500: function () {
                $('#shared-goal-chart-error').html('Er is iets mis gegaan.<br/> Probeer het later nog eens.');

            }
        }
    });
});

/**
 *
 * @param data
 */
function drawSharedGoalChart(data) {

    const container = $('#shared-goal-chart').parent();
    const w = container.width() - ($(window).width() * .1), h = 600;
    container.css('padding-left', ($(window).width() * .1 * .5) + 'px');

    const datasets = [
        {
            seriesname: 'Gezamenlijk doel',
            data: []
        },
        {
            seriesname: 'Werkelijk behaald',
            data: []
        }
    ];
    const categories = [
        {
            category: []
        }
    ];

    // reformat the data
    for (let i = 0; i < data.length; i++) {
        datasets[0].data.push({value: data[i].goal});
        datasets[1].data.push({value: data[i].score});
        categories[0].category.push({label: data[i].period});
    }

    drawMultiSeriesLineChart('#shared-goal-chart', categories, datasets, 'Periode', 'Score', '', w, h);
}