<?php

namespace App\Plugins;

/**
* Class 
*/
class Plugins
{
    const CONFIG_FILE = 'config/configServer.json';
    const PATH_TO_JS = 'js/';
    const PATH_TO_PLUGINS = 'plugins/';

    private $configData = [];

    public function __construct()
    {
        $this->configData = json_decode(file_get_contents(static::CONFIG_FILE), true);
    }

    public function getJsFiles()
    {
        $plugins = array_keys($this->configData['plugins']);
        $jsFiles = [];
        foreach($plugins as $plugin){
            $jsFile = static::PATH_TO_PLUGINS . "{$plugin}/" . static::PATH_TO_JS . "{$plugin}.js";
            if( file_exists($jsFile) ){
                $jsFiles[] = $jsFile;
            }
        }

        return $jsFiles;
    }

    public function getPlugins()
    {
        return array_keys($this->configData['plugins']);
    }
}