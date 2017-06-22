$(document).ready(function () {

    // get the shared goals
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
    const w = container.width() - ($(window).width() * .1), h = container.height() - 150;
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

        if (i === data.length - 1) {
            categories[0].category.push({
                vLine: 1,
                dashed: 1,
                showLabelBorder: 0
            });
        }
        categories[0].category.push({label: data[i].period});
    }

    drawMultiSeriesColumnChart('#shared-goal-chart', categories, datasets, 'Periode', 'Score', '', w, h);

    notifyLoader('shared');
}