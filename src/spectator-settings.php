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
                    <button type="button"  class="btn btn-success" id="next">
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

    <div class="container">

        <!-- Goal data -->
        <div id="goals" class="block-settings col-sm-3">
            <h2>Doelstellingen</h2>
            In dit vak staan je instellingen wat betreft je doelstellingen. Je kan een nieuwe doelstelling aanmaken,
            <br>
            of een lopende verwijderen.
            <p></p>
            <h5><b>Voeg een nieuwe doelstelling toe:</b></h5>
            <p></p>
            <button type="button" data-toggle="modal" data-target="#form-modal" class="btn btn-success" id="new-goal">
                Nieuwe doelstelling
            </button>

            <h5><b>Alle doelstellingen:</b></h5>
            <p></p>
            <button type="button" data-toggle="modal" data-target="#item-modal" class="btn btn-success" id="new-goal">
                Doelstellingen
            </button>



        </div>

        <!-- Space -->
        <div id="results" class="col-sm-1">
        </div>

        <!-- Results data -->
        <div id="results" class="block-settings col-sm-4">
            <h2>Resultaten</h2>
        </div>

        <!-- Space -->
        <div id="results" class="col-sm-1">
        </div>

        <!-- Settings data -->
        <div id="settings" class="block-settings col-sm-3">
            <h2>Instellingen</h2>
        </div>


    </div>

<!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

<!-- your scripts -->
<script src="js/spectator-settings.js"></script>
<script src="js/all-goals.js"></script>

<!-- end of body -->
<?php include './include/footer.php'; ?>

    <!-- Include jQuery -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>

    <!-- Include Date Range Picker -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>

    <script>
        $(document).ready(function(){
            var date_input=$('input[name="date"]'); //our date input has the name "date"
            var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
            date_input.datepicker({
                format: 'dd/mm/yyyy',
                container: container,
                todayHighlight: true,
                autoclose: true
            })
        })
    </script>

