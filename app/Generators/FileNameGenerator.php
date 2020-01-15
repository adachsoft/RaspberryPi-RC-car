<?php

namespace App\Generators;

/**
* Class 
*/
class FileNameGenerator implements FileNameGeneratorInterface
{
    public function generate()
    {
        return (string)time();
    }
}
