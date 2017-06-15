<?php
$title = "Gezamenlijke doelstellingen";
include './include/header.php';
?>
    <!-- today -->
    <div id="today"></div>

    <div class="container-fluid">
        <div class="container">
            <h1>Gezamenlijke doelstelling</h1>
        </div>

        <div id="shared-goal-chart" class="block-error">
            <span class="glyphicon glyphicon-exclamation-sign"></span><br/>
            <div id="shared-goal-chart-error">De gezamenlijke doelstellingen kunnen momenteel helaas niet geladen worden.</div>
        </div>
    </div>

    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <script type="text/javascript" src="js/shared-goal.js"></script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>