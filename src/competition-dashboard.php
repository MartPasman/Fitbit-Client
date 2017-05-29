<?php
$title = "Dashboard";
include './include/header.php';
?>
    <!-- today -->
    <div id="today"></div>

    <div id="container">

        <div id="competition-data" class="block col-lg-11">
<!--            <span class="glyphicon glyphicon-arrow-left" id="arrow-left"></span>-->
            <h4 id="startend">20-04 t/m 27-04</h4>
<!--            <span class="glyphicon glyphicon-arrow-right" id="arrow-right"></span><br>-->

            <h4>Goal to reach:</h4><br>
            <h3 id="goal-to-reach"></h3>

            <div id="chart-competition">FusionCharts will render here</div>
        </div>
    </div>
    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <!-- your scripts -->
    <script src="js/competition-dashboard.js"></script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>