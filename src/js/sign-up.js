/**
 * Created by romybeugeling on 17-05-17.
 */

$("#error").hide();
$(document).ready(function () {
    var modal = $('#modal-account-error');


    $('[data-toggle="tooltip"]').tooltip();

    var handicap = undefined;
    var type = undefined;


    $("#handicap").find(".dropdown-menu li a").click(function () {

        var newText = $(this).text() + ' <span class="caret"></span>';
        $("#handicapbtn").html(newText);
        // $("#typebtn").val($(this).text());
        handicap = $(this).text();

    });

    $("#type").find(".dropdown-menu li a").click(function () {
        var newText = $(this).text() + ' <span class="caret"></span>';
        $("#typebtn").html(newText);

        type = $(this).text();
    });


    $('#save').click(function () {
        var errorMsg = $("#error");

        errorMsg.hide();
        errorMsg.text("Vul alle velden in.");
        var valid = false;


        var email = $('#email').val();
        var password1 = $('#wachtwoord').val();
        var password2 = $('#wachtwoord2').val();


        if (!validateEmail(email)){
            errorMsg.text("Vul een geldig e-mailadres in.");
            $("#error").toggle('show');
            valid = false;
            return;
        }

        //check if passwords are the same
        if (password1 !== password2 || password1.length < 8) {
            errorMsg.text("Wachtwoorden komen niet overeen of zijn niet lang genoeg (minimaal 8 tekens lang).");
            errorMsg.toggle('show');
            valid = false;
            return;
        }

        //check if some fields are left empty and show error
        if (email === undefined || password2 === undefined || password1 === undefined
            || handicap === undefined || type === undefined) {
            errorMsg.text("Vul alle velden in.");
            errorMsg.toggle('show');
            valid = false;
            return;

        } else if(email !== undefined && password2 !== undefined && password1 !== undefined
            && handicap !== undefined && type !== undefined ) {


            if (valid = false){
                errorMsg.text("Vul alle velden in.");
                errorMsg.toggle('show');
            }


            //check which handicap is entered and change to int
            handicap.toLowerCase();
            if (handicap === "goed ter been") {
                handicap = 1;
            } else if (handicap === "minder goed ter been") {
                handicap = 2;
            } else if (handicap === "slecht ter been") {
                handicap = 3;
            } else {
                handicap = 1;
            }

            //check which type is entered and change to int
            type.toLowerCase();
            if (type === "deelnemer") {
                type = 1;
            } else if (type === "arts/fysiotherapeut") {
                type = 2;
            } else if (type === "administrator") {
                type = 3;
            } else {
                type = 1;
            }


            $.ajax({
                url: REST + '/accounts',
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                data: {
                    email: email,
                    password: password1,
                    handicap: handicap,
                    type: type
                },
                statusCode: {
                    201: function (data) {
                        // set the modal title
                        modal.find('.modal-title').html('Account is aangemaakt.');
                        // set the modal body
                        modal.find('.modal-body').html("Onthoud dit id goed: " + data.id + ".");
                        // show the modal
                        modal.modal();
                    },
                    400: function (err) {
                        // set the modal title
                        modal.find('.modal-title').html('Er is iets misgegaan!');
                        // set the modal body
                        modal.find('.modal-body').html("Controleer of je elk veld correct ingevuld hebt.");
                        // show the modal
                        modal.modal();
                    },
                    401: function (err) {
                        // set the modal title
                        modal.find('.modal-title').html('Verboden toegang');
                        // set the modal body
                        modal.find('.modal-body').html("Je bent niet geautoriseerd om een account aan te maken." +
                            "Controleer of je ingelogd bent.");
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

                    500: function (err) {
                        // set the modal title
                        modal.find('.modal-title').html('Er is iets misgegaan.');
                        // set the modal body
                        modal.find('.modal-body').html("Het is niet jouw fout, probeer het later nog eens.");
                        // show the modal
                        modal.modal();
                    },
                    default: function (err) {
                        // set the modal title
                        modal.find('.modal-title').html('Er is iets misgegaan.');
                        // set the modal body
                        modal.find('.modal-body').html("Probeer het later nog eens.");
                        // show the modal
                        modal.modal();
                    }
                }
            });

        }
    });
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}