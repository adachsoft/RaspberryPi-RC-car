module.exports = class DS1820
{
    constructor()
    {
        try{
            const { Worker } = require('worker_threads');
        }catch(e){
            console.log('RUN: sudo node --experimental-worker rccar.js');
            console.log(e);
        }

        this.Worker = Worker;
        this.ds1820Temp = null;
    }

    onInit()
    {
        setTimeout(()=>{
            const worker = new this.Worker('../plugins/DS1820/nodejs/CheckTemp.js');
            worker.on('message', (msg) => { 
                this.ds1820Temp = msg;
            });

        }, 500);
    }

    onConnection(ws, req)
    {
    }

    onMessage(data)
    {
        data = this.getDataFromMessage(data);
    }

    onSend()
    {
        return {
                temp: this.ds1820Temp
        };
    }

    onClose(ws)
    {
    }

    getDataFromMessage(data)
    {
        return data['plugins']['DS1820'];
    }
}