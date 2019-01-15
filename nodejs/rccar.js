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

const sensor = require('ds18b20-raspi');
const WebSocketServer = require('ws').Server;
const temp = require("pi-temperature");
const wss = new WebSocketServer({port: config.server.port});

const raspi = require('raspi');
const pwm = require('raspi-soft-pwm');
const p1 = new pwm.SoftPWM(config.pwmA.pin[0]);
const p2 = new pwm.SoftPWM(config.pwmA.pin[1]);

const t1 = new pwm.SoftPWM(config.pwmB.pin[0]);
const t2 = new pwm.SoftPWM(config.pwmB.pin[1]);
var motorTime = null;
var turnTime = null;
var sendTime = null;
var timeOut = config.engineTimeOut;
var ds1820Temp = null;

const gpio = require('rpi-gpio');
//var gpiop = gpio.promise;
 
//gpio.setMode(gpio.MODE_BCM);
//gpio.setup(21, gpio.DIR_OUT);

 
raspi.init(() => {
    console.log('INIT');
    //gpio.write(21, true);
  
    wss.on('connection', function (ws) {
        ws.on('message', function (message) {
            let data = JSON.parse(message);
            motor(data.speed);
            turn(data.turn);
            console.log('received: %s', message);
        });
        ws.on('close', ()=>{
            console.log('CLOSE');
            clearTimeout(sendTime);
            sendTime = null;
        });
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

function turn(val){
    val = val / 100;
    log('START turn: ' + val);
    pwmVal(t1, t2, val);
    if( turnTime ){
       clearTimeout(turnTime);
       turnTime = null;
    }
    
    turnTime = setTimeout(()=>{
        console.log('STOP turn');
        t1.write(0.0);
        t2.write(0.0);
        turnTime = null;
    }, timeOut);
}

function motor(val){
    val = val / 100;
    log('START motor: ' + val);
    pwmVal(p1, p2, val);
    
    if( motorTime ){
       clearTimeout(motorTime);
       motorTime = null;
    }
    motorTime = setTimeout(()=>{
        log('STOP motor');
        p1.write(0.0);
        p2.write(0.0);
        motorTime = null;
    }, timeOut);
}

function pwmVal(pwm0, pwm1, val){
    if( val >= 0 ){
        pwm0.write(val);
        pwm1.write(0);
    }else{
        pwm0.write(0);
        pwm1.write(-1 * val);
    }
}

function log(str){
    console.log(str);
}
