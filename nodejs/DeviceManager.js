module.exports = class DeviceManager
{
    constructor()
    {
        this.temp = require("pi-temperature");
        this.osu = require('node-os-utils');
        this.dateFormat = require('dateformat');
        this.cpuTemp = null;
        this.cpuUsage = null;
    }

    onInit()
    {
        this.monitor();
    }

    monitor()
    {
        this.monitorDeviceState();
        setTimeout(()=>{
            this.monitor();
        }, 1000);
    }

    getData()
    {
        return {
            cpuTemp: this.cpuTemp,
            cpuUsage: this.cpuUsage,
            timestamp: new Date().getTime(),
            date: this.dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
        };
    }

    monitorDeviceState()
    {
        this.measureTemp();        
        this.getCpuUsage();
    }

    getCpuUsage()
    {
        let cpu = this.osu.cpu
        cpu.usage().then(cpuUsage => {
            this.cpuUsage = cpuUsage;
        });
    }

    measureTemp()
    {
        this.temp.measure((err, cpuTemp)=>{
            if (!err) {
                this.cpuTemp = cpuTemp;
            }
        });
    }
}
