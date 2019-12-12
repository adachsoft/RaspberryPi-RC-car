<?php

$configFile = 'config/configServer.json';

if(!file_exists($configFile)){
    die('Error file not found');
}

$pluginName = $_GET['plugin'];

$config = json_decode(file_get_contents($configFile), true);
$config['plugins'][$pluginName] = [
    'enable' => true,
    'name' => $pluginName,
];

file_put_contents($configFile, json_encode($config));