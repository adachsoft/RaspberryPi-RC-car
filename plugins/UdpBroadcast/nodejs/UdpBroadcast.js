module.exports = class UdpBroadcast
{
    constructor()
    {
        this.config = require('../config/UdpBroadcast.json');
        this.Os = require( 'os' );
        const Dgram = require('dgram');
        this.socket = Dgram.createSocket({ type: "udp4", reuseAddr: true });
    }

    onInit()
    {
        this.socket.bind(this.config.port);
        this.socket.on('listening', () => {
            this.onUdpListening();
        });
        this.socket.on('message', (message) => {
            this.onUdpMessage(message);
        });
    }

    onUdpListening()
    {
        this.socket.setBroadcast(true);
        let address = this.socket.address(); 
        console.log('UDP Server started and listening on ' + address.address + ":" + address.port);

        setTimeout(()=>{
            this.udpSend();
        }, 3000);
    }

    onUdpMessage(message)
    {
        let output = "Udp server receive message : " + message + "\n";
        console.log(output);
    }

    udpSend()
    {
        let data = {
            ipAddreses: this.getAllIpAddreses(),
            hostName: this.Os.hostname(),
        };
        
        const message = Buffer.from(JSON.stringify(data));
        console.log('SEND: ', this.config.port);
        this.socket.send(message, 0, message.length, this.config.port, "255.255.255.255");
    }

    getAllIpAddreses()
    {
        let ipAddreses = [];
        let ifaces = this.Os.networkInterfaces( );

        Object.keys(ifaces).forEach( (ifname) => {
            ifaces[ifname].forEach(function (iface) {
                if ('IPv4' !== iface.family || iface.internal !== false) {
                    return;
                }
                ipAddreses.push(iface.address);
            });
        });

        return ipAddreses;
    }
}
