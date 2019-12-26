const fs = require('fs');
const process = require('process');
const raspi = require('raspi');

if (process.pid) {
    console.log('PID: ' + process.pid);
    fs.writeFileSync('../tmp/rccar.lock', process.pid);
}

const PluginManager = require('./PluginManager.js');
const RcCarManager = require('./RcCarManager.js');
const ConfigLoader = require('./ConfigLoader.js');
const DeviceManager = require('./DeviceManager.js');

const deviceManager = new DeviceManager();
const configLoader = new ConfigLoader();
const config = configLoader.load('configServer');
const configPlugins = configLoader.load('plugins');

const pluginManager = new PluginManager(configPlugins);
const WebSocketServer = require('ws').Server;
const webSocketServer = new WebSocketServer({port: config.server.port});

const Vehicle = require('./' + config.controller + '.js');
const configVehicle = configLoader.load(config.controller);
const vehicle = new Vehicle(configVehicle);

pluginManager.load();

const rcCarManager = new RcCarManager(
    pluginManager,
    webSocketServer,
    config,
    vehicle,
    deviceManager
);

raspi.init(() => {
    console.log('INIT');
    rcCarManager.init();
});

process.on('SIGINT', () => {
    console.log('EXIT');
    rcCarManager.onExit();
    fs.unlinkSync('../tmp/rccar.lock');
    process.exit(0);
});