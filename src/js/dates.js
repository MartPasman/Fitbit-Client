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
    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    return [date.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join(splitBy);
}

function getDDMMYYYY(date, splitBy) {
    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    return [(dd > 9 ? '' : '0') + dd,
        (mm > 9 ? '' : '0') + mm,
        date.getFullYear()
    ].join(splitBy);
}

/**
 * Get the amount of days between start and end
 * @param start
 * @param end
 * @returns {number}
 */
function getDaysBetween(start, end) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((start.getTime() - end.getTime()) / (oneDay)));
}