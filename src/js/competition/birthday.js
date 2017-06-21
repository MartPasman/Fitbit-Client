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
                notifyLoader('birthday');
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
        return;
    }

    const MAX_BIRTHDAYS = Math.floor((listBirthdays.height() - 80) / 138);

    let startIndex = 0;
    // maximum of four birthdays
    for (let i = 0; (i < users.length && i < startIndex + MAX_BIRTHDAYS); i++) {

        const user = users[i];
        let birthdayHTML;

        const userBirthday = getCompareDate(new Date(user.birthday));
        const dateToday = getCompareDate(new Date());

        const bday = new Date(user.birthday);
        const days = getDaysBetween(bday, new Date());

        // if we still have more than the max birthdays to come
        // and this user's birthday was in the past
        if (users.length - i > MAX_BIRTHDAYS && days < 0) {
            startIndex = i;
            continue;
        }

        // birthday today = HUGE CAKE
        if (userBirthday === dateToday) {
            birthdayHTML = "<div class='col-xs-8 col-md-9 birthday-today'> " +
                "<h3>" + user.firstname + " " + user.lastname + " is vandaag jarig!</h3>" +
                "</div><div class='col-xs-4 col-md-3'> <img src='img/birthday-cake.png'" +
                " class='birthday-cake' alt='Gefeliciteerd'></div>"
        } else {
            // birthday in the future = slice of cake
            let daysUntil = '';

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