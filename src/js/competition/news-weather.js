/**
 * Created by sveno on 12-6-2017.
 */
$(document).ready(function () {
    // get the news
    $.ajax({
        url: "../include/get-contents.php?url=" + encodeURI('http://xml.rtvoost.nl/rss/tag.aspx?tag=Enschede'),
        method: 'POST',
        statusCode: {
            200: function (data) {
                let xmlDoc = new DOMParser().parseFromString(data, 'text/xml');
                let html = "";
                html += "<h2>Nieuws</h2>";
                html += "<hr>";

                let x = xmlDoc.getElementsByTagName("item");

                let tot = 3;
                if (x.length < 3) {
                    tot = x.length;
                }
                for (i = 0; i < tot; i++) {
                    html += "<h2>";
                    html += x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
                    html += "</h2><hr>";
                    html += "<p></p>";
                }
                $("#news").append(html);
                notifyLoader('news');
            }
        }
    });

    // get the weather forecast
    $.ajax({
        url: "../include/get-contents.php?url=" + encodeURI('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Enschede%2C%20NL%22)&format=xml&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'),
        method: 'POST',
        statusCode: {
            200: function (data) {
                let xmlDoc = new DOMParser().parseFromString(data, 'text/xml');
                let weather = xmlDoc.getElementsByTagName("results")[0].childNodes[0].childNodes[12];
                let location = xmlDoc.getElementsByTagName("results")[0].childNodes[0].childNodes[7];
                let city = location.getAttribute("city");
                let region = location.getAttribute("region");
                let now = weather.childNodes[5].getAttribute("temp");
                let condition = weather.childNodes[5].getAttribute("code");
                let curmin = weather.childNodes[6].getAttribute("low");
                let curmax = weather.childNodes[6].getAttribute("high");
                let tommin = weather.childNodes[7].getAttribute("low");
                let tommax = weather.childNodes[7].getAttribute("high");
                let tomcode = weather.childNodes[7].getAttribute("code");
                let tom2min = weather.childNodes[8].getAttribute("low");
                let tom2max = weather.childNodes[8].getAttribute("high");
                let tom2code = weather.childNodes[8].getAttribute("code");

                $('#location').html(city + ", " + region);

                $("#curtemp").html(toCelsius(now));
                $("#today-max-min").html(toCelsius(curmax) + "/" + toCelsius(curmin) + '<span class="deg">0</span><span class="temp-type">C</span>');
                $("#tom-max-min").html("<span class='wi " + getIconClass(tomcode) + "'></span> " + toCelsius(tommax) + "/" + toCelsius(tommin) + '<span class="deg">0</span><span class="temp-type">C</span>');
                $("#tom2-max-min").html("<span class='wi " + getIconClass(tom2code) + "'></span> " + toCelsius(tom2max) + "/" + toCelsius(tom2min) + '<span class="deg">0</span><span class="temp-type">C</span>');

                let conditionText = $('#condition');

                switch (+condition) {
                    case 5:
                    case 6:
                    case 7:
                    case 41:
                    case 42:
                    case 43:
                    case 46:
                    case 16:
                    case 15:
                    case 14:
                    case 13:
                        conditionText.html(getText(condition));
                        setBackgroundImage('.weather-card .top', '#today-icon', getIconClass(condition), '#1E8BC3');
                        break;
                    case 26:
                    case 30:
                    case 34:
                    case 44:
                        conditionText.html(getText(condition));
                        setBackgroundImage('.weather-card .top', '#today-icon', getIconClass(condition), '#59ABE3');
                        break;
                    case 32:
                        conditionText.html(getText(condition));
                        setBackgroundImage('.weather-card .top', '#today-icon', getIconClass(condition), '#6BB9F0');
                        break;
                    case 29:
                        conditionText.html(getText(condition));
                        setBackgroundImage('.weather-card .top', '#today-icon', getIconClass(condition), '#22313F');
                        break;
                    case 31:
                        conditionText.html(getText(condition));
                        setBackgroundImage('.weather-card .top', '#today-icon', getIconClass(condition), '#1F3A93');
                        break;
                    case 27:
                        conditionText.html(getText(condition));
                        setBackgroundImage('.weather-card .top', '#today-icon', getIconClass(condition), '#22313F');
                        break;
                    case 28:
                        conditionText.html(getText(condition));
                        setBackgroundImage('.weather-card .top', '#today-icon', getIconClass(condition), '#3498DB');
                        break;
                    case 10:
                    case 35:
                        conditionText.html(getText(condition));
                        setBackgroundImage('.weather-card .top', '#today-icon', getIconClass(condition), '#3498DB');
                        break;
                    default:
                        conditionText.html(getText(condition));
                        setBackgroundImage('.weather-card .top', '#today-icon', getIconClass(condition), '#67809F');
                        break;
                }

                notifyLoader('weather');

                //sun #6BB9F0
                //partlycloudy '#59ABE3'
                //cloudy '#3498DB'
                //rain '#5C97BF'
                //thunder '#67809F'
                //snow '#1E8BC3'
                //moon '#1F3A93'
                //partlycloudynight '#22313F'
            }
        }
    });
});

/**
 * Fahrenheit to Celcius
 * @param f degree fahrenheit
 * @returns {number}
 */
