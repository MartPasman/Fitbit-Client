<?php
$title = "Dashboard";
include './include/header.php';
?>
    <link href="../css/scroll.css" rel="stylesheet" type="text/css">
    <!-- today -->
    <div id="today"></div>

    <div class="container">
        <div id="slides">

        </div>
    </div>

    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <!-- your scripts -->
    <script src="js/competition-dashboard.js"></script>

    <!-- SlidesJS Required: Link to jquery.slides.js -->
    <script src="../js/jquery.slides.js"></script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>