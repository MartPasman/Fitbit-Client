<?php
$title = "Mijn Instellingen";
include './include/header.php';

?>
    <!-- today -->
    <div id="today"></div>

    <div class="container">

        <div class="row">
            <div class="col-xs-12 col-md-offset-2 col-md-8">
                <ul class="nav nav-tabs pink">
                    <li class="active">
                        <a data-toggle="tab" href="#personal">
                            <span class="glyphicon glyphicon-user"></span>&nbsp Persoonlijke informatie
                        </a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#goals">
                            <span class="glyphicon glyphicon-dashboard"></span>&nbsp Doelstellingen
                        </a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#settings">
                            <span class="glyphicon glyphicon-lock"></span>&nbsp Wachtwoord wijzigen
                        </a>
                    </li>

                    <div class="large-tooltip">
                        <i class="icon ion-help-circled" rel="tooltip" title="Hint"></i>
                    </div>
                </ul>
            </div>
        </div>

        <div class="row">
            <div class="tab-content">

                <!-- My personal data -->
                <div id="personal" class="tab-pane fade in active">
                    <div class="col-xs-12 col-md-offset-2 col-md-8">
                        <div class="panel panel-default">

                            <div class="panel-heading"><h2>Mijn gegevens</h2></div>
                            <div class="panel-body row">
                                <div class="col-xs-12 col-md-8 col-md-offset-2">
                                    <div class="alert alert-danger" role="alert" id="error" hidden>
                                        <strong>Oeps!</strong> Er ging iets mis.
                                    </div>
                                    <div class="alert alert-success" role="alert" id="success" hidden>
                                        <strong>Gelukt!</strong> Je informatie is nu geüpdated.
                                    </div>

                                    <form>
                                        <div id="id-field" class="info"></div>
                                        <div id="name-field" class="info"></div>
                                        <div id="date-field" class="info"></div>
                                        <div id="age-field" class="info"></div>
                                        <div id="health-field" class="info"></div>
                                        <div id="buttons" class="info"></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- My goals data -->
                <div id="goals" class="tab-pane fade">
                    <div class="col-xs-12 col-md-offset-2 col-md-8">
                        <!-- Goal data -->
                        <div class="panel panel-default">
                            <div class="panel-heading"><h2>Doelstellingen</h2></div>
                            <div class="panel-body row">
                                <div class="col-xs-12 col-md-8 col-md-offset-2">
                                    In dit vak staan je instellingen wat betreft je doelstellingen.
                                    Je kan een nieuwe doelstelling aanmaken, of een lopende verwijderen.
                                    <br/><br/>
                                    <button type="button" data-toggle="modal" data-target="#form-modal"
                                            class="col-xs-12 btn btn-primary" id="new-goal">
                                        Een nieuwe doelstelling aanmaken
                                    </button>
                                    <br/><br/>
                                    <button type="button" data-toggle="modal" data-target="#item-modal"
                                            class="col-xs-12 btn btn-primary" id="all-goals">
                                        Alle doelstellingen beheren
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Settings data -->
                <div id="settings" class="tab-pane fade">
                    <div class="col-xs-12 col-md-offset-2 col-md-8">
                        <div class="panel panel-default">
                            <div class="panel-heading"><h2>Wachtwoord</h2></div>
                            <div class="panel-body row">
                                <div class="col-xs-12 col-md-8 col-md-offset-2">
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