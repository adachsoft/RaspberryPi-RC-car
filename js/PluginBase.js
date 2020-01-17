class PluginBase
{
    constructor()
    {
        this.config = null;
    }

    init()
    {
        this.config = this.getConfig();
    }

    getConfig()
    {
        let configHTML = $('.js-pluginsConfig');
        let data = JSON.parse(configHTML.val());
        
        return data['H264LivePlayer'];
    }
}