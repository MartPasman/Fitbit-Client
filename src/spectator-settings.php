<?php
$title = "Mijn resultaten";
include './include/header.php';
?>


<!-- line modal -->
<div class="modal fade" id="form-modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                            class="sr-only">Close</span></button>
                <h3 class="modal-title" id="lineModalLabel">Nieuwe doelstelling.</h3>
            </div>
            <div class="modal-body">

                <div class="alert alert-success" role="alert" id="success-message">
                    <strong>Aangemaakt!</strong> Veel succes met je nieuwe doelstelling!
                </div>

                <div class="alert alert-danger" role="alert" id="error-message">
                    <strong>Foutje!</strong>
                </div>
                <!-- content goes here -->
                <form>
                    <div class="input-group" id="steps-div">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-tree-conifer"></i></span>
                        <input type="text" class="form-control" id="steps" placeholder="Aantal stappen">
                    </div>
                    Start datum:
                    <div class="input-group" id="start-div">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                        <input class="form-control" id="start-date" name="date" placeholder="Start datum" type="text"/>
                    </div>
                    Eind datum:
                    <div class="input-group" id="end-div">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                        <input class="form-control" id="end-date" name="date" placeholder="Eind datum" type="text"/>
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
                        <button type="button" id="save-button" class="btn btn-default btn-hover-green"
                                data-action="save" role="button">Aanmaken
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- line modal -->
<div class="modal fade" id="item-modal" tabindex="-2" role="dialog" aria-labelledby="modalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                            class="sr-only">Sluiten</span></button>
                <h3 class="modal-title" id="lineModalLabel">Alle doelstellingen</h3>
                <!-- content goes here -->
                <div class="alert alert-danger" role="alert" id="error-message-all">
                    <strong>Foutje!</strong>
                </div>
                <div id="all-goals-view">
                    <div class="alert alert-warning" role="alert" id="error-message-all">
                        <strong>Leeg!</strong> Je hebt nog geen doelstellingen, maak er snel één aan.
                    </div>
                </div>
                <button type="button" class="btn btn-success" id="before">
                    <<
                </button>
                <button type="button" class="btn btn-success" id="next">
                    >>
                </button>
            </div>
            <div class="modal-footer">
                <div class="btn-group btn-group-justified" role="group" aria-label="group button">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-default" data-dismiss="modal" role="button">Sluiten
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- line modal -->
<div class="modal fade" id="update-modal" tabindex="-3" role="dialog" aria-labelledby="modalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                            class="sr-only">Close</span></button>
                <h3 class="modal-title" id="lineModalLabel">Doelstelling wijzigen</h3>
            </div>
            <div class="modal-body">

                <div class="alert alert-success" role="alert" id="success-message-update">
                    <strong>Opgeslagen!</strong> Veel succes met je nieuwe doelstelling!
                </div>

                <div class="alert alert-danger" role="alert" id="error-message-update">
                    <strong>Foutje!</strong>
                </div>
                <!-- content goes here -->
                <form>
                    <div class="input-group" id="steps-div-update">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-tree-conifer"></i></span>
                        <input type="text" class="form-control" id="steps-update" placeholder="Aantal stappen">
                    </div>
                    Start datum:
                    <div class="input-group" id="start-div-update">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                        <input class="form-control" id="start-date-update" name="date" placeholder="Start datum" type="text"/>
                    </div>
                    Eind datum:
                    <div class="input-group" id="end-div-update">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                        <input class="form-control" id="end-date-update" name="date" placeholder="Eind datum" type="text"/>
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
                        <button type="button" id="update-button" class="btn btn-default btn-hover-green"
                                data-action="save" role="button">Opslaan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- today -->
<div id="today"></div>

<div class="container">
    <div class="row">

        <div class="col-sm-3">
            <!-- Goal data -->
            <div class="panel panel-default">
                <div class="panel-heading"><h2>Doelstellingen</h2></div>
                <div class="panel-body"> In dit vak staan je instellingen wat betreft je doelstellingen. Je kan een
                    nieuwe
                    doelstelling aanmaken,
                    <br>
                    of een lopende verwijderen.
                    <p></p>
                    <h5><b>Voeg een nieuwe doelstelling toe:</b></h5>
                    <p></p>
                    <button type="button" data-toggle="modal" data-target="#form-modal"
                            class="col-xs-12 btn btn-success"
                            id="new-goal">
                        Nieuwe doelstelling
                    </button>
                    <p></p>
                    <h5><b>Alle doelstellingen:</b></h5>
                    <p></p>
                    <button type="button" data-toggle="modal" data-target="#item-modal"
                            class="col-xs-12 btn btn-success"
                            id="all-goals">
                        Doelstellingen
                    </button>
                </div>
            </div>
        </div>

        <!-- Space -->
        <div id="results" class="col-sm-1">
        </div>

        <!-- My personal data -->
        <div class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-heading"><h2>Mijn gegevens</h2></div>
                <div class="panel-body">
                    <div><div class="glyphicon glyphicon-user"></div>&nbsp Henk Jan Peters</div>
                    <p></p>
                    <div><div class="glyphicon glyphicon-calendar"></div>&nbsp 28 Mei 1935</div>
                    <p></p>
                    <div><div class="glyphicon glyphicon-cloud"></div>&nbsp 81 Jaar</div>
                    <p></p>
                    <div><div class="glyphicon glyphicon-heart"></div>&nbsp Goed ter been</div>
                    <p></p>
                    <h4>Resultaten:</h4>
                    <p></p>
                    <button type="button" data-toggle="modal" data-target="#item-modal"
                            class="col-xs-12 btn btn-success"
                            id="all-goals">
                        <i class="glyphicon glyphicon-paperclip"></i> &nbsp Exporteren
                    </button>
                </div>
            </div>
        </div>

        <!-- Space -->
        <div id="results" class="col-sm-1">
        </div>


        <!-- Settings data -->
        <div class="col-sm-3">
            <div class="panel panel-default">
                <div class="panel-heading"><h2>Wachtwoord</h2></div>
                <div class="panel-body">
                    <?php
                    include './include/change-password.php';
                    ?>
                </div>
            </div>
        </div>


    </div>
</div>

<!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>



<!-- end of body -->
<?php include './include/footer.php'; ?>

<!-- Include jQuery -->
<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>

<!-- Include Date Range Picker -->
<script type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"></script>
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>



<!-- BS JavaScript -->
<script type="text/javascript" src="js/bootstrap.js"></script>
<!-- your scripts -->
<script src="js/spectator-settings.js"></script>
<script src="js/all-goals.js"></script>



<script>
    $(document).ready(function () {
        var date_input = $('input[name="date"]'); //our date input has the name "date"
        var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
        date_input.datepicker({
            format: 'dd/mm/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true
        })
    })
</script>

