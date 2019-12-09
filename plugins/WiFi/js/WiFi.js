
class WiFi
{
    constructor()
    {
        this.shouldSendData = false;

        $(document).ready(()=>{
            this.tab = $('#tabWifiContainer');
            this.currentWiFiName = this.tab.find('#currentWiFiName');
            this.currentIpAddr = this.tab.find('#currentIpAddr');
        });
    }

    init()
    {
    }

    createDataToSend()
    {
        return null;

        /*this.shouldSendData = false;

        return {
            WiFi: {
                hornOn: this.hornOn
            }
        };*/
    }

    shouldSend()
    {
        return this.shouldSendData; 
    }

    onKeyUp(keys)
    {
    }

    onKeyDown(keys)
    {
    }

    onMessage(data)
    {
        try{
            let dataPlugin = this.getDataFromMessage(data);
            console.log(dataPlugin);
            this.currentWiFiName.text(dataPlugin['wifi_ssid']);
            this.currentIpAddr.text(dataPlugin['ip_address']);
        }catch(e){
            console.log(e);
        }
    }

    isKeyPressed(keys, keyCode)
    {
        return keys.indexOf(keyCode) >= 0;
    }

    getDataFromMessage(data)
    {
        return data['plugins']['WiFi'];
    }
}