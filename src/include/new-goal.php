<?php
/**
 * Created by IntelliJ IDEA.
 * User: sveno
 * Date: 29-5-2017
 * Time: 10:20
 */
?>
<!-- New goal modal -->
<div class="modal fade" id="form-modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                        class="sr-only">Close</span></button>
                <h3 class="modal-title" id="lineModalLabel">Nieuwe doelstelling.</h3>
            </div>
            <div class="modal-body">

                <div class="alert alert-success" role="alert" id="success-message">
                    <strong>Aangemaakt!</strong> Veel succes met je nieuwe doelstelling!
                </div>

                <div class="alert alert-danger" role="alert" id="error-message">
                    <strong>Foutje!</strong>
                </div>
                <!-- content goes here -->
                <form>
                    <div class="input-group" id="steps-div">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-map-marker"></i></span>
                        <input type="text" class="form-control" id="steps" placeholder="Aantal stappen">
                    </div>
                    Start datum:
                    <div class="input-group" id="start-div">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                        <input class="form-control" id="start-date" name="date" placeholder="Start datum" type="text"/>
                    </div>
                    Eind datum:
                    <div class="input-group" id="end-div">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                        <input class="form-control" id="end-date" name="date" placeholder="Eind datum" type="text"/>
                    </div>

                </form>

            </div>
            <div class="modal-footer">
                <div class="btn-group btn-group-justified" role="group" aria-label="group button">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-default" data-dismiss="modal" role="button">Sluiten
                        </button>
                    </div>
                    <div class="btn-group" role="group">
                        <button type="button" id="save-button" class="btn btn-default btn-hover-green"
                                data-action="save" role="button">Aanmaken
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

<!-- Include jQuery -->
<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>

<!-- Include Date Range Picker -->
<script type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"></script>
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>



<!-- BS JavaScript -->
<script type="text/javascript" src="js/bootstrap.js"></script>
<!-- your scripts -->
<script src="js/new-goal-settings.js"></script>
<script src="js/all-goals.js"></script>


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

