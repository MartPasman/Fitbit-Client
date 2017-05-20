/**
 * Created by sveno on 19-5-2017.
 */
$(document).ready(function () {

    //Hide the messages
    $("#success-message").hide();
    $("#error-message").hide();

    $('#save-button').click(function () {

        //Trim values from input group fields
        var steps = $("#steps").val().trim();
        var start = $("#start-date").val().trim();
        var end = $("#end-date").val().trim();

        //Deletes all errors
        $("#steps-div").removeClass("has-error");
        $("#start-div").removeClass("has-error");
        $("#end-div").removeClass("has-error");

        if (isEmpty(steps) || isEmpty(start) || isEmpty(end)) {
            //Sets a error
            $("#success-message").hide();
            $("#error-message").html("<strong>Foutje!</strong> Vul wel alle informatie in");
            if ($("#error-message").is(':hidden')){
                $("#error-message").toggle();
            }

            //Make not correctly filled in input group red
            if (isEmpty(steps)) {
                $("#steps-div").addClass("has-error");
            }
            if (isEmpty(start)) {
                $("#start-div").addClass("has-error");
            }
            if(isEmpty(end)) {
                $("#end-div").addClass("has-error");
            }

        } else {

            //Sets date to javascript date time for in database
            var dateParts = start.split("/");
            var startdate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])

            var dateParts = end.split("/");
            var enddate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

            //Call to add a goal
            $.ajax({
                url: REST + '/users/goal/add',
                method: 'POST',
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
                        $("#error-message").hide();
                        if ($("#success-message").is(':hidden')) {
                            $("#success-message").toggle();
                        }
                    },
                    401: function (err) {
                        //Unauthorized error message
                        $("#success-message").hide();
                        $("#error-message").html("<strong>Foutje!</strong> Je bent niet ingelogd.");
                        if ($("#error-message").is(':hidden')){
                            $("#error-message").toggle();
                        }

                    },

                    500: function (err) {
                        //Internal server error message
                        $("#success-message").hide();
                        $("#error-message").html("<strong>Foutje!</strong> Het is niet jouw fout probeer het later nog eens.");
                        if ($("#error-message").is(':hidden')){
                            $("#error-message").toggle();
                        }
                    },
                    default: function (err) {
                        //Default error message
                        $("#success-message").hide();
                        $("#error-message").html("<strong>Foutje!</strong> Probeer het nog eens.");
                        if ($("#error-message").is(':hidden')){
                            $("#error-message").toggle();
                        }
                    }
                }
            });
        }
    });
});

//Check if variable is empty
function isEmpty(str) {
    return (!str || 0 === str.length);
}