/**
 * Created by romybeugeling on 22-05-17.
 */
let modalAccountError;
let modalEdit;
let modalNewAccount;
let errorMessageEdit;
let successMessageEdit;
let userList;
let inactiveUserList;
let successCompetition;
let errorCompetition;

let editButton;
let exportButton;
let connectButton;
let revokeButton;
let userButton;

let user = undefined;
// handicap selected in the edit user modal
let currentlySelectedHandicap = undefined;

$(document).ready(function () {
    $('#today').html(getTodaysDate());

    // check if a Fitbit connect result message is in the query parameters
    checkFitbitConnectMessage();

    successCompetition = $('#successed-competition');
    errorCompetition = $('#error-competition');
    successCompetition.addClass('hidden');
    errorCompetition.addClass('hidden');

    modalAccountError = $('#modal-account-error');
    modalEdit = $('#edit-modal');
    modalNewAccount = $('#account-modal');
    errorMessageEdit = $('#error-message-edit');
    successMessageEdit = $('#successed-message-edit');
    userList = $("#userlist");
    inactiveUserList = $('#userlist-inactive');

    editButton = $('#edit');
    exportButton = $('#pdf-export');
    connectButton = $('#connect');
    revokeButton = $('#revoke');
    userButton = $('.user');

    // get all users and load them in the UI
    getUsers();

    // get some details about the current competition
    $.ajax({
        url: REST + '/competitions',
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        statusCode: {
            200: function (data) {
                $('#show-current-goal').text('Punten voor de huidige competitie: ' + data.goal + (data.goal === 1 ? " punt." : " punten."));
                $('#show-current-days').text('Lengte van de huidige competitie: ' + data.length + (data.length === 1 ? " dag." : " dagen."));
                $('#show-current-shared-goal').text('Punten voor het huidige gezamelijk doel: ' + data.sharedGoal + (data.sharedGoal === 1 ? " punt." : " punten."));
                $('#show-last-goal').text('Punten voor de volgende competitie: ' + data.defaultGoal + (data.defaultGoal === 1 ? " punt." : " punten."));
                $('#show-last-days').text('Lengte van de volgende competitie: ' + data.defaultLength + (data.defaultLength === 1 ? " dag." : " dagen."));
                $('#show-last-shared-goal').text('Punten voor het volgende gezamelijke doel: ' + data.defaultSharedGoal + (data.defaultSharedGoal === 1 ? " punt." : " punten."))

            },
            default: function (err) {
                console.log(err);
            }
        }
    });

    // on clicking, save details about the next competition
    $('#comp-length-submit-button').click(function () {
        let goal = $('#comp-goal').val().trim();

        // check for errors
        if (goal === '') {
            successCompetition.addClass('hidden');
            errorCompetition.text('Voer een getal in.');
            errorCompetition.removeClass('hidden');
        } else if (isNaN(goal)) {
            successCompetition.addClass('hidden');
            errorCompetition.text('Voer een geldig getal in.');
            errorCompetition.removeClass('hidden');
        } else if (goal > 999999999) {
            successCompetition.addClass('hidden');
            errorCompetition.text('Doel mag niet hoger zijn dan 999999999.');
            errorCompetition.removeClass('hidden');
        } else if (goal < 0) {
            successCompetition.addClass('hidden');
            errorCompetition.text('Voer een getal in groter dan 0.');
            errorCompetition.removeClass('hidden');
        } else {

            // save changes
            $.ajax({
                url: REST + '/competitions/changegoal',
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

                        // update UI
                        $('#show-last-goal').text('Punten voor de volgende competitie: ' + goal + " punten.");
                    },
                    401: logout,
                    404: function (err) {

                    },
                    500: function (err) {

                    }
                }
            });
        }
    });

    // on clicking, save details about the next competition
    $('#comp-shared-goal-submit-button ').click(function () {
        let goal = $('#comp-shared-goal').val().trim();

        // check for errors
        if (goal === '') {
            successCompetition.addClass('hidden');
            errorCompetition.text('Voer een getal in.');
            errorCompetition.removeClass('hidden');
        } else if (isNaN(goal)) {
            successCompetition.addClass('hidden');
            errorCompetition.text('Voer een geldig getal in.');
            errorCompetition.removeClass('hidden');
        } else if (goal > 999999999) {
            successCompetition.addClass('hidden');
            errorCompetition.text('Doel mag niet hoger zijn dan 999999999.');
            errorCompetition.removeClass('hidden');
        } else if (goal < 0) {
            successCompetition.addClass('hidden');
            errorCompetition.text('Voer een getal in groter dan 0.');
            errorCompetition.removeClass('hidden');
        } else {

            // save changes
            $.ajax({
                url: REST + '/competitions/changesharedgoal',
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

                        // update UI
                        $('#show-last-shared-goal').text('Punten voor de volgende competitie: ' + goal + " punten.");

                    },
                    401: logout,
                    404: function (err) {

                    },
                    500: function (err) {

                    }
                }
            });
        }
    });

    // on clicking, save details about the next competition
    $('#comp-days-submit-button').click(function () {
        let days = $('#comp-days').val().trim();

        // check for errors
        if (days === '') {
            successCompetition.addClass('hidden');
            errorCompetition.text('Voer een getal in.');
            errorCompetition.removeClass('hidden');
        } else if (isNaN(days)) {
            successCompetition.addClass('hidden');
            errorCompetition.text('Voer een geldig getal in.');
            errorCompetition.removeClass('hidden');
        } else if (days > 999) {
            successCompetition.addClass('hidden');
            errorCompetition.text('Lengte mag niet langer zijn dan 999.');
            errorCompetition.removeClass('hidden');
        } else if (days < 0) {
            successCompetition.addClass('hidden');
            errorCompetition.text('Voer een getal in groter dan 0.');
            errorCompetition.removeClass('hidden');
        } else {

            // save changes
            $.ajax({
                // TODO: rename 'changelength' is bad. Change is already implied by using PUT
                url: REST + '/competitions/changelength',
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
                    401: logout,
                    404: function (err) {

                    },
                    500: function (err) {

                    }
                }
            });
        }
    });

    // on clicking the save button in the edit user modal, save the data
    $("#edit-save-button").click(function () {
        if (user === undefined) {
            console.error('let user was not set before save button was clicked.');
            return;
        }

        console.log('Going to save user data...');

        const firstname = $('#edit-firstname').val().trim();
        const lastname = $('#edit-lastname').val().trim();
        const password1 = $('#edit-password').val().trim();
        const password2 = $('#edit-password2').val().trim();
        const birthday = $('#edit-birthday').val().trim();
        const newActiveState = !!$('#active-toggle').is(':checked');

        // check if some fields are left empty and show error
        if (firstname === '' || lastname === '' || firstname.length > 49 || lastname.length > 49 || birthday === '' || currentlySelectedHandicap === undefined) {
            errorMessageEdit.text('Vul een voornaam, achternaam, verjaardag en/of handicap in.');
            errorMessageEdit.removeClass('hidden');
            return;
        }

        // hand pick the data we are going to update
        let data = {};

        // if the first name was changed
        if (firstname !== user.firstname) {
            data.firstname = firstname;
        }

        // if the last name was changed
        if (lastname !== user.lastname) {
            data.lastname = lastname;
        }

        // if the birthday was changed
        if (birthday !== getDDMMYYYY(user.birthday, '/')) {
            let dateparts = birthday.split('/');
            // set to universal notation YYYY-MM-DD
            data.birthday = dateparts[2] + '-' + dateparts[1] + '-' + dateparts[0];
        }

        // if the handicap was changed
        if (currentlySelectedHandicap !== user.handicap) {
            data.handicap = currentlySelectedHandicap;
        }

        // if the active state was changed
        if (newActiveState !== user.active) {
            data.active = newActiveState;
        }

        // // if the password field are filled in, we change them too
        if (password1 !== '' && password2 !== '') {
            // check the password requirements
            if (password1 !== password2 || password1.length < 8) {
                errorMessageEdit.text('Wachtwoorden komen niet overeen of zijn niet lang genoeg (minimaal 8 tekens lang).');
                errorMessageEdit.removeClass('hidden');
                return;
            } else {
                data.password = password1;
            }
        }

        // update the user
        updateUser(data);
        successMessageEdit.addClass('hidden');
    });

    // on clicking, change the currently selected handicap
    $("#edit-handicap").find("li a").click(function () {

        // get the text of the selected option
        let currentlySelectedHandicapText = $(this).text();
        // change the text of the button to that selected option
        $("#edit-handicap-button").html(currentlySelectedHandicapText + ' <span class="caret"></span>');

        // change to lower case and compare the strings
        currentlySelectedHandicapText = currentlySelectedHandicapText.toLowerCase();
        switch (currentlySelectedHandicapText) {
            case "goed ter been":
                currentlySelectedHandicap = 1;
                break;
            case "minder goed ter been":
                currentlySelectedHandicap = 2;
                break;
            case "slecht ter been":
                currentlySelectedHandicap = 3;
                break;
            default:
                currentlySelectedHandicap = 1;
                break;
        }
    });

    //
});

