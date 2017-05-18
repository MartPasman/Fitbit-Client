/**
 * Created on 17-05-17.
 */
const check = function () {
    console.log("Checking REST service availability...");

    // turn the LED off
    $('.led-good').attr('class', 'led-off');
    $('.led-bad').attr('class', 'led-off');

    // try to turn it green or red
    $.ajax({
        // TODO: change to localhost
        url: 'http://178.21.116.109:3000/api',
        method: 'GET',
        success: function () {
            $('.led-off').attr('class', 'led-good');
        },
        timeout: 1000,
        error: function () {
            $('.led-off').attr('class', 'led-bad');
        }
    });
};

$(document).ready(function () {
    // check every minute if the REST is still online
    check();
    setInterval(check, 60 * 1000);
});