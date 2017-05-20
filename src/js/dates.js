/**
 * Created on 19-05-17.
 */
const date = new Date();
const days = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];
const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

function getTodaysDate() {
    return days[date.getDay() - 1] + ' ' + date.getDate() + ' ' + months[date.getMonth()];
}