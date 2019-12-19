<?php

namespace App\Config;

/**
* Class load and save config form JSON file. 
*/
class FileManager
{
    const PATH = './config/';
    const FILE_EXT = '.json';

    /**
     * @var string
     */
    private $path;

    /**
     * @var string
     */
    private $fileName;

    /**
     * @var string
     */
    private $content;

    public function __construct(string $fileName, string $path='./config/')
    {
        $this->fileName = $fileName;
        $this->path = $path;
    }

    public function load()
    {
        if( !file_exists($this->getFilePath()) ){
            throw new \Exception("File not exists");
        }
        $this->content = file_get_contents($this->getFilePath());
    }

    public function save()
    {
        file_put_contents($this->getFilePath(), $this->content);
    }

    public function get(): string
    {
        return $this->content;
    }

    private function getFilePath(): string
    {
        return "{$this->path}{$this->fileName}" . static::FILE_EXT;
    }
}