/**
 * Created by romybeugeling on 22-05-17.
 */

var modal;
var editModal;
var accountModal;
var errorMessageEdit;
var successMessageEdit;
var userList;

$(document).ready(function () {

    modal = $('#modal-account-error');
    editModal = $('#edit-modal');
    accountModal = $('#account-modal');
    errorMessageEdit = $('#error-message-edit');
    successMessageEdit = $('#success-message-edit');
    userList = $("#userlist");

    loadUsers();
});

function loadUsers() {
    $.ajax({
        url: REST + '/accounts/',
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        statusCode: {
            200: function (data) {
                actionsDashboard(data);
            },
            400: function (err) {
                // set the modal title
                modal.find('.modal-title').html('Foute aanvraag');
                // set the modal body
                modal.find('.modal-body').html("Controleer of de velden correct ingevuld zijn.");
                // show the modal
                modal.modal();
            },
            401: function (err) {
                // set the modal title
                modal.find('.modal-title').html('Verboden toegang');
                // set the modal body
                modal.find('.modal-body').html("Controleer of je ingelogd bent.");
                // show the modal
                modal.modal();
            },
            403: function (err) {
                // set the modal title
                modal.find('.modal-title').html('Verboden toegang.');
                // set the modal body
                modal.find('.modal-body').html("Je bent niet geautoriseerd om een account aan te maken.");
                // show the modal
                modal.modal();
            },
            404: function (err) {
                userList.addClass("block-error");
                userList.html("<span class='glyphicon glyphicon-exclamation-sign'></span> <br/>" +
                    "Er zijn geen deelnemers bekend")
            },

            500: function (err) {
                // set the modal title
                modal.find('.modal-title').html('Er is iets fout gegaan.');
                // set the modal body
                modal.find('.modal-body').html("Het is niet jouw fout, probeer het later nog eens.");
                // show the modal
                modal.modal();
            },
            default: function (err) {
                // set the modal title
                modal.find('.modal-title').html('Er is iets fout gegaan.');
                // set the modal body
                modal.find('.modal-body').html("Probeer het later nog eens.");
                // show the modal
                modal.modal();
            }
        }
    });
}

function actionsDashboard(data) {
    userList.removeClass("block-error");
    userList.html('');
    var id;

    var users = data.success;
    for (var i = 0; i < users.length; i++) {
        var user = users[i];

        var html = "<div class='user row' >" +
            "<div class='col-xs-12 col-md-6 one-user' " +
            "<span class='glyphicon glyphicon-user'></span>" +
            user.firstname + " " + user.lastname + " (" + user.id + ")" + " </div>" +
            "<div class='col-xs-12 col-md-6'>" +
            "<button value='" + user.id +
            "' class='btn btn-default koppel'>Koppel Fitbit</button>" +
            "<button value='" + user.id +
            "' class='btn btn-default pasaan' data-toggle='modal' " +
            "data-target='#edit-modal'>Pas aan</button>" +
            "</div> </div> <hr/>";

        userList.append(html);
    }
    $(".koppel").click(function () {
        id = $(this).attr('value');

        $.ajax({
            url: REST + '/accounts/' + id + '/connect',
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            statusCode: {
                201: function (data) {
                    location.replace(data.success);
                }
            }
        });
    });

    $('[data-toggle="tooltip"]').tooltip();

    $("#accountbtn").click(function () {
        accountModal.modal();
    });

    $(".pasaan").click(function () {
        id = $(this).attr('value');
        console.dir(id);
        var user = undefined;

        for (var i = 0; i < users.length; i++) {
            if (parseInt(users[i].id) === parseInt(id)) {
                user = users[i];
            }
        }
        editAccount(user);
    });

    editModal.on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
    });
}

