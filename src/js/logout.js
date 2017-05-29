/**
 * Created by sveno on 29-5-2017.
 */
$(document).ready(function () {
    $('#logout').click(function () {
        window.localStorage.clear();
        location.replace("index.php");
    });
});