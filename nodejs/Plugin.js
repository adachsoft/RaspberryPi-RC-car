module.exports = class Plugin
{
    constructor()
    {
        this.config = this.loadConfig();
    }

    loadConfig()
    {
        console.log( this.constructor.name );
        let configName = this.constructor.name;
        return require('../config/' + configName + '.json');
    }
}
