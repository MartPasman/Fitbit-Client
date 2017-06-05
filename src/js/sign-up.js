/**
 * Created by romybeugeling on 17-05-17.
 */
$(document).ready(function () {

    var accountModal = $('#account-modal');
    const errorMsg = $("#error-message-new");
    const successMsg = $("#success-message-new");
    errorMsg.hide();

    $('[data-toggle="tooltip"]').tooltip();

    var handicap = undefined;
    var type = undefined;

    $("#new-type").find("li a").click(function () {
        var newText = $(this).text() + ' <span class="caret"></span>';
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
        var newText = handicap + ' <span class="caret"></span>';
        $("#new-handicap-button").html(newText);

    });

    errorMsg.hide();
    successMsg.hide();
    $('#new-save-button').click(function () {


            errorMsg.text("Vul alle velden in.");

            var firstname = $('#new-firstname').val();
            var lastname = $('#new-lastname').val();
            var email = $('#new-email').val();
            var password1 = $('#new-password').val();
            var password2 = $('#new-password2').val();
            var birthday = $('#new-birthday').val();


            // check if some fields are left empty and show error
            if (firstname === undefined || lastname === undefined || birthday === undefined || email === undefined || password2 === undefined || password1 === undefined
                || type === undefined) {
                errorMsg.text("Vul alle velden in.");
                errorMsg.show();
                return;
            }

            // check the email
            if (!validateEmail(email)) {
                errorMsg.text("Vul een geldig e-mailadres in.");
                errorMsg.show();
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
                errorMsg.show();
                return;
            }

            $.ajax({
                url: REST + '/accounts',
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    birthday: birthday,
                    password: password1,
                    handicap: handicap,
                    type: type
                },
                statusCode: {
                    201: function (data) {
                        loadUsers();

                        successMsg.html("<strong>Het account is aangemaakt.</strong> Onthoud dit id goed: " + data.id + ".");
                        successMsg.show();
                    },
                    400: function (err) {

                        errorMsg.html("<strong>Er is iets fout gegaan.</strong> Controleer of de velden correct ingevuld zijn of probeer het nog eens met een ander e-mailadres. ");
                        errorMsg.show();
                    },
                    401: function (err) {
                        errorMsg.html("<strong>Er is iets fout gegaan.</strong> Controleer of je ingelogd bent.");
                        errorMsg.show();
                    },
                    403: function (err) {
                        errorMsg.html("<strong>Er is iets fout gegaan.</strong> Je bent niet geautoriseerd om een account aan te maken.");
                        errorMsg.show();
                    },

                    500: function (err) {
                        errorMsg.html("<strong>Er is iets fout gegaan.</strong> Het is niet jouw fout, probeer het later nog eens.");
                        errorMsg.show();
                    },
                    default: function (err) {
                        errorMsg.html("<strong>Er is iets fout gegaan.</strong> Probeer het later nog eens.");
                        errorMsg.show();
                    }
                }
            });

        }
    );
    accountModal.on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
    })
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}