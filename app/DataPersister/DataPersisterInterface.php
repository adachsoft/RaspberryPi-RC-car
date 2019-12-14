<?php

namespace App\DataPersister;

/**
* Class 
*/
interface DataPersisterInterface
{
    public function get();
    public function set($data);
    public function read();
    public function save();
    public function isExists();
}