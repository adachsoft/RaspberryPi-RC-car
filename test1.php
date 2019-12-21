<?php

require 'init.php';

use App\InfoSystem;




echo InfoSystem::getDeviceModel() . PHP_EOL;
echo InfoSystem::getPHPVersion() . PHP_EOL;