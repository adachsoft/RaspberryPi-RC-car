class INA219
{
    constructor()
    {
        this.voltageHtml = null;
        this.currentHtml = null;
        this.powerHtml = null;
        this.batteryLevelHtml = null;
    }

    init()
    {
        let html = $('#INA219');
        this.voltageHtml = html.find('.js-voltage');
        this.currentHtml = html.find('.js-current');
        this.powerHtml = html.find('.js-power');
        this.batteryLevelHtml = html.find('.js-batteryLevel');
    }

    onMessage(data)
    {
        try{
            let dataPlugin = this.getDataFromMessage(data);
            if(dataPlugin){
                this.voltageHtml.text(dataPlugin.voltage + ' V');
                this.currentHtml.text(dataPlugin.current + ' A');
                this.powerHtml.text(dataPlugin.power + ' W');
                this.batteryLevelHtml.text(dataPlugin.batteryLevel + ' %');
            }
        }catch(e){
            console.log(e);
        }
    }

    getDataFromMessage(data)
    {
        if(data['plugins'] && data['plugins']['INA219']){
            return data['plugins']['INA219'];
        }

        return null;
    }
}
