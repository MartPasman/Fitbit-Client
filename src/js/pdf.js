/**
 * Created by romybeugeling on 24-05-17.
 */
$(document).ready(function () {
    const id = parseInt(localStorage.getItem('userid'));

    $('#pdf').on('click', function () {
        $.ajax({
            url: REST + '/users/' + id,
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            statusCode: {
                200: function (data) {

                    // last weeks stats
                    getPDF(data.success, stepsData, sleepData, goalsData);
                },
                default: function () {
                    alert('Kan de gegevens niet exporteren. Probeer het later nog eens.');
                }
            }
        });
    });
});

function getPDF(user, stepsData, sleepData, goalsData) {
    if (user === undefined || stepsData === undefined || sleepData === undefined || goalsData === undefined) {
        console.error('One or more parameters undefined!');
        return;
    }

    const DAYS_IN_WEEK = 7;

    const doc = new jsPDF();
    // get the max amount of days in any of the three data periods
    const days = Math.max(Math.max(Math.max(stepsData.length), sleepData.length), goalsData.length);
    const pages = Math.ceil(days / DAYS_IN_WEEK);

    // find the period that has all data
    let minDate = undefined, maxDate = undefined;
    for (let d = 0; d < days; d++) {
        if (stepsData[d] !== undefined) {
            if (minDate === undefined) {
                minDate = new Date(stepsData[d].dateTime);
            } else if (new Date(stepsData[d].dateTime) < minDate) {
                minDate = new Date(stepsData[d].dateTime);
            }

            if (maxDate === undefined) {
                maxDate = new Date(stepsData[d].dateTime);
            } else if (new Date(stepsData[d].dateTime) > maxDate) {
                maxDate = new Date(stepsData[d].dateTime);
            }
        }

        if (sleepData[d] !== undefined) {
            if (minDate === undefined) {
                minDate = new Date(sleepData[d].dateTime);
            } else if (new Date(sleepData[d].dateTime) < minDate) {
                minDate = new Date(sleepData[d].dateTime);
            }

            if (maxDate === undefined) {
                maxDate = new Date(sleepData[d].dateTime);
            } else if (new Date(sleepData[d].dateTime) > maxDate) {
                maxDate = new Date(sleepData[d].dateTime);
            }
        }

        if (goalsData[d] !== undefined) {
            if (minDate === undefined) {
                minDate = new Date(goalsData[d].dateTime);
            } else if (new Date(goalsData[d].dateTime) < minDate) {
                minDate = new Date(goalsData[d].dateTime);
            }

            if (maxDate === undefined) {
                maxDate = new Date(goalsData[d].dateTime);
            } else if (new Date(goalsData[d].dateTime) > maxDate) {
                maxDate = new Date(goalsData[d].dateTime);
            }
        }
    }

    let name = undefined;
    let heading = 'Gegevens Fitbit van ' + getDDMMYYYY(minDate, '-') + ' tot en met ' + getDDMMYYYY(maxDate, '-');
    if (user.firstname !== undefined && user.lastname !== undefined) {
        name = user.firstname + ' ' + user.lastname;
    }

    // for every pages
    for (let d = 0; d < days; d++) {
        // check if we should start a new page
        if (d % DAYS_IN_WEEK === 0) {
            // add next page
            if (d !== 0) {
                doc.addPage();
            }

            // title
            if (name !== undefined) {
                doc.text(name, 20, 20);
            }

            // headings
            doc.text(heading, 20, (name === undefined ? 20 : 30));

            // if there is still activity to show
            if (d < Math.max(stepsData.length, sleepData.length)) {
                // create the table
                doc.text('Activiteit', 20, 55);

                // columns
                doc.rect(20, 60, 170, 30);
                doc.rect(50, 60, 120, 30);
                doc.rect(70, 60, 80, 30);
                doc.rect(90, 60, 40, 30);

                // rows
                doc.rect(20, 70, 170, 10);

                // middle line
                doc.setLineWidth(0.2);
                doc.line(110, 60, 110, 90);
                doc.setFontSize(14);

                // row names
                doc.text('Stappen', 21, 77);
                doc.text('Slaap (uren)', 21, 87);
            }

            // if there are still goals to show
            if (d < goalsData.length) {
                // create the table
                doc.text('Doelen', 20, 115);
                doc.rect(20, 120, 170, 70);
                doc.rect(50, 120, 120, 70);
                doc.rect(70, 120, 80, 70);
                doc.rect(90, 120, 40, 70);

                // rows
                doc.rect(20, 130, 170, 10);
                doc.rect(20, 150, 170, 10);
                doc.rect(20, 170, 170, 10);

                // middle line
                doc.setLineWidth(0.2);
                doc.line(110, 120, 110, 190);
                doc.setFontSize(14);

                // goal 1 through 7
                for (let g = 1; g <= DAYS_IN_WEEK; g++) {
                    doc.text('Doel ' + g, 32 + (g * 20), 127);
                }

                // rows names
                doc.text('Stappen', 21, 137);
                doc.text('Doel', 21, 147);
                doc.text('Gehaald', 21, 157);
                doc.text('Lopend', 21, 167);
                doc.text('Begindatum', 21, 177);
                doc.text('Einddatum', 21, 187);
            }

            // page number
            doc.text(170, 280, 'Pagina ' + (Math.ceil(d / DAYS_IN_WEEK) + 1) + '/' + pages);
        }

        const offset = d % DAYS_IN_WEEK;

        // steps
        if (stepsData[d] !== undefined) {
            const date = stepsData[d].dateTime;
            doc.text(date.substring(8, 10) + '/' + date.substring(5, 7), 52 + (offset * 20), 67);
            doc.text(stepsData[d].value.toString(), 51.5 + (offset * 20), 77);
        }

        // sleep
        if (sleepData[d] !== undefined) {
            doc.text((Math.round(sleepData[d].duration * 10) / 10).toString(), 51.5 + (offset * 20), 87);
        }

        // goals
        const today = new Date();

        if (goalsData[d] !== undefined) {
            const goal = goalsData[d];

            // steps
            doc.text(goal.progress.toString(), 51.5 + (offset * 20), 137);

            // goal
            doc.text(goal.goal.toString(), 51.5 + (offset * 20), 147);

            // start date
            const startDate = new Date(goal.start);
            const startDateStr = startDate.getDate() + '/' + (startDate.getMonth() + 1);
            doc.text(startDateStr, 51.5 + (offset * 20), 177);

            // end date
            const endDate = new Date(goal.end);
            const endDateStr = endDate.getDate() + '/' + (endDate.getMonth() + 1);
            doc.text(endDateStr, 51.5 + (offset * 20), 187);

            // achieved
            doc.text(goal.percentage === 100 ? 'Ja' : 'Nee', 51.5 + (offset * 20), 157);

            // pending
            doc.text(endDate >= today ? 'Ja' : 'nee', 51.5 + (offset * 20), 167);
        }
    }

    // save the file
    doc.save('Gegevens Fitbit - ' + user.firstname + ' ' + user.lastname + '.pdf');
}


