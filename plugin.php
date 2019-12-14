<?php

use App\Plugins\PluginsFactory;

require_once 'init.php';

$plugin = $_POST['plugin'];
$enable = filter_var($_POST['enable'], FILTER_VALIDATE_BOOLEAN);

$plugins = PluginsFactory::create();

$plugins->set($plugin, $enable);
$plugins->save();

