<?php
$title = "Mijn resultaten";
include './include/header.php';
?>

    <div class="container">

        <!-- Activity data -->
        <div id="activity-data" class="block col-sm-6">
            <h2>Activiteit</h2>

            <div class="total">
                <span class="glyphicon glyphicon-tree-conifer" aria-hidden="true"></span> 5488
            </div>

            <div id="chartdiv" style="height:200px;width:300px; "></div>
        </div>

        <!-- Sleep data -->
        <div id="sleep-data" class="block col-sm-5 col-sm-offset-1">
            <h2>Slaap</h2>


            <div class="total">
                <span class="glyphicon glyphicon-bed" aria-hidden="true"></span> 7 uur
            </div>
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
    $.jqplot('chartdiv',  [[[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9],[11,219.9]]]);
</script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>