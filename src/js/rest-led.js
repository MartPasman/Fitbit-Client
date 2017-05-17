/**
 * Created on 17-05-17.
 */
const check = function () {
    console.log("Checking REST service availability...");

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
};

$(document).ready(function () {
    // check every minute if the REST is still online
    check();
    setInterval(check, 60 * 1000);
});