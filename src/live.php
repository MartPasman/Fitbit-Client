<?php
$title = "Mijn resultaten";
include './include/header.php';
?>
    <!-- today -->
    <div id="today-cover"></div>

    <iframe id="live-player" class="youtube_player" type="text/html" frameborder="0"
            src="https://www.youtube.com/embed/BaS2ofdeHPU?vq=hd720&amp;autoplay=1&amp;autohide=1&amp;controls=0&amp;rel=0&amp;fs=1&amp;wmode=transparent&amp;showinfo=0&amp;modestbranding=0&amp;theme=dark&amp;color=red&amp;enablejsapi=1&amp;html5=1"
            allowfullscreen=""
            style="width: calc(100vw); height: calc(100vh - 50px);">

    </iframe>

    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <script type="text/javascript">
        $('#today-cover').html(getTodaysDate());
    </script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>