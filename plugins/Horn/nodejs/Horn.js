module.exports = class Horn
{
    constructor()
    {
        const config = require('../config/Horn.json');
        
        const Gpio = require('pigpio').Gpio;
        this.horn = new Gpio(config.pinHorn, {mode: Gpio.OUTPUT});
        this.hornTime = null;
        this.config = config;
        this.hornState = false;
    }

    onInit()
    {
        this.horn.digitalWrite(false);
    }

    onConnection(ws, req)
    {
    }

    onMessage(data)
    {
        data = this.getDataFromMessage(data);
        if( typeof data.hornOn !== 'undefined' ){
            this.hornCtrl(data.hornOn);
        }
    }

    onSend()
    {
        return {
                hornOn: this.hornState
        };
    }

    onClose(ws)
    {
        this.horn.digitalWrite(false);
    }

    getDataFromMessage(data)
    {
        return data['plugins']['Horn'];
    }

    hornCtrl(hornOn)
    {
        this.horn.digitalWrite(hornOn);
        this.hornState = hornOn;
        if( hornOn ){
            if( this.hornTime ){
                clearTimeout(this.hornTime);
                this.hornTime = null;
            }
            this.hornTime = setTimeout(()=>{
                this.horn.digitalWrite(false);
                this.hornTime = null;
            }, this.config.duration);
        }
    }
}