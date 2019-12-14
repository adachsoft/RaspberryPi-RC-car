<?php

namespace App\DataPersister;

/**
* Class 
*/
class FileManager implements DataPersisterInterface
{
    /**
     * @var string
     */
    private $fileName;

    /**
     * @var mixed
     */
    private $data;

    public function __construct($fileName)
    {
        $this->fileName = $fileName;
    }

    public function get()
    {
        return $this->data;
    }

    public function set($data)
    {
        $this->data = $data;
    }
    
    public function read()
    {
        if (!$this->isExists()){
            throw new \Exception(sprintf('File non exists: %s', $this->fileName));
        }
        $this->data = json_decode(file_get_contents($this->fileName), true);
    }

    public function save()
    {
        file_put_contents($this->fileName, json_encode($this->data));
    }

    public function isExists()
    {
        return file_exists($this->fileName);
    }
}