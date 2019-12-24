const process = require('process');
const raspi = require('raspi');
const PluginManager = require('./PluginManager.js');
const RcCarManager = require('./RcCarManager.js');
const ConfigLoader = require('./ConfigLoader.js');

const configLoader = new ConfigLoader();
const config = configLoader.load('configServer');
const configPlugins = configLoader.load('plugins');
console.log(configPlugins);

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
    vehicle
);

raspi.init(() => {
    console.log('INIT');
    rcCarManager.init();
});

process.on('SIGINT', () => {
    console.log('EXIT');
    pluginManager.onExit();
    process.exit(0);
});