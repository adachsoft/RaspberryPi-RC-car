<?php
    require_once 'init.php';
    
    $urlStream = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . ':8080/stream/video.mjpeg';
    $host = $_SERVER['HTTP_HOST'];

    
    /*$configServer = new Config('configServer');
    $b = $configServer->getForTpl('server.port');
    echo '<pre>';
    var_dump($b);
    $configServer->setForTpl('server.port', 452);
    var_dump($configServer->getAll());
    echo '</pre>';
    die();*/
    
    
    $smarty = new Smarty();
    $smarty->setTemplateDir('tpl/');
    $smarty->assign('TIME', time());
    $smarty->assign('VERSION', $version['appVersion']);
    $smarty->assign('HOST', $host);
    $smarty->assign('CONFIG', $config);
    $smarty->assign('CONFIG_SERVER', new Config('configServer'));
    $smarty->assign('CONFIG_VEHICLEL298N', new Config('VehicleL298n'));
    $smarty->assign('URL_STREAM', $urlStream);
    $smarty->display('index.tpl');
    
