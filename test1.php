<?php

require 'init.php';

use App\Generators\FileNameGenerator;
use App\InfoSystem;
use App\Snapshot\Raspistill;

/*
echo InfoSystem::getDeviceModel() . PHP_EOL;
echo InfoSystem::getPHPVersion() . PHP_EOL;*/

$fileNameGenerator = new FileNameGenerator();

$snapshot = new Raspistill($fileNameGenerator);
$snapshot->takeSnapshot();