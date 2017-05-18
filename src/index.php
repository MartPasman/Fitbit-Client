<?php
$title = "Goals";
include './include/header.php';
?>

    <!-- error modal -->
    <div id="modal-login-error" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Er is iets mis gegaan!</h4>
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
            <div class="col-md-4 col-md-offset-4">
                <div class="panel panel-default">
                    <div class="panel-heading"><h3 class="panel-title"><strong>Inloggen</strong></h3>
                    </div>

                    <div class="panel-body">
                        <form role="form">
                            <div class="alert alert-danger" id="error">
                                <a class="close" data-dismiss="alert" href="#">×</a>Onjuist ID of wachtwoord.
                            </div>
                            <div style="margin-bottom: 12px" class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input id="id" type="text" class="form-control" name="id" value=""
                                       placeholder="ID">
                            </div>

                            <div style="margin-bottom: 12px" class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                <input id="password" type="password" class="form-control" name="password"
                                       placeholder="Wachtwoord">
                            </div>

                            <div class="input-group">
                                <div class="checkbox" style="margin-top: 0px;">
                                    <label>
                                        <input id="login-remember" type="checkbox" name="remember" value="1">Onthoud mij
                                    </label>
                                </div>
                            </div>

                            <button type="button" onsubmit="return false;" class="btn btn-success" id="login">Inloggen
                            </button>

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
    <script src="js/login.js"></script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>