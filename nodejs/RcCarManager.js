const WebSocket = require('ws');

module.exports = class RcCarManager
{
    constructor(pluginManager, webSocketServer, config, vehicle)
    {
        this.pluginManager = pluginManager;
        this.webSocketServer = webSocketServer;
        this.config = config;
        this.vehicle = vehicle;
        this.debugOn = true;
        this.sendTime = null;
        this.temp = require("pi-temperature");
        this.cpuTemp = null;
    }

    init()
    {
        this.webSocketServer.on('connection', (ws, req)=>{this.onConnect(ws, req);});
        this.pluginManager.onInit();
        setTimeout(()=>{
            this.measureTemp();
        }, 500);
    }

    onConnect(ws, req)
    {
        this.log('New connection: ' + req.connection.remoteAddress);
        //this.wsConnections.push(ws);
        this.pluginManager.onConnection(ws, req);
        ws.on('message', (message)=>{
            let data = JSON.parse(message);
            this.pluginManager.onMessage(data);
            this.vehicle.motor(data.speed);
            this.vehicle.turn(data.turn);
            /*if( typeof data.cmd !== 'undefined' ){
                if( data.cmd==='exit' ){
                    process.exit();
                }
            }*/
            console.log('received: %s', message);
        });
        ws.on('close', (ws)=>{
            this.log('CLOSE');
            clearTimeout(this.sendTime);
            this.sendTime = null;
            this.pluginManager.onClose(ws);
        });
        this.sendToAll();
    }

    sendToAll()
    {
        this.sendTime = setTimeout(()=>{
            let data = {
                temp: this.cpuTemp,
                plugins: this.pluginManager.onSend()
            };
            let jsonData = JSON.stringify(data);
            this.webSocketServer.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    try{
                        client.send(jsonData);
                    }catch(exception){
                        this.log(exception);
                    }
                }
            });
            this.sendToAll();
        }, 1000);
    }

    sendData(ws)
    {
        if (this.sendTime!==null) {
            return;
        }
        this.sendTime = setTimeout(()=>{
            let data = {
                temp: this.cpuTemp,
                plugins: this.pluginManager.onSend()
            };
            try{
                ws.send(JSON.stringify(data), ()=>{
                    this.sendData(ws);
                });
            }catch (exception) {
                clearTimeout(this.sendTime);
                this.sendTime = null;
            }
            this.sendTime = null;
            this.sendData(ws);
        }, 1000);
    }

    measureTemp()
    {
        this.temp.measure((err, temp)=>{
            if (!err) {
                this.cpuTemp = temp;
            }
            setTimeout(()=>{
                this.measureTemp();
            }, 1000);
        });
    }

    log(str)
    {
        if (this.debugOn) {
            console.log(str);
        }
    }
}