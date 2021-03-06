/**
 * Created by romybeugeling on 24-05-17.
 */
let modalExport;

let selectedExportOption = undefined;
let id;
let user = undefined;

$(document).ready(setupPDF);

function setupPDF() {
    modalExport = $('#modal-export');

    // open the export modal
    $('#pdf').on('click', openExportModal);
    $('#pdf-export').on('click', openExportModal);

    // start the export process
    $('#export').on('click', function () {

        enableExportButton(false);

        // decide which export functionality to use
        switch (selectedExportOption) {
            case 'export-last-week':
                exportLastWeek(user);
                break;

            case 'export-period':
                exportPeriod(user);
                break;

            case 'export-since-last':
                exportSinceLast(user);
                break;

            default:
                // should never happen
                defaultError();
                break;
        }
    });

    /**
     * Update the 'radio' export buttons
     */
    $('.btn-export').on('click', function () {
        selectedExportOption = $(this).attr('id');
        $('.btn-export').removeClass('selected');
        $('#' + selectedExportOption).addClass('selected');
    });
}

/**
 * Load the user account and open the export modal
 */
function openExportModal() {
    id = $(this).val();

    // get the user object for his/her name on the pdf
    $.ajax({
        url: REST + '/users/' + id,
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        statusCode: {
            200: function (data) {
                user = data.success;

                // set the last export date in the modal
                if (user.lastExport !== undefined && !isNaN(Date.parse(user.lastExport))) {
                    $('#last-export-date').html(getDDMMYYYY(user.lastExport, '/'));
                }

                // open the modal
                modalExport.modal();
            },
            401: logout
        }
    });
}

/**
 * Enable or disable the export button
 * @param boolean
 */
function enableExportButton(boolean) {
    if (boolean) {
        $('#export').removeAttr('disabled');
    } else {
        $('#export').attr('disabled', 'disabled');
    }
}

/**
 * Set an error message of the selected export option
 * @param msg
 */
function setErrorMessage(msg) {
    $('#' + selectedExportOption).find('.date-error').html("<div class='alert-danger'>" + msg + "</div>");
}

/**
 * Sets a default error message and enables the export button
 */
function defaultError() {
    setErrorMessage('Er is iets misgegaan. Probeer het later nog eens.');
    enableExportButton(true);
}

/**
 *
 */
function exportLastWeek(user) {
    if (user === undefined) {
        defaultError();
        return;
    }

    // get last weeks steps and sleep
    $.ajax({
        url: REST + '/users/' + user.id + '/stats/weeks/last',
        method: 'GET',
        dataType: 'JSON',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        statusCode: {
            200: function (data) {

                // get goals
                $.ajax({
                    url: REST + '/users/' + user.id + '/goals?offset=' + 0 + '&limit=' + 10,
                    method: 'GET',
                    dataType: 'JSON',
                    headers: {
                        Authorization: localStorage.getItem('token')
                    },
                    statusCode: {
                        200: function (data2) {
                            $('#goal-history').removeClass('block-error');

                            getPDF(user, data.success.steps, data.success.sleep, data2.goals);
                            enableExportButton(true);

                            // update the last export date
                            $.ajax({
                                url: REST + '/users/' + id + '/export',
                                method: 'PUT',
                                headers: {
                                    Authorization: localStorage.getItem('token')
                                }
                            });
                        },
                        400: defaultError,
                        401: logout,
                        403: defaultError,
                        404: defaultError,
                        500: defaultError
                    }
                });
            },
            400: defaultError,
            401: logout,
            403: defaultError,
            404: defaultError,
            412: function () {
                setErrorMessage('Dit account is nog niet aan een Fitbit gekoppeld.');
                enableExportButton(true);
            },
            429: function () {
                setErrorMessage('We kunnen momenteel uw gegevens niet voor u exporteren. Probeer het later nog eens.');
                enableExportButton(true);
            },
            500: defaultError
        }
    });
}

/**
 * Start the process of exporting data from a certain period
 */
