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
    const TPL_EXT = '.tpl';
    const PATH_TO_TPL = 'tpl/';

    private $configData = [];

    public function __construct()
    {
        $this->configData = json_decode(file_get_contents(static::CONFIG_FILE), true);
    }

    public function getPlugins()
    {
        return array_keys($this->configData['plugins']);
    }

    public function getJsFiles()
    {
        return $this->getFilesIfExists('js');
    }

    public function getTplFilesIndex()
    {
        return $this->getFilesIfExists('tpl_index');
    }

    public function getTplFilesTab()
    {
        return $this->getFilesIfExists('tpl_tab');
    }

    private function getFilesIfExists($type)
    {
        $plugins = array_keys($this->configData['plugins']);
        $files = [];
        foreach($plugins as $plugin){
            $file = $this->getFilePath($plugin, $type);
            if( file_exists($file) ){
                $files[] = $file;
            }
        }

        return $files;
    }

    private function getFilePath($plugin, $type)
    {
        switch($type)
        {
            case 'tpl_index':
                return static::PATH_TO_PLUGINS . "{$plugin}/" . static::PATH_TO_TPL . "index" . static::TPL_EXT;
            case 'tpl_tab':
                return static::PATH_TO_PLUGINS . "{$plugin}/" . static::PATH_TO_TPL . "tab" . static::TPL_EXT;
            case 'js':
                return static::PATH_TO_PLUGINS . "{$plugin}/" . static::PATH_TO_JS . "{$plugin}.js";
        }
    }
}
