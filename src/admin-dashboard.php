<?php
$title = "Dashboard";
include './include/header.php';
?>

<!-- error modal -->
<div id="modal-account-error" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Er is iets mis gegaan, probeer het later nog eens!</h4>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Sluit</button>
            </div>
        </div>
    </div>
</div>

<div class="container">

    <!-- block for users and competition -->
    <div style="margin-top:30px">
        <div class="col-md-5 ">
            <div class="panel panel-default">
                <div class="panel-heading"><h3 class="panel-title"><strong>Deelnemers</strong>
                        <a class="link-button" id="accountbtn">Nieuw account aanmaken</a></h3>
                </div>

                <div class="panel-body" id="userlist">
                </div>
            </div>
        </div>

        <div class="col-md-5 col-md-offset-2 ">
            <div class="panel panel-default">
                <div class="panel-heading"><h3 class="panel-title"><strong>Competitie</strong></h3>
                </div>

                <div class="panel-body" id="competitionlist">
                    <form role="form">
                    </form>
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

                    <div class="alert alert-success" role="alert" id="success-message">
                        <strong>Het account is aangepast</strong>
                    </div>

                    <div class="alert alert-danger" role="alert" id="error-message-edit">
                        <strong>Er is iets fout gegaan</strong>
                    </div>
                    <!-- content goes here -->
                    <form>
                        <div class="input-group" id="edit-handicap-div">
                            <label class="col-md-3 control-label" for="edit-handicapbtn">Handicap</label>
                            <div class="col-md-9">
                                <div class="input-group">
                                    <div class="dropdown">
                                        <button id="edit-handicapbtn" class="btn btn-default dropdown-toggle"
                                                type="button" data-toggle="dropdown">
                                            Handicap <span class="caret"></span>
                                        </button>
                                        <a data-toggle="tooltip" data-placement="auto" style="width: 400px"
                                           title="De handicap houdt rekening met de vitaliteit van een deelnemer.
                                               Hoe minder goed ter been een persoon is, hoe meer aantal punten hij krijgt
                                               bij een aantal stappen."
                                        ><span class="glyphicon glyphicon-info-sign"
                                               style="color: #DC4F62; font-size: 1.2em;"></span></a>
                                        <div class="large-tooltip"><i class="icon ion-help-circled" rel="tooltip"
                                                                      title="Hint"></i>
                                        </div>
                                        <ul class="dropdown-menu" id="edit-handicap">
                                            <li><a href="#">Goed ter been</a></li>
                                            <li><a href="#">Minder goed ter been</a></li>
                                            <li><a href="#">Slecht ter been</a></li>
                                        </ul>
                                    </div>
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
                            <button type="button" id="edit-save-button" class="btn btn-default btn-hover-green"
                                    data-action="save" role="button">Account opslaan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

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
                        <div class="alert alert-danger" role="alert" id="error-message-account">
                            <strong>Er is iets fout gegaan</strong>
                        </div>


                        <div class="row form-group">
                            <label class="col-md-3 control-label" for="new-voornaam">Voornaam</label>
                            <div class="col-md-9">
                                <div class="input-group">
			                <span class="input-group-addon">
			                <i class="glyphicon glyphicon-user"></i>
			            </span>
                                    <input id="new-voornaam" name="voornaam" placeholder="voornaam"
                                           class="form-control input-md" type="text">
                                </div>
                            </div>
                        </div>

                        <div class="row form-group">
                            <label class="col-md-3 control-label" for="new-achternaam">Achternaam</label>
                            <div class="col-md-9">
                                <div class="input-group">
			                <span class="input-group-addon">
			                <i class="glyphicon glyphicon-user"></i>
			            </span>
                                    <input id="new-achternaam" name="achternaam" placeholder="achternaam"
                                           class="form-control input-md" type="text">
                                </div>
                            </div>
                        </div>

                        <div class="row form-group">
                            <label class="col-md-3 control-label" for="new-email">E-mailadres</label>
                            <div class="col-md-9">
                                <div class="input-group">
			                <span class="input-group-addon">
			                <i class="glyphicon glyphicon-envelope"></i>
			            </span>
                                    <input id="new-email" name="email" placeholder="e-mailadres"
                                           class="form-control input-md" type="email">
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
                                            <li><a href="#">Arts/fysiotherapeut</a></li>
                                            <li><a href="#">Administrator</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row form-group" id="new-handicap-dropdown">
                            <label class="col-md-3 control-label" for="new-handicap-button">Handicap</label>
                            <div class="col-md-9">
                                <div class="input-group">
                                    <div class="dropdown">
                                        <button id="new-handicap-button" class="btn btn-default dropdown-toggle"
                                                type="button" data-toggle="dropdown">
                                            Handicap <span class="caret"></span>
                                        </button>
                                        <a data-toggle="tooltip" data-placement="auto" style="width: 400px"
                                           title="De handicap houdt rekening met de vitaliteit van een deelnemer.
                                               Hoe minder goed ter been een persoon is, hoe meer aantal punten hij krijgt
                                               bij een aantal stappen."
                                        ><span class="glyphicon glyphicon-info-sign"
                                               style="color: #DC4F62; font-size: 1.2em;"></span></a>
                                        <div class="large-tooltip"><i class="icon ion-help-circled" rel="tooltip"
                                                                      title="Hint"></i>
                                        </div>
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
                            <label class="col-md-3 control-label" for="new-wachtwoord">Wachtwoord</label>
                            <div class="col-md-9">
                                <div class="input-group">
			                        <span class="input-group-addon">
			                            <i class="glyphicon glyphicon-lock"></i>
			                        </span>
                                    <input id="new-wachtwoord" name="wachtwoord" placeholder="wachtwoord"
                                           class="form-control input-md" type="password">
                                </div>
                            </div>
                        </div>

                        <div class="row form-group">
                            <label class="col-md-3 control-label" for="new-wachtwoord2">Wachtwoord</label>
                            <div class="col-md-9">
                                <div class="input-group">
			                <span class="input-group-addon">
			                <i class="glyphicon glyphicon-lock"></i>
			            </span>
                                    <input id="new-wachtwoord2" name="wachtwoord2" placeholder="wachtwoord"
                                           class="form-control input-md" type="password">
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
                            <button type="button" id="new-save-button" class="btn btn-default btn-hover-green"
                                    data-action="save" role="button">Account opslaan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- JQuery and Bootstrap scripts -->
    <?php include './include/scripts.php'; ?>

    <!-- your scripts -->
    <script src="js/admin-dashboard.js"></script>
    <script src="js/sign-up.js"></script>

    <link rel="stylesheet" href="css/button.css">

    <!-- end of body -->
    <?php include './include/footer.php'; ?>
