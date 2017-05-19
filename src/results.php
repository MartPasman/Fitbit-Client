<?php
$title = "Mijn resultaten";
include './include/header.php';
?>

    <!-- today -->
    <div id="today">vrijdag 19 mei</div>

    <div class="container">

        <!-- Activity data -->
        <div id="activity-data" class="block col-sm-6">
            <h2>Activiteit</h2>

            <div id="today-steps" class="total">
                <span class="glyphicon glyphicon-tree-conifer" aria-hidden="true"></span> 5488
            </div>

            <div id="chart-steps" class="chart"></div>
        </div>

        <!-- Sleep data -->
        <div id="sleep-data" class="block col-sm-5 col-sm-offset-1">
            <h2>Slaap</h2>

            <div class="total">
                <span class="glyphicon glyphicon-bed" aria-hidden="true"></span> 7 uur
            </div>

            <div id="chart-sleep" class="chart"></div>
        </div>

        <!-- Goals (history) -->
        <div id="goal-history" class="block col-xs-12">
            <h2>Doelstellingen</h2>
        </div>
    </div>

    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <!-- your scripts -->
    <script type="text/javascript">
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