/**
 * Created by romybeugeling on 12-06-17.
 */

$(document).ready(function () {


    //deze week maandag tot zondag = 1 - 7

    let todayPretty = getTodaysDate();


    // console.dir(new Date().getDay());

    const day = new Date().getDay();
    const dayFrom = new Date().setDate(new Date().getDate() - (day - 1));
    const dayTo = new Date().setDate(new Date().getDate() + (7 - day));


    $.ajax({
        url: REST + '/users/birthdays',
        method: 'GET',
        statusCode: {
            200: function (data) {

                console.dir(data.success);
            },
            400: function (err) {
            },
            401: function (err) {
            },
            500: function (err) {
            },
            default: function (err) {
            }
        }

    });
});