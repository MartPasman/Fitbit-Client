<?php
/**
 * Created by IntelliJ IDEA.
 * User: jeroen
 * Date: 21-05-17
 * Time: 10:03
 */

// Get Variables
$error = $_SERVER['REDIRECT_STATUS'];
$requested_url = $_SERVER['REQUEST_URI'];
$referring_ip = $_SERVER['REMOTE_ADDR'];
$server_name = $_SERVER['SERVER_NAME'];

$title = $error;
include './include/header.php';
?>

    <!-- today -->
    <div id="today"><?php echo $error; ?></div>

    <div class="container">
        <div class="page-error">
            <span class='glyphicon glyphicon-exclamation-sign'></span><br/>
            <?php
            switch ($error) {
                case 400:
                    echo "Oeps!<br/>De link naar de pagina is stuk.<br/>Probeer de pagina opnieuw te bereiken vanaf de vorige pagina.";
                    break;
                case 401:
                    echo "U bent niet ingelogd.<br/>Log in en probeer dan de pagina opnieuw te laden.";
                    break;
                case 403:
                    echo "Verboden toegang.<br/>U heeft niet de rechten om deze pagina te bekijken.";
                    break;
                case 404:
                    echo "<span class='url'>" . $requested_url . "</span><br/>De pagina die u probeert te bereiken, bestaat niet.";
                    break;
                case 500:
                    echo "Oeps!<br/>Er ging iets mis aan onze kant.<br/>Probeer de pagina opnieuw te bereiken vanaf de vorige pagina.";
                    break;
                default:
                    echo "Oeps!<br/>Er ging iets mis.<br/> Ga terug naar de vorige pagina.";
                    break;
            }
            ?>
        </div>
    </div>

    <!-- JQuery and Bootstrap scripts -->
<?php include './include/scripts.php'; ?>

    <!-- end of body -->
<?php include './include/footer.php'; ?>