function toCelsius(f) {
    return Math.round((5 / 9) * (f - 32));
}

/**
 * Set the image and background
 * @param div
 * @param divImage
 * @param imageClass
 * @param color
 */
function setBackgroundImage(div, divImage, imageClass, color) {
    $(divImage).addClass("wi " + imageClass);
    $(div).css('background-color', color);
}

/**
 * Get the image of a weather code
 * @param code
 * @returns {*}
 */
function getIconClass(code) {
    let cssClass;
    switch (+code) {
        case 0:
            cssClass = "wi-tornado";
            break;
        case 1:
        case 2:
            cssClass = "wi-hurricane";
            break;
        case 3:
        case 4:
            cssClass = "wi-thunderstorm";
            break;
        case 5:
        case 6:
            cssClass = "wi-rain-mix";
            break;
        case 7:
        case 13:
        case 14:
        case 16:
            cssClass = "wi-snow";
            break;
        case 8:
        case 9:
            cssClass = "wi-sprinkle";
            break;
        case 10:
            cssClass = "wi-rain";
            break;
        case 11:
        case 12:
            cssClass = "wi-showers";
            break;
        case 15:
            cssClass = "wi-snow-wind";
            break;
        case 17:
            cssClass = "wi-hail";
            break;
        case 18:
            cssClass = "wi-sleet";
            break;
        case 19:
            cssClass = "wi-dust";
            break;
        case 20:
        case 21:
            cssClass = "wi-fog";
            break;
        case 22:
            cssClass = "wi-smoke";
            break;
        case 23:
            cssClass = "wi-cloudy-gusts";
            break;
        case 24:
            cssClass = "wi-strong-wind";
            break;
        case 25:
            cssClass = "wi-snowflake-cold";
            break;
        case 26:
        case 27:
        case 28:
            cssClass = "wi-cloudy";
            break;
        case 29:
        case 30:
            cssClass = "wi-cloud";
            break;
        case 31:
            cssClass = "wi-night-clear";
            break;
        case 32:
            cssClass = "wi-day-sunny";
            break;
        case 33:
            cssClass = "wi-night-alt-cloudy";
            break;
        case 34:
            cssClass = "wi-day-cloudy";
            break;
        case 35:
            cssClass = "wi-rain-mix";
            break;
        case 36:
            cssClass = "wi-fire";
            break;
        case 37:
        case 38:
        case 39:
            cssClass = "wi-thunderstorm";
            break;
        case 40:
            cssClass = "wi-showers";
            break;
        case 41:
        case 42:
        case 43:
            cssClass = "wi-snow-wind";
            break;
        case 44:
            cssClass = "wi-cloudy";
            break;
        case 45:
            cssClass = "wi-storm-showers";
            break;
        case 46:
            cssClass = "wi-snow-wind";
            break;
        case 47:
            cssClass = "wi-storm-showers";
            break;
        case 3200:
        default:
            cssClass = "wi-day-sunny";
            break;
    }
    return cssClass;
}

/**
 * Get the Dutch text of a weather code
 * @param code
 * @returns {*}
 */
function getText(code) {
    let text;
    switch (+code) {
        case 0:
            text = "Tornado";
            break;
        case 1:
            text = "Storm";
            break;
        case 2:
            text = "Orkaan";
            break;
        case 3:
            text = "Hevige onweer";
            break;
        case 4:
            text = "Onweer";
            break;
        case 5:
            text = "Natte sneeuw";
            break;
        case 6:
        case 7:
        case 8:
            text = "IJzel";
            break;
        case 9:
            text = "Motregen";
            break;
        case 10:
            text = "Regen";
            break;
        case 11:
        case 12:
            text = "Regenbuien";
            break;
        case 13:
        case 16:
            text = "Sneeuw";
            break;
        case 14:
            text = "Lichte sneeuwval";
            break;
        case 15:
            text = "Opwaaiende sneeuw";
            break;
        case 17:
            text = "Hagel";
            break;
        case 18:
            text = "IJzel";
            break;
        case 19:
            text = "Stoffig";
            break;
        case 20:
        case 21:
            text = "Mistig";
            break;
        case 22:
            text = "Rook";
            break;
        case 23:
            text = "Heet";
            break;
        case 24:
            text = "Harde wind";
            break;
        case 25:
            text = "Koud";
            break;
        case 26:
            text = "Bewolkt";
            break;
        case 27:
        case 28:
            text = "Erg bewolkt";
            break;
        case 29:
        case 30:
            text = "Half bewolkt";
            break;
        case 31:
            text = "Helder";
            break;
        case 32:
            text = "Zonnig";
            break;
        case 33:
        case 34:
            text = "Wolken";
            break;
        case 35:
            text = "Hagel en regen";
            break;
        case 36:
            text = "Warm";
            break;
        case 37:
        case 38:
        case 39:
            text = "Onweer";
            break;
        case 40:
            text = "Regenbuien";
            break;
        case 41:
        case 42:
        case 43:
            text = "Hevige sneeuw";
            break;
        case 44:
            text = "Half bewolkt";
            break;
        case 45:
        case 47:
            text = "Onweersbuien";
            break;
        case 46:
            text = "Sneeuwstorm";
            break;
        case 3200:
        default:
            text = "Weer";
            break;
    }
    return text;
}