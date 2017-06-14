<?php
$title = "Mijn resultaten";
include './include/header.php';
?>
    <link rel="stylesheet" href="./css/weather.css"/>
    <link rel="stylesheet" href="css/social.css">

    <!-- today -->
    <div id="today-cover"></div>

    <iframe id="live-player" class="youtube_player" type="text/html" frameborder="0"
            src="https://www.youtube.com/embed/BaS2ofdeHPU?vq=hd720&amp;autoplay=1&amp;autohide=1&amp;controls=0&amp;rel=0&amp;fs=1&amp;wmode=transparent&amp;showinfo=0&amp;modestbranding=0&amp;theme=dark&amp;color=red&amp;enablejsapi=1&amp;html5=1"
            allowfullscreen=""
            style="width: calc(100vw); height: calc(100vh - 50px);">

    </iframe>

    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <script>
        $('#today-cover').html(getTodaysDate());

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