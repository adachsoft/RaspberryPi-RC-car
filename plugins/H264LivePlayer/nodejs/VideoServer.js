"use strict";

const WebSocketServer = require('ws').Server;
const Splitter        = require('stream-split');
const NALseparator    = Buffer.from([0, 0, 0, 1]);

module.exports = class VideoServer
{
    constructor(server, raspivid)
    {
        this.raspivid = raspivid;
        this.wss = new WebSocketServer(server);
        
        this.wss.on('connection', (ws, req)=>{
            this.onConnect(ws, req);
        });
    }
    
    startStream() 
    {
        var readStream = this.raspivid.getStream();
        this.readStream = readStream;

        readStream = readStream.pipe(new Splitter(NALseparator));
        readStream.on("data", (data)=>{
            this.sendStream(data);
        });
    }

    sendStream(data) 
    {
        this.wss.clients.forEach((socket) => {
            if (socket.buzy) {
                return;
            }

            socket.buzy = true;
            socket.buzy = false;

            socket.send(
                Buffer.concat([NALseparator, data]), 
                {
                    binary: true
                }, 
                function ack(error) {
                    socket.buzy = false;
                }
            );
        });
    }

    onConnect(socket, req)
    {
        socket.send(JSON.stringify({
            action : "init",
            width  : this.raspivid.getWidth(),
            height : this.raspivid.getHeight(),
        }));

        socket.on("message", (data) => {
            var cmd = "" + data;
            var action = data.split(' ')[0];
            console.log("Incomming action '%s'", action);

            if(action == "REQUESTSTREAM"){
                this.startStream();
            }else if(action == "STOPSTREAM"){
                this.readStream.pause();
            }
        });

        socket.on('close', () => {
            console.log('CLOSE', this.wss.clients.length);
            //this.readStream.end();
            this.raspivid.close();
            console.log('stopping client interval');
        });
    }
}
