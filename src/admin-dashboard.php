<?php
$title = "Dashboard";
include './include/header.php';
?>

<link rel="stylesheet" href="css/switches.css">


<div class="container">

    <!-- block for users and competition -->
    <div style="margin-top:30px">
        <div class="col-md-6 ">
            <div class="panel panel-default">
                <div class="panel-heading"
                <h3 class="panel-title"><strong>Deelnemers</strong></h3>
                <a class="link-button" id="accountbtn">Nieuw account aanmaken</a>
            </div>

            <div class="panel-body" id="userlist">
            </div>
        </div>
    </div>

    <div class="col-md-5 col-md-offset-1 ">
        <div class="panel panel-default">

            <div class="panel-heading"><h3 class="panel-title"><strong>Competitie</strong></h3>
            </div>
            <div class="panel-body" id="competitionlist">
                <div>
                    <div class="alert alert-success" role="alert" id="success">
                        <strong>Gelukt!</strong> Je informatie is nu geupdated.
                    </div>
                    <form id="competition-form">
                        Doelstelling voor volgende competitie:<br>
                        <input type="text" id="default_goal" placeholder="Aantal punten"><br>
                        <button id="comp-submit-button" type="button" class="btn btn-default goal">Submit</button>
                    </form>
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

                <div class="alert alert-success" role="alert" id="success-message-edit">
                    <strong>Succes</strong> Het account is aangepast.
                </div>

                <div class="alert alert-danger" role="alert" id="error-message-edit">
                    <strong>Er is iets fout gegaan</strong>
                </div>
                <!-- content goes here -->
                <form>
                    <div class="row form-group">
                        <label class="col-md-3 control-label" for="edit-firstname">Voornaam*</label>
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
                        <label class="col-md-3 control-label" for="edit-lastname">Achternaam*</label>
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
                        <label class="col-md-3 control-label" for="edit-birthday">Geboortedatum*</label>
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
                        <label class="col-md-3 control-label" for="edit-handicap-button">Handicap*
                            <a data-toggle="tooltip" data-placement="auto" style="width: 400px"
                               title="De handicap houdt rekening met de vitaliteit van een deelnemer.
                                               Hoe minder goed ter been een persoon is, hoe meer aantal punten hij krijgt
                                               bij een aantal stappen."
                            ><span class="glyphicon glyphicon-info-sign"
                                   style="color: #DC4F62; font-size: 1.2em;"></span></a>
                            <div class="large-tooltip handicap-tooltip"><i class="icon ion-help-circled"
                                                                           rel="tooltip"
                                                                           title="Hint"></i>
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
                            <a data-toggle="tooltip" data-placement="auto" style="width: 400px"
                               title="Een wachtwoord moet minstens acht tekens lang zijn."
                            ><span class="glyphicon glyphicon-info-sign"
                                   style="color: #DC4F62; font-size: 1.2em;"></span></a>
                            <div class="large-tooltip password-tooltip"><i class="icon ion-help-circled"
                                                                           rel="tooltip" title="Hint"></i>
                            </div>
                        </label>
                        <div class="col-md-9">
                            <div class="input-group">
                    			                        <span class="input-group-addon">
                    			                            <i class="glyphicon glyphicon-lock"></i>
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
                    			                <i class="glyphicon glyphicon-lock"></i>
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
                    <div class="alert alert-danger" role="alert" id="error-message-new">
                        <strong>Er is iets fout gegaan</strong>
                    </div>

                    <div class="alert alert-success" role="alert" id="success-message-new">
                        <strong>Het account is aangemaakt</strong>
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
                        <label class="col-md-3 control-label" for="new-handicap-button">Handicap
                            <a data-toggle="tooltip" data-placement="auto" style="width: 400px"
                               title="De handicap houdt rekening met de vitaliteit van een deelnemer.
                                               Hoe minder goed ter been een persoon is, hoe meer aantal punten hij krijgt
                                               bij een aantal stappen."
                            ><span class="glyphicon glyphicon-info-sign"
                                   style="color: #DC4F62; font-size: 1.2em;"></span></a>
                            <div class="large-tooltip handicap-tooltip"><i class="icon ion-help-circled"
                                                                           rel="tooltip"
                                                                           title="Hint"></i>
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
                        <label class="col-md-3 control-label" for="new-password">Wachtwoord
                            <a data-toggle="tooltip" data-placement="auto" style="width: 400px"
                               title="Een wachtwoord moet minstens acht tekens lang zijn."
                            ><span class="glyphicon glyphicon-info-sign"
                                   style="color: #DC4F62; font-size: 1.2em;"></span></a>
                            <div class="large-tooltip password-tooltip"><i class="icon ion-help-circled"
                                                                           rel="tooltip"
                                                                           title="Hint"></i>
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
