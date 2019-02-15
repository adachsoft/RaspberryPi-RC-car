<?php


/**
 * Description of InfoSystem
 *
 * 
 */
class InfoSystem {
    /**
     * Get device model.
     * @return string
     */
    public static function getDeviceModel() : string
    {
        return file_get_contents('/proc/device-tree/model');
    }
}
