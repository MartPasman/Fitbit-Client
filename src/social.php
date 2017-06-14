<?php
$title = "Mijn resultaten";
include './include/header.php';
?>

    <link rel="stylesheet" href="css/weather.css"/>
    <link rel="stylesheet" href="css/social.css">

    <!-- today -->
    <div id="today"></div>


    <div class="container-fluid">
        <div id="bar-div" class="progress" style="margin-right: 2%; margin-left:2%; height: 40px;">
            <div id="progressBar" class="progress-bar progress-bar-danger  progress-bar-striped active"
                 role="progressbar"
                 aria-valuemin="0" aria-valuemax="100" style="width:45%">
                <h6 id="sharedgoalh">Gezamenlijk doel</h6>
                <h4 id="percentage"></h4>

            </div>
        </div>
        <!-- Activity data -->
        <div id="activity-data" class="col-sm-4">
            <div class="block-resize" id="news">

            </div>
        </div>

        <!-- Activity data -->
        <div id="activity-data" class="col-sm-4">
            <div class="weather-card">
                <div class="top">
                    <div class="wrapper">
                        <h1 class="heading">Zonnig</h1>
                        <h3 class="location">Enschede, Nederland</h3>
                        <p class="temp">
                            <span class="temp-value">17</span>
                            <span class="deg">0</span>
                            <a href="javascript:;"><span class="temp-type">C</span></a>
                        </p>
                        <span class="temp-small">24/11<span class="deg">0</span><span
                                    class="temp-type">C</span></span>
                    </div>
                </div>
                <div class="bottom">
                    <div class="wrapper">
                        <ul class="forecast">
                            <a href="javascript:;"><span class="lnr lnr-chevron-up go-up"></span></a>
                            <li class="active">
                                <span class="date">Morgen</span>
                                <span class="lnr lnr-sun condition">
									<span class="temp">18/13<span class="deg">0</span><span
                                                class="temp-type">C</span></span>
								</span>
                            </li>
                            <li>
                                <span class="date">Overmorgen</span>
                                <span class="lnr lnr-cloud condition">
									<span class="temp">18/11<span class="deg">0</span><span
                                                class="temp-type">C</span></span>
								</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Birthdays-->
        <div id="activity-data " class="col-sm-4">
            <div class="block-resize" id="birthdays">
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
    <script src="js/social.js" type="text/javascript"></script>
    <script src="js/nieuws.js"></script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>