/**
 * Created by romybeugeling on 22-05-17.
 */
let editModal;
let accountModal;
let errorMessageEdit;
let successMessageEdit;
let userList;

$(document).ready(function () {

    checkQueryParams();

    $.ajax({
        url: REST + '/competitions/',
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        statusCode: {
            200: function (data) {
                $('#show-current-goal').text('Huidige doel: ' + data.goal);
                $('#show-current-days').text('Huidige lengte van de competitie: ' + data.length + " dagen");
                $('#show-last-goal').text('Doel voor volgende competitie: ' + data.defaultGoal);
                $('#show-last-days').text('Lengte van de volgende competitie: ' + data.defaultLength + " dagen");
            },
            default: function (err) {
                console.log(err);
            }
        }
    });

    $('#success-competition').hide();
    $('#error-competition').hide();
    modal = $('#modal-account-error');
    editModal = $('#edit-modal');
    accountModal = $('#account-modal');
    errorMessageEdit = $('#error-message-edit');
    successMessageEdit = $('#success-message-edit');
    userList = $("#userlist");
    inactiveUserList = $('#userlist-inactive');

    loadUsers();

    $.ajax({
        url: REST + '/competitions/',
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        statusCode: {
            200: function (data) {
                $('#show-last-goal').text('Volgende competitie: ' + data.defaultGoal + " punten.");
                $('#show-last-days').text('Volgende competitie: ' + data.defaultLength + " dagen.");
            },
            default: function (err) {
                console.log(err);
            }
        }
    });

    $('#comp-submit-button').click(function () {
        let goal = $('#default_goal').val();
        if (goal === '' || goal < 0 || goal > 999999999) {
            $('#success-competition').hide();
            $('#error-competition').show();
        } else {
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
                        $('#error-competition').hide();
                        $('#success-competition').show();
                        $('#show-last-goal').text('Doel voor volgende competitie: ' + goal);

                    },
                    404: function (err) {

                    },
                    500: function (err) {

                    }
                }
            });
        }
    });

    $('#comp-days-submit-button').click(function () {
        let days = $('#default-days').val();
        if (days === '' || days < 0 || days > 365) {
            $('#success-competition').hide();
            $('#error-competition').show();
        } else {
            $.ajax({
                url: REST + '/competitions/' + 'lastlength',
                method: 'PUT',
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                data: {
                    length: days

                },
                statusCode: {
                    201: function (data) {
                        $('#error-competition').hide();
                        $('#success-competition').show();
                        $('#show-last-days').text('Lengte van de volgende competitie: ' + days + ' dagen');

                    },
                    404: function (err) {

                    },
                    500: function (err) {

                    }
                }
            });
        }
    })
});

/**
 *
 */
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

/**
 *
 * @param data
 */
function actionsDashboard(data) {
    userList.removeClass("block-error");
    userList.html('');
    inactiveUserList.html('');
    let id;

    const users = data.success;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let connected;

        if (user.active) {
            if (user.fitbit === undefined) {
                connected = "<button value='" + user.id +
                    "' class='btn btn-default connect'>Koppel Fitbit</button>" +
                    "<button value='" + user.id +
                    "' class='btn btn-default hidden revoke'>Ontkoppel Fitbit</button>";
            } else {
                connected = "<button value='" + user.id +
                    "' class='btn btn-default edit pdf'>Exporteer</button>" + "<button value='" + user.id +
                    "' class='btn btn-default hidden connect'>Koppel Fitbit</button>" +
                    "<button value='" + user.id +
                    "' class='btn btn-default revoke'>Ontkoppel Fitbit</button>";
            }

            let html = "<div class='user row' >" +
                "<div class='col-xs-12 col-md-5 one-user' " +
                "<span class='glyphicon glyphicon-user'></span>" +
                user.firstname + " " + user.lastname + " (" + user.id + ")" + " </div>" +
                "<div class='col-xs-12 col-md-7'>" +
                "<button value='" + user.id + "' class='btn btn-default edit' data-toggle='modal' " +
                "data-target='#edit-modal'>Pas aan</button>"
                + connected +
                "</div> </div> <hr/>";

            userList.append(html);
        }
    }

    $("#modal").load('./include/export.php');

    for (i = 0; i < users.length; i++) {
        let user = users[i];

        if (!user.active) {
            let html = "<div class='user row' >" +
                "<div class='col-xs-12 col-md-6 one-user' " +
                "<span class='glyphicon glyphicon-user'></span>" +
                user.firstname + " " + user.lastname + " (" + user.id + ")" + " </div>" +
                "<div class='col-xs-12 col-md-6 '>" +
                "<button value='" + user.id +
                "' class='btn btn-default edit-inactive' data-toggle='modal' " +
                "data-target='#edit-modal'>Pas aan</button>" +
                "</div> </div><hr/>";

            inactiveUserList.append(html);
        }
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

/**
 *
 * @param user
 */
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
            errorMessageEdit.text("Vul een voornaam, achternaam, verjaardag en/of handicap in.");
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

/**
 *
 * @param id
 * @param data
 */
function updateUser(id, data) {

    if (jQuery.isEmptyObject(data)) {
        errorMessageEdit.text("Vul een voornaam, achternaam, verjaardag en/of handicap in.");
        errorMessageEdit.show();
    } else {

        $.ajax({
            url: REST + '/users/' + id,
            method: 'PUT',
            data: data,
            headers: {
                Authorization: localStorage.getItem('token')
            },
            statusCode: {
                200: function (data) {
                    successMessageEdit.html("<strong>Gelukt.</strong> De persoonlijke informatie is aangepast.");
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

/**
 * Check the query params if a success/error message was passed on from connecting a Fitbit
 */
function checkQueryParams() {
    const json = getQueryParams();

    let show = true;
    let title = 'Fitbit niet verbonden';
    let body = '';

    // TODO: styling
    switch (parseInt(json.statusCode)) {
        case 201:
            title = 'Fitbit verbonden';
            body = '<span class="success glyphicon glyphicon-ok"></span> De Fitbit is succesvol aan de gebruiker verbonden.';
            break;
        case 403:
            body = 'De Fitbit is niet aan de gebruiker verbonden.<br/>Een Fitbit mag slechts aan één gebruiker verbonden zijn.';
            break;
        case 404:
            body = 'De Fitbit is niet aan de gebruiker verbonden.<br/>Probeer het later nog eens.';
            break;
        case 500:
            body = 'De Fitbit kan nu niet aan de gebruiker verbonden worden.<br/>Probeer het later nog eens.';
            break;
        default:
            // do nothing
            show = false;
            break;
    }

    // show the modal
    if (show) {
        $('#modal-connect-title').html(title);
        $('#modal-connect-body').html(body);
        $('#modal-connect').modal();
    }
}