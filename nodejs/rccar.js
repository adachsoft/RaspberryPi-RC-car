const process = require('process');
const fs = require('fs');

if (process.pid) {
    console.log('This process is your pid ' + process.pid);
    fs.writeFileSync('../tmp/rccar.lock', process.pid);
}

var configFile = '../config/configServer.json';
if (!fs.existsSync(configFile)) {
    configFile = '../config/configServerDefault.json'
}

const config = require(configFile);
console.log('Server port: ' + config.server.port);
console.log('PWM A-0: ' + config.pwmA.pin[0]);
console.log('PWM A-1: ' + config.pwmA.pin[1]);
//console.log('PWM A reverse: ' + config.pwmA.reverse);
console.log('PWM B-0: ' + config.pwmB.pin[0]);
console.log('PWM B-1: ' + config.pwmB.pin[1]);
//console.log('PWM B reverse: ' + config.pwmB.reverse);
console.log('Engine time out: ' + config.engineTimeOut);
console.log('Controller: ' + config.controller);

const sensor = require('ds18b20-raspi');
const WebSocketServer = require('ws').Server;
const temp = require("pi-temperature");
const wss = new WebSocketServer({port: config.server.port});

const raspi = require('raspi');

var sendTime = null;
var ds1820Temp = null;


const Vehicle = require('./' + config.controller + '.js');
var configVehicleFile = '../config/' + config.controller + '.json';
if (!fs.existsSync(configVehicleFile)) {
    configVehicleFile = '../config/' + config.controller + 'Default.json'
}
const configVehicle = require(configVehicleFile);
const vehicle = new Vehicle(configVehicle);

//var wsClient = [];
raspi.init(() => {
    console.log('INIT');
    //gpio.write(21, true);
  
    wss.on('connection', function (ws, req) {
        log('New connection: ' + req.connection.remoteAddress);
        ws.on('message', function (message) {
            let data = JSON.parse(message);
            vehicle.motor(data.speed);
            vehicle.turn(data.turn);
            if( typeof data.cmd !== 'undefined' ){
                if( data.cmd==='exit' ){
                    process.exit();
                }
            }
            console.log('received: %s', message);
        });
        ws.on('close', ()=>{
            console.log('CLOSE');
            clearTimeout(sendTime);
            sendTime = null;
        });
        //wsClient.push(ws);
        sendData(ws);
    });
});

//checkTemp();

function checkTemp(){
    /*setTimeout(()=>{
        sensor.readSimpleC((err, temp) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`${temp} degC`);
                ds1820Temp = temp;
            }
        });
        checkTemp();
    }, 5000);*/
    
    
    //sensor.readSimpleC((err, temp) => {
    sensor.readC('28-000001fad924', (err, temp) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`${temp} degC`);
            ds1820Temp = temp;
        }
        checkTemp();
    });
}

function sendData(ws){
    if( sendTime!==null ){
        return;
    }
    sendTime = setTimeout(()=>{
        temp.measure(function(err, temp) {
            log('Temp CPU: ' + temp);
            if (!err) {
                let data = {
                    temp: temp,
                    ds1820: ds1820Temp
                };
                try{
                    ws.send(JSON.stringify(data), ()=>{
                        sendData(ws);
                    });
                }catch (exception) {
                    clearTimeout(sendTime);
                    sendTime = null;
                }
            }
            sendTime = null;
            sendData(ws);  
        });
    }, 1000);
}

function log(str){
    console.log(str);
}
