
const config = require('../../config/plugins/BlinkingLed.json');

console.log('pinLed:', config.pinLed);
console.log('duration:', config.duration);

var gpio = require('rpi-gpio');
var gpiop = gpio.promise;
var ledState = true;
var ledPin = config.pinLed;
var duration = config.duration;
gpio.setMode(gpio.MODE_BCM);

gpiop.setup(ledPin, gpio.DIR_OUT)
    .then(() => {
        return gpiop.write(ledPin, ledState)
    })
    .catch((err) => {
        console.log('Error: ', err.toString())
    });


function blinkingLed()
{
    setTimeout(()=>{
        ledState = !ledState;
        gpiop.write(ledPin, ledState);
        blinkingLed();
    }, duration);
}

blinkingLed();