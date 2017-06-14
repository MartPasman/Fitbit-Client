/**
 * Created on 19-05-17.
 */
const date = new Date();
const days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

function getTodaysDate() {
    return days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()];
}

function getYYYYMMDD(date, splitBy) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    return [date.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join(splitBy);
}

function getDDMMYYYY(date, splitBy) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    return [(dd > 9 ? '' : '0') + dd,
        (mm > 9 ? '' : '0') + mm,
        date.getFullYear()
    ].join(splitBy);
}

function fromNLtoEN(string, splitByOld, splitByNew) {
    if (string !== undefined && string !== '') {
        const dateParts = string.split(splitByOld);
        return dateParts[2] + splitByNew + dateParts[1] + splitByNew + dateParts[0]
    }
    return undefined;
}

function today() {
    return new Date(getYYYYMMDD(new Date(), '-'))
}

/**
 * Get the amount of days between start and end
 * @param start
 * @param end
 * @returns {number}
 */
function getDaysBetween(start, end) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((start.getTime() - end.getTime()) / (oneDay));
}