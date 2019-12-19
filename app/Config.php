<?php

class Config{
    public $path = './config/';
    public $extension = '.json';
    private $file;
    private $data = [];

    public function __construct($file, $path = './config/') 
    {
        $this->file = $file;
        $this->path = $path;
        $this->load();
    }

    public function save() : bool
    {
        $filePath = "{$this->path}{$this->file}{$this->extension}";
        return file_put_contents($filePath, json_encode($this->data)) && 
                file_exists($filePath);
    }
    
    public function load(){
        $file = "{$this->path}{$this->file}{$this->extension}";
        if( !file_exists($file) ){
            $file = "{$this->path}{$this->file}Default{$this->extension}";
        }
        $this->data = json_decode(file_get_contents($file), true);
    }
    
    public function getAll(){
        return $this->data;
    }
    
    public function get($key, $def=null){
        return $this->data[$key] ?? $def;
    }
    
    public function set($key, $val){
        return $this->data[$key] = $val;
    }
    
    public function getForTpl($key, $def=null){
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
    
    public function setForTpl($key, $val){
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
