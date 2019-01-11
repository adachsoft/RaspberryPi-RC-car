<?php

class Config{
    private $file;
    private $data = [];

    public function __construct($file) {
        $this->file = $file;
        $this->load();
    }

    public function save() : bool
    {
        return file_put_contents($this->file, json_encode($this->data));
    }
    
    public function load(){
        if( file_exists($this->file) ){
            $file = $this->file;
        }else{
            $file = './config/configDefault.json';
        }
        $this->data = json_decode(file_get_contents($file), true);
    }
    
    public function get($key, $def=null){
        return $this->data[$key] ?? $def;
    }
    
    public function set($key, $val){
        return $this->data[$key] = $val;
    }
}
