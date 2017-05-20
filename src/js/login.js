/**
 * Created by sveno on 17-5-2017.
 */
$(document).ready(function () {

    $("#error").hide();
    $('#login').click(function () {
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
                        localStorage["token"] = data.success;
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
                    401: function (err) {
                        if ($("#error").is(':hidden')) {
                            $("#error").toggle();
                        }
                    },
                    403: function (err) {
                        // set the modal title
                        modal.find('.modal-title').html('Er is iets misgegaan!');
                        // set the modal body
                        modal.find('.modal-body').html("Dit account is op inactief gesteld. Neem contact op met de administrator.");
                        // show the modal
                        modal.modal();
                    },
                    500: function (err) {
                        // set the modal title
                        modal.find('.modal-title').html('Er is iets misgegaan!');
                        // set the modal body
                        modal.find('.modal-body').html("Het is niet jouw fout, probeer het later nog eens.");
                        // show the modal
                        modal.modal();
                    },
                    default: function (err) {
                        // set the modal title
                        modal.find('.modal-title').html('Er is iets misgegaan!');
                        // set the modal body
                        modal.find('.modal-body').html("Probeer het nog eens.");
                        // show the modal
                        modal.modal();
                    }
                }
            });
        }
    });
});


function isEmpty(str) {
    return (!str || 0 === str.length);
}


