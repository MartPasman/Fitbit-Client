/**
 * Created by martpasman on 12-06-17.
 */
$(document).ready(function () {

    let progressBar = $('#progress-bar');

    //get percentage
    $.ajax({
            url: REST + '/competitions/sharedGoal',
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            dataType: 'JSON',
            statusCode: {
                200: function (data) {
                    const totWidth = $('#bar-div').width();
                    const width = totWidth * data.success.percentage / 100;
                    progressBar.width(Math.min(width, totWidth));

                    // set the percentage
                    $('#percentage').text(data.success.percentage + '%');

                    // if the goal was achieved
                    if (data.success.achieved) {
                        progressBar.css('background-color', 'green');
                    }

                    notifyLoader('goal');
                },
                default: function (err) {
                    console.log(err.message);
                }
            }
        }
    );
});