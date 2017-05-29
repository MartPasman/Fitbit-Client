/**
 * Created by sveno on 29-5-2017.
 */
$(document).ready(function () {
    $('#log-out').click(function () {
        window.localStorage.clear();
    });
});