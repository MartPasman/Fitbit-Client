/**
 * Created by sveno on 19-5-2017.
 */
$(document).ready(function () {
    //Hide the messages

    let successMessage = $("#success-message");
    let errorMessage = $("#error-message");
    let successMessageUpdate = $("#success-message-update");
    let errorMessageUpdate = $("#error-message-update");

    successMessage.hide();
    errorMessage.hide();
    successMessageUpdate.hide();
    errorMessageUpdate.hide();

    $('#save-button').click(function () {

        //Trim values from input group fields
        let steps = $("#steps").val().trim();
        let start = $("#start-date").val().trim();
        let end = $("#end-date").val().trim();

        //Deletes all errors
        $("#steps-div").removeClass("has-error");
        $("#start-div").removeClass("has-error");
        $("#end-div").removeClass("has-error");

        if (isEmpty(steps) || isEmpty(start) || isEmpty(end)) {
            //Sets a error

            messageToggle(errorMsg, successMsg, "<strong>Foutje!</strong> Vul wel alle informatie in.");
            //Make not correctly filled in input group red
            if (isEmpty(steps)) {
                $("#steps-div").addClass("has-error");
            }
            if (isEmpty(start)) {
                $("#start-div").addClass("has-error");
            }
            if (isEmpty(end)) {
                $("#end-div").addClass("has-error");
            }

        } else {

            //Sets date to javascript date time for in database
            let dateParts = start.split("/");
            let startDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);


            dateParts = end.split('/');
            let endDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
            console.log(endDate);

            //Call to add a goal
            $.ajax({
                url: REST + '/users/' + localStorage.getItem("userid") + '/goals',
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem("token")
                },
                data: {
                    start: start,
                    end: end,
                    goal: steps
                },
                statusCode: {
                    201: function (data) {
                        //Success message
                        messageToggle(successMessage, errorMessage, "<strong>Gelukt!</strong> Veel succes met je nieuwe doelstelling.");
                        getGoalsHistory();
                    },
                    401: function (err) {
                        //Unauthorized error message
                        messageToggle(errorMessage, successMessage, "<strong>Foutje!</strong> Je bent niet ingelogd.");

                    },
                    500: function (err) {
                        //Internal server error message
                        messageToggle(errorMessage, successMessage, "<strong>Foutje!</strong> Probeer het later nog eens.");
                    },
                    default: function (err) {
                        //Default error message
                        messageToggle(errorMessage, successMessage, "<strong>Foutje!</strong> Probeer het nog eens.");

                    }
                }
            });
        }
    });
});

//Check if letiable is empty
function isEmpty(str) {
    return (!str || 0 === str.length);
}

function messageToggle(object, objecthide, message) {
    objecthide.hide();
    object.html(message);
    if (object.is(':hidden')) {
        object.toggle();
    }
}