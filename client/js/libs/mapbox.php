<?php
$ch = curl_init();
$timeout = 5;
curl_setopt($ch, CURLOPT_URL, "https://api.tiles.mapbox.com/mapbox.js/v0.6.7/mapbox.js");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$data = curl_exec($ch);
curl_close($ch);

Header("content-type: application/x-javascript");
$data = preg_replace('/http:\/\//', 'https://', $data);
echo $data;
?>