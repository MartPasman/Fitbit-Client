<?php
$title = "Mijn Instellingen";
include './include/header.php';

?>


<!-- today -->
<div id="today"></div>

<div class="container">
    <a data-toggle="tooltip" data-placement="auto" style="width: 400px"
       title="Klik op de verschillende tabbladen om bij de verschillende secties van je instellingen te komen."
    ><span class="glyphicon glyphicon-info-sign" style="color: #DC4F62; font-size: 1.2em;"></span></a>

    <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#personal">
                <div class="glyphicon glyphicon-user"></div>
                &nbsp Persoonlijke informatie</a></li>
        <li><a data-toggle="tab" href="#goals">
                <div class="glyphicon glyphicon-dashboard"></div>
                &nbsp Doelstellingen</a></li>
        <li><a data-toggle="tab" href="#settings">
                <div class="glyphicon glyphicon-lock"></div>
                &nbsp Wachtwoord wijzigen</a></li>

        <div class="large-tooltip">
            <i class="icon ion-help-circled" rel="tooltip" title="Hint"></i>
        </div>
    </ul>
</div>


<div class="row">
    <div class="tab-content">

        <!-- My personal data -->
        <div id="personal" class=" tab-pane fade  in active" style="margin-top:30px;">
            <div class="col-sm-6 col-sm-offset-3 col-xs-12">
                <div class="panel panel-default">

                    <div class="panel-heading"><h2>Mijn gegevens</h2></div>
                    <div class="panel-body">
                        <div class="alert alert-danger" role="alert" id="error">
                            <strong>Oeps!</strong> Er ging iets mis.
                        </div>
                        <div class="alert alert-success" role="alert" id="success">
                            <strong>Gelukt!</strong> Je informatie is nu geupdated.
                        </div>
                        <div id="id-field"></div>
                        <p></p>
                        <form>
                            <div id="name-field">

                            </div>
                            <p></p>
                            <div id="email-field">

                            </div>
                            <p></p>
                            <div id="date-field">

                            </div>
                            <p></p>
                            <div id="age-field">

                            </div>
                            <p></p>
                            <div id="health-field">

                            </div>
                            <p></p>
                            <div id="buttons">

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- My goals data -->
        <div id="goals" class="tab-pane fade" style="margin-top:30px;">
            <div class="col-sm-6 col-sm-offset-3 col-xs-12">
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
        </div>

        <!-- Settings data -->
        <div id="settings" class="tab-pane fade" style="margin-top:30px;">
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

<!-- your scripts -->
<script src="js/change-user-information.js"></script>

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
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });
</script>

<script>
    // get the current date as a string
    $('#today').append(getTodaysDate());
</script>