<?php
$title = "Mijn resultaten";
include './include/header.php';

?>

<!-- today -->
<div id="today">
    <button type="button" class="btn btn-default" id="pdf">Exporteer</button>

</div>


<div class="container">

    <!-- Activity data -->
    <div id="activity-data" class="block col-sm-6">
        <h2>Activiteit</h2>

        <div id="total-steps" class="total">
            <span class="glyphicon glyphicon-map-marker"></span> <span class="value"></span>
        </div>

        <div id="chart-steps" class="chart"></div>
    </div>

    <!-- Sleep data -->
    <div id="sleep-data" class="block col-sm-5 col-sm-offset-1">
        <h2>Slaap</h2>

        <div id="chart-sleep" class="chart"></div>
    </div>

    <div id="goal-data" class="block col-xs-12">
        <h2>Doelstellingen</h2>

        <div class="total button" type="button" data-toggle="modal" data-target="#form-modal" id="new-goal">
            Nieuw
        </div>

        <div id="goal-history">
            <div id="goal-history-inside">
            </div>
        </div>
    </div>
</div>

<!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>


<?php include './include/new-goal.php'; ?>

<!-- your scripts -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.debug.js"></script>
<script src="js/my-results.js" type="text/javascript"></script>
<script src="js/pdf.js" type="text/javascript"></script>
<link rel="stylesheet" href="css/button.css">
<!-- Include Date Range Picker -->
<script type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"></script>
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>

<script>
    $(document).ready(function () {
        var date_input = $('input[name="date"]'); //our date input has the name "date"
        var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
        date_input.datepicker({
            format: 'dd/mm/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true
        })
    })
</script>

<!-- end of body -->
<?php include './include/footer.php'; ?>


