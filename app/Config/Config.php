<?php

namespace App\Config;

/**
* Class 
*/
class Config
{
    /**
     * @var FileManager
     */
    private $fileManager;

    private $data = [];

    private $definition;

    public function __construct(FileManager $fileManager, FileManager $fileManagerForDefinition)
    {
        $this->fileManager = $fileManager;
        $this->fileManager->load();

        $jsonStr = $this->fileManager->get();
        $this->data = json_decode($jsonStr, true);

        $fileManagerForDefinition->load();
        $this->definition = json_decode($fileManagerForDefinition->get(), true);
    }

    public function get(string $key)
    {
        return $this->data[$key];
    }

    public function getType(string $key): string
    {
        if (!isset($this->definition[$key]['type'])) {
            return 'string';
        }

        return $this->definition[$key]['type'];
    }

    public function getForTpl($key, $def=null)
    {
        $b = true;
        $arr = explode('.', $key);
        $val = $this->data;
        foreach ($arr as $k){
            if( isset($val[$k]) ){
                $val = $val[$k];
            }else{
                $b = false;
                break;
            }
        }
        return $b ? $val : $def;
    }
    
    public function setForTpl($key, $val)
    {
        $b = true;
        $arr = explode('.', $key);
        $currentVal = &$this->data;
        foreach ($arr as $k){
            if( isset($currentVal[$k]) ){
                $currentVal = &$currentVal[$k];
            }else{
                $b = false;
                break;
            }
        }
        if( $b ){
            $currentVal = $val;
        }
        return $b;
    }
}