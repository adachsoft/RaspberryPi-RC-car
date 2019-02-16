<?php

require_once './app/Config.php';

$config = new Config($_POST['config_type']);
foreach( $_POST['config'] as $key => $val ){
    if( !$config->setForTpl($key, $val) ){
        echo "No found: $key\r\n";
    }
}
if( !$config->save() ){
    throw new Exception("Problem with writing to a file");
}

if( isset($_POST['url']) ){
    header("Location: {$_POST['url']}");
}
