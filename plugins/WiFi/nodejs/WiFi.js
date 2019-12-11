module.exports = class WiFi
{
    constructor()
    {
        const Wifi = require('rpi-wifi-connection');
        this.wifi = new Wifi();
        this.currentWifi = {};
        this.scanResult = {};
    }

    onInit()
    {
        setTimeout(
            ()=>{
                this.getStatus();
                this.scan();
            }, 
            500
        );
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
                wifi_ssid: this.currentWifi['ssid'],
                ip_address: this.currentWifi['ip_address'],
                scan_result: this.scanResult,
        };
    }

    onClose(ws)
    {
    }

    getDataFromMessage(data)
    {
        return data['plugins']['WiFi'];
    }

    getStatus()
    {
        this.wifi.getStatus().then((status) => {
            this.currentWifi['ssid'] = status.ssid;
            this.currentWifi['ip_address'] = status.ip_address;
            setTimeout(
                ()=>{
                    this.getStatus();
                }, 
                5000
            );
        })
        .catch((error) => {
            console.log(error);
        });
    }

    scan()
    {
        this.wifi.scan().then((ssids) => {
            this.scanResult = ssids;
            setTimeout(
                ()=>{
                    this.scan();
                }, 
                2000
            );
        })
        .catch((error) => {
            console.log(error);
        });
    }
}