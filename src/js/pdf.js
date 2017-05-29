/**
 * Created by romybeugeling on 24-05-17.
 */
var user;
var todayString;
var lastweekString;

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
                    user = data.success;

                    getPDF();
                },
                default: function (err) {
                    alert("Kan de gegevens niet exporteren. Probeer het later nog eens.");
                }
            }
        });
    });
});

function getPDF() {
    var doc = new jsPDF();

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
        doc.text(goal.progress.toString(), 51.5 + (k * 20), 137);

        //doel
        doc.text(goal.goal.toString(), 51.5 + (k * 20), 147);

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

    doc.save(user !== undefined ? user.firstname + " " + user.lastname + ".pdf" : "Gegevens Fitbit.pdf");
}


