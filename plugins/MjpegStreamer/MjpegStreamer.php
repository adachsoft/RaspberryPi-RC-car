<?php

//namespace App\;

use App\Plugins\PluginInterface;

/**
* Class 
*/
class MjpegStreamer implements PluginInterface
{
    public function __construct()
    {
    }

    public function beforeRenderIndex($dataForTpl)
    {
        $urlToSelf = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'];
        $dataForTpl['URL_STREAM'] = $urlToSelf . ':8080/?action=stream';

        return $dataForTpl;
    }
}
