<?php

$subject = 'Dit is de titel van het test bericht';
$email = 'Dit is de inhoud van het test bericht';
$to = 'sveno98@live.nl';
$from = 'servicedesk@realhosting.nl';

ini_set('sendmail_from', $from);

$headers   = array();
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/plain; charset=iso-8859-1";
$headers[] = "From: Realhosting Servicedesk <{$from}>";
$headers[] = "Reply-To: Realhosting Servicedesk <{$from}>";
//$headers[] = "Subject: {$subject}";
$headers[] = "X-Mailer: PHP/".phpversion();

mail($to, $subject, $email, implode("\r\n", $headers) );


header("Refresh:3");
?>