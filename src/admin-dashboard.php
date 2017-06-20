<?php
$title = "Dashboard";
include './include/header.php';
?>

<link rel="stylesheet" href="css/switches.css">

<!-- connect (error) modal -->
<div class="modal fade" id="modal-connect" tabindex="-1" role="dialog" aria-labelledby="modal-connect-title">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="modal-connect-title"></h4>
            </div>

            <div id="modal-connect-body" class="modal-body"></div>
        </div>
    </div>
</div>

<!-- export modal -->
<div id="modal"></div>

<!-- modal for creating new user-->
<div class="modal fade" id="account-modal" tabindex="-1" role="dialog" aria-hidden="true">

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                            class="sr-only">Sluit</span></button>
                <h3 class="modal-title">Maak nieuw account aan</h3>
            </div>
            <div class="modal-body">
                <form role="form">
                    <div class="alert alert-danger hidden" role="alert" id="error-message-new">
                        <b>Er is iets fout gegaan</b>
                    </div>

                    <div class="alert alert-success hidden" role="alert" id="success-message-new">
                        <b>Het account is aangemaakt</b>
                    </div>

                    <div class="row form-group">
                        <label class="col-md-3 control-label" for="new-firstname">Voornaam</label>
                        <div class="col-md-9">
                            <div class="input-group">
			                <span class="input-group-addon">
			                <i class="glyphicon glyphicon-user"></i>
			            </span>
                                <input id="new-firstname" name="firstname" placeholder="voornaam"
                                       class="form-control input-md" type="text">
                            </div>
                        </div>
                    </div>

                    <div class="row form-group">
                        <label class="col-md-3 control-label" for="new-lastname">Achternaam</label>
                        <div class="col-md-9">
                            <div class="input-group">
			                <span class="input-group-addon">
			                <i class="glyphicon glyphicon-user"></i>
			            </span>
                                <input id="new-lastname" name="lastname" placeholder="achternaam"
                                       class="form-control input-md" type="text">
                            </div>
                        </div>
                    </div>

                    <div class="row form-group">
                        <label class="col-md-3 control-label" for="new-birthday">Geboortedatum</label>
                        <div class="col-md-9">
                            <div class="input-group">
			                <span class="input-group-addon">
			                <i class="glyphicon glyphicon-calendar"></i>
			            </span>
                                <input id="new-birthday" name="date" placeholder="geboortedatum"
                                       class="form-control input-md">
                            </div>
                        </div>

                    </div>

                    <div class="row form-group">
                        <label class="col-md-3 control-label" for="new-type-button">Type account</label>
                        <div class="col-md-9">
                            <div class="input-group">
                                <div class="dropdown">
                                    <button id="new-type-button" class="btn btn-default dropdown-toggle"
                                            type="button" data-toggle="dropdown">Account
                                        <span class="caret"></span></button>
                                    <ul class="dropdown-menu" id="new-type">
                                        <li><a href="#">Deelnemer</a></li>
                                        <li><a href="#">Administrator</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row form-group" id="new-handicap-dropdown">
                        <label class="col-md-3 control-label" for="new-handicap-button">
                            Handicap
                            <a data-toggle="tooltip" data-placement="left" title="De handicap representeert vitaliteit.
                                               Hoe minder goed ter been een persoon is, hoe meer punten een stap waard is.">
                                <span class="glyphicon glyphicon-info-sign"></span>
                            </a>

                            <div class="large-tooltip handicap-tooltip">
                                <i class="icon ion-help-circled" rel="tooltip" title="Hint"></i>
                            </div>
                        </label>
                        <div class="col-md-9">
                            <div class="input-group">
                                <div class="dropdown">
                                    <button id="new-handicap-button" class="btn btn-default dropdown-toggle"
                                            type="button" data-toggle="dropdown">
                                        Handicap <span class="caret"></span>
                                    </button>

                                    <ul class="dropdown-menu" id="new-handicap">
                                        <li><a href="#">Goed ter been</a></li>
                                        <li><a href="#">Minder goed ter been</a></li>
                                        <li><a href="#">Slecht ter been</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row form-group">
                        <label class="col-md-3 control-label" for="new-password">
                            Wachtwoord
                            <a data-toggle="tooltip" data-placement="auto"
                               title="Een wachtwoord moet minstens acht tekens lang zijn.">
                                <span class="glyphicon glyphicon-info-sign"></span>
                            </a>
                            <div class="large-tooltip password-tooltip">
                                <i class="icon ion-help-circled" rel="tooltip" title="Hint"></i>
                            </div>
                        </label>

                        <div class="col-md-9">
                            <div class="input-group">
			                        <span class="input-group-addon">
			                            <i class="glyphicon glyphicon-lock"></i>
			                        </span>
                                <input id="new-password" name="password" placeholder="wachtwoord"
                                       class="form-control input-md" type="password">
                            </div>
                        </div>
                    </div>

                    <div class="row form-group">
                        <label class="col-md-3 control-label" for="new-password2">Herhaal wachtwoord</label>
                        <div class="col-md-9">
                            <div class="input-group">
			                <span class="input-group-addon">
			                <i class="glyphicon glyphicon-lock"></i>
			            </span>
                                <input id="new-password2" name="password2" placeholder="wachtwoord"
                                       class="form-control input-md" type="password">
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal-footer">
                <div class="btn-group btn-group-justified" role="group" aria-label="group button">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-default" data-dismiss="modal" role="button">Sluiten
                        </button>
                    </div>
                    <div class="btn-group" role="group">
                        <button type="button" id="new-save-button" class="btn btn-default btn-hover-green"
                                data-action="save" role="button">Account opslaan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

