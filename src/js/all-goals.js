/**
 * Created by sveno on 19-5-2017.
 */

var before;
var errorMessageAll;
var errorMessageUpdate;

$(document).ready(function () {

    before = $('#before');
    errorMessageAll = $("#error-message-all");
    errorMessageUpdate = $("#error-message-update");
    const allGoalsView = $('#all-goals-view');

    //Hide te message
    errorMessageAll.hide();

    //Set back button on disabled
    before.attr("disabled", true);

    //Set the all goals offset and load the goals
    var offset = 0;
    loadGoals(offset);

    //Next button
    $('#all-goals').click(function () {
        loadGoals(offset)
    });

    //Next button
    $('#next').click(function () {
        offset += 5;
        loadGoals(offset)
    });

    //Back button
    before.click(function () {
        offset -= 5;
        loadGoals(offset)
    });

    //When clicked on a remove button, item will be removed
    allGoalsView.on('click', '.trash-btn', function () {
        removeGoal(this.id, offset)
    });

    //When clicked on a remove button, item will be removed
    allGoalsView.on('click', '.pencil-btn', function () {
        changeGoal(this.id)
    });

    $('#update-button').click(function () {

        const stepsDivUpdate = $("#steps-div-update");
        const startDivUpdate = $("#start-date-update");
        const endDivUpdate = $("#end-date-update");

        //Trim values from input group fields
        var steps = $("#steps-update").val().trim();
        var start = startDivUpdate.val().trim();
        var end = endDivUpdate.val().trim();

        //Deletes all errors
        stepsDivUpdate.removeClass("has-error");
        startDivUpdate.removeClass("has-error");
        endDivUpdate.removeClass("has-error");

        if (isEmpty(steps) || isEmpty(start) || isEmpty(end)) {
            //Sets a error
            $("#success-message-update").hide();
            errorMessageUpdate.html("<strong>Foutje!</strong> Vul wel alle informatie in");
            if (errorMessageUpdate.is(':hidden')) {
                errorMessageUpdate.toggle();
            }

            //Make not correctly filled in input group red
            if (isEmpty(steps)) {
                stepsDivUpdate.addClass("has-error");
            }
            if (isEmpty(start)) {
                $("#start-div-update").addClass("has-error");
            }
            if (isEmpty(end)) {
                $("#end-div-update").addClass("has-error");
            }

        } else {

            //Sets date to javascript date time for in database
            var dateParts = start.split("/");
            var startdate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

            dateParts = end.split("/");
            var enddate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

            //Call to add a goal
            $.ajax({
                url: REST + '/users/' + localStorage.getItem("userid") + '/goals/' + $("#update-button").val(),
                method: 'PUT',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
                },
                data: {
                    start: startdate,
                    end: enddate,
                    goal: steps
                },
                statusCode: {
                    201: function () {
                        //Success message
                        errorMessageUpdate.hide();
                        $("#success-message-update").show();
                    },
                    401: function () {
                        //Unauthorized error message
                        $("#success-message-update").hide();
                        errorMessageUpdate.html("<strong>Foutje!</strong> Je bent niet ingelogd.");
                        errorMessageUpdate.show();
                    },

                    500: function () {
                        //Internal server error message
                        $("#success-message-update").hide();
                        errorMessageUpdate.html("<strong>Foutje!</strong> Het is niet jouw fout probeer het later nog eens.");
                        errorMessageUpdate.show();
                    },
                    default: function () {
                        //Default error message
                        $("#success-message-update").hide();
                        errorMessageUpdate.html("<strong>Foutje!</strong> Probeer het nog eens.");
                        errorMessageUpdate.show();
                    }
                }
            });
        }
    });

});

