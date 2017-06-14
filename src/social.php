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

        <!-- Activity data -->
        <div id="activity-data" class="col-sm-4">
            <div class="block">
                <h2>Verjaardagen</h2>
            </div>
        </div>
    </div>

    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <!-- your scripts -->
    <script src="js/social.js" type="text/javascript"></script>


    <!-- end of body -->
<?php include './include/footer.php'; ?>