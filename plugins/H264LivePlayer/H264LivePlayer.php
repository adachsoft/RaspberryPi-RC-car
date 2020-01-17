<?php

//namespace App\;

use App\Plugins\PluginInterface;

/**
* Class 
*/
class H264LivePlayer implements PluginInterface
{
    public function __construct()
    {
    }

    public function beforeRenderIndex($dataForTpl)
    {
        $dataForTpl['JS_FILES'][] = 'plugins/H264LivePlayer/node_modules/h264-live-player/dist/http-live-player.js';
        $dataForTpl['CAMERA_TPL'] = 'plugins/H264LivePlayer/tpl/camera.tpl';

        return $dataForTpl;
    }
}
