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

    public function getTabs()
    {
        $tabs = [];
        foreach($this->getMetadata() as $plugin => $metadata){
            if (isset($metadata['tabs'])){
                foreach($metadata['tabs'] as $tab){
                    $tab['file'] = static::PATH_TO_PLUGINS . "{$plugin}/" . static::PATH_TO_TPL . $tab['file'] . static::TPL_EXT;
                    $tabs[] = $tab;
                }
            }
        }

        return $tabs;
    }

    public function getMetadata()
    {
        $allMetadata = [];
        $files = $this->getFilesIfExists('metadata');
        foreach($files as $plugin => $file){
            $allMetadata[$plugin] = json_decode(file_get_contents($file), true);
        }

        return $allMetadata;
    }

    private function getFilesIfExists($type)
    {
        $plugins = array_keys($this->configData['plugins']);
        $files = [];
        foreach($plugins as $plugin){
            $file = $this->getFilePath($plugin, $type);
            if( file_exists($file) ){
                $files[$plugin] = $file;
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
            case 'metadata':
                return static::PATH_TO_PLUGINS . "{$plugin}/plugin.json";
        }
    }
}
