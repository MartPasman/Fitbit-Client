/**
 * Created by sveno on 22-5-2017.
 */
$(document).ready(function () {

    const errorMsg = $("#error-msg");
    const successMsg = $("#success-msg");
    const oldPass = $("#old-pass");
    const newPass1 = $("#new-pass1");
    const newPass2 = $("#new-pass2");
    const oldIcon = $("#old-icon");
    const newIcon1 = $("#new-icon1");
    const newIcon2 = $("#new-icon2");

    successMsg.hide();
    errorMsg.hide();

    $('#change-password').click(function () {
        var old = oldPass.val().trim();
        var new1 = newPass1.val().trim();
        var new2 = newPass2.val().trim();

        if (isEmpty(old) || isEmpty(new1) || isEmpty(new2)) {
            messageToggleFull(errorMsg, successMsg, "<strong>Foutje!</strong> Vul wel alle informatie in.");
            return;
        }

        if (new1 !== new2) {
            messageToggleFull(errorMsg, successMsg, "<strong>Foutje!</strong> De wachtwoorden zijn niet gelijk aan elkaar.");
            return;
        }

        if (old.length < 8 || new1.length < 8 || new2.length < 8) {
            messageToggleFull(errorMsg, successMsg, "<strong>Foutje!</strong> Een van de wachtwoorden is niet lang genoeg.");
            return;
        }

        $.ajax({
            url: REST + '/accounts/password',
            method: 'PUT',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
            },
            data: {
                old: old,
                new1: new1,
                new2: new2
            },
            statusCode: {
                201: function (data) {
                    //Success message
                    messageToggleFull(successMsg, errorMsg, "<strong>Gelukt!</strong> Je wachtwoord is nu veranderd.");
                },
                400: function (err) {
                    //Unauthorized error message
                    messageToggleFull(errorMsg, successMsg, "<strong>Foutje!</strong> Probeer het nog eens.");
                },
                401: function (err) {
                    //Unauthorized error message
                    messageToggleFull(errorMsg, successMsg, "<strong>Foutje!</strong> Verkeerd wachtwoord ingevoerd.");
                    changeIcon(oldIcon, "glyphicon-lock", "glyphicon-ok", "glyphicon-remove", "#ff0000");
                },
                500: function (err) {
                    //Internal server error message
                    messageToggleFull(errorMsg, successMsg, "<strong>Foutje!</strong> Het is niet jou fout, probeer het later nog eens.");
                },
                default: function (err) {
                    //Default error message
                    messageToggleFull(errorMsg, successMsg, "<strong>Foutje!</strong> Probeer het nog eens.");
                }
            }

        });
    });

    $("input[type=password]").keyup(function () {
        if (oldPass.val().length >= 8) {
            changeIcon(oldIcon, "glyphicon-lock", "glyphicon-remove", "glyphicon-ok", "#00A41E");
        } else if (oldPass.val().length >= 1) {
            changeIcon(oldIcon, "glyphicon-lock", "glyphicon-ok", "glyphicon-remove", "#ff0000");
        } else {
            oldIcon(oldIcon, "glyphicon-ok", "glyphicon-remove", "glyphicon-lock", "#000000");
        }

        if (newPass1.val().length >= 8) {
            changeIcon(newIcon1, "glyphicon-lock", "glyphicon-remove", "glyphicon-ok", "#00A41E");
        } else if (newPass1.val().length >= 1) {
            changeIcon(newIcon1, "glyphicon-lock", "glyphicon-ok", "glyphicon-remove", "#ff0000");
        } else {
            changeIcon(newIcon1, "glyphicon-ok", "glyphicon-remove", "glyphicon-lock", "#000000");
        }

        if (newPass2.val().length >= 8 && newPass2.val() === newPass1.val()) {
            changeIcon(newIcon2, "glyphicon-lock", "glyphicon-remove", "glyphicon-ok", "#00A41E");
        } else if (newPass2.val().length >= 1) {
            changeIcon(newIcon2, "glyphicon-lock", "glyphicon-ok", "glyphicon-remove", "#ff0000");
        } else {
            changeIcon(newIcon2, "glyphicon-ok", "glyphicon-remove", "glyphicon-lock", "#000000");
        }
    });
});

//Check if variable is empty
function isEmpty(str) {
    return (!str || 0 === str.length);
}



