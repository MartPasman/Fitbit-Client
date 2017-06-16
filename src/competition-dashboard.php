<?php
$title = "Dashboard";
include './include/header.php';


// Amsterdam Dam
$amsterdam = 'https://www.youtube.com/embed/vpm16w3ik0g';

// Elephants
$elephants = 'https://www.youtube.com/embed/BaS2ofdeHPU';

// Bears
$bears = 'https://www.youtube.com/embed/pHvmGucGm_E';

// More
// https://www.youtube.com/user/exploreTeam
$input = array($amsterdam, $elephants, $bears);
$rand_keys = array_rand($input);
$url = $input[$rand_keys];
?>
    <style type="text/css">
        html, body {
            overflow: hidden;
        }
    </style>


    <link rel="stylesheet" href="css/competition/weather.css"/>
    <link rel="stylesheet" href="css/competition/weather-icons.css"/>
    <link rel="stylesheet" href="css/competition/social.css">

    <!-- today -->
    <div id="today"></div>

    <div id="test"></div>

    <div class="container-fluid">
        <div id="slides">
            <!-- Social page -->
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

                <!-- News -->
                <div class="col-sm-4 block-resize" id="news">

                </div>

                <!-- Weather -->
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
                                    <a href="javascript:"><span class="temp-type">C</span></a>
                                </p>
                                <span class="temp-small" id="today-max-min"></span>
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="wrapper">
                                <ul class="forecast">
                                    <a href="javascript:"><span class="lnr lnr-chevron-up go-up"></span></a>
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
                <div class="col-sm-4 block-resize" id="birthdays">
                    <h2>Verjaardagen</h2>
                    <hr/>
                    <h3 id="no-birthdays">Niemand is jarig deze week</h3>
                </div>
            </div>

            <!-- Live page -->
            <div id="live-player-container" style="overflow: hidden;">

                <iframe id="live-player" class="youtube-player" type="text/html" frameborder="0"
                        src="<?php echo $url; ?>?vq=hd1080&amp;autoplay=1&amp;autohide=1&amp;controls=0&amp;rel=0&amp;fs=1&amp;wmode=transparent&amp;showinfo=0&amp;modestbranding=0&amp;theme=dark&amp;color=red&amp;enablejsapi=1&amp;html5=1">
                </iframe>
            </div>

            <!-- Shared goals -->
            <div class="container-fluid">
                <div class="container">
                    <h1>Gezamenlijke doelstellingen</h1>
                </div>

                <div id="shared-goal-chart" class="block-error">
                    <span class="glyphicon glyphicon-exclamation-sign"></span><br/>
                    <div id="shared-goal-chart-error">De gezamenlijke doelstellingen kunnen momenteel helaas niet
                        geladen worden.
                    </div>
                </div>
            </div>

            <!-- Other pages will be appended -->
        </div>
    </div>


    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <!-- your scripts -->
    <script src="js/competition/competition-dashboard.js" type="text/javascript"></script>

    <!-- SlidesJS Required: Link to jquery.slides.js -->
    <script src="js/competition/jquery.slides.js" type="text/javascript"></script>

    <!-- your scripts -->
    <script src="js/competition/birthday.js" type="text/javascript"></script>
    <script src="js/competition/social.js" type="text/javascript"></script>
    <script src="js/competition/news-weather.js" type="text/javascript"></script>
    <script src="js/competition/shared-goal.js" type="text/javascript"></script>

    <!-- Auto refresh the page -->
    <script>
        setTimeout(refresh, 300000);
    </script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>