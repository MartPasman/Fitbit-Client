<?php
$title = "Mijn resultaten";
include './include/header.php';
?>

    <!-- today -->
    <div id="today"></div>

    <div class="container-fluid">

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

                <div class='birthday-user row'>
                    <div class='col-xs-12 col-md-12  birthday-today'> Romy Beugeling is vandaag jarig
                        <img src="img/birthday-cake.png" id="birthday-cake" alt="Gefeliciteerd" height="80" width="80">
                    </div>

                </div>
                <hr/>

                <div class='birthday-user row'>
                    <div class='col-xs-12 col-md-12  birthday-user'> Romy Beugeling is morgen jarig
                        <img src="img/almost.png" id="birthday-cake" alt="Gefeliciteerd" height="60" width="60">
                    </div>

                </div>
                <hr/>

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


    <!-- end of body -->
<?php include './include/footer.php'; ?>