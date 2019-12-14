<?php

namespace App\Plugins;

use App\DataPersister\FileManager;

/**
* Class 
*/
class PluginsFactory
{
    const PATH_CONFIG_FILE = 'config/plugins.json';

    public static function create()
    {
        return new Plugins(
            new FileManager(static::PATH_CONFIG_FILE)
        );
    }
}