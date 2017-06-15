<?php
$title = 'Live';
include './include/header.php';


?>
    <!-- today -->
    <div id="today-cover"></div>



    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <script type="text/javascript">
        $('#today-cover').html(getTodaysDate());
    </script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>