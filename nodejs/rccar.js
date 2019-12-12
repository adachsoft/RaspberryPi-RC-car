const fs = require('fs');
const PluginManager = require('./PluginManager.js');
const RcCarManager = require('./RcCarManager.js');

var configFile = '../config/configServer.json';
if (!fs.existsSync(configFile)) {
    configFile = '../config/configServerDefault.json'
}

const raspi = require('raspi');
const config = require(configFile);
const pluginManager = new PluginManager(config);
const WebSocketServer = require('ws').Server;
const webSocketServer = new WebSocketServer({port: config.server.port});

const Vehicle = require('./' + config.controller + '.js');
let configVehicleFile = '../config/' + config.controller + '.json';
if (!fs.existsSync(configVehicleFile)) {
    configVehicleFile = '../config/' + config.controller + 'Default.json'
}
const configVehicle = require(configVehicleFile);
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
