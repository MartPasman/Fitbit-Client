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
                    <li class="active"><a data-toggle="tab" href="#personal">
                            <div class="glyphicon glyphicon-user"></div>
                            &nbsp Persoonlijke informatie</a></li>
                    <li><a data-toggle="tab" href="#settings">
                            <div class="glyphicon glyphicon-lock"></div>
                            &nbsp Wachtwoord wijzigen</a></li>
                    <div class="large-tooltip">
                        <i class="icon ion-help-circled" rel="tooltip" title="Hint"></i>
                    </div>
                </ul>
            </div>
        </div>

        <div class="row">
            <div class="tab-content">

                <!-- My personal data -->
                <div id="personal" class=" tab-pane fade in active">
                    <div class="col-xs-12 col-md-8 col-md-offset-2">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h2>Mijn gegevens</h2>
                            </div>

                            <div class="panel-body">
                                <div class="col-xs-12 col-sm-8 col-sm-offset-2">
                                    <div class="alert alert-danger" role="alert" id="error">
                                        <strong>Oeps!</strong> Er ging iets mis.
                                    </div>
                                    <div class="alert alert-success" role="alert" id="success">
                                        <strong>Gelukt!</strong> Je informatie is nu geupdate.
                                    </div>

                                    <div id="id-field" class="info"></div>
                                    <form>
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

                <!-- Settings data -->
                <div id="settings" class="tab-pane fade">
                    <div class="col-xs-12 col-md-8 col-md-offset-2">

                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h2>Wachtwoord</h2>
                            </div>
                            <div class="panel-body">
                                <div class="col-xs-12 col-sm-8 col-sm-offset-2">
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
        startTime();
    </script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>