<?php

namespace App;

/**
 * Description of InfoSystem
 */
class InfoSystem 
{
    /**
     * Get device model.
     * @return string
     */
    public static function getDeviceModel(): string
    {
        return file_get_contents('/proc/device-tree/model');
    }

    public static function getNodeVersion(): string
    {
        $shellResult = shell_exec('node -v');
        //@todo check if correct
        return $shellResult;
    }

    public static function getComposerVersion(): string
    {
        $shellResult = shell_exec('composer -V');
        //@todo check if correct
        return $shellResult;
    }

    public static function getNpmVersion(): string
    {
        $shellResult = shell_exec('npm -v');
        //@todo check if correct
        return $shellResult;
    }

    public static function getPHPVersion(): string
    {
        $shellResult = shell_exec('php -v');
        //@todo check if correct
        return $shellResult;
    }
}