/**
 * AJAX call to get all users, when ready will call actionsDashboard()
 */
function getUsers() {
    $.ajax({
        url: REST + '/accounts/',
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        statusCode: {
            200: function (data) {
                loadUsers(data.success);
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
 * Load users into the UI
 * @param users list of users from the REST service
 */
function loadUsers(users) {
    // remove error css
    userList.removeClass("block-error");

    // clear the lists
    userList.html('');
    inactiveUserList.html('');

    // disable the buttons
    editButton.attr('disabled', 'disabled');
    exportButton.attr('disabled', 'disabled');
    connectButton.addClass('hidden');
    revokeButton.addClass('hidden');

    // append all users in the UI
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        console.dir(user);

        let html = "<div class='user row'>";
        if (user.active) {
            html += "<div class='col-xs-10 one-user'>";
        } else {
            html += "<div class='col-xs-9 col-md-10 one-user'>";
        }

        // same for both active and inactive users
        html += "<div class='col-xs-11'>" + user.firstname + " " + user.lastname + " (" + user.id + ")</div>";

        // if the user is connected
        if (user.active && user.fitbit !== undefined && user.fitbit !== null) {
            html += "<span data-toggle='tooltip' data-placement='top' title='Deze gebruiker is gekoppeld aan Fitbit " + user.fitbit.userid + "' class='col-xs-1 glyphicon glyphicon-link is-connected'></span>";
        }

        if (user.active) {
            // active users can be selected for further actions
            html += "</div><div class='col-xs-2 glyphicon glyphicon-ok radio-select'></div>" +
                "<input type='hidden' value='" + user.id + "'/>";
        } else {
            // inactive users only have an activate button
            html += "</div><div class='col-xs-3 col-md-2 '>" +
                "<button class='btn btn-default activate' value='" + user.id + "'>Activeer</button>" +
                "</div>";
        }

        // close user row div and append a line
        html += "</div><hr/>";

        // append to the right list
        if (user.active) {
            userList.append(html);
        } else {
            inactiveUserList.append(html);
        }
    }

    // load the export modal that depends on the users
    $("#modal").load('./include/export.php');

    // clicking on a user selects it for further actions
    $('.user').on('click', function () {

        // deselect all users
        $('.user').removeClass('selected');
        // select this user
        $(this).addClass('selected');

        // the id of the user
        let id = $(this).find('input[type=hidden]').val().trim();

        // find the user object by this user id
        user = undefined;
        for (let i = 0; i < users.length; i++) {
            if (parseInt(users[i].id) === parseInt(id)) {
                user = users[i];
                break;
            }
        }

        // enable the edit button
        editButton.removeAttr('disabled');

        // if the user is connected to a fitbit
        if (user.fitbit !== undefined && user.fitbit !== null) {
            // disable connect and enable revoke and export
            connectButton.addClass('hidden');
            revokeButton.removeClass('hidden');
            exportButton.removeAttr('disabled');
            exportButton.attr('value', user.id);
        } else {
            // enable connect and disable revoke and export
            connectButton.removeClass('hidden');
            revokeButton.addClass('hidden');
            exportButton.attr('disabled', 'disabled');
        }
    });

    // on clicking connect, start OAuth
    connectButton.click(function () {
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
                401: logout,
                default: function (err) {
                    console.log(err.message);
                }
            }
        });
    });

    // on clicking revoke, remove Fitbit connection
    revokeButton.click(function () {
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
                    // reload the users
                    getUsers();
                },
                401: logout,
                default: function (err) {
                    console.error(err.error);
                }
            }
        });
    });

    // enable tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // on clicking the new account link button
    $("#new-account").click(function () {
        modalNewAccount.modal();
    });

    // on clicking the edit button, edit account
    editButton.click(editAccount);

    // on clicking activate, re-active an inactive user
    $(".activate").click(function () {
        $.ajax({
            url: REST + '/users/' + $(this).attr('value') + '/active',
            method: 'PUT',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: {
                active: true
            },
            statusCode: {
                200: getUsers,
                401: logout
            }
        });
    });
}

