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

            <div id="today-steps" class="total">
                <span class="glyphicon glyphicon-tree-conifer"></span> 5488
            </div>

            <div id="chart-steps" class="chart"></div>
        </div>

        <!-- Sleep data -->
        <div id="sleep-data" class="block col-sm-5 col-sm-offset-1">
            <h2>Slaap</h2>

            <div class="total">
                <span class="glyphicon glyphicon-bed"></span> 7 uur
            </div>

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
    <script type="text/javascript">
        $('#today').text(getTodaysDate());

        const act = $('#activity-data');
        const slp = $('#sleep-data');

        const drawStepsChart = function () {
            drawLineChart('#chart-steps', [
                {label: '17/05', value: 4788}, {label: '18/05', value: 5901}, {label: '19/05', value: 3870},
                {label: '20/05', value: 3822}, {label: '21/05', value: 5520}, {label: '22/05', value: 6302}
            ], 'datum', 'stappen', '', act.width(), 200);
        };

        const drawSleepChart = function () {
            drawColumnChart('#chart-sleep', [
                {label: '17/05', value: 6}, {label: '18/05', value: 8}, {label: '19/05', value: 9},
                {label: '20/05', value: 8}, {label: '21/05', value: 7}, {label: '22/05', value: 6}
            ], 'datum', 'uren', false, '', slp.width(), 200);
        };

        $(document).ready(function () {
            drawStepsChart();
            drawSleepChart();
        });

        $(window).on('resize', function () {
            drawStepsChart();
            drawSleepChart();
        });
    </script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>