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
            //TODO blah blah is morgen jarig, hoe deed jeroen dat ook alweer
            //TODO lange naam fixen layout


            // let dd = user.birthday.split("-");
            // console.log( dd[0] + " ," + dd[1] + " ," + dd[2]);
            // let dddd = dd[2].split(0, 1);
            // console.log(dddd[0]);


            let a = getCompareDate(new Date(user.birthday));
            let d = getCompareDate(new Date());


            if (a === d) {
                birthdayHTML = "<div class='col-xs-8 col-md-9 birthday-today'> " +
                  "<h2>"+  user.firstname + " " + user.lastname + " is vandaag jarig!</h2>" +
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
                } else if(days === -1){
                    daysUntil = " was gisteren jarig.";

                }
                else {
                    daysUntil = " was " + Math.abs(days) + " dagen geleden jarig.";
                }

                birthdayHTML = "<div class='col-xs-8 col-md-9 birthday-one-user'>" +
                  "<h2>" + user.firstname  + " " + user.lastname + daysUntil + "</h2>" +
                    "</div><div class='col-xs-4 col-md-3'> <img src='img/almost.png' class='birthday-piece' alt='bijnaJarig'></div> ";
            }

            let html = "<div class='birthday-users row' >" +
                // "<div class='col-xs-12 col-md-12 birthday-user' " +
                birthdayHTML +
                // "</div>" +
                " </div> <hr/>";

            listBirthdays.append(html);
        }
    }

}


function getCompareDate(birthdate) {
    return compareDate = Date.UTC(new Date().getFullYear(), birthdate.getMonth(), birthdate.getDate(), 0, 0, 0, 0);
}