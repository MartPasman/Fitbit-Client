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


<!-- All goals modal -->
<div class="modal fade" id="item-modal" tabindex="-2" role="dialog" aria-labelledby="modalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                            class="sr-only">Sluiten</span></button>
                <h3 class="modal-title" id="lineModalLabel">Alle doelstellingen</h3>
                <!-- content goes here -->
                <div class="alert alert-danger" role="alert" id="error-message-all">
                    <strong>Foutje!</strong>
                </div>
                <div id="all-goals-view">
                    <div class="alert alert-warning" role="alert" id="error-message-all">
                        <strong>Leeg!</strong> Je hebt nog geen doelstellingen, maak er snel één aan.
                    </div>
                </div>
                <button type="button" class="btn btn-success" id="before">
                    <<
                </button>
                <button type="button" class="btn btn-success" id="next">
                    >>
                </button>
            </div>
            <div class="modal-footer">
                <div class="btn-group btn-group-justified" role="group" aria-label="group button">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-default" data-dismiss="modal" role="button">Sluiten
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Change goal modal -->
<div class="modal fade" id="update-modal" tabindex="-3" role="dialog" aria-labelledby="modalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                            class="sr-only">Close</span></button>
                <h3 class="modal-title" id="lineModalLabel">Doelstelling wijzigen</h3>
            </div>
            <div class="modal-body">

                <div class="alert alert-success" role="alert" id="success-message-update">
                    <strong>Opgeslagen!</strong> Veel succes met je nieuwe doelstelling!
                </div>

                <div class="alert alert-danger" role="alert" id="error-message-update">
                    <strong>Foutje!</strong>
                </div>
                <!-- content goes here -->
                <form>
                    <div class="input-group" id="steps-div-update">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-map-marker"></i></span>
                        <input type="text" class="form-control" id="steps-update" placeholder="Aantal stappen">
                    </div>
                    Start datum:
                    <div class="input-group" id="start-div-update">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                        <input class="form-control" id="start-date-update" name="date" placeholder="Start datum" type="text"/>
                    </div>
                    Eind datum:
                    <div class="input-group" id="end-div-update">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                        <input class="form-control" id="end-date-update" name="date" placeholder="Eind datum" type="text"/>
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
                        <button type="button" id="update-button" class="btn btn-default btn-hover-green"
                                data-action="save" role="button">Opslaan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- your scripts -->
<script src="../js/new-goal-settings.js"></script>
<script src="../js/all-goals.js"></script>