<!-- modal for editing user-->
<div class="modal fade" id="edit-modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                            class="sr-only">Sluit</span></button>
                <h3 class="modal-title" id="lineModalLabel">Pas account aan</h3>
            </div>

            <div class="modal-body">

                <div class="alert alert-success hidden" role="alert" id="success-message-edit">
                    <b>Succes</b> Het account is aangepast.
                </div>

                <div class="alert alert-danger hidden" role="alert" id="error-message-edit">
                    <b>Er is iets fout gegaan</b>
                </div>
                <!-- content goes here -->
                <form>
                    <div class="row form-group">
                        <label class="col-md-3 control-label" for="edit-firstname">Voornaam</label>
                        <div class="col-md-9">
                            <div class="input-group">
			                <span class="input-group-addon">
			                <i class="glyphicon glyphicon-user"></i></span>
                                <input id="edit-firstname" name="firstname" placeholder="voornaam"
                                       class="form-control input-md" type="text">
                            </div>
                        </div>
                    </div>

                    <div class="row form-group">
                        <label class="col-md-3 control-label" for="edit-lastname">Achternaam</label>
                        <div class="col-md-9">
                            <div class="input-group">
			                <span class="input-group-addon">
			                <i class="glyphicon glyphicon-user"></i></span>
                                <input id="edit-lastname" name="lastname" placeholder="achternaam"
                                       class="form-control input-md" type="text">
                            </div>
                        </div>
                    </div>

                    <div class="row form-group">
                        <label class="col-md-3 control-label" for="edit-birthday">Geboortedatum</label>
                        <div class="col-md-9">
                            <div class="input-group">
			                <span class="input-group-addon">
			                <i class="glyphicon glyphicon-calendar"></i>
			            </span>
                                <input id="edit-birthday" name="date" placeholder="geboortedatum"
                                       class="form-control input-md">
                            </div>
                        </div>
                    </div>

                    <div class="row form-group" id="edit-handicap-dropdown">
                        <label class="col-md-3 control-label" for="edit-handicap-button">
                            Handicap

                            <a data-toggle="tooltip" data-placement="left" title="De handicap representeert vitaliteit.
                                               Hoe minder goed ter been een persoon is, hoe meer punten een stap waard is.">
                                <span class="glyphicon glyphicon-info-sign"></span>
                            </a>

                            <div class="large-tooltip handicap-tooltip">
                                <i class="icon ion-help-circled" rel="tooltip" title="Hint"></i>
                            </div>
                        </label>
                        <div class="col-md-9">
                            <div class="input-group">
                                <div class="dropdown">
                                    <button id="edit-handicap-button" class="btn btn-default dropdown-toggle"
                                            type="button" data-toggle="dropdown">
                                        Handicap <span class="caret"></span>
                                    </button>

                                    <ul class="dropdown-menu" id="edit-handicap">
                                        <li><a href="#">Goed ter been</a></li>
                                        <li><a href="#">Minder goed ter been</a></li>
                                        <li><a href="#">Slecht ter been</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="row form-group">
                        <label class="col-md-3 control-label" for="edit-password"> Reset wachtwoord
                            <a data-toggle="tooltip" data-placement="auto"
                               title="Een wachtwoord moet minstens acht tekens lang zijn.">
                                <span class="glyphicon glyphicon-info-sign"></span>
                            </a>
                            <div class="large-tooltip password-tooltip">
                                <i class="icon ion-help-circled" rel="tooltip" title="Hint"></i>
                            </div>
                        </label>
                        <div class="col-md-9">
                            <div class="input-group">
                        <span class="input-group-addon">
                        <i class="glyphicon glyphicon-lock" id="icon1"></i>
                        </span>
                                <input id="edit-password" name="password" placeholder="wachtwoord"
                                       class="form-control input-md" type="password">
                            </div>
                        </div>
                    </div>

                    <div class="row form-group">
                        <label class="col-md-3 control-label" for="edit-password2">Herhaal wachtwoord</label>
                        <div class="col-md-9">
                            <div class="input-group">
                        <span class="input-group-addon">
                        <i class="glyphicon glyphicon-lock" id="icon2"></i>
                        </span>
                                <input id="edit-password2" name="password2" placeholder="wachtwoord"
                                       class="form-control input-md" type="password">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <label class="col-md-3 control-label" for="change-active">Actief: </label>
                        <div class="col-md-9">
                            <div class="switch" id="change-active">
                                <input id="active-toggle" class="cmn-toggle cmn-toggle-round-flat" type="checkbox">
                                <label for="active-toggle"></label>
                            </div>
                        </div>

                    </div>

                    <hr style="margin-top:10px;margin-bottom:10px;">

                </form>

            </div>
            <div class="modal-footer">
                <div class="btn-group btn-group-justified" role="group" aria-label="group button">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-default" data-dismiss="modal" role="button">Sluiten
                        </button>
                    </div>
                    <div class="btn-group" role="group">
                        <button type="button" id="edit-save-button" class="btn btn-default btn-hover-green"
                                data-action="save" role="button">Account opslaan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="today"></div>

