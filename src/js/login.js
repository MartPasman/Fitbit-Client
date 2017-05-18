/**
 * Created by sveno on 17-5-2017.
 */
$(document).ready(function () {

    $("#error").hide();
    $('#login').click(function () {
        var id = $("#id").val().trim();
        var password = $("#password").val().trim();
        var modal = $('#modal-login-error');


        $.ajax({
            url: 'http://localhost:3000/accounts/login',
            method: 'POST',
            data: {
                id: id,
                password: password
            },
            statusCode: {
                201: function (data) {
                    console.dir(data.token);
                    localStorage["token"] = data.success;
                    if(data.permission>1){
                        location.replace();
                    }else{
                        location.replace();
                    }
                },
                400: function (err) {
                    $("#error").toggle('show');
                },
                500: function (err) {
                    // set the modal title
                    modal.find('.modal-title').html('Er is iets misgegaan!');
                    // set the modal body
                    modal.find('.modal-body').html("Het is niet jouw fout, probeer het later nog eens");
                    // show the modal
                    modal.modal();
                },
                default: function (err) {
                    // set the modal title
                    modal.find('.modal-title').html('Er is iets misgegaan!');
                    // set the modal body
                    modal.find('.modal-body').html("Probeer het nog eens");
                    // show the modal
                    modal.modal();
                }
            }
        });
    });
});



