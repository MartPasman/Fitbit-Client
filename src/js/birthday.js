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

    // if (users.length === 0) {
    //     noBday.show();
 //    } else {
 //
 //        for (let i = 0; i < users.length; i++) {
 //            let user = users[i];
 //            let birthdayHTML;
 //            //TODO blah blah is morgen jarig, hoe deed jeroen dat ook alweer
 //            //TODO lange naam fixen layout
 //
 //
 //            // let dd = user.birthday.split("-");
 //            // console.log( dd[0] + " ," + dd[1] + " ," + dd[2]);
 //            // let dddd = dd[2].split(0, 1);
 //            // console.log(dddd[0]);
 //
 //
 //            if (user.birthday === new Date()) {
 //
 //                birthdayHTML = "<div class='col-xs-12 col-md-12 birthday-today'> " +
 //                    user.firstname + " " + user.lastname +
 //                    "</div><img src='img/birthday-cake.png' alt='Gefeliciteerd' height='80' width='80'></div>"
 //
 //
 //            } else {
 //                // let bday = getCompareDate(user.birthday);
 //                // let days = getDaysBetween(today, bday);
 //                // console.dir(user.birthday);
 //
 //                birthdayHTML = "<div class='col-xs-12 col-md-12 birthday-one-user'>" + user.firstname
 //                    + " " + user.lastname + " " + user.birthday +
 //                    "<img src='img/almost.png' id='birthday-cake' alt='Gefeliciteerd' height='60' width='60'></div> ";
 //            }
 //
 //            let html = "<div class='birthday-users row' >" +
 //                "<div class='col-xs-12 col-md-12 birthday-user' " +
 //                birthdayHTML + "</div> </div> <hr/>";
 //
 //            listBirthdays.append(html);
 //        }
 //    }
//
}


function getCompareDate(birthdate) {
    return compareDate = Date.UTC(new Date().getFullYear(), birthdate.getMonth(), birthdate.getDate(), 0, 0, 0, 0);
}