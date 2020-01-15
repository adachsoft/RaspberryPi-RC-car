<?php

$configFileDefault = 'config/pluginsDefault.json';
if(!file_exists($configFileDefault)){
    die('Error file not found');
}

$configFile = 'config/plugins.json';
if(!file_exists($configFile)){
    die('Error file not found');
}

$shouldSaveFile = false;
$plugins = json_decode(file_get_contents($configFile), true);
$pluginsDefault = json_decode(file_get_contents($configFileDefault), true);
foreach($pluginsDefault as $plugin)
{
    if (pluginExists($plugins, $plugin['name'])) {
        echo "[Y] ";
    } else {
        echo "[N] ";
        $plugins[] = $plugin;
        $shouldSaveFile = true;
    }
    echo $plugin['name'] . "\r\n";
}

if ($shouldSaveFile) {
    file_put_contents($configFile, json_encode($plugins));
}

function pluginExists($plugins, $pluginName)
{
    foreach($plugins as $plugin)
    {
        if ( $plugin['name'] === $pluginName ) {
            return true;
        }
    }
    
    return false;
}