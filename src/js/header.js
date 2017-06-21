/**
 * Created by sveno on 7-6-2017.
 */
$(document).ready(function () {

    $.ajax({
        url: REST + '/accounts/authenticate',
        method: 'POST',
        dataType: 'JSON',
        data: {url: window.location.pathname},
        headers: {
            Authorization: localStorage.getItem('token')
        },
        statusCode: {
            401: logout,
            403: previousPage
        }
    });

    // competition
    let html = '<li><a href="/competition-dashboard.php"><span class="glyphicon glyphicon-knight"></span> Competitie</a></li>';

    switch (parseInt(localStorage.getItem('perm'))) {
        // user
        case 1:
            // stats and settings
            html += '<li><a href="/results.php"><span class="glyphicon glyphicon-dashboard"></span> Resultaten en doelstellingen</a></li>' +
                '<li><a href="/user-settings.php"><span class="glyphicon glyphicon-user"></span> Mijn profiel</a></li>';
            break;

        // admin
        case 2:
            // dashboard and admin settings
            html += '<li><a href="/admin-dashboard.php"><span class="glyphicon glyphicon-dashboard"></span> Beheer</a></li>' +
                '<li><a href="/admin-settings.php"><span class="glyphicon glyphicon-user"></span> Mijn profiel</a></li>';
            break;
    }

    // logout
    html += '<li><a href="#" id="log-out"><span class="glyphicon glyphicon-log-out"></span> Verlaten</a></li>';

    // set menu bar
    $('#navigation').html(html);

    // log out listener
    $('#log-out').click(logout);
});

function previousPage() {
    if (history.length <= 1) {
        logout();
    } else {
        history.go(-1);
    }
}

function logout() {
    console.log('Logging out...');
    window.localStorage.clear();
    window.location.replace('/');
}