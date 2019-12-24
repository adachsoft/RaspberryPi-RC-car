const WebSocket = require('ws');

module.exports = class RcCarManager
{
    constructor(pluginManager, webSocketServer, config, vehicle)
    {
        this.pluginManager = pluginManager;
        this.pluginManager.setRcCarManager(this);
        this.webSocketServer = webSocketServer;
        this.config = config;
        this.vehicle = vehicle;
        this.debugOn = true;
        this.sendTime = null;
        this.temp = require("pi-temperature");
        this.osu = require('node-os-utils');
        this.cpuTemp = null;
        this.cpuPercentage = null;
        this.speed = 0;
        this.turn = 0;
    }

    init()
    {
        this.webSocketServer.on('connection', (ws, req)=>{this.onConnect(ws, req);});
        this.pluginManager.onInit();
        setTimeout(()=>{
            this.measureTemp();
            this.measureCpuPercentage();
        }, 500);
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
                temp: this.cpuTemp,
                cpu: this.cpuPercentage,
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

    /*sendData(ws)
    {
        if (this.sendTime!==null) {
            return;
        }
        this.sendTime = setTimeout(()=>{
            let data = {
                temp: this.cpuTemp,
                cpu: this.cpuPercentage,
                plugins: this.pluginManager.onSend()
            };
            console.log(this.cpuPercentage);
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
        }, 100);
    }*/

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

    measureCpuPercentage()
    {
        let cpu = this.osu.cpu
        cpu.usage().then(cpuPercentage => {
            //console.log(cpuPercentage);
            this.cpuPercentage = cpuPercentage;
            setTimeout(()=>{
                this.measureCpuPercentage();
            }, 1000);
        });
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

    log(str)
    {
        if (this.debugOn) {
            console.log(str);
        }
    }
}