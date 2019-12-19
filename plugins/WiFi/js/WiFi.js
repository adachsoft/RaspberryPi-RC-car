
class WiFi
{
    constructor()
    {
        this.shouldSendData = false;
        this.ssid = '';
        this.password = '';

        $(document).ready(()=>{
            this.tab = $('#tabWifiContainer');
            this.currentWiFiName = this.tab.find('#currentWiFiName');
            this.currentIpAddr = this.tab.find('#currentIpAddr');
            this.tableScan = this.tab.find('#wifi_scan');
            this.tableScanRow = this.tableScan.find('#wifi_scan_tpl');
            this.modalWindow = this.tab.find('#modalConnect');
            this.registerModalButton();
        });
    }

    init()
    {
    }

    createDataToSend()
    {
        if(!this.shouldSendData){
            return null;
        }
        this.shouldSendData = false;
        return {
            WiFi: {
                ssid: this.ssid,
                password: this.password
            }
        };
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
            if(dataPlugin){
                this.currentWiFiName.text(dataPlugin['wifi_ssid']);
                this.currentIpAddr.text(dataPlugin['ip_address']);
                this.renderTable(dataPlugin['scan_result']);
            }
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
        if(data['plugins'] && data['plugins']['WiFi']){
            return data['plugins']['WiFi'];
        }

        return null;
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
                let data = $(tdItem).data('row');
                if( data ){
                    $(tdItem).text(item[data]);
                }
            });
            row.data('ssid', item['ssid']);
            row.find('th').text(num++);
            this.registerButton(row);
            row.insertAfter(lastRow);
            lastRow = row;
        });
    }

    registerButton(row)
    {
        row.find('.js-connect').on('click', (e)=>{
            this.ssid = row.data('ssid');
            this.modalWindow.modal({show: true});
        });
    }

    registerModalButton()
    {
        this.modalWindow.find('.js-connect').on('click', (e)=>{
            this.password = this.modalWindow.find('#password').val();
            this.shouldSendData = true;
            this.modalWindow.modal('hide')
        });
    }
}