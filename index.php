<?php

use App\Plugins\Plugins;

require_once 'init.php';

$urlStream = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . ':8080/stream/video.mjpeg';
$host = $_SERVER['HTTP_HOST'];

$plugins = new Plugins();

$smarty = new Smarty();
$smarty->setTemplateDir('tpl/');
$smarty->assign('TIME', time());
$smarty->assign('VERSION', $version['appVersion']);
$smarty->assign('HOST', $host);
$smarty->assign('CONFIG', $config);
$smarty->assign('PLUGINS_JS_FILES', $plugins->getJsFiles());
$smarty->assign('PLUGINS', $plugins->getPlugins());
$smarty->assign('CONFIG_SERVER', new Config('configServer'));
$smarty->assign('CONFIG_VEHICLEL298N', new Config('VehicleL298n'));
$smarty->assign('CONFIG_VEHICLEL_SERVO_PWM', new Config('VehicleServoPWM'));
$smarty->assign('URL_STREAM', $urlStream);
$smarty->display('index.tpl');
    