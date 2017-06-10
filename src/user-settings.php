<?php
$title = "Mijn Instellingen";
include './include/header.php';

?>
    <!-- today -->
    <div id="today"></div>

    <div class="container">

        <ul class="nav nav-tabs pink">
            <li class="active"><a data-toggle="tab" href="#personal">
                    <div class="glyphicon glyphicon-user"></div>
                    &nbsp Persoonlijke informatie</a></li>
            <li><a data-toggle="tab" href="#goals">
                    <div class="glyphicon glyphicon-dashboard"></div>
                    &nbsp Doelstellingen</a></li>
            <li><a data-toggle="tab" href="#settings">
                    <div class="glyphicon glyphicon-lock"></div>
                    &nbsp Wachtwoord wijzigen</a></li>

            <div class="large-tooltip">
                <i class="icon ion-help-circled" rel="tooltip" title="Hint"></i>
            </div>
        </ul>

        <div class="row">
            <div class="tab-content">

                <!-- My personal data -->
                <div id="personal" class="tab-pane fade in active">
                    <div class="col-xs-12">
                        <div class="panel panel-default">

                            <div class="panel-heading"><h2>Mijn gegevens</h2></div>
                            <div class="panel-body row">
                                <div class="col-xs-12 col-md-6 col-md-offset-3">
                                    <div class="alert alert-danger" role="alert" id="error">
                                        <strong>Oeps!</strong> Er ging iets mis.
                                    </div>
                                    <div class="alert alert-success" role="alert" id="success">
                                        <strong>Gelukt!</strong> Je informatie is nu geupdated.
                                    </div>

                                    <form>
                                        <div id="id-field"></div>
                                        <div id="name-field"></div>
                                        <div id="email-field"></div>
                                        <div id="date-field"></div>
                                        <div id="age-field"></div>
                                        <div id="health-field"></div>
                                        <div id="buttons"></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- My goals data -->
                <div id="goals" class="tab-pane fade">
                    <div class="col-xs-12">
                        <!-- Goal data -->
                        <div class="panel panel-default">
                            <div class="panel-heading"><h2>Doelstellingen</h2></div>
                            <div class="panel-body row">
                                <div class="col-xs-12 col-md-6 col-md-offset-3">
                                    In dit vak staan je instellingen wat betreft je doelstellingen.
                                    Je kan een nieuwe doelstelling aanmaken, of een lopende verwijderen.
                                    <br/><br/>

                                    <h5>Voeg een nieuwe doelstelling toe:</h5>
                                    <button type="button" data-toggle="modal" data-target="#form-modal"
                                            class="col-xs-12 btn btn-success" id="new-goal">
                                        Nieuwe doelstelling
                                    </button>
                                    <br/><br/>

                                    <h5>Alle doelstellingen:</h5>
                                    <button type="button" data-toggle="modal" data-target="#item-modal"
                                            class="col-xs-12 btn btn-success" id="all-goals">
                                        Doelstellingen
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Settings data -->
                <div id="settings" class="tab-pane fade">
                    <div class="col-xs-12">
                        <div class="panel panel-default">
                            <div class="panel-heading"><h2>Wachtwoord</h2></div>
                            <div class="panel-body row">
                                <div class="col-xs-12 col-md-6 col-md-offset-3">
                                    <?php
                                    include './include/change-password.php';
                                    ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

<?php include './include/new-goal.php'; ?>

    <!-- your scripts -->
    <script src="js/change-user-information.js"></script>
    <script src="js/all-goals.js"></script>

    <script>
        // get the current date as a string
        $('#today').append(getTodaysDate());
    </script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>