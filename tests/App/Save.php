<?php

use PHPUnit\Framework\TestCase;

class Save extends TestCase
{
    public static $path = __DIR_ROOT__ . 'tmp/config/';
    public static $fileConfig = __DIR_ROOT__.'tmp/config/configDefault.json';

    public static function getPath($configFile)
    {
        return __DIR_ROOT__."config/{$configFile}Default.json";
    }
    
    public static function getTmpPath($configFile)
    {
        return static::$path."{$configFile}.json";
    }
    
    public static function getTmpDefaultPath($configFile)
    {
        return static::$path."{$configFile}Default.json";
    }

    public static function setUpBeforeClass()
    {
        if(!is_dir(static::$path) ){
            mkdir(static::$path);
        }
    }
    
    /**
     * @dataProvider providerDir
     */
    public function testDir($configFile)
    {
        $this->assertDirectoryExists(static::$path);
        copy(static::getPath($configFile), static::getTmpDefaultPath($configFile));
        $this->assertFileExists(static::getTmpDefaultPath($configFile));
    }
    
    public function providerDir()
    {
        return [
            ['config'],
            ['configServer']
        ];
    }

    public function testSaveConfig()
    {
        $conf = new Config('config', static::$path);
        $this->assertSame(60, $conf->get('maxEnginePower'));
        $this->assertSame(70, $conf->get('maxTurnStrength'));
        $this->assertSame(false, $conf->get('camera'));
        $conf->set('maxEnginePower', 33);
        $conf->set('maxTurnStrength', 72);
        $conf->set('camera', true);
        $conf->save();
    }
    
    public function testGetConfig()
    {
        $conf = new Config('config', static::$path);
        $this->assertSame(33, $conf->get('maxEnginePower'));
        $this->assertSame(72, $conf->get('maxTurnStrength'));
        $this->assertSame(true, $conf->get('camera'));
    }
    
    public function testSaveConfigServer()
    {
        $conf = new Config('configServer', static::$path);
        $this->assertSame(200, $conf->getForTpl('engineTimeOut'));
        $this->assertSame('VehicleServoPWM', $conf->get('controller'));
        $this->assertSame(8000, $conf->getForTpl('server.port'));
        $conf->setForTpl('engineTimeOut', 112);
        $conf->setForTpl('controller', 'VehicleL298n');
        $conf->setForTpl('server.port', 2160);
        $conf->save();
    }
    
    public function testGetConfigServer()
    {
        $conf = new Config('configServer', static::$path);
        $this->assertSame(112, $conf->getForTpl('engineTimeOut'));
        $this->assertSame('VehicleL298n', $conf->getForTpl('controller'));
        $this->assertSame(2160, $conf->getForTpl('server.port'));
    }
    
    /**
     * @dataProvider providerDir
     */
    public function testRemoveDir($configFile)
    {
        $this->assertDirectoryExists(static::$path);
        $this->assertFileExists(static::getTmpPath($configFile));
        $this->assertFileExists(static::getTmpDefaultPath($configFile));
        unlink(static::getTmpPath($configFile));
        unlink(static::getTmpDefaultPath($configFile));
        $this->assertFileNotExists(static::getTmpPath($configFile));
        $this->assertFileNotExists(static::getTmpDefaultPath($configFile));
    }
}
