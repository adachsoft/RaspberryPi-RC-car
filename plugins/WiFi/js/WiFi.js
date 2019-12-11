
class WiFi
{
    constructor()
    {
        this.shouldSendData = false;

        $(document).ready(()=>{
            this.tab = $('#tabWifiContainer');
            this.currentWiFiName = this.tab.find('#currentWiFiName');
            this.currentIpAddr = this.tab.find('#currentIpAddr');
            this.tableScan = this.tab.find('#wifi_scan');
            this.tableScanRow = this.tableScan.find('#wifi_scan_tpl');
        });
    }

    init()
    {
    }

    createDataToSend()
    {
        return null;
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
            this.currentWiFiName.text(dataPlugin['wifi_ssid']);
            this.currentIpAddr.text(dataPlugin['ip_address']);
            this.renderTable(dataPlugin['scan_result']);
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

    renderTable(data)
    {
        this.tableScan.find('.js-row').remove();
        let num = 1;
        let lastRow = this.tableScanRow;
        data.forEach((item)=>{
            let row = this.tableScanRow.clone();
            row.removeClass('d-none').addClass('js-row');
            row.find('td').each((idx, tdItem)=>{
                $(tdItem).text(item[$(tdItem).data('row')]);
            });
            row.find('th').text(num++);
            row.insertAfter(lastRow);
            lastRow = row;
        });
    }
}