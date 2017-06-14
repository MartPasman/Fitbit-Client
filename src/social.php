<?php
$title = "Mijn resultaten";
include './include/header.php';
?>

    <!-- today -->
    <div id="today"></div>


    <div class="container-fluid">
        <div id="bar-div" class="progress" style="margin-right: 2%; margin-left:2%; height: 40px;">
            <div id="progressBar" class="progress-bar progress-bar-danger  progress-bar-striped active" role="progressbar"
                 aria-valuemin="0" aria-valuemax="100" style="width:45%">
                <h6 id="sharedgoalh">Gezamenlijk doel</h6>
                <h4 id="percentage"></h4>
            </div>
        </div>
        <!-- Activity data -->
        <div id="activity-data" class="col-sm-4">
            <div class="block">
                <h2>Nieuws</h2>
            </div>
        </div>

        <!-- Activity data -->
        <div id="activity-data" class="col-sm-4">
            <div class="block">
                <h2>Weer</h2>
            </div>
        </div>

        <!-- Birthdays-->
        <div id="activity-data " class="col-sm-4">
            <div class="block" id="birthdays">
                <h2>Verjaardagen</h2>
                <hr/>

                <h3 id="no-birthdays">Niemand is jarig deze week</h3>

<!--                <div class='birthday-user row'>-->
<!--                    <div class='col-xs-11 col-md-11  birthday-today'> Romy Beugeling is vandaag jarig-->
<!--                    </div>-->
<!--                    <div class="col-xs-1 col-md-1 ">-->
<!--                        <img src="img/birthday-cake.png" class="birthday-cake" alt="Gefeliciteerd" height="80" width="80">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <hr/>-->
<!---->
<!--                <div class='birthday-user row'>-->
<!--                    <div class='col-xs-12 col-md-12  birthday-user'> Romy Beugeling is morgen jarig-->
<!--                        <img src="img/almost.png" id="birthday-piece" alt="Gefeliciteerd" height="60" width="60">-->
<!--                    </div>-->
<!---->
<!--                </div>-->
<!--                <hr/>-->

                <!-- TODO max 7 mensen per week -->

            </div>
        </div>
    </div>
    </div>

    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <!-- your scripts -->
    <script src="js/birthday.js"></script>
    <link rel="stylesheet" href="css/social.css">
    <script src="js/social.js" type="text/javascript"></script>


    <!-- end of body -->
<?php include './include/footer.php'; ?>