module.exports = class PluginManager
{
    constructor(config)
    {
        this.plugins = new Array();
        this.config = config;
    }

    load()
    {
        for (const [key, value] of Object.entries(this.config.plugins)) {
            if( value.enable ){
                console.log('Load plugin: ' + key);
                try{
                    let Plugin = require( '../plugins/' + key + '/nodejs/' + key + '.js');
                    let pluginObj = new Plugin();
                    this.plugins.push(pluginObj);
                }catch(e){
                    console.log('Loading plugin error: ' + e.message);
                }
                
            }
        }
    }

    onSend()
    {
        let data = {};
        this.plugins.forEach((plugin)=>{
            if (plugin.onSend && typeof plugin.onSend === "function") {
                let dataPlugin = plugin.onSend();
                if( dataPlugin ){
                    data[plugin.constructor.name] = dataPlugin;
                }
            }
        });

        return data;
    }

    onMessage(ws, req)
    {
        this.plugins.forEach((plugin)=>{
            if (plugin.onMessage && typeof plugin.onMessage === "function") {
                plugin.onMessage(ws, req);
            }
        });
    }

    onConnection(ws, req)
    {
        this.plugins.forEach((plugin)=>{
            if (plugin.onConnection && typeof plugin.onConnection === "function") {
                plugin.onConnection(ws, req);
            }
        });
    }

    onInit()
    {
        this.plugins.forEach((plugin)=>{
            if (plugin.onInit && typeof plugin.onInit === "function") {
                plugin.onInit();
            }
        });
    }
}