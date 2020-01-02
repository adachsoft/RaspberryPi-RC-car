<?php

namespace App\Plugins;

use App\DataPersister\DataPersisterInterface;

/**
* Class 
*/
class Plugins
{
    const PATH_TO_JS = 'js/';
    const PATH_TO_CSS = 'css/';
    const PATH_TO_PLUGINS = 'plugins/';
    const TPL_EXT = '.tpl';
    const PATH_TO_TPL = 'tpl/';

    private static $pluginInstances = [];

    /**
     * @var DataPersisterInterface
     */
    private $dataPersister;
    

    public function __construct($dataPersister)
    {
        $this->dataPersister = $dataPersister;
        $dataPersister->read();
    }

    public function getAllPlugins()
    {
        return $this->dataPersister->get();
    }

    public function set($plugin, $enable)
    {
        $idx = $this->getIndexPluginByName($plugin);

        $plugins = $this->dataPersister->get();
        $plugins[$idx] = ['name'=>$plugin, 'enable'=>$enable];
        $this->dataPersister->set($plugins);
    }

    public function save()
    {
        $this->dataPersister->save();
    }

    public function getPlugins()
    {
        $availablePlugins = [];
        foreach($this->dataPersister->get() as $plugin){
            if ($plugin['enable']) {
                $availablePlugins[] = $plugin['name'];
            }
        }

        return $availablePlugins;
    }

    public function createInstance()
    {
        $objects = [];
        $files = $this->getFilesIfExists('php_main_class');
        foreach($files as $className => $file){
            require_once $file;
            $obj = new $className();
            if($obj instanceof PluginInterface){
                $objects[$className] = $obj;
            }
        }
        static::$pluginInstances = $objects;

        return $objects;
    }

    public function beforeRenderIndex($dataForTpl)
    {
        $data = $dataForTpl;
        foreach(static::$pluginInstances as $plugin){
            /**
             * @var PluginInterface $plugin
             */
            $data = $plugin->beforeRenderIndex($data);
        }

        return $data;
    }

    public function getJsFiles()
    {
        return $this->getFilesIfExists('js');
    }

    public function getCssFiles()
    {
        return $this->getFilesIfExists('css');
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
        $plugins = $this->getPlugins();
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
            case 'css':
                return static::PATH_TO_PLUGINS . "{$plugin}/" . static::PATH_TO_CSS . "{$plugin}.css";
            case 'metadata':
                return static::PATH_TO_PLUGINS . "{$plugin}/plugin.json";
            case 'php_main_class':
                return static::PATH_TO_PLUGINS . "{$plugin}/$plugin.php";
        }
    }

    private function getIndexPluginByName($pluginName)
    {
        foreach($this->dataPersister->get() as $key => $plugin){
            if($pluginName===$plugin['name']){
                return $key;
            }
        }

        return false;
    }
}
