<!-- jQuery charts plugin -->
<script type="text/javascript" src="../js/charts/fusioncharts-suite-xt/js/fusioncharts.js"></script>
<script type="text/javascript" src="../js/charts/src/fusioncharts-jquery-plugin.js"></script>
<script type="text/javascript" src="../js/charts/fusioncharts-suite-xt/js/themes/fusioncharts.theme.goals.js"></script>

<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="../js/bootstrap.min.js"></script>

<!-- REST service address -->
<script type="text/javascript">
//    const REST = 'http://178.21.116.109:3000';
  const REST = 'http://localhost:3000';
</script>

<!-- Flickering led if the REST is online -->
<script src="../js/rest-led.js"></script>

<!-- Line and pie charts -->
<script src="../js/charts.js"></script>

<!-- Date utilities -->
<script src="../js/dates.js"></script>

<script type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"></script>
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>

<script>
    const iso = $('.bootstrap-iso form');
    $(document).ready(function () {
        var date_input = $('input[name="date"]'); //our date input has the name "date"
        var container = iso.length > 0 ? iso.parent() : "body";
        date_input.datepicker({
            format: 'dd/mm/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true,
            language: "nl"
        })
    })
</script>