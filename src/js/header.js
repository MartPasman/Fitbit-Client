/**
 * Created by sveno on 7-6-2017.
 */
$(document).ready(function () {

    // competition
    let html = '<li><a href="/competition-dashboard.php"><span class="glyphicon glyphicon-knight"></span> Competitie</a></li>';

    switch (localStorage.getItem('perm')) {
        // user
        case 1:
            // stats and settings
            html += '<li><a href="/results.php"><span class="glyphicon glyphicon-dashboard"></span> Resultaten en doelstellingen</a></li>' +
                '<li><a href="/user-settings.php"><span class="glyphicon glyphicon-user"></span> Mijn profiel</a></li>';
            break;
        case 2:
            // dashboard and admin settings
            html += '<li><a href="/admin-dashboard.php"><span class="glyphicon glyphicon-dashboard"></span> Beheer</a></li>' +
                '<li><a href="/admin-settings.php"><span class="glyphicon glyphicon-user"></span> Mijn profiel</a></li>';
            break;
    }

    // logout
    html += '<li><a href="/index.php" id="log-out"><span class="glyphicon glyphicon-log-out"></span> Verlaten</a></li>';

    // set menu bar
    $('#navigation').html(html);
});