function exportPeriod(user) {
    if (user === undefined) {
        defaultError();
        return;
    }

    const startDateStr = $('#export-period-from').val();
    const endDateStr = $('#export-period-to').val();

    // undefined dates
    if (startDateStr === '' || endDateStr === '') {
        setErrorMessage('Vul een begin- en einddatum in.');
        enableExportButton(true);
        return;
    }

    const startDate = new Date(fromNLtoEN(startDateStr, '/', '-'));
    const endDate = new Date(fromNLtoEN(endDateStr, '/', '-'));

    // start date should be in the past
    if (startDate > endDate) {
        setErrorMessage('De begindatum mag niet na de einddatum liggen.');
        enableExportButton(true);
        return;
    }

    // end date should be max now
    if (endDate > today()) {
        setErrorMessage('De einddatum mag niet na vandaag liggen.');
        enableExportButton(true);
        return;
    }

    $.ajax({
        url: REST + '/users/' + user.id + '/export/' + getYYYYMMDD(startDate, '-') + '/' + getYYYYMMDD(endDate, '-'),
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        statusCode: {
            200: function (data) {
                getPDF(user, data.success.steps, data.success.sleep, data.success.goals);
                enableExportButton(true);
            },
            400: defaultError,
            401: logout,
            403: defaultError,
            404: defaultError,
            412: function () {
                setErrorMessage('Dit account is nog niet aan een Fitbit gekoppeld.');
                enableExportButton(true);
            },
            429: function () {
                setErrorMessage('We kunnen momenteel uw gegevens niet voor u exporteren. Probeer het later nog eens.');
                enableExportButton(true);
            },
            500: defaultError
        }
    });
}

/**
 * Starts the process of exporting data since last export
 */
function exportSinceLast(user) {
    if (user === undefined) {
        defaultError();
        return;
    }

    $.ajax({
        url: REST + '/users/' + user.id + '/export/sincelast',
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        statusCode: {
            200: function (data) {
                // update last export date
                $('#last-export-date').html(getDDMMYYYY(new Date(), '/'));

                getPDF(user, data.success.steps, data.success.sleep, data.success.goals);
                enableExportButton(true);
            },
            400: defaultError,
            401: logout,
            403: defaultError,
            404: defaultError,
            412: function (err) {
                // type 2 is returned if not the Fitbit was the problem, but the user has not exported before
                if (err.responseJSON.type === 2) {
                    setErrorMessage('U heeft nog niet eerder uw gegevens geëxporteerd.');
                } else {
                    setErrorMessage('Dit account is nog niet aan een Fitbit gekoppeld.');
                }
                enableExportButton(true);
            },
            429: function () {
                setErrorMessage('We kunnen momenteel uw gegevens niet voor u exporteren. Probeer het later nog eens.');
                enableExportButton(true);
            },
            500: defaultError
        }
    });
}

/**
 * Download a PDF document with a collection of the given data
 * @param user
 * @param stepsData
 * @param sleepData
 * @param goalsData
 */
function getPDF(user, stepsData, sleepData, goalsData) {
    if (user === undefined || stepsData === undefined || sleepData === undefined || goalsData === undefined) {
        defaultError();
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
    }

    let name = undefined;
    let heading = 'Doelstellingen Fitbit';

    if (minDate !== undefined && maxDate !== undefined) {
        heading = 'Gegevens Fitbit van ' + getDDMMYYYY(minDate, '-') + ' tot en met ' + getDDMMYYYY(maxDate, '-');
    }

    if (user.firstname !== undefined && user.lastname !== undefined) {
        name = user.firstname + ' ' + user.lastname;
    }

    // for every pages

    // we need a different sleep index
    let s = 0;
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

        const offset = d % DAYS_IN_WEEK * 20;

        let currentDayMonth = 'dd/mm';

        // steps
        if (stepsData[d] !== undefined) {
            // set the currently to draw date
            currentDayMonth = getDDMM(stepsData[d].dateTime, '/');
            doc.text(currentDayMonth, 52 + offset, 67);

            // draw the steps
            doc.text(stepsData[d].value.toString(), 51.5 + offset, 77);
        }

        // sleep
        if (sleepData[s] !== undefined) {
            const sleepDate = getDDMM(sleepData[s].date, '/');
            if (currentDayMonth === sleepDate) {
                doc.text((Math.round(sleepData[s].duration * 10) / 10).toString(), 51.5 + offset, 87);
                s++;
            }
        }

        // goals
        const today = new Date();

        if (goalsData[d] !== undefined) {
            const goal = goalsData[d];

            // steps
            doc.text(goal.progress.toString(), 51.5 + offset, 137);

            // goal
            doc.text(goal.goal.toString(), 51.5 + offset, 147);

            // start date
            const startDate = new Date(goal.start);
            doc.text(getDDMM(startDate, '/'), 51.5 + offset, 177);

            // end date
            const endDate = new Date(goal.end);
            doc.text(getDDMM(endDate, '/'), 51.5 + offset, 187);

            // achieved
            doc.text(goal.percentage === 100 ? 'Ja' : 'Nee', 51.5 + offset, 157);

            // pending
            doc.text(endDate >= today ? 'Ja' : 'Nee', 51.5 + offset, 167);
        }
    }

    // save the file
    doc.save('Gegevens Fitbit - ' + user.firstname + ' ' + user.lastname + '.pdf');
}