/**
 * Edit the currently selected user
 */
function editAccount() {

    // show the messages
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

        currentlySelectedHandicap = user.handicap;
        // decide the handicap text
        let handicapText = "Goed ter been";
        if (currentlySelectedHandicap === 2) {
            handicapText = "Minder goed ter been";
        } else if (currentlySelectedHandicap === 3) {
            handicapText = "Slecht ter been";
        }

        // set tet input fiels
        $("#edit-handicap-button").html(handicapText + ' <span class="caret"></span>');
        $("#edit-firstname").attr('value', user.firstname);
        $("#edit-lastname").attr('value', user.lastname);
        $('#active-toggle').attr('checked', user.active);
        $("#edit-birthday").attr('value', getDDMMYYYY(new Date(user.birthday), '/'));
    }

    // reset input fields
    modalEdit.on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
    });
}

/**
 * AJAX call to update a user
 * @param data
 */
function updateUser(data) {
    console.log('Updating user: ' + user.id);

    if (jQuery.isEmptyObject(data)) {
        setEditErrorSuccessMessage('Breng een wijziging aan om een account op te slaan.', '', true);
        return;
    }

    $.ajax({
        url: REST + '/users/' + user.id,
        method: 'PUT',
        data: data,
        headers: {
            Authorization: localStorage.getItem('token')
        },
        statusCode: {
            200: function () {
                setEditErrorSuccessMessage('Gelukt.', 'De persoonlijke informatie is aangepast.', false);
                getUsers();
            },
            400: function () {
                setEditErrorSuccessMessage('Er is iets fout gegaan tijdens het opslaan van de persoonlijke informatie.',
                    'Controleer of de velden correct ingevuld zijn.', true);
            },
            401: logout,
            403: function () {
                setEditErrorSuccessMessage('Er is iets fout gegaan tijdens het opslaan van de persoonlijke informatie.',
                    'Je bent niet geautoriseerd om een account aan te maken.', true);
            },
            404: function () {
                setEditErrorSuccessMessage('Er is iets fout gegaan tijdens het opslaan van de persoonlijke informatie.',
                    'Deelnemer bestaat niet.', true);
            },
            500: function () {
                setEditErrorSuccessMessage('Er is iets fout gegaan tijdens het opslaan van de persoonlijke informatie.',
                    'Probeer het later nog eens.', true);
            },
            default: function () {
                setEditErrorSuccessMessage('Er is iets fout gegaan tijdens het opslaan van de persoonlijke informatie.',
                    'Probeer het later nog eens.', true);
            }
        }
    });
}

/**
 * Set the error or successed message when editing a user
 * @param heading
 * @param body
 * @param error boolean if it is an error or successed message
 */
function setEditErrorSuccessMessage(heading, body, error) {
    const html = '<b>' + heading + '</b><br/>' + body;
    if (error) {
        successMessageEdit.addClass('hidden');
        errorMessageEdit.html(html);
        errorMessageEdit.removeClass('hidden');
    } else {
        errorMessageEdit.addClass('hidden');
        successMessageEdit.html(html);
        successMessageEdit.removeClass('hidden');
    }
}

/**
 * Check the query params if a successed/error message was passed on from connecting a Fitbit
 */
function checkFitbitConnectMessage() {
    const json = getQueryParams();

    let show = true;
    let title = 'Fitbit niet verbonden';
    let body = '';

    switch (parseInt(json.statusCode)) {
        case 201:
            title = 'Fitbit verbonden';
            body = '<span class="successed glyphicon glyphicon-ok"></span> De Fitbit is succesvol aan de gebruiker verbonden.';
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