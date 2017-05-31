/**
 * Created by sveno on 17-5-2017.
 */
$(document).ready(function () {

    $("#error").hide();

    $(document).keypress(function(e) {
        if(e.which === 13) {
            login();
        }
    });

    $('#login').click(function () {
        login();
    });

    function login(){
        var id = $("#id").val().trim();
        var password = $("#password").val().trim();
        var modal = $('#modal-login-error');

        $("#passdiv").removeClass("has-error");
        $("#iddiv").removeClass("has-error");

        if (isEmpty(id) || isEmpty(password) || !id.match(/^\d+$/)) {

            if (isEmpty(password)) {
                $("#passdiv").addClass("has-error");
            }
            if (isEmpty(id)) {
                $("#iddiv").addClass("has-error");
            }
            if(!id.match(/^\d+$/)) {
                $("#iddiv").addClass("has-error");
            }


        } else {

            $.ajax({
                url: REST + '/accounts/login',
                method: 'POST',
                data: {
                    id: id,
                    password: password
                },
                statusCode: {
                    201: function (data) {
                        console.dir(data.token);
                        localStorage.setItem("token", data.success);
                        localStorage.setItem("userid", data.userid);
                        switch (data.permission){
                            case 1:
                                location.replace("results.php");
                                break;
                            case 2:
                                break;
                            case 3:
                                location.replace("admin-dashboard.php");
                                break;
                        }
                    },
                    400: function (err) {
                        $("#error").html("<strong>Foutje!</strong> Je wachtwoord of ID is onjuist");
                        if ($("#error").is(':hidden')) {
                            $("#error").toggle();
                        }
                    },
                    401: function (err) {
                        $("#error").html("<strong>Foutje!</strong> Je wachtwoord of ID is onjuist");
                        if ($("#error").is(':hidden')) {
                            $("#error").toggle();
                        }
                    },
                    403: function (err) {
                        $("#error").html("<strong>Foutje!</strong> Dit account is op inactief gesteld! neem contact op met de administrator.");
                        if ($("#error").is(':hidden')) {
                            $("#error").toggle();
                        }
                    },
                    500: function (err) {
                        $("#error").html("<strong>Foutje!</strong> Je kan hier niks aandoen. Probeer het later opnieuw.");
                        if ($("#error").is(':hidden')) {
                            $("#error").toggle();
                        }
                    },
                    default: function (err) {
                        $("#error").html("<strong>Foutje!</strong> Er ging iets mis. Probeer het opnieuw.");
                        if ($("#error").is(':hidden')) {
                            $("#error").toggle();
                        }
                    }
                }
            });
        }
    }
});

function isEmpty(str) {
    return (!str || 0 === str.length);
}


