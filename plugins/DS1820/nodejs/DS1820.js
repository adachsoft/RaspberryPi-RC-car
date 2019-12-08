module.exports = class DS1820
{
    constructor()
    {
        const config = require('../config/DS1820.json');
        const sensor = require('ds18b20-raspi');
        this.config = config;
        this.sensor = sensor;
        this.ds1820Temp = null;
    }

    onInit()
    {
        setTimeout(()=>{
            this.checkTemp();
        }, this.config.duration);
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
                temp: this.ds1820Temp
        };
    }

    onClose(ws)
    {
    }

    getDataFromMessage(data)
    {
        return data['plugins']['Horn'];
    }

    async checkTemp()
    {

        try {
            await new Promise((resolve, reject) => {
                //this.getTemp();
            })
          } catch (err) {
            // handle error case
            // maybe throwing is okay depending on your use-case
          }

        
    }

    getTemp()
    {
        this.sensor.readSimpleC((err, temp) => {
            if (err) {
                console.log(err);
            } else {
                this.ds1820Temp = temp;
                setTimeout(()=>{
                    this.checkTemp();
                }, this.config.duration);
            }
        });
    }
}