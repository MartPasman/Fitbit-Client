var users = [];
var barchart;

var offset = 0;
var old_offset = 0;

$(document).ready(function () {

    // get the current date as a string
    $('#today').text(getTodaysDate());
    loadWithOffset();

    $("#arrow-left").click(function () {
        old_offset = offset;
       offset--;
       loadWithOffset();
    });
    $("#arrow-right").click(function () {
        old_offset = offset;
        offset++;
        loadWithOffset();
    });


});

var loadWithOffset = function(){
    $.ajax({
        url: REST + '/competitions/'+offset,
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        dataType: 'JSON',
        statusCode: {
            200: function (response) {
                drawCompetitionChart(response);
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

const drawCompetitionChart = function (data) {

    var lastComp = data.competition;
    var max = data.total;
    var current = data.current;
    var scoreFromEach = [];
    var goal = lastComp.goal;

    console.dir(data);


      for (var i = 0; i < lastComp.results.length; i++) {

          var value = (lastComp.results[i].score/goal*100);
          if(value > 100){
              value = 100;
          }

          value = Math.round(value * 10 ) / 10;
        scoreFromEach[i] = {
            label: lastComp.results[i].name,
            value: value
        }
    }


    if (scoreFromEach.length > 0) {
        barchart = drawBarChart('#chart-competition', scoreFromEach, 'Naam', 'Stappen', '%', $('#competition-data').width(), 500);
        var start_date = new Date(lastComp.start);
        var end_date = new Date(lastComp.end);
        $("#startend").html(start_date.getDate() + "-" + (+start_date.getMonth()+1) + "-" + start_date.getFullYear() + " t/m " + end_date.getDate() + "-" + (+end_date.getMonth()+1) + "-" + end_date.getFullYear())
        $("#goal-to-reach").html(lastComp.goal + " punten");

        if(current == 0){
            $("#arrow-left").removeClass("glyphicon-arrow-left");
        }else{
            $("#arrow-left").addClass("glyphicon-arrow-left");
        }

        if(current >= max){
            $("#arrow-right").removeClass("glyphicon-arrow-right");
        }else{
            $("#arrow-right").addClass("glyphicon-arrow-right");
        }
      } else {
        printBarChartError('Er zijn nog geen competitiegegevens bekend.');
    }
};
const printBarChartError = function (message) {
    $('#chart-competition').html("<span class='glyphicon glyphicon-exclamation-sign'></span><br/>" + message);
};


