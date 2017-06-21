/**
 * Created by sveno on 19-5-2017.
 */
$(document).ready(function () {
    //Hide the messages

    let successMessage = $("#successed-message");
    let errorMessage = $("#error-message");
    let successMessageUpdate = $("#successed-message-update");
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

            messageToggleFull(errorMessage, successMessage, "<strong>Foutje!</strong> Vul wel alle informatie in.");
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
            let dateparts = start.split('/');
            start = dateparts[2] + '-' + dateparts[1] + '-' + dateparts[0];

            //Sets date to javascript date time for in database
            let dateparts2 = end.split('/');
            end = dateparts2[2] + '-' + dateparts2[1] + '-' + dateparts2[0];

            // check dates
            if (new Date(start) < new Date() || new Date(end) < new Date(start)) {
                messageToggleFull(errorMessage, successMessage, 'De begindatum moet in de toekomst liggen en de einddatum moet na de startdatum liggen.');
                return;
            }

            // check amount of steps
            if (steps > 999999) {
                messageToggleFull(errorMessage, successMessage, 'Het aantal stappen moet kleiner zijn dan één miljoen.');
                return;
            }

            //Call to add a goal
            $.ajax({
                url: REST + '/users/' + localStorage.getItem('userid') + '/goals',
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                data: {
                    start: start,
                    end: end,
                    goal: steps
                },
                statusCode: {
                    201: function () {
                        //Success message
                        messageToggleFull(successMessage, errorMessage, "<strong>Gelukt!</strong> Veel succes met je nieuwe doelstelling.");
                        getGoalsHistory();
                    },
                    401: logout,
                    500: function () {
                        //Internal server error message
                        messageToggleFull(errorMessage, successMessage, "<strong>Foutje!</strong> Probeer het later nog eens.");
                    },
                    default: function () {
                        //Default error message
                        messageToggleFull(errorMessage, successMessage, "<strong>Foutje!</strong> Probeer het nog eens.");
                    }
                }
            });
        }
    });
});

// check if variable is empty
function isEmpty(str) {
    return (!str || 0 === str.length);
}