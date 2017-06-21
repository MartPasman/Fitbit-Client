let users = [];
let barchart;

let offset = 0;
let old_offset = 0;

let index = 0;

let html = "";

let usersloaded = false;

let navbar = $('#navbardiv');

$(document).ready(function () {

    if (window.innerWidth < 1250 || window.innerHeight < 650 || window.innerHeight > window.innerWidth) {
        $("#message").show();
        $('#slides').hide();
    } else {
        $("#message").hide();
        $('#slides').show();
        if (usersloaded === false) {
            getUsers();
            usersloaded = true;
        }
    }

    let queries = getQueryParams();

    // get the current date as a string
    startTimeResize();
    let resize = $('#resize-button');
    resize.click(function () {
        if (navbar.is(':hidden')) {
            navbar.toggle();
            resize.removeClass('glyphicon-resize-small');
            resize.addClass('glyphicon-resize-full');
        } else {
            navbar.hide();
            resize.removeClass('glyphicon-resize-full');
            resize.addClass('glyphicon-resize-small');
        }
    });

    // set to fullscreen if we were in fullscreen before a reload
    if (+queries.fullscreen === 1) {
        navbar.hide();
        resize.removeClass('glyphicon-resize-full');
        resize.addClass('glyphicon-resize-small');
    }
});

$(window).on('resize', function () {
    if (window.innerWidth < 1480 || window.innerHeight < 734 || window.innerHeight > window.innerWidth) {
        $("#message").show();
        $('#slides').hide();
    } else {
        $("#message").hide();
        $('#slides').show();
        if (usersloaded === false) {
            getUsers();
            usersloaded = true;
        }
    }
});


/**
 * Refresh the page and keep track of the fullscreen state
 */
function refresh() {
    if (navbar.is(':hidden')) {
        window.location.replace("/competition-dashboard.php?fullscreen=1");
    } else {
        window.location.replace("/competition-dashboard.php?fullscreen=0");
    }
}

let loadWithOffset = function (users) {
    $.ajax({
        url: REST + '/competitions/',
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        dataType: 'JSON',
        statusCode: {
            200: function (response) {
                createHTML(users, response);
            },
            400: function (error) {
                offset = old_offset;
                console.log(error.error);
            },
            401: function (error) {
                offset = old_offset;
                console.log(error.error);
            },
            403: function (error) {
                offset = old_offset;
                console.log(error.error);
            },
            404: function (error) {
                offset = old_offset;
                console.log(error.error);
            },
            412: function (error) {
                offset = old_offset;
                console.log(error.error);
            },
            500: function (error) {
                offset = old_offset;
                console.log(error.error);
            }
        }
    });
};

const getUsers = function () {
    //get all users
    $.ajax({
        url: REST + '/accounts/',
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        dataType: 'JSON',
        statusCode: {
            200: function (response) {
                loadWithOffset(response)
            },
            404: function (errlr) {
                console.log(errlr);
            },
            403: function (err) {
                console.log(err);
            },
            500: function (err) {
                console.log(err);
            }
        }
    });

};

function createHTML(users, data) {
    let divs = Math.ceil(data.results.length / 5);

    for (let i = 0; i < divs; i++) {
        html += '<div id="competition-data' + i + '"  style="min-height:550px; width:100%;" class="block col-lg-11"> <center><h4 id="startend' + i + '">20-04 t/m 27-04</h4><h4>Te behalen punten:</h4><br><h3 id="goal-to-reach' + i + '"></h3><div id="chart-competition' + i + '">FusionCharts will render here</div></center></div>';
    }

    $('#slides').append(html);
    //showusers(data.success);
    makeBarChart(users, data);
    generateslider();
}


function makeBarChart(users, data) {

    let lastComp = data;
    let scoreFromEach = [];
    let goal = lastComp.goal;
    let name;
    let graphs = Math.ceil(lastComp.results.length / 5);
    let totals = 5;

    lastComp.results.sort(function (m1, m2) {
        return m2.score - m1.score;
    });

    for (let g = 0; g < graphs; g++) {
        scoreFromEach = [];
        if (g === graphs - 1) {
            totals = lastComp.results.length % 5;
            if (totals === 0) {
                totals = 5;
            }
        }

        let i = g * 5;
        for (let s = 0; s < totals; s++) {

            let value = (lastComp.results[i].score / goal * 100);
            if (value > 100) {
                value = 100;
            }

            for (let j = 0; j < users.success.length; j++) {

                if (parseInt(users.success[j].id) === parseInt(lastComp.results[i].userid)) {
                    name = users.success[j].firstname + ' ' + users.success[j].lastname;
                }
            }

            i++;

            value = Math.round(value * 10) / 10;
            scoreFromEach[s] = {
                label: name,
                value: value
            };
        }

        if (scoreFromEach.length > 0) {
            console.log(scoreFromEach);

            const elementId = '#chart-competition' + g;
            const container = $(elementId).parent();
            const w = container.width() - ($(window).width() * .1), h = 600;
            container.css('padding-left', ($(window).width() * .1 * .5) + 'px');

            barchart = drawBarChart(elementId, scoreFromEach, 'Naam', 'Percentage behaald', '%', w, h);
            let start_date = new Date(lastComp.start);
            let end_date = new Date(lastComp.end);
            $("#startend" + g + "").html(getDDMMYYYY(start_date, '/') + ' tot en met ' + getDDMMYYYY(end_date, '/'));
            $("#goal-to-reach" + g + "").html(lastComp.goal + ' punten');
        } else {
            printBarChartError('Er zijn nog geen competitiegegevens bekend.');
        }
    }
}

function printBarChartError(message) {
    $('#chart-competition').html("<span class='glyphicon glyphicon-exclamation-sign'></span><br/>" + message);
}

function generateslider() {
    $('#slides').slidesjs({
        play: {
            active: true,
            // [boolean] Generate the play and stop buttons.
            // You cannot use your own buttons. Sorry.
            effect: "slide",
            // [string] Can be either "slide" or "fade".
            interval: 20 * 1000,
            // [number] Time spent on each slide in milliseconds.
            auto: true,
            // [boolean] Start playing the slideshow on load.
            swap: true,
            // [boolean] show/hide stop and play buttons
            pauseOnHover: false,
            // [boolean] pause a playing slideshow on hover
            restartDelay: 2500
            // [number] restart delay on inactive slideshow
        }
    });
}

function startTimeResize() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    $('#today').html(getTodaysDate() + " " + h + ":" + m + ":" + s + '<div id="resize-button" class="button glyphicon glyphicon-resize-full"></div>');
    let t = setTimeout(startTimeResize, 500);
}
