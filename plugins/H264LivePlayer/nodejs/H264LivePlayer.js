const Raspivid = require('./Raspivid.js');
const VideoServer = require('./VideoServer.js');


module.exports = class H264LivePlayer
{
    constructor()
    {
        let raspivid = new Raspivid(320, 240, 20);
        this.videoServer = new VideoServer({port: 8080}, raspivid);
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
