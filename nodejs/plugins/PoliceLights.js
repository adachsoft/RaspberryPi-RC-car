
const config = require('../../config/plugins/PoliceLights.json');

console.log('pinLed0:', config.pinLed0);
console.log('pinLed1:', config.pinLed1);
console.log('duration:', config.duration);

var gpio = require('rpi-gpio');
var gpiop = gpio.promise;
var ledState = true;
var ledPin0 = config.pinLed0;
var ledPin1 = config.pinLed1;
var duration = config.duration;
gpio.setMode(gpio.MODE_BCM);

gpiop.setup(ledPin0, gpio.DIR_OUT)
    .then(() => {
        return gpiop.write(ledPin0, ledState)
    })
    .catch((err) => {
        console.log('Error ledPin0: ', err.toString())
    });

gpiop.setup(ledPin1, gpio.DIR_OUT)
    .then(() => {
        return gpiop.write(ledPin1, !ledState)
    })
    .catch((err) => {
        console.log('Error ledPin1: ', err.toString())
    });    


function blinkingLed()
{
    setTimeout(()=>{
        ledState = !ledState;
        gpiop.write(ledPin0, ledState);
        gpiop.write(ledPin1, !ledState);
        blinkingLed();
    }, duration);
}

blinkingLed();