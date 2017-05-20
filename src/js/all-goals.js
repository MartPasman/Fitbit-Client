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

});

function loadGoals(offset) {
    //Ajax call for loading the goals
    $.ajax({
        url: REST + '/users/goal/'+offset,
        method: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
        },
        statusCode: {
            201: function (data) {
                var html = ' <table class="table table-striped"> <thead><tr> <th>Stappen</th> <th>Start datum</th> <th>Eind datum</th> <th>Verwijderen</th> </tr> </thead> <tbody>';

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
                    html += '<td><a  id="'+id+'" class="trash-btn"><span class="glyphicon glyphicon-trash"></span></a></td>';
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
        url: REST + '/users/goal/delete/'+id,
        method: 'GET',
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

function isEmpty(str) {
    return (!str || 0 === str.length);
}