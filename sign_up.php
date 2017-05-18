<?php
$title = "Registreren";
include './include/header.php';
?>

<div class="container">
    <img src="img/goals.png" class="login-top-image"/>

    <div style="margin-top:30px">
        <div class="col-md-6 col-md-offset-3">
            <div class="panel panel-default">
                <div class="panel-heading"><h3 class="panel-title"><strong>Account aanmaken</strong></h3>
                </div>

                <div class="panel-body">
                    <form role="form">
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


                        <div class="row form-group">
                            <label class="col-md-3 control-label" for="wachtwoord">Wachtwoord</label>
                            <div class="col-md-9">
                                <div class="input-group">
			                <span class="input-group-addon">
			                <i class="glyphicon glyphicon-lock"></i>
			            </span>
                                    <input id="wachtwoord" name="wachtwoord" placeholder="e-mailadres"
                                           class="form-control input-md" type="password">
                                </div>
                            </div>
                        </div>

                        <div class="row form-group">
                            <label class="col-md-3 control-label" for="handicap">Handicap</label>
                            <div class="col-md-9">
                                <div class="input-group">
                                    <div class="dropdown">
                                        <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Handicap
                                            <span class="caret"></span></button>
                                        <a data-toggle="tooltip" data-placement="auto"
                                           title="De handicap houdt rekening met de fitaliteit van een deelnemer.
                                            Wanneer een persoon slecht ter been is, krijgt hij meer punten bij een aantal stappen,
                                            dan een persoon die goed ter been is.">Uitleg</a>
                                        <ul class="dropdown-menu">
                                            <li><a href="#">Goed ter been</a>  </li>
                                            <li><a href="#">Minder goed ter been</a></li>
                                            <li><a href="#">Slecht ter been</a></li>
                                        </ul>
                                    </div>

                            </div>
                        </div>
                        </div>

                        <script>

                            $(document).ready(function () {
                                $('[data-toggle="tooltip"]').tooltip();
                            });

                        </script>

                        <button type="submit" class="btn btn-success">Account aanmaken</button>

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
    <script src="js/sign_up.js"></script>


    <!-- end of body -->
<?php include './include/footer.php'; ?>