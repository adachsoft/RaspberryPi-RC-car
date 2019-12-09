<?php

$configFile = 'config/configServer.json';

if(!file_exists($configFile)){
    die('Error file not found');
}

$config = json_decode(file_get_contents($configFile), true);

/*$config['plugins']['Horn'] = [
    'enable' => true,
    'name' => 'Horn',
];*/
/*
$config['plugins']['DS1820'] = [
    'enable' => true,
    'name' => 'DS1820',
];*/

$config['plugins']['WiFi'] = [
    'enable' => true,
    'name' => 'WiFi',
];

file_put_contents($configFile, json_encode($config));