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
    <p></p>
    <h5>Oud wachtwoord:</h5>
    <p></p>
    <div class="input-group" id="steps-div">
        <span class="input-group-addon"><i id="old-icon" class="glyphicon glyphicon-lock"></i></span>
        <input class="form-control" id="old-pass" placeholder="Oud wachtwoord" type="password">
    </div>
    <p></p>
    <h5>Nieuw wachtwoord:</h5>
    <p></p>
    <div class="input-group" id="start-div">
        <span class="input-group-addon"><i id="new-icon1" class="glyphicon glyphicon-lock"></i></span>
        <input class="form-control" id="new-pass1" placeholder="Nieuw wachtwoord" type="password"/>
    </div>
    <p></p>
    <div class="input-group" id="end-div">
        <span class="input-group-addon"><i id="new-icon2" class="glyphicon glyphicon-lock"></i></span>
        <input class="form-control" id="new-pass2" placeholder="Nieuw wachtwoord" type="password"/>
    </div>
    <p></p>
    <input type="button" id="change-password" class="col-xs-12 btn btn-success" value="Verander Wachtwoord"/>
</form>

<!-- Include jQuery -->
<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>

<!-- your scripts -->
<script src="../js/change-password.js"></script>