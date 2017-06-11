<!-- export modal -->
<div class="modal fade" id="modal-export" tabindex="-1" role="dialog" aria-labelledby="modal-label-export">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="modal-label-export">Gegevens exporteren</h4>
            </div>
            <div class="modal-body">
                <!-- Radio export last week -->
                <div id="export-last-week" class="btn-export row">
                    <!-- Check icon -->
                    <div class="radio-div glyphicon glyphicon-ok col-xs-1"></div>

                    <!-- Explanation -->
                    <div class="col-xs-11">
                        <h4>Afgelopen week exporteren</h4>
                        De stap- en slaapgegevens, en doelstellingen van de afgelopen week exporteren.

                        <!-- Error message -->
                        <div class="col-xs-12 date-error"></div>
                    </div>
                </div>

                <!-- Radio export certain period -->
                <div id="export-period" class="btn-export row">
                    <!-- Check icon -->
                    <div class="radio-div glyphicon glyphicon-ok col-xs-1"></div>

                    <!-- Explanation -->
                    <div class="col-xs-11">
                        <h4>Een bepaalde periode exporteren</h4>
                        De stap- en slaapgegevens, en doelstellingen van een bepaalde periode exporteren.<br/>
                        <br/>
                        <div class="input-daterange input-group" id="export-datepicker">
                            <input type="text" class="input-sm form-control" name="date" id="export-period-from"
                                   title=""/>
                            <span class="input-group-addon">tot en met</span>
                            <input type="text" class="input-sm form-control" name="date" id="export-period-to"
                                   title=""/>
                        </div>

                        <!-- Error message -->
                        <div class="col-xs-12 date-error"></div>
                    </div>
                </div>

                <!-- Radio export since last time -->
                <div id="export-since-last" class="btn-export row">
                    <!-- Check icon -->
                    <div class="radio-div glyphicon glyphicon-ok col-xs-1"></div>

                    <!-- Explanation -->
                    <div class="col-xs-11">
                        <h4>Exporteren sinds laatste keer</h4>
                        De stap- en slaapgegevens, en doelstellingen exporteren sinds de laatste keer dat gegevens
                        geëxporteerd zijn.<br/>
                        <strong>Laatste keer: <span id="last-export-date">-</span></strong>

                        <!-- Error message -->
                        <div class="col-xs-12 date-error"></div>
                    </div>
                </div>

                <button id="export" type="button" class="btn btn-primary">
                    <span class="glyphicon glyphicon-download-alt"></span>
                </button>
            </div>
        </div>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.debug.js"></script>
<script src="/js/pdf.js" type="text/javascript"></script>
