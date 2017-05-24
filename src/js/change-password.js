/**
 * Created by sveno on 22-5-2017.
 */
$(document).ready(function () {
    $("#success-msg").hide();
    $("#error-msg").hide();

    $('#change-password').click(function () {
        var old = $("#old-pass").val().trim();
        var new1 = $("#new-pass1").val().trim();
        var new2 = $("#new-pass2").val().trim();

        if (isEmpty(old) || isEmpty(new1) || isEmpty(new2)) {
            $("#success-msg").hide();
            $("#error-msg").html("<strong>Foutje!</strong> Vul wel alle informatie in!");
            if ($("#error-msg").is(':hidden')) {
                $("#error-msg").toggle();
            }
            return;
        }

        if (new1 !== new2) {
            $("#success-msg").hide();
            $("#error-msg").html("<strong>Foutje!</strong> De wachtwoorden zijn niet gelijk aan elkaar!");
            if ($("#error-msg").is(':hidden')) {
                $("#error-msg").toggle();
            }
            return;
        }

        if (!isLongEnough(old, 8) || !isLongEnough(new1, 8) || !isLongEnough(new2, 8)) {
            $("#success-msg").hide();
            $("#error-msg").html("<strong>Foutje!</strong> Een van de wachtwoorden is niet lang genoeg!");
            if ($("#error-msg").is(':hidden')) {
                $("#error-msg").toggle();
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
                    $("#error-msg").hide();
                    if ($("#success-msg").is(':hidden')) {
                        $("#success-msg").toggle();
                    }
                },
                401: function (err) {
                    //Unauthorized error message
                    $("#success-msg").hide();
                    $("#error-msg").html("<strong>Foutje!</strong> Je bent niet ingelogd.");
                    if ($("#error-msg").is(':hidden')) {
                        $("#error-msg").toggle();
                    }

                },

                500: function (err) {
                    //Internal server error message
                    $("#success-msg").hide();
                    $("#error-msg").html("<strong>Foutje!</strong> Het is niet jouw fout probeer het later nog eens.");
                    if ($("#error-msg").is(':hidden')) {
                        $("#error-msg").toggle();
                    }
                },
                default: function (err) {
                    //Default error message
                    $("#success-msg").hide();
                    $("#error-msg").html("<strong>Foutje!</strong> Probeer het nog eens.");
                    if ($("#error-msg").is(':hidden')) {
                        $("#error-msg").toggle();
                    }
                }
            }

        });
    });

    $("input[type=password]").keyup(function () {
        if($("#old-pass").val().length >= 8){
            $("#old-icon").removeClass("glyphicon-lock");
            $("#old-icon").removeClass("glyphicon-remove");
            $("#old-icon").addClass("glyphicon-ok");
            $("#old-icon").css("color","#00A41E");
            $("#old-pass").addClass("has-success");
        }else if($("#old-pass").val().length >= 1){
            $("#old-icon").removeClass("glyphicon-ok");
            $("#old-icon").removeClass("glyphicon-lock");
            $("#old-icon").addClass("glyphicon-remove");
            $("#old-icon").css("color","#ff0000");
            $("#old-pass").removeClass("has-success");
            $("#old-pass").addClass("has-error");
        }else{
            $("#old-icon").removeClass("glyphicon-ok");
            $("#old-icon").removeClass("glyphicon-remove");
            $("#old-icon").addClass("glyphicon-lock");
            $("#old-icon").css("color","#000000");
            $("#old-pass").removeClass("has-success");
        }

        if($("#new-pass1").val().length >= 8){
            $("#new-icon1").removeClass("glyphicon-lock");
            $("#new-icon1").removeClass("glyphicon-remove");
            $("#new-icon1").addClass("glyphicon-ok");
            $("#new-icon1").css("color","#00A41E");
            $("#new-pass1").addClass("has-success");
        }else if($("#new-pass1").val().length >= 1){
            $("#new-icon1").removeClass("glyphicon-ok");
            $("#new-icon1").removeClass("glyphicon-lock");
            $("#new-icon1").addClass("glyphicon-remove");
            $("#new-icon1").css("color","#ff0000");
            $("#new-pass1").removeClass("has-success");
            $("#new-pass1").addClass("has-error");
        }else{
            $("#new-icon1").removeClass("glyphicon-ok");
            $("#new-icon1").removeClass("glyphicon-remove");
            $("#new-icon1").addClass("glyphicon-lock");
            $("#new-icon1").css("color","#000000");
            $("#new-pass1").removeClass("has-success");
        }

        if($("#new-pass2").val().length >= 8 && $("#new-pass2").val() === $("#new-pass1").val()){
            $("#new-icon2").removeClass("glyphicon-lock");
            $("#new-icon2").removeClass("glyphicon-remove");
            $("#new-icon2").addClass("glyphicon-ok");
            $("#new-icon2").css("color","#00A41E");
            $("#new-pass2").addClass("has-success");
        }else if($("#new-pass2").val().length >= 1){
            $("#new-icon2").removeClass("glyphicon-ok");
            $("#new-icon2").removeClass("glyphicon-lock");
            $("#new-icon2").addClass("glyphicon-remove");
            $("#new-icon2").css("color","#ff0000");
            $("#new-pass2").removeClass("has-success");
            $("#new-pass2").addClass("has-error");
        }else{
            $("#new-icon2").removeClass("glyphicon-ok");
            $("#new-icon2").removeClass("glyphicon-remove");
            $("#new-icon2").addClass("glyphicon-lock");
            $("#new-icon2").css("color","#000000");
            $("#new-pass2").removeClass("has-success");
            $("#new-pass2").removeClass("has-error");
        }
    });
});

//Check if variable is empty
function isEmpty(str) {
    return (!str || 0 === str.length);
}

//Check if variable long enough
function isLongEnough(str, length) {
    return (str.length >= length);
}