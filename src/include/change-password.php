<?php
/**
 * Created by IntelliJ IDEA.
 * User: sveno
 * Date: 22-5-2017
 * Time: 10:41
 */
?>

<form>
    <div class="alert alert-success" role="alert" id="success-msg">
        <strong>Gelukt!</strong> Je wachtwoord is veranderd.
    </div>

    <div class="alert alert-danger" role="alert" id="error-msg">
        <strong>Foutje!</strong>
    </div>

    <h5>Oud wachtwoord:</h5>
    <div class="input-group info" id="steps-div">
        <span class="input-group-addon"><span id="old-icon" class="glyphicon glyphicon-lock"></span></span>
        <input class="form-control" id="old-pass" placeholder="Oud wachtwoord" type="password">
    </div>
    <h5>Nieuw wachtwoord:</h5>
    <div class="input-group info" id="start-div">
        <span class="input-group-addon"><span id="new-icon1" class="glyphicon glyphicon-lock"></span></span>
        <input class="form-control" id="new-pass1" placeholder="Nieuw wachtwoord" type="password"/>
    </div>
    <div class="input-group info" id="end-div">
        <span class="input-group-addon"><span id="new-icon2" class="glyphicon glyphicon-lock"></span></span>
        <input class="form-control" id="new-pass2" placeholder="Nieuw wachtwoord" type="password"/>
    </div>
    <input type="button" id="change-password" class="col-xs-offset-1 col-xs-10 btn btn-primary" value="Verander wachtwoord"/>
</form>

<!-- your scripts -->
<script src="../js/change-password.js"></script>