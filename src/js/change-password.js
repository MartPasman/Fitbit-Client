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
            successMsg.hide();
            errorMsg.html("<strong>Foutje!</strong> Vul wel alle informatie in!");
            if (errorMsg.is(':hidden')) {
                errorMsg.toggle();
            }
            return;
        }

        if (new1 !== new2) {
            successMsg.hide();
            errorMsg.html("<strong>Foutje!</strong> De wachtwoorden zijn niet gelijk aan elkaar!");
            if (errorMsg.is(':hidden')) {
                errorMsg.toggle();
            }
            return;
        }

        if (old.length < 8 || new1.length < 8 || new2.length < 8) {
            successMsg.hide();
            errorMsg.html("<strong>Foutje!</strong> Een van de wachtwoorden is niet lang genoeg!");
            if (errorMsg.is(':hidden')) {
                errorMsg.toggle();
            }
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
                    errorMsg.hide();
                    if (successMsg.is(':hidden')) {
                        successMsg.toggle();
                    }
                },
                400: function (err) {
                    //Unauthorized error message
                    successMsg.hide();
                    errorMsg.html("<strong>Foutje!</strong> Probeer het nog eens.");
                    if (errorMsg.is(':hidden')) {
                        errorMsg.toggle();
                    }

                },
                401: function (err) {
                    //Unauthorized error message
                    successMsg.hide();
                    errorMsg.html("<strong>Foutje!</strong> Je bent niet ingelogd.");
                    if (errorMsg.is(':hidden')) {
                        errorMsg.toggle();
                    }

                },
                500: function (err) {
                    //Internal server error message
                    successMsg.hide();
                    errorMsg.html("<strong>Foutje!</strong> Het is niet jouw fout probeer het later nog eens.");
                    if (errorMsg.is(':hidden')) {
                        errorMsg.toggle();
                    }
                },
                default: function (err) {
                    //Default error message
                    successMsg.hide();
                    errorMsg.html("<strong>Foutje!</strong> Probeer het nog eens.");
                    if (errorMsg.is(':hidden')) {
                        errorMsg.toggle();
                    }
                }
            }

        });
    });

    $("input[type=password]").keyup(function () {
        if (oldPass.val().length >= 8) {
            oldIcon.removeClass("glyphicon-lock");
            oldIcon.removeClass("glyphicon-remove");
            oldIcon.addClass("glyphicon-ok");
            oldIcon.css("color", "#00A41E");
            oldPass.addClass("has-success");
        } else if (oldPass.val().length >= 1) {
            oldIcon.removeClass("glyphicon-ok");
            oldIcon.removeClass("glyphicon-lock");
            oldIcon.addClass("glyphicon-remove");
            oldIcon.css("color", "#ff0000");
            oldPass.removeClass("has-success");
            oldPass.addClass("has-error");
        } else {
            oldIcon.removeClass("glyphicon-ok");
            oldIcon.removeClass("glyphicon-remove");
            oldIcon.addClass("glyphicon-lock");
            oldIcon.css("color", "#000000");
            oldPass.removeClass("has-success");
        }

        if (newPass1.val().length >= 8) {
            newIcon1.removeClass("glyphicon-lock");
            newIcon1.removeClass("glyphicon-remove");
            newIcon1.addClass("glyphicon-ok");
            newIcon1.css("color", "#00A41E");
            newPass1.addClass("has-success");
        } else if (newPass1.val().length >= 1) {
            newIcon1.removeClass("glyphicon-ok");
            newIcon1.removeClass("glyphicon-lock");
            newIcon1.addClass("glyphicon-remove");
            newIcon1.css("color", "#ff0000");
            newPass1.removeClass("has-success");
            newPass1.addClass("has-error");
        } else {
            newIcon1.removeClass("glyphicon-ok");
            newIcon1.removeClass("glyphicon-remove");
            newIcon1.addClass("glyphicon-lock");
            newIcon1.css("color", "#000000");
            newPass1.removeClass("has-success");
        }

        if (newPass2.val().length >= 8 && newPass2.val() === newPass1.val()) {
            newIcon2.removeClass("glyphicon-lock");
            newIcon2.removeClass("glyphicon-remove");
            newIcon2.addClass("glyphicon-ok");
            newIcon2.css("color", "#00A41E");
            newPass2.addClass("has-success");
        } else if (newPass2.val().length >= 1) {
            newIcon2.removeClass("glyphicon-ok");
            newIcon2.removeClass("glyphicon-lock");
            newIcon2.addClass("glyphicon-remove");
            newIcon2.css("color", "#ff0000");
            newPass2.removeClass("has-success");
            newPass2.addClass("has-error");
        } else {
            newIcon2.removeClass("glyphicon-ok");
            newIcon2.removeClass("glyphicon-remove");
            newIcon2.addClass("glyphicon-lock");
            newIcon2.css("color", "#000000");
            newPass2.removeClass("has-success");
            newPass2.removeClass("has-error");
        }
    });
});

//Check if variable is empty
function isEmpty(str) {
    return (!str || 0 === str.length);
}