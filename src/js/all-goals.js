/**
 * Created by sveno on 19-5-2017.
 */
$(document).ready(function () {

    //Hide te message
    $("#error-message-all").hide();

    //Set back button on disabled
    $('#before').attr("disabled", true);

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
    $('#before').click(function () {
        offset -= 5;
        loadGoals(offset)
    });

    //When clicked on a remove button, item will be removed
    $('#all-goals-view').on('click', '.trash-btn' , function(){
        removeGoal(this.id, offset)
    });

    //When clicked on a remove button, item will be removed
    $('#all-goals-view').on('click', '.pencil-btn' , function(){
        changeGoal(this.id)
    });

    $('#update-button').click(function () {

        //Trim values from input group fields
        var steps = $("#steps-update").val().trim();
        var start = $("#start-date-update").val().trim();
        var end = $("#end-date-update").val().trim();

        //Deletes all errors
        $("#steps-div-update").removeClass("has-error");
        $("#start-div-update").removeClass("has-error");
        $("#end-div-update").removeClass("has-error");

        if (isEmpty(steps) || isEmpty(start) || isEmpty(end)) {
            //Sets a error
            $("#success-message-update").hide();
            $("#error-message-update").html("<strong>Foutje!</strong> Vul wel alle informatie in");
            if ($("#error-message-update").is(':hidden')){
                $("#error-message-update").toggle();
            }

            //Make not correctly filled in input group red
            if (isEmpty(steps)) {
                $("#steps-div-update").addClass("has-error");
            }
            if (isEmpty(start)) {
                $("#start-div-update").addClass("has-error");
            }
            if(isEmpty(end)) {
                $("#end-div-update").addClass("has-error");
            }

        } else {

            //Sets date to javascript date time for in database
            var dateParts = start.split("/");
            var startdate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])

            var dateParts = end.split("/");
            var enddate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

            //Call to add a goal
            $.ajax({
                url: REST + '/users/'+localStorage.getItem("userid")+'/goals/'+$("#update-button").val(),
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
                    201: function (data) {
                        //Success message
                        $("#error-message-update").hide();
                        if ($("#success-message-update").is(':hidden')) {
                            $("#success-message-update").toggle();
                        }
                    },
                    401: function (err) {
                        //Unauthorized error message
                        $("#success-message-update").hide();
                        $("#error-message-update").html("<strong>Foutje!</strong> Je bent niet ingelogd.");
                        if ($("#error-message-update").is(':hidden')){
                            $("#error-message-update").toggle();
                        }

                    },

                    500: function (err) {
                        //Internal server error message
                        $("#success-message-update").hide();
                        $("#error-message-update").html("<strong>Foutje!</strong> Het is niet jouw fout probeer het later nog eens.");
                        if ($("#error-message-update").is(':hidden')){
                            $("#error-message-update").toggle();
                        }
                    },
                    default: function (err) {
                        //Default error message
                        $("#success-message-update").hide();
                        $("#error-message-update").html("<strong>Foutje!</strong> Probeer het nog eens.");
                        if ($("#error-message-update").is(':hidden')){
                            $("#error-message-update").toggle();
                        }
                    }
                }
            });
        }
    });

});

