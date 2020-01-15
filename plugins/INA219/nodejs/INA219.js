module.exports = class INA219
{
    constructor()
    {
        this.ina219 = require('ina219');
        this.voltage = 0;
        this.current = 0;
        this.power = 0;
        this.batteryLowVoltage = 3 * 2;
        this.batteryHighVoltage = 4.2 * 2;
        this.batteryLevel = 0;
    }

    onInit()
    {
        this.ina219.init();
        this.ina219.enableLogging(false);
        this.ina219.calibrate32V1A(() => {
            this.measure();
        });
    }

    onSend()
    {
        return {
            voltage: this.voltage,
            current: this.current,
            power: this.power,
            batteryLevel: this.batteryLevel,
        };
    }

    measure()
    {
        this.ina219.getBusVoltage_V((volts) => {
            this.voltage = volts.toPrecision(3);
            this.ina219.getCurrent_mA((current) => {
                this.current = (current / 1000).toPrecision(3);
                this.power = (this.voltage * this.current).toPrecision(3);
                this.calculateBatteryLevel();
                setTimeout(()=>{
                    this.measure();
                }, 100);
            });	
        });
    }

    calculateBatteryLevel()
    {
        let scal = this.batteryHighVoltage - this.batteryLowVoltage;
        let level = this.voltage - this.batteryLowVoltage;

        this.batteryLevel = Math.round((level / scal) * 100);
    }
}
