<?php
$title = "Dashboard";
include './include/header.php';
?>



<!-- today -->
<div id="today"></div>

<div id="container1">

    <div id="competition-data" class="block col-lg-6">

        <div id="total-steps1" class="total">
            <span class="glyphicon glyphicon-map-marker"></span> <span class="value"></span>


        </div>

        <div id="chart-steps1" class="comp-chart"></div>
    </div>
    <div id="competition-data2" class="block col-lg-6">
        <div id="total-steps2" class="total">
            <span class="glyphicon glyphicon-map-marker"></span> <span class="value"></span>
        </div>

        <div id="chart-steps2" class="comp-chart"></div>

    </div>
    <div id="competition-data3" class="block col-lg-6">
        <div id="total-steps3" class="total">
            <span class="glyphicon glyphicon-map-marker"></span> <span class="value"></span>
        </div>
        <div id="chart-steps3" class="comp-chart"></div>

    </div>
    <div id="competition-data4" class="block col-lg-6">
        <div id="total-steps4" class="total">
            <span class="glyphicon glyphicon-map-marker"></span> <span class="value"></span>
        </div>

        <div id="chart-steps4" class="comp-chart"></div>

    </div>
</div>

<!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

<!-- your scripts -->
<script src="js/competition-dashboard-steps.js"></script>

<!-- end of body -->
<?php include './include/footer.php'; ?>