function loadGoals(offset) {
    //Ajax call for loading the goals
    $.ajax({
        url: REST + '/users/' + localStorage.getItem("userid") + '/goals?offset=' + offset + '&limit=5',
        method: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
        },
        statusCode: {
            200: function (data) {
                //Making a table
                var html = ' <table class="table table-striped"> <thead><tr> <th>Stappen</th> <th>Start datum</th> <th>Eind datum</th> <th>Opties</th> </tr> </thead> <tbody>';

                //Parse all the goals in a table
                $.each(data.goals, function (index, value) {
                    var startdate = new Date(value.start);
                    var enddate = new Date(value.end);

                    var start_month = startdate.getMonth() + 1;
                    var end_month = enddate.getMonth() + 1;

                    var sdate = startdate.getDate() + '/' + start_month + '/' + startdate.getFullYear();
                    var edate = enddate.getDate() + '/' + end_month + '/' + enddate.getFullYear();

                    var id = value._id;
                    html += '<tr>';
                    html += '<td>' + value.goal + '</td>';
                    html += '<td>' + sdate + '</td>';
                    html += '<td>' + edate + '</td>';
                    html += '<td><a  id="' + id + '" class="pencil-btn"> <span class="glyphicon glyphicon-pencil"></span></a> &nbsp <a  id="' + id + '" class="trash-btn"><span style="color:#ee5f5b;" class="glyphicon glyphicon-trash"></span></a></td>';
                    html += '</tr>';

                });

                //Check for the buttons can still be used
                $('#next').attr("disabled", (data.totalgoals - offset < 5));

                before.attr("disabled", (offset < 5));

                html += ' </tbody> </table>';

                allGoalsView.html(html);

            },
            401: function () {
                //Show error message
                errorMessageAll.html("<strong>Foutje!</strong> Je bent niet ingelogd.");
                if (errorMessageAll.is(':hidden')) {
                    errorMessageAll.toggle();
                }
            },

            500: function () {
                //Show error message
                errorMessageAll.html("<strong>Foutje!</strong> Het is niet jouw fout probeer het later nog eens.");
                if (errorMessageAll.is(':hidden')) {
                    errorMessageAll.toggle();
                }
            },
            default: function () {
                //Show error message
                errorMessageAll.html("<strong>Foutje!</strong> Probeer het nog eens.");
                if (errorMessageAll.is(':hidden')) {
                    errorMessageAll.toggle();
                }
            }
        }
    });
}

function removeGoal(id, offset) {
    $.ajax({
        url: REST + '/users/' + localStorage.getItem("userid") + '/goals/' + id,
        method: 'DELETE',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
        },
        statusCode: {
            201: function () {
                loadGoals(offset)
            },
            401: function () {
                //show error message
                errorMessageAll.html("<strong>Foutje!</strong> Je bent niet ingelogd.");
                if (errorMessageAll.is(':hidden')) {
                    errorMessageAll.toggle();
                }
            },

            500: function () {
                //Show error message
                errorMessageAll.html("<strong>Foutje!</strong> Het is niet jouw fout probeer het later nog eens.");
                if (errorMessageAll.is(':hidden')) {
                    errorMessageAll.toggle();
                }

            },
            default: function () {
                //Show error message
                errorMessageAll.html("<strong>Foutje!</strong> Probeer het later nog eens.");
                if (errorMessageAll.is(':hidden')) {
                    errorMessageAll.toggle();
                }

            }
        }
    });
}

function changeGoal(id) {
    $.ajax({
        url: REST + '/users/' + localStorage.getItem("userid") + '/goals/' + id,
        method: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
        },
        statusCode: {
            200: function (data) {
                if (!Date.parse(data.goals.start) || !Date.parse(data.goals.end) || isEmpty(data.goals.goal || isEmpty(data.goals._id))) {
                    errorMessageUpdate.html("<strong>Foutje!</strong> Probeer het later nog eens.");
                    if (errorMessageUpdate.is(':hidden')) {
                        errorMessageUpdate.toggle();
                    }
                    return;
                }
                var start = new Date(data.goals.start);
                var end = new Date(data.goals.end);

                var start_month = start.getMonth() + 1;
                var end_month = end.getMonth() + 1;

                $("#item-modal").modal("hide");

                $("#success-message-update").hide();
                errorMessageUpdate.hide();
                $("#steps-update").val(data.goals.goal);
                $("#start-date-update").val(start.getDate() + '/' + start_month + '/' + start.getFullYear());
                $("#end-date-update").val(end.getDate() + '/' + end_month + '/' + end.getFullYear());
                $("#update-button").val(data.goals._id);
                $("#update-modal").modal("show");
            },
            401: function () {
                //show error message
                errorMessageUpdate.html("<strong>Foutje!</strong> Je bent niet ingelogd.");
                if (errorMessageUpdate.is(':hidden')) {
                    errorMessageUpdate.toggle();
                }
            },

            500: function () {
                //Show error message
                errorMessageUpdate.html("<strong>Foutje!</strong> Het is niet jouw fout probeer het later nog eens.");
                if (errorMessageUpdate.is(':hidden')) {
                    errorMessageUpdate.toggle();
                }

            },
            default: function () {
                //Show error message
                errorMessageUpdate.html("<strong>Foutje!</strong> Probeer het later nog eens.");
                if (errorMessageUpdate.is(':hidden')) {
                    errorMessageUpdate.toggle();
                }

            }
        }
    });
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}