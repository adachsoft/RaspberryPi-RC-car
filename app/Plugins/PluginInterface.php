<?php

namespace App\Plugins;

/**
* Class 
*/
interface PluginInterface
{
    /**
     * Before render index
     *
     * @param array $dataForTpl
     * @return array
     */
    public function beforeRenderIndex($dataForTpl);
}