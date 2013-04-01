<?php

// Log logs from an ajax call
$alias = str_replace('/', '_', $_GET['alias']);
$log_file = "log-".$alias;
$size = @filesize($log_file);
// Clear file if bigger than 5MB
if($size > 5242880){
    $fh = fopen($log_file, 'w') or die("can't open file");
    fclose($fh);
}
$fh = fopen($log_file, 'a') or die("can't open file");

// Add the log line to file
$data = $_POST['data'] . "\n";

// Write and close
fwrite($fh, $data);
fclose($fh);