<?php

date_default_timezone_set('Etc/UTC');

$now = time();
$i = 0;

$tz[] = ['name' => 'UTC-10', 'lat' => 0, 'lng' => '-142.5'];
$tz[] = ['name' => 'UTC-9', 'lat' => 0, 'lng' => '-127.5'];
$tz[] = ['name' => 'UTC-8', 'lat' => 0, 'lng' => '-112.5'];
$tz[] = ['name' => 'UTC-7', 'lat' => 0, 'lng' => '-97.5'];
$tz[] = ['name' => 'UTC-6', 'lat' => 0, 'lng' => '-82.5'];
$tz[] = ['name' => 'UTC-5', 'lat' => 0, 'lng' => '-67.5'];
$tz[] = ['name' => 'UTC-4', 'lat' => 0, 'lng' => '-52.5'];
$tz[] = ['name' => 'UTC-3', 'lat' => 0, 'lng' => '-37.5'];
$tz[] = ['name' => 'UTC-2', 'lat' => 0, 'lng' => '-22.5'];
$tz[] = ['name' => 'UTC-1', 'lat' => 0, 'lng' => '-7.5'];
$tz[] = ['name' => 'UTC', 'lat' => 0, 'lng' => '7.5'];
$tz[] = ['name' => 'UTC+1', 'lat' => 0, 'lng' => '22.5'];
$tz[] = ['name' => 'UTC+2', 'lat' => 0, 'lng' => '37.5'];
$tz[] = ['name' => 'UTC+3', 'lat' => 0, 'lng' => '52.5'];
$tz[] = ['name' => 'UTC+4', 'lat' => 0, 'lng' => '67.5'];
$tz[] = ['name' => 'UTC+5', 'lat' => 0, 'lng' => '82.5'];
$tz[] = ['name' => 'UTC+6', 'lat' => 0, 'lng' => '97.5'];
$tz[] = ['name' => 'UTC+7', 'lat' => 0, 'lng' => '112.5'];
$tz[] = ['name' => 'UTC+8', 'lat' => 0, 'lng' => '127.5'];
$tz[] = ['name' => 'UTC+9', 'lat' => 0, 'lng' => '142.5'];
$tz[] = ['name' => 'UTC+10', 'lat' => 0, 'lng' => '157.5'];
$tz[] = ['name' => 'UTC+11', 'lat' => 0, 'lng' => '172.5'];
$tz[] = ['name' => 'UTC+12', 'lat' => 0, 'lng' => '180'];
$tz[] = ['name' => 'UTC-11', 'lat' => 0, 'lng' => '-178.9'];

foreach($tz as &$timezone)
{
    $time = file_get_contents('https://vip.timezonedb.com/v2.1/get-time-zone?key=SQ90W55WY9V6&format=json&by=position&lat='.$timezone['lat'].'&lng='.$timezone['lng']);
    $time = json_decode($time);

    $sun = date_sun_info($time->timestamp, $timezone['lat'], $timezone['lng']);
    $sunrise = gmdate('U', $sun['sunrise']);

    $timezone['local_time'] = $time->formatted;
    $timezone['sunrise_ago'] = $now - $sunrise;
    $timezone['sunrise_friendly'] = gmdate('H:m:s\Z', $sun['sunrise']);
    $timezone['location'] = $time;

    $sort[$i++] = $timezone['sunrise_ago'];
}

$currentkey = 0;
$currentvalue = 999999;
foreach($sort as $k => $v)
{
    if($v < 0){ continue; }
    if($v < $currentvalue)
    {
        $currentkey = $k;
        $currentvalue = $v;
    }
}

$newsort = array_merge(
    range($currentkey, count($sort)),
    range(0, $currentkey-1)
);

$tz = orderArray($tz, $newsort);
$tz = array_values($tz);

echo '<pre>';
print_r($tz);
echo '</pre>';

function orderArray($arrayToOrder, $keys) {
    $ordered = [];
    foreach ($keys as $key) {
        if (isset($arrayToOrder[$key])) {
             $ordered[$key] = $arrayToOrder[$key];
        }
    }
    return $ordered;
}