<div class="container">

    <!-- block for users lists -->
    <div class="col-md-7">

        <!-- active users list -->
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title"><b>Deelnemers</b></h3>
                <a class="link-button" id="new-account">Nieuw account aanmaken</a>
            </div>

            <div class="panel-body" id="userlist"></div>

            <div class="panel-footer">
                <!-- edit account -->
                <button id="edit" value="" class='btn btn-primary' disabled
                        data-toggle='modal' data-target='#edit-modal'>Pas aan
                </button>

                <!-- export data -->
                <button id="pdf-export" value="" class="btn btn-primary" disabled
                        title="De gebruiker moet gekoppeld zijn aan een Fitbit om te exporteren.">
                    Exporteer
                </button>

                <!-- connect Fitbit -->
                <button id="connect" value="" class="btn btn-primary hidden">
                    Koppel Fitbit
                </button>

                <!-- disconnect Fitbit -->
                <button id="revoke" value="" class="btn btn-primary hidden">
                    Ontkoppel Fitbit
                </button>
            </div>
        </div>

        <!-- inactive users list -->
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title"><b>Inactieve deelnemers</b></h3>
            </div>

            <div class="panel-body" id="userlist-inactive"></div>
        </div>
    </div>

    <!-- block for competition settings -->
    <div class="col-md-5" id="comp-div">
        <div class="panel panel-default">

            <div class="panel-heading">
                <h3 class="panel-title"><b>Competitie aanpassen</b></h3>
            </div>
            <div class="panel-body" id="competitionlist">
                <div>
                    <div class="alert alert-success hidden" role="alert" id="success-competition">
                        <b>Gelukt!</b> Je informatie is nu geupdated.
                    </div>
                    <div class="alert alert-danger hidden" role="alert" id="error-competition">
                        <b>Voer een getal in!</b>
                    </div>

                    <form id="competition-form-goal">
                        <h4>Lengte van de volgende competitie</h4>
                        <br/>
                        <span id="show-current-goal"></span><br/>
                        <span id="show-last-goal"></span><br/>
                        <br/>
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-road"></i></span>
                            <input type="number" class="form-control" id="comp-goal" placeholder="Aantal punten">
                            <button type="button" id="comp-length-submit-button" class="btn btn-primary">
                                Opslaan
                            </button>
                        </div>
                    </form>
                    <br/>

                    <form id="competition-form-days">
                        <h4>Lengte van de volgende competitie</h4>
                        <br/>
                        <span id="show-current-days"></span><br/>
                        <span id="show-last-days"></span><br/>
                        <br/>
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-resize-horizontal"></i></span>
                            <input type="number" class="form-control" id="comp-days" placeholder="Aantal dagen">
                            <button type="button" id="comp-days-submit-button" class="btn btn-primary">
                                Opslaan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- end container -->
</div>

<!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

<!-- your scripts -->
<script src="js/admin-dashboard.js"></script>
<script src="js/sign-up.js"></script>

<link rel="stylesheet" href="css/button.css">

<!-- end of body -->
<?php include './include/footer.php'; ?>
