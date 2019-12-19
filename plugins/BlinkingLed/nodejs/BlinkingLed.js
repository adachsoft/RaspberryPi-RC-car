module.exports = class BlinkingLed
{
    constructor()
    {
        const config = require('../config/BlinkingLed.json');
        this.gpio = require('rpi-gpio');
        this.gpiop = this.gpio.promise;
        this.ledState = true;
        this.ledPin = config.pinLed;
        this.duration = config.duration;
    }

    onInit()
    {
        this.gpio.setMode(this.gpio.MODE_BCM);
        this.gpiop.setup(this.ledPin, this.gpio.DIR_OUT)
            .then(() => {
                return this.gpiop.write(this.ledPin, this.ledState)
            })
            .catch((err) => {
                console.log('Error: ', err.toString())
            });
        this.blinkingLed();
    }

    onConnection(ws, req)
    {
    }

    onMessage(data)
    {
        data = this.getDataFromMessage(data);
    }

    onSend()
    {
        return {
                led: 1
        };
    }

    getDataFromMessage(data)
    {
        return data['plugins']['BlinkingLed'];
    }

    blinkingLed()
    {
        setTimeout(()=>{
            this.ledState = !this.ledState;
            this.gpiop.write(this.ledPin, this.ledState);
            this.blinkingLed();
        }, this.duration);
    }
}