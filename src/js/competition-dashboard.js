var users = [];
var barchart;

var offset = 0;
var old_offset = 0;

var index = 0;

var html = "";
$(document).ready(function () {

    var navbar = $('#navbardiv');
    // get the current date as a string
    $('#today').html(getTodaysDate()+ '<div id="resize-button" style="float:right; margin-top:17px; margin-right: 20px;" class="button glyphicon glyphicon-resize-full"></div>');
    getUsers();
    var resize = $('#resize-button');
    resize.click(function () {
        if (navbar.is(':hidden')) {
            navbar.toggle();
            resize.removeClass('glyphicon-resize-small');
            resize.addClass('glyphicon-resize-full');
        }else{
            navbar.hide();
            resize.removeClass('glyphicon-resize-full');
            resize.addClass('glyphicon-resize-small');
        }
    });

});

var loadWithOffset = function (users) {
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

    html += "<div class='block col-lg-11' style='min-height: 550px;'><center><img src='../img/rain.ico'/><p></p><h1>22 graden</h1><br><h2>55% kans op regen</h2></center></div>";

    $('#slides').html(html);
    //showusers(data.success);
    makeBarChart(users, data);
    generateslider();

}


function makeBarChart(users, data) {

    var lastComp = data;
    var max = data.total;
    var current = data.current;
    var scoreFromEach = [];
    var goal = lastComp.goal;
    var name;
    let graphs = Math.ceil(lastComp.results.length / 5);
    let totals = 5;

    lastComp.results.sort(function (m1, m2) {
        return m2.score - m1.score;
    });


    for (let g = 0; g < graphs; g++) {
        scoreFromEach = [];
        if (g === graphs - 1) {
            totals = lastComp.results.length % 5;
            if(totals == 0){
                totals = 5;
            }
        }
        var i = g * 5;
        for (var s = 0; s < totals; s++) {

            var value = (lastComp.results[i].score / goal * 100);
            if (value > 100) {
                value = 100;
            }

            for (let j = 0; j < users.success.length; j++) {

                if (users.success[j].id == lastComp.results[i].userid) {
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
            barchart = drawBarChart('#chart-competition' + g + '', scoreFromEach, 'Naam', 'Percentage behaald', '%', 1000, 400);
            var start_date = new Date(lastComp.start);
            var end_date = new Date(lastComp.end);
            $("#startend" + g + "").html(start_date.getDate() + "-" + (+start_date.getMonth() + 1) + "-" + start_date.getFullYear() + " t/m " + end_date.getDate() + "-" + (+end_date.getMonth() + 1) + "-" + end_date.getFullYear());
            $("#goal-to-reach" + g + "").html(lastComp.goal + " stap punten");
        } else {
            printBarChartError('Er zijn nog geen competitiegegevens bekend.');
        }
    }

}

const printBarChartError = function (message) {
    $('#chart-competition').html("<span class='glyphicon glyphicon-exclamation-sign'></span><br/>" + message);
};



function getNameById(users, results) {

    return null;
}


function generateslider() {
    $('#slides').slidesjs({
        play: {
            active: true,
            // [boolean] Generate the play and stop buttons.
            // You cannot use your own buttons. Sorry.
            effect: "slide",
            // [string] Can be either "slide" or "fade".
            interval: 10000,
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
