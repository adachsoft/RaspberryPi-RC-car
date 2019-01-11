<?php

require_once './app/Config.php';

$config = new Config('./config/config.json');
$config->set('maxEnginePower', $_POST['maxEnginePower']);
$config->set('maxTurnStrength', $_POST['maxTurnStrength']);
$config->save();

/*
$data = json_encode([
    'maxEnginePower' => $_POST['maxEnginePower'],
    'maxTurnStrength' => $_POST['maxTurnStrength'],
]);
if( file_put_contents('./config/config.json', $data)===false ){
    echo "ERROR";
}else{
    echo "OK";
}
*/
//echo $data;
