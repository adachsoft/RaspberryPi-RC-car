module.exports = class PoliceLights
{
    constructor()
    {
        const config = require('../config/PoliceLights.json');

        this.gpio = require('rpi-gpio');
        this.gpiop = this.gpio.promise;
        this.ledState = true;
        this.ledPin0 = config.pinLed0;
        this.ledPin1 = config.pinLed1;
        this.duration = config.duration;
        this.ledOn = true;
    }

    onInit()
    {
        this.gpio.setMode(this.gpio.MODE_BCM);

        this.gpiop.setup(this.ledPin0, this.gpio.DIR_OUT)
            .then(() => {
                return this.gpiop.write(this.ledPin0, this.ledState)
            })
            .catch((err) => {
                console.log('Error ledPin0: ', err.toString())
            });

        this.gpiop.setup(this.ledPin1, this.gpio.DIR_OUT)
            .then(() => {
                return this.gpiop.write(this.ledPin1, !this.ledState)
            })
            .catch((err) => {
                console.log('Error ledPin1: ', err.toString())
            });

        this.blinkingLed();
    }

    onConnection(ws, req)
    {
    }

    onMessage(data)
    {
        try{
            data = this.getDataFromMessage(data);
            this.ledOn = data.ledOn === 1;
            if (!this.ledOn) {
                this.gpiop.write(this.ledPin0, 0);
                this.gpiop.write(this.ledPin1, 0);
            }
        }catch(e){
            console.log('onMessage error: ', e.message);
        }
    }

    onSend()
    {
        return {
            ledOn: this.ledOn
        };
    }

    getDataFromMessage(data)
    {
        return data['plugins']['PoliceLights'];
    }

    blinkingLed()
    {
        setTimeout(()=>{
            if (this.ledOn) {
                this.ledState = !this.ledState;
                this.gpiop.write(this.ledPin0, this.ledState);
                this.gpiop.write(this.ledPin1, !this.ledState);
            }
            this.blinkingLed();
        }, this.duration);
    }
}
