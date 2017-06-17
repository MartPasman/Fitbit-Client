/**
 * Created by romybeugeling on 17-05-17.
 */
$(document).ready(function () {

    const accountModal = $('#account-modal');
    const errorMsg = $("#error-message-new");
    const successMsg = $("#success-message-new");

    $('[data-toggle="tooltip"]').tooltip();

    let handicap = undefined;
    let type = undefined;

    $("#new-type").find("li a").click(function () {
        let newText = $(this).text() + ' <span class="caret"></span>';
        $("#new-type-button").html(newText);

        type = $(this).text();

        type = type.toString().toLowerCase();
        if (type === "deelnemer") {
            type = 1;
            $("#new-handicap-dropdown").show();
        } else if (type === "administrator") {
            type = 2;
            $("#new-handicap-dropdown").hide();
        } else {
            type = 1;
        }
    });

    $("#new-handicap").find("li a").click(function () {
        handicap = $(this).text();
        let newText = handicap + ' <span class="caret"></span>';
        $("#new-handicap-button").html(newText);
    });

    $('#new-save-button').click(function () {
        errorMsg.text("Vul alle velden in.");

        let firstname = $('#new-firstname').val().trim();
        let lastname = $('#new-lastname').val().trim();
        let password1 = $('#new-password').val().trim();
        let password2 = $('#new-password2').val().trim();
        let birthday = $('#new-birthday').val().trim();

        // check if some fields are left empty and show error
        if (firstname === '' || lastname === '' || birthday === '' || password2 === '' || password1 === '' || type === undefined) {
            errorMsg.text("Vul alle velden in.");
            errorMsg.removeClass('hidden');
            return;
        }

        // if the account to be created will be a user
        if (type === 1) {
            if (handicap === undefined) {
                errorMsg.text("Vul een handicap in");
                errorMsg.show();
                return;
            } else {
                //check which handicap is entered and change to int
                handicap = handicap.toString().toLowerCase();
                if (handicap === "goed ter been") {
                    handicap = 1;
                } else if (handicap === "minder goed ter been") {
                    handicap = 2;
                } else if (handicap === "slecht ter been") {
                    handicap = 3;
                } else {
                    handicap = 1;
                }
            }
        } else {
            handicap = undefined;
        }

        //check if passwords are the same
        if (password1 !== password2 || password1.length < 8) {
            errorMsg.text("Wachtwoorden komen niet overeen of zijn niet lang genoeg (minimaal 8 tekens lang).");
            errorMsg.removeClass('hidden');
            return;
        }

        let dateparts = birthday.split('/');
        // change to universal date YYYY-MM-DD
        birthday = dateparts[2] + '/' + dateparts[1] + '/' + dateparts[0];

        $.ajax({
            url: REST + '/accounts',
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: {
                firstname: firstname,
                lastname: lastname,
                birthday: birthday,
                password: password1,
                handicap: handicap,
                type: type
            },
            statusCode: {
                201: function (data) {
                    getUsers();

                    errorMsg.addClass('hidden');
                    successMsg.html("<strong>Het account is aangemaakt.</strong> Onthoud dit id goed: " + data.id + ".");
                    successMsg.removeClass('hidden');
                },
                400: function (err) {
                    successMsg.addClass('hidden');
                    errorMsg.html("<strong>Er is iets fout gegaan.</strong> Controleer of de velden correct ingevuld zijn.");
                    errorMsg.removeClass('hidden');
                },
                401: logout,
                403: function (err) {
                    successMsg.addClass('hidden');
                    errorMsg.html("<strong>Er is iets fout gegaan.</strong> Je bent niet geautoriseerd om een account aan te maken.");
                    errorMsg.removeClass('hidden');
                },

                500: function (err) {
                    successMsg.addClass('hidden');
                    errorMsg.html("<strong>Er is iets fout gegaan.</strong> Het is niet jouw fout, probeer het later nog eens.");
                    errorMsg.removeClass('hidden');
                },
                default: function (err) {
                    successMsg.addClass('hidden');
                    errorMsg.html("<strong>Er is iets fout gegaan.</strong> Probeer het later nog eens.");
                    errorMsg.removeClass('hidden');
                }
            }
        });
    });

    accountModal.on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
        errorMsg.addClass('hidden');
        successMsg.addClass('hidden');
    });
});
