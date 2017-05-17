/**
 * Created on 17-05-17.
 */
$(document).ready(function () {
    $('.led-good').attr('class', 'led-bad');

    $.ajax({
        // TODO: change to localhost
        url: 'http://178.21.116.109:3000/api',
        method: 'GET',
        statusCode: {
            200: function () {
                $('.led-bad').attr('class', 'led-good');
            }
        }
    });
});