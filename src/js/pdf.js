/**
 * Created by romybeugeling on 24-05-17.
 */
var user = undefined;
var todayString;
var lastweekString;
var doc = new jsPDF();

$(document).ready(function () {
    var id = parseInt(localStorage.getItem('userid'));

    // go a week back
    var today = new Date();
    var lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 6);
    todayString = getDDMMYYYY(today, '/');
    lastweekString = getDDMMYYYY(lastWeek, '/');

    $("#pdf").on('click', function () {
        $.ajax({
            url: REST + '/users/' + id,
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            statusCode: {
                200: function (data) {

                    //TODO weghalen
                    console.dir(data.success);
                    user = data.success;

                    getPDF();
                },
                400: function (err) {
                },
                401: function (err) {
                },
                403: function (err) {
                },
                404: function (err) {
                },
                500: function (err) {
                },
                default: function (err) {
                }
            }
        });
    });
});


function getPDF() {

    doc.setFontSize(20);
    if (user !== undefined) {
        doc.text(user.firstname + " " + user.lastname, 20, 20);
        doc.text("Gegevens Fitbit van " + lastweekString + " tot en met " + todayString, 20, 30);

    } else {
        doc.text("Gegevens Fitbit van " + lastweekString + " tot en met " + todayString, 20, 20);
    }

    doc.text("Activiteit", 20, 55);
    doc.text("Doelen", 20, 115);

    //columns
    doc.rect(20, 60, 170, 30);
    doc.rect(50, 60, 120, 30);
    doc.rect(70, 60, 80, 30);
    doc.rect(90, 60, 40, 30);

    //rows
    doc.rect(20, 70, 170, 10);

    //middle line
    doc.setLineWidth(0.2);
    doc.line(110, 60, 110, 90);
    doc.setFontSize(14);


    doc.text("Stappen", 21, 77);
    doc.text("Slaap (uren)", 21, 87);


    for (var i = 0; i < stepsData.length; i++) {
        var date = stepsData[i].dateTime;

        doc.text(date.substring(8, 10) + '/' + date.substring(5, 7), 52 + (i * 20), 67);
        doc.text(stepsData[i].value, 51.5 + (i * 20), 77);
    }


    for (var j = 0; j < sleepData.length; j++) {
        doc.text(sleepData[j].duration, 51.5 + (j * 20), 87);
    }

    //dates
    // doc.text("01-07", 52, 67);
    // doc.text("02-07", 72, 67);
    // doc.text("03-07", 92, 67);
    // doc.text("04-07", 112, 67);
    // doc.text("05-07", 132, 67);
    // doc.text("06-07", 152, 67);
    // doc.text("07-07", 172, 67);

    // doc.text("stap1", 51.5, 77);
    // doc.text("uur1", 51.5, 87);
    // doc.text("stap2", 71.5, 77);
    // doc.text("uur2", 71.5, 87);
    // doc.text("stap3", 91.5, 77);
    // doc.text("uur3", 91.5, 87);
    // doc.text("stap4", 111.5, 77);
    // doc.text("uur4", 111.5, 87);
    // doc.text("stap5", 131.5, 77);
    // doc.text("uur5", 131.5, 87);
    // doc.text("stap6", 151.5, 77);
    // doc.text("uur6", 151.5, 87);
    // doc.text("stap7", 171.5, 77);
    // doc.text("uur7", 171.5, 87);

    //goals
    doc.rect(20, 120, 170, 70);
    doc.rect(50, 120, 120, 70);
    doc.rect(70, 120, 80, 70);
    doc.rect(90, 120, 40, 70);

    //rows
    doc.rect(20, 130, 170, 10);
    doc.rect(20, 150, 170, 10);
    doc.rect(20, 170, 170, 10);

    //middle line
    doc.setLineWidth(0.2);
    doc.line(110, 120, 110, 190);
    doc.setFontSize(14);

    doc.text("Doel 1", 52, 127);
    doc.text("Doel 2", 72, 127);
    doc.text("Doel 3", 92, 127);
    doc.text("Doel 4", 112, 127);
    doc.text("Doel 5", 132, 127);
    doc.text("Doel 6", 152, 127);
    doc.text("Doel 7", 172, 127);

    doc.text("Stappen", 21, 137);
    doc.text("Doel", 21, 147);
    doc.text("Gehaald", 21, 157);
    doc.text("Lopend", 21, 167);
    doc.text("Begindatum", 21, 177);
    doc.text("Einddatum", 21, 187);

    var today = new Date();

    for (var k = 0; k < goalsData.length; k++) {
        const goal = goalsData[k];

        //stappen
        doc.text(goal.progress, 51.5 + (k * 20), 137);

        //doel
        doc.text(goal.goal, 51.5 + (k * 20), 147);

        // begindatum
        const startDate = new Date(goal.start);
        const startDateStr = startDate.getDate() + '/' + (startDate.getMonth() + 1);
        doc.text(startDateStr, 51.5 + (k * 20), 177);

        //einddatum
        const endDate = new Date(goal.end);
        const endDateStr = endDate.getDate() + '/' + (endDate.getMonth() + 1);
        doc.text(endDateStr, 51.5 + (k * 20), 187);

        //gehaald
        doc.text(goal.percentage === 100 ? "Ja" : "Nee", 51.5 + (k * 20), 157);

        //lopend
        doc.text(endDate >= today ? "Ja" : "Nee", 51.5 + (k * 20), 167);


    }

    // doc.text("s1", 51.5, 137);
    // doc.text("d1", 51.5, 147);
    // doc.text("g1", 51.5, 157);
    // doc.text("l1", 51.5, 167);
    // doc.text("b1", 51.5, 177);
    // doc.text("e1", 51.5, 187);

    // doc.text("s2", 71.5, 137); etc



    if (user !== undefined) {
        doc.save(user.firstname + " " + user.lastname + ".pdf");
    } else {
        doc.save("Gegevens Fitbit.pdf")
    }

}


