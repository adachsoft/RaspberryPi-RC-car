<?php
    error_reporting(E_ALL);
    ini_set("display_errors", 1);
    define('__DIR_ROOT__', './');

    $version = include './version.php';
    require_once './app/Config.php';
    require __DIR_ROOT__ . 'vendor/autoload.php';
    
    $config = new Config('./config/config.json');
    
    $urlStream = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . ':8080/stream/video.mjpeg';
    $host = $_SERVER['HTTP_HOST'];

    
    $smarty = new Smarty();
    $smarty->setTemplateDir('tpl/');
    $smarty->assign('TIME', time());
    $smarty->assign('VERSION', $version['appVersion']);
    $smarty->assign('HOST', $host);
    $smarty->assign('CONFIG', $config);
    $smarty->assign('URL_STREAM', $urlStream);
    $smarty->display('index.tpl');
    