function loadGoals(offset) {
    //Ajax call for loading the goals
    $.ajax({
        url: REST + '/users/'+localStorage.getItem("userid")+'/goals?offset='+offset+'&limit=5',
        method: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
        },
        statusCode: {
            201: function (data) {
                var html = ' <table class="table table-striped"> <thead><tr> <th>Stappen</th> <th>Start datum</th> <th>Eind datum</th> <th>Opties</th> </tr> </thead> <tbody>';

                //Parse all the goals in a table
                $.each(data.goals,function(index, value){
                    var startdate = new Date(value.start);
                    var enddate = new Date(value.end);

                    var sdate = startdate.getDay() +'/'+ startdate.getMonth() +'/'+ startdate.getFullYear();
                    var edate = enddate.getDay() +'/'+ enddate.getMonth() +'/'+ enddate.getFullYear();

                    var id = value._id;
                    html += '<tr>';
                    html += '<td>'+value.goal+'</td>';
                    html += '<td>'+sdate+'</td>';
                    html += '<td>'+edate+'</td>';
                    html += '<td><a  id="'+id+'" class="pencil-btn"> <span class="glyphicon glyphicon-pencil"></span></a> &nbsp <a  id="'+id+'" class="trash-btn"><span style="color:#ee5f5b;" class="glyphicon glyphicon-trash"></span></a></td>';
                    html += '</tr>';

                });


                //Check for the buttons can still be used
                if(data.totalgoals - offset < 5){
                    $('#next').attr("disabled", true);
                }else{
                    $('#next').attr("disabled", false);
                }

                if(offset < 5){
                    $('#before').attr("disabled", true);
                }else{
                    $('#before').attr("disabled", false);
                }

                html += ' </tbody> </table>';

                $('#all-goals-view').html(html);

            },
            401: function (err) {
                //Show error message
                $("#error-message-all").html("<strong>Foutje!</strong> Je bent niet ingelogd.");
                if ($("#error-message-all").is(':hidden')){
                    $("#error-message-all").toggle();
                }
            },

            500: function (err) {
                //Show error message
                $("#error-message-all").html("<strong>Foutje!</strong> Het is niet jouw fout probeer het later nog eens.");
                if ($("#error-message-all").is(':hidden')){
                    $("#error-message-all").toggle();
                }
            },
            default: function (err) {
                //Show error message
                $("#error-message-all").html("<strong>Foutje!</strong> Probeer het nog eens.");
                if ($("#error-message-all").is(':hidden')){
                    $("#error-message-all").toggle();
                }
            }
        }
    });
}

function removeGoal(id, offset) {
    $.ajax({
        url: REST + '/users/'+localStorage.getItem("userid")+'/goals/'+id,
        method: 'DELETE',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
        },
        statusCode: {
            201: function (data) {
                loadGoals(offset)
            },
            401: function (err) {
                //show error message
                $("#error-message-all").html("<strong>Foutje!</strong> Je bent niet ingelogd.");
                if ($("#error-message-all").is(':hidden')){
                    $("#error-message-all").toggle();
                }
            },

            500: function (err) {
                //Show error message
                $("#error-message-all").html("<strong>Foutje!</strong> Het is niet jouw fout probeer het later nog eens.");
                if ($("#error-message-all").is(':hidden')){
                    $("#error-message-all").toggle();
                }

            },
            default: function (err) {
                //Show error message
                $("#error-message-all").html("<strong>Foutje!</strong> Probeer het later nog eens.");
                if ($("#error-message-all").is(':hidden')){
                    $("#error-message-all").toggle();
                }

            }
        }
    });
}

function changeGoal(id) {
    $.ajax({
        url: REST + '/users/'+localStorage.getItem("userid")+'/goals/'+id,
        method: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
        },
        statusCode: {
            201: function (data) {
                if(!Date.parse(data.goals.start) || !Date.parse(data.goals.end) || isEmpty(data.goals.goal || isEmpty(data.goals._id))){
                    $("#error-message-update").html("<strong>Foutje!</strong> Probeer het later nog eens.");
                    if ($("#error-message-update").is(':hidden')){
                        $("#error-message-update").toggle();
                    }
                    return;
                }
                var start = new Date(data.goals.start);
                var end = new Date(data.goals.end);

                $("#item-modal").modal("hide");

                $("#success-message-update").hide();
                $("#error-message-update").hide();
                $("#steps-update").val(data.goals.goal);
                $("#start-date-update").val(start.getDay()+'/'+start.getMonth()+'/'+start.getFullYear());
                $("#end-date-update").val(end.getDay()+'/'+end.getMonth()+'/'+end.getFullYear());
                $("#update-button").val(data.goals._id);
                $("#update-modal").modal("show");
            },
            401: function (err) {
                //show error message
                $("#error-message-update").html("<strong>Foutje!</strong> Je bent niet ingelogd.");
                if ($("#error-message-update").is(':hidden')){
                    $("#error-message-update").toggle();
                }
            },

            500: function (err) {
                //Show error message
                $("#error-message-update").html("<strong>Foutje!</strong> Het is niet jouw fout probeer het later nog eens.");
                if ($("#error-message-update").is(':hidden')){
                    $("#error-message-update").toggle();
                }

            },
            default: function (err) {
                //Show error message
                $("#error-message-update").html("<strong>Foutje!</strong> Probeer het later nog eens.");
                if ($("#error-message-update").is(':hidden')){
                    $("#error-message-update").toggle();
                }

            }
        }
    });
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}