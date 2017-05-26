/**
 * Created by romybeugeling on 24-05-17.
 */

$(document).ready(function () {
    var doc = new jsPDF();
    var id = localStorage.getItem('userid');
    id = parseInt(id);

    var today = getYYYYMMDD(new Date(), '/');
    var lastweek = new Date().setDate(today.getDate() - 7);
    lastweek = getYYYYMMDD(lastweek, '/');

    $("#pdf").on('click', function () {
        $.ajax({
            url: REST + '/users/' + id,
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            statusCode: {
                200: function (data) {
                    alert(data.success);

                    console.dir(data.success);
                    var user = data.success;


                    doc.setFontSize(20);
                    doc.text(user.firstname + " " + user.lastname, 20, 20);
                    doc.text("Gegevens Fitbit van " + lastweek +  " tot en met " + today, 20, 30);
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

                    //data
                    doc.text("01-07", 52, 67);
                    doc.text("02-07", 72, 67);
                    doc.text("03-07", 92, 67);
                    doc.text("04-07", 112, 67);
                    doc.text("05-07", 132, 67);
                    doc.text("06-07", 152, 67);
                    doc.text("07-07", 172, 67);

                    doc.text("Stappen", 21, 77);
                    doc.text("Slaap (uren)", 21, 87);

                    //dit wordt data
                    doc.text("stap1", 51.5, 77);
                    doc.text("uur1", 51.5, 87);
                    doc.text("stap2", 71.5, 77);
                    doc.text("uur2", 71.5, 87);
                    doc.text("stap3", 91.5, 77);
                    doc.text("uur3", 91.5, 87);
                    doc.text("stap4", 111.5, 77);
                    doc.text("uur4", 111.5, 87);
                    doc.text("stap5", 131.5, 77);
                    doc.text("uur5", 131.5, 87);
                    doc.text("stap6", 151.5, 77);
                    doc.text("uur6", 151.5, 87);
                    doc.text("stap7", 171.5, 77);
                    doc.text("uur7", 171.5, 87);

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
                    doc.text("Lopende", 21, 167);
                    doc.text("Begindatum", 21, 177);
                    doc.text("Einddatum", 21, 187);

                    doc.text("s1", 51.5, 137);
                    doc.text("d1", 51.5, 147);
                    doc.text("g1", 51.5, 157);
                    doc.text("l1", 51.5, 167);
                    doc.text("b1", 51.5, 177);
                    doc.text("e1", 51.5, 187);

                    doc.text("s2", 71.5, 137);
                    doc.text("d2", 71.5, 147);
                    doc.text("g2", 71.5, 157);
                    doc.text("l2", 71.5, 167);
                    doc.text("b2", 71.5, 177);
                    doc.text("e2", 71.5, 187);

                    doc.text("s3", 91.5, 137);
                    doc.text("d3", 91.5, 147);
                    doc.text("g3", 91.5, 157);
                    doc.text("l3", 91.5, 167);
                    doc.text("b3", 91.5, 177);
                    doc.text("e3", 91.5, 187);

                    doc.text("s4", 111.5, 137);
                    doc.text("d4", 111.5, 147);
                    doc.text("g4", 111.5, 157);
                    doc.text("l4", 111.5, 167);
                    doc.text("b4", 111.5, 177);
                    doc.text("e4", 111.5, 187);

                    doc.text("s5", 131.5, 137);
                    doc.text("d5", 131.5, 147);
                    doc.text("g5", 131.5, 157);
                    doc.text("l5", 131.5, 167);
                    doc.text("b5", 131.5, 177);
                    doc.text("e5", 131.5, 187);

                    doc.text("s6", 151.5, 137);
                    doc.text("d6", 151.5, 147);
                    doc.text("g6", 151.5, 157);
                    doc.text("l6", 151.5, 167);
                    doc.text("b6", 151.5, 177);
                    doc.text("e6", 151.5, 187);

                    doc.text("s7", 171.5, 137);
                    doc.text("d7", 171.5, 147);
                    doc.text("g7", 171.5, 157);
                    doc.text("l7", 171.5, 167);
                    doc.text("b7", 171.5, 177);
                    doc.text("e7", 171.5, 187);



                    doc.save(user.firstname + " " + user.lastname + ".pdf");


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


