/**
 * Created by romybeugeling on 22-05-17.
 */
let editModal;
let accountModal;
let errorMessageEdit;
let successMessageEdit;
let userList;
let successCompetition;
let errorCompetition;

let editButton;
let pdfButton;
let connectButton;
let revokeButton;
let userButton;

let user;

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
                $('#show-current-goal').text('Huidige doel: ' + data.goal + " punten.");
                $('#show-current-days').text('Huidige lengte van de competitie: ' + data.length + " dagen");
                $('#show-last-goal').text('Doel voor volgende competitie: ' + data.defaultGoal);
                if (data.defaultLength === 1) {
                    $('#show-last-days').text('Lengte van de volgende competitie: ' + data.defaultLength + " dag.");
                } else {
                    $('#show-last-days').text('Lengte van de volgende competitie: ' + data.defaultLength + " dagen.");
                }
            },
            default: function (err) {
                console.log(err);
            }
        }
    });

    successCompetition = $('#success-competition');
    errorCompetition = $('#error-competition');
    successCompetition.addClass('hidden');
    errorCompetition.addClass('hidden');

    modal = $('#modal-account-error');
    editModal = $('#edit-modal');
    accountModal = $('#account-modal');
    errorMessageEdit = $('#error-message-edit');
    successMessageEdit = $('#success-message-edit');
    userList = $("#userlist");
    inactiveUserList = $('#userlist-inactive');

    editButton = $('.edit');
    pdfButton = $('.pdf');
    connectButton = $('.connect');
    revokeButton = $('.revoke');
    userButton = $('.user');

    loadUsers();

    $.ajax({
        url: REST + '/competitions/',
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        statusCode: {
            200: function (data) {
                $('#show-last-goal').text('Punten voor de volgende competitie: ' + data.defaultGoal + " punten.");
                if (data.defaultLength === 1) {
                    $('#show-last-days').text('Lengte van de volgende competitie: ' + data.defaultLength + " dag.");
                } else {
                    $('#show-last-days').text('Lengte van de volgende competitie: ' + data.defaultLength + " dagen.");
                }
            },
            default: function (err) {
                console.log(err);
            }
        }
    });

    $('#comp-submit-button').click(function () {
        let goal = $('#default-goal').val();
        if (goal === '') {
            successCompetition.addClass('hidden');
            errorCompetition.text('Voer een getal in.');
            errorCompetition.removeClass('hidden');
        } else if (goal < 0) {
            successCompetition.addClass('hidden');
            errorCompetition.text('Voer een getal in groter dan 0.');
            errorCompetition.removeclass('hidden');
        } else if (goal > 999999999) {
            successCompetition.addClass('hidden');
            errorCompetition.text('Te hoog getal.');
            errorCompetition.removeClass('hidden');
        } else if (isNaN(goal)) {
            successCompetition.addClass('hidden');
            errorCompetition.text('Voer een geldig getal in.');
            errorCompetition.removeClass('hidden');
        } else {
            $.ajax({
                url: REST + '/competitions/' + 'changegoal',
                method: 'PUT',
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                data: {
                    goal: goal
                },
                statusCode: {
                    201: function (data) {
                       errorCompetition.addClass('hidden');
                       successCompetition.removeClass('hidden');
                        $('#show-last-goal').text('Punten voor de volgende competitie: ' + goal + " punten.");

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
        if (days === '') {
            successCompetition.addClass('hidden');
            errorCompetition.text('Voer een getal in.');
            errorCompetition.removeClass('hidden');
        } else if (days < 0) {
            successCompetition.addClass('hidden');
            errorCompetition.text('Voer een getal in groter dan 0.');
            errorCompetition.removeClass('hidden');
        } else if (days > 999999999) {
            successCompetition.addClass('hidden');
            errorCompetition.text('Te hoog getal.');
            errorCompetition.removeClass('hidden');
        } else if (isNaN(days)) {
            successCompetition.addClass('hidden');
            errorCompetition.text('Voer een geldig getal in.');
            errorCompetition.removeClass('hidden');
        } else {
            $.ajax({
                url: REST + '/competitions/' + 'changelength',
                method: 'PUT',
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                data: {
                    length: days

                },
                statusCode: {
                    201: function (data) {
                        errorCompetition.addClass('hidden');
                        successCompetition.removeClass('hidden');
                        if (days === 1) {
                            $('#show-last-days').text('Aantal punten voor de volgende competitie: ' + days + " dag.");
                        } else {
                            $('#show-last-days').text('Lengte van de volgende competitie: ' + days + " dagen.");
                        }
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

    const users = data.success;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let connected;

        if (user.active) {

            let html = "<div class='user row'>" +
                "<div class='col-xs-11 col-md-11 one-user' " +
                "<span class='glyphicon glyphicon-user'></span>" +
                user.firstname + " " + user.lastname + " (" + user.id + ")" + " </div>" +
                "<div class='col-xs-1 col-md-1 glyphicon glyphicon-ok radio-select'></div>" +
                "<input type='hidden' value='" + user.id + "'/></div><hr/>";


            //
            // if (user.fitbit === undefined) {
            //     connected = "<button value='" + user.id +
            //         "' class='btn btn-default connect'>Koppel Fitbit</button>" +
            //         "<button value='" + user.id +
            //         "' class='btn btn-default hidden revoke'>Ontkoppel Fitbit</button>";
            // } else {
            //     connected = "<button value='" + user.id +
            //         "' class='btn btn-default edit pdf'>Exporteer</button>" + "<button value='" + user.id +
            //         "' class='btn btn-default hidden connect'>Koppel Fitbit</button>" +
            //         "<button value='" + user.id +
            //         "' class='btn btn-default revoke'>Ontkoppel Fitbit</button>";
            // }

            // let html = "<div class='user row' >" +
            //     "<div class='col-xs-12 col-md-5 one-user' " +
            //     "<span class='glyphicon glyphicon-user'></span>" +
            //     user.firstname + " " + user.lastname + " (" + user.id + ")" + " </div>" +
            //     "<div class='col-xs-12 col-md-7'>" +
            //     "<button value='" + user.id + "' class='btn btn-default edit' data-toggle='modal' " +
            //     "data-target='#edit-modal'>Pas aan</button>"
            //     + connected +
            //     "</div> </div> <hr/>";

            userList.append(html);
        } else {
            let inactiveHtml = "<div class='user row' >" +
                "<div class='col-xs-12 col-md-6 one-user' " +
                "<span class='glyphicon glyphicon-user'></span>" +
                user.firstname + " " + user.lastname + " (" + user.id + ")" + " </div>" +
                "<div class='col-xs-12 col-md-6 '>" +
                "<button class='btn btn-default activate' value='" + user.id + "'>Activeer</button>" +
                "</div> </div><hr/>";

            inactiveUserList.append(inactiveHtml);
        }

    }

    /**
     * Update the 'radio' select button
     */
    $('.user').on('click', function () {
        editModal.on('hidden.bs.modal', function () {
            $(this).find('form').trigger('reset');
        });
        console.dir("opnieuw");
        $('.user').removeClass('selected');
        console.dir(this);
        $(this).addClass('selected');

        user = undefined;

        let id = $(this).find('input[type=hidden]').val();


        console.dir(id);

        for (let i = 0; i < users.length; i++) {
            if (parseInt(users[i].id) === parseInt(id)) {
                user = users[i];
            }
        }
        console.dir("hier ");
        console.dir(user);

        editButton.removeAttr('disabled');

        if (user.fitbit !== undefined && user.fitbit !== null) {
            revokeButton.removeClass('hidden');
            pdfButton.removeClass('hidden');
            connectButton.addClass('hidden');
            pdfButton.attr('value', user.id);
        } else {
            connectButton.removeClass('hidden');
            pdfButton.addClass('hidden');
            revokeButton.addClass('hidden');
        }


        $("#modal").load('./include/export.php');

        $(".connect").click(function () {

            $.ajax({
                url: REST + '/accounts/' + user.id + '/connect',
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                statusCode: {
                    201: function (data) {
                        location.replace(data.success);
                    },
                    default: function (err) {
                        console.log(err.message);
                    }
                }
            });
        });

        $(".revoke").click(function () {

            $.ajax({
                url: REST + '/accounts/' + user.id + '/revoke',
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                data: {
                    active: false
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
                    }
                }
            });
        });

        $('[data-toggle="tooltip"]').tooltip();

        $("#new-account").click(function () {
            accountModal.modal();
        });

        console.dir("hier niks" + user.id);

        $(".edit").click(function () {

            console.dir("hier meer id's " + user.id);
            editAccount(user);
        });


    });


    $(".activate").click(function () {
        id = $(this).attr('value');
        $.ajax({
            url: REST + '/users/' + id + '/active',
            method: 'PUT',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: {
                active: true
            },
            statusCode: {
                200: function (data) {
                    loadUsers();
                }
            }
        });

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

    errorMessageEdit.addClass('hidden');
    successMessageEdit.addClass('hidden');

    if (user === undefined) {
        errorMessageEdit.html("Deelnemer is niet gevonden.");
        errorMessageEdit.removeClass('hidden');

        $("#edit-handicap-dropdown").addClass('hidden');

        $("#edit-firstname").addClass('hidden');
        $("#edit-lastname").addClass('hidden');
        $("#edit-birthday").addClass('hidden');

    } else {
        $("#line-modal-label").html("Pas account aan van " + user.firstname + " " + user.lastname);

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


    editModal.on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
        //todo user.id weghalen?
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
            errorMessageEdit.removeClass('hidden');
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
                let dateparts = birthday.split('/');
                data.birthday = dateparts[2] + '/' + dateparts[1] + '/' + dateparts[0];

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
                    errorMessageEdit.removeClass('hidden');
                    return;
                } else {
                    data.password = password1;
                }
            }

            updateUser(user.id, data);
            successMessageEdit.addClass('hidden');
        }

    });
}

/**
 *
 * @param id
 * @param data
 */
function updateUser(id, data) {
    // console.dir(id);

    if (jQuery.isEmptyObject(data)) {
        errorMessageEdit.text("Vul een voornaam, achternaam, verjaardag en/of handicap in.");
        errorMessageEdit.removeClass('hidden');
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
                    successMessageEdit.removeClass('hidden');
                    loadUsers();
                },
                400: function (err) {
                    errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de persoonlijke informatie.</strong> Controleer of de velden correct ingevuld zijn.");
                    errorMessageEdit.removeClass('hidden');
                },
                401: function (err) {
                    errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de persoonlijke informatie.</strong> Controleer of je ingelogd bent.");
                    errorMessageEdit.removeClass('hidden');
                },
                403: function (err) {
                    errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de persoonlijke informatie.</strong> Je bent niet geautoriseerd om een account aan te maken.");
                    errorMessageEdit.removeClass('hidden');
                },
                404: function (err) {
                    errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de persoonlijke informatie.</strong> Deelnemer is niet gevonden of bestaat niet.");
                    errorMessageEdit.removeClass('hidden');
                },
                500: function (err) {
                    errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de persoonlijke informatie.</strong> Het is niet jouw fout, probeer het later nog eens.");
                    errorMessageEdit.removeClass('hidden');
                },
                default: function (err) {
                    errorMessageEdit.html("<strong>Er is iets fout gegaan tijdens het opslaan van de persoonlijke informatie.</strong> Probeer het later nog eens.");
                    errorMessageEdit.removeClass('hidden');
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