class USonic
{
    constructor()
    {
        this.distanceHtml = null;
    }

    init()
    {
        let html = $('#USonic');
        this.distanceHtml = html.find('.js-distance');
    }

    onMessage(data)
    {
        try{
            let dataPlugin = this.getDataFromMessage(data);
            if (dataPlugin) {
                this.distanceHtml.text(dataPlugin.distance + ' cm');
            }
        }catch(e){
            console.log(e);
        }
    }

    getDataFromMessage(data)
    {
        if(data['plugins'] && data['plugins']['USonic']){
            return data['plugins']['USonic'];
        }

        return null;
    }
}
