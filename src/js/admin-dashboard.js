/**
 * Created by romybeugeling on 22-05-17.
 */

var editModal;
var accountModal;
var errorMessageEdit;
var successMessageEdit;
var userList;

var personalValid = false;
var handicapValid = false;

$(document).ready(function () {

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
            400: function () {
                userList.addClass("block-error");
                userList.html("<span class='glyphicon glyphicon-exclamation-sign'></span> <br/>" +
                    "Er zijn geen deelnemers bekend.")
            },
            401: function () {
                location.replace("index.php");
            },
            403: function () {
                userList.addClass("block-error");
                userList.html("<span class='glyphicon glyphicon-exclamation-sign'></span> <br/>" +
                    "Controleer of je als administrator ingelogd bent.")
            },
            404: function () {
                userList.addClass("block-error");
                userList.html("<span class='glyphicon glyphicon-exclamation-sign'></span> <br/>" +
                    "Er zijn geen deelnemers bekend.")
            },
            500: function () {
                userList.addClass("block-error");
                userList.html("<span class='glyphicon glyphicon-exclamation-sign'></span> <br/>" +
                    "Er is iets fout gegaan, probeer het later nog eens.")
            },
            default: function () {
                userList.addClass("block-error");
                userList.html("<span class='glyphicon glyphicon-exclamation-sign'></span> <br/>" +
                    "Er is iets fout gegaan, probeer het later nog eens.")
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
            "' class='btn btn-default connect'>Koppel Fitbit</button>" +
            "<button value='" + user.id +
            "' class='btn btn-default edit' data-toggle='modal' " +
            "data-target='#edit-modal'>Pas aan</button>" +
            "</div> </div> <hr/>";

        userList.append(html);
    }

    $(".connect").click(function () {
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

    $(".edit").click(function () {
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

        $("#edit-firstname").hide();
        $("#edit-lastname").hide();
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
        $("#edit-firstname").attr('value', existingFirstname);
        $("#edit-lastname").attr('value', existingLastname);
        $("#edit-email").attr('value', existingEmail);
        if (existingActive) {
            $('#active-toggle').attr('checked', true);
        } else {
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
        var firstname = $('#edit-firstname').val();
        var lastname = $('#edit-lastname').val();
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
                        successMessageEdit.html("<strong>Succes</strong> De persoonlijke informatie is aangepast.");
                        personalValid = true;
                        successMessageEdit.show();
                        loadUsers();
                    },
                    400: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de persoonlijke informatie.</strong> Controleer of de velden correct ingevuld zijn.");
                        errorMessageEdit.show();
                    },
                    401: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de persoonlijke informatie.</strong> Controleer of je ingelogd bent.");
                        errorMessageEdit.show();
                    },
                    403: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de persoonlijke informatie.</strong> Je bent niet geautoriseerd om een account aan te maken.");
                        errorMessageEdit.show();
                    },
                    404: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de persoonlijke informatie.</strong> Deelnemer is niet gevonden of bestaat niet.");
                        errorMessageEdit.show();
                    },
                    500: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de persoonlijke informatie.</strong> Het is niet jouw fout, probeer het later nog eens.");
                        errorMessageEdit.show();
                    },
                    default: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de persoonlijke informatie.</strong> Probeer het later nog eens.");
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

                        if (personalValid) {
                            successMessageEdit.html("<strong>Succes</strong> De persoonlijke informatie en de handicap zijn aangepast.");
                        } else {
                            successMessageEdit.html("<strong>Succes</strong> De handicap is aangepast.");
                        }
                        successMessageEdit.show();
                        handicapValid = true;
                        loadUsers();
                    },
                    400: function (err) {

                        errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de handicap.</strong> Controleer of de velden correct ingevuld zijn.");
                        errorMessageEdit.show();

                    },
                    401: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de handicap.</strong> Controleer of je ingelogd bent.");
                        errorMessageEdit.show();

                    },
                    403: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de handicap.</strong> Je bent niet geautoriseerd om een account aan te maken.");
                        errorMessageEdit.show();

                    },
                    404: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de handicap.</strong> Deelnemer is niet gevonden of bestaat niet.");
                        errorMessageEdit.show();

                    },

                    500: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de handicap.</strong> Het is niet jouw fout, probeer het later nog eens.");
                        errorMessageEdit.show();

                    },
                    default: function (err) {
                        errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de handicap.</strong> Probeer het later nog eens.");
                        errorMessageEdit.show();
                    }
                }
            });
        }

        successMessageEdit.hide();

        if (existingActive !== !!$('#active-toggle').is(':checked')) {
            change_active(user.id);
        }
    });
}

function change_active(id) {

    var active = !!$('#active-toggle').is(':checked');

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
                if (personalValid) {
                    if (handicapValid) {
                        successMessageEdit.html("<strong>Succes</strong> De persoonlijke informatie, handicap en actieve status zijn aangepast.");
                    } else {
                        successMessageEdit.html("<strong>Succes</strong> De persoonlijke informatie en de actieve status zijn aangepast.");
                    }
                } else if (handicapValid) {
                    successMessageEdit.html("<strong>Succes</strong> De handicap en actieve status zijn aangepast.");
                } else {
                    successMessageEdit.html("<strong>Succes</strong> De actieve status is aangepast.");
                }

                successMessageEdit.show();
                loadUsers();
            },
            400: function (err) {

                errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het (de)activeren.</strong> Controleer of de velden correct ingevuld zijn.");
                errorMessageEdit.show();

            },
            401: function (err) {
                errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het (de)activeren.</strong> Controleer of je ingelogd bent.");
                errorMessageEdit.show();

            },
            403: function (err) {
                errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het (de)activeren.</strong> Je bent niet geautoriseerd om een account aan te maken.");
                errorMessageEdit.show();

            },
            404: function (err) {
                errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het (de)activeren.</strong> Deelnemer is niet gevonden of bestaat niet.");
                errorMessageEdit.show();

            },

            500: function (err) {
                errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het (de)activeren.</strong> Het is niet jouw fout, probeer het later nog eens.");
                errorMessageEdit.show();

            },
            default: function (err) {
                errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het (de)activeren.</strong> Probeer het later nog eens.");
                errorMessageEdit.show();
            }
        }
    });
}