const sensor = require('ds18b20-raspi');
var ds1820Temp = null;

var WebSocketServer = require('ws').Server;
var temp = require("pi-temperature");
var wss = new WebSocketServer({port: 8000});

const raspi = require('raspi');
const pwm = require('raspi-soft-pwm');
const p1 = new pwm.SoftPWM('GPIO26');
const p2 = new pwm.SoftPWM('GPIO19');

const t1 = new pwm.SoftPWM('GPIO13');
const t2 = new pwm.SoftPWM('GPIO12');
var motorTime = null;
var turnTime = null;
var sendTime = null;
var timeOut = 150;

var gpio = require('rpi-gpio');
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
            
        });
    }, 1000);
}

function turn(val){
    val = val / 100;
    log('START turn: ' + val);
    if( val >= 0 ){
        t1.write(val);
        t2.write(0.0);
    }else{
        t1.write(0.0);
        t2.write(-1 * val);
    }
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
    if( val >= 0 ){
        p1.write(val);
        p2.write(0.0);
    }else{
        p1.write(0.0);
        p2.write(-1 * val);
    }
    
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

function log(str){
    console.log(str);
}
