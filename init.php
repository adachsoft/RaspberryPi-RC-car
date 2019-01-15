<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

error_reporting(E_ALL);
ini_set("display_errors", 1);
define('__DIR_ROOT__', './');

$version = include './version.php';
require_once './app/Config.php';
require __DIR_ROOT__ . 'vendor/autoload.php';

$config = new Config('./config/config.json');