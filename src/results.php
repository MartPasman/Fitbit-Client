<?php
$title = "Mijn resultaten";
include './include/header.php';
?>

    <!-- today -->
    <div id="today"></div>

    <div class="container">

        <!-- Activity data -->
        <div id="activity-data" class="block col-sm-6">
            <h2>Activiteit</h2>

            <div id="total-steps" class="total">
                <span class="glyphicon glyphicon-map-marker"></span> <span class="value"></span>
            </div>

            <div id="chart-steps" class="chart"></div>
        </div>

        <!-- Sleep data -->
        <div id="sleep-data" class="block col-sm-5 col-sm-offset-1">
            <h2>Slaap</h2>

<!--            <div class="total">-->
<!--                <span class="glyphicon glyphicon-bed"></span> 7 uur-->
<!--            </div>-->

            <div id="chart-sleep" class="chart"></div>
        </div>

        <!-- Goals (history) -->
        <div id="goal-data" class="block col-xs-12">
            <h2>Doelstellingen</h2>

            <div class="total button">
                Nieuw
            </div>

            <div id="goal-history">
                <div id="goal-history-inside">
                    <div class="goal achieved">
                        <h2>2000</h2>
                        17/05 - 18/05<br/>
                        <span class="goal-icon glyphicon glyphicon-ok"></span>
                    </div>
                    <div class="goal achieved">
                        <h2>4000</h2>
                        19/05 - 20/05<br/>
                        <span class="goal-icon glyphicon glyphicon-ok"></span>
                    </div>
                    <div class="goal">
                        <h2><span class="not-achieved">3677 / </span>5000</h2>
                        21/05 - 27/05<br/>
                        <span class="goal-icon glyphicon glyphicon-remove"></span>

                    </div>
                    <div class="goal">
                        <h2><span class="not-achieved">4825 / </span>5000</h2>
                        28/05 - 30/05<br/>
                        <span class="goal-icon glyphicon glyphicon-option-horizontal"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <!-- your scripts -->
    <script src="js/my-results.js" type="text/javascript"></script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>