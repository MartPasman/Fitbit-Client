/**
 * Created by sveno on 29-5-2017.
 */

$(document).ready(function () {
    $('#error').hide();
    $('#success').hide();
    loadStandardInformation();

    $('#buttons').on('click', '#save-change-information', function () {
        $('#error').hide();
        $('#success').hide();

        var first_name = $('#first-name-update').val().trim();
        var last_name = $('#last-name-update').val().trim();
        var birthdate = $('#date-update').val().trim();
        var email = $('#email-update').val().trim();

        $("#first-name-div-update").removeClass("has-error");
        $("#last-name-div-update").removeClass("has-error");
        $("#email-div-update").removeClass("has-error");
        $("#date-div-update").removeClass("has-error");

        if (isEmpty(first_name) || isEmpty(last_name) || isEmpty(birthdate) || isEmpty(email)  || !validateEmail(email)) {
            if (isEmpty(first_name)) {
                $("#first-name-div-update").addClass("has-error");
            }
            if (isEmpty(last_name)) {
                $("#last-name-div-update").addClass("has-error");
            }
            if (isEmpty(birthdate)) {
                $("#date-div-update").addClass("has-error");
            }
            if (isEmpty(email) || !validateEmail(email)) {
                $("#email-div-update").addClass("has-error");
            }
        } else {
            var dateParts = birthdate.split("/");
            var bday = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

            //Call to add a goal
            $.ajax({
                url: REST + '/users/'+localStorage.getItem("userid"),
                method: 'PUT',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
                },
                data: {
                    firstname: first_name,
                    lastname: last_name,
                    birthday: birthdate,
                    email: email
                },
                statusCode: {
                    200: function (data) {
                        //Success message
                        $("#error").hide();
                        if ($("#success").is(':hidden')) {
                            $("#success").toggle();
                        }
                        loadStandardInformation();
                    },
                    401: function (err) {
                        //Unauthorized error message
                        $("#success").hide();
                        $("#error").html("<strong>Foutje!</strong> Je bent niet ingelogd.");
                        if ($("#error").is(':hidden')){
                            $("#error").toggle();
                        }

                    },

                    500: function (err) {
                        //Internal server error message
                        $("#success").hide();
                        $("#error").html("<strong>Foutje!</strong> Het is niet jouw fout probeer het later nog eens.");
                        if ($("#error").is(':hidden')){
                            $("#error").toggle();
                        }
                    },
                    default: function (err) {
                        //Default error message
                        $("#success").hide();
                        $("#error").html("<strong>Foutje!</strong> Probeer het nog eens.");
                        if ($("#error").is(':hidden')){
                            $("#error").toggle();
                        }
                    }
                }
            });
        }
    });

    $('#buttons').on('click', '#change-information', function () {
        $('#error').hide();
        $('#success').hide();
        $.ajax({
            url: REST + '/users/' + localStorage.getItem('userid'),
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            statusCode: {
                200: function (data) {
                    var date = new Date(data.success.birthday);

                    var month = date.getMonth() + 1;

                    date = date.getDate() + '/' + month + '/' + date.getFullYear();
                    $('#name-field').html('<div class="row">' +
                        '<div class="form-group col-sm-6 col-xs-12">' +
                        '<div class="input-group" id="first-name-div-update">' +
                        ' <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span> ' +
                        '<input type="text" class="form-control" id="first-name-update" value="' + data.success.firstname + '" placeholder="Voornaam">' +
                        ' </div>' +
                        '</div> ' +
                        '<div class="form-group col-sm-6 col-xs-12">' +
                        '<div class="input-group" id="last-name-div-update">' +
                        ' <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span> ' +
                        '<input type="text" class="form-control" id="last-name-update" value="' + data.success.lastname + '" placeholder="Achternaam">' +
                        ' </div>' +
                        '</div> ' +
                        '</div>');

                    $('#email-field').html('<div class="input-group" id="email-div-update">' +
                        ' <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span> ' +
                        '<input type="text" class="form-control" id="email-update" value="' + data.success.email + '" placeholder="Email">' +
                        ' </div>');

                    $('#date-field').html('<div class="input-group" id="date-div-update">' +
                        ' <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span> ' +
                        '<input type="text" class="form-control" id="date-update" name="date" value="' + date + '" placeholder="Birthdate">' +
                        ' </div>');


                    $('#buttons').html('<button type="button" class="col-sm-3 col-xs-12 btn btn-danger" id="close-change-information">' +
                        '<i class="glyphicon glyphicon-remove"></i> &nbsp Sluiten' +
                        '</button>' +
                        '<button type="button" class="col-sm-9 col-xs-12 btn btn-success" id="save-change-information">' +
                        '<i class="glyphicon glyphicon-pencil"></i> &nbsp Opslaan' +
                        '</button>');

                    datePicker();
                },
                400: function (err) {
                    $("#error").html("<strong>Foutje!</strong> Probeer het nog eens");
                    if ($("#error").is(':hidden')) {
                        $("#error").toggle();
                    }
                },
                401: function (err) {
                    $("#error").html("<strong>Foutje!</strong> Ben je nog wel ingelogd?");
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
    });

    $('#buttons').on('click', '#close-change-information', function () {
        $('#error').hide();
        $('#success').hide();
        loadStandardInformation();
    });
});

function datePicker() {
    var date_input = $('input[name="date"]'); //our date input has the name "date"
    var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    date_input.datepicker({
        format: 'dd/mm/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true
    })
}

function loadStandardInformation() {
    $.ajax({
        url: REST + '/users/' + localStorage.getItem('userid'),
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        statusCode: {
            200: function (data) {
                var birthday = data.success.birthday;
                var date1 = new Date(birthday);

                var month = date1.getMonth() + 1;


                date1 = date1.getDate() + '/' + month + '/' + date1.getFullYear();


                var age = diff_years(new Date(birthday), new Date());

                $('#id-field').html('<div class="glyphicon glyphicon-barcode"></div> &nbsp ' + data.success.id);

                $('#name-field').html('<div class="glyphicon glyphicon-user"></div> &nbsp ' + data.success.firstname + ' ' + data.success.lastname);

                $('#email-field').html('<div class="glyphicon glyphicon-envelope"></div> &nbsp ' + data.success.email);

                $('#date-field').html('<div class="glyphicon glyphicon-calendar"></div> &nbsp ' + date1);

                $('#age-field').html('<div class="glyphicon glyphicon-gift"></div> &nbsp ' + age + ' Jaar');

                switch (data.success.handicap) {
                    case 1:
                        $('#health-field').html('<div class="glyphicon glyphicon-heart"></div> &nbsp Goed ter been');
                        break;
                    case 2:
                        $('#health-field').html('<div class="glyphicon glyphicon-heart"></div> &nbsp Minder goed ter been');
                        break;
                    case 3:
                        $('#health-field').html('<div class="glyphicon glyphicon-heart"></div> &nbsp Slecht ter been');
                        break;
                    default:
                        $('#health-field').html('<div class="glyphicon glyphicon-heart"></div> &nbsp Goed ter been');
                        break;
                }

                $('#buttons').html('<button type="button" class="col-xs-12 btn btn-success" id="change-information"> ' +
                    '<i class="glyphicon glyphicon-pencil"></i> &nbsp Aanpassen' +
                    '</button>');
            },
            400: function (err) {
                $("#error").html("<strong>Foutje!</strong> Probeer het later nog eens.");
                if ($("#error").is(':hidden')) {
                    $("#error").toggle();
                }
            },
            401: function (err) {
                $("#error").html("<strong>Foutje!</strong> Ben je wel ingelogd?");
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

function diff_years(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff / 365.25));

}

//Check if variable is empty
function isEmpty(str) {
    return (!str || 0 === str.length);
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}