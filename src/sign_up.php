<?php
$title = "Account aanmaken";
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
        <img src="img/goals.png" class="login-top-image"/>

        <div style="margin-top:30px">
            <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-default">
                    <div class="panel-heading"><h3 class="panel-title"><strong>Account aanmaken</strong></h3>
                    </div>

                    <div class="panel-body">
                        <form role="form">
                            <div class="alert alert-danger" id="error">
                                <a class="close" data-dismiss="alert" href="#">×</a>Wachtwoorden komen niet overeen.
                            </div>


                            <div class="row form-group">
                                <label class="col-md-3 control-label" for="email">E-mailadres</label>
                                <div class="col-md-9">
                                    <div class="input-group">
			                <span class="input-group-addon">
			                <i class="glyphicon glyphicon-envelope"></i>
			            </span>
                                        <input id="email" name="email" placeholder="e-mailadres"
                                               class="form-control input-md" type="email">
                                    </div>
                                </div>
                            </div>


                            <div class="row form-group" id="handicap">
                                <label class="col-md-3 control-label" for="handicap">Handicap</label>
                                <div class="col-md-9">
                                    <div class="input-group">
                                        <div class="dropdown">
                                            <button id="handicapbtn" class="btn btn-default dropdown-toggle"
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
                                            <ul class="dropdown-menu" id="handicap">
                                                <li><a href="#">Goed ter been</a></li>
                                                <li><a href="#">Minder goed ter been</a></li>
                                                <li><a href="#">Slecht ter been</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="row form-group" id="type">
                                <label class="col-md-3 control-label" for="type">Type account</label>
                                <div class="col-md-9">
                                    <div class="input-group">
                                        <div class="dropdown">
                                            <button id="typebtn" class="btn btn-default dropdown-toggle"
                                                    type="button" data-toggle="dropdown">Account
                                                <span class="caret"></span></button>
                                            <ul class="dropdown-menu" id="type">
                                                <li><a href="#">Deelnemer</a></li>
                                                <li><a href="#">Arts/fysiotherapeut</a></li>
                                                <li><a href="#">Administrator</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="row form-group">
                                <label class="col-md-3 control-label" for="wachtwoord">Wachtwoord</label>
                                <div class="col-md-9">
                                    <div class="input-group">
			                <span class="input-group-addon">
			                <i class="glyphicon glyphicon-lock"></i>
			            </span>
                                        <input id="wachtwoord" name="wachtwoord" placeholder="wachtwoord"
                                               class="form-control input-md" type="password">
                                    </div>
                                </div>
                            </div>

                            <div class="row form-group">
                                <label class="col-md-3 control-label" for="wachtwoord2">Wachtwoord</label>
                                <div class="col-md-9">
                                    <div class="input-group">
			                <span class="input-group-addon">
			                <i class="glyphicon glyphicon-lock"></i>
			            </span>
                                        <input id="wachtwoord2" name="wachtwoord2" placeholder="wachtwoord"
                                               class="form-control input-md" type="password">
                                    </div>
                                </div>
                            </div>

                            <button type="button" id="save" class="btn btn-success">Account aanmaken</button>

                            <hr style="margin-top:10px;margin-bottom:10px;">

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <!-- your scripts -->
    <script src="js/sign-up.js"></script>


    <!-- end of body -->
<?php include './include/footer.php'; ?>