
class MainRc extends Base
{
    constructor(host, pluginManager, eventBus, drivingController)
    {
        super();
        this.host = host;
        this.pluginManager = pluginManager;
        this.eventBus = eventBus;
        this.drivingController = drivingController;
        this.arrKeys = [];
        this.data = {};
        this.socket = null;
    }
    
    init()
    {
        this.pluginManager.init();
        this.connect();
    }
    
    sendData()
    {
        setTimeout(()=>{
            if (this.shouldSend()) {
                //this.drivingController.getFromKeys();
                let data = this.makeCmd();
                this.socket.send(JSON.stringify(data));
            }
            this.sendData();
        }, 100);
    }
        
    shouldSend()
    {
        let shouldSendData = this.pluginManager.shouldSendData();

        return shouldSendData || this.drivingController.shouldSend();
    }
    
    makeCmd()
    {
        let speed = this.drivingController.getEnginePower();
        let turn = this.drivingController.getTurnStrength();
        let pluginsData = this.pluginManager.createDataToSend();

        return {
            speed: speed,
            turn: turn,
            plugins: pluginsData
        };
    }
    
    connect()
    {
        if (!this.isSocketClosed()) {
            return;
        }

        try{
            this.pluginManager.onConnecting();

            this.socket = new WebSocket(this.host);
            this.socket.onopen = (e) => {
                this.onSocketOpen();
            };
            this.socket.onerror = (e) => {
                this.onSocketError();
            };
            this.socket.onclose = (e) => {
                this.onSocketClose();
            };
            this.socket.onmessage = (e) => {
                let data = JSON.parse(e.data);
                this.onSocketMessage(data);
            };
        }catch(e){
            console.log(e);
        }
    }
    
    onSocketOpen()
    {
        this.pluginManager.onOpen();
        this.sendData();
    }

    onSocketError()
    {
    }

    onSocketClose()
    {
        this.pluginManager.onClose();
        setTimeout(()=>{
            this.connect();
        }, 10000);
    }

    onSocketMessage(data)
    {
        this.pluginManager.onMessage(data);
        this.eventBus.publish('changeSpeed', data.speed);
        this.eventBus.publish('changeTurn', data.turn);
        if (typeof data.deviceState.cpuTemp !== 'undefined') {
            this.eventBus.publish('changeCpuTemp', data.deviceState.cpuTemp);
        }
        if (typeof data.deviceState.cpuUsage !== 'undefined') {
            $('#cpu .js-value').text(data.deviceState.cpuUsage + '%' + ' ' + data.deviceState.date);
        }
    }

    isSocketConnected()
    {
        return null !== this.socket && this.socket.readyState === WebSocket.OPEN;
    }

    isSocketClosed()
    {
        return null === this.socket || this.socket.readyState === WebSocket.CLOSED;
    }
    
    onKeyDown(keyCode, keyboard)
    {
        this.arrKeys = keyboard.getKeys();
        this.pluginManager.onKeyDown(keyboard.getKeys());
    }

    onKeyUp(keyCode, keyboard)
    {
        this.arrKeys = keyboard.getKeys();
        this.pluginManager.onKeyUp(keyboard.getKeys());
    }
}
