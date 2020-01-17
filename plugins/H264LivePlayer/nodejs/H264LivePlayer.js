const Raspivid = require('./Raspivid.js');
const VideoServer = require('./VideoServer.js');


module.exports = class H264LivePlayer
{
    constructor()
    {
        this.config = require('../config/BlinkingLed.json');
        let raspivid = new Raspivid(this.config.width, this.config.height, this.config.fps);
        this.videoServer = new VideoServer({port: this.config.serverPort}, raspivid);
    }

    onInit()
    {
        this.videoServer.open();
    }

    onExit()
    {
        this.videoServer.close();
    }
}
