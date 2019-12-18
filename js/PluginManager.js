class PluginManager
{
    constructor(plugins)
    {
        this.plugins = plugins;
    }

    init()
    {
        this.plugins.forEach((plugin)=>{
            if (plugin.init && typeof plugin.init === "function") {
                plugin.init();
            }
        });
    }

    shouldSendData()
    {
        let shouldSendData = false;
        this.plugins.forEach((plugin)=>{
            if (plugin.shouldSend && typeof plugin.shouldSend === "function") {
                shouldSendData = shouldSendData || plugin.shouldSend();
            }
        });

        return shouldSendData;
    }

    createDataToSend()
    {
        let pluginsData = {};
        this.plugins.forEach((plugin)=>{
            if (plugin.createDataToSend && typeof plugin.createDataToSend === "function") {
                let data = plugin.createDataToSend();
                pluginsData = $.extend(pluginsData, data);
            }
        });

        return pluginsData;
    }

    onMessage(data)
    {
        this.plugins.forEach((plugin)=>{
            if (plugin.onMessage && typeof plugin.onMessage === "function") {
                plugin.onMessage(data);
            }
        });
    }

    onKeyUp(keys)
    {
        this.plugins.forEach((plugin)=>{
            if (plugin.onKeyUp && typeof plugin.onKeyUp === "function") {
                plugin.onKeyUp(keys);
            }
        });
    }

    onKeyDown(keys)
    {
        this.plugins.forEach((plugin)=>{
            if (plugin.onKeyDown && typeof plugin.onKeyDown === "function") {
                plugin.onKeyDown(keys);
            }
        });
    }
}