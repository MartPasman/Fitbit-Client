/**
 * Created by sveno on 29-5-2017.
 */

let err = $("#err");
let successed = $("#successed");
let first_name_divs = $('#first-name-div-update');
let last_name_divs = $('#last-name-div-update');
let birthdate_divs = $('#date-div-update');


$(document).ready(function () {
    err.hide();
    successed.hide();
    loadStandardInformation();

    $('#buttons').on('click', '#save-change-information', function () {
        err.hide();
        successed.hide();

        var first_name = $('#first-name-update').val().trim();
        var last_name = $('#last-name-update').val().trim();
        var birthdate = $('#date-update').val().trim();

        first_name_divs.removeClass("has-err");
        last_name_divs.removeClass("has-err");
        birthdate_divs.removeClass("has-err");

        if (isEmpty(first_name) || isEmpty(last_name) || isEmpty(birthdate) || first_name.length > 49 || last_name.length > 49) {
            messageToggleFull(err,successed,"<strong>Foutje!</strong> Vul alle informatie correct in.");
            if (isEmpty(first_name) || first_name.length > 49) {
               first_name_divs.addClass("has-err");
            }
            if (isEmpty(last_name) || last_name.length > 49) {
                last_name_divs.addClass("has-err");
            }
            if (isEmpty(birthdate)) {
                birthdate_divs.addClass("has-err");
            }
        } else {

            let dateparts = birthdate.split('/');
            birthdate = dateparts[2] + '/' + dateparts[1] + '/' + dateparts[0];

            //Call to add a goal
            $.ajax({
                url: REST + '/users/' + localStorage.getItem("userid"),
                method: 'PUT',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
                },
                data: {
                    firstname: first_name,
                    lastname: last_name,
                    birthday: birthdate
                },
                statusCode: {
                    200: function (data) {
                        //Success message
                        messageToggleFull(successed,err,"<strong>Gelukt!</strong> Je informatie is gewijzigd.");
                        loadStandardInformation();
                    },
                    400: function (err) {
                        //Bad request err message
                        messageToggleFull(err,successed,"<strong>Foutje!</strong> Probeer het nog eens");
                    },
                    401: function (err) {
                        //Unauthorized err message
                        messageToggleFull(err,successed,"<strong>Foutje!</strong> Je bent niet ingelogd.");
                    },

                    500: function (err) {
                        //Internal server err message
                        messageToggleFull(err,successed,"<strong>Foutje!</strong> Het is niet jouw fout probeer het later nog eens.");
                    },
                    default: function (err) {
                        //Default err message
                        messageToggleFull(err,successed,"<strong>Foutje!</strong> Probeer het nog eens.");
                    }
                }
            });
        }
    });

    $('#buttons').on('click', '#change-information', function () {
        err.hide();
        successed.hide();
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

                    $('#date-field').html('<div class="input-group" id="date-div-update">' +
                        ' <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span> ' +
                        '<input type="text" class="form-control" id="date-update" name="date" value="' + date + '" placeholder="Birthdate">' +
                        ' </div>');


                    $('#buttons').html('<button type="button" class="col-sm-4 col-xs-12 btn btn-danger" id="close-change-information">' +
                        '<i class="glyphicon glyphicon-remove"></i> Sluiten' +
                        '</button>' +
                        '<button type="button" class="col-sm-4 col-sm-offset-4 col-xs-12 btn btn-successed" id="save-change-information">' +
                        '<i class="glyphicon glyphicon-pencil"></i> Opslaan' +
                        '</button>');

                    datePicker();
                },
                400: function (err) {
                    messageToggleFull(err,successed,"<strong>Foutje!</strong> Probeer het nog eens");
                },
                401: function (err) {
                    messageToggleFull(err,successed,"<strong>Foutje!</strong> Ben je nog wel ingelogd?");
                },
                403: function (err) {
                    messageToggleFull(err,successed,"<strong>Foutje!</strong> Dit account is op inactief gesteld! neem contact op met de administrator.");
                },
                500: function (err) {
                    messageToggleFull(err,successed,"<strong>Foutje!</strong> Je kan hier niks aandoen. Probeer het later opnieuw.");
                },
                default: function (err) {
                    messageToggleFull(err,successed,"<strong>Foutje!</strong> Er ging iets mis. Probeer het opnieuw.");
                }
            }
        });
    });

    $('#buttons').on('click', '#close-change-information', function () {
        err.hide();
        successed.hide();
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


                var age = getAge(birthday);

                $('#id-field').html('<div class="glyphicon glyphicon-barcode"></div> &nbsp ' + data.success.id);

                $('#name-field').html('<div class="glyphicon glyphicon-user"></div> &nbsp ' + data.success.firstname + ' ' + data.success.lastname);

                $('#date-field').html('<div class="glyphicon glyphicon-calendar"></div> &nbsp ' + date1);

                $('#age-field').html('<div class="glyphicon glyphicon-gift"></div> &nbsp ' + age + ' Jaar');
                if (localStorage.getItem('perm') == 1) {
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
                }

                $('#buttons').html('<button type="button" class="col-xs-12 btn btn-successed" id="change-information"> ' +
                    '<i class="glyphicon glyphicon-pencil"></i> &nbsp Aanpassen' +
                    '</button>');
            },
            400: function (err) {
                err.html("<strong>Foutje!</strong> Probeer het later nog eens.");
                if (err.is(':hidden')) {
                    err.toggle();
                }
            },
            401: function (err) {
                err.html("<strong>Foutje!</strong> Ben je wel ingelogd?");
                if (err.is(':hidden')) {
                    err.toggle();
                }
            },
            403: function (err) {
                err.html("<strong>Foutje!</strong> Dit account is op inactief gesteld! neem contact op met de administrator.");
                if (err.is(':hidden')) {
                    err.toggle();
                }
            },
            500: function (err) {
                err.html("<strong>Foutje!</strong> Je kan hier niks aandoen. Probeer het later opnieuw.");
                if (err.is(':hidden')) {
                    err.toggle();
                }
            },
            default: function (err) {
                err.html("<strong>Foutje!</strong> Er ging iets mis. Probeer het opnieuw.");
                if (err.is(':hidden')) {
                    err.toggle();
                }
            }
        }
    });
}

$("input[type=text]").keyup(function () {
    let first =  $('#first-name-update');
    let last = $('#last-name-update');
    let first_name = first.val().trim();
    let last_name = last.val().trim();

    if(first_name.length > 49){
        first.removeClass('glyphicon-user');
        first.addClass('glyphicon-remove');
        first.css("color", "#ff0000");
    }else{
        first.removeClass('glyphicon-remove');
        first.addClass('glyphicon-user');
        first.css("color", "#000000");
    }

    if(last_name.length > 49){
        last.removeClass('glyphicon-user');
        last.addClass('glyphicon-remove');
        last.css("color", "#ff0000");
    }else{
        first.removeClass('glyphicon-remove');
        first.addClass('glyphicon-user');
        first.css("color", "#000000");
    }
});

function diff_years(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff / 365.25));

}

function getAge(dateString)
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
}

//Check if variable is empty
function isEmpty(str) {
    return (!str || 0 === str.length);
}

