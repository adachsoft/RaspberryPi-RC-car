const WebSocket = require('ws');

module.exports = class RcCarManager
{
    constructor(pluginManager, webSocketServer, config, vehicle, deviceManager)
    {
        this.pluginManager = pluginManager;
        this.pluginManager.setRcCarManager(this);
        this.webSocketServer = webSocketServer;
        this.config = config;
        this.vehicle = vehicle;
        this.deviceManager = deviceManager;
        this.debugOn = true;
        this.sendTime = null;
        this.speed = 0;
        this.turn = 0;
        this.vehicle.setOnMotorStop(()=>{
            this.onMotorStop();
        });
        this.vehicle.setOnTurnStop(()=>{
            this.onTurnStop();
        });
    }

    init()
    {
        this.webSocketServer.on('connection', (ws, req)=>{this.onConnect(ws, req);});
        this.pluginManager.onInit();
        this.deviceManager.onInit();
    }

    onConnect(ws, req)
    {
        this.log('New connection: ' + req.connection.remoteAddress);
        this.pluginManager.onConnection(ws, req);
        ws.on('message', (message)=>{
            let data = JSON.parse(message);
            this.pluginManager.onMessage(data);
            this.onChangeDrivingData(data.speed, data.turn);
            
            /*if( typeof data.cmd !== 'undefined' ){
                if( data.cmd==='exit' ){
                    process.exit();
                }
            }*/
            //console.log('received: %s', message);
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
                speed: this.speed,
                turn: this.turn,
                deviceState: this.deviceManager.getData(),
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
        }, 500);
    }

    onChangeDrivingData(speed, turn)
    {
        if (this.config.motorReverse) {
            speed = -1 * speed;
        }
        if (this.config.turnReverse) {
            turn = -1 * turn;
        }
        try{
            this.vehicle.turn(turn);
            this.vehicle.motor(speed);
        } catch (e) {
            console.log(e);
        }

        this.speed = this.config.motorReverse ? -1 * speed : speed;
        this.turn = this.config.turnReverse ? -1 * turn : turn;
    }

    onMotorStop()
    {
        this.speed = 0;
    }

    onTurnStop()
    {
        this.turn = 0;
    }

    onExit()
    {
        this.pluginManager.onExit();
    }

    log(str)
    {
        if (this.debugOn) {
            console.log(str);
        }
    }
}