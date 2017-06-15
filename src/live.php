<?php
$title = 'Live';
include './include/header.php';

// Amsterdam Dam
$amsterdam = 'https://www.youtube.com/embed/vpm16w3ik0g';

// Elephants
$elephants = 'https://www.youtube.com/embed/BaS2ofdeHPU';

// Bears
$bears = 'https://www.youtube.com/embed/pHvmGucGm_E';

// More
// https://www.youtube.com/user/exploreTeam

$url = $bears;
?>
    <!-- today -->
    <div id="today-cover"></div>

    <div id="live-player-container" style="overflow: hidden;">

        <iframe id="live-player" class="youtube-player" type="text/html" frameborder="0"
                src="<?php echo $url; ?>?vq=hd1080&amp;autoplay=1&amp;autohide=1&amp;controls=0&amp;rel=0&amp;fs=1&amp;wmode=transparent&amp;showinfo=0&amp;modestbranding=0&amp;theme=dark&amp;color=red&amp;enablejsapi=1&amp;html5=1">

        </iframe>

    </div>

    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <script type="text/javascript">
        $('#today-cover').html(getTodaysDate());
    </script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>