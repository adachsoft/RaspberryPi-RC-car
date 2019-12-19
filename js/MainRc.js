
class MainRc extends Base
{
    constructor(host, pluginManager, meters)
    {
        super();
        this.host = host;
        this.pluginManager = pluginManager;
        this.meters = meters;
        this.arrKeys = [];
        this.data = {};
        this.socket = null;
    }
    
    init()
    {
        this.pluginManager.init();
        this.connect();
    }
    
    getMaxEnginePower()
    {
        return $('#speed').val();
    }
    
    getMaxTurnStrength()
    {
        return $('#turn').val();
    }

    getEnginePower()
    {
        return $('#current_speed').val();
    }
    
    getTurnStrength()
    {
        return $('#current_turn').val();
    }
    
    setEnginePower(power)
    {
        $('#current_speed').val(power).trigger('change'); 
    }
    
    setTurnStrength(turn)
    {
        $('#current_turn').val(turn).trigger('change');
    }
    
    sendData()
    {
        setTimeout(()=>{
            if (this.shouldSend()) {
                this.getFromKeys();
                let data = this.makeCmd();
                this.socket.send(JSON.stringify(data));
            }
            this.sendData();
        }, 100);
    }
        
    shouldSend()
    {
        let shouldSendData = this.pluginManager.shouldSendData();

        return shouldSendData ||
                this.arrKeys.indexOf(38) >= 0 || 
                this.arrKeys.indexOf(40) >= 0 ||
                this.arrKeys.indexOf(37) >= 0 ||
                this.arrKeys.indexOf(39) >= 0 ||
                this.arrKeys.indexOf(72) >= 0;
    }
    
    makeCmd()
    {
        let speed = this.getEnginePower();
        let turn = this.getTurnStrength();
        let pluginsData = this.pluginManager.createDataToSend();

        return {
            speed: speed,
            turn: turn,
            plugins: pluginsData
        };
    }
    
    getFromKeys()
    {
        let speed = 0;
        let turn = 0;
        let bSpeed = false;
        let bTurn = false;
        let speedVal = this.getMaxEnginePower();
        if (this.arrKeys.indexOf(16) >= 0) {
            speedVal = 100;
        }
        if (this.arrKeys.indexOf(38) >= 0) {
            speed = -1 * speedVal;
            bSpeed = true;
        }
        if (this.arrKeys.indexOf(40) >= 0) {
            speed = 1 * speedVal;
            bSpeed = true;
        }
        if (this.arrKeys.indexOf(37) >= 0) {
            turn = -1 * this.getMaxTurnStrength();
            bTurn = true;
        }
        if (this.arrKeys.indexOf(39) >= 0) {
            turn = 1 * this.getMaxTurnStrength();
            bTurn = true;
        }
        
        if(bSpeed){
            this.setEnginePower(speed);
        }else{
            this.setEnginePower(0);
        }
        if(bTurn){
            this.setTurnStrength(turn);
        }else{
            this.setTurnStrength(0);
        }
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
        this.setEnginePower(data.speed);
        this.setTurnStrength(data.turn);
        if (typeof data.temp !== 'undefined') {
            this.meters.meterTempRefresh(data.temp);
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
        this.getFromKeys();
        this.pluginManager.onKeyUp(keyboard.getKeys());
    }
}
