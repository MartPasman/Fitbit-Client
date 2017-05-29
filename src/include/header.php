<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo $title ?></title>

    <!-- double declarations for local testing -->
    <link href="/css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="/css/custom.css" rel="stylesheet" type="text/css">
    <link href="../css/custom.css" rel="stylesheet" type="text/css">
</head>
<body>

<nav class="navbar navbar-default">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#important-id-for-collapsing" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#"><img class="icon" src="../img/go.png"/> </a>
        </div>
        <div class="collapse navbar-collapse" id="important-id-for-collapsing">
            <ul class="nav navbar-nav">
                <li>
                    <a href="/results.php">
                        <span class="glyphicon glyphicon-dashboard"></span> Resultaten en doelstellingen
                    </a>
                </li>
                <li>
                    <a href="/user-settings.php">
                        <span class="glyphicon glyphicon-user"></span> Mijn profiel
                    </a>
                </li>
                <li>
                    <a href="/index.php" id="log-out">
                        <span class="glyphicon glyphicon-log-out" ></span> Verlaten
                    </a>
                </li>
            </ul>
        </div>

        <span class="led-bad"></span>
    </div>
</nav>

<!-- Include jQuery -->
<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>

<script src="../js/logout.js" type="text/javascript"></script>
