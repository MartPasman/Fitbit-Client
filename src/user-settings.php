<?php
$title = "Mijn resultaten";
include './include/header.php';

?>




<!-- today -->
<div id="today"></div>

<div class="container">
    <div class="row">

        <div class="col-sm-5 col-sm-offset-1 col-xs-12">
            <!-- Goal data -->
            <div class="panel panel-default">
                <div class="panel-heading"><h2>Doelstellingen</h2></div>
                <div class="panel-body"> In dit vak staan je instellingen wat betreft je doelstellingen. Je kan een
                    nieuwe
                    doelstelling aanmaken,
                    of een lopende verwijderen.
                    <p></p>
                    <h5><b>Voeg een nieuwe doelstelling toe:</b></h5>
                    <p></p>
                    <button type="button" data-toggle="modal" data-target="#form-modal"
                            class="col-xs-12 btn btn-success"
                            id="new-goal">
                        Nieuwe doelstelling
                    </button>
                    <p></p>
                    <h5><b>Alle doelstellingen:</b></h5>
                    <p></p>
                    <button type="button" data-toggle="modal" data-target="#item-modal"
                            class="col-xs-12 btn btn-success"
                            id="all-goals">
                        Doelstellingen
                    </button>
                </div>
            </div>
        </div>


        <!-- My personal data -->
        <div class="col-sm-5 col-xs-12">
            <div class="panel panel-default">
                <div class="panel-heading"><h2>Mijn gegevens</h2></div>
                <div class="panel-body">
                    <div><div class="glyphicon glyphicon-user"></div>&nbsp Henk Jan Peters</div>
                    <p></p>
                    <div><div class="glyphicon glyphicon-calendar"></div>&nbsp 28 Mei 1935</div>
                    <p></p>
                    <div><div class="glyphicon glyphicon-gift"></div>&nbsp 81 Jaar</div>
                    <p></p>
                    <div><div class="glyphicon glyphicon-heart"></div>&nbsp Goed ter been</div>
                    <p></p>
                </div>
            </div>
        </div>

        <!-- Settings data -->
        <div class="col-sm-6 col-sm-offset-3 col-xs-12">
            <div class="panel panel-default">
                <div class="panel-heading"><h2>Wachtwoord</h2></div>
                <div class="panel-body">
                    <?php
                    include './include/change-password.php';
                    ?>
                </div>
            </div>
        </div>


    </div>
</div>


<!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

<!-- end of body -->
<?php include './include/footer.php'; ?>

<!-- Include Date Range Picker -->
<script type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"></script>
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>

<?php include './include/new-goal.php'; ?>

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

<script>
    // get the current date as a string
    $('#today').append(getTodaysDate());
</script>