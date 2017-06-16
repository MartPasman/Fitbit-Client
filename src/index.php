<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Goals</title>

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="/css/bootstrap/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="/css/custom.css" rel="stylesheet" type="text/css">
    <link href="../css/custom.css" rel="stylesheet" type="text/css">
</head>
<body>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

<div class="container">

    <span class="led-bad"></span>

    <img src="img/goals.png" class="login-top-image"/>

    <div style="margin-top:30px">
        <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3">
            <div class="panel panel-default">
                <div class="panel-heading"><h3 class="panel-title"><strong>Inloggen</strong></h3>
                </div>

                <div class="panel-body">
                    <form role="form">
                        <div class="alert alert-danger" id="error">
                            <a class="close" data-dismiss="alert" href="#">×</a>Onjuist ID of wachtwoord.
                        </div>
                        <div style="margin-bottom: 12px" class="input-group" id="iddiv">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <input id="id" type="text" class="form-control" name="id" value=""
                                   placeholder="ID">
                        </div>

                        <div style="margin-bottom: 12px" class="input-group" id="passdiv">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                            <input id="password" type="password" class="form-control" name="password"
                                   placeholder="Wachtwoord">
                        </div>

                        <button type="button" onsubmit="return false;" class="btn btn-success" id="login">
                            Inloggen
                        </button>

                        <hr/>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- JS scripts -->
<?php include './include/scripts.php'; ?>

<!-- page specific scripts -->
<script src="js/login.js"></script>

<!-- end of body -->
<?php include './include/footer.php'; ?>