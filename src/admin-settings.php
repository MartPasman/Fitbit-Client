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
            <li><a data-toggle="tab" href="#settings">
                    <div class="glyphicon glyphicon-lock"></div>
                    &nbsp Wachtwoord wijzigen</a></li>
            <div class="large-tooltip">
                <i class="icon ion-help-circled" rel="tooltip" title="Hint"></i>
            </div>
        </ul>
    </div>

    <div class="row">
        <div class="tab-content">

            <!-- My personal data -->
            <div id="personal" class=" tab-pane fade  in active" style="margin-top:30px;">
                <div class="col-sm-6 col-sm-offset-3 col-xs-12">
                    <div class="panel panel-default">

                        <div class="panel-heading"><h2>Mijn gegevens</h2></div>
                        <div class="panel-body">
                            <div class="alert alert-danger" role="alert" id="error">
                                <strong>Oeps!</strong> Er ging iets mis.
                            </div>
                            <div class="alert alert-success" role="alert" id="success">
                                <strong>Gelukt!</strong> Je informatie is nu geupdated.
                            </div>
                            <div id="id-field"></div>
                            <p></p>
                            <form>
                                <div id="name-field">

                                </div>
                                <p></p>
                                <div id="email-field">

                                </div>
                                <p></p>
                                <div id="date-field">

                                </div>
                                <p></p>
                                <div id="age-field">

                                </div>
                                <p></p>
                                <div id="health-field">

                                </div>
                                <p></p>
                                <div id="buttons">

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Settings data -->
            <div id="settings" class="tab-pane fade" style="margin-top:30px;">
                <div class="col-sm-6 col-sm-offset-3 col-xs-12">
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