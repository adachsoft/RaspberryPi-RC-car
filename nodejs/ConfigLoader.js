const fs = require('fs');

module.exports = class ConfigLoader
{
    constructor()
    {
    }

    load(configName)
    {
        this.configName = configName;
        let configFile = this.getFileName();
        if (!fs.existsSync(configFile)) {
            configFile = this.getDefaultFileName();
        }
        console.log('Load confg file: ', configFile);

        return require(configFile);
    }

    getFileName()
    {
        return '../config/' +  this.configName + '.json'
    }

    getDefaultFileName()
    {
        return '../config/' +  this.configName + 'Default.json'
    }
}
