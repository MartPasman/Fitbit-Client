/**
 * Created by romybeugeling on 22-05-17.
 */
let editModal;
let accountModal;
let errorMessageEdit;
let successMessageEdit;
let userList;

const personalValid = false;
const handicapValid = false;

$(document).ready(function () {
    // $('#comp-submit-button').width($('#default_goal').width());
    //
    // $('#comp-submit-button').height($('#default_goal').height());


    $('#success').hide();
    modal = $('#modal-account-error');
    editModal = $('#edit-modal');
    accountModal = $('#account-modal');
    errorMessageEdit = $('#error-message-edit');
    successMessageEdit = $('#success-message-edit');
    userList = $("#userlist");

    loadUsers();

    $('#comp-submit-button').click(function () {
        let goal = $('#default_goal').val();
        $.ajax({
            url: REST + '/competitions/' + 'lastgoal',
            method: 'PUT',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: {
                goal: goal
            },
            statusCode: {
                201: function (data) {
                    $('#success').show();
                },
                404: function (err) {

                },
                500: function (err) {

                }
            }
        });
    });
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
    let id;

    const users = data.success;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let connected;

        if (user.fitbit === undefined) {
            connected = "<button value='" + user.id +
                "' class='btn btn-default connect'>Koppel Fitbit</button>" +
                "<button value='" + user.id +
                "' class='btn btn-default hidden revoke'>Ontkoppel Fitbit</button>" +
                "<button value='" + user.id;
        } else {
            connected = "<button value='" + user.id +
                "' class='btn btn-default hidden connect'>Koppel Fitbit</button>" +
                "<button value='" + user.id +
                "' class='btn btn-default revoke'>Ontkoppel Fitbit</button>" +
                "<button value='" + user.id;
        }

        let html = "<div class='user row' >" +
            "<div class='col-xs-12 col-md-6 one-user' " +
            "<span class='glyphicon glyphicon-user'></span>" +
            user.firstname + " " + user.lastname + " (" + user.id + ")" + " </div>" +
            "<div class='col-xs-12 col-md-6'>" +
            connected +
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

    $(".revoke").click(function () {
        id = $(this).attr('value');

        $.ajax({
            url: REST + '/accounts/' + id + '/revoke',
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            statusCode: {
                204: function (data) {
                    loadUsers();
                },
                401: function () {
                    location.replace("index.php");
                },
                default: function (err) {
                    console.error(err.error);
                    loadUsers();
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
        let user = undefined;

        for (let i = 0; i < users.length; i++) {
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
    const existingFirstname = user.firstname;
    const existingLastname = user.lastname;
    const existingActive = user.active;
    let existingBirthday = new Date(user.birthday);
    let month = existingBirthday.getMonth() + 1;
    existingBirthday = existingBirthday.getDate() + '/' + month + '/' + existingBirthday.getFullYear();

    errorMessageEdit.hide();
    successMessageEdit.hide();

    if (user === undefined) {
        errorMessageEdit.html("Deelnemer is niet gevonden.");
        errorMessageEdit.show();

        $("#edit-handicap-dropdown").hide();

        $("#edit-firstname").hide();
        $("#edit-lastname").hide();
        $("#edit-birthday").hide();

    } else {
        $("#lineModalLabel").html("Pas account aan van " + user.firstname + " " + user.lastname);

        let existingHandicap;
        if (user.handicap === 1) {
            existingHandicap = "Goed ter been ";
        } else if (user.handicap === 2) {
            existingHandicap = "Minder goed ter been ";
        } else if (user.handicap === 3) {
            existingHandicap = "Slecht ter been ";
        }


        $("#edit-handicap-button").html(existingHandicap + '<span class="caret"></span>');
        $("#edit-firstname").attr('value', existingFirstname);
        $("#edit-lastname").attr('value', existingLastname);
        if (existingActive) {
            $('#active-toggle').attr('checked', true);
        } else {
            $('#active-toggle').attr('checked', false);
        }


        $("#edit-birthday").attr('value', existingBirthday);
    }

    let handicap = user.handicap;
    $("#edit-handicap").find("li a").click(function () {

        handicap = $(this).text();
        let newText = handicap + ' <span class="caret"></span>';
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
        const firstname = $('#edit-firstname').val();
        const lastname = $('#edit-lastname').val();
        const password1 = $('#edit-password').val();
        const password2 = $('#edit-password2').val();
        const birthday = $('#edit-birthday').val();

        // check if some fields are left empty and show error
        if (firstname === '' || lastname === '' ||
            birthday === '' || handicap === undefined) {
            errorMessageEdit.text("Vul alle velden met een * in.");
            errorMessageEdit.show();
        } else {
            let data = {};


            if (firstname !== existingFirstname) {
                data.firstname = firstname;
            }
            if (lastname !== existingLastname) {
                data.lastname = lastname;
            }
            if (
                birthday !== existingBirthday) {
                data.birthday = birthday;
            }
            if (handicap !== user.handicap) {
                data.handicap = handicap;
            }
            if (existingActive !== !!$('#active-toggle').is(':checked')) {
                data.active = !!$('#active-toggle').is(':checked');
            }

            //check if passwords are the same
            if (password1 && password2) {
                if (password1 !== password2 || password1.length < 8) {
                    errorMessageEdit.text("Wachtwoorden komen niet overeen of zijn niet lang genoeg (minimaal 8 tekens lang).");
                    errorMessageEdit.show();
                    return;
                } else {
                    data.password = password1;
                }
            }

            updateUser(user.id, data);
            successMessageEdit.hide();
        }

    });
}

function updateUser(id, data) {

    if (data === {}){
        errorMessageEdit.text("Vul alle velden met een * in.");
        errorMessageEdit.show();
    }else {

        $.ajax({
            url: REST + '/users/' + id,
            method: 'PUT',
            data: data,
            headers: {
                Authorization: localStorage.getItem('token')
            },
            statusCode: {
                200: function (data) {
                    successMessageEdit.html("<strong>Succes</strong> De persoonlijke informatie is aangepast.");
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
}
