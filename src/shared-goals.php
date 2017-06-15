<?php
$title = "Mijn resultaten";
include './include/header.php';
?>
    <!-- today -->
    <div id="today"></div>

    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <script type="text/javascript">
        const data = [
            {
                label: '30/05 - 05/06',
                value: 40000
            },
            {
                label: '06/06 - 12/06',
                value: 45000
            },
            {
                label: '13/05 - 19/06',
                value: 47000
            },
            {
                label: '20/05 - 26/06',
                value: 45000
            }
        ];

        const etras = {};

        //        drawLineChart('#shared-goal-chart', data, 'Doel', 'Gezamenlijke score', '', 600, 500, extras);
    </script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>