/**
 * Created by romybeugeling on 12-06-17.
 */

$(document).ready(function () {

    $.ajax({
        url: REST + '/users/birthdays',
        method: 'GET',
        statusCode: {
            200: function (data) {
                loadBirthdays(data.success);
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


function loadBirthdays(users) {
    let listBirthdays = $("#birthdays");
    let noBday = $("#no-birthdays");
    noBday.hide();

    if (users.length === 0) {
        noBday.show();
    } else {

        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            let birthdayHTML;

            let userBirthday = getCompareDate(new Date(user.birthday));
            let dateToday = getCompareDate(new Date());

            console.dir(new Date(user.birthday) + " " + new Date());
            if (userBirthday === dateToday) {
                birthdayHTML = "<div class='col-xs-8 col-md-9 birthday-today'> " +
                    "<h3>" + user.firstname + " " + user.lastname + " is vandaag jarig!</h3>" +
                    "</div><div class='col-xs-4 col-md-3'> <img src='img/birthday-cake.png'" +
                    " class='birthday-cake' alt='Gefeliciteerd'></div>"
            } else {
                let bday = new Date(user.birthday);
                let days = getDaysBetween(bday, new Date());
                console.dir(days);
                let daysUntil;

                if (days === 1) {
                    daysUntil = " is morgen jarig."
                } else if (days > 1) {
                    daysUntil = " is over " + days + " dagen jarig.";
                } else if (days === -1) {
                    daysUntil = " was gisteren jarig.";
                } else {
                    daysUntil = " was " + Math.abs(days) + " dagen geleden jarig.";
                }

                birthdayHTML = "<div class='col-xs-8 col-md-9 birthday-one-user'>" +
                    "<h3>" + user.firstname + " " + user.lastname + daysUntil + "</h3>" +
                    "</div><div class='col-xs-4 col-md-3'> <img src='img/almost.png' class='birthday-piece' alt='bijnaJarig'></div> ";
            }
            let html = "<div class='birthday-users row' >" +
                birthdayHTML + " </div> <hr/>";

            listBirthdays.append(html);
        }
    }
}