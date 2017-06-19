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
                    console.dir(data);
                    let totWidth = $('#bar-div').width();
                    let width = totWidth * data.success.percentage / 100;
                    progressBar.width(width);
                    if (data.success.percentage > 20) {
                        $('#percentage').text(data.success.percentage + '%');
                        if (data.success.achieved) {
                            progressBar.css('background-color', 'green');
                        }
                    }
                },
                default: function (err) {
                    console.log(err.message);
                }
            }
        }
    );
});