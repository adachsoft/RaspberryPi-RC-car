<?php

namespace App\Snapshot;

use App\Generators\FileNameGeneratorInterface;

/**
* Class 
*/
class Raspistill implements SnapshotInterface
{
    const PATH = './snapshots/';
    const CMD = 'raspistill';

    /**
     * @var FileNameGeneratorInterface
     */
    private $fileNameGenerator;

    public function __construct(FileNameGeneratorInterface $fileNameGenerator)
    {
        $this->fileNameGenerator = $fileNameGenerator;
    }

    public function takeSnapshot($options=[])
    {
        $fileName = $this->getFileName();
        $result = shell_exec($this->createCmd($fileName, $options));
        echo $result;

        if (!file_exists($fileName)) {
            throw new SnapshotException("Error take snapshot, file not exists");
        }
    }

    private function createCmd($fileName, $options)
    {
        $cmdOptions = [
            '-o',
            $fileName,
        ];
        return static::CMD . ' ' . join(' ', $cmdOptions);
    }

    private function getFileName()
    {
        return static::PATH . $this->fileNameGenerator->generate() . '.jpg';
    }
}
