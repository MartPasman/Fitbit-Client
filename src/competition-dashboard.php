<?php
$title = "Dashboard";
include './include/header.php';
?>


    <!-- today -->
    <div id="today"></div>

    <div id="container">


        <div id="competition-data" class="block col-lg-11">
            <h1>Competitie</h1>

            <span class="glyphicon glyphicon-arrow-left"></span>
            <h4 id="startend">20-04 t/m 27-04</h4>
            <span class="glyphicon glyphicon-arrow-right"></span>

            <div id="chart-competition">FusionCharts will render here</div>


        </div>


    </div>
    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <!-- your scripts -->
    <script src="js/competition-dashboard.js"></script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>