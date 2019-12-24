<?php

use App\Plugins\PluginsFactory;

require_once 'init.php';

$urlToSelf = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'];
$urlStream = $urlToSelf . ':8080/stream/video.mjpeg';
$host = $_SERVER['HTTP_HOST'];

$plugins = PluginsFactory::create();
$plugins->createInstance();

$dataForTpl = [
    'TIME' => time(),
    'VERSION' => $version['appVersion'],
    'HOST' => $host,
    'URL_STREAM' => $urlStream,
    'CONFIG' => $config,
    'PLUGINS_JS_FILES' => $plugins->getJsFiles(),
    'PLUGINS_NAME' => $plugins->getPlugins(),
    'PLUGINS' => $plugins,
    'CONFIG_SERVER' => new Config('configServer'),
    'CONFIG_VEHICLEL298N' => new Config('VehicleL298n'),
    'CONFIG_VEHICLEL_SERVO_PWM' => new Config('VehicleServoPWM'),
];

$dataForTpl = $plugins->beforeRenderIndex($dataForTpl);

$smarty = new Smarty();
$smarty->setTemplateDir('tpl/');
foreach($dataForTpl as $key => $value){
    $smarty->assign($key, $value);
}
$smarty->display('index.tpl');
