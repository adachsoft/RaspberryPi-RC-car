var gpio = require('rpi-gpio');
var gpiop = gpio.promise;
var ledState = true;
gpio.setMode(gpio.MODE_BCM);

gpiop.setup(17, gpio.DIR_OUT)
    .then(() => {
        return gpiop.write(17, ledState)
    })
    .catch((err) => {
        console.log('Error: ', err.toString())
    });


//var gpiop = gpio.promise;
 //gpio.setMode(gpio.MODE_BCM);
/*gpio.setup(17, gpio.DIR_OUT);
gpio.write(17, true);*/

function ttt()
{
    setTimeout(()=>{
        ledState = !ledState;
        gpiop.write(17, ledState);
        console.log('LED: ', ledState);
    }, 2000);
}

ttt();