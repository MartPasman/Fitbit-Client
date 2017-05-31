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
    var id;
    userList.removeClass("block-error");
    userList.html('');

    var users = data.success;
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var lastname = user.lastname;

        var html = "<div class='user row' >" +
            "<div class='col-xs-12 col-md-6 one-user' " +
            "<span class='glyphicon glyphicon-user'></span>" +
            user.firstname + " " + lastname + " </div>" +
            "<div class='col-xs-12 col-md-6'>" +
            "<button value='" + user.id +
            "' class='btn btn-default koppel'>Koppel Fitbit</button>" +
            "<button value='" + user.id +
            "' class='btn btn-default pasaan' data-toggle='modal' " +
            "data-target='#edit-modal';>Pas aan</button>" +
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

    successMessageEdit.hide();
    errorMessageEdit.hide();
    $('[data-toggle="tooltip"]').tooltip();

    $("#accountbtn").click(function () {
        accountModal.modal();
    });


    $(".pasaan").click(function () {

        id = $(this).attr('value');

        var user = undefined;
        for (var i = 0; i < users.length; i++) {
            if (parseInt(users[i].id) === parseInt(id)) {
                user = users[i];
            }
        }

        if (user === undefined) {
            errorMessageEdit.html("Deelnemer is niet gevonden.");
            errorMessageEdit.show();
            $("#edit-handicap-div").hide();
        } else {
            $("#lineModalLabel").html("Pas account aan van " + user.firstname + " " + user.lastname);
        }

        $("#edit-handicap").find("li a").click(function () {

            var newText = $(this).text() + ' <span class="caret"></span>';
            $("#edit-handicapbtn").html(newText);
            handicap = $(this).text();

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

            $.ajax({
                url: REST + '/users/' + id + "/handicap",
                method: 'PUT',
                data: {
                    handicap: handicap
                },
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                statusCode: {
                    200: function (data) {
                        successMessageEdit.html("<strong>Succes</strong> Het account is aangepast");
                        successMessageEdit.show();
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

        });
    });
    editModal.on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
    });

}