<?php

require_once './app/Config.php';

$config = new Config('./config/config.json');
$config->set('maxEnginePower', $_POST['maxEnginePower']);
$config->set('maxTurnStrength', $_POST['maxTurnStrength']);
$config->save();

