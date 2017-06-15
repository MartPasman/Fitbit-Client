<?php
$title = "Dashboard";
include './include/header.php';


?>
    <style type="text/css">
        html, body {
            overflow: hidden;
        }
    </style>

    <meta http-equiv="refresh" content="300; URL=/competition-dashboard.php?fullscreen=1">

    <link rel="stylesheet" href="./css/weather.css"/>
    <link rel="stylesheet" href="./css/weather-icons.css"/>
    <link rel="stylesheet" href="css/social.css">

    <!-- today -->
    <div id="today"></div>

    <div id="test"></div>

    <div class="container-fluid">
        <div id="slides">
            <div class="container-fluid">
                <div id="bar-div" class="progress" style="height: 50px;">
                    <span id="perc-span"><h4 id="percentage"></h4></span>
                    <div id="progressBar" class="progress-bar progress-bar-danger  progress-bar-striped active"
                         role="progressbar"
                         aria-valuemin="0" aria-valuemax="100">
                        <div id="progress-div">
                            <h3 id="sharedgoalh">Doelstelling</h3>
                        </div>
                        <h3 id="sharedgoalh">Doelstelling</h3>

                    </div>

                </div>

                <div id="activity-data" class="col-sm-4">
                    <div class="block-resize" id="news">

                    </div>
                </div>

                <!-- Activity data -->
                <div id="activity-data" class="col-sm-4">
                    <div class="weather-card">
                        <div class="top">
                            <div class="wrapper">
                                <i id="today-icon"
                                   style="font-size: 7em; float:left; position:absolute; left:5%; color:white;"></i>
                                <h1 class="heading" id="condition"></h1>
                                <h3 class="location" id="location"></h3>
                                <p class="temp">
                                    <span class="temp-value" id="curtemp"></span>
                                    <span class="deg">0</span>
                                    <a href="javascript:;"><span class="temp-type">C</span></a>
                                </p>
                                <span class="temp-small" id="today-max-min"></span>
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="wrapper">
                                <ul class="forecast">
                                    <a href="javascript:;"><span class="lnr lnr-chevron-up go-up"></span></a>
                                    <li class="active">
                                        <span class="date">Morgen</span>
                                        <span class="lnr lnr-sun condition">
									<span class="temp" id="tom-max-min"></span>
								</span>
                                    </li>
                                    <li>
                                        <span class="date">Overmorgen</span>
                                        <span class="lnr lnr-cloud condition">
									<span class="temp" id="tom2-max-min"></span>
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
    </div>


    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <!-- your scripts -->
    <script src="js/competition-dashboard.js"></script>

    <!-- SlidesJS Required: Link to jquery.slides.js -->
    <script src="../js/jquery.slides.js"></script>

    <!-- your scripts -->
    <script src="js/birthday.js"></script>
    <script src="js/social.js" type="text/javascript"></script>
    <script src="js/nieuws.js"></script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>