function editAccount(user) {
    errorMessageEdit.hide();
    successMessageEdit.hide();

    if (user === undefined) {
        errorMessageEdit.html("Deelnemer is niet gevonden.");
        errorMessageEdit.show();

        $("#edit-handicap-dropdown").hide();

        $("#edit-voornaam").hide();
        $("#edit-achternaam").hide();
        $("#edit-email").hide();
        $("#edit-birthday").hide();

    } else {
        $("#lineModalLabel").html("Pas account aan van " + user.firstname + " " + user.lastname);

        var existingHandicap;
        if (user.handicap === 1) {
            existingHandicap = "Goed ter been ";
        } else if (user.handicap === 2) {
            existingHandicap = "Minder goed ter been ";
        } else if (user.handicap === 3) {
            existingHandicap = "Slecht ter been ";
        }

        var existingFirstname = user.firstname;
        var existingLastname = user.lastname;
        var existingEmail = user.email;
        var existingActive = user.active;

        $("#edit-handicap-button").html(existingHandicap + '<span class="caret"></span>');
        $("#edit-voornaam").attr('value', existingFirstname);
        $("#edit-achternaam").attr('value', existingLastname);
        $("#edit-email").attr('value', existingEmail);
        if(existingActive){
            $('#active-toggle').attr('checked', true);
        }else{
            $('#active-toggle').attr('checked', false);
        }

        var existingBirthday = new Date(user.birthday);
        var month = existingBirthday.getMonth() + 1;
        existingBirthday = existingBirthday.getDate() + '/' + month + '/' + existingBirthday.getFullYear();

        $("#edit-birthday").attr('value', existingBirthday);
    }

    var handicap = user.handicap;
    $("#edit-handicap").find("li a").click(function () {

        handicap = $(this).text();
        var newText = handicap + ' <span class="caret"></span>';
        $("#edit-handicap-button").html(newText);

        handicap = handicap.toLowerCase();
        if (handicap === "goed ter been") {
            handicap = 1;
        } else if (handicap === "minder goed ter been") {
            handicap = 2;
        } else if (handicap === "slecht ter been") {
            handicap = 3;
        } else {
            handicap = 1;
        }
    });

    $("#edit-save-button").click(function () {
        var firstname = $('#edit-voornaam').val();
        var lastname = $('#edit-achternaam').val();
        var email = $('#edit-email').val();
        // var password1 = $('#edit-wachtwoord').val();
        // var password2 = $('#edit-wachtwoord2').val();
        var birthday = $('#edit-birthday').val();

        // check if some fields are left empty and show error
        if (firstname === undefined || lastname === undefined ||
            birthday === undefined || email === undefined || handicap === undefined
        // || password2 === undefined || password1 === undefined
        ) {
            errorMessageEdit.text("Vul alle velden in.");
            errorMessageEdit.show();
            return;
        }

        // check the email
        if (!validateEmail(email)) {
            errorMessageEdit.text("Vul een geldig e-mailadres in.");
            errorMessageEdit.show();
            return;
        }

        var dateParts = birthday.split("/");
        var bday = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);


        //tODO next sprint US
        //check if passwords are the same
        // if (password1 !== password2 || password1.length < 8) {
        //     errorMessageEdit.text("Wachtwoorden komen niet overeen of zijn niet lang genoeg (minimaal 8 tekens lang).");
        //     errorMessageEdit.show();
        //     return;
        // }


        if (firstname !== existingFirstname || lastname !== existingLastname
            || email !== existingEmail || birthday !== existingBirthday) {
            $.ajax({
                url: REST + '/users/' + user.id,
                method: 'PUT',
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    birthday: bday
                },
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                statusCode: {
                    200: function (data) {
                        successMessageEdit.show();
                        loadUsers();

                    },
                    400: function (err) {

                        errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Controleer of de velden correct ingevuld zijn.");
                        errorMessageEdit.show();

                    },
                    401: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Controleer of je ingelogd bent.");
                        errorMessageEdit.show();

                    },
                    403: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Je bent niet geautoriseerd om een account aan te maken.");
                        errorMessageEdit.show();

                    },
                    404: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Deelnemer is niet gevonden of bestaat niet.");
                        errorMessageEdit.show();

                    },

                    500: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Het is niet jouw fout, probeer het later nog eens.");
                        errorMessageEdit.show();

                    },
                    default: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Probeer het later nog eens.");
                        errorMessageEdit.show();
                    }
                }
            });
        }

        successMessageEdit.hide();

        if (handicap !== user.handicap) {

            $.ajax({
                url: REST + '/users/' + user.id + "/handicap",
                method: 'PUT',
                data: {
                    handicap: handicap
                },
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                statusCode: {
                    200: function (data) {
                        successMessageEdit.show();
                        loadUsers();
                    },
                    400: function (err) {

                        errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Controleer of de velden correct ingevuld zijn.");
                        errorMessageEdit.show();

                    },
                    401: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Controleer of je ingelogd bent.");
                        errorMessageEdit.show();

                    },
                    403: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Je bent niet geautoriseerd om een account aan te maken.");
                        errorMessageEdit.show();

                    },
                    404: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Deelnemer is niet gevonden of bestaat niet.");
                        errorMessageEdit.show();

                    },

                    500: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Het is niet jouw fout, probeer het later nog eens.");
                        errorMessageEdit.show();

                    },
                    default: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Probeer het later nog eens.");
                        errorMessageEdit.show();
                    }
                }
            });
        }


        successMessageEdit.hide();

        if(existingActive != !!$('#active-toggle').is(':checked')){
            change_active(user.id);
        }


    });
}


function change_active(id) {

    var active;
    active = !!$('#active-toggle').is(':checked');


    $.ajax({
        url: REST + '/users/' + id + '/active',
        method: 'PUT',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        data: {
            active: active
        },
        statusCode: {
            200: function (data) {
                successMessageEdit.show();
                loadUsers();
            },
            400: function (err) {

                errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Controleer of de velden correct ingevuld zijn.");
                errorMessageEdit.show();

            },
            401: function (err) {
                errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Controleer of je ingelogd bent.");
                errorMessageEdit.show();

            },
            403: function (err) {
                errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Je bent niet geautoriseerd om een account aan te maken.");
                errorMessageEdit.show();

            },
            404: function (err) {
                errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Deelnemer is niet gevonden of bestaat niet.");
                errorMessageEdit.show();

            },

            500: function (err) {
                errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Het is niet jouw fout, probeer het later nog eens.");
                errorMessageEdit.show();

            },
            default: function (err) {
                errorMessageEdit.html("<strong>Er is iets fout gegaan.</strong> Probeer het later nog eens.");
                errorMessageEdit.show();
            }
        }
    });
}