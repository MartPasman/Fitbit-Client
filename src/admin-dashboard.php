<?php
$title = "Dashboard";
include './include/header.php';
?>

    <!-- error modal -->
    <div id="modal-account-error" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Er is iets mis gegaan, probeer het later nog eens!</h4>
                </div>
                <div class="modal-body">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Sluit</button>
                </div>
            </div>
        </div>
    </div>

    <div class="container">


    <div style="margin-top:30px">
        <div class="col-md-5 ">
            <div class="panel panel-default">
                <div class="panel-heading"><h3 class="panel-title"><strong>Deelnemers</strong></h3>
                </div>

                <div class="panel-body" id="userlist">

                </div>

            </div>
        </div>

        <div class="col-md-5 col-md-offset-2 ">
            <div class="panel panel-default">
                <div class="panel-heading"><h3 class="panel-title"><strong>Competitie</strong></h3>
                </div>

                <div class="panel-body" id="competitionlist">
                    <form role="form">
                    </form>
                </div>
            </div>
        </div>

    </div>

    <div class="modal fade" id="edit-modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
         aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                                class="sr-only">Sluit</span></button>
                    <h3 class="modal-title" id="lineModalLabel">Pas account aan</h3>
                </div>
                <div class="modal-body">

                    <div class="alert alert-success" role="alert" id="success-message">
                        <strong>Het account is aangepast</strong>
                    </div>

                    <div class="alert alert-danger" role="alert" id="error-message">
                        <strong>Er is iets foutgegaan</strong>
                    </div>
                    <!-- content goes here -->
                    <form>
                        <div class="input-group" id="handicap-div">
                            <label class="col-md-3 control-label" for="handicap">Handicap</label>
                            <div class="col-md-9">
                                <div class="input-group">
                                    <div class="dropdown">
                                        <button id="handicapbtn" class="btn btn-default dropdown-toggle"
                                                type="button" data-toggle="dropdown">
                                            Handicap <span class="caret"></span>
                                        </button>
                                        <a data-toggle="tooltip" data-placement="auto" style="width: 400px"
                                           title="De handicap houdt rekening met de vitaliteit van een deelnemer.
                                               Hoe minder goed ter been een persoon is, hoe meer aantal punten hij krijgt
                                               bij een aantal stappen."
                                        ><span class="glyphicon glyphicon-info-sign"
                                               style="color: #DC4F62; font-size: 1.2em;"></span></a>
                                        <div class="large-tooltip"><i class="icon ion-help-circled" rel="tooltip"
                                                                      title="Hint"></i>
                                        </div>
                                        <ul class="dropdown-menu" id="handicap">
                                            <li><a href="#">Goed ter been</a></li>
                                            <li><a href="#">Minder goed ter been</a></li>
                                            <li><a href="#">Slecht ter been</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
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
                                    data-action="save" role="button">Account opslaan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>


    <!-- JQuery and Bootstrap scripts -->
    <?php include './include/scripts.php'; ?>

    <!-- your scripts -->
    <script src="js/admin-dashboard.js"></script>
    <link rel="stylesheet" href="css/admin.css"
    <!-- end of body -->
<?php include './include/footer.php'; ?>