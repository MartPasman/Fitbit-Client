<?php
$title = "Mijn resultaten";
include './include/header.php';
?>

    <!-- today -->
    <div id="today"></div>

    <div class="container-fluid">

        <!-- Activity data -->
        <div id="activity-data" class="col-sm-4">
            <div class="block">
                <h2>Nieuws</h2>
            </div>
        </div>

        <!-- Activity data -->
        <div id="activity-data" class="col-sm-4">
            <div class="block">
                <h2>Weer</h2>
            </div>
        </div>

        <!-- Activity data -->
        <div id="activity-data" class="col-sm-4">
            <div class="block">
                <h2>Verjaardagen</h2>
            </div>
        </div>
    </div>

    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <!-- your scripts -->
<script>
    $.ajax({
        url: 'http://xml.rtvoost.nl/rss/tag.aspx?tag=Enschede',
        method: 'GET',
        dataType: 'XML',
        headers: {
        }
    }).success(function (a, b, c, d) {
        console.log(a, b, c, d);
    }).fail(function (a, b, c, d) {
        console.log(a, b, c, d);
    });
</script>

    <!-- end of body -->
<?php include './include/footer.php'; ?>