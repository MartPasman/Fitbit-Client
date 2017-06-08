/**
 * Created by sveno on 7-6-2017.
 */
$(document).ready(function () {
    if(localStorage.getItem('permission') !== undefined){
        if(localStorage.getItem('perm') == 1){
            $('#navigation').html(' <li> '+
               ' <a href="/competition-dashboard.php"> '+
               ' <span class="glyphicon glyphicon-knight"></span> Competitie ' +
               ' </a></li><li><a href="/results.php"> ' +
               ' <span class="glyphicon glyphicon-dashboard"></span> Resultaten en doelstellingen'+
                '</a> </li> <li> <a href="/user-settings.php"> '+
                ' <span class="glyphicon glyphicon-user"></span> Mijn profiel '+
            '</a></li><li> <a href="/index.php" id="log-out"> '+
              '  <span class="glyphicon glyphicon-log-out"></span> Verlaten </a> </li>');
        }
        if(localStorage.getItem('perm') == 2){
            $('#navigation').html(' <li> '+
                ' <a href="/competition-dashboard.php"> '+
                ' <span class="glyphicon glyphicon-knight"></span> Competitie ' +
                ' </a></li><li><a href="/admin-dashboard.php"> ' +
                ' <span class="glyphicon glyphicon-dashboard"></span> Beheer'+
                '</a> </li> <li> <a href="/admin-settings.php"> '+
                ' <span class="glyphicon glyphicon-user"></span> Mijn profiel '+
                '</a></li><li> <a href="/index.php" id="log-out"> '+
                '  <span class="glyphicon glyphicon-log-out"></span> Verlaten </a> </li>');
        }
    }

});
