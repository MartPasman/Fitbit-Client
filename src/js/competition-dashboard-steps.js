$(document).ready(function () {



    // get the current date as a string
    $('#today').append(getTodaysDate());

    var counter = 0;
    var index = 1;

    //get all users
    $.ajax({
        url: REST + '/accounts/',
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        dataType: 'JSON',
        statusCode: {
            200: function (data) {
                data.success.sort(function (a, b) {
                    if (a.lastname.toLowerCase() < b.lastname.toLowerCase()) return -1;
                    if (a.lastname.toLowerCase() > b.lastname.toLowerCase()) return 1;
                    return 0;
                });

                var usersToShow = [];
                for (var i = counter; i < (counter + 4); i++) {
                    usersToShow[i] = data.success[i];
                }
                counter += 4;

                console.dir(usersToShow);
                //show the 4 users.

                showusers(usersToShow);

            },
            default: function (err) {
                console.log(err);
            }
        }

    });

    function showusers(usersToShow) {
        $.ajax({
            url: REST + '/users/' + usersToShow[index-1].id + '/stats/total',
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            dataType: 'JSON',
            statusCode: {
                200: function (data) {
                    $('#total-steps' + index).find('.value').html(data.success.steps);
                    console.log(usersToShow[index-1]);
                    $.ajax({
                        url: REST + '/users/' + usersToShow[index-1].id + '/stats/weeks/last',
                        method: 'GET',
                        dataType: 'JSON',
                        headers: {
                            Authorization: localStorage.getItem('token')
                        },
                        statusCode: {
                            200: function (steps) {
                                var stepsData = steps.success.steps;
                                drawStepsChart(stepsData);
                                if(index < 5) {
                                    index++;
                                    showusers(usersToShow);
                                }
                            },
                            400: function () {
                                printChartsError('Er ging iets mis.<br/>Probeer het later opnieuw.');
                            },
                            401: function () {
                                printChartsError('Geen gebruiker ingelogd.');
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

                },
                default: function (error) {
                    console.log(error.error);
                }
            }
        });
    }



    //sort them on name

    //show 4 at the time.


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
            stepsChart = drawLineChart('#chart-steps'+index, steps, 'datum', 'stappen', '', $('#competition-data').width(),$('#competition-data').height() );
        } else {
            printStepsChartError('Er zijn nog geen activiteitgegevens bekend.');
        }
